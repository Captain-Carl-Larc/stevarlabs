// File: HowItWorks.tsx
// Route/Folder: src/components/client/homepage
// Purpose: Three-step process explanation section.
// Imports: None
// Used in: src/app/(public)/page.tsx

export default function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-heading" className="bg-white dark:bg-slate-950 px-6 py-20 transition-colors duration-200">
      <div className="mx-auto max-w-7xl">
        <h2 id="how-it-works-heading" className="mb-12 font-bold text-slate-900 dark:text-white text-3xl sm:text-4xl text-center tracking-tight">
          How it works
        </h2>
        <div className="gap-8 grid md:grid-cols-3">
          <div className="text-center">
            <div className="flex justify-center items-center bg-blue-100 dark:bg-blue-900/50 mx-auto mb-6 rounded-full w-12 h-12 font-bold text-blue-600 dark:text-blue-400 text-xl">1</div>
            <h3 className="mb-3 font-bold text-slate-900 dark:text-white text-xl">Free audit</h3>
            <p className="text-slate-600 dark:text-slate-400">We review your website, Google profile and follow-up, and show you where enquiries are leaking.</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center items-center bg-blue-100 dark:bg-blue-900/50 mx-auto mb-6 rounded-full w-12 h-12 font-bold text-blue-600 dark:text-blue-400 text-xl">2</div>
            <h3 className="mb-3 font-bold text-slate-900 dark:text-white text-xl">A clear plan</h3>
            <p className="text-slate-600 dark:text-slate-400">You get priorities in plain English: what to fix, in what order, and what it should achieve.</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center items-center bg-blue-100 dark:bg-blue-900/50 mx-auto mb-6 rounded-full w-12 h-12 font-bold text-blue-600 dark:text-blue-400 text-xl">3</div>
            <h3 className="mb-3 font-bold text-slate-900 dark:text-white text-xl">We build, run and report</h3>
            <p className="text-slate-600 dark:text-slate-400">We do the work and report on what matters: enquiries and bookings, not just clicks.</p>
          </div>
        </div>
      </div>
    </section>
  );
}