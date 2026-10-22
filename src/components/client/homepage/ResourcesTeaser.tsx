// File: ResourcesTeaser.tsx
// Route/Folder: src/components/client/homepage
// Purpose: Short promotional section for free resources to capture top-of-funnel users.
// Imports: next/link
// Used in: src/app/(public)/page.tsx

import Link from "next/link";

export default function ResourcesTeaser() {
  return (
    <section aria-labelledby="resources-heading" className="bg-white dark:bg-slate-950 px-6 py-20 text-center transition-colors duration-200">
      <div className="mx-auto max-w-3xl">
        <h2 id="resources-heading" className="mb-4 font-bold text-slate-900 dark:text-white text-3xl sm:text-4xl tracking-tight">
          Free resources for dental practices
        </h2>
        <p className="mb-8 text-slate-600 dark:text-slate-400 text-lg">
          Recall and follow-up message templates, review-request wording and checklists you can use today.
        </p>
        <Link href="/resources" className="inline-flex justify-center items-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-6 py-3 rounded-md font-semibold text-slate-900 dark:text-white text-base transition-colors">
          Browse resources
        </Link>
      </div>
    </section>
  );
}