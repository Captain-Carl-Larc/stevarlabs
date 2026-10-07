"use server";

// File: accept-invite.action.ts
// Folder: src/modules/auth
// Description: Processes the invitation token, sets the user's password, and activates their account.
// Imports: Prisma db client, crypto for token hashing, bcrypt for password hashing.
// Exports: acceptInvite function

import { db } from "@/lib/db";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { UserStatus } from "@/generated/prisma";

export async function acceptInvite(formData: FormData) {
  const token = formData.get("token") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!token || !email || !password) {
    return { error: "Missing required fields." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters long." };
  }

  // Hash the incoming token to match what is stored in the DB
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // Find the token in the database
  const inviteRecord = await db.inviteToken.findFirst({
    where: {
      user: { email },
      tokenHash: hashedToken,
    },
    include: { user: true },
  });

  // Verify token exists and hasn't expired
  if (!inviteRecord || inviteRecord.expiresAt < new Date()) {
    return { error: "This invitation link is invalid or has expired." };
  }

  // Hash the user's new password
  const passwordHash = await bcrypt.hash(password, 12);

  try {
    // Run in a transaction: Update user to ACTIVE, set password, and delete the token
    await db.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: inviteRecord.userId },
        data: {
          passwordHash,
          status: UserStatus.ACTIVE,
        },
      });

      await tx.inviteToken.delete({
        where: { id: inviteRecord.id },
      });
    });

    return { success: "Account activated successfully! You can now log in." };
  } catch (err) {
    console.error("Failed to accept invite:", err);
    return { error: "An error occurred while activating your account." };
  }
}