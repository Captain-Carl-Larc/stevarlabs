// File: SocialFaq.tsx
// Route/Folder: src/components/client/services/social-media
// Purpose: FAQ accordion addressing platform selection and content creation.
// Imports: None
// Used in: src/app/(public)/services/social-media/page.tsx

export default function SocialFaq() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 py-20 transition-colors duration-200">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 font-bold text-slate-900 dark:text-white text-3xl text-center">Questions about dental social media</h2>
        
        <div className="space-y-4">
          <details className="group bg-slate-50 dark:bg-slate-900/50 open:shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
            <summary className="flex justify-between items-center px-6 py-4 font-semibold text-slate-900 dark:text-white text-lg marker:content-none cursor-pointer">
              Who writes the content?
              <span className="flex-shrink-0 ml-4 text-slate-400 group-open:rotate-180 transition-transform duration-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-4 text-slate-600 dark:text-slate-400">
              We draft all content specifically for your practice, avoiding clinical clichés. However, nothing is ever published until you or your practice manager reviews and signs off on it to ensure clinical accuracy.
            </div>
          </details>

          <details className="group bg-slate-50 dark:bg-slate-900/50 open:shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
            <summary className="flex justify-between items-center px-6 py-4 font-semibold text-slate-900 dark:text-white text-lg marker:content-none cursor-pointer">
              Can you use patient photos?
              <span className="flex-shrink-0 ml-4 text-slate-400 group-open:rotate-180 transition-transform duration-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-4 text-slate-600 dark:text-slate-400">
              Yes, but strictly under compliance rules. We will provide you with the correct written consent forms for your patients to sign before any before-and-after imagery or patient stories are used online.
            </div>
          </details>
          
          <details className="group bg-slate-50 dark:bg-slate-900/50 open:shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
            <summary className="flex justify-between items-center px-6 py-4 font-semibold text-slate-900 dark:text-white text-lg marker:content-none cursor-pointer">
              How often will you post?
              <span className="flex-shrink-0 ml-4 text-slate-400 group-open:rotate-180 transition-transform duration-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-4 text-slate-600 dark:text-slate-400">
              Consistency beats frequency. The exact cadence depends on the strategy, but most practices benefit from 2-3 high-quality, targeted posts per week rather than daily filler content.
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}