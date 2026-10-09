// File: page.tsx
// Folder: src/app/admin
// Description: Admin dashboard page assembling modular components.

import { getDashboardMetrics } from "@/modules/dashboard/dashboard.action";
import { DashboardWelcomeBanner } from "@/modules/dashboard/components/DashboardWelcomeBanner";
import { DashboardMetricsGrid } from "@/modules/dashboard/components/DashboardMetricsGrid";
import { RecentPostsTable } from "@/modules/dashboard/components/RecentPostsTable";

export default async function AdminDashboardPage() {
  const { data, error } = await getDashboardMetrics();

  if (error || !data) {
    return (
      <div className="p-6 text-red-600 dark:text-red-400">
        <p>Error: {error || "Failed to load dashboard metrics."}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 mx-auto p-4 sm:p-6 max-w-7xl">
      <DashboardWelcomeBanner userName={data.userName} />
      
      <DashboardMetricsGrid 
        totalPosts={data.totalPosts}
        publishedPosts={data.publishedPosts}
        draftPosts={data.draftPosts}
        totalCategories={data.totalCategories}
        totalUsers={data.totalUsers}
      />

      <RecentPostsTable posts={data.recentPosts} />
    </div>
  );
}