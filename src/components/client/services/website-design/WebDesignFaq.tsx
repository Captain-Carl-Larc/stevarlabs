// File: WebDesignFaq.tsx
// Route/Folder: src/components/client/services/website-design
// Purpose: FAQ accordion addressing website migration and timelines.
// Imports: None
// Used in: src/app/(public)/services/website-design-redesign/page.tsx

export default function WebDesignFaq() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 py-20 transition-colors duration-200">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 font-bold text-slate-900 dark:text-white text-3xl text-center">Questions about website design</h2>
        
        <div className="space-y-4">
          <details className="group bg-slate-50 dark:bg-slate-900/50 open:shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
            <summary className="flex justify-between items-center px-6 py-4 font-semibold text-slate-900 dark:text-white text-lg marker:content-none cursor-pointer">
              Do you build on WordPress or a custom stack?
              <span className="flex-shrink-0 ml-4 text-slate-400 group-open:rotate-180 transition-transform duration-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-4 text-slate-600 dark:text-slate-400">
              We build using modern, fast, custom web frameworks (Next.js) that offer vastly superior speed, security, and mobile performance compared to traditional WordPress templates.
            </div>
          </details>

          <details className="group bg-slate-50 dark:bg-slate-900/50 open:shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
            <summary className="flex justify-between items-center px-6 py-4 font-semibold text-slate-900 dark:text-white text-lg marker:content-none cursor-pointer">
              Can I keep my existing domain and content?
              <span className="flex-shrink-0 ml-4 text-slate-400 group-open:rotate-180 transition-transform duration-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-4 text-slate-600 dark:text-slate-400">
              Yes. You always retain ownership of your domain. We will port over any existing content that works, rewrite what doesn't, and ensure the domain connects seamlessly to the new site.
            </div>
          </details>

          <details className="group bg-slate-50 dark:bg-slate-900/50 open:shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
            <summary className="flex justify-between items-center px-6 py-4 font-semibold text-slate-900 dark:text-white text-lg marker:content-none cursor-pointer">
              Will I lose my Google rankings in a redesign?
              <span className="flex-shrink-0 ml-4 text-slate-400 group-open:rotate-180 transition-transform duration-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-4 text-slate-600 dark:text-slate-400">
              If handled poorly, yes. That is why we map every existing URL on your old site and set up 301 redirects to the new pages, preserving your earned SEO authority.
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}