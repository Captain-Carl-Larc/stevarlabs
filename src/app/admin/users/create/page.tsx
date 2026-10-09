// File: page.tsx
// Folder: src/app/admin/users/create
// Description: Page wrapper for the Create User form.

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CreateUserForm } from "@/modules/users/components/CreateUserForm";

export default function CreateUserPage() {
  return (
    <div className="mx-auto p-4 md:p-6 max-w-2xl">
      
      {/* Header and Back Navigation */}
      <div className="mb-6">
        <Link 
          href="/admin/users" 
          className="inline-flex items-center gap-2 mb-4 font-medium text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 dark:text-slate-400 text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Users
        </Link>
        <h1 className="font-bold text-slate-900 dark:text-white text-2xl">Invite Team Member</h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400 text-sm">
          Send an invitation link to add a new user to your workspace.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-slate-950 shadow-sm p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
        <CreateUserForm />
      </div>
      
    </div>
  );
}