// File: CookieContent.tsx
// Route/Folder: src/components/client/legal
// Purpose: Renders the Cookie Policy and lists current cookies in a semantic table.
// Imports: None
// Used in: src/app/(public)/cookie-policy/page.tsx

export default function CookieContent() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 py-20 transition-colors duration-200">
      <div className="dark:prose-invert mx-auto max-w-3xl prose-headings:font-bold dark:prose-a:text-blue-400 prose-a:text-blue-600 prose prose-slate">
        <h1>Cookie Policy</h1>
        <p><strong>Last updated:</strong> [DATE]</p>
        
        <p>
          This Cookie Policy explains how Stevarlabs uses cookies and similar technologies to recognise you when you visit our website.
        </p>

        <h2>What are cookies?</h2>
        <p>
          Cookies are small data files placed on your computer or mobile device when you visit a website. They are widely used to make websites work efficiently, as well as to provide reporting information.
        </p>

        <h2>How we use cookies</h2>
        <p>
          We use strictly necessary cookies to make our site function securely. With your explicit consent via our cookie banner, we also use performance cookies to understand how visitors interact with our site so we can improve it. We do not load non-essential cookies before you consent.
        </p>

        <h2>Cookies we use</h2>
        <div className="my-8 overflow-x-auto">
          <table className="w-full min-w-[500px] text-left border-collapse not-prose">
            <thead>
              <tr className="border-slate-200 dark:border-slate-800 border-b-2 text-slate-900 dark:text-white">
                <th className="px-4 py-3 font-bold text-sm">Cookie Name</th>
                <th className="px-4 py-3 font-bold text-sm">Purpose</th>
                <th className="px-4 py-3 font-bold text-sm">Duration</th>
                <th className="px-4 py-3 font-bold text-sm">Provider</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-400 text-sm">
              <tr>
                <td className="px-4 py-3 font-mono">[Cookie Name]</td>
                <td className="px-4 py-3">Stores your cookie consent preferences.</td>
                <td className="px-4 py-3">1 Year</td>
                <td className="px-4 py-3">Stevarlabs</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">[Analytics Cookie]</td>
                <td className="px-4 py-3">Measures page views and form submissions.</td>
                <td className="px-4 py-3">2 Years</td>
                <td className="px-4 py-3">[Provider]</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Managing your cookies</h2>
        <p>
          You can change your cookie preferences at any time by clicking the "Cookie Settings" link in the footer of our website. You can also instruct your browser to refuse all cookies.
        </p>
      </div>
    </section>
  );
}