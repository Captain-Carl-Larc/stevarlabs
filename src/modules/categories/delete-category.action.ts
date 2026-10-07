"use server";

// File: delete-category.action.ts
// Folder: src/modules/categories
// Description: Deletes a category if it has no associated posts.

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { Role } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

export async function deleteCategoryAction(id: string) {
  const session = await auth();
  if (!session || (session.user.role !== Role.SUPERADMIN && session.user.role !== Role.ADMIN)) {
    return { error: "Unauthorized action." };
  }

  try {
    const category = await db.category.findUnique({
      where: { id },
      include: { _count: { select: { posts: true } } }
    });

    if (category?._count.posts && category._count.posts > 0) {
      return { error: `Cannot delete. This category still has ${category._count.posts} posts attached to it.` };
    }

    await db.category.delete({ where: { id } });
    
    revalidatePath("/admin/categories");
    return { success: "Category deleted successfully." };
  } catch (error) {
    return { error: "Failed to delete category. Ensure no posts are linked to it." };
  }
}