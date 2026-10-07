"use client";

// File: CategoryModals.tsx
// Folder: src/app/admin/categories/components

import { useState, useEffect } from "react";
import { CategoryType } from "./types";

interface Props {
  modalType: "CREATE" | "EDIT" | "DELETE" | null;
  category: CategoryType | null;
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onSave: (data: { name: string; slug: string; description: string }) => void;
  onDelete: () => void;
}

export function CategoryModals({ modalType, category, loading, error, onClose, onSave, onDelete }: Props) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  // Auto-fill form when editing a specific category
  useEffect(() => {
    if (modalType === "EDIT" && category) {
      setName(category.name);
      setSlug(category.slug);
      setDescription(category.description || "");
    } else if (modalType === "CREATE") {
      setName("");
      setSlug("");
      setDescription("");
    }
  }, [category, modalType]);

  if (!modalType) return null;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 shadow-xl p-6 rounded-xl w-full max-w-md">
        
        {/* CREATE / EDIT FORM */}
        {(modalType === "CREATE" || modalType === "EDIT") && (
          <form onSubmit={(e) => { e.preventDefault(); onSave({ name, slug, description }); }}>
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
                  value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
                  className="bg-transparent px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full dark:text-white text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={onClose} className="hover:bg-slate-100 dark:hover:bg-slate-800 px-4 py-2 rounded-lg font-semibold text-slate-600 dark:text-slate-300 text-sm">Cancel</button>
              <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-4 py-2 rounded-lg font-semibold text-white text-sm">
                {loading ? "Saving..." : "Save Category"}
              </button>
            </div>
          </form>
        )}

        {/* DELETE CONFIRMATION */}
        {modalType === "DELETE" && category && (
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Delete Category</h3>
            <p className="mt-2 text-slate-500 text-sm">Are you sure you want to permanently delete <strong>{category.name}</strong>? This cannot be undone.</p>
            {error && <div className="bg-red-50 mt-3 p-3 rounded text-red-600 text-sm">{error}</div>}

            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={onClose} className="hover:bg-slate-100 dark:hover:bg-slate-800 px-4 py-2 rounded-lg font-semibold text-slate-600 dark:text-slate-300 text-sm">Cancel</button>
              <button onClick={onDelete} disabled={loading} className="bg-red-600 hover:bg-red-500 disabled:opacity-50 px-4 py-2 rounded-lg font-semibold text-white text-sm">
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}