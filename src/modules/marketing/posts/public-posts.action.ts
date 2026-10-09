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
      select: { 
        id: true, title: true, slug: true, featuredImage: true, publishedAt: true, 
        author: { select: { name: true } } 
      }
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
        select: { 
          id: true, title: true, slug: true, featuredImage: true, publishedAt: true, 
          author: { select: { name: true } } 
        }
      });
      sidebarPosts = [...sidebarPosts, ...recentPosts];
    }

    return { posts: sidebarPosts };
  } catch (error) {
    console.error("Sidebar Fetch Error:", error);
    return { posts: [] };
  }
}

// Add this to fetch categories for the filter UI
export async function getPublicCategories() {
  try {
    const categories = await db.category.findMany({
      // Only fetch categories that actually have published posts
      where: { posts: { some: { status: PostStatus.PUBLISHED } } },
      select: { name: true, slug: true },
      orderBy: { name: 'asc' }
    });
    return { categories };
  } catch (error) {
    console.error("Public Categories Fetch Error:", error);
    return { categories: [] };
  }
}

// Upgraded to accept an optional categorySlug for filtering
export async function getAllPublicPosts(page: number = 1, limit: number = 10, categorySlug?: string) {
  try {
    const skip = (page - 1) * limit;

    // Build a dynamic where clause based on whether a category is selected
    const whereCondition: any = { status: PostStatus.PUBLISHED };
    if (categorySlug) {
      whereCondition.category = { slug: categorySlug };
    }

    const [posts, total] = await db.$transaction([
      db.post.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
        include: { 
          category: { select: { id: true, name: true, slug: true } },
          author: { select: { name: true } }
        },
      }),
      db.post.count({
        where: whereCondition 
      })
    ]);

    const totalPages = Math.ceil(total / limit);

    return { 
      posts, 
      metadata: { total, page, limit, totalPages } 
    };
  } catch (error) {
    console.error("Public All Posts Fetch Error:", error);
    return { posts: [], metadata: null };
  }
}