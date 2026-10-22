// File: ResourcesGrid.tsx
// Route/Folder: src/components/client/resources
// Purpose: Grid layout displaying available resource cards.
// Imports: next/link, FileText, ArrowRight from lucide-react
// Used in: src/app/(public)/resources/page.tsx

import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";

export default function ResourcesGrid() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900/50 px-6 py-20 transition-colors duration-200">
      <div className="gap-8 grid sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
        
        {/* Resource Card 1: Built for launch */}
        <Link href="/resources/recall-message-templates" className="group flex flex-col bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 hover:border-blue-500 dark:border-slate-800 dark:hover:border-blue-500 rounded-2xl transition-colors">
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full font-medium text-blue-600 dark:text-blue-400 text-xs">
              <FileText className="w-3.5 h-3.5" />
              Templates
            </span>
          </div>
          <h2 className="mb-3 font-bold text-slate-900 dark:group-hover:text-blue-400 dark:text-white group-hover:text-blue-600 text-xl transition-colors">
            Dental recall and follow-up message templates
          </h2>
          <p className="flex-1 mb-8 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            A library of ready-to-use messages for check-ups, lapsed patients, and review requests, complete with UK compliance notes.
          </p>
          <span className="inline-flex items-center font-semibold text-blue-600 dark:text-blue-400 text-sm">
            View templates <ArrowRight className="ml-1 w-4 h-4" />
          </span>
        </Link>

        {/* Backlog Resources: Displayed as coming soon for layout demonstration */}
        <div className="flex flex-col bg-slate-100 dark:bg-slate-900/30 opacity-60 p-8 border border-slate-200 dark:border-slate-800 border-dashed rounded-2xl">
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full font-medium text-slate-600 dark:text-slate-400 text-xs">
              Checklist
            </span>
          </div>
          <h2 className="mb-3 font-bold text-slate-900 dark:text-white text-xl">
            Google Business Profile checklist
          </h2>
          <p className="flex-1 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Coming soon. A step-by-step guide to setting up and optimising your practice profile for local search.
          </p>
        </div>

      </div>
    </section>
  );
}