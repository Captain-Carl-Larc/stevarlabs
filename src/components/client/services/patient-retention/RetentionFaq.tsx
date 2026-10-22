// File: RetentionFaq.tsx
// Route/Folder: src/components/client/services/patient-retention
// Purpose: FAQ accordion addressing data access, systems, and compliance.
// Imports: None
// Used in: src/app/(public)/services/patient-retention/page.tsx

export default function RetentionFaq() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 py-20 transition-colors duration-200">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 font-bold text-slate-900 dark:text-white text-3xl text-center">Questions about patient retention</h2>
        
        <div className="space-y-4">
          <details className="group bg-slate-50 dark:bg-slate-900/50 open:shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
            <summary className="flex justify-between items-center px-6 py-4 font-semibold text-slate-900 dark:text-white text-lg marker:content-none cursor-pointer">
              Do you need access to our patient records?
              <span className="flex-shrink-0 ml-4 text-slate-400 group-open:rotate-180 transition-transform duration-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-4 text-slate-600 dark:text-slate-400">
              Not necessarily. We can provide you with optimised templates to deploy within your existing practice management software, or integrate directly if preferred under a strict data processing agreement.
            </div>
          </details>

          <details className="group bg-slate-50 dark:bg-slate-900/50 open:shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
            <summary className="flex justify-between items-center px-6 py-4 font-semibold text-slate-900 dark:text-white text-lg marker:content-none cursor-pointer">
              Is this compliant with UK rules on messaging?
              <span className="flex-shrink-0 ml-4 text-slate-400 group-open:rotate-180 transition-transform duration-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-4 text-slate-600 dark:text-slate-400">
              We build around consent and explicit opt-outs. However, you remain responsible as the data controller for your patient data and acquiring proper consents. This does not constitute legal advice.
            </div>
          </details>

          <details className="group bg-slate-50 dark:bg-slate-900/50 open:shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
            <summary className="flex justify-between items-center px-6 py-4 font-semibold text-slate-900 dark:text-white text-lg marker:content-none cursor-pointer">
              How do you measure whether it works?
              <span className="flex-shrink-0 ml-4 text-slate-400 group-open:rotate-180 transition-transform duration-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-4 text-slate-600 dark:text-slate-400">
              We measure reactivation rates—specifically tracking how many lapsed patients book an appointment following a recall sequence, alongside the increase in your Google Business review counts.
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}