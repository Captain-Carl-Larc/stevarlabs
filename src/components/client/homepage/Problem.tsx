// File: Problem.tsx
// Route/Folder: src/components/client/homepage
// Purpose: Outlines the four main areas where dental practices lose patients.
// Imports: Search, MonitorSmartphone, Users, ShieldCheck from lucide-react
// Used in: src/app/(public)/page.tsx

import { Search, MonitorSmartphone, Users, ShieldCheck } from "lucide-react";

export default function Problem() {
  return (
    <section aria-labelledby="problem-heading" className="bg-slate-50 dark:bg-slate-900/50 px-6 py-20 border-slate-200 border-y dark:border-slate-800 transition-colors duration-200">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <h2 id="problem-heading" className="mb-4 font-bold text-slate-900 dark:text-white text-3xl sm:text-4xl tracking-tight">
            Where dental practices lose patients
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Most practices don't lose patients in one big way. They lose them in four small ones.
          </p>
        </div>

        <div className="gap-8 lg:gap-12 grid sm:grid-cols-2">
          <div className="bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <Search className="mb-4 w-8 h-8 text-blue-600 dark:text-blue-500" />
            <h3 className="mb-3 font-bold text-slate-900 dark:text-white text-xl">Not found when patients search</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Someone searches "dentist near me" or "Invisalign in [their town]". If your practice isn't near the top or in the map results, the enquiry goes to someone else.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <MonitorSmartphone className="mb-4 w-8 h-8 text-blue-600 dark:text-blue-500" />
            <h3 className="mb-3 font-bold text-slate-900 dark:text-white text-xl">A website that doesn't convert</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              A slow, dated or confusing site sends patients to the next practice before they ever ring.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <Users className="mb-4 w-8 h-8 text-blue-600 dark:text-blue-500" />
            <h3 className="mb-3 font-bold text-slate-900 dark:text-white text-xl">Patients who never come back</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Check-ups lapse and treatment plans stall. Without follow-up, patients you've already won quietly drift away.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <ShieldCheck className="mb-4 w-8 h-8 text-blue-600 dark:text-blue-500" />
            <h3 className="mb-3 font-bold text-slate-900 dark:text-white text-xl">An online presence that doesn't build trust</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Patients choose dentists they trust. A quiet or inconsistent online presence makes them hesitate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}