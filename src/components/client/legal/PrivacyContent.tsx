// File: PrivacyContent.tsx
// Route/Folder: src/components/client/legal
// Purpose: Renders the Privacy Policy content compliant with UK GDPR requirements.
// Imports: None
// Used in: src/app/(public)/privacy-policy/page.tsx

export default function PrivacyContent() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 py-20 transition-colors duration-200">
      <div className="dark:prose-invert mx-auto max-w-3xl prose-headings:font-bold dark:prose-a:text-blue-400 prose-a:text-blue-600 prose prose-slate">
        <h1>Privacy Policy</h1>
        <p><strong>Last updated:</strong> [DATE]</p>
        
        <p>
          Stevarlabs ("we", "us", or "our") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and share your data when you use our website or services.
        </p>

        <h2>1. Who is the controller?</h2>
        <p>
          For the purposes of UK data protection law, [BUSINESS NAME / REGISTRATION NUMBER] is the data controller. If you have questions about this policy, please contact us at: <strong>[CONTACT EMAIL]</strong> or [BUSINESS ADDRESS].
        </p>

        <h2>2. What personal data we collect and why</h2>
        <ul>
          <li><strong>Enquiries and Audits:</strong> When you request an audit or use our contact form, we collect your name, email, practice name, and URL. We use this to respond to your request (Lawful basis: Legitimate interest / Consent).</li>
          <li><strong>Resource Downloads:</strong> We collect your email to send the requested resource (Lawful basis: Consent).</li>
          <li><strong>Marketing Email List:</strong> If you explicitly opt-in, we collect your email to send marketing tips (Lawful basis: Consent). You can unsubscribe at any time.</li>
          <li><strong>Analytics:</strong> We collect anonymised usage data to understand how our site is used.</li>
        </ul>

        <h2>3. Who we share your data with</h2>
        <p>
          We do not sell your data. We share it only with trusted service providers necessary to operate our business, such as our hosting provider (Vercel), email routing provider (Resend), and analytics platforms.
        </p>

        <h2>4. International transfers</h2>
        <p>
          As Stevarlabs operates globally, your data may be transferred outside the UK. Where this occurs, we ensure it is protected by appropriate safeguards as required by UK GDPR.
        </p>

        <h2>5. Your rights under UK GDPR</h2>
        <p>
          You have the right to access, correct, erase, restrict, or object to our processing of your data. You also have the right to withdraw consent at any time. To exercise these rights, email us at [CONTACT EMAIL].
        </p>
        <p>
          If you are unhappy with how we handle your data, you have the right to complain to the Information Commissioner's Office (ICO).
        </p>
      </div>
    </section>
  );
}