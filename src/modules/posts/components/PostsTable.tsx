// File: PostsTable.tsx
// Folder: src/app/admin/posts/components
// Description: Client/Server component to render the data table for posts.

import Link from "next/link";
import { Edit, Eye } from "lucide-react";
import { DeletePostButton } from "@/modules/posts/components/DeletePostButton";

// Defining a rough type based on the data we know is returned
type Post = {
  id: string;
  title: string;
  status: string;
  category: { name: string; slug?: string };
  author: { name: string };
};

export function PostsTable({ posts }: { posts: Post[] | null }) {
  return (
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
          {(!posts || posts.length === 0) && (
            <tr>
              <td colSpan={5} className="p-8 text-slate-500 text-center">
                No posts found on this page.
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
  );
}