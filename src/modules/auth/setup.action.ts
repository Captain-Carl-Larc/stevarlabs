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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}

// Deletes tokens first, then the user, so it works even without onDelete: Cascade.
async function removeUserAndTokens(userId: string) {
  await db.$transaction([
    db.inviteToken.deleteMany({ where: { userId } }),
    db.user.delete({ where: { id: userId } }),
  ]);
}

export async function bootstrapSuperadmin(formData: FormData) {
  const token = String(formData.get("token") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const envToken = process.env.SETUP_TOKEN;
  if (!envToken) {
    return { error: "SETUP_TOKEN is not configured in the server environment." };
  }
  if (!safeEqual(token, envToken)) {
    return { error: "Invalid Setup Token." };
  }
  if (!name || !email || password.length < 8) {
    return { error: "Name, a valid email and a password of at least 8 characters are required." };
  }

  let createdUserId: string | null = null;

  try {
    const passwordHash = await bcrypt.hash(password, 12);

    // Generate secure verification token
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours

    const result = await db.$transaction(
      async (tx) => {
        // Lock only once a VERIFIED superadmin exists, not when a half-finished one does.
        const verifiedAdmin = await tx.user.findFirst({
          where: { role: Role.SUPERADMIN, emailVerifiedAt: { not: null } },
          select: { id: true },
        });
        if (verifiedAdmin) return { locked: true as const };

        // Clear leftovers from any earlier failed attempt (unverified superadmins only).
        const stale = await tx.user.findMany({
          where: { role: Role.SUPERADMIN, emailVerifiedAt: null },
          select: { id: true },
        });
        if (stale.length > 0) {
          const ids = stale.map((u) => u.id);
          await tx.inviteToken.deleteMany({ where: { userId: { in: ids } } });
          await tx.user.deleteMany({ where: { id: { in: ids } } });
        }

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
          data: { userId: newUser.id, tokenHash: hashedToken, expiresAt },
        });

        return { locked: false as const, user: newUser };
      },
      { isolationLevel: "Serializable" } // stops two simultaneous requests both creating an admin
    );

    if (result.locked) {
      return { error: "404 - Setup route is permanently locked. A verified Superadmin already exists." };
    }

    createdUserId = result.user.id;

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const verifyLink = `${baseUrl}/verify-email?token=${rawToken}&email=${encodeURIComponent(email)}`;

    const { error: resendError } = await resend.emails.send({
      from: "CyLoad Core <noreply@mail.stevarlabs.co.uk>",
      to: email,
      subject: "Action Required: Verify Your Superadmin Account",
      html: `
        <p>Hello ${escapeHtml(name)},</p>
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

    let rolledBack = !createdUserId; // nothing to undo if the user was never created
    if (createdUserId) {
      try {
        await removeUserAndTokens(createdUserId);
        rolledBack = true;
      } catch (rollbackErr) {
        console.error("CRITICAL: Failed to rollback superadmin", rollbackErr);
      }
    }

    return {
      error: rolledBack
        ? `Setup failed: ${error.message}. Database changes reversed, you can try again.`
        : `Setup failed: ${error.message}. Cleanup did not complete, but running setup again will clear the leftover account.`,
    };
  }
}