"use client";

// File: CategoryTable.tsx
// Folder: src/app/admin/categories/components
// Description: Interactive client table for displaying, creating, editing, and deleting categories.

import { useState } from "react";
import { 
  createCategoryAction, 
  updateCategoryAction, 
  deleteCategoryAction 
} from "@/modules/categories/category.actions";

type CategoryType = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  _count: { posts: number };
};

export function CategoryTable({ initialCategories }: { initialCategories: CategoryType[] }) {
  const [selectedCat, setSelectedCat] = useState<CategoryType | null>(null);
  const [modalType, setModalType] = useState<"CREATE" | "EDIT" | "DELETE" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const openCreate = () => {
    setName(""); setSlug(""); setDescription("");
    setModalType("CREATE"); setError(null);
  };

  const openEdit = (cat: CategoryType) => {
    setSelectedCat(cat);
    setName(cat.name); setSlug(cat.slug); setDescription(cat.description || "");
    setModalType("EDIT"); setError(null);
  };

  const openDelete = (cat: CategoryType) => {
    setSelectedCat(cat);
    setModalType("DELETE"); setError(null);
  };

  const closeModal = () => {
    setSelectedCat(null); setModalType(null); setError(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);

    const payload = { name, slug, description };
    let res;

    if (modalType === "CREATE") {
      res = await createCategoryAction(payload);
    } else if (modalType === "EDIT" && selectedCat) {
      res = await updateCategoryAction(selectedCat.id, payload);
    }

    if (res?.error) setError(res.error);
    else closeModal();
    
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!selectedCat) return;
    setLoading(true); setError(null);

    const res = await deleteCategoryAction(selectedCat.id);
    if (res.error) setError(res.error);
    else closeModal();
    
    setLoading(false);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <button 
          onClick={openCreate}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-semibold text-white text-sm"
        >
          + Add Category
        </button>
      </div>

      <div className="bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl">
        
        {/* MOBILE VIEW */}
        <div className="md:hidden grid grid-cols-1 divide-y divide-slate-100 dark:divide-slate-800">
          {initialCategories.map((cat) => (
            <div key={cat.id} className="space-y-3 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{cat.name}</p>
                  <p className="text-slate-500 text-xs">/{cat.slug}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(cat)} className="text-blue-600 text-sm hover:underline">Edit</button>
                  {cat._count.posts === 0 ? (
                    <button onClick={() => openDelete(cat)} className="text-red-600 text-sm hover:underline">Delete</button>
                  ) : (
                    <span className="text-slate-400 text-sm cursor-not-allowed" title="Cannot delete: has posts">Delete</span>
                  )}
                </div>
              </div>
              <div className="font-semibold text-slate-500 dark:text-slate-400 text-xs">
                {cat._count.posts} {cat._count.posts === 1 ? 'Post' : 'Posts'}
              </div>
            </div>
          ))}
          {initialCategories.length === 0 && (
            <div className="p-6 text-slate-500 text-sm text-center">No categories found.</div>
          )}
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-slate-600 dark:text-slate-400 text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 border-b font-semibold text-slate-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Posts</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {initialCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{cat.name}</td>
                  <td className="px-6 py-4">/{cat.slug}</td>
                  <td className="px-6 py-4 max-w-xs truncate">{cat.description || "—"}</td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full font-medium text-slate-600 dark:text-slate-300 text-xs">
                      {cat._count.posts}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => openEdit(cat)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                      {cat._count.posts === 0 ? (
                        <button onClick={() => openDelete(cat)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                      ) : (
                        <span className="font-medium text-slate-400 cursor-not-allowed" title="Cannot delete category with active posts">Delete</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {initialCategories.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-slate-500 text-center">No categories created yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALS */}
      {modalType && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 shadow-xl p-6 rounded-xl w-full max-w-md">
            
            {(modalType === "CREATE" || modalType === "EDIT") && (
              <form onSubmit={handleSave}>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                  {modalType === "CREATE" ? "Add Category" : "Edit Category"}
                </h3>
                {error && <div className="bg-red-50 mt-3 p-3 rounded text-red-600 text-sm">{error}</div>}
                
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">Name</label>
                    <input 
                      type="text" required value={name} onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Technology"
                      className="bg-transparent px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full dark:text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">
                      Slug <span className="font-normal text-slate-400">(Auto-generated if empty)</span>
                    </label>
                    <input 
                      type="text" value={slug} onChange={(e) => setSlug(e.target.value)}
                      placeholder="e.g. technology"
                      className="bg-transparent px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full dark:text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">Description (Optional)</label>
                    <textarea 
                      value={description} onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="bg-transparent px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full dark:text-white text-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={closeModal} className="hover:bg-slate-100 dark:hover:bg-slate-800 px-4 py-2 rounded-lg font-semibold text-slate-600 dark:text-slate-300 text-sm">Cancel</button>
                  <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-4 py-2 rounded-lg font-semibold text-white text-sm">
                    {loading ? "Saving..." : "Save Category"}
                  </button>
                </div>
              </form>
            )}

            {modalType === "DELETE" && selectedCat && (
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Delete Category</h3>
                <p className="mt-2 text-slate-500 text-sm">Are you sure you want to permanently delete <strong>{selectedCat.name}</strong>? This cannot be undone.</p>
                {error && <div className="bg-red-50 mt-3 p-3 rounded text-red-600 text-sm">{error}</div>}

                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={closeModal} className="hover:bg-slate-100 dark:hover:bg-slate-800 px-4 py-2 rounded-lg font-semibold text-slate-600 dark:text-slate-300 text-sm">Cancel</button>
                  <button onClick={handleDelete} disabled={loading} className="bg-red-600 hover:bg-red-500 disabled:opacity-50 px-4 py-2 rounded-lg font-semibold text-white text-sm">
                    {loading ? "Deleting..." : "Yes, Delete"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}