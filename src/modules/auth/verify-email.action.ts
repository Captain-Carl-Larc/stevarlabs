"use server";

// File: verify-email.action.ts
// Folder: src/modules/auth
// Description: Processes the email verification token and activates the Superadmin account.
// Imports: Prisma db client, crypto, UserStatus.
// Exports: verifyEmailAction

import { db } from "@/lib/db";
import crypto from "crypto";
import { UserStatus } from "@/generated/prisma";

export async function verifyEmailAction(formData: FormData) {
  const token = formData.get("token") as string;
  const email = formData.get("email") as string;

  if (!token || !email) {
    return { error: "Missing required verification parameters." };
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const inviteRecord = await db.inviteToken.findFirst({
    where: {
      user: { email },
      tokenHash: hashedToken,
    },
    include: { user: true },
  });

  if (!inviteRecord || inviteRecord.expiresAt < new Date()) {
    return { error: "This verification link is invalid or has expired." };
  }

  try {
    await db.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: inviteRecord.userId },
        data: {
          emailVerifiedAt: new Date(),
          status: UserStatus.ACTIVE,
        },
      });

      await tx.inviteToken.delete({
        where: { id: inviteRecord.id },
      });
    });

    return { success: "Email verified successfully! You can now log in." };
  } catch (err) {
    console.error("Failed to verify email:", err);
    return { error: "An error occurred while verifying your account." };
  }
}