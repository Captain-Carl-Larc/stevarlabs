// File: robots.ts
// Route/Folder: src/app
// Purpose: Automatically generates robots.txt to control search engine crawlers.
// Imports: MetadataRoute from next
// Used in: Root URL (/robots.txt)

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://stevarlabs.co.uk";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Cover both /admin and /admin/... plus the API routes
      disallow: ["/admin", "/admin/", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}