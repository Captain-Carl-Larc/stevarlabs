// File: robots.ts
// Route/Folder: src/app
// Purpose: Automatically generates the robots.txt file to control search engine crawlers.
// Imports: MetadataRoute from next
// Used in: Root URL (/robots.txt)

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Prevent Google from trying to crawl or index your CMS admin dashboard
      disallow: ["/admin/", "/api/"], 
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}