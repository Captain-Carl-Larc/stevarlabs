// File: sitemap.ts
// Route/Folder: src/app
// Purpose: Automatically generates the sitemap.xml file for SEO indexing.
// Imports: MetadataRoute from next
// Used in: Root URL (/sitemap.xml)

import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Uses the environment variable you set up earlier, defaulting to localhost for dev
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // Core navigation routes
  const routes = [
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
    "/terms"
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/posts" ? "weekly" : "monthly",
    priority: route === "" || route === "/free-audit" ? 1 : 0.8,
  }));
}