"use server";

// File: setup.action.ts
// Folder: src/modules/auth
// Role: Server action to securely bootstrap the first Superadmin account

import { db } from "@/lib/db";
import { Role, UserStatus } from "@/generated/prisma";
import bcrypt from "bcryptjs";

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

    return { success: true };

  } catch (error) {
    console.error("Bootstrap Error:", error);
    return { error: "A database error occurred." };
  }
}