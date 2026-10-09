"use server";

// File: get-posts.action.ts
// Folder: src/modules/posts
// Description: Fetches paginated posts including author and category relations.

import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function getPostsAction(page: number = 1, limit: number = 10) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized", posts: null, metadata: null };

  try {
    const skip = (page - 1) * limit;

    const [posts, total] = await db.$transaction([
      db.post.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          category: {
            select: { name: true, slug: true },
          },
          author: {
            select: { name: true },
          },
        },
      }),
      db.post.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return { 
      success: true, 
      posts, 
      metadata: { total, page, limit, totalPages } 
    };
  } catch (error) {
    console.error("Fetch Posts Error:", error);
    return { error: "Failed to fetch posts.", posts: null, metadata: null };
  }
}