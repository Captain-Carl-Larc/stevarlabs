// File: ServicesList.tsx
// Route/Folder: src/components/client/services-index
// Purpose: Displays the 4 distinct service cards with outcome headlines.
// Imports: next/link, ArrowRight from lucide-react
// Used in: src/app/(public)/services/page.tsx

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ServicesList() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900/50 px-6 py-16 border-slate-200 dark:border-slate-800 border-t">
      <div className="gap-8 grid sm:grid-cols-2 mx-auto max-w-7xl">
        
        <Link href="/services/local-seo" className="group flex flex-col bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 hover:border-blue-500 dark:border-slate-800 dark:hover:border-blue-500 rounded-2xl transition-colors">
          <h2 className="mb-4 font-bold text-slate-900 dark:group-hover:text-blue-400 dark:text-white group-hover:text-blue-600 text-2xl transition-colors">Get found by patients near you</h2>
          <p className="flex-1 mb-8 text-slate-600 dark:text-slate-400">Local SEO and Google Business Profile management so your practice shows up when people search for a dentist or a treatment nearby.</p>
          <span className="inline-flex items-center font-semibold text-blue-600 dark:text-blue-400 text-sm">Local SEO for dental practices <ArrowRight className="ml-1 w-4 h-4" /></span>
        </Link>
        
        <Link href="/services/website-design-redesign" className="group flex flex-col bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 hover:border-blue-500 dark:border-slate-800 dark:hover:border-blue-500 rounded-2xl transition-colors">
          <h2 className="mb-4 font-bold text-slate-900 dark:group-hover:text-blue-400 dark:text-white group-hover:text-blue-600 text-2xl transition-colors">Turn visitors into booked appointments</h2>
          <p className="flex-1 mb-8 text-slate-600 dark:text-slate-400">A fast, mobile-first website designed to make booking the obvious next step. New builds and redesigns.</p>
          <span className="inline-flex items-center font-semibold text-blue-600 dark:text-blue-400 text-sm">Dental website design and redesign <ArrowRight className="ml-1 w-4 h-4" /></span>
        </Link>
        
        <Link href="/services/patient-retention" className="group flex flex-col bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 hover:border-blue-500 dark:border-slate-800 dark:hover:border-blue-500 rounded-2xl transition-colors">
          <h2 className="mb-4 font-bold text-slate-900 dark:group-hover:text-blue-400 dark:text-white group-hover:text-blue-600 text-2xl transition-colors">Bring patients back and keep them</h2>
          <p className="flex-1 mb-8 text-slate-600 dark:text-slate-400">Recall, check-in, review and referral follow-up that brings lapsed patients back and keeps happy ones coming.</p>
          <span className="inline-flex items-center font-semibold text-blue-600 dark:text-blue-400 text-sm">Patient retention and recall <ArrowRight className="ml-1 w-4 h-4" /></span>
        </Link>
        
        <Link href="/services/social-media" className="group flex flex-col bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 hover:border-blue-500 dark:border-slate-800 dark:hover:border-blue-500 rounded-2xl transition-colors">
          <h2 className="mb-4 font-bold text-slate-900 dark:group-hover:text-blue-400 dark:text-white group-hover:text-blue-600 text-2xl transition-colors">Be the practice people choose</h2>
          <p className="flex-1 mb-8 text-slate-600 dark:text-slate-400">Consistent, trust-building social media that shows your team and your approach, within advertising rules.</p>
          <span className="inline-flex items-center font-semibold text-blue-600 dark:text-blue-400 text-sm">Dental social media management <ArrowRight className="ml-1 w-4 h-4" /></span>
        </Link>
        
      </div>
    </section>
  );
}