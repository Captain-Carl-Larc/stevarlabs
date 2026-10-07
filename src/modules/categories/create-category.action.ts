"use server";

// File: create-category.action.ts
// Folder: src/modules/categories
// Description: Creates a new category with a unique slug.

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { Role } from "@/generated/prisma";
import { revalidatePath } from "next/cache";
import { generateSlug } from "./utils";

export async function createCategoryAction(data: { name: string; slug?: string; description?: string }) {
  const session = await auth();
  if (!session || (session.user.role !== Role.SUPERADMIN && session.user.role !== Role.ADMIN)) {
    return { error: "Unauthorized action." };
  }

  const slug = data.slug ? generateSlug(data.slug) : generateSlug(data.name);

  try {
    const existing = await db.category.findUnique({ where: { slug } });
    if (existing) return { error: "A category with this slug already exists." };

    await db.category.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
      },
    });

    revalidatePath("/admin/categories");
    return { success: "Category created successfully." };
  } catch (error) {
    return { error: "Failed to create category." };
  }
}