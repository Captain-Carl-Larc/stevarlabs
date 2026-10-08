"use server";

// File: public-posts.action.ts
// Folder: src/modules/marketing/posts
// Description: Data fetching specifically tailored for the public marketing frontend.

import { db } from "@/lib/db";
import { PostStatus } from "@/generated/prisma";

export async function getPublicPostBySlug(slug: string) {
  try {
    const post = await db.post.findFirst({
      where: { slug, status: PostStatus.PUBLISHED },
      include: { 
        category: { select: { id: true, name: true, slug: true } },
        author: { select: { name: true } }
      },
    });
    return { post };
  } catch (error) {
    console.error("Public Post Fetch Error:", error);
    return { post: null };
  }
}

export async function getSidebarPosts(categoryId: string, currentPostId: string) {
  try {
    // 1. Try to fetch 3 related posts from the same category
    let sidebarPosts = await db.post.findMany({
      where: { 
        categoryId, 
        status: PostStatus.PUBLISHED,
        id: { not: currentPostId } // Exclude the post we are currently reading
      },
      take: 3,
      orderBy: { publishedAt: 'desc' },
      select: { id: true, title: true, slug: true, featuredImage: true, publishedAt: true }
    });

    // 2. Fallback: If there aren't enough related posts, fill the gap with recent posts
    if (sidebarPosts.length < 3) {
      const recentPosts = await db.post.findMany({
        where: {
          status: PostStatus.PUBLISHED,
          id: { notIn: [currentPostId, ...sidebarPosts.map(p => p.id)] }
        },
        take: 3 - sidebarPosts.length,
        orderBy: { publishedAt: 'desc' },
        select: { id: true, title: true, slug: true, featuredImage: true, publishedAt: true }
      });
      sidebarPosts = [...sidebarPosts, ...recentPosts];
    }

    return { posts: sidebarPosts };
  } catch (error) {
    console.error("Sidebar Fetch Error:", error);
    return { posts: [] };
  }
}