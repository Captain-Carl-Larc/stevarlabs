// File: SocialDetails.tsx
// Route/Folder: src/components/client/services/social-media
// Purpose: Outlines social media management workflow and regulatory adherence.
// Imports: Calendar, CheckSquare, BarChart, ShieldCheck from lucide-react
// Used in: src/app/(public)/services/social-media/page.tsx

import { Calendar, CheckSquare, BarChart, ShieldCheck } from "lucide-react";

export default function SocialDetails() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900/50 px-6 py-20 transition-colors duration-200">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <h2 className="mb-4 font-bold text-slate-900 dark:text-white text-3xl">Patients choose dentists they trust</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            What we do to build a professional, compliant, and engaging presence for your practice.
          </p>
        </div>

        <div className="gap-8 grid md:grid-cols-3 mb-16">
          <div className="bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <Calendar className="mb-4 w-8 h-8 text-blue-600 dark:text-blue-500" />
            <h3 className="mb-3 font-bold text-slate-900 dark:text-white text-xl">Planning and content</h3>
            <p className="text-slate-600 dark:text-slate-400">
              A monthly plan of posts that show your team, explain treatments in plain English and answer common patient questions.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <CheckSquare className="mb-4 w-8 h-8 text-blue-600 dark:text-blue-500" />
            <h3 className="mb-3 font-bold text-slate-900 dark:text-white text-xl">Approvals you control</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Nothing goes live without your sign-off. Treatment claims, patient images and before-and-after content get an extra check.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <BarChart className="mb-4 w-8 h-8 text-blue-600 dark:text-blue-500" />
            <h3 className="mb-3 font-bold text-slate-900 dark:text-white text-xl">Reporting</h3>
            <p className="text-slate-600 dark:text-slate-400">
              A simple monthly report on reach, engagement and the enquiries social media brings in.
            </p>
          </div>
        </div>

        {/* Regulatory Compliance Block */}
        <div className="flex md:flex-row flex-col items-start gap-8 bg-white dark:bg-slate-950 shadow-sm p-10 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <ShieldCheck className="w-12 h-12 text-blue-600 dark:text-blue-500 shrink-0" />
          <div>
            <h2 className="mb-4 font-bold text-slate-900 dark:text-white text-2xl">Within the rules</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              Dental advertising is covered by the ASA and CAP Code, and dental professionals follow GDC standards. We avoid exaggerated claims and guarantees, and we get written consent before using patient images or stories. 
            </p>
            <p className="font-semibold text-slate-900 dark:text-slate-300 text-sm">
              Your practice stays responsible for what it publishes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}