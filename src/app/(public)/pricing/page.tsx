// File: page.tsx
// Route/Folder: src/app/(public)/pricing
// Purpose: Orchestrates the Pricing page.
// Imports: Metadata from next, PricingHero, PricingTable, PricingBillingAndFaq, AuditCta
// Used in: Route /pricing

import type { Metadata } from "next";
import PricingHero from "@/components/client/pricing/PricingHero";
import PricingTable from "@/components/client/pricing/PricingTable";
import PricingBillingAndFaq from "@/components/client/pricing/PricingBillingAndFaq";
import AuditCta from "@/components/client/shared/AuditCta";

// Spec Requirement 18.1
export const metadata: Metadata = {
  title: "Pricing | Stevarlabs Dental Marketing",
  description: "Clear pricing for UK dental practices: local SEO, website design, patient retention and social media. Start with a free audit.",
};

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingTable />
      <PricingBillingAndFaq />
      
      {/* Pre-CTA hook from Section 13 */}
      <div className="bg-white dark:bg-slate-950 py-12 border-slate-200 dark:border-slate-800 border-t text-center">
        <p className="font-medium text-slate-900 dark:text-white text-xl">
          Not sure which fits? Get a free audit and we'll recommend a starting point.
        </p>
      </div>
      
      <AuditCta />
    </>
  );
}