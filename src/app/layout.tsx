// File: layout.tsx
// Route/Folder: src/app
// Purpose: Root HTML structure, global font loading, theming, and UK localization.
// Imports: next/font/google (Geist), BRAND config, global CSS
// Used in: Next.js root entry point (applies to all routes)

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BRAND } from "@/brand/brand.config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${BRAND.name}`,
    default: "Dental Marketing Agency for UK Practices | Stevarlabs",
  },
  description: "Stevarlabs helps UK dental practices win more new-patient enquiries and keep existing patients. Local SEO, websites, social media and recall. Free audit.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Spec Rule: UK English everywhere
    <html lang="en-GB" className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
      <body className="flex flex-col bg-slate-50 dark:bg-slate-950 min-h-full text-slate-900 dark:text-slate-100 transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}