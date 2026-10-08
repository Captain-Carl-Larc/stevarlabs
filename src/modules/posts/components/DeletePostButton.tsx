"use client";

// File: DeletePostButton.tsx
// Folder: src/app/admin/posts/components

import { useState } from "react";
import { deletePostAction } from "@/modules/posts";
import { Trash2 } from "lucide-react";

export function DeletePostButton({ id, title }: { id: string; title: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    const res = await deletePostAction(id);
    
    if (res?.error) {
      alert(res.error);
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 p-1.5 rounded-md text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
      title="Delete Post"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}