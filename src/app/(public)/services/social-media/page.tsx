// File: page.tsx
// Route/Folder: src/app/(public)/services/social-media
// Purpose: Orchestrates the Social Media Management service page.
// Imports: Metadata from next, SocialHero, SocialDetails, SocialFaq, AuditCta
// Used in: Route /services/social-media

import type { Metadata } from "next";
import SocialHero from "@/components/client/services/social-media/SocialHero";
import SocialDetails from "@/components/client/services/social-media/SocialDetails";
import SocialFaq from "@/components/client/services/social-media/SocialFaq";
import AuditCta from "@/components/client/shared/AuditCta";

// Spec Requirement 18.1
export const metadata: Metadata = {
  title: "Dental Social Media Management | Stevarlabs",
  description: "Consistent, trust-building social media for UK dental practices, written with ASA and GDC advertising rules in mind.",
};

export default function SocialMediaPage() {
  return (
    <>
      <SocialHero />
      <SocialDetails />
      <SocialFaq />
      <AuditCta />
    </>
  );
}