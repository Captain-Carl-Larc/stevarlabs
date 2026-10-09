// File: page.tsx
// Folder: src/app/admin/posts
// Description: Lists all posts with management actions.

import Link from "next/link";
import { getPostsAction } from "@/modules/posts";
import { Pagination } from "@/components/ui/Pagination";
import { Plus } from "lucide-react";
import { PostsTable } from "@/modules/posts/components/PostsTable";

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // Extract and resolve the page number from the URL
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams?.page) || 1;
  const limit = 10;

  // Pass the pagination arguments to the action and extract metadata
  const { posts, metadata, error } = await getPostsAction(currentPage, limit);

  return (
    <div className="mx-auto p-4 md:p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-bold text-slate-900 dark:text-white text-2xl">Posts</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400 text-sm">
            Manage your blog articles, drafts, and publications.
          </p>
        </div>
        <Link
          href="/admin/posts/create"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 shadow-sm px-4 py-2 rounded-lg font-semibold text-white text-sm"
        >
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 mb-6 p-4 rounded-lg text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        
        {/* Extracted Posts Table */}
        <PostsTable posts={posts} />
        
        {/* Pagination rendered at the bottom of the table wrapper */}
        {metadata && (
          <Pagination totalPages={metadata.totalPages} currentPage={metadata.page} />
        )}
      </div>
    </div>
  );
}