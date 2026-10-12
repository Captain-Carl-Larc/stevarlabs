// File: loading.tsx
// Folder: src/app/admin
// Description: Automatically displayed by Next.js while Neon DB is waking up or queries are running.

import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex flex-col justify-center items-center space-y-4 px-4 w-full min-h-[60vh] text-center">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-full">
        <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
      </div>
      <h2 className="font-bold text-slate-900 dark:text-white text-xl">
        Getting things ready...
      </h2>
      <p className="max-w-sm text-slate-500 dark:text-slate-400 text-sm">
        We are securely connecting to your workspace. This usually takes just a moment.
      </p>
    </div>
  );
}