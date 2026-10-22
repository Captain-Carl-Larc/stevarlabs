// File: Faq.tsx
// Route/Folder: src/components/client/homepage
// Purpose: Accessible accordion displaying frequently asked questions.
// Imports: None
// Used in: src/app/(public)/page.tsx

export default function Faq() {
  return (
    <section aria-labelledby="faq-heading" className="bg-slate-50 dark:bg-slate-900/50 px-6 py-20 border-slate-200 border-y dark:border-slate-800 transition-colors duration-200">
      <div className="mx-auto max-w-3xl">
        <h2 id="faq-heading" className="mb-8 font-bold text-slate-900 dark:text-white text-3xl sm:text-4xl text-center tracking-tight">
          Questions practice owners ask
        </h2>
        
        <div className="space-y-4">
          <details className="group bg-white dark:bg-slate-950 open:shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
            <summary className="flex justify-between items-center px-6 py-4 font-semibold text-slate-900 dark:text-white text-lg marker:content-none cursor-pointer">
              Do you work with NHS or private practices?
              <span className="flex-shrink-0 ml-4 text-slate-400 group-open:rotate-180 transition-transform duration-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-4 text-slate-600 dark:text-slate-400">
              Both. Our focus is helping private and mixed NHS and private practices grow their private and higher-value treatment work.
            </div>
          </details>

          <details className="group bg-white dark:bg-slate-950 open:shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
            <summary className="flex justify-between items-center px-6 py-4 font-semibold text-slate-900 dark:text-white text-lg marker:content-none cursor-pointer">
              How long does SEO take?
              <span className="flex-shrink-0 ml-4 text-slate-400 group-open:rotate-180 transition-transform duration-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-4 text-slate-600 dark:text-slate-400">
              Local SEO usually takes months, not weeks. We report early signals such as profile views, calls and impressions from the first month, so you can see progress before rankings move.
            </div>
          </details>

          <details className="group bg-white dark:bg-slate-950 open:shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
            <summary className="flex justify-between items-center px-6 py-4 font-semibold text-slate-900 dark:text-white text-lg marker:content-none cursor-pointer">
              Do you guarantee results?
              <span className="flex-shrink-0 ml-4 text-slate-400 group-open:rotate-180 transition-transform duration-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-4 text-slate-600 dark:text-slate-400">
              No. Nobody honest can promise a ranking or a number of patients. We commit to the work, the reporting and the transparency.
            </div>
          </details>

          <details className="group bg-white dark:bg-slate-950 open:shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
            <summary className="flex justify-between items-center px-6 py-4 font-semibold text-slate-900 dark:text-white text-lg marker:content-none cursor-pointer">
              Do you handle patient data?
              <span className="flex-shrink-0 ml-4 text-slate-400 group-open:rotate-180 transition-transform duration-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-4 text-slate-600 dark:text-slate-400">
              Only where a service needs it, and then under a written data processing agreement. Many of our retention tools work without you sharing patient records.
            </div>
          </details>
          
          <details className="group bg-white dark:bg-slate-950 open:shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
            <summary className="flex justify-between items-center px-6 py-4 font-semibold text-slate-900 dark:text-white text-lg marker:content-none cursor-pointer">
              What does the free audit involve?
              <span className="flex-shrink-0 ml-4 text-slate-400 group-open:rotate-180 transition-transform duration-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-4 text-slate-600 dark:text-slate-400">
              We review your website, Google profile and patient follow-up, then send a short report with prioritised fixes. There is no obligation to hire us.
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}