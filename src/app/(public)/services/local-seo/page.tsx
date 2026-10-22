// File: page.tsx
// Route/Folder: src/app/(public)/services/local-seo
// Purpose: Orchestrates the SEO service page.
// Imports: Metadata from next, SeoHero, SeoDetails, SeoFaq, AuditCta
// Used in: Route /services/local-seo

import type { Metadata } from "next";
import SeoHero from "@/components/client/services/local-seo/SeoHero";
import SeoDetails from "@/components/client/services/local-seo/SeoDetails";
import SeoFaq from "@/components/client/services/local-seo/SeoFaq";
import AuditCta from "@/components/client/shared/AuditCta";

// Spec Requirement 18.1
export const metadata: Metadata = {
  title: "Local SEO & Search for Dental Practices",
  description: "Get found by patients searching for a dentist nearby. Google Business Profile, general SEO, and treatment pages for UK dental practices.",
};

export default function SeoPage() {
  return (
    <>
      <SeoHero />
      <SeoDetails />
      <SeoFaq />
      <AuditCta />
    </>
  );
}