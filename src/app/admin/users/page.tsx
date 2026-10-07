// File: page.tsx
// Folder: src/app/admin/users
// Description: Server Component that fetches all users and renders the User Management page.
// Imports: getAllUsersAction, auth, UserTable client component.
// Exports: Default UsersPage component.

import { getAllUsersAction } from "@/modules/users/getallusers.action";
import { auth } from "@/auth";
import { UserTable } from "@/modules/users/components/UserTable";
import { redirect } from "next/navigation";

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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-bold text-slate-900 dark:text-white text-2xl">User Management</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400 text-sm">
            Manage team roles, statuses, and account access.
          </p>
        </div>
      </div>

      {/* Pass both the users list and the currently logged-in user's ID */}
      <UserTable initialUsers={users} currentUserId={session.user.id} />
    </div>
  );
}