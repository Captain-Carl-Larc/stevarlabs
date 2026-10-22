// File: page.tsx
// Route/Folder: src/app/(public)/free-audit
// Purpose: Orchestrates the audit conversion page components.
// Imports: Metadata from next, AuditHeader, AuditDetails, AuditFormBlock
// Used in: Route /free-audit

import type { Metadata } from "next";
import AuditHeader from "@/components/client/free-audit/AuditHeader";
import AuditDetails from "@/components/client/free-audit/AuditDetails";
import AuditFormBlock from "@/components/client/free-audit/AuditFormBlock";

// Spec Requirement 18.1: Exact meta tags
export const metadata: Metadata = {
  title: "Free Dental Practice Growth Audit",
  description: "A free audit of your dental practice's website, Google profile and patient follow-up, with a short plain-English report of fixes.",
};

export default function FreeAuditPage() {
  return (
    <>
      <AuditHeader />
      <section className="bg-slate-50 dark:bg-slate-900/30 px-6 py-16">
        <div className="items-start gap-16 grid lg:grid-cols-2 mx-auto max-w-7xl">
          <AuditDetails />
          <AuditFormBlock />
        </div>
      </section>
    </>
  );
}