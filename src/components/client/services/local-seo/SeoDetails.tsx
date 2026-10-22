// File: SeoDetails.tsx
// Route/Folder: src/components/client/services/local-seo
// Purpose: Explains the combined approach to Google Business Profiles and traditional/general SEO.
// Imports: MapPin, Globe, Star, BarChart3 from lucide-react
// Used in: src/app/(public)/services/local-seo/page.tsx

import { MapPin, Globe, Star, BarChart3 } from "lucide-react";

export default function SeoDetails() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900/50 px-6 py-20 transition-colors duration-200">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <h2 className="mb-4 font-bold text-slate-900 dark:text-white text-3xl">Why search decides who gets the call</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            When someone searches for a dentist, Google shows a handful of map results and traditional organic links. Most calls and direction requests go to those top spots. If your practice isn't there, a competitor gets the enquiry. We tackle both the local map pack and your general organic visibility.
          </p>
        </div>

        <div className="gap-10 grid md:grid-cols-2">
          <div className="bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <MapPin className="mb-4 w-8 h-8 text-blue-600 dark:text-blue-500" />
            <h3 className="mb-3 font-bold text-slate-900 dark:text-white text-xl">Google Business Profile optimisation</h3>
            <p className="text-slate-600 dark:text-slate-400">
              We set up and optimise your profile so it is accurate, complete and persuasive: correct categories, services, opening hours, photos, and posts that give patients a reason to choose you locally.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <Globe className="mb-4 w-8 h-8 text-blue-600 dark:text-blue-500" />
            <h3 className="mb-3 font-bold text-slate-900 dark:text-white text-xl">General SEO & Treatment pages</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Beyond the map, your website needs strong technical foundations and targeted pages. We build one strong page per treatment (check-ups, implants, Invisalign), aimed at what patients actually search for across broader UK search results.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <Star className="mb-4 w-8 h-8 text-blue-600 dark:text-blue-500" />
            <h3 className="mb-3 font-bold text-slate-900 dark:text-white text-xl">Reviews and reputation</h3>
            <p className="text-slate-600 dark:text-slate-400">
              A simple, consent-aware process for asking happy patients for reviews, and a calm approach to replying to them. This builds trust and heavily influences local rankings.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <BarChart3 className="mb-4 w-8 h-8 text-blue-600 dark:text-blue-500" />
            <h3 className="mb-3 font-bold text-slate-900 dark:text-white text-xl">Tracking you can read</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Monthly reporting on calls, direction requests, website enquiries, and where you appear in search results. SEO takes months, but we report early signals like profile views from month one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}