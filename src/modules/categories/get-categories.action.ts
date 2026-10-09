"use server";

// File: get-categories.action.ts
// Folder: src/modules/categories
// Description: Fetches paginated categories and their post counts.

import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function getCategoriesAction(page: number = 1, limit: number = 10) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized", categories: null, metadata: null };

  try {
    const skip = (page - 1) * limit;

    const [categories, total] = await db.$transaction([
      db.category.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          _count: {
            select: { posts: true }, 
          },
        },
      }),
      db.category.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return { 
      success: true, 
      categories, 
      metadata: { total, page, limit, totalPages } 
    };
  } catch (error) {
    console.error("Fetch Categories Error:", error);
    return { error: "Failed to fetch categories.", categories: null, metadata: null };
  }
}