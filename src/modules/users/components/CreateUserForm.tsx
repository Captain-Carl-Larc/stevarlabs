"use client";

// File: CreateUserForm.tsx
// Folder: src/modules/users/components
// Description: Client component for the user invitation form.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { inviteUser } from "@/modules/auth/invite.action";
import { Loader2 } from "lucide-react";

export function CreateUserForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await inviteUser(formData);
      
      if (result.error) {
        setError(result.error);
      } else if (result.success) {
        setSuccess(result.success);
        // Automatically redirect back to the user list after a brief delay
        setTimeout(() => {
          router.push("/admin/users");
          router.refresh();
        }, 2000);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-green-700 dark:text-green-400 text-sm">
          {success}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block mb-2 font-medium text-slate-900 dark:text-white text-sm">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="e.g. Marion Onchiro"
          className="block bg-slate-50 dark:bg-slate-900 p-2.5 border border-slate-300 focus:border-blue-500 dark:border-slate-700 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-slate-900 dark:text-white text-sm dark:placeholder-slate-400"
        />
      </div>

      <div>
        <label htmlFor="email" className="block mb-2 font-medium text-slate-900 dark:text-white text-sm">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="name@company.com"
          className="block bg-slate-50 dark:bg-slate-900 p-2.5 border border-slate-300 focus:border-blue-500 dark:border-slate-700 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-slate-900 dark:text-white text-sm dark:placeholder-slate-400"
        />
      </div>

      <div>
        <label htmlFor="role" className="block mb-2 font-medium text-slate-900 dark:text-white text-sm">
          Role
        </label>
        <select
          id="role"
          name="role"
          required
          className="block bg-slate-50 dark:bg-slate-900 p-2.5 border border-slate-300 focus:border-blue-500 dark:border-slate-700 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-slate-900 dark:text-white text-sm"
        >
          <option value="AUTHOR">Author (Can write and manage own posts)</option>
          <option value="EDITOR">Editor (Can manage all posts and categories)</option>
          <option value="ADMIN">Admin (Full access except sensitive settings)</option>
          <option value="SUPERADMIN">Super Admin (Full system control)</option>
        </select>
      </div>

      <div className="flex gap-4 pt-4 border-slate-200 dark:border-slate-800 border-t">
        <button
          type="button"
          onClick={() => router.push("/admin/users")}
          className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-5 py-2.5 rounded-lg w-full sm:w-auto font-medium text-slate-900 dark:text-white text-sm text-center transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-5 py-2.5 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 w-full sm:w-auto font-medium text-white text-sm text-center transition-colors"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Invitation"}
        </button>
      </div>
    </form>
  );
}