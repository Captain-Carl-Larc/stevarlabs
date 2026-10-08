// File: page.tsx
// Folder: src/app/admin/posts
// Description: Lists all posts with management actions.

import Link from "next/link";
import { getPostsAction } from "@/modules/posts"; // Using the congregator!
import { DeletePostButton } from "@/modules/posts/components/DeletePostButton";
import { Edit, Eye, Plus } from "lucide-react";

export default async function PostsPage() {
  const { posts, error } = await getPostsAction();

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

      <div className="bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-slate-600 dark:text-slate-300 text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 border-b text-slate-900 dark:text-white">
              <tr>
                <th className="p-4 font-semibold">Title</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Author</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {posts?.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-slate-500 text-center">
                    No posts found. Create your first one!
                  </td>
                </tr>
              )}
              {posts?.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                  <td className="p-4 font-medium text-slate-900 dark:text-white">{post.title}</td>
                  <td className="p-4">{post.category.name}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      post.status === "PUBLISHED" 
                        ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="p-4">{post.author.name}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <Link 
                        href={`/admin/posts/${post.id}/preview`}
                        className="hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 rounded-md text-slate-400 hover:text-blue-600"
                        title="Preview Post"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link 
                        href={`/admin/posts/${post.id}/edit`}
                        className="hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 rounded-md text-slate-400 hover:text-blue-600"
                        title="Edit Post"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <DeletePostButton id={post.id} title={post.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}