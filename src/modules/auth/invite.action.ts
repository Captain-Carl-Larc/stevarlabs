"use server";

// File: invite.action.ts
// Folder: src/modules/auth

import { db } from "@/lib/db";
import { Role, UserStatus } from "@/generated/prisma";
import { Resend } from "resend";
import crypto from "crypto";
import { auth } from "@/auth";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function inviteUser(formData: FormData) {
  const session = await auth();
  
  // Enforce RBAC: Only Superadmin or Admin can invite users
  if (!session || (session.user.role !== Role.SUPERADMIN && session.user.role !== Role.ADMIN)) {
    return { error: "Unauthorized action." };
  }

  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as Role;

  if (!email || !name || !role) {
    return { error: "All fields are required." };
  }

  // 1. Check if user already exists
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: "A user with this email already exists." };
  }

  // 2. Generate secure tokens
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 48); // 48 hours

  try {
    // 3. Use a transaction to ensure the User and the InviteToken are created together safely
    await db.$transaction(async (tx) => {
      // Create pending user record
      const newUser = await tx.user.create({
        data: {
          name,
          email,
          role,
          status: UserStatus.PENDING,
        },
      });

      // Store invite token linked directly to the new user
      await tx.inviteToken.create({
        data: {
          userId: newUser.id,
          tokenHash: hashedToken,
          expiresAt,
        },
      });
    });

    // 4. Construct the email link
    const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/accept-invite?token=${rawToken}&email=${email}`;

    // 5. Send the email via Resend
    await resend.emails.send({
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

    return { success: `Successfully invited ${name} as ${role}!` };

  } catch (err) {
    console.error("Invite email/DB error:", err);
    return { error: "User created, but a system error occurred." };
  }
}