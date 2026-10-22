// File: AboutValues.tsx
// Route/Folder: src/components/client/about
// Purpose: Details operational transparency and strict regulatory compliance.
// Imports: CheckCircle2, XCircle from lucide-react
// Used in: src/app/(public)/about/page.tsx

import { CheckCircle2, XCircle } from "lucide-react";

export default function AboutValues() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900/50 px-6 py-16 border-slate-200 border-y dark:border-slate-800">
      <div className="gap-12 grid md:grid-cols-2 mx-auto max-w-4xl">
        
        {/* How we work */}
        <div>
          <h2 className="mb-6 font-bold text-slate-900 dark:text-white text-2xl">How we work</h2>
          <ul className="space-y-6">
            <li>
              <h3 className="flex items-center gap-2 mb-1 font-bold text-slate-900 dark:text-white">
                <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                Plain English
              </h3>
              <p className="pl-7 text-slate-600 dark:text-slate-400">Plans and reports you can read in minutes, without jargon.</p>
            </li>
            <li>
              <h3 className="flex items-center gap-2 mb-1 font-bold text-slate-900 dark:text-white">
                <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                Honest reporting
              </h3>
              <p className="pl-7 text-slate-600 dark:text-slate-400">We show enquiries and bookings, not vanity numbers.</p>
            </li>
            <li>
              <h3 className="flex items-center gap-2 mb-1 font-bold text-slate-900 dark:text-white">
                <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                Within the rules
              </h3>
              <p className="pl-7 text-slate-600 dark:text-slate-400">We write and design with ASA, CAP Code and GDC standards in mind, and we never promise results nobody can control.</p>
            </li>
          </ul>
        </div>

        {/* What we don't do */}
        <div>
          <h2 className="mb-6 font-bold text-slate-900 dark:text-white text-2xl">What we don't do</h2>
          <ul className="space-y-6">
            <li>
              <h3 className="flex items-center gap-2 mb-1 font-bold text-slate-900 dark:text-white">
                <XCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
                We don't promise rankings.
              </h3>
            </li>
            <li>
              <h3 className="flex items-center gap-2 mb-1 font-bold text-slate-900 dark:text-white">
                <XCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
                We don't use fake reviews.
              </h3>
            </li>
            <li>
              <h3 className="flex items-center gap-2 mb-1 font-bold text-slate-900 dark:text-white">
                <XCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
                We don't publish anything you haven't approved.
              </h3>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}