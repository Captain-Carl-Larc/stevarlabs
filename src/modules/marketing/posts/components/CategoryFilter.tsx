// File: CategoryFilter.tsx
// Folder: src/modules/marketing/posts/components

import Link from "next/link";

type Category = { name: string; slug: string };

export function CategoryFilter({ 
  categories, 
  currentCategory 
}: { 
  categories: Category[]; 
  currentCategory?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-12">
      <Link
        href="/posts"
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          !currentCategory
            ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        }`}
      >
        All Posts
      </Link>
      
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/posts?category=${cat.slug}`}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            currentCategory === cat.slug
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}