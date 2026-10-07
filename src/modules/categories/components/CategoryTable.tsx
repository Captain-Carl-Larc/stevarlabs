"use client";

// File: CategoryTable.tsx
// Folder: src/app/admin/categories/components
// Description: Master layout wrapper that coordinates state between the Mobile View, Desktop View, and Modals.

import { useState } from "react";
import { createCategoryAction } from "@/modules/categories/create-category.action";
import { updateCategoryAction } from "@/modules/categories/update-category.action";
import { deleteCategoryAction } from "@/modules/categories/delete-category.action";
import { CategoryType } from "./types";
import { CategoryMobile } from "./CategoryMobile";
import { CategoryDesktop } from "./CategoryDesktop";
import { CategoryModals } from "./CategoryModals";

export function CategoryTable({ initialCategories }: { initialCategories: CategoryType[] }) {
  const [selectedCat, setSelectedCat] = useState<CategoryType | null>(null);
  const [modalType, setModalType] = useState<"CREATE" | "EDIT" | "DELETE" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openCreate = () => { setModalType("CREATE"); setError(null); };
  const openEdit = (cat: CategoryType) => { setSelectedCat(cat); setModalType("EDIT"); setError(null); };
  const openDelete = (cat: CategoryType) => { setSelectedCat(cat); setModalType("DELETE"); setError(null); };
  const closeModal = () => { setSelectedCat(null); setModalType(null); setError(null); };

  const handleSave = async (data: { name: string; slug: string; description: string }) => {
    setLoading(true); setError(null);
    const res = modalType === "CREATE" 
      ? await createCategoryAction(data)
      : await updateCategoryAction(selectedCat!.id, data);

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
        <CategoryMobile categories={initialCategories} onEdit={openEdit} onDelete={openDelete} />
        <CategoryDesktop categories={initialCategories} onEdit={openEdit} onDelete={openDelete} />
      </div>

      <CategoryModals 
        modalType={modalType}
        category={selectedCat}
        loading={loading}
        error={error}
        onClose={closeModal}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </>
  );
}