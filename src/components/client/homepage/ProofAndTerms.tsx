// File: ProofAndTerms.tsx
// Route/Folder: src/components/client/homepage
// Purpose: Combined grid section handling ASA/GDC compliance rules, sample audit proof, and business terms.
// Imports: next/link, CheckCircle2, FileText from lucide-react
// Used in: src/app/(public)/page.tsx

import Link from "next/link";
import { CheckCircle2, FileText } from "lucide-react";

export default function ProofAndTerms() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900/50 px-6 py-20 border-slate-200 border-y dark:border-slate-800 transition-colors duration-200">
      <div className="gap-12 grid md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
        <div>
          <h2 className="mb-4 font-bold text-slate-900 dark:text-white text-2xl tracking-tight">
            Built for dental, written with the rules in mind
          </h2>
          <p className="mb-4 text-slate-600 dark:text-slate-400">
            Dental marketing has rules. Advertising is covered by the ASA and CAP Code, and dental professionals work to General Dental Council standards. We write and design with those rules in mind, avoid guarantees and exaggerated claims, and flag anything that needs your sign-off before it goes live.
          </p>
          <p className="text-slate-500 dark:text-slate-500 text-xs italic">
            Your practice remains responsible for what it publishes. We help you get it right; we do not provide legal advice.
          </p>
        </div>

        <div>
          <h2 className="mb-4 font-bold text-slate-900 dark:text-white text-2xl tracking-tight">
            See what you would get
          </h2>
          <p className="mb-6 text-slate-600 dark:text-slate-400">
            We would rather show you our work than overstate it. Here is a sample audit so you can see exactly what lands in your inbox.
          </p>
          <Link href="/sample-audit.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 mb-6 px-5 py-2.5 rounded-md font-semibold text-blue-600 dark:text-blue-400 text-sm transition-colors">
            <FileText className="mr-2 w-4 h-4" /> View a sample audit
          </Link>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            <span className="font-semibold text-slate-900 dark:text-white">How we measure results:</span> we track new-patient enquiries, calls, form submissions and bookings, and report them every month.
          </p>
        </div>

        <div>
          <h2 className="mb-4 font-bold text-slate-900 dark:text-white text-2xl tracking-tight">
            Straightforward terms
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 w-5 h-5 text-blue-600 dark:text-blue-500 shrink-0" />
              <span className="text-slate-600 dark:text-slate-400">A free audit with no obligation</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 w-5 h-5 text-blue-600 dark:text-blue-500 shrink-0" />
              <span className="text-slate-600 dark:text-slate-400">[Month-to-month retainers, no long lock-in]</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 w-5 h-5 text-blue-600 dark:text-blue-500 shrink-0" />
              <span className="text-slate-600 dark:text-slate-400">Monthly reporting in plain English</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 w-5 h-5 text-blue-600 dark:text-blue-500 shrink-0" />
              <span className="text-slate-600 dark:text-slate-400">No guarantees of rankings or patient numbers. No one can promise a Google position, and we won't.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}