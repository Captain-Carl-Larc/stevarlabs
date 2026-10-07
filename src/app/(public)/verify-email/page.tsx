"use client";

// File: page.tsx
// Folder: src/app/(public)/verify-email
// Description: Public landing page where users confirm their email verification.
// Imports: React hooks, Next.js navigation, verifyEmailAction.
// Exports: Default VerifyEmailPage component

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyEmailAction } from "@/modules/auth/verify-email.action";

function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token || !email) {
      setError("Invalid verification link. Missing token or email parameters.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.append("token", token);
    formData.append("email", email);

    const result = await verifyEmailAction(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/login?verified=true");
    }
  }

  return (
    <div className="bg-white dark:bg-slate-950 shadow-sm mx-auto mt-24 p-8 border border-slate-200 dark:border-slate-800 rounded-xl max-w-md">
      <h1 className="font-bold text-slate-900 dark:text-white text-2xl">
        Verify Email Address
      </h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">
        Click the button below to verify <span className="font-medium text-slate-700 dark:text-slate-300">{email}</span> and activate your account.
      </p>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 mt-4 p-3 rounded text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-4 py-2 rounded-lg w-full font-semibold text-white text-sm transition"
        >
          {loading ? "Verifying..." : "Verify & Activate Account"}
        </button>
      </form>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="mt-24 text-slate-500 text-sm text-center">Loading verification securely...</div>}>
      <VerifyEmailForm />
    </Suspense>
  );
}