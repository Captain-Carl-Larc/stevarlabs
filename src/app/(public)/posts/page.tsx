// File: page.tsx
// Folder: src/app/posts
// Description: The main public blog index showing all published posts.

import Link from "next/link";
import { getAllPublicPosts } from "@/modules/marketing/posts/public-posts.action";
import { ArrowRight } from "lucide-react";

export default async function BlogIndexPage() {
  const { posts } = await getAllPublicPosts();

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center px-4 min-h-[50vh] text-center">
        <h1 className="font-bold text-slate-900 dark:text-white text-3xl">Our Blog</h1>
        <p className="mt-4 text-slate-500 dark:text-slate-400">Check back soon for new articles and insights.</p>
      </div>
    );
  }

  // Separate the newest post for the "Hero" section, and the rest for the grid
  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 max-w-7xl">
      
      {/* Page Header */}
      <div className="mb-12 md:mb-20 md:text-left text-center">
        <h1 className="font-extrabold text-slate-900 dark:text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight">
          Latest Insights
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400 text-lg">
          Thoughts, tutorials, and updates on web development, design, and digital strategy.
        </p>
      </div>

      {/* Featured Post (Hero) */}
      <Link href={`/posts/${featuredPost.slug}`} className="group flex md:flex-row flex-col items-center gap-8 lg:gap-12 mb-16 md:mb-24">
        <div className="border border-slate-100 dark:border-slate-800 rounded-2xl w-full md:w-3/5 xl:w-2/3 overflow-hidden">
          <img 
            src={featuredPost.featuredImage || "/placeholder-blog.jpg"} 
            alt={featuredPost.title} 
            className="w-full object-cover aspect-video group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="w-full md:w-2/5 xl:w-1/3">
          <div className="flex items-center gap-3 mb-4 font-semibold text-blue-600 dark:text-blue-400 text-sm uppercase tracking-wider">
            <span>{featuredPost.category.name}</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-slate-500 dark:text-slate-400">
              {new Date(featuredPost.publishedAt!).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h2 className="mb-4 font-bold text-slate-900 dark:group-hover:text-blue-400 dark:text-white group-hover:text-blue-600 text-3xl lg:text-4xl leading-tight">
            {featuredPost.title}
          </h2>
          {featuredPost.metaDescription && (
            <p className="mb-6 text-slate-600 dark:text-slate-400 text-lg">
              {featuredPost.metaDescription}
            </p>
          )}
          <span className="inline-flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
            Read article <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>

      {/* Grid Posts */}
      {gridPosts.length > 0 && (
        <div className="gap-x-8 gap-y-12 lg:gap-y-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {gridPosts.map((post) => (
            <Link key={post.id} href={`/posts/${post.slug}`} className="group flex flex-col">
              <div className="mb-5 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
                <img 
                  src={post.featuredImage || "/placeholder-blog.jpg"} 
                  alt={post.title} 
                  className="w-full object-cover aspect-[16/10] group-hover:scale-105 transition-transform duration-500"
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
              <div className="flex items-center gap-2 mt-auto font-medium text-slate-500 dark:text-slate-400 text-sm">
                <span>{post.author.name}</span>
                <span>•</span>
                <time dateTime={post.publishedAt?.toString()}>
                  {new Date(post.publishedAt!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </time>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}