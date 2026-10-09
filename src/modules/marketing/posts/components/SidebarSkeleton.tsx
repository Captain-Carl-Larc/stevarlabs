// File: SidebarSkeleton.tsx
// Folder: src/modules/marketing/posts/components

export function SidebarSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-slate-200 dark:bg-slate-800 mb-4 rounded w-32 h-6"></div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col gap-3">
          <div className="bg-slate-200 dark:bg-slate-800 rounded-xl w-full aspect-[16/9]"></div>
          <div className="bg-slate-200 dark:bg-slate-800 rounded w-3/4 h-4"></div>
          <div className="bg-slate-200 dark:bg-slate-800 rounded w-1/2 h-3"></div>
        </div>
      ))}
    </div>
  );
}