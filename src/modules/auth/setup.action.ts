"use server";

// File: setup.action.ts
// Folder: src/modules/auth
// Description: Server action to securely bootstrap the first Superadmin account with atomic email confirmation.
// Imports: Prisma db client, Auth roles/status, bcrypt, Resend SDK.
// Exports: bootstrapSuperadmin

import { db } from "@/lib/db";
import { Role, UserStatus } from "@/generated/prisma";
import bcrypt from "bcryptjs";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function bootstrapSuperadmin(formData: FormData) {
  const token = formData.get("token") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 1. Verify the environment token
  const envToken = process.env.SETUP_TOKEN;
  if (!envToken) {
    return { error: "SETUP_TOKEN is not configured in the server environment." };
  }
  if (token !== envToken) {
    return { error: "Invalid Setup Token." };
  }

  let createdUserId: string | null = null;

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    
    // 2. Transaction prevents race conditions if two people submit exactly at once
    const user = await db.$transaction(async (tx) => {
      const userCount = await tx.user.count();
      
      // If any user exists, abort immediately
      if (userCount > 0) {
        return null;
      }

      // Create the superadmin
      return await tx.user.create({
        data: {
          name,
          email,
          passwordHash,
          role: Role.SUPERADMIN,
          status: UserStatus.ACTIVE, // Superadmin is immediately active
          emailVerifiedAt: new Date(),
        },
      });
    });

    if (!user) {
      return { error: "404 - Setup route is permanently locked. A user already exists." };
    }

    createdUserId = user.id;

    // 3. Attempt to send the Welcome/Verification email via Resend
    const loginLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/login`;

    const { error: resendError } = await resend.emails.send({
      from: "CyLoad Core <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to CyLoad CMS - Superadmin Created",
      html: `
        <p>Hello ${name},</p>
        <p>Your Superadmin account for <strong>CyLoad CMS</strong> has been successfully verified and created.</p>
        <p>You can now log in and begin configuring your system:</p>
        <br/>
        <a href="${loginLink}" style="padding: 10px 16px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px;">Log In to Dashboard</a>
        <br/><br/>
        <p>If you did not authorize this setup, please check your server environment variables immediately.</p>
      `,
    });

    // Throw if Resend API blocks the email (e.g., sending to unverified email in sandbox)
    if (resendError) {
      throw new Error(resendError.message);
    }

    return { success: true };

  } catch (error: any) {
    console.error("Bootstrap Error:", error);

    // 4. COMPENSATING TRANSACTION: Rollback so the setup route isn't permanently locked out
    if (createdUserId) {
      try {
        await db.user.delete({ where: { id: createdUserId } });
        console.log(`Rolled back superadmin creation for ${email} due to email failure.`);
      } catch (rollbackErr) {
        console.error("CRITICAL: Failed to rollback superadmin after email failure", rollbackErr);
      }
    }

    return { error: `Setup failed to dispatch email: ${error.message}. Database changes reversed so you can try again.` };
  }
}