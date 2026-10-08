// File: PostSidebar.tsx
// Folder: src/modules/marketing/posts/components

import Link from "next/link";
import { getSidebarPosts } from "../public-posts.action";

export async function PostSidebar({ categoryId, currentPostId }: { categoryId: string, currentPostId: string }) {
  // This fetch happens asynchronously and doesn't block the main page!
  const { posts } = await getSidebarPosts(categoryId, currentPostId);

  if (!posts || posts.length === 0) return null;

  return (
    <aside className="space-y-6">
      <h3 className="pb-2 border-slate-200 dark:border-slate-800 border-b font-bold text-slate-900 dark:text-white text-lg">
        Read Next
      </h3>
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.slug}`} className="group flex flex-col gap-3">
            {post.featuredImage && (
              <div className="border border-slate-100 dark:border-slate-800 rounded-xl w-full aspect-[16/9] overflow-hidden">
                <img 
                  src={post.featuredImage} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
            )}
            <div>
              <h4 className="font-semibold text-slate-900 dark:group-hover:text-blue-400 dark:text-white group-hover:text-blue-600 leading-tight">
                {post.title}
              </h4>
              {post.publishedAt && (
                <p className="mt-1 text-slate-500 text-xs">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}