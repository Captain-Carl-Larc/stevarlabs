"use client";

// File: Pagination.tsx
// Folder: src/components/ui
// Description: Reusable pagination controls that update URL search parameters.

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  if (totalPages <= 1) return null;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-between items-center bg-white dark:bg-slate-950 px-4 sm:px-6 py-3 border-slate-200 dark:border-slate-800 border-t rounded-b-xl">
      <div className="hidden sm:block">
        <p className="text-slate-700 dark:text-slate-300 text-sm">
          Page <span className="font-semibold">{currentPage}</span> of{" "}
          <span className="font-semibold">{totalPages}</span>
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end gap-2">
        <button
          onClick={() => router.push(createPageURL(currentPage - 1))}
          disabled={currentPage <= 1}
          className="inline-flex relative items-center bg-white hover:bg-slate-50 disabled:hover:bg-white dark:bg-slate-900 dark:hover:bg-slate-800 disabled:opacity-50 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md font-semibold text-slate-900 dark:text-white text-sm"
        >
          <ChevronLeft className="mr-1 w-4 h-4" /> Previous
        </button>
        <button
          onClick={() => router.push(createPageURL(currentPage + 1))}
          disabled={currentPage >= totalPages}
          className="inline-flex relative items-center bg-white hover:bg-slate-50 disabled:hover:bg-white dark:bg-slate-900 dark:hover:bg-slate-800 disabled:opacity-50 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md font-semibold text-slate-900 dark:text-white text-sm"
        >
          Next <ChevronRight className="ml-1 w-4 h-4" />
        </button>
      </div>
    </div>
  );
}