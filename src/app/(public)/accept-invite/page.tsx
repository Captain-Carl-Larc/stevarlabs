"use client";

// File: page.tsx
// Folder: src/app/(public)/accept-invite
// Description: Public landing page where invited users enter a password to activate their account.
// Imports: React hooks, Next.js navigation, acceptInvite action.
// Exports: Default AcceptInvitePage component

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { acceptInvite } from "@/modules/auth/accept-invite.action";

function AcceptInviteForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token || !email) {
      setError("Invalid invitation link. Missing token or email parameters.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.append("token", token);
    formData.append("email", email);

    const result = await acceptInvite(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/login?invite=success");
    }
  }

  return (
    <div className="bg-white dark:bg-slate-950 shadow-sm mx-auto mt-24 p-8 border border-slate-200 dark:border-slate-800 rounded-xl max-w-md">
      <h1 className="font-bold text-slate-900 dark:text-white text-2xl">
        Accept Invitation
      </h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">
        Welcome! Set a secure password to activate your account for <span className="font-medium text-slate-700 dark:text-slate-300">{email}</span>.
      </p>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 mt-4 p-3 rounded text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div>
          <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">
            Create Password
          </label>
          <input
            name="password"
            type="password"
            minLength={8}
            required
            className="bg-transparent px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 mt-6 px-4 py-2 rounded-lg w-full font-semibold text-white text-sm transition"
        >
          {loading ? "Activating..." : "Activate Account"}
        </button>
      </form>
    </div>
  );
}

export default function AcceptInvitePage() {
  return (
    <Suspense fallback={<div className="mt-24 text-slate-500 text-sm text-center">Loading secure form...</div>}>
      <AcceptInviteForm />
    </Suspense>
  );
}