// File: page.tsx
// Folder: src/app/posts
// Description: The refactored public blog index with filtering and pagination.

import { getAllPublicPosts, getPublicCategories } from "@/modules/marketing/posts/public-posts.action";
import { Pagination } from "@/components/ui/Pagination";
import { CategoryFilter } from "@/modules/marketing/posts/components/CategoryFilter";
import { FeaturedPost } from "@/modules/marketing/posts/components/FeaturedPost";
import { PostCard } from "@/modules/marketing/posts/components/PostCard";

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams?.page) || 1;
  const categorySlug = resolvedParams?.category;
  const limit = 10;

  // Fetch data in parallel for maximum speed
  const [postsRes, categoriesRes] = await Promise.all([
    getAllPublicPosts(currentPage, limit, categorySlug),
    getPublicCategories()
  ]);

  const { posts, metadata } = postsRes;
  const { categories } = categoriesRes;

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 max-w-7xl">
      
      <div className="mb-12 md:mb-16 md:text-left text-center">
        <h1 className="font-extrabold text-slate-900 dark:text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight">
          Latest Insights
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400 text-lg">
          Thoughts, tutorials, and updates on web development, design, and digital strategy.
        </p>
      </div>

      <CategoryFilter categories={categories} currentCategory={categorySlug} />

      {!posts || posts.length === 0 ? (
        <div className="flex flex-col justify-center items-center border border-slate-300 dark:border-slate-800 border-dashed rounded-2xl min-h-[30vh]">
          <p className="text-slate-500 dark:text-slate-400">No articles found for this category.</p>
        </div>
      ) : (
        <>
          {/* Only show the Hero post if we are on the first page */}
          {currentPage === 1 && posts[0] && (
            <FeaturedPost post={posts[0]} />
          )}

          {/* Render the Grid */}
          <div className="gap-x-8 gap-y-12 lg:gap-y-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {(currentPage === 1 ? posts.slice(1) : posts).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination UI */}
          {metadata && metadata.totalPages > 1 && (
            <div className="mt-16 pt-8 border-slate-200 dark:border-slate-800 border-t">
              <Pagination totalPages={metadata.totalPages} currentPage={metadata.page} />
            </div>
          )}
        </>
      )}
    </div>
  );
}