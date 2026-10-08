// File: page.tsx
// Folder: src/app/admin/posts/create
// Description: Server component that fetches categories and renders the post creation form.

import { getCategoriesAction } from "@/modules/categories/get-categories.action";
import { CreatePostForm } from "@/modules/posts/components/CreatePostForm";
import Link from "next/link";

export default async function CreatePostPage() {
  const { categories } = await getCategoriesAction();

  return (
    <div className="mx-auto p-4 md:p-6 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-bold text-slate-900 dark:text-white text-2xl">
            Create New Post
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400 text-sm">
            Write and format your article using the rich text editor.
          </p>
        </div>
        <Link
          href="/admin/posts"
          className="bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold text-slate-700 dark:text-slate-200 text-sm"
        >
          Cancel
        </Link>
      </div>

      {/* 
        We pass the categories to the client component so they populate the dropdown 
      */}
      <CreatePostForm categories={categories || []} />
    </div>
  );
}
