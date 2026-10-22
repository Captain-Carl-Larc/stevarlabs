// File: PricingHero.tsx
// Route/Folder: src/components/client/pricing
// Purpose: Hero intro for the Pricing page.
// Imports: None
// Used in: src/app/(public)/pricing/page.tsx

export default function PricingHero() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 pt-20 pb-12 text-center transition-colors duration-200">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 font-bold text-slate-900 dark:text-white text-4xl sm:text-5xl tracking-tight">
          Pricing
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-xl">
          We keep pricing simple. Start with the free audit and we'll recommend what fits your practice and budget. Prices are in GBP.
        </p>
      </div>
    </section>
  );
}