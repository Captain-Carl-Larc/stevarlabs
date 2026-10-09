// File: DashboardMetricsGrid.tsx
// Folder: src/modules/dashboard/components

import Link from "next/link";
import { FileText, FolderTree, Users, ArrowRight } from "lucide-react";

interface MetricsProps {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalCategories: number;
  totalUsers: number;
}

export function DashboardMetricsGrid({
  totalPosts,
  publishedPosts,
  draftPosts,
  totalCategories,
  totalUsers,
}: MetricsProps) {
  return (
    <div className="gap-4 sm:gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      
      {/* Total Posts Card */}
      <div className="bg-white dark:bg-slate-950 shadow-sm p-5 sm:p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-slate-500 dark:text-slate-400 text-xs sm:text-sm">Total Posts</p>
            <h3 className="mt-2 font-bold text-slate-900 dark:text-white text-2xl sm:text-3xl">{totalPosts}</h3>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/50 p-3 rounded-xl text-blue-600 dark:text-blue-400">
            <FileText className="w-5 sm:w-6 h-5 sm:h-6" />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-4 text-slate-500 dark:text-slate-400 text-xs">
          <span className="font-semibold text-green-600 dark:text-green-400">{publishedPosts} Published</span>
          <span>•</span>
          <span className="font-semibold text-amber-600 dark:text-amber-400">{draftPosts} Drafts</span>
        </div>
      </div>

      {/* Categories Card */}
      <div className="flex flex-col justify-between bg-white dark:bg-slate-950 shadow-sm p-5 sm:p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
        <div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-slate-500 dark:text-slate-400 text-xs sm:text-sm">Categories</p>
              <h3 className="mt-2 font-bold text-slate-900 dark:text-white text-2xl sm:text-3xl">{totalCategories}</h3>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-950/50 p-3 rounded-xl text-indigo-600 dark:text-indigo-400">
              <FolderTree className="w-5 sm:w-6 h-5 sm:h-6" />
            </div>
          </div>
        </div>
        <div className="mt-4 pt-2">
          <Link href="/admin/categories" className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 text-xs">
            Manage taxonomy <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Team Users Card */}
      <div className="flex flex-col justify-between bg-white dark:bg-slate-950 shadow-sm p-5 sm:p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
        <div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-slate-500 dark:text-slate-400 text-xs sm:text-sm">Team Members</p>
              <h3 className="mt-2 font-bold text-slate-900 dark:text-white text-2xl sm:text-3xl">{totalUsers}</h3>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/50 p-3 rounded-xl text-emerald-600 dark:text-emerald-400">
              <Users className="w-5 sm:w-6 h-5 sm:h-6" />
            </div>
          </div>
        </div>
        <div className="mt-4 pt-2">
          <Link href="/admin/users" className="inline-flex items-center gap-1 font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 text-xs">
            Manage users & invites <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Quick Status Card */}
      <div className="flex flex-col justify-between bg-white dark:bg-slate-950 shadow-sm p-5 sm:p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
        <div>
          <p className="font-medium text-slate-500 dark:text-slate-400 text-xs sm:text-sm">System Status</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="relative flex w-3 h-3">
              <span className="inline-flex absolute bg-green-400 opacity-75 rounded-full w-full h-full animate-ping"></span>
              <span className="inline-flex relative bg-green-500 rounded-full w-3 h-3"></span>
            </span>
            <span className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">All Systems Operational</span>
          </div>
        </div>
        <p className="pt-4 text-[11px] text-slate-400">Database & Auth connected</p>
      </div>

    </div>
  );
}