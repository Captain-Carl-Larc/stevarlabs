// File: AuditHeader.tsx
// Route/Folder: src/components/client/free-audit
// Purpose: Hero section for the conversion page, stating the primary value proposition.
// Imports: None
// Used in: src/app/(public)/free-audit/page.tsx

export default function AuditHeader() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 pt-20 pb-12 border-slate-200 dark:border-slate-800 border-b text-center transition-colors duration-200">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 font-bold text-slate-900 dark:text-white text-4xl sm:text-5xl tracking-tight">
          Free Practice Growth Audit
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-xl">
          Find out where your practice is losing new and existing patients, and what to fix first.
        </p>
      </div>
    </section>
  );
}