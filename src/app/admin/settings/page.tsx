// File: page.tsx
// Folder: src/app/admin/settings
// Description: Server Component that fetches the current user's profile and renders the Settings page.
// Imports: auth server hook, getUserAction, SettingsForm client component.
// Exports: Default SettingsPage component.

import { auth } from "@/auth";
import { getUserAction } from "@/modules/users/getuser.action";
import { redirect } from "next/navigation";
import { SettingsForm } from "@/modules/settings/components/SettingsForm";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Fetch fresh user data from the DB to ensure we have the latest name/email
  const { user, error } = await getUserAction(session.user.id);

  if (error || !user) {
    return (
      <div className="p-6 text-red-500">
        <p>Error loading profile data: {error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4 md:p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="font-bold text-slate-900 dark:text-white text-2xl">Account Settings</h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400 text-sm">
          Update your personal information and secure your account.
        </p>
      </div>

      <SettingsForm 
        initialName={user.name || ""} 
        initialEmail={user.email || ""} 
      />
    </div>
  );
}