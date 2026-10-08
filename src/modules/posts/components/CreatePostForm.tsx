"use client";

// File: CreatePostForm.tsx
// Folder: src/app/admin/posts/components
// Description: Client form managing post creation state and the Tiptap editor.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPostAction } from "@/modules/posts/create-post.action";
import { RichTextEditor } from "@/modules/editor/components/RichTextEditor";
import { PostStatus } from "@/generated/prisma";

type Category = { id: string; name: string };

export function CreatePostForm({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState<PostStatus>(PostStatus.DRAFT);
  const [content, setContent] = useState<any>(null); // Tiptap JSON
  
  // SEO State
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) {
      setError("Please select a category.");
      return;
    }
    if (!content || !content.content || content.content.length === 0) {
      setError("Post content cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);

    const res = await createPostAction({
      title,
      slug,
      categoryId,
      content,
      status,
      metaTitle,
      metaDescription,
    });

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push("/admin/posts");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 p-4 border border-red-100 dark:border-red-900/50 rounded-lg text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Top Meta Data Grid */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
        <div className="space-y-4 bg-white dark:bg-slate-950 shadow-sm p-5 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div>
            <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">Post Title *</label>
            <input 
              type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full dark:text-white text-sm"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">URL Slug (Optional)</label>
            <input 
              type="text" value={slug} onChange={(e) => setSlug(e.target.value)}
              placeholder="Auto-generated if left blank"
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
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
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

        {/* SEO Data */}
        <div className="space-y-4 bg-white dark:bg-slate-950 shadow-sm p-5 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div>
            <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">SEO Meta Title</label>
            <input 
              type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="Keep under 60 characters"
              className="bg-transparent px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full dark:text-white text-sm"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">SEO Meta Description</label>
            <textarea 
              value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)}
              rows={4} placeholder="Keep under 160 characters"
              className="bg-transparent px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full dark:text-white text-sm"
            />
          </div>
        </div>
      </div>

      {/* Tiptap Rich Text Editor */}
      <div>
        <label className="block mb-2 font-medium text-slate-700 dark:text-slate-300 text-sm">Content *</label>
        <RichTextEditor onChange={(json) => setContent(json)} />
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="bottom-0 z-40 sticky flex justify-between items-center bg-white/90 dark:bg-slate-950/90 shadow-sm backdrop-blur p-4 border border-slate-200 dark:border-slate-800 rounded-xl">
        <p className="text-slate-500 text-sm">
          Currently saving as: <strong className="text-slate-900 dark:text-white">{status}</strong>
        </p>
        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 shadow-sm px-6 py-2.5 rounded-lg font-semibold text-white text-sm"
        >
          {loading ? "Saving Post..." : "Save Post"}
        </button>
      </div>
    </form>
  );
}