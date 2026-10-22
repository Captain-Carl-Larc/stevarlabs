// File: ContactSection.tsx
// Route/Folder: src/components/client/contact
// Purpose: Contact page grid updated to handle the form success state via Suspense.
// Imports: next/link, useSearchParams, Suspense, Mail, Clock, MapPin, ArrowRight, CheckCircle2
// Used in: src/app/(public)/contact/page.tsx

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Mail, Clock, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";

function ContactFormInner() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";

  if (isSuccess) {
    return (
      <div className="py-16 text-center animate-in duration-500 fade-in zoom-in">
        <div className="flex justify-center items-center bg-green-100 dark:bg-green-900/30 mx-auto mb-6 rounded-full w-16 h-16">
          <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-500" />
        </div>
        <h3 className="mb-4 font-bold text-slate-900 dark:text-white text-2xl">Message sent</h3>
        <p className="text-slate-600 dark:text-slate-400">
          Thank you for reaching out. We have received your message and will be in touch within 24 working hours.
        </p>
      </div>
    );
  }

  return (
    <form action="/api/contact" method="POST" className="space-y-6">
      <div className="gap-6 grid sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block mb-1 font-medium text-slate-900 dark:text-white text-sm">Name</label>
          <input type="text" id="contact-name" name="name" required className="bg-white dark:bg-slate-950 px-4 py-2.5 border border-slate-300 focus:border-blue-500 dark:border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full text-slate-900 dark:text-white text-sm transition-colors" />
        </div>
        <div>
          <label htmlFor="contact-email" className="block mb-1 font-medium text-slate-900 dark:text-white text-sm">Email</label>
          <input type="email" id="contact-email" name="email" required className="bg-white dark:bg-slate-950 px-4 py-2.5 border border-slate-300 focus:border-blue-500 dark:border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full text-slate-900 dark:text-white text-sm transition-colors" />
        </div>
      </div>

      <div>
        <label htmlFor="contact-practice" className="block mb-1 font-medium text-slate-900 dark:text-white text-sm">Practice name (optional)</label>
        <input type="text" id="contact-practice" name="practice" className="bg-white dark:bg-slate-950 px-4 py-2.5 border border-slate-300 focus:border-blue-500 dark:border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full text-slate-900 dark:text-white text-sm transition-colors" />
      </div>

      <div>
        <label htmlFor="contact-message" className="block mb-1 font-medium text-slate-900 dark:text-white text-sm">Message</label>
        <textarea id="contact-message" name="message" required rows={5} className="bg-white dark:bg-slate-950 px-4 py-2.5 border border-slate-300 focus:border-blue-500 dark:border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full text-slate-900 dark:text-white text-sm transition-colors resize-y"></textarea>
      </div>
      
      <div className="pt-2">
        <button type="submit" className="bg-blue-600 hover:bg-blue-500 shadow-sm px-4 py-3.5 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 w-full font-semibold text-white text-base transition-colors">
          Send message
        </button>
        <p className="mt-4 text-slate-500 dark:text-slate-400 text-xs text-center">
          We use your details to respond to your enquiry. See our <Link href="/privacy-policy" className="hover:text-blue-600 underline">privacy policy</Link>.
        </p>
      </div>
    </form>
  );
}

export default function ContactSection() {
  return (
    <section className="bg-white dark:bg-slate-950 px-6 py-20 transition-colors duration-200">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h1 className="mb-6 font-bold text-slate-900 dark:text-white text-4xl sm:text-5xl tracking-tight">
            Contact Stevarlabs
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xl">
            Questions about marketing for your practice? Send us a message, or get a free audit and we'll show you where to start.
          </p>
        </div>

        <div className="items-start gap-12 lg:gap-20 grid lg:grid-cols-[1fr_1.5fr] mx-auto max-w-5xl">
          <div className="space-y-8">
            <div>
              <h2 className="mb-6 font-bold text-slate-900 dark:text-white text-2xl">Get in touch</h2>
              <div className="space-y-6 text-slate-600 dark:text-slate-400">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-blue-600 dark:text-blue-500 shrink-0" />
                  <div>
                    <p className="mb-1 font-semibold text-slate-900 dark:text-white">Email</p>
                    <a href="mailto:hello@stevarlabs.co.uk" className="hover:text-blue-600 transition-colors">
                      [CONTACT EMAIL TO BE SUPPLIED]
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-blue-600 dark:text-blue-500 shrink-0" />
                  <div>
                    <p className="mb-1 font-semibold text-slate-900 dark:text-white">Typical reply time</p>
                    <p>Within 24 working hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-500 shrink-0" />
                  <div>
                    <p className="mb-1 font-semibold text-slate-900 dark:text-white">Location</p>
                    <p>Working remotely with dental practices across the UK.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-slate-200 dark:border-slate-800 border-t">
              <p className="mb-3 font-semibold text-slate-900 dark:text-white">Looking for the free audit?</p>
              <Link href="/free-audit" className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:hover:text-blue-300 dark:text-blue-400 transition-colors">
                Request it here <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 shadow-sm p-8 sm:p-10 border border-slate-200 dark:border-slate-800 rounded-2xl min-h-[500px]">
            <Suspense fallback={<div className="bg-slate-100 dark:bg-slate-900 rounded-xl w-full h-full animate-pulse"></div>}>
              <ContactFormInner />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}