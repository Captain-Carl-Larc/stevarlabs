"use server";

// File: get-posts.action.ts
// Folder: src/modules/posts
// Description: Fetches all posts including author and category relations.

import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function getPostsAction() {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized", posts: null };

  try {
    const posts = await db.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: {
          select: { name: true, slug: true },
        },
        author: {
          select: { name: true },
        },
      },
    });
    
    return { success: true, posts };
  } catch (error) {
    console.error("Fetch Posts Error:", error);
    return { error: "Failed to fetch posts.", posts: null };
  }
}