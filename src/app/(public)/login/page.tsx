"use client";

// File: page.tsx
// Folder: src/app/(public)/login

import { useState } from "react";
import Link from "next/link";
import { loginAction } from "@/modules/auth/login.action";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    // If there's an error, display it. (If successful, NextAuth handles the redirect)
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="bg-white dark:bg-slate-950 shadow-sm mx-auto mt-24 p-8 border border-slate-200 dark:border-slate-800 rounded-xl max-w-md">
      <h1 className="font-bold text-slate-900 dark:text-white text-2xl">
        Welcome Back
      </h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">
        Sign in to access the CyLoad Core dashboard.
      </p>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 mt-4 p-3 rounded text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div>
          <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="bg-transparent px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full text-sm"
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block font-medium text-slate-700 dark:text-slate-300 text-sm">
              Password
            </label>
            <Link 
              href="/forgot-password" 
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 text-sm"
            >
              Forgot password?
            </Link>
          </div>
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="bg-transparent px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 mt-6 px-4 py-2 rounded-lg w-full font-semibold text-white text-sm transition"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}