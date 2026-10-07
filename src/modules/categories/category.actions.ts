"use server";

// File: category.actions.ts
// Folder: src/modules/categories
// Description: Server actions for Category CRUD operations.
// Imports: Prisma db, Auth session, Next.js cache revalidation.

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { Role } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

// Utility to create URL-friendly slugs
function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// 1. READ ALL
export async function getCategoriesAction() {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized", categories: null };

  try {
    const categories = await db.category.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { posts: true }, // Fetches the number of posts in each category
        },
      },
    });
    return { success: true, categories };
  } catch (error) {
    console.error("Fetch Categories Error:", error);
    return { error: "Failed to fetch categories.", categories: null };
  }
}

// 2. CREATE
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

// 3. UPDATE
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

// 4. DELETE
export async function deleteCategoryAction(id: string) {
  const session = await auth();
  if (!session || (session.user.role !== Role.SUPERADMIN && session.user.role !== Role.ADMIN)) {
    return { error: "Unauthorized action." };
  }

  try {
    // Check if posts exist before attempting deletion to provide a clear error message
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