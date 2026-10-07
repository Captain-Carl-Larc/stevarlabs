// File: layout.tsx
// Folder: src/app/admin
// Description: Next.js layout file that wraps all admin routes in the interactive DashboardShell component.
// Imports: DashboardShell from "@/modules/dashboard/components/dashboard-shell"
// Exports: Default AdminLayout component

import { DashboardShell } from "@/modules/dashboard/components/dashboard-shell";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell>
      {children}
    </DashboardShell>
  );
}