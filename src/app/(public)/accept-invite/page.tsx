// File: page.tsx
// Folder: src/app/accept-invite
// Description: The landing page for users clicking an invite link from their email.

import { AcceptInviteForm } from "@/modules/auth/components/AcceptInviteForm";
import Link from "next/link";

export default async function AcceptInvitePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; email?: string }>;
}) {
  const resolvedParams = await searchParams;
  const token = resolvedParams?.token;
  const email = resolvedParams?.email;

  // If the URL is missing parameters, show a friendly error
  if (!token || !email) {
    return (
      <div className="flex justify-center items-center bg-slate-50 dark:bg-slate-950 px-4 min-h-screen">
        <div className="bg-white dark:bg-slate-900 shadow-sm p-8 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md text-center">
          <h1 className="mb-2 font-bold text-slate-900 dark:text-white text-2xl">Invalid Link</h1>
          <p className="mb-6 text-slate-600 dark:text-slate-400">
            This invitation link is incomplete or missing. Please check your email and click the exact link provided.
          </p>
          <Link href="/" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center bg-slate-50 dark:bg-slate-950 px-4 py-12 min-h-screen">
      <div className="bg-white dark:bg-slate-900 shadow-sm p-8 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md">
        
        <div className="mb-8 text-center">
          <h1 className="font-bold text-slate-900 dark:text-white text-2xl">Welcome to Cyload</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
            Set a password for <span className="font-semibold">{email}</span> to activate your account.
          </p>
        </div>

        <AcceptInviteForm token={token} email={email} />
        
      </div>
    </div>
  );
}