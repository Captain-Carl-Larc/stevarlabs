"use server";

// File: invite.action.ts
// Folder: src/modules/auth
// Description: Securely invites a new user, ensuring database atomicity. Rolls back user creation if email dispatch fails.
// Imports: Prisma db client, Auth roles/status, Resend SDK, crypto.
// Exports: inviteUser action

import { db } from "@/lib/db";
import { Role, UserStatus } from "@/generated/prisma";
import { Resend } from "resend";
import crypto from "crypto";
import { auth } from "@/auth";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function inviteUser(formData: FormData) {
  const session = await auth();
  
  if (!session || (session.user.role !== Role.SUPERADMIN && session.user.role !== Role.ADMIN)) {
    return { error: "Unauthorized action." };
  }

  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as Role;

  if (!email || !name || !role) {
    return { error: "All fields are required." };
  }

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: "A user with this email already exists." };
  }

  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 48);

  let createdUserId: string | null = null;

  try {
    // 1. Create the user and token in the database first
    const newUser = await db.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          role,
          status: UserStatus.PENDING,
        },
      });

      await tx.inviteToken.create({
        data: {
          userId: user.id,
          tokenHash: hashedToken,
          expiresAt,
        },
      });

      return user;
    });

    createdUserId = newUser.id;

    // 2. Attempt to send the email via Resend
    const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/accept-invite?token=${rawToken}&email=${email}`;

    const { error: resendError } = await resend.emails.send({
      from: "CyLoad Core <onboarding@resend.dev>",
      to: email,
      subject: `You've been invited to Cyload as an ${role}`,
      html: `
        <p>Hello ${name},</p>
        <p>You have been invited to join the CyLoad CMS team as a <strong>${role}</strong>.</p>
        <p>Click the link below to set your password and activate your account (expires in 48 hours):</p>
        <a href="${inviteLink}">Accept Invitation & Set Password</a>
      `,
    });

    // 3. Resend SDK doesn't always throw exceptions; it returns an error object for API failures (like unverified emails)
    if (resendError) {
      throw new Error(resendError.message);
    }

    return { success: `Successfully invited ${name} as ${role}!` };

  } catch (err: any) {
    console.error("Invite process failed:", err);

    // 4. COMPENSATING TRANSACTION: If email fails, delete the user from the database
    if (createdUserId) {
      try {
        await db.user.delete({ where: { id: createdUserId } });
        console.log(`Rolled back user creation for ${email} due to email failure.`);
      } catch (rollbackErr) {
        console.error("CRITICAL: Failed to rollback user after email failure", rollbackErr);
      }
    }

    // Return the exact Resend error to the frontend so you know why it failed
    return { error: `Failed to send invitation email: ${err.message}. Database changes reversed.` };
  }
}