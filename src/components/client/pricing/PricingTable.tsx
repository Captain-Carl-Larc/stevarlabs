// File: PricingTable.tsx
// Route/Folder: src/components/client/pricing
// Purpose: Displays the services and billing models using a semantic HTML table for accessibility and SEO.
// Imports: None
// Used in: src/app/(public)/pricing/page.tsx

export default function PricingTable() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 py-12 transition-colors duration-200">
      <div className="mx-auto pb-4 max-w-5xl overflow-x-auto">
        <table className="w-full min-w-[800px] text-left border-collapse">
          <thead>
            <tr className="border-slate-200 dark:border-slate-800 border-b-2">
              <th scope="col" className="px-6 py-4 w-1/3 font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Service</th>
              <th scope="col" className="px-6 py-4 w-1/6 font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-4 w-1/4 font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Price</th>
              <th scope="col" className="px-6 py-4 font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">What's included</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
              <th scope="row" className="px-6 py-5 font-semibold text-slate-900 dark:text-white">Local SEO</th>
              <td className="px-6 py-5 text-slate-600 dark:text-slate-400">Monthly</td>
              <td className="px-6 py-5 font-medium text-slate-600 dark:text-slate-400">Quoted after your audit</td>
              <td className="px-6 py-5 text-slate-600 dark:text-slate-400 text-sm">Google profile setup, targeted treatment pages, and performance reporting.</td>
            </tr>
            <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
              <th scope="row" className="px-6 py-5 font-semibold text-slate-900 dark:text-white">Social Media</th>
              <td className="px-6 py-5 text-slate-600 dark:text-slate-400">Monthly</td>
              <td className="px-6 py-5 font-medium text-slate-600 dark:text-slate-400">Quoted after your audit</td>
              <td className="px-6 py-5 text-slate-600 dark:text-slate-400 text-sm">Content planning, compliant approvals workflow, and audience engagement.</td>
            </tr>
            <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
              <th scope="row" className="px-6 py-5 font-semibold text-slate-900 dark:text-white">Patient Retention & Recall</th>
              <td className="px-6 py-5 text-slate-600 dark:text-slate-400">Monthly</td>
              <td className="px-6 py-5 font-medium text-slate-600 dark:text-slate-400">Quoted after your audit</td>
              <td className="px-6 py-5 text-slate-600 dark:text-slate-400 text-sm">Check-in sequences, review requests, and lapsed patient reminders.</td>
            </tr>
            <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
              <th scope="row" className="px-6 py-5 font-semibold text-slate-900 dark:text-white">Website Design (or Redesign)</th>
              <td className="px-6 py-5 text-slate-600 dark:text-slate-400">One-off project</td>
              <td className="px-6 py-5 font-medium text-slate-600 dark:text-slate-400">Quoted after your audit</td>
              <td className="px-6 py-5 text-slate-600 dark:text-slate-400 text-sm">Mobile-first build, fast loading, clear booking paths, and redirect mapping.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}