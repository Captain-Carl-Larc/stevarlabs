"use client";

// File: PostBasicDetails.tsx
// Folder: src/app/admin/posts/components

import { PostStatus } from "@/generated/prisma";

type Category = { id: string; name: string };

interface Props {
  title: string; setTitle: (val: string) => void;
  categoryId: string; setCategoryId: (val: string) => void;
  status: PostStatus; setStatus: (val: PostStatus) => void;
  categories: Category[];
}

export function PostBasicDetails({ title, setTitle, categoryId, setCategoryId, status, setStatus, categories }: Props) {
  return (
    <div className="space-y-4 bg-white dark:bg-slate-950 shadow-sm p-5 border border-slate-200 dark:border-slate-800 rounded-xl">
      <h3 className="font-semibold text-slate-900 dark:text-white">Post Details</h3>
      <div>
        <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">Post Title *</label>
        <input 
          type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
          className="bg-transparent px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full dark:text-white text-sm"
        />
      </div>
      <div className="gap-4 grid grid-cols-2">
        <div>
          <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">Category *</label>
          <select 
            required value={categoryId} onChange={(e) => setCategoryId(e.target.value)}
            className="bg-transparent px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full dark:text-white text-sm"
          >
            <option value="" disabled>Select category</option>
            {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">Status</label>
          <select 
            value={status} onChange={(e) => setStatus(e.target.value as PostStatus)}
            className="bg-transparent px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full dark:text-white text-sm"
          >
            <option value={PostStatus.DRAFT}>Draft</option>
            <option value={PostStatus.PUBLISHED}>Published</option>
          </select>
        </div>
      </div>
    </div>
  );
}