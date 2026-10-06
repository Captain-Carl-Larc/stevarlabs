// File: page.tsx
// Folder: src/app/(public)
// Role: Public Landing Page

import { BRAND } from "@/brand/brand.config";

export default function HomePage() {
  return (
    <div className="mx-auto px-6 py-24 max-w-7xl text-center">
      <h1 className="font-extrabold text-slate-900 dark:text-white text-4xl sm:text-5xl tracking-tight">
        Welcome to {BRAND.name}
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400 text-lg">
        Your high-performance, SEO-first content management system.
      </p>
    </div>
  );
}