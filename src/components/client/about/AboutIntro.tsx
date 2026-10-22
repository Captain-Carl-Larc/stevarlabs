// File: AboutIntro.tsx
// Route/Folder: src/components/client/about
// Purpose: The top section explaining why Stevarlabs exists.
// Imports: None
// Used in: src/app/(public)/about/page.tsx

export default function AboutIntro() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 pt-20 pb-16 text-center">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-12 font-bold text-slate-900 dark:text-white text-4xl sm:text-5xl tracking-tight">
          About Stevarlabs
        </h1>
        <h2 className="mb-6 font-bold text-slate-900 dark:text-white text-2xl">
          Why we exist
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-xl text-left leading-relaxed">
          Too many dental practices do excellent clinical work and still have a quiet diary, or fill their chairs and then lose patients because nobody follows up. We exist to fix both: to help UK dental practices get found, and to keep the patients they win.
        </p>
      </div>
    </section>
  );
}