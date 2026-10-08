// File: page.tsx
// Folder: src/app/admin/posts/[id]/preview
// Description: Admin preview page rendering the post exactly as the public frontend will.

import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostByIdAction } from "@/modules/posts";
import { renderTiptapHTML } from "@/modules/editor/utils/render-html";
import { ArrowLeft, Edit } from "lucide-react";

export default async function PostPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { post, error } = await getPostByIdAction(id);

  if (error || !post) return notFound();

  // Convert the stored JSON directly to an HTML string
  const htmlContent = renderTiptapHTML(post.content);

  return (
    <div className="mx-auto p-4 md:p-6 lg:py-10 max-w-4xl">
      
      {/* Admin Control Bar */}
      <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 mb-10 p-4 border border-slate-200 dark:border-slate-800 rounded-xl">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/posts"
            className="flex items-center gap-2 font-medium text-slate-600 hover:text-slate-900 dark:hover:text-white dark:text-slate-400 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Posts
          </Link>
          <span className="bg-slate-300 dark:bg-slate-700 w-px h-4"></span>
          <span className="font-medium text-slate-500 text-sm">
            Status: <strong className={post.status === "PUBLISHED" ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}>{post.status}</strong>
          </span>
        </div>
        <Link 
          href={`/admin/posts/${post.id}/edit`}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 shadow-sm px-4 py-2 rounded-lg font-semibold text-white text-sm"
        >
          <Edit className="w-4 h-4" /> Edit Post
        </Link>
      </div>

      {/* The Actual Rendered Post (Mimicking the Marketing UI) */}
      <article className="bg-white dark:bg-slate-950 shadow-sm p-6 md:p-10 lg:p-12 border border-slate-200 dark:border-slate-800 rounded-2xl">
        
        {/* Post Header */}
        <header className="mb-10 text-center">
          <div className="mb-4 font-semibold text-blue-600 dark:text-blue-400 text-sm uppercase tracking-wider">
            {post.category.name}
          </div>
          <h1 className="mb-6 font-extrabold text-slate-900 dark:text-white text-3xl sm:text-4xl md:text-5xl tracking-tight">
            {post.title}
          </h1>
          {post.metaDescription && (
            <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400 text-lg">
              {post.metaDescription}
            </p>
          )}
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <figure className="mb-12 rounded-xl overflow-hidden">
            <img 
              src={post.featuredImage} 
              alt={post.imageAltText || post.title} 
              className="w-full object-cover aspect-video"
            />
          </figure>
        )}

        {/* Rich Text Body */}
        {/* We use dangerouslySetInnerHTML because we strictly control the Tiptap HTML generation on the server */}
        <div 
          className="dark:prose-invert mx-auto prose-img:rounded-xl max-w-none prose-headings:font-bold prose-a:text-blue-600 prose prose-slate md:prose-lg"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
        
      </article>
    </div>
  );
}