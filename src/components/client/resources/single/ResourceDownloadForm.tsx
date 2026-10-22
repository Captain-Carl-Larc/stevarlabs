// File: ResourceDownloadForm.tsx
// Route/Folder: src/components/client/resources/single
// Purpose: Captures leads via PDF download, wrapped in Suspense to handle success state.
// Imports: next/link, useSearchParams, Suspense, Download, CheckCircle2
// Used in: src/app/(public)/resources/recall-message-templates/page.tsx

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Download, CheckCircle2 } from "lucide-react";

function DownloadFormInner() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";

  if (isSuccess) {
    return (
      <div className="py-12 text-center animate-in duration-500 fade-in zoom-in">
        <div className="flex justify-center items-center bg-green-100 dark:bg-green-900/30 mx-auto mb-6 rounded-full w-16 h-16">
          <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-500" />
        </div>
        <h3 className="mb-4 font-bold text-slate-900 dark:text-white text-2xl">Templates sent</h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Success! We've emailed the full PDF pack to your inbox. You can close this page.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
          <Download className="w-6 h-6 text-blue-600 dark:text-blue-500" />
        </div>
        <h2 className="m-0 font-bold text-slate-900 dark:text-white text-xl">Download as PDF/Docs</h2>
      </div>
      
      <p className="mb-6 text-slate-600 dark:text-slate-400 text-sm">
        Keep these templates on hand. Enter your email and we'll send the full pack directly to your inbox.
      </p>
      
      <form action="/api/download" method="POST" className="space-y-5">
        <input type="hidden" name="resource_id" value="recall-templates" />
        
        <div>
          <label htmlFor="res-name" className="block mb-1 font-medium text-slate-900 dark:text-white text-sm">Name (optional)</label>
          <input type="text" id="res-name" name="name" className="bg-white dark:bg-slate-950 px-4 py-2.5 border border-slate-300 focus:border-blue-500 dark:border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full text-slate-900 dark:text-white text-sm transition-colors" />
        </div>
        <div>
          <label htmlFor="res-email" className="block mb-1 font-medium text-slate-900 dark:text-white text-sm">Email</label>
          <input type="email" id="res-email" name="email" required className="bg-white dark:bg-slate-950 px-4 py-2.5 border border-slate-300 focus:border-blue-500 dark:border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full text-slate-900 dark:text-white text-sm transition-colors" />
        </div>

        <div className="flex items-start gap-3 pt-2">
          <input type="checkbox" id="res-marketing" name="marketing" className="dark:bg-slate-950 mt-1 border-slate-300 dark:border-slate-700 rounded focus:ring-blue-600 w-4 h-4 text-blue-600" />
          <label htmlFor="res-marketing" className="text-slate-600 dark:text-slate-400 text-sm leading-snug">
            Send me occasional dental marketing tips by email. You can unsubscribe at any time.
          </label>
        </div>
        
        <div className="pt-2">
          <button type="submit" className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 shadow-sm px-4 py-3 rounded-md w-full font-semibold text-white dark:text-slate-900 text-sm transition-colors">
            Get the templates
          </button>
          <p className="mt-4 text-slate-500 dark:text-slate-500 text-xs text-center">
            We use your details to send this download. See our <Link href="/privacy-policy" className="hover:text-slate-700 dark:hover:text-slate-300 underline">privacy policy</Link>.
          </p>
        </div>
      </form>
    </>
  );
}

export default function ResourceDownloadForm() {
  return (
    <div className="top-24 sticky bg-white dark:bg-slate-950 shadow-lg shadow-slate-200/50 dark:shadow-none p-8 border border-slate-200 dark:border-slate-800 rounded-2xl min-h-[450px]">
      <Suspense fallback={<div className="bg-slate-100 dark:bg-slate-900 rounded-xl w-full h-full animate-pulse"></div>}>
        <DownloadFormInner />
      </Suspense>
    </div>
  );
}