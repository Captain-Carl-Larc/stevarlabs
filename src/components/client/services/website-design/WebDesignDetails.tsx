// File: WebDesignDetails.tsx
// Route/Folder: src/components/client/services/website-design
// Purpose: Explains the mobile-first, privacy-focused build approach.
// Imports: Smartphone, MousePointerClick, FileText, Lock from lucide-react
// Used in: src/app/(public)/services/website-design-redesign/page.tsx

import { Smartphone, MousePointerClick, FileText, Lock } from "lucide-react";

export default function WebDesignDetails() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900/50 px-6 py-20 transition-colors duration-200">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <h2 className="mb-4 font-bold text-slate-900 dark:text-white text-3xl">What patients need to find, fast</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Patients are looking for treatments, prices, your team credentials, opening hours, and reassurance like reviews. We build these into a seamless journey.
          </p>
        </div>

        <div className="gap-10 grid md:grid-cols-2 mb-16">
          <div className="bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <Smartphone className="mb-4 w-8 h-8 text-blue-600 dark:text-blue-500" />
            <h3 className="mb-3 font-bold text-slate-900 dark:text-white text-xl">Mobile-first and fast</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Most patients search on their phones, so we design for a small screen first and keep pages lightweight for instant loading.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <MousePointerClick className="mb-4 w-8 h-8 text-blue-600 dark:text-blue-500" />
            <h3 className="mb-3 font-bold text-slate-900 dark:text-white text-xl">A clear booking path</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Click-to-call buttons, enquiry forms, and direct booking links are placed exactly where patients are ready to act.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <FileText className="mb-4 w-8 h-8 text-blue-600 dark:text-blue-500" />
            <h3 className="mb-3 font-bold text-slate-900 dark:text-white text-xl">Treatment pages built for search</h3>
            <p className="text-slate-600 dark:text-slate-400">
              One specific page per treatment, ensuring each service can rank independently on Google for its own search terms.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <Lock className="mb-4 w-8 h-8 text-blue-600 dark:text-blue-500" />
            <h3 className="mb-3 font-bold text-slate-900 dark:text-white text-xl">Tracking and privacy basics</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Analytics configured so you see which pages produce enquiries, paired with a cookie banner and privacy policy that fit UK rules.
            </p>
          </div>
        </div>

        {/* Spec Requirement: Redesign rules and Regulatory info */}
        <div className="bg-white dark:bg-slate-950 shadow-sm p-10 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <h2 className="mb-4 font-bold text-slate-900 dark:text-white text-2xl">New build or redesign</h2>
          <p className="mb-6 text-slate-600 dark:text-slate-400 leading-relaxed">
            If your current site already brings in traffic, we keep what works and redirect old pages properly, so you don't lose the search visibility you've earned. Replacing a site without redirects is a common way practices lose enquiries overnight.
          </p>
          <h3 className="mb-2 font-bold text-slate-900 dark:text-white text-lg">Practice Information</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We build in space for the information dental practices are expected to show, such as practitioner GDC numbers and, for CQC-registered practices in England, your CQC rating. We present a rating as a regulatory fact, never as an award.
          </p>
        </div>
      </div>
    </section>
  );
}