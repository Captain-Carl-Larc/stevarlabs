"use server";

// File: password-reset.action.ts
// Folder: src/modules/auth

import { db } from "@/lib/db";
import { Resend } from "resend";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function requestPasswordReset(formData: FormData) {
  const email = formData.get("email") as string;
  if (!email) return { error: "Email is required." };

  const user = await db.user.findUnique({ where: { email } });
  
  // For security, don't reveal if the email exists or not, just return success
  if (!user) {
    return { success: "If that email exists, a reset link has been sent." };
  }

  // Generate a secure random token
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30); // Valid for 30 minutes

  // Save/Upsert the token in the database
  await db.passwordResetToken.deleteMany({ where: { email } });
  await db.passwordResetToken.create({
    data: {
      email,
      token: hashedToken,
      expiresAt,
    },
  });

  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${rawToken}&email=${email}`;

  try {
    await resend.emails.send({
      from: "CyLoad Core <noreply@mail.stevarlabs.co.uk>", // Replace with your verified domain later (e.g., auth@fyutchalabs.com)
      to: email,
      subject: "Reset your CyLoad Password",
      html: `
        <p>You requested a password reset for your CyLoad account.</p>
        <p>Click the link below to reset your password. This link expires in 30 minutes:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>If you didn't request this, you can safely ignore this email.</p>
      `,
    });
  } catch (err) {
    console.error("Failed to send reset email:", err);
    return { error: "Failed to send email. Please try again later." };
  }

  return { success: "If that email exists, a reset link has been sent." };
}

export async function confirmPasswordReset(formData: FormData) {
  const token = formData.get("token") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!token || !email || !password) {
    return { error: "Invalid request parameters." };
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const resetRecord = await db.passwordResetToken.findFirst({
    where: { email, token: hashedToken },
  });

  if (!resetRecord || resetRecord.expiresAt < new Date()) {
    return { error: "This reset link is invalid or has expired." };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await db.user.update({
    where: { email },
    data: { passwordHash },
  });

  // Clean up the token so it can't be reused
  await db.passwordResetToken.deleteMany({ where: { email } });

  return { success: true };
}