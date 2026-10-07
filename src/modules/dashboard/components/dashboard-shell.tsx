"use client";

// File: dashboard-shell.tsx
// Folder: src/modules/dashboard/components

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

type UserProps = {
  name: string | null;
  email: string | null;
  role: string;
};

export function DashboardShell({ children, user }: { children: React.ReactNode, user: UserProps }) {
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
          user={user} // <-- Pass the user data here
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