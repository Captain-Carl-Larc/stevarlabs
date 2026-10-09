"use client";

// File: AcceptInviteForm.tsx
// Folder: src/modules/auth/components
// Description: Client component for users to set their password and accept an invite.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { acceptInvite } from "@/modules/auth/accept-invite.action";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export function AcceptInviteForm({ token, email }: { token: string; email: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsPending(false);
      return;
    }

    try {
      const result = await acceptInvite(formData);
      
      if (result.error) {
        setError(result.error);
      } else if (result.success) {
        setSuccess(result.success);
        setTimeout(() => {
          router.push("/login");
        }, 2500);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsPending(false);
    }
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="inline-flex justify-center items-center bg-green-100 dark:bg-green-900/30 mb-4 rounded-full w-12 h-12">
          <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mb-2 font-bold text-slate-900 dark:text-white text-xl">Account Activated</h3>
        <p className="mb-6 text-slate-500 dark:text-slate-400">{success}</p>
        <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400">
          Go to Login →
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Hidden inputs to pass the URL parameters to the server action */}
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="email" value={email} />

      <div>
        <label htmlFor="password" className="block mb-2 font-medium text-slate-900 dark:text-white text-sm">
          Create Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          minLength={8}
          className="block bg-slate-50 dark:bg-slate-900 p-2.5 border border-slate-300 focus:border-blue-500 dark:border-slate-700 rounded-lg focus:ring-blue-500 w-full text-slate-900 dark:text-white text-sm dark:placeholder-slate-400"
        />
        <p className="mt-1 text-slate-500 text-xs">Must be at least 8 characters.</p>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block mb-2 font-medium text-slate-900 dark:text-white text-sm">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          minLength={8}
          className="block bg-slate-50 dark:bg-slate-900 p-2.5 border border-slate-300 focus:border-blue-500 dark:border-slate-700 rounded-lg focus:ring-blue-500 w-full text-slate-900 dark:text-white text-sm dark:placeholder-slate-400"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-5 py-2.5 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 w-full font-medium text-white text-sm text-center transition-colors"
      >
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Activate Account"}
      </button>
    </form>
  );
}