"use server";

// File: update-category.action.ts
// Folder: src/modules/categories
// Description: Updates an existing category while ensuring the slug remains unique.

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { Role } from "@/generated/prisma";
import { revalidatePath } from "next/cache";
import { generateSlug } from "./utils";

export async function updateCategoryAction(id: string, data: { name: string; slug: string; description?: string }) {
  const session = await auth();
  if (!session || (session.user.role !== Role.SUPERADMIN && session.user.role !== Role.ADMIN)) {
    return { error: "Unauthorized action." };
  }

  const slug = generateSlug(data.slug);

  try {
    const existing = await db.category.findUnique({ where: { slug } });
    if (existing && existing.id !== id) {
      return { error: "Another category is already using this slug." };
    }

    await db.category.update({
      where: { id },
      data: { name: data.name, slug, description: data.description },
    });

    revalidatePath("/admin/categories");
    return { success: "Category updated successfully." };
  } catch (error) {
    return { error: "Failed to update category." };
  }
}