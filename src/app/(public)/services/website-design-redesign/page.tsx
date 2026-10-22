// File: page.tsx
// Route/Folder: src/app/(public)/services/website-design-redesign
// Purpose: Orchestrates the Website Design service page.
// Imports: Metadata from next, WebDesignHero, WebDesignDetails, WebDesignFaq, AuditCta
// Used in: Route /services/website-design-redesign

import type { Metadata } from "next";
import WebDesignHero from "@/components/client/services/website-design/WebDesignHero";
import WebDesignDetails from "@/components/client/services/website-design/WebDesignDetails";
import WebDesignFaq from "@/components/client/services/website-design/WebDesignFaq";
import AuditCta from "@/components/client/shared/AuditCta";

// Spec Requirement 18.1
export const metadata: Metadata = {
  title: "Dental Website Design and Redesign",
  description: "Fast, mobile-first websites for UK dental practices, built to turn visitors into booked appointments. New builds and redesigns.",
};

export default function WebDesignPage() {
  return (
    <>
      <WebDesignHero />
      <WebDesignDetails />
      <WebDesignFaq />
      <AuditCta />
    </>
  );
}