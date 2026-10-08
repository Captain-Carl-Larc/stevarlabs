// File: page.tsx
// Folder: src/app/posts/[slug]
// Description: The public single post view with an asynchronous streamed sidebar.

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPublicPostBySlug } from "@/modules/marketing/posts/public-posts.action";
import { renderTiptapHTML } from "@/modules/editor/utils/render-html";
import { PostSidebar } from "@/modules/marketing/posts/components/PostSidebar";

// Skeleton to show while the sidebar is loading in the background
function SidebarSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-slate-200 dark:bg-slate-800 mb-4 rounded w-32 h-6"></div>
      {[1, 2, 3].map(i => (
        <div key={i} className="flex flex-col gap-3">
          <div className="bg-slate-200 dark:bg-slate-800 rounded-xl w-full aspect-[16/9]"></div>
          <div className="bg-slate-200 dark:bg-slate-800 rounded w-3/4 h-4"></div>
          <div className="bg-slate-200 dark:bg-slate-800 rounded w-1/2 h-3"></div>
        </div>
      ))}
    </div>
  );
}

export default async function PublicSinglePostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // 1. Fetch the main post immediately
  const { post } = await getPublicPostBySlug(slug);

  if (!post) return notFound();

  const htmlContent = renderTiptapHTML(post.content);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 max-w-7xl">
      <div className="items-start gap-12 lg:gap-16 grid grid-cols-1 lg:grid-cols-12">
        
        {/* Main Article Section (Loads Instantly) */}
        <div className="lg:col-span-8 xl:col-span-9">
          <article>
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4 font-semibold text-blue-600 dark:text-blue-400 text-sm uppercase tracking-wider">
                <span>{post.category.name}</span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-slate-500">{new Date(post.publishedAt!).toLocaleDateString()}</span>
              </div>
              <h1 className="mb-6 font-extrabold text-slate-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                {post.title}
              </h1>
              {post.metaDescription && (
                <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl">
                  {post.metaDescription}
                </p>
              )}
            </header>

            {post.featuredImage && (
              <figure className="mb-12 rounded-2xl overflow-hidden">
                <img 
                  src={post.featuredImage} 
                  alt={post.imageAltText || post.title} 
                  className="w-full object-cover aspect-[21/9]"
                />
              </figure>
            )}

            <div 
              className="dark:prose-invert mx-auto prose-img:rounded-xl max-w-none prose-headings:font-bold prose-a:text-blue-600 prose prose-slate md:prose-lg"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </article>
        </div>

        {/* Sidebar Section (Streams in asynchronously) */}
        <div className="lg:top-24 lg:sticky lg:col-span-4 xl:col-span-3">
          <Suspense fallback={<SidebarSkeleton />}>
            <PostSidebar categoryId={post.categoryId} currentPostId={post.id} />
          </Suspense>
        </div>
        
      </div>
    </div>
  );
}