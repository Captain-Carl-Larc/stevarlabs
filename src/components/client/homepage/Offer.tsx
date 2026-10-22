// File: Offer.tsx
// Route/Folder: src/components/client/homepage
// Purpose: Mid-page form driving the primary conversion goal (Free Audit).
// Imports: next/link, CheckCircle2 from lucide-react
// Used in: src/app/(public)/page.tsx

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function Offer() {
  return (
    <section aria-labelledby="offer-heading" className="bg-white dark:bg-slate-950 px-6 py-20 transition-colors duration-200">
      <div className="items-center gap-16 grid lg:grid-cols-2 mx-auto max-w-7xl">
        <div>
          <h2 id="offer-heading" className="mb-6 font-bold text-slate-900 dark:text-white text-3xl sm:text-4xl tracking-tight">
            Find out where your practice is losing patients
          </h2>
          <p className="mb-8 text-slate-600 dark:text-slate-400 text-lg">
            Our free practice growth audit checks the four places patients are won or lost, and tells you what to fix first.
          </p>
          
          <h3 className="mb-4 font-bold text-slate-900 dark:text-white text-lg">What we review:</h3>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-500 shrink-0" />
              <span className="text-slate-600 dark:text-slate-400">Your website: speed, mobile experience and how easy it is to book</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-500 shrink-0" />
              <span className="text-slate-600 dark:text-slate-400">Your Google Business Profile and local search visibility for the treatments you want to grow</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-500 shrink-0" />
              <span className="text-slate-600 dark:text-slate-400">How you follow up with patients after a visit or enquiry</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-500 shrink-0" />
              <span className="text-slate-600 dark:text-slate-400">How your practice looks online to a new patient</span>
            </li>
          </ul>
          <div className="bg-slate-50 dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 rounded-lg">
            <p className="font-medium text-slate-900 dark:text-white">What you get:</p>
            <p className="mt-1 text-slate-600 dark:text-slate-400">A short, plain-English report with prioritised fixes, delivered within [X] working days.</p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/50 shadow-sm p-8 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <form action="/api/audit" method="POST" className="space-y-5">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium text-slate-900 dark:text-white text-sm">Name</label>
              <input type="text" id="name" name="name" required className="bg-white dark:bg-slate-950 px-4 py-2.5 border border-slate-300 focus:border-blue-500 dark:border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full text-slate-900 dark:text-white text-sm transition-colors" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-slate-900 dark:text-white text-sm">Work email</label>
              <input type="email" id="email" name="email" required className="bg-white dark:bg-slate-950 px-4 py-2.5 border border-slate-300 focus:border-blue-500 dark:border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full text-slate-900 dark:text-white text-sm transition-colors" />
            </div>
            <div>
              <label htmlFor="practice" className="block mb-1 font-medium text-slate-900 dark:text-white text-sm">Practice name</label>
              <input type="text" id="practice" name="practice" required className="bg-white dark:bg-slate-950 px-4 py-2.5 border border-slate-300 focus:border-blue-500 dark:border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full text-slate-900 dark:text-white text-sm transition-colors" />
            </div>
            <div>
              <label htmlFor="website" className="block mb-1 font-medium text-slate-900 dark:text-white text-sm">Practice website URL</label>
              <input type="url" id="website" name="website" required className="bg-white dark:bg-slate-950 px-4 py-2.5 border border-slate-300 focus:border-blue-500 dark:border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full text-slate-900 dark:text-white text-sm transition-colors" />
            </div>
            <div>
              <label htmlFor="town" className="block mb-1 font-medium text-slate-900 dark:text-white text-sm">Town or city (optional)</label>
              <input type="text" id="town" name="town" className="bg-white dark:bg-slate-950 px-4 py-2.5 border border-slate-300 focus:border-blue-500 dark:border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full text-slate-900 dark:text-white text-sm transition-colors" />
            </div>
            
            <div className="pt-2">
              <button type="submit" className="bg-blue-600 hover:bg-blue-500 shadow-sm px-4 py-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 w-full font-semibold text-white text-sm transition-colors">
                Send me my free audit
              </button>
              <p className="mt-3 text-slate-500 dark:text-slate-400 text-xs text-center">
                Free. No obligation. No sales pressure. <br className="hidden sm:block" />
                We use your details to respond to your enquiry. See our <Link href="/privacy-policy" className="hover:text-blue-600 underline">privacy policy</Link>.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}