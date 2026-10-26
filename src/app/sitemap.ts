// File: sitemap.ts
// Route/Folder: src/app
// Purpose: Automatically generates sitemap.xml with static pages and published, indexable posts.
// Imports: MetadataRoute from next, db, PostStatus
// Used in: Root URL (/sitemap.xml)

import { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { PostStatus } from "@/generated/prisma";

// Refresh hourly so new posts appear without a redeploy
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://stevarlabs.co.uk";

  const staticRoutes = [
    "",
    "/services",
    "/services/local-seo",
    "/services/website-design-redesign",
    "/services/patient-retention",
    "/services/social-media",
    "/free-audit",
    "/about",
    "/pricing",
    "/resources",
    "/resources/recall-message-templates",
    "/posts",
    "/contact",
    "/privacy-policy",
    "/cookie-policy",
    "/terms",
  ].map((route) => ({ url: `${baseUrl}${route}` }));

  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await db.post.findMany({
      where: {
        status: PostStatus.PUBLISHED,
        noIndex: false,
      },
      select: { slug: true, updatedAt: true },
    });

    postRoutes = posts.map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: post.updatedAt,
    }));
  } catch (error) {
    console.error("Sitemap Posts Fetch Error:", error);
  }

  return [...staticRoutes, ...postRoutes];
}