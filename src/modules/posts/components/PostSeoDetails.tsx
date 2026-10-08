"use client";

// File: PostSeoDetails.tsx
// Folder: src/app/admin/posts/components

interface Props {
  slug: string; setSlug: (val: string) => void;
  metaTitle: string; setMetaTitle: (val: string) => void;
  metaDescription: string; setMetaDescription: (val: string) => void;
}

export function PostSeoDetails({ slug, setSlug, metaTitle, setMetaTitle, metaDescription, setMetaDescription }: Props) {
  return (
    <div className="space-y-4 bg-white dark:bg-slate-950 shadow-sm p-5 border border-slate-200 dark:border-slate-800 rounded-xl">
      <h3 className="font-semibold text-slate-900 dark:text-white">Search Engine Optimization</h3>
      <div>
        <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">URL Slug</label>
        <input 
          type="text" value={slug} onChange={(e) => setSlug(e.target.value)}
          placeholder="Auto-generated from title if blank"
          className="bg-transparent px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full dark:text-white text-sm"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">Meta Title</label>
        <input 
          type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)}
          placeholder="Keep under 60 characters"
          className="bg-transparent px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full dark:text-white text-sm"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">Meta Description</label>
        <textarea 
          value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)}
          rows={3} placeholder="Keep under 160 characters"
          className="bg-transparent px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full dark:text-white text-sm"
        />
      </div>
    </div>
  );
}