// File: page.tsx
// Folder: src/app/admin/posts
// Description: Placeholder page for creating, editing, and managing blog posts.
// Imports: None
// Exports: Default PostsPage component

export default function PostsPage() {
  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-slate-900 dark:text-white text-2xl">Posts</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Manage your articles and published content.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-semibold text-white text-sm transition">
          Create Post
        </button>
      </div>

      <div className="flex justify-center items-center bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 border-dashed rounded-xl min-h-[400px]">
        <p className="text-slate-500 dark:text-slate-400 text-sm">No posts created yet.</p>
      </div>
    </div>
  );
}