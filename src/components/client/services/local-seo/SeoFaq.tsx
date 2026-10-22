// File: SeoFaq.tsx
// Route/Folder: src/components/client/services/local-seo
// Purpose: FAQ accordion specific to SEO timelines and expectations.
// Imports: None
// Used in: src/app/(public)/services/local-seo/page.tsx

export default function SeoFaq() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 py-20 transition-colors duration-200">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 font-bold text-slate-900 dark:text-white text-3xl text-center">Questions about dental SEO</h2>
        
        <div className="space-y-4">
          <details className="group bg-slate-50 dark:bg-slate-900/50 open:shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
            <summary className="flex justify-between items-center px-6 py-4 font-semibold text-slate-900 dark:text-white text-lg marker:content-none cursor-pointer">
              What is the difference between general SEO and local SEO?
              <span className="flex-shrink-0 ml-4 text-slate-400 group-open:rotate-180 transition-transform duration-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-4 text-slate-600 dark:text-slate-400">
              Local SEO focuses heavily on your Google Business Profile and appearing in the "map pack" for people physically near you. General SEO focuses on your website's technical structure, content, and authority to rank in the standard organic links below the map. We optimise for both.
            </div>
          </details>

          <details className="group bg-slate-50 dark:bg-slate-900/50 open:shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
            <summary className="flex justify-between items-center px-6 py-4 font-semibold text-slate-900 dark:text-white text-lg marker:content-none cursor-pointer">
              Do I need new website pages?
              <span className="flex-shrink-0 ml-4 text-slate-400 group-open:rotate-180 transition-transform duration-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-4 text-slate-600 dark:text-slate-400">
              Often, yes. To rank for specific treatments like "Invisalign in London", you need a dedicated, well-structured page for that treatment. We help build and structure these pages.
            </div>
          </details>

          <details className="group bg-slate-50 dark:bg-slate-900/50 open:shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
            <summary className="flex justify-between items-center px-6 py-4 font-semibold text-slate-900 dark:text-white text-lg marker:content-none cursor-pointer">
              How long before I see results?
              <span className="flex-shrink-0 ml-4 text-slate-400 group-open:rotate-180 transition-transform duration-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-4 text-slate-600 dark:text-slate-400">
              SEO usually takes months, not weeks. However, we report early signals such as profile views, direction requests, and search impressions from the first month, so you can see progress before your overall ranking shifts.
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}