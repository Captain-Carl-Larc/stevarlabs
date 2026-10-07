"use client";

// File: CategoryMobile.tsx
// Folder: src/app/admin/categories/components

import { CategoryType } from "./types";

interface Props {
  categories: CategoryType[];
  onEdit: (cat: CategoryType) => void;
  onDelete: (cat: CategoryType) => void;
}

export function CategoryMobile({ categories, onEdit, onDelete }: Props) {
  if (categories.length === 0) {
    return <div className="md:hidden p-6 text-slate-500 text-sm text-center">No categories found.</div>;
  }

  return (
    <div className="md:hidden grid grid-cols-1 divide-y divide-slate-100 dark:divide-slate-800">
      {categories.map((cat) => (
        <div key={cat.id} className="space-y-3 p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">{cat.name}</p>
              <p className="text-slate-500 text-xs">/{cat.slug}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onEdit(cat)} className="text-blue-600 text-sm hover:underline">Edit</button>
              {cat._count.posts === 0 ? (
                <button onClick={() => onDelete(cat)} className="text-red-600 text-sm hover:underline">Delete</button>
              ) : (
                <span className="text-slate-400 text-sm cursor-not-allowed" title="Cannot delete: has posts">Delete</span>
              )}
            </div>
          </div>
          <div className="font-semibold text-slate-500 dark:text-slate-400 text-xs">
            {cat._count.posts} {cat._count.posts === 1 ? 'Post' : 'Posts'}
          </div>
        </div>
      ))}
    </div>
  );
}