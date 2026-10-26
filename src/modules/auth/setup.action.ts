"use server";

// File: setup.action.ts
// Folder: src/modules/auth
// Description: Server action to bootstrap the first Superadmin account, enforcing strict email verification.
// Imports: Prisma db client, Auth roles/status, bcrypt, crypto, Resend SDK.
// Exports: bootstrapSuperadmin

import { db } from "@/lib/db";
import { Role, UserStatus } from "@/generated/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function bootstrapSuperadmin(formData: FormData) {
  const token = formData.get("token") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

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
    
    // Generate secure verification token
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours

    const user = await db.$transaction(async (tx) => {
      const userCount = await tx.user.count();
      if (userCount > 0) return null;

      const newUser = await tx.user.create({
        data: {
          name,
          email,
          passwordHash,
          role: Role.SUPERADMIN,
          status: UserStatus.PENDING, // Strictly PENDING until verified
          // emailVerifiedAt is intentionally left null
        },
      });

      await tx.inviteToken.create({
        data: {
          userId: newUser.id,
          tokenHash: hashedToken,
          expiresAt,
        },
      });

      return newUser;
    });

    if (!user) {
      return { error: "404 - Setup route is permanently locked. A user already exists." };
    }

    createdUserId = user.id;

    const verifyLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/verify-email?token=${rawToken}&email=${email}`;

    const { error: resendError } = await resend.emails.send({
      from: "CyLoad Core <noreply@mail.stevarlabs.co.uk>",
      to: email,
      subject: "Action Required: Verify Your Superadmin Account",
      html: `
        <p>Hello ${name},</p>
        <p>Your Superadmin account for <strong>CyLoad CMS</strong> has been initialized.</p>
        <p>Before you can log in, you must verify this email address by clicking the link below:</p>
        <br/>
        <a href="${verifyLink}" style="padding: 10px 16px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px;">Verify Email & Activate Account</a>
        <br/><br/>
        <p>This link will expire in 24 hours. If you did not authorize this setup, please check your server environment variables immediately.</p>
      `,
    });

    if (resendError) throw new Error(resendError.message);

    return { success: true };

  } catch (error: any) {
    console.error("Bootstrap Error:", error);

    if (createdUserId) {
      try {
        await db.user.delete({ where: { id: createdUserId } });
      } catch (rollbackErr) {
        console.error("CRITICAL: Failed to rollback superadmin", rollbackErr);
      }
    }

    return { error: `Setup failed to dispatch email: ${error.message}. Database changes reversed.` };
  }
}