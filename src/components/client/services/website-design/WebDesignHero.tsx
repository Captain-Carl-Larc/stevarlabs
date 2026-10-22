// File: WebDesignHero.tsx
// Route/Folder: src/components/client/services/website-design
// Purpose: Hero section for the Website Design service page.
// Imports: None
// Used in: src/app/(public)/services/website-design-redesign/page.tsx

export default function WebDesignHero() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 pt-20 pb-16 border-slate-200 dark:border-slate-800 border-b text-center transition-colors duration-200">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 font-bold text-slate-900 dark:text-white text-4xl sm:text-5xl tracking-tight">
          Dental Website Design and Redesign
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-xl">
          Your website is often the first thing a new patient sees, and the place they decide whether to book. We build practice websites that load quickly, look credible on a phone, and make booking the obvious next step.
        </p>
      </div>
    </section>
  );
}