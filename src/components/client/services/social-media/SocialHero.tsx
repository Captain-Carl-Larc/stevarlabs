// File: SocialHero.tsx
// Route/Folder: src/components/client/services/social-media
// Purpose: Hero section for the Social Media service page.
// Imports: None
// Used in: src/app/(public)/services/social-media/page.tsx

export default function SocialHero() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 pt-20 pb-16 border-slate-200 dark:border-slate-800 border-b text-center transition-colors duration-200">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 font-bold text-slate-900 dark:text-white text-4xl sm:text-5xl tracking-tight">
          Dental Social Media Management
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-xl">
          Before booking, many patients look you up. A steady, genuine presence shows who you are and how you work, and helps nervous patients feel comfortable choosing you.
        </p>
      </div>
    </section>
  );
}