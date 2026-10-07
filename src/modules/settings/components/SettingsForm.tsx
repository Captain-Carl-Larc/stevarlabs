"use client";

// File: SettingsForm.tsx
// Folder: src/app/admin/settings/components
// Description: Interactive client form for updating user profile and password.
// Imports: React hooks, updateSettingsAction.
// Exports: SettingsForm component.

import { useState } from "react";
import { updateSettingsAction } from "@/modules/settings/settings.action";

export function SettingsForm({ initialName, initialEmail }: { initialName: string, initialEmail: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword && newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      setLoading(false);
      return;
    }

    const res = await updateSettingsAction(formData);

    if (res.error) {
      setMessage({ type: "error", text: res.error });
    } else if (res.success) {
      setMessage({ type: "success", text: res.success });
      // Clear password fields on success
      (e.target as HTMLFormElement).reset();
      // Restore the unchanged name/email values since reset() clears the whole form
      const form = e.target as HTMLFormElement;
      (form.elements.namedItem("name") as HTMLInputElement).value = formData.get("name") as string;
      (form.elements.namedItem("email") as HTMLInputElement).value = formData.get("email") as string;
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div className={`rounded-lg p-4 text-sm font-medium ${
          message.type === "error" ? "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400" : "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
        }`}>
          {message.text}
        </div>
      )}

      {/* Profile Information Card */}
      <div className="bg-white dark:bg-slate-950 shadow-sm p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
        <h2 className="font-semibold text-slate-900 dark:text-white text-lg">Profile Information</h2>
        <div className="gap-5 grid md:grid-cols-2 mt-4">
          <div>
            <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">Full Name</label>
            <input
              type="text"
              name="name"
              defaultValue={initialName}
              required
              className="bg-transparent px-3 py-2 border border-slate-300 focus:border-blue-600 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 w-full text-slate-900 dark:text-white text-sm"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">Email Address</label>
            <input
              type="email"
              name="email"
              defaultValue={initialEmail}
              required
              className="bg-transparent px-3 py-2 border border-slate-300 focus:border-blue-600 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 w-full text-slate-900 dark:text-white text-sm"
            />
          </div>
        </div>
      </div>

      {/* Change Password Card */}
      <div className="bg-white dark:bg-slate-950 shadow-sm p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
        <h2 className="font-semibold text-slate-900 dark:text-white text-lg">Change Password</h2>
        <p className="mt-1 text-slate-500 text-sm">Leave these fields blank if you do not want to change your password.</p>
        
        <div className="space-y-5 mt-4">
          <div className="max-w-md">
            <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              placeholder="Enter current password"
              className="bg-transparent px-3 py-2 border border-slate-300 focus:border-blue-600 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 w-full text-slate-900 dark:text-white text-sm"
            />
          </div>
          
          <div className="gap-5 grid md:grid-cols-2">
            <div>
              <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">New Password</label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                minLength={8}
                className="bg-transparent px-3 py-2 border border-slate-300 focus:border-blue-600 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 w-full text-slate-900 dark:text-white text-sm"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                minLength={8}
                className="bg-transparent px-3 py-2 border border-slate-300 focus:border-blue-600 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 w-full text-slate-900 dark:text-white text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-6 py-2.5 rounded-lg font-semibold text-white text-sm transition"
        >
          {loading ? "Saving Changes..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}