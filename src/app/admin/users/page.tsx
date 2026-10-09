// File: page.tsx
// Folder: src/app/admin/users
// Description: Server Component that fetches all users and renders the User Management page.
// Imports: getAllUsersAction, auth, UserTable client component.
// Exports: Default UsersPage component.

import { getAllUsersAction } from "@/modules/users/getallusers.action";
import { auth } from "@/auth";
import { UserTable } from "@/modules/users/components/UserTable";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function UsersPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }

  const { users, error } = await getAllUsersAction();

  if (error || !users) {
    return (
      <div className="p-6 text-red-500">
        <p>Error: {error || "Failed to load users."}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4 md:p-6 max-w-6xl">
      
      {/* Mobile-Responsive Header */}
      <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="font-bold text-slate-900 dark:text-white text-2xl">User Management</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400 text-sm">
            Manage team roles, statuses, and account access.
          </p>
        </div>
        
        {/* New User Button */}
        <Link
          href="/admin/users/create"
          className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-500 shadow-sm px-4 py-2.5 sm:py-2 rounded-lg w-full sm:w-auto font-semibold text-white text-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> New User
        </Link>
      </div>

      {/* Pass both the users list and the currently logged-in user's ID */}
      <UserTable initialUsers={users} currentUserId={session.user.id} />
    </div>
  );
}