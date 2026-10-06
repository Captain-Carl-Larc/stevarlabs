// File: layout.tsx
// Folder: src/app/admin
// Role: Admin Layout - Wraps CMS dashboard with sidebar and authentication boundary prep

import { BRAND } from "@/brand/brand.config";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Admin Sidebar */}
      <aside className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 border-r w-64">
        <div className="p-6 border-slate-200 dark:border-slate-800 border-b">
          <span className="font-bold text-blue-600 dark:text-blue-400 tracking-tight">
            {BRAND.shortName}
          </span>
          <span className="ml-2 font-medium text-slate-500 text-sm">Admin</span>
        </div>
        
        <nav className="flex flex-col space-y-1 p-4 font-medium text-sm">
          {/* Active Link State Example */}
          <div className="bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-md text-blue-700 dark:text-blue-400">
            Dashboard
          </div>
          {/* Inactive Link State Example */}
          <div className="hover:bg-slate-100 dark:hover:bg-slate-800 px-3 py-2 rounded-md text-slate-600 dark:hover:text-white dark:text-slate-400">
            Users
          </div>
        </nav>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 bg-slate-50/50 dark:bg-slate-900 p-8">
        <div className="mx-auto max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
}