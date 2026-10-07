"use client";

// File: header.tsx
// Folder: src/modules/dashboard/components
// Description: Top navigation bar containing mobile menu toggle, desktop sidebar collapse toggle, and user profile actions.

import { Menu, PanelLeftClose, PanelLeftOpen, UserCircle } from "lucide-react";

interface HeaderProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  setMobileOpen: (open: boolean) => void;
}

export function Header({ isCollapsed, setIsCollapsed, setMobileOpen }: HeaderProps) {
  return (
    <header className="flex flex-shrink-0 justify-between items-center bg-white dark:bg-slate-950 px-4 border-slate-200 dark:border-slate-800 border-b h-16">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 dark:text-slate-400"
        >
          <Menu className="w-6 h-6" />
        </button>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:block text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 dark:text-slate-400"
        >
          {isCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300 text-sm">
          <UserCircle className="w-8 h-8 text-slate-400" />
          <span className="hidden sm:block">Admin</span>
        </button>
      </div>
    </header>
  );
}