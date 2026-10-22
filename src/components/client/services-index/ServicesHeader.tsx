// File: ServicesHeader.tsx
// Route/Folder: src/components/client/services-index
// Purpose: Hero intro for the Services routing page.
// Imports: None
// Used in: src/app/(public)/services/page.tsx

export default function ServicesHeader() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 pt-20 pb-16 text-center">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 font-bold text-slate-900 dark:text-white text-4xl sm:text-5xl tracking-tight">
          Marketing Services for UK Dental Practices
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-xl">
          Four services, one aim: more new patients in the door, and more of them staying. Start with a free audit and we'll tell you honestly which matters most for your practice.
        </p>
      </div>
    </section>
  );
}