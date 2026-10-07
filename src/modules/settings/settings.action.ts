"use server";

// File: settings.action.ts
// Folder: src/modules/settings
// Description: Server action for users to update their own profile details and password.
// Imports: Prisma db, Auth session, bcrypt, Next.js cache revalidation.
// Exports: updateSettingsAction

import { db } from "@/lib/db";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function updateSettingsAction(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    return { error: "Unauthorized action. Please log in." };
  }

  const userId = session.user.id;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  try {
    const currentUser = await db.user.findUnique({ where: { id: userId } });
    if (!currentUser) return { error: "User account not found." };

    const updateData: Record<string, any> = {};

    // 1. Process Name Update
    if (name && name !== currentUser.name) {
      updateData.name = name;
    }

    // 2. Process Email Update (with uniqueness check)
    if (email && email !== currentUser.email) {
      const existingEmail = await db.user.findUnique({ where: { email } });
      if (existingEmail) {
        return { error: "That email address is already in use by another account." };
      }
      updateData.email = email;
    }

    // 3. Process Password Update
    if (newPassword) {
      if (!currentPassword) {
        return { error: "You must enter your current password to set a new one." };
      }
      
      // Strict null check satisfying TypeScript
      if (!currentUser.passwordHash) {
        return { error: "This account does not have a password set." };
      }
      
      const isPasswordValid = await bcrypt.compare(currentPassword, currentUser.passwordHash);
      if (!isPasswordValid) {
        return { error: "Your current password was incorrect." };
      }

      updateData.passwordHash = await bcrypt.hash(newPassword, 12);
    }

    // Check if there's actually anything to update
    if (Object.keys(updateData).length === 0) {
      return { success: "No changes were made." };
    }

    await db.user.update({
      where: { id: userId },
      data: updateData,
    });

    revalidatePath("/admin/settings");
    return { success: "Your settings have been updated successfully." };

  } catch (error) {
    console.error("Settings Update Error:", error);
    return { error: "A database error occurred while updating your settings." };
  }
}