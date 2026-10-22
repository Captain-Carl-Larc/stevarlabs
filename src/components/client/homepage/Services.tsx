// File: Services.tsx
// Route/Folder: src/components/client/homepage
// Purpose: Presents the 4 main service offerings as clickable cards.
// Imports: next/link, ArrowRight from lucide-react
// Used in: src/app/(public)/page.tsx

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Services() {
  return (
    <section aria-labelledby="services-heading" className="bg-slate-50 dark:bg-slate-900/50 px-6 py-20 border-slate-200 border-y dark:border-slate-800 transition-colors duration-200">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <h2 id="services-heading" className="mb-4 font-bold text-slate-900 dark:text-white text-3xl sm:text-4xl tracking-tight">
            What we do to bring in and keep more patients
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Four services, one aim: more patients in the door, and more of them staying.
          </p>
        </div>

        <div className="gap-6 grid sm:grid-cols-2">
          <Link href="/services/local-seo" className="group block bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 hover:border-blue-500 dark:border-slate-800 dark:hover:border-blue-500 rounded-2xl transition-colors">
            <h3 className="mb-3 font-bold text-slate-900 dark:group-hover:text-blue-400 dark:text-white group-hover:text-blue-600 text-xl transition-colors">Get found by patients near you</h3>
            <p className="mb-6 text-slate-600 dark:text-slate-400">Local SEO and Google Business Profile management so your practice shows up when people search for a dentist or a treatment nearby.</p>
            <span className="inline-flex items-center font-semibold text-blue-600 dark:text-blue-400 text-sm">Local SEO for dental practices <ArrowRight className="ml-1 w-4 h-4" /></span>
          </Link>
          
          <Link href="/services/website-design-redesign" className="group block bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 hover:border-blue-500 dark:border-slate-800 dark:hover:border-blue-500 rounded-2xl transition-colors">
            <h3 className="mb-3 font-bold text-slate-900 dark:group-hover:text-blue-400 dark:text-white group-hover:text-blue-600 text-xl transition-colors">Turn visitors into booked appointments</h3>
            <p className="mb-6 text-slate-600 dark:text-slate-400">A fast, mobile-first website designed to make booking the obvious next step. New builds and redesigns.</p>
            <span className="inline-flex items-center font-semibold text-blue-600 dark:text-blue-400 text-sm">Dental website design <ArrowRight className="ml-1 w-4 h-4" /></span>
          </Link>
          
          <Link href="/services/patient-retention" className="group block bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 hover:border-blue-500 dark:border-slate-800 dark:hover:border-blue-500 rounded-2xl transition-colors">
            <h3 className="mb-3 font-bold text-slate-900 dark:group-hover:text-blue-400 dark:text-white group-hover:text-blue-600 text-xl transition-colors">Bring patients back and keep them</h3>
            <p className="mb-6 text-slate-600 dark:text-slate-400">Recall, check-in, review and referral follow-up that brings lapsed patients back and keeps happy ones coming.</p>
            <span className="inline-flex items-center font-semibold text-blue-600 dark:text-blue-400 text-sm">Patient retention and recall <ArrowRight className="ml-1 w-4 h-4" /></span>
          </Link>
          
          <Link href="/services/social-media" className="group block bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 hover:border-blue-500 dark:border-slate-800 dark:hover:border-blue-500 rounded-2xl transition-colors">
            <h3 className="mb-3 font-bold text-slate-900 dark:group-hover:text-blue-400 dark:text-white group-hover:text-blue-600 text-xl transition-colors">Be the practice people choose</h3>
            <p className="mb-6 text-slate-600 dark:text-slate-400">Consistent, trust-building social media that shows your team and your approach, within advertising rules.</p>
            <span className="inline-flex items-center font-semibold text-blue-600 dark:text-blue-400 text-sm">Dental social media <ArrowRight className="ml-1 w-4 h-4" /></span>
          </Link>
        </div>
      </div>
    </section>
  );
}