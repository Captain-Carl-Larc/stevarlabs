"use server";

// File: getuser.action.ts
// Folder: src/modules/users
// Description: Securely fetches a single user by ID, ensuring sensitive fields are stripped.
// Imports: Prisma db, Auth session, Enums.

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { Role } from "@/generated/prisma";

export async function getUserAction(userId: string) {
  const session = await auth();

  if (!session || (session.user.role !== Role.SUPERADMIN && session.user.role !== Role.ADMIN)) {
    return { error: "Unauthorized action.", user: null };
  }

  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        emailVerifiedAt: true,
        createdAt: true,
      },
    });

    if (!user) {
      return { error: "User not found.", user: null };
    }

    return { success: true, user };
  } catch (error) {
    console.error("Fetch Single User Error:", error);
    return { error: "Failed to fetch user details.", user: null };
  }
}