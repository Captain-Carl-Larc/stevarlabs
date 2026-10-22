// File: page.tsx
// Route/Folder: src/app/(public)/services/patient-retention
// Purpose: Orchestrates the Patient Retention service page.
// Imports: Metadata from next, RetentionHero, RetentionDetails, RetentionFaq, AuditCta
// Used in: Route /services/patient-retention

import type { Metadata } from "next";
import RetentionHero from "@/components/client/services/patient-retention/RetentionHero";
import RetentionDetails from "@/components/client/services/patient-retention/RetentionDetails";
import RetentionFaq from "@/components/client/services/patient-retention/RetentionFaq";
import AuditCta from "@/components/client/shared/AuditCta";

// Spec Requirement 18.1
export const metadata: Metadata = {
  title: "Patient Retention and Recall for Dental Practices",
  description: "Bring lapsed patients back and keep happy ones coming. Recall, check-in, review and referral follow-up for UK dental practices.",
};

export default function RetentionPage() {
  return (
    <>
      <RetentionHero />
      <RetentionDetails />
      <RetentionFaq />
      <AuditCta />
    </>
  );
}