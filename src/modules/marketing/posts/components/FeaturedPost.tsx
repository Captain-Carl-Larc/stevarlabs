// File: FeaturedPost.tsx
// Folder: src/modules/marketing/posts/components

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeaturedPost({ post }: { post: any }) {
  return (
    <Link href={`/posts/${post.slug}`} className="group flex md:flex-row flex-col items-center gap-8 lg:gap-12 mb-16 md:mb-24">
      <div className="border border-slate-100 dark:border-slate-800 rounded-2xl w-full md:w-3/5 xl:w-2/3 overflow-hidden">
        <img 
          src={post.featuredImage || "/placeholder-blog.jpg"} 
          alt={post.title} 
          className="w-full object-cover aspect-video group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="w-full md:w-2/5 xl:w-1/3">
        <div className="flex items-center gap-3 mb-4 font-semibold text-blue-600 dark:text-blue-400 text-sm uppercase tracking-wider">
          <span>{post.category.name}</span>
        </div>
        <h2 className="mb-4 font-bold text-slate-900 dark:group-hover:text-blue-400 dark:text-white group-hover:text-blue-600 text-3xl lg:text-4xl leading-tight">
          {post.title}
        </h2>
        {post.metaDescription && (
          <p className="mb-6 text-slate-600 dark:text-slate-400 text-lg">
            {post.metaDescription}
          </p>
        )}
        <div className="flex items-center gap-2 mb-6 font-medium text-slate-500 dark:text-slate-400 text-sm">
          <span className="font-semibold text-slate-700 dark:text-slate-300">{post.author.name}</span>
          <span>•</span>
          <time dateTime={post.publishedAt?.toString()}>
            {new Date(post.publishedAt!).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </time>
        </div>
        <span className="inline-flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
          Read article <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}