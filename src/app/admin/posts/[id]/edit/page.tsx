// File: page.tsx
// Folder: src/app/admin/posts/[id]/edit
// Description: Server component that fetches an existing post and renders the edit form.

import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoriesAction } from "@/modules/categories/get-categories.action";
import { getPostByIdAction } from "@/modules/posts";
import { EditPostForm } from "@/modules/posts/components/EditPostForm";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await the dynamic params for Next.js 15+ compatibility
  const { id } = await params;

  // Fetch both the post and categories simultaneously for speed
  const [postRes, catRes] = await Promise.all([
    getPostByIdAction(id),
    getCategoriesAction(),
  ]);

  if (postRes.error || !postRes.post) {
    return notFound();
  }

  return (
    <div className="mx-auto p-4 md:p-6 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-bold text-slate-900 dark:text-white text-2xl">
            Edit Post
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400 text-sm">
            Make changes to your article.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/posts/${id}/preview`}
            className="bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold text-slate-700 dark:text-slate-200 text-sm"
          >
            Preview
          </Link>
          <Link
            href="/admin/posts"
            className="bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold text-slate-700 dark:text-slate-200 text-sm"
          >
            Cancel
          </Link>
        </div>
      </div>

      <EditPostForm post={postRes.post} categories={catRes.categories || []} />
    </div>
  );
}
