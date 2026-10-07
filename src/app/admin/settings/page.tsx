// File: page.tsx
// Folder: src/app/admin/settings
// Description: Placeholder page for system-wide configuration and site metadata.
// Imports: None
// Exports: Default SettingsPage component

export default function SettingsPage() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="font-bold text-slate-900 dark:text-white text-2xl">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Configure your global application preferences.</p>
      </div>

      <div className="bg-white dark:bg-slate-950 shadow-sm p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
        <h2 className="mb-4 font-semibold text-slate-900 dark:text-white text-lg">General Settings</h2>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">Site Name</label>
            <input 
              type="text" 
              disabled 
              placeholder="CyLoad CMS" 
              className="bg-slate-50 dark:bg-slate-900 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full text-slate-500 text-sm" 
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300 text-sm">Contact Email</label>
            <input 
              type="email" 
              disabled 
              placeholder="admin@example.com" 
              className="bg-slate-50 dark:bg-slate-900 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg w-full text-slate-500 text-sm" 
            />
          </div>
          <button disabled className="bg-blue-600 opacity-50 mt-2 px-4 py-2 rounded-lg font-semibold text-white text-sm">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}