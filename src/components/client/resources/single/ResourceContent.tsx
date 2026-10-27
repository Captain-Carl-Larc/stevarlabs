// File: ResourceContent.tsx
// Route/Folder: src/components/client/resources/single
// Purpose: Displays the free templates directly on the page, categorised by compliance type.
// Imports: AlertCircle, Copy from lucide-react
// Used in: src/app/(public)/resources/recall-message-templates/page.tsx

"use client";

import { AlertCircle, Copy } from "lucide-react";

type MessageType = "service" | "marketing";

interface Template {
  title: string;
  type: MessageType;
  message: string;
}

// Single source of truth: the text shown on the page is exactly the text that gets copied.
const TEMPLATES: Template[] = [
  {
    title: "Check-up Recall (Due Now)",
    type: "service",
    message:
      "Hi {first_name}, it's {team_member} at {practice_name}. Your check-up is due. It takes about 20 minutes, and it's the easiest way to catch small problems before they turn into painful (and pricey) ones. Reply YES and I'll send you the next available times, or book here: [Link]",
  },
  {
    title: "Follow-up (No Reply After 3-5 Days)",
    type: "service",
    message:
      "Hi {first_name}, {team_member} from {practice_name} again. Most people put their check-up off simply because life gets busy, so we've made it easy: book in 30 seconds here [Link], or reply with a day that suits you and I'll find you a slot.",
  },
  {
    title: "Lapsed Patient (Overdue by 6+ months)",
    type: "service",
    message:
      "Hi {first_name}, it's {team_member} at {practice_name}. It's been a little while since we last saw you, and I didn't want you to slip through the cracks. No judgement, whatever the reason. If anything's been bothering you, or you'd just like a proper check, reply here and I'll personally find you a time that works: [Link]",
  },
  {
    title: "Final Nudge (Close the Loop)",
    type: "service",
    message:
      "Hi {first_name}, I don't want to keep messaging you, so this is my last one. If you'd still like a check-up at {practice_name}, you can book here whenever you're ready: [Link]. If now isn't the right time, no problem at all. Just reply STOP and we'll leave you be. Look after yourself!",
  },
  {
    title: "Review Request",
    type: "marketing",
    message:
      "Hi {first_name}, thanks for coming in to {practice_name} on {appointment_date}. How did we do? If we looked after you well, a 30-second Google review would mean a lot to the team and helps other nervous patients choose with confidence: [Google Link]. And if anything wasn't right, reply here and I'll sort it personally.",
  },
];

const BADGE_STYLES: Record<MessageType, { label: string; className: string }> = {
  service: {
    label: "Service message",
    className:
      "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
  },
  marketing: {
    label: "Marketing message",
    className:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  },
};

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

      {TEMPLATES.map((template, index) => {
        const badge = BADGE_STYLES[template.type];

        return (
          <div
            key={template.title}
            className={`${index === 0 ? "mt-10 " : ""}mb-8 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden`}
          >
            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 px-6 py-4 border-slate-200 dark:border-slate-800 border-b">
              <h3 className="m-0 font-bold text-slate-900 dark:text-white text-lg">{template.title}</h3>
              <span className={`inline-flex items-center px-2 py-1 rounded font-semibold text-xs ${badge.className}`}>
                {badge.label}
              </span>
            </div>
            <div className="group relative bg-white dark:bg-slate-950 p-6">
              <p className="m-0 font-mono text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap">
                {template.message}
              </p>
              <button 
                onClick={() => copyToClipboard(template.message)}
                className="top-4 right-4 absolute bg-slate-100 dark:bg-slate-800 opacity-0 group-hover:opacity-100 p-2 rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-white transition-opacity"
                title="Copy to clipboard"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}

    </div>
  );
}