// File: page.tsx
// Route/Folder: src/app/(public)/resources/recall-message-templates
// Purpose: Orchestrates the single resource page layout (content on left, download form on right).
// Imports: Metadata from next, ResourceContent, ResourceDownloadForm, AuditCta
// Used in: Route /resources/recall-message-templates

import type { Metadata } from "next";
import ResourceContent from "@/components/client/resources/single/ResourceContent";
import ResourceDownloadForm from "@/components/client/resources/single/ResourceDownloadForm";
import AuditCta from "@/components/client/shared/AuditCta";

export const metadata: Metadata = {
  title: "Dental Recall & Follow-up Message Templates | Stevarlabs",
  description: "Free, ready-to-use recall message templates, check-ins, and review requests for UK dental practices.",
};

export default function RecallTemplatesPage() {
  return (
    <>
      <section className="bg-white dark:bg-slate-950 px-6 pt-20 pb-12 border-slate-200 dark:border-slate-800 border-b">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-4 max-w-3xl font-bold text-slate-900 dark:text-white text-4xl sm:text-5xl tracking-tight">
            Dental recall and follow-up message templates
          </h1>
          <p className="max-w-3xl text-slate-600 dark:text-slate-400 text-xl">
            Everything you need to bring lapsed patients back and keep your chairs full, written with UK rules in mind.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 dark:bg-slate-900/30 px-6 py-16">
        <div className="items-start gap-12 lg:gap-16 grid lg:grid-cols-[1fr_400px] mx-auto max-w-7xl">
          <ResourceContent />
          <ResourceDownloadForm />
        </div>
      </section>
      
      <AuditCta />
    </>
  );
}