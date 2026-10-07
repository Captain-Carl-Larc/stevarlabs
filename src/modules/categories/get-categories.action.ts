"use server";

// File: get-categories.action.ts
// Folder: src/modules/categories
// Description: Fetches all categories and their post counts.

import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function getCategoriesAction() {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized", categories: null };

  try {
    const categories = await db.category.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { posts: true }, 
        },
      },
    });
    return { success: true, categories };
  } catch (error) {
    console.error("Fetch Categories Error:", error);
    return { error: "Failed to fetch categories.", categories: null };
  }
}