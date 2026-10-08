"use server";

// File: get-post.action.ts
// Folder: src/modules/posts

import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function getPostByIdAction(id: string) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized", post: null };

  try {
    const post = await db.post.findUnique({
      where: { id },
      include: { category: { select: { id: true, name: true } } },
    });
    
    if (!post) return { error: "Post not found", post: null };

    return { success: true, post };
  } catch (error) {
    console.error("Fetch Post Error:", error);
    return { error: "Failed to fetch post.", post: null };
  }
}