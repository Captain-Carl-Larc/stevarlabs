// File: page.tsx
// Route/Folder: src/app/(public)/about
// Purpose: Orchestrates the About page content.
// Imports: Metadata from next, AboutIntro, AboutValues, AboutFounder, AuditCta
// Used in: Route /about

import type { Metadata } from "next";
import AboutIntro from "@/components/client/about/AboutIntro";
import AboutValues from "@/components/client/about/AboutValues";
import AboutFounder from "@/components/client/about/AboutFounder";
import AuditCta from "@/components/client/shared/AuditCta";

// Spec Requirement 18.1: Exact meta tags
export const metadata: Metadata = {
  title: "About Stevarlabs",
  description: "Why Stevarlabs exists and how we help UK dental practices get more new patients and keep the ones they have.",
};

export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <AboutValues />
      <AboutFounder />
      <AuditCta />
    </>
  );
}