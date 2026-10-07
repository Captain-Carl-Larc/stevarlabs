// File: types.ts
// Folder: src/app/admin/categories/components

export type CategoryType = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  _count: { posts: number };
};