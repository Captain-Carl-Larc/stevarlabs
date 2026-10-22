// File: page.tsx
// Route/Folder: src/app/(public)/resources
// Purpose: Orchestrates the main Resources Hub index.
// Imports: Metadata from next, ResourcesHeader, ResourcesGrid, AuditCta
// Used in: Route /resources

import type { Metadata } from "next";
import ResourcesHeader from "@/components/client/resources/ResourcesHeader";
import ResourcesGrid from "@/components/client/resources/ResourcesGrid";
import AuditCta from "@/components/client/shared/AuditCta";

// Spec Requirement 18.1
export const metadata: Metadata = {
  title: "Free Resources for Dental Practices | Stevarlabs",
  description: "Free recall message templates, review-request wording and marketing checklists for UK dental practices.",
};

export default function ResourcesPage() {
  return (
    <>
      <ResourcesHeader />
      <ResourcesGrid />
      <AuditCta />
    </>
  );
}