// File: page.tsx
// Route/Folder: src/app/(public)/contact
// Purpose: Orchestrates the Contact page layout.
// Imports: Metadata from next, ContactSection
// Used in: Route /contact

import type { Metadata } from "next";
import ContactSection from "@/components/client/contact/ContactSection";

// Spec Requirement 18.1
export const metadata: Metadata = {
  title: "Contact Stevarlabs | Dental Marketing for UK Practices",
  description: "Get in touch with Stevarlabs about marketing for your UK dental practice.",
};

export default function ContactPage() {
  return (
    <>
      <ContactSection />
      {/* Dev note: Spec doesn't require AuditCta directly at the bottom here because 
          the contact page already directly links to it mid-page as a secondary CTA, 
          but if desired, we can import AuditCta here as well. Let's keep it clean! */}
    </>
  );
}