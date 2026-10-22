// File: RetentionHero.tsx
// Route/Folder: src/components/client/services/patient-retention
// Purpose: Hero section for the Patient Retention service page.
// Imports: None
// Used in: src/app/(public)/services/patient-retention/page.tsx

export default function RetentionHero() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 pt-20 pb-16 border-slate-200 dark:border-slate-800 border-b text-center transition-colors duration-200">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 font-bold text-slate-900 dark:text-white text-4xl sm:text-5xl tracking-tight">
          Patient Retention and Recall for Dental Practices
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-xl">
          Winning a new patient costs time and money. Keeping the patients you've already won is usually far cheaper. We set up the follow-up that brings patients back and invites happy ones to leave a review or refer a friend.
        </p>
      </div>
    </section>
  );
}