// File: NotFoundContent.tsx
// Route/Folder: src/components/client/error
// Purpose: Friendly 404 page routing lost users back to the homepage or main funnel.
// Imports: next/link, Home, ArrowRight from lucide-react
// Used in: src/app/not-found.tsx (or src/app/(public)/not-found.tsx)

import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

export default function NotFoundContent() {
  return (
    <section className="flex flex-1 justify-center items-center bg-white dark:bg-slate-950 px-6 py-32 transition-colors duration-200">
      <div className="max-w-xl text-center">
        <p className="mb-2 font-bold text-blue-600 dark:text-blue-500 text-sm uppercase tracking-wider">404 Error</p>
        <h1 className="mb-4 font-bold text-slate-900 dark:text-white text-4xl sm:text-5xl tracking-tight">
          Page not found
        </h1>
        <p className="mb-10 text-slate-600 dark:text-slate-400 text-lg">
          Sorry, we couldn't find the page you're looking for. It might have been moved or the URL might be incorrect.
        </p>
        
        <div className="flex sm:flex-row flex-col justify-center items-center gap-4">
          <Link
            href="/"
            className="inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-500 shadow-sm px-6 py-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 w-full sm:w-auto font-semibold text-white text-sm transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to homepage
          </Link>
          <Link
            href="/services"
            className="inline-flex justify-center items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-900 px-6 py-3 border border-slate-200 dark:border-slate-800 rounded-md w-full sm:w-auto font-semibold text-slate-900 dark:text-white text-sm transition-colors"
          >
            View our services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}