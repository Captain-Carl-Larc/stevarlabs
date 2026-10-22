// File: AuditDetails.tsx
// Route/Folder: src/components/client/free-audit
// Purpose: Explains what the audit reviews, what the user gets, and what happens next.
// Imports: next/link, CheckCircle2, FileText from lucide-react
// Used in: src/app/(public)/free-audit/page.tsx

import Link from "next/link";
import { CheckCircle2, FileText } from "lucide-react";

export default function AuditDetails() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="mb-6 font-bold text-slate-900 dark:text-white text-2xl">What we review</h2>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-500 shrink-0" />
            <span className="text-slate-600 dark:text-slate-400">Your website: speed, mobile experience and booking path</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-500 shrink-0" />
            <span className="text-slate-600 dark:text-slate-400">Your Google Business Profile and local search visibility</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-500 shrink-0" />
            <span className="text-slate-600 dark:text-slate-400">How you follow up with patients after a visit or enquiry</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-500 shrink-0" />
            <span className="text-slate-600 dark:text-slate-400">How your practice appears to a new patient online</span>
          </li>
        </ul>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
        <h2 className="mb-2 font-bold text-slate-900 dark:text-white text-xl">What you get</h2>
        <p className="text-slate-600 dark:text-slate-400">
          A short, plain-English report with prioritised fixes, delivered within [X] working days. You are under no obligation to hire us.
        </p>
      </div>

      <div>
        <h2 className="mb-6 font-bold text-slate-900 dark:text-white text-2xl">What happens next</h2>
        <ol className="space-y-4 text-slate-600 dark:text-slate-400 list-decimal list-inside">
          <li><strong className="text-slate-900 dark:text-slate-300">We confirm receipt</strong> by email.</li>
          <li><strong className="text-slate-900 dark:text-slate-300">We review</strong> your site, profile and follow-up.</li>
          <li><strong className="text-slate-900 dark:text-slate-300">You receive your report</strong>, and we offer a short call to walk through it, only if you want one.</li>
        </ol>
      </div>

      <div className="pt-6 border-slate-200 dark:border-slate-800 border-t">
        <h2 className="mb-4 font-bold text-slate-900 dark:text-white text-lg">See a sample</h2>
        <Link href="/sample-audit.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:hover:text-blue-300 dark:text-blue-400 transition-colors">
          <FileText className="mr-2 w-5 h-5" />
          View an anonymised sample audit
        </Link>
      </div>
    </div>
  );
}