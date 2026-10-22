// File: AuditCta.tsx
// Route/Folder: src/components/client/shared
// Purpose: Reusable Call-to-Action block displayed at the end of pages to drive users to the free audit.
// Imports: next/link, ArrowRight from lucide-react
// Used in: Homepage, Service pages, About, Resources, Pricing

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AuditCta() {
  return (
    <section 
      aria-labelledby="audit-cta-heading" 
      className="bg-blue-50/50 dark:bg-slate-900/50 px-6 py-16 sm:py-24 border-blue-100 border-y dark:border-slate-800 transition-colors duration-200"
    >
      <div className="flex flex-col items-center mx-auto max-w-3xl text-center">
        <h2 
          id="audit-cta-heading" 
          className="mb-4 font-bold text-slate-900 dark:text-white text-3xl sm:text-4xl tracking-tight"
        >
          Find out where your practice is losing patients.
        </h2>
        
        <p className="mb-8 max-w-2xl text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
          Get a free audit of your website, Google profile and patient follow-up. 
          You get a short, plain-English report with the fixes that matter most.
        </p>
        
        <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
          <Link 
            href="/free-audit" 
            className="inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-500 shadow-sm px-8 py-3.5 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 w-full sm:w-auto font-semibold text-white text-base transition-colors"
          >
            Get your free practice audit
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          <p className="mt-2 font-medium text-slate-500 dark:text-slate-400 text-sm">
            Free. No obligation.
          </p>
        </div>
      </div>
    </section>
  );
}