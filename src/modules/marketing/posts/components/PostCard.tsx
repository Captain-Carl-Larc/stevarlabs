// File: PostCard.tsx
// Folder: src/modules/marketing/posts/components

import Link from "next/link";

export function PostCard({ post }: { post: any }) {
  return (
    <Link href={`/posts/${post.slug}`} className="group flex flex-col h-full">
      <div className="mb-5 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
        <img 
          src={post.featuredImage || "/placeholder-blog.jpg"} 
          alt={post.title} 
          className="w-full object-cover aspect-16/10 group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex items-center gap-2 mb-2 font-semibold text-blue-600 dark:text-blue-400 text-xs uppercase tracking-wider">
        <span>{post.category.name}</span>
      </div>
      <h3 className="mb-3 font-bold text-slate-900 dark:group-hover:text-blue-400 dark:text-white group-hover:text-blue-600 text-xl leading-tight">
        {post.title}
      </h3>
      {post.metaDescription && (
        <p className="mb-4 text-slate-600 dark:text-slate-400 line-clamp-2">
          {post.metaDescription}
        </p>
      )}
      <div className="flex items-center gap-2 mt-auto pt-4 font-medium text-slate-500 dark:text-slate-400 text-sm">
        <span className="font-semibold text-slate-700 dark:text-slate-300">{post.author.name}</span>
        <span>•</span>
        <time dateTime={post.publishedAt?.toString()}>
          {new Date(post.publishedAt!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </time>
      </div>
    </Link>
  );
}