// File: page.tsx
// Folder: src/app/posts/[slug]
// Description: The heavily modularized, bulletproof single post view.

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPublicPostBySlug } from "@/modules/marketing/posts/public-posts.action";
import { renderTiptapHTML } from "@/modules/editor/utils/render-html";

// Extracted UI Components
import { PostSidebar } from "@/modules/marketing/posts/components/PostSidebar";
import { SidebarSkeleton } from "@/modules/marketing/posts/components/SidebarSkeleton";
import { SinglePostHeader } from "@/modules/marketing/posts/components/SinglePostHeader";
import { SinglePostHeroImage } from "@/modules/marketing/posts/components/SinglePostHeroImage";
import { SinglePostContent } from "@/modules/marketing/posts/components/SinglePostContent";

export default async function PublicSinglePostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  // 1. Fetch the main post
  const { post } = await getPublicPostBySlug(slug);

  if (!post) return notFound();

  // 2. Safely Extract Data & Parse HTML
  const categoryName = post.category?.name || "Uncategorized";
  const authorName = post.author?.name || "Editorial Team";
  
  let htmlContent = "";
  try {
    htmlContent = post.content ? renderTiptapHTML(post.content) : "";
  } catch (error) {
    console.error(`[HTML Render Error] Failed to parse content for post ${post.id}:`, error);
    htmlContent = "<p><em>We encountered an error loading this content.</em></p>";
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 max-w-7xl">
      <div className="items-start gap-12 lg:gap-16 grid grid-cols-1 lg:grid-cols-12">
        
        {/* Main Article Section */}
        <div className="lg:col-span-8 xl:col-span-9">
          <article>
            <SinglePostHeader 
              title={post.title}
              categoryName={categoryName}
              authorName={authorName}
              publishedAt={post.publishedAt}
              metaDescription={post.metaDescription}
            />

            <SinglePostHeroImage 
              src={post.featuredImage}
              altText={post.imageAltText}
              fallbackTitle={post.title}
            />

            <SinglePostContent htmlContent={htmlContent} />
          </article>
        </div>

        {/* Sidebar Section */}
        <div className="lg:top-24 lg:sticky lg:col-span-4 xl:col-span-3">
          <Suspense fallback={<SidebarSkeleton />}>
            <PostSidebar categoryId={post.categoryId || ""} currentPostId={post.id} />
          </Suspense>
        </div>
        
      </div>
    </div>
  );
}