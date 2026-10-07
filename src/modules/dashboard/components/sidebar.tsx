"use client";

// File: sidebar.tsx
// Folder: src/modules/dashboard/components
// Description: Handles the main navigation sidebar, including desktop collapsing and mobile flyout behavior.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Tags, 
  Settings, 
  LogOut, 
  X
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function Sidebar({ isCollapsed, isMobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Posts", href: "/admin/posts", icon: FileText },
    { name: "Categories", href: "/admin/categories", icon: Tags },
    { name: "Users", href: "/admin/users", icon: Users },
  ];

  const bottomLinks = [
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const NavItem = ({ link }: { link: any }) => {
    const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
    const Icon = link.icon;

    return (
      <Link
        href={link.href}
        onClick={() => setMobileOpen(false)}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
          isActive 
            ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
        }`}
      >
        <Icon className="flex-shrink-0 w-5 h-5" />
        <span className={`text-sm font-medium ${isCollapsed ? "hidden md:hidden" : "block"}`}>
          {link.name}
        </span>
      </Link>
    );
  };

  return (
    <>
      {isMobileOpen && (
        <div 
          className="md:hidden z-40 fixed inset-0 bg-slate-900/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-slate-950 md:static ${
          isCollapsed ? "w-20" : "w-64"
        } ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex justify-between items-center px-4 border-slate-200 dark:border-slate-800 border-b h-16">
          <Link href="/admin" className="flex items-center gap-2 overflow-hidden">
            <div className="flex flex-shrink-0 justify-center items-center bg-blue-600 rounded-lg w-8 h-8 font-bold text-white">
              C
            </div>
            <span className={`whitespace-nowrap text-lg font-bold text-slate-900 dark:text-white ${isCollapsed ? "hidden md:hidden" : "block"}`}>
              CyLoad
            </span>
          </Link>
          <button onClick={() => setMobileOpen(false)} className="md:hidden text-slate-500 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-3 overflow-y-auto scrollbar-hide">
          {navLinks.map((link) => (
            <NavItem key={link.name} link={link} />
          ))}
        </nav>

        <div className="space-y-1 p-3 border-slate-200 dark:border-slate-800 border-t">
          {bottomLinks.map((link) => (
            <NavItem key={link.name} link={link} />
          ))}
          <button className="flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-lg w-full text-red-600 dark:text-red-400 transition-all">
            <LogOut className="flex-shrink-0 w-5 h-5" />
            <span className={`text-sm font-medium ${isCollapsed ? "hidden md:hidden" : "block"}`}>
              Log Out
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}