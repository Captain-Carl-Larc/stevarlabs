// File: CookieContent.tsx
// Route/Folder: src/components/client/legal
// Purpose: Renders the current Cookie Policy.
// Imports: None
// Used in: src/app/(public)/cookie-policy/page.tsx

export default function CookieContent() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 py-20 transition-colors duration-200">
      <div className="dark:prose-invert mx-auto max-w-3xl prose-headings:font-bold dark:prose-a:text-blue-400 prose-a:text-blue-600 prose prose-slate">
        <h1>Cookie Policy</h1>
        <p><strong>Last updated:</strong> 27/10/2026</p>
        
        <p>
          Stevarlabs does not currently use cookies or similar tracking technologies on this website. We do not use analytics, advertising, or preference cookies, and there is no cookie banner or cookie settings facility at this time.
        </p>
        <p>
          If our use of cookies changes in the future, we will update this policy with details about the cookies used and how you can manage your preferences.
        </p>
      </div>
    </section>
  );
}