// File: CookieContent.tsx
// Route/Folder: src/components/client/legal
// Purpose: Renders the current Cookie Policy.
// Imports: next/link
// Used in: src/app/(public)/cookie-policy/page.tsx

import Link from "next/link";

export default function CookieContent() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 py-20 transition-colors duration-200">
      <div className="dark:prose-invert mx-auto max-w-3xl prose-headings:font-bold dark:prose-a:text-blue-400 prose-a:text-blue-600 prose prose-slate">
        <h1>Cookie Policy</h1>
        <p><strong>Last updated:</strong> 27/10/2026</p>

        <p>
          This policy explains how Stevarlabs uses cookies and similar technologies on this
          website, and how you can control them. For how we handle personal data more
          generally, see our <Link href="/privacy-policy">Privacy policy</Link>.
        </p>

        <h2>What cookies are</h2>
        <p>
          Cookies are small text files that a website stores on your device. Similar
          technologies, such as local storage, work in a comparable way. They are used to make
          websites work, to remember your choices, and to understand how a site is used.
        </p>

        <h2>Cookies we use</h2>

        <h3>Strictly necessary</h3>
        <p>
          These are needed for the site to function and do not require your consent.
        </p>
        <ul>
          <li>
            <strong>Your cookie choice.</strong> When you accept or reject analytics cookies, we
            store that choice in your browser&apos;s local storage (under the name
            &quot;analytics-consent&quot;) so we do not ask you again on every visit. It stays
            on your device until you change it or clear your browser data.
          </li>
          <li>
            <strong>Login sessions.</strong> If you are a member of our team and sign in to the
            site&apos;s admin area, we set authentication cookies to keep you signed in
            securely. Ordinary visitors do not receive these.
          </li>
        </ul>

        <h3>Analytics (only with your consent)</h3>
        <p>
          We use Google Analytics 4, a service provided by Google, to understand how visitors
          find and use our site, such as which pages are viewed and how people arrive. It is
          switched off by default. It only loads if you click &quot;Accept&quot; on our cookie
          banner.
        </p>
        <table>
          <thead>
            <tr>
              <th>Cookie</th>
              <th>Purpose</th>
              <th>Typical duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>_ga</td>
              <td>Distinguishes one visitor from another to produce aggregated statistics</td>
              <td>Up to 2 years</td>
            </tr>
            <tr>
              <td>_ga_ followed by an identifier</td>
              <td>Keeps track of a visit (session) so pages viewed can be counted</td>
              <td>Up to 2 years</td>
            </tr>
          </tbody>
        </table>
        <p>
          The information collected is used for statistical reporting. We do not use analytics
          data for advertising, and we do not enable advertising features. Google acts as a
          service provider to us in processing this data and may process it outside the UK. We
          keep analytics data for 14 months.
        </p>

        <h2>What we do not use</h2>
        <p>
          We do not use advertising cookies or social media tracking cookies on this website.
        </p>

        <h2>Managing your choices</h2>
        <ul>
          <li>
            <strong>On this site:</strong> use the &quot;Cookie settings&quot; link in the
            footer of any page to change your choice at any time. If you reject analytics
            cookies, Google Analytics will not run, and you can still use every part of the
            site.
          </li>
          <li>
            <strong>In your browser:</strong> you can block or delete cookies in your browser
            settings. Blocking all cookies may affect parts of the site that need them, such as
            signing in.
          </li>
          <li>
            <strong>Google&apos;s opt-out:</strong> Google provides a browser add-on that
            prevents its analytics from collecting data about you on any site.
          </li>
        </ul>

        <h2>Changes to this policy</h2>
        <p>
          If we change the cookies we use, we will update this page and the date at the top.
          Where a change requires your consent, we will ask for it again.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about this policy, please get in touch via
          our <Link href="/contact">contact page</Link>.
        </p>
      </div>
    </section>
  );
}