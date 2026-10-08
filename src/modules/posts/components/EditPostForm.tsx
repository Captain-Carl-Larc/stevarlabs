"use client";

// File: EditPostForm.tsx
// Folder: src/app/admin/posts/components
// Description: Client form managing post update state and the Tiptap editor.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updatePostAction } from "@/modules/posts";
import { PostStatus } from "@/generated/prisma";
import { RichTextEditor } from "@/modules/editor/components/RichTextEditor";
import { PostBasicDetails } from "./PostBasicDetails";
import { PostSeoDetails } from "./PostSeoDetails";
import { FeaturedImageUpload } from "./FeaturedImageUpload";

type Category = { id: string; name: string };

export function EditPostForm({ post, categories }: { post: any; categories: Category[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Safely parse the database string back into Tiptap JSON
  let initialTiptapContent = null;
  try {
    initialTiptapContent = JSON.parse(post.content);
  } catch (e) {
    console.error("Failed to parse post content JSON", e);
  }

  // Hydrate form state with existing post data
  const [title, setTitle] = useState(post.title || "");
  const [slug, setSlug] = useState(post.slug || "");
  const [categoryId, setCategoryId] = useState(post.categoryId || "");
  const [status, setStatus] = useState<PostStatus>(post.status as PostStatus);
  const [content, setContent] = useState<any>(initialTiptapContent);
  const [metaTitle, setMetaTitle] = useState(post.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(post.metaDescription || "");
  const [featuredImage, setFeaturedImage] = useState(post.featuredImage || "");
  const [imageAltText, setImageAltText] = useState(post.imageAltText || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) return setError("Please select a category.");
    if (!content || !content.content || content.content.length === 0) return setError("Post content cannot be empty.");

    setLoading(true); 
    setError(null);

    const res = await updatePostAction(post.id, {
      title, slug, categoryId, content, status, metaTitle, metaDescription, featuredImage, imageAltText
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
    <form onSubmit={handleSubmit} className="space-y-6 pb-20">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 p-4 border border-red-100 dark:border-red-900/50 rounded-lg text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="items-start gap-6 grid grid-cols-1 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <PostBasicDetails 
            title={title} setTitle={setTitle} 
            categoryId={categoryId} setCategoryId={setCategoryId} 
            status={status} setStatus={setStatus} 
            categories={categories} 
          />
          <PostSeoDetails 
            slug={slug} setSlug={setSlug} 
            metaTitle={metaTitle} setMetaTitle={setMetaTitle} 
            metaDescription={metaDescription} setMetaDescription={setMetaDescription} 
          />
        </div>

        <div className="space-y-6 lg:col-span-1">
          <FeaturedImageUpload 
            imageUrl={featuredImage} onImageChange={setFeaturedImage}
            altText={imageAltText} onAltTextChange={setImageAltText}
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 font-medium text-slate-700 dark:text-slate-300 text-sm">Content *</label>
        <RichTextEditor initialContent={content} onChange={setContent} />
      </div>

      <div className="right-0 bottom-0 left-0 lg:left-64 z-40 fixed flex justify-end items-center gap-4 bg-white/90 dark:bg-slate-950/90 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] backdrop-blur p-4 border-slate-200 dark:border-slate-800 border-t">
        <p className="hidden sm:block text-slate-500 text-sm">
          Updating as: <strong className="text-slate-900 dark:text-white">{status}</strong>
        </p>
        <button 
          type="submit" disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 shadow-sm px-6 py-2.5 rounded-lg font-semibold text-white text-sm"
        >
          {loading ? "Saving Changes..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}