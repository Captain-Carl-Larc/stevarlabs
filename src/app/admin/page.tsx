// File: page.tsx
// Folder: src/app/admin
// Description: Main dashboard overview page displaying high-level system metrics.
// Imports: None
// Exports: Default AdminDashboardPage component

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="font-bold text-slate-900 dark:text-white text-2xl">Dashboard Overview</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Welcome back. Here is what is happening today.</p>
      </div>

      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder Stat Cards */}
        {[
          { label: "Total Posts", value: "0" },
          { label: "Active Categories", value: "0" },
          { label: "Total Users", value: "1" },
          { label: "System Status", value: "Healthy" },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-950 shadow-sm p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">{stat.label}</h3>
            <p className="mt-2 font-bold text-slate-900 dark:text-white text-3xl">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}