// File: Hero.tsx
// Route/Folder: src/components/client/homepage
// Purpose: The initial viewport section introducing the agency and primary CTA.
// Imports: next/link, ArrowRight from lucide-react
// Used in: src/app/(public)/page.tsx

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-white dark:bg-slate-950 px-6 lg:px-8 py-20 sm:py-32 overflow-hidden transition-colors duration-200">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-6 font-bold text-slate-900 dark:text-white text-4xl sm:text-6xl tracking-tight">
          Dental Marketing Agency for UK Practices
        </h1>
        <p className="mx-auto mb-10 max-w-3xl text-slate-600 dark:text-slate-400 text-lg sm:text-xl leading-8">
          Stevarlabs helps UK dental practices get more new-patient enquiries and keep the patients they already have, through local search, a website that converts, and follow-up that brings patients back.
        </p>
        <div className="flex sm:flex-row flex-col justify-center items-center gap-4">
          <Link
            href="/free-audit"
            className="inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-500 shadow-sm px-8 py-3.5 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 w-full sm:w-auto font-semibold text-white text-base transition-colors"
          >
            Get your free practice audit
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex justify-center items-center hover:bg-slate-50 dark:hover:bg-slate-900 px-8 py-3.5 border border-slate-200 dark:border-slate-800 rounded-md w-full sm:w-auto font-semibold text-slate-900 dark:text-white text-base transition-colors"
          >
            See how it works
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2 mt-6 text-slate-500 dark:text-slate-400 text-sm">
          <p className="font-medium">Free. No obligation. A plain-English report on where enquiries are leaking.</p>
          <p>Built for private and mixed NHS and private dental practices.</p>
        </div>
      </div>
    </section>
  );
}