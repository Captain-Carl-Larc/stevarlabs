// File: PricingBillingAndFaq.tsx
// Route/Folder: src/components/client/pricing
// Purpose: Explains billing terms and handles common pricing questions.
// Imports: None
// Used in: src/app/(public)/pricing/page.tsx

export default function PricingBillingAndFaq() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900/50 px-6 py-20 border-slate-200 dark:border-slate-800 border-t transition-colors duration-200">
      <div className="items-start gap-12 grid md:grid-cols-[1fr_2fr] mx-auto max-w-4xl">
        
        {/* Billing Terms */}
        <div>
          <h2 className="mb-4 font-bold text-slate-900 dark:text-white text-2xl">How billing works</h2>
          <div className="space-y-4 bg-white dark:bg-slate-950 shadow-sm p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <div>
              <p className="mb-1 font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Retainer terms</p>
              <p className="text-slate-600 dark:text-slate-400">Month-to-month by default. We don't lock dental practices into restrictive long-term contracts.</p>
            </div>
            <div>
              <p className="mb-1 font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Currency</p>
              <p className="text-slate-600 dark:text-slate-400">All prices are billed in GBP (£).</p>
            </div>
          </div>
        </div>

        {/* Pricing FAQ */}
        <div>
          <h2 className="mb-4 font-bold text-slate-900 dark:text-white text-2xl">Pricing questions</h2>
          <div className="space-y-4">
            <details className="group bg-white dark:bg-slate-950 open:shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
              <summary className="flex justify-between items-center px-6 py-4 font-semibold text-slate-900 dark:text-white text-base marker:content-none cursor-pointer">
                What affects the price?
                <span className="flex-shrink-0 ml-4 text-slate-400 group-open:rotate-180 transition-transform duration-200">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </span>
              </summary>
              <div className="px-6 pb-4 text-slate-600 dark:text-slate-400 text-sm">
                The size of your practice, the number of target locations or treatments, and the specific platforms you need managed.
              </div>
            </details>

            <details className="group bg-white dark:bg-slate-950 open:shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
              <summary className="flex justify-between items-center px-6 py-4 font-semibold text-slate-900 dark:text-white text-base marker:content-none cursor-pointer">
                Are there setup fees?
                <span className="flex-shrink-0 ml-4 text-slate-400 group-open:rotate-180 transition-transform duration-200">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </span>
              </summary>
              <div className="px-6 pb-4 text-slate-600 dark:text-slate-400 text-sm">
                Usually, yes. The first month involves a heavy lift to audit, restructure, and optimise existing assets before monthly management begins. This is outlined clearly in your proposal.
              </div>
            </details>
            
            <details className="group bg-white dark:bg-slate-950 open:shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
              <summary className="flex justify-between items-center px-6 py-4 font-semibold text-slate-900 dark:text-white text-base marker:content-none cursor-pointer">
                Can I combine services?
                <span className="flex-shrink-0 ml-4 text-slate-400 group-open:rotate-180 transition-transform duration-200">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </span>
              </summary>
              <div className="px-6 pb-4 text-slate-600 dark:text-slate-400 text-sm">
                Absolutely. We often bundle Local SEO with a Website Redesign for maximum impact. We'll advise on the most effective combination during your audit review.
              </div>
            </details>
          </div>
        </div>

      </div>
    </section>
  );
}