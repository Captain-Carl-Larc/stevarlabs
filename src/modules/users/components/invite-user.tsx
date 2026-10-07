"use client";

// File: invite-form.tsx
// Folder: src/app/(admin)/admin/users/components

import { useState } from "react";
import { useRouter } from "next/navigation";
import { inviteUser } from "@/modules/auth/invite.action";

export function InviteUserForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await inviteUser(formData);

    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else if (result.success) {
      setMessage({ type: "success", text: result.success });
      (e.target as HTMLFormElement).reset();
      router.refresh(); 
    }
    
    setLoading(false);
  }

  return (
    <div className="bg-white dark:bg-slate-950 shadow-sm p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
      <h2 className="mb-4 font-semibold text-slate-900 dark:text-white text-lg">Invite New User</h2>
      
      {message && (
        <div className={`mb-4 rounded p-3 text-sm ${
          message.type === "error" 
            ? "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400" 
            : "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="gap-4 grid grid-cols-1 md:grid-cols-3">
        <div>
          <label className="block mb-1 font-medium text-slate-600 dark:text-slate-400 text-xs">Full Name</label>
          <input name="name" type="text" required placeholder="Jane Doe" className="bg-transparent px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full text-sm" />
        </div>
        <div>
          <label className="block mb-1 font-medium text-slate-600 dark:text-slate-400 text-xs">Email Address</label>
          <input name="email" type="email" required placeholder="jane@example.com" className="bg-transparent px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full text-sm" />
        </div>
        <div>
          <label className="block mb-1 font-medium text-slate-600 dark:text-slate-400 text-xs">Role</label>
          <select name="role" className="bg-transparent dark:bg-slate-900 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full text-sm">
            <option value="ADMIN">Admin</option>
            <option value="EDITOR">Editor</option>
            <option value="REVIEWER">Reviewer</option>
          </select>
        </div>
        <div className="flex justify-end md:col-span-3">
          <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-4 py-2 rounded-lg font-semibold text-white text-sm transition">
            {loading ? "Sending..." : "Send Invitation Email"}
          </button>
        </div>
      </form>
    </div>
  );
}