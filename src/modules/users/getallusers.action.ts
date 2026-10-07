"use server";

// File: getallusers.action.ts
// Folder: src/modules/users
// Description: Securely fetches all users for the admin table, omitting sensitive password hashes.
// Imports: Prisma db, Auth session, Enums.

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { Role } from "@/generated/prisma";

export async function getAllUsersAction() {
  const session = await auth();

  if (!session || (session.user.role !== Role.SUPERADMIN && session.user.role !== Role.ADMIN)) {
    return { error: "Unauthorized action.", users: null };
  }

  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc", // Newest users appear first
      },
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

    return { success: true, users };
  } catch (error) {
    console.error("Fetch Users Error:", error);
    return { error: "Failed to fetch users from the database.", users: null };
  }
}