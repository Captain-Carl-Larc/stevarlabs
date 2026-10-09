"use server";

// File: dashboard.action.ts
// Folder: src/modules/dashboard
// Description: Server action to fetch aggregated workspace metrics for the admin dashboard.

import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function getDashboardMetrics() {
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorized", data: null };
  }

  try {
    const [totalPosts, publishedPosts, draftPosts, totalCategories, totalUsers, recentPosts] = await db.$transaction([
      db.post.count(),
      db.post.count({ where: { status: "PUBLISHED" } }),
      db.post.count({ where: { status: "DRAFT" } }),
      db.category.count(),
      db.user.count(),
      db.post.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          category: { select: { name: true } },
          author: { select: { name: true } },
        },
      }),
    ]);

    return {
      success: true,
      data: {
        totalPosts,
        publishedPosts,
        draftPosts,
        totalCategories,
        totalUsers,
        recentPosts,
        userName: session.user.name,
      },
    };
  } catch (error) {
    console.error("Dashboard Metrics Fetch Error:", error);
    return { error: "Failed to load dashboard metrics.", data: null };
  }
}