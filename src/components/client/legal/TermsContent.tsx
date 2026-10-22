// File: TermsContent.tsx
// Route/Folder: src/components/client/legal
// Purpose: Renders the Website Terms of Use.
// Imports: None
// Used in: src/app/(public)/terms/page.tsx

export default function TermsContent() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 py-20 transition-colors duration-200">
      <div className="dark:prose-invert mx-auto max-w-3xl prose-headings:font-bold dark:prose-a:text-blue-400 prose-a:text-blue-600 prose prose-slate">
        <h1>Website Terms of Use</h1>
        <p><strong>Last updated:</strong> [DATE]</p>
        
        <h2>1. Acceptance of terms</h2>
        <p>
          By accessing and using stevarlabs.co.uk (the "Site"), you agree to be bound by these Terms of Use. If you do not agree, please do not use the Site.
        </p>

        <h2>2. Intellectual property</h2>
        <p>
          All content, design, and code on this Site are the intellectual property of Stevarlabs unless otherwise stated. You may not reproduce, distribute, or modify our content without explicit written permission.
        </p>

        <h2>3. No reliance on information (Not legal advice)</h2>
        <p>
          The content on this Site, including our blog and resources, is provided for general information purposes only. While we build with UK dental marketing regulations (ASA, CAP Code, GDC) in mind, nothing on this Site constitutes legal advice. You remain solely responsible for the compliance of your practice's marketing.
        </p>

        <h2>4. Limitation of liability</h2>
        <p>
          Stevarlabs will not be liable for any direct, indirect, or consequential loss or damage arising under or in connection with the use of, or inability to use, our Site. We do not guarantee specific rankings or patient numbers.
        </p>

        <h2>5. Third-party links</h2>
        <p>
          Our Site may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of any third-party sites.
        </p>

        <h2>6. Governing law</h2>
        <p>
          These terms are governed by and construed in accordance with the laws of England and Wales.
        </p>

        <h2>7. Contact us</h2>
        <p>
          If you have questions about these terms, contact us at <strong>[CONTACT EMAIL]</strong>.
        </p>
      </div>
    </section>
  );
}