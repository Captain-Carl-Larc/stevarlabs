// File: ResourcesHeader.tsx
// Route/Folder: src/components/client/resources
// Purpose: Hero section for the Resources index.
// Imports: None
// Used in: src/app/(public)/resources/page.tsx

export default function ResourcesHeader() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 pt-20 pb-12 border-slate-200 dark:border-slate-800 border-b text-center transition-colors duration-200">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 font-bold text-slate-900 dark:text-white text-4xl sm:text-5xl tracking-tight">
          Free Resources for Dental Practices
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-xl">
          Practical templates and checklists you can use today. No patient data is needed, and nothing here sends messages on your behalf.
        </p>
      </div>
    </section>
  );
}