// File: DashboardWelcomeBanner.tsx
// Folder: src/modules/dashboard/components

import Link from "next/link";
import { Plus } from "lucide-react";

export function DashboardWelcomeBanner({ userName }: { userName?: string | null }) {
  return (
    <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md p-5 sm:p-6 rounded-2xl text-white">
      <div>
        <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl tracking-tight">
          Welcome back, {userName || "Admin"} 👋
        </h1>
        <p className="mt-1 text-blue-100 text-xs sm:text-sm">
          Here is what is happening across your platform today.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/admin/posts/create"
          className="inline-flex justify-center items-center gap-2 bg-white hover:bg-blue-50 shadow-sm px-4 py-2.5 rounded-lg w-full sm:w-auto font-semibold text-blue-600 text-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>
    </div>
  );
}