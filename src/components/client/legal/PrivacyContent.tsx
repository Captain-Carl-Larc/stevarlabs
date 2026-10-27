// File: PrivacyContent.tsx
// Route/Folder: src/components/client/legal
// Purpose: Renders the Privacy Policy content compliant with UK GDPR requirements.
// Imports: next/link
// Used in: src/app/(public)/privacy-policy/page.tsx

import Link from "next/link";

export default function PrivacyContent() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 py-20 transition-colors duration-200">
      <div className="dark:prose-invert mx-auto max-w-3xl prose-headings:font-bold dark:prose-a:text-blue-400 prose-a:text-blue-600 prose prose-slate">
        <h1>Privacy Policy</h1>
        <p><strong>Last updated:</strong> 27/10/2026</p>

        <p>
          Stevarlabs (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your privacy and is committed to
          protecting your personal data. This privacy policy explains how we collect, use, and
          share your data when you use our website or services.
        </p>

        <h2>1. Who is the controller?</h2>
        <p>
          For the purposes of UK data protection law, Stevarlabs is the data controller. If you
          have questions about this policy, please contact us at:{" "}
          <strong>audit@mail.stevarlabs.co.uk</strong>
        </p>

        <h2>2. What personal data we collect and why</h2>
        <ul>
          <li>
            <strong>Enquiries and audits:</strong> When you request an audit or use our contact
            form, we collect your name, email address, practice name, website URL, and any
            message you write. We use this to respond to your request (lawful basis: our
            legitimate interests in responding to enquiries and, where you have asked for an
            audit, taking steps at your request before entering into a contract).
          </li>
          <li>
            <strong>Resource downloads:</strong> We collect your email address to send the
            resource you requested (lawful basis: consent).
          </li>
          <li>
            <strong>Marketing email list:</strong> If you explicitly opt in, we collect your
            email address to send marketing tips (lawful basis: consent). You can unsubscribe
            at any time using the link in any email.
          </li>
          <li>
            <strong>Website analytics:</strong> If you accept analytics cookies, we use Google
            Analytics 4 to collect information about how you use the site, such as pages viewed,
            approximate location, device and browser type, and how you arrived. This data is
            linked to a random identifier stored in a cookie, so it is pseudonymous rather than
            anonymous. If you reject analytics cookies, none of this is collected (lawful basis:
            consent). See our <Link href="/cookie-policy">Cookie policy</Link> for details.
          </li>
          <li>
            <strong>Technical data:</strong> Our hosting provider and servers automatically
            process technical information such as your IP address and request logs to deliver
            the site and keep it secure (lawful basis: our legitimate interests in operating
            and protecting our website).
          </li>
        </ul>

        <h2>3. Who we share your data with</h2>
        <p>
          We do not sell your data. We share it only with service providers we need to operate
          our business, who process it on our behalf:
        </p>
        <ul>
          <li><strong>Netlify</strong>, for website hosting and delivery.</li>
          <li><strong>Neon</strong>, for the database where enquiries and site content are stored.</li>
          <li><strong>Resend</strong>, for sending and delivering email.</li>
          <li><strong>Cloudflare</strong>, for storing files and images used on the site.</li>
          <li><strong>Google</strong>, for analytics, only if you accept analytics cookies.</li>
        </ul>
        <p>
          We may also disclose personal data where we are required to by law.
        </p>

        <h2>4. International transfers</h2>
        <p>
          Some of the providers above may process data outside the UK, including in the United
          States and the European Economic Area. Where this happens, we rely on appropriate
          safeguards required by UK GDPR, such as the UK adequacy regulations for the EEA, the
          UK Extension to the EU-US Data Privacy Framework, or the UK International Data
          Transfer Addendum to standard contractual clauses.
        </p>

        <h2>5. How long we keep your data</h2>
        <ul>
          <li>
            <strong>Enquiries and audit requests:</strong> for up to 24 months after our last
            contact with you, unless you become a client, in which case we keep records for as
            long as the law and our contract require.
          </li>
          <li>
            <strong>Marketing email list:</strong> until you unsubscribe or withdraw consent.
          </li>
          <li>
            <strong>Analytics data:</strong> 14 months.
          </li>
        </ul>
        <p>
          We delete or anonymise personal data when we no longer need it for the purposes above.
        </p>

        <h2>6. Cookies</h2>
        <p>
          We only set analytics cookies with your consent, and you can change your choice at any
          time using &quot;Cookie settings&quot; in the footer. Full details are in
          our <Link href="/cookie-policy">Cookie policy</Link>.
        </p>

        <h2>7. Your rights under UK GDPR</h2>
        <p>
          You have the right to access, correct, erase, restrict, or object to our processing of
          your data, and to receive a copy of your data in a portable format where it applies.
          You also have the right to withdraw consent at any time, without affecting the
          lawfulness of processing before you withdrew it. To exercise these rights, email us at
          audit@mail.stevarlabs.co.uk.
        </p>
        <p>
          If you are unhappy with how we handle your data, you have the right to complain to the
          Information Commissioner&apos;s Office (ICO) at ico.org.uk. We would appreciate the chance
          to address your concerns first, so please contact us.
        </p>

        <h2>8. Changes to this policy</h2>
        <p>
          We may update this policy from time to time. The date at the top shows when it was last
          changed. If we make a material change, we will make it clear on this page.
        </p>
      </div>
    </section>
  );
}