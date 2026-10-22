// File: ResourceContent.tsx
// Route/Folder: src/components/client/resources/single
// Purpose: Displays the free templates directly on the page, categorised by compliance type.
// Imports: AlertCircle, Copy from lucide-react
// Used in: src/app/(public)/resources/recall-message-templates/page.tsx

"use client";

import { AlertCircle, Copy } from "lucide-react";

export default function ResourceContent() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Dev note: Consider adding a toast notification here in the future
  };

  return (
    <div className="dark:prose-invert max-w-none prose prose-slate">
      
      {/* UK Compliance Warning */}
      <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/30 mb-10 p-5 border border-amber-200 dark:border-amber-900/50 rounded-lg">
        <AlertCircle className="mt-0.5 w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0" />
        <div className="text-amber-900 dark:text-amber-200 text-sm">
          <p className="m-0 mb-1 font-bold">UK Consent Rules Apply</p>
          <p className="m-0">
            Messages are labelled below as either a <strong>Service message</strong> (reminder or care-related) or a <strong>Marketing message</strong> (requires explicit consent). The practice remains responsible for verifying consent and checking its own legal obligations before sending.
          </p>
        </div>
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-lg lead">
        Copy and paste these templates into your existing practice management software. Replace the bracketed fields like <code>{'{practice_name}'}</code> with your own merge tags.
      </p>

      {/* Template 1 */}
      <div className="mt-10 mb-8 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 px-6 py-4 border-slate-200 dark:border-slate-800 border-b">
          <h3 className="m-0 font-bold text-slate-900 dark:text-white text-lg">Check-up Recall (Due Now)</h3>
          <span className="inline-flex items-center bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded font-semibold text-slate-700 dark:text-slate-300 text-xs">Service message</span>
        </div>
        <div className="group relative bg-white dark:bg-slate-950 p-6">
          <p className="m-0 font-mono text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap">
            Hi {'{first_name}'}, it's time for your next dental check-up at {'{practice_name}'}. Keeping on top of these visits helps us spot any issues early. You can book your next visit online here: [Link] or call us on [Phone]. See you soon!
          </p>
          <button 
            onClick={() => copyToClipboard("Hi {first_name}, it's time for your next dental check-up at {practice_name}. Keeping on top of these visits helps us spot any issues early. You can book your next visit online here: [Link] or call us on [Phone]. See you soon!")}
            className="top-4 right-4 absolute bg-slate-100 dark:bg-slate-800 opacity-0 group-hover:opacity-100 p-2 rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-white transition-opacity"
            title="Copy to clipboard"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Template 2 */}
      <div className="mb-8 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 px-6 py-4 border-slate-200 dark:border-slate-800 border-b">
          <h3 className="m-0 font-bold text-slate-900 dark:text-white text-lg">Lapsed Patient (Overdue by 6+ months)</h3>
          <span className="inline-flex items-center bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded font-semibold text-slate-700 dark:text-slate-300 text-xs">Service message</span>
        </div>
        <div className="group relative bg-white dark:bg-slate-950 p-6">
          <p className="m-0 font-mono text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap">
            Hi {'{first_name}'}, we noticed it's been a while since your last visit to {'{practice_name}'}. Your oral health is important to us. When you're ready, you can easily schedule your next check-up online: [Link]. We hope you are doing well!
          </p>
          <button 
            onClick={() => copyToClipboard("Hi {first_name}, we noticed it's been a while since your last visit to {practice_name}. Your oral health is important to us. When you're ready, you can easily schedule your next check-up online: [Link]. We hope you are doing well!")}
            className="top-4 right-4 absolute bg-slate-100 dark:bg-slate-800 opacity-0 group-hover:opacity-100 p-2 rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-white transition-opacity"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Template 3 */}
      <div className="mb-8 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 px-6 py-4 border-slate-200 dark:border-slate-800 border-b">
          <h3 className="m-0 font-bold text-slate-900 dark:text-white text-lg">Review Request</h3>
          <span className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded font-semibold text-blue-700 dark:text-blue-400 text-xs">Marketing message</span>
        </div>
        <div className="group relative bg-white dark:bg-slate-950 p-6">
          <p className="m-0 font-mono text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap">
            Hi {'{first_name}'}, thanks for visiting {'{practice_name}'} on {'{appointment_date}'}. If you were happy with your care, we would be incredibly grateful if you left a quick Google review here: [Google Link]. It helps other patients find us. Thank you!
          </p>
          <button 
            onClick={() => copyToClipboard("Hi {first_name}, thanks for visiting {practice_name} on {appointment_date}. If you were happy with your care, we would be incredibly grateful if you left a quick Google review here: [Google Link]. It helps other patients find us. Thank you!")}
            className="top-4 right-4 absolute bg-slate-100 dark:bg-slate-800 opacity-0 group-hover:opacity-100 p-2 rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-white transition-opacity"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}