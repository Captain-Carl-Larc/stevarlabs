"use client";

// File: UserTable.tsx
// Folder: src/app/admin/users/components
// Description: Interactive, responsive client table for displaying, editing, and deleting users via modals.
// Imports: React hooks, Prisma enums, server actions for updating and deleting users.
// Exports: UserTable component.

import { useState } from "react";
import { Role, UserStatus } from "@/generated/prisma";
import { updateUserAction } from "@/modules/users/update.action";
import { deleteUserAction } from "@/modules/users/delete.action";

type UserType = {
  id: string;
  name: string | null;
  email: string | null;
  role: Role;
  status: UserStatus;
};

export function UserTable({ 
  initialUsers, 
  currentUserId 
}: { 
  initialUsers: UserType[];
  currentUserId: string;
}) {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [modalType, setModalType] = useState<"EDIT" | "DELETE" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editRole, setEditRole] = useState<Role>(Role.EDITOR);
  const [editStatus, setEditStatus] = useState<UserStatus>(UserStatus.PENDING);

  const openEdit = (user: UserType) => {
    setSelectedUser(user);
    setEditRole(user.role);
    setEditStatus(user.status);
    setModalType("EDIT");
    setError(null);
  };

  const openDelete = (user: UserType) => {
    setSelectedUser(user);
    setModalType("DELETE");
    setError(null);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalType(null);
    setError(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setLoading(true);
    setError(null);

    const res = await updateUserAction(selectedUser.id, { role: editRole, status: editStatus });
    if (res.error) setError(res.error);
    else closeModal();
    
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    setLoading(true);
    setError(null);

    const res = await deleteUserAction(selectedUser.id);
    if (res.error) setError(res.error);
    else closeModal();
    
    setLoading(false);
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl">
        
        {/* MOBILE VIEW */}
        <div className="md:hidden grid grid-cols-1 divide-y divide-slate-100 dark:divide-slate-800">
          {initialUsers.map((user) => (
            <div key={user.id} className="space-y-3 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {user.name} {user.id === currentUserId && "(You)"}
                  </p>
                  <p className="text-slate-500 text-sm">{user.email}</p>
                </div>
                <div className="flex gap-2">
                  {user.id !== currentUserId ? (
                    <>
                      <button onClick={() => openEdit(user)} className="text-blue-600 text-sm hover:underline">Edit</button>
                      <button onClick={() => openDelete(user)} className="text-red-600 text-sm hover:underline">Delete</button>
                    </>
                  ) : (
                    <span className="text-slate-400 text-xs italic">Current Session</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 font-semibold text-xs">
                <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-600 dark:text-slate-300">
                  {user.role}
                </span>
                <span className={`rounded px-2 py-1 ${
                  user.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 
                  user.status === 'DEACTIVATED' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {user.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-slate-600 dark:text-slate-400 text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 border-b font-semibold text-slate-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {initialUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    {user.name} {user.id === currentUserId && <span className="bg-slate-100 dark:bg-slate-800 ml-2 px-2 py-0.5 rounded text-[10px] text-slate-500 uppercase">You</span>}
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-semibold text-slate-600 dark:text-slate-300 text-xs">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded px-2 py-1 text-xs font-semibold ${
                      user.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 
                      user.status === 'DEACTIVATED' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {user.id !== currentUserId ? (
                      <div className="flex justify-end gap-3">
                        <button onClick={() => openEdit(user)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                        <button onClick={() => openDelete(user)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-xs italic">Current Session</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL BACKDROP & CONTAINERS (Unchanged) */}
      {modalType && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 shadow-xl p-6 rounded-xl w-full max-w-md">
            
            {/* EDIT MODAL */}
            {modalType === "EDIT" && selectedUser && (
              <form onSubmit={handleUpdate}>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Edit {selectedUser.name}</h3>
                {error && <div className="bg-red-50 mt-3 p-3 rounded text-red-600 text-sm">{error}</div>}
                
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">Role</label>
                    <select 
                      value={editRole} 
                      onChange={(e) => setEditRole(e.target.value as Role)}
                      className="bg-transparent px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full dark:text-white text-sm"
                    >
                      <option value="EDITOR">EDITOR</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="SUPERADMIN">SUPERADMIN</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">Status</label>
                    <select 
                      value={editStatus} 
                      onChange={(e) => setEditStatus(e.target.value as UserStatus)}
                      className="bg-transparent px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full dark:text-white text-sm"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="DEACTIVATED">DEACTIVATED</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={closeModal} className="hover:bg-slate-100 dark:hover:bg-slate-800 px-4 py-2 rounded-lg font-semibold text-slate-600 dark:text-slate-300 text-sm">Cancel</button>
                  <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-4 py-2 rounded-lg font-semibold text-white text-sm">
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}

            {/* DELETE MODAL */}
            {modalType === "DELETE" && selectedUser && (
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Delete User</h3>
                <p className="mt-2 text-slate-500 text-sm">Are you sure you want to permanently delete <strong>{selectedUser.name}</strong>? This action cannot be undone.</p>
                {error && <div className="bg-red-50 mt-3 p-3 rounded text-red-600 text-sm">{error}</div>}

                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={closeModal} className="hover:bg-slate-100 dark:hover:bg-slate-800 px-4 py-2 rounded-lg font-semibold text-slate-600 dark:text-slate-300 text-sm">Cancel</button>
                  <button onClick={handleDelete} disabled={loading} className="bg-red-600 hover:bg-red-500 disabled:opacity-50 px-4 py-2 rounded-lg font-semibold text-white text-sm">
                    {loading ? "Deleting..." : "Yes, Delete"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}