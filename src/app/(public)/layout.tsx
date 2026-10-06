// File: layout.tsx
// Folder: src/app/(public)
// Role: Public Layout - Wraps front-facing pages with public navigation and footer

import { BRAND } from "@/brand/brand.config";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white dark:bg-slate-950 px-6 py-4 border-slate-200 dark:border-slate-800 border-b">
        <nav className="mx-auto max-w-7xl font-semibold tracking-tight">
          {BRAND.name}
        </nav>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-slate-50 dark:bg-slate-900/50 px-6 py-8 border-slate-200 dark:border-slate-800 border-t text-slate-500 dark:text-slate-400 text-sm text-center">
        © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
      </footer>
    </div>
  );
}