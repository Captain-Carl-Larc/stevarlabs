"use server";

// File: delete.action.ts
// Folder: src/modules/users
// Description: Server action to securely delete a user and their associated tokens.
// Imports: Prisma db, Auth session, Next.js cache revalidation, Enums.

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { Role } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

export async function deleteUserAction(userId: string) {
  const session = await auth();

  if (!session || (session.user.role !== Role.SUPERADMIN && session.user.role !== Role.ADMIN)) {
    return { error: "Unauthorized action." };
  }

  // Security Check 1: Prevent self-deletion
  if (userId === session.user.id) {
    return { error: "You cannot delete your own active session account." };
  }

  // Security Check 2: Prevent an ADMIN from deleting a SUPERADMIN
  if (session.user.role === Role.ADMIN) {
    const targetUser = await db.user.findUnique({ where: { id: userId } });
    if (targetUser?.role === Role.SUPERADMIN) {
      return { error: "Admins are not authorized to delete Superadmin accounts." };
    }
  }

  try {
    // We use a transaction to delete any tokens first, preventing Foreign Key constraint crashes
    await db.$transaction(async (tx) => {
      await tx.inviteToken.deleteMany({
        where: { userId },
      });

      await tx.user.delete({
        where: { id: userId },
      });
    });

    // Instantly refresh the Users table UI
    revalidatePath("/admin/users");
    
    return { success: "User deleted successfully." };
  } catch (error) {
    console.error("Delete User Error:", error);
    return { error: "A database error occurred while deleting the user." };
  }
}