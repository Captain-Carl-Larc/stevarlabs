"use client";

// File: page.tsx
// Folder: src/app/(public)/setup
// Role: One-time UI for the owner to claim the CMS

import { useState } from "react";
import { useRouter } from "next/navigation";
import { bootstrapSuperadmin } from "@/modules/auth/setup.action";

export default function SetupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await bootstrapSuperadmin(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else if (result.success) {
      // Upon success, push them straight to the login page
      router.push("/login?setup=success");
    }
  }

  return (
    <div className="bg-white dark:bg-slate-950 shadow-sm mx-auto mt-24 p-8 border border-slate-200 dark:border-slate-800 rounded-xl max-w-md">
      <h1 className="font-bold text-slate-900 dark:text-white text-2xl">
        System Bootstrap
      </h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">
        Create the initial Superadmin account to claim this installation.
      </p>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 mt-4 p-3 rounded text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div>
          <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">
            Setup Token
          </label>
          <input
            name="token"
            type="password"
            required
            className="bg-transparent px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full text-sm"
          />
        </div>
        <hr className="border-slate-200 dark:border-slate-800" />
        <div>
          <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">
            Your Name
          </label>
          <input
            name="name"
            type="text"
            required
            className="bg-transparent px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full text-sm"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">
            Admin Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="bg-transparent px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full text-sm"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">
            Admin Password
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
          {loading ? "Creating..." : "Create Superadmin"}
        </button>
      </form>
    </div>
  );
}