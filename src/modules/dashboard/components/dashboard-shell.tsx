"use client";

// File: dashboard-shell.tsx
// Folder: src/modules/dashboard/components
// Description: Master layout wrapper that coordinates state between the Header and Sidebar, providing the main content area.

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex bg-slate-50 dark:bg-slate-900 w-full h-screen overflow-hidden">
      <Sidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        setMobileOpen={setIsMobileOpen}
      />

      <div className="flex flex-col flex-1 min-w-0">
        <Header
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          setMobileOpen={setIsMobileOpen}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
