// File: RecentPostsTable.tsx
// Folder: src/modules/dashboard/components

import Link from "next/link";
import { Eye, Edit } from "lucide-react";

type RecentPost = {
  id: string;
  title: string;
  status: string;
  category: { name: string };
  author: { name: string };
};

export function RecentPostsTable({ posts }: { posts: RecentPost[] }) {
  return (
    <div className="bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
      <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-2 p-5 sm:p-6 border-slate-200 dark:border-slate-800 border-b">
        <div>
          <h2 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">Recent Publications</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">The 5 most recently created posts across your workspace.</p>
        </div>
        <Link
          href="/admin/posts"
          className="self-start sm:self-auto font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 text-xs sm:text-sm"
        >
          View all posts →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-slate-600 dark:text-slate-300 text-xs sm:text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 border-b text-slate-900 dark:text-white">
            <tr>
              <th className="p-3 sm:p-4 font-semibold">Title</th>
              <th className="p-3 sm:p-4 font-semibold">Category</th>
              <th className="p-3 sm:p-4 font-semibold">Status</th>
              <th className="p-3 sm:p-4 font-semibold">Author</th>
              <th className="p-3 sm:p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {!posts || posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-slate-500 text-center">
                  No posts found. Get started by creating one!
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                  <td className="p-3 sm:p-4 max-w-[200px] sm:max-w-xs font-medium text-slate-900 dark:text-white truncate">
                    {post.title}
                  </td>
                  <td className="p-3 sm:p-4">{post.category.name}</td>
                  <td className="p-3 sm:p-4">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium ${
                      post.status === "PUBLISHED" 
                        ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="p-3 sm:p-4">{post.author.name}</td>
                  <td className="p-3 sm:p-4 text-right">
                    <div className="flex justify-end items-center gap-1 sm:gap-2">
                      <Link 
                        href={`/admin/posts/${post.id}/preview`}
                        className="hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 rounded-md text-slate-400 hover:text-blue-600"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link 
                        href={`/admin/posts/${post.id}/edit`}
                        className="hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 rounded-md text-slate-400 hover:text-blue-600"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}