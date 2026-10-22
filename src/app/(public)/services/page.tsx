// File: page.tsx
// Route/Folder: src/app/(public)/services
// Purpose: Orchestrates the Services Index page.
// Imports: Metadata from next, ServicesHeader, ServicesList, AuditCta
// Used in: Route /services

import type { Metadata } from "next";
import ServicesHeader from "@/components/client/services-index/ServicesHeader";
import ServicesList from "@/components/client/services-index/ServicesList";
import AuditCta from "@/components/client/shared/AuditCta";

// Spec Requirement 18.1: Exact meta tags
export const metadata: Metadata = {
  title: "Dental Marketing Services for UK Practices",
  description: "Four services to bring in and keep more dental patients: local SEO, website design, patient retention and recall, and social media.",
};

export default function ServicesIndexPage() {
  return (
    <>
      <ServicesHeader />
      <ServicesList />
      <AuditCta />
    </>
  );
}