"use server";

// File: update.action.ts
// Folder: src/modules/users
// Description: Server action to securely update a user's role or status.
// Imports: Prisma db, Auth session, Next.js cache revalidation, Enums.

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { Role, UserStatus } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

export async function updateUserAction(userId: string, data: { role?: Role; status?: UserStatus }) {
  const session = await auth();

  if (!session || (session.user.role !== Role.SUPERADMIN && session.user.role !== Role.ADMIN)) {
    return { error: "Unauthorized action." };
  }

  // Security Check 1: Prevent modifying your own role or status
  if (userId === session.user.id) {
    return { error: "You cannot change your own role or status from this panel." };
  }

  // Security Check 2: Prevent a regular ADMIN from modifying a SUPERADMIN
  if (session.user.role === Role.ADMIN) {
    const targetUser = await db.user.findUnique({ where: { id: userId } });
    if (targetUser?.role === Role.SUPERADMIN) {
      return { error: "Admins are not authorized to modify Superadmin accounts." };
    }
  }

  try {
    await db.user.update({
      where: { id: userId },
      data,
    });

    revalidatePath("/admin/users");
    return { success: "User updated successfully." };
  } catch (error) {
    console.error("Update User Error:", error);
    return { error: "A database error occurred while updating the user." };
  }
}