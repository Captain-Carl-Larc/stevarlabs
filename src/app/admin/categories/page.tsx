// File: page.tsx
// Folder: src/app/admin/categories
// Description: Server Component that fetches categories and renders the Category Management page.

import { getCategoriesAction } from "@/modules/categories/category.actions";
import { CategoryTable } from "@/modules/categories/components/CategoryTable";

export default async function CategoriesPage() {
  const { categories, error } = await getCategoriesAction();

  if (error || !categories) {
    return (
      <div className="p-6 text-red-500">
        <p>Error: {error || "Failed to load categories."}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4 md:p-6 max-w-6xl">
      <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="font-bold text-slate-900 dark:text-white text-2xl">Categories</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400 text-sm">
            Manage the content architecture and URL slugs for your posts.
          </p>
        </div>
      </div>

      <CategoryTable initialCategories={categories} />
    </div>
  );
}