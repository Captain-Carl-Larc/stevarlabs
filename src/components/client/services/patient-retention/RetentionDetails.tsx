// File: RetentionDetails.tsx
// Route/Folder: src/components/client/services/patient-retention
// Purpose: Outlines the recall messaging features and strict UK data consent rules.
// Imports: CalendarCheck, MessageSquare, Star, UserPlus from lucide-react
// Used in: src/app/(public)/services/patient-retention/page.tsx

import { CalendarCheck, MessageSquare, Star, UserPlus } from "lucide-react";

export default function RetentionDetails() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900/50 px-6 py-20 transition-colors duration-200">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <h2 className="mb-4 font-bold text-slate-900 dark:text-white text-3xl">Every lapsed patient is an appointment you've already earned</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            What we set up to stop patients quietly drifting away.
          </p>
        </div>

        <div className="gap-10 grid md:grid-cols-2 mb-16">
          <div className="bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <CalendarCheck className="mb-4 w-8 h-8 text-blue-600 dark:text-blue-500" />
            <h3 className="mb-3 font-bold text-slate-900 dark:text-white text-xl">Recall and reminder messages</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Clear, friendly messages that remind patients when a check-up or hygiene visit is due, and bring back those who have lapsed.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <MessageSquare className="mb-4 w-8 h-8 text-blue-600 dark:text-blue-500" />
            <h3 className="mb-3 font-bold text-slate-900 dark:text-white text-xl">Post-treatment check-ins</h3>
            <p className="text-slate-600 dark:text-slate-400">
              A short follow-up after treatment that reassures patients and spots problems early.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <Star className="mb-4 w-8 h-8 text-blue-600 dark:text-blue-500" />
            <h3 className="mb-3 font-bold text-slate-900 dark:text-white text-xl">Review requests</h3>
            <p className="text-slate-600 dark:text-slate-400">
              A simple, well-timed ask that makes it easy for happy patients to share their experience.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-950 shadow-sm p-8 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <UserPlus className="mb-4 w-8 h-8 text-blue-600 dark:text-blue-500" />
            <h3 className="mb-3 font-bold text-slate-900 dark:text-white text-xl">Referral prompts</h3>
            <p className="text-slate-600 dark:text-slate-400">
              A gentle prompt for patients who are happy to recommend you.
            </p>
          </div>
        </div>

        {/* Compliance and Data Handling */}
        <div className="bg-white dark:bg-slate-950 shadow-sm p-10 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <h2 className="mb-4 font-bold text-slate-900 dark:text-white text-2xl">Done properly: consent and data</h2>
          <p className="mb-4 text-slate-600 dark:text-slate-400 leading-relaxed">
            Reminders and promotional messages follow different rules in the UK. We build the flows around consent and clear opt-outs. Where patient data is involved we work under a written data processing agreement, and we only use what each message needs.
          </p>
          <h3 className="mt-6 mb-2 font-bold text-slate-900 dark:text-white text-lg">No patient records needed to start</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Many practices begin with well-written templates inside the system they already use. We help you make them work first, and automate once it makes sense.
          </p>
        </div>
      </div>
    </section>
  );
}