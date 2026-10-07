// File: page.tsx
// Folder: src/app/(admin)/admin/users

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { Role } from "@/generated/prisma";
import { inviteUser } from "@/modules/auth/invite.action";
import { redirect } from "next/navigation";

export default async function AdminUsersPage() {
  const session = await auth();
  
  // Enforce RBAC at the page level
  if (!session || (session.user.role !== Role.SUPERADMIN && session.user.role !== Role.ADMIN)) {
    redirect("/admin");
  }

  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-slate-900 dark:text-white text-2xl">User Management</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Manage team roles and invite new administrators or editors.</p>
        </div>
      </div>

      {/* Invite Form Section */}
      <div className="bg-white dark:bg-slate-950 shadow-sm p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
        <h2 className="mb-4 font-semibold text-slate-900 dark:text-white text-lg">Invite New User</h2>
        <form action={inviteUser} className="gap-4 grid grid-cols-1 md:grid-cols-3">
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
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-semibold text-white text-sm transition">
              Send Invitation Email
            </button>
          </div>
        </form>
      </div>

      {/* Existing Users Table */}
      <div className="bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 border-b font-semibold text-slate-500 dark:text-slate-400 text-xs">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
            {users.map((u) => (
              <tr key={u.id} className="text-slate-700 dark:text-slate-300">
                <p className="p-4 font-medium text-slate-900 dark:text-white">{u.name}</p>
                <td className="p-4">{u.email}</td>
                <td className="p-4"><span className="bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded font-semibold text-blue-600 dark:text-blue-400 text-xs">{u.role}</span></td>
                <td className="p-4"><span className={`rounded px-2 py-1 text-xs font-semibold ${u.status === 'ACTIVE' ? 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'}`}>{u.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}