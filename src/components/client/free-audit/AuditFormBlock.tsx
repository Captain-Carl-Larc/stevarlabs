// File: AuditFormBlock.tsx
// Route/Folder: src/components/client/free-audit
// Purpose: The primary conversion form with a Suspense boundary and native Calendly embed.
// Imports: next/link, useSearchParams, Suspense, CheckCircle2, Script
// Used in: src/app/(public)/free-audit/page.tsx

"use client";

import Link from "next/link";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle2 } from "lucide-react";

function AuditFormInner() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";

  if (isSuccess) {
    return (
      <div className="flex flex-col h-full animate-in fade-in zoom-in duration-500 py-4">
        
        {/* Success Header */}
        <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 mb-4 px-2">
          <div className="flex justify-center items-center bg-green-100 dark:bg-green-900/30 rounded-full w-12 h-12 shrink-0">
            <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-500" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-slate-900 dark:text-white text-xl">Audit requested</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">We're reviewing your digital presence now.</p>
          </div>
        </div>
        
        {/* Calendly Section */}
        <div className="flex-1 flex flex-col pt-2">
          <div className="text-center mb-4 px-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2">
              Step 2: Book your 30-minute walkthrough
            </h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              While we prepare your report, choose a time below to go over the findings.
            </p>
          </div>
          
          {/* Native Calendly Embed */}
          <div 
            className="calendly-inline-widget w-full h-[650px] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white" 
            data-url="https://calendly.com/stephenmutwiiofficial/30min?hide_event_type_details=1&hide_gdpr_banner=1"
          ></div>
          
          {/* Next.js safe script injection */}
          <Script 
            type="text/javascript" 
            src="https://assets.calendly.com/assets/external/widget.js" 
            strategy="lazyOnload"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-6 font-bold text-slate-900 dark:text-white text-2xl">Request your audit</h2>
      <form action="/api/audit" method="POST" className="space-y-5">
        <div>
          <label htmlFor="audit-name" className="block mb-1 font-medium text-slate-900 dark:text-white text-sm">Name</label>
          <input type="text" id="audit-name" name="name" required className="bg-white dark:bg-slate-950 px-4 py-2.5 border border-slate-300 focus:border-blue-500 dark:border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full text-slate-900 dark:text-white text-sm transition-colors" />
        </div>
        <div>
          <label htmlFor="audit-email" className="block mb-1 font-medium text-slate-900 dark:text-white text-sm">Work email</label>
          <input type="email" id="audit-email" name="email" required className="bg-white dark:bg-slate-950 px-4 py-2.5 border border-slate-300 focus:border-blue-500 dark:border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full text-slate-900 dark:text-white text-sm transition-colors" />
        </div>
        <div>
          <label htmlFor="audit-practice" className="block mb-1 font-medium text-slate-900 dark:text-white text-sm">Practice name</label>
          <input type="text" id="audit-practice" name="practice" required className="bg-white dark:bg-slate-950 px-4 py-2.5 border border-slate-300 focus:border-blue-500 dark:border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full text-slate-900 dark:text-white text-sm transition-colors" />
        </div>
        <div>
          <label htmlFor="audit-website" className="block mb-1 font-medium text-slate-900 dark:text-white text-sm">Practice website URL</label>
          <input type="url" id="audit-website" name="website" required className="bg-white dark:bg-slate-950 px-4 py-2.5 border border-slate-300 focus:border-blue-500 dark:border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full text-slate-900 dark:text-white text-sm transition-colors" />
        </div>
        <div>
          <label htmlFor="audit-town" className="block mb-1 font-medium text-slate-900 dark:text-white text-sm">Town or city (optional)</label>
          <input type="text" id="audit-town" name="town" className="bg-white dark:bg-slate-950 px-4 py-2.5 border border-slate-300 focus:border-blue-500 dark:border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full text-slate-900 dark:text-white text-sm transition-colors" />
        </div>

        <div className="flex items-start gap-3 pt-2">
          <input type="checkbox" id="audit-marketing" name="marketing" className="dark:bg-slate-950 mt-1 border-slate-300 dark:border-slate-700 rounded focus:ring-blue-600 w-4 h-4 text-blue-600" />
          <label htmlFor="audit-marketing" className="text-slate-600 dark:text-slate-400 text-sm">
            Send me occasional dental marketing tips by email. You can unsubscribe at any time.
          </label>
        </div>
        
        <div className="pt-4">
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 shadow-sm px-4 py-3.5 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 w-full font-semibold text-white text-base transition-colors">
            Get your free practice audit
          </button>
          <p className="mt-4 text-slate-500 dark:text-slate-500 text-xs text-center">
            We use your details to respond to your enquiry. See our <Link href="/privacy-policy" className="hover:text-blue-600 underline">privacy policy</Link>.
          </p>
        </div>
      </form>
    </>
  );
}

export default function AuditFormBlock() {
  return (
    <div className="top-24 sticky bg-white dark:bg-slate-950 shadow-lg shadow-slate-200/50 dark:shadow-none p-8 border border-slate-200 dark:border-slate-800 rounded-2xl min-h-[600px]">
      <Suspense fallback={<div className="bg-slate-100 dark:bg-slate-900 rounded-xl w-full h-[600px] animate-pulse"></div>}>
        <AuditFormInner />
      </Suspense>
    </div>
  );
}