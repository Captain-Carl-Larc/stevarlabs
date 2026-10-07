"use client";

// File: CategoryDesktop.tsx
// Folder: src/app/admin/categories/components

import { CategoryType } from "./types";

interface Props {
  categories: CategoryType[];
  onEdit: (cat: CategoryType) => void;
  onDelete: (cat: CategoryType) => void;
}

export function CategoryDesktop({ categories, onEdit, onDelete }: Props) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full text-slate-600 dark:text-slate-400 text-sm text-left">
        <thead className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 border-b font-semibold text-slate-500 text-xs uppercase">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Slug</th>
            <th className="px-6 py-4">Description</th>
            <th className="px-6 py-4">Posts</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {categories.map((cat) => (
            <tr key={cat.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
              <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{cat.name}</td>
              <td className="px-6 py-4">/{cat.slug}</td>
              <td className="px-6 py-4 max-w-xs truncate">{cat.description || "—"}</td>
              <td className="px-6 py-4">
                <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full font-medium text-slate-600 dark:text-slate-300 text-xs">
                  {cat._count.posts}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-3">
                  <button onClick={() => onEdit(cat)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                  {cat._count.posts === 0 ? (
                    <button onClick={() => onDelete(cat)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                  ) : (
                    <span className="font-medium text-slate-400 cursor-not-allowed" title="Cannot delete category with active posts">Delete</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-slate-500 text-center">No categories created yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}