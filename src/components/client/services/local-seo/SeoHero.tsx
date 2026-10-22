// File: SeoHero.tsx
// Route/Folder: src/components/client/services/local-seo
// Purpose: Hero section for the SEO service page.
// Imports: None
// Used in: src/app/(public)/services/local-seo/page.tsx

export default function SeoHero() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 pt-20 pb-16 border-slate-200 dark:border-slate-800 border-b text-center transition-colors duration-200">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 font-bold text-slate-900 dark:text-white text-4xl sm:text-5xl tracking-tight">
          SEO & Local Search for Dental Practices
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-xl">
          Most new patients start with a search on their phone. We make sure your practice appears when people look for a dentist, or a treatment like implants or Invisalign, near them.
        </p>
      </div>
    </section>
  );
}