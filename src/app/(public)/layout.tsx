// File: layout.tsx
// Route/Folder: src/app/(public)
// Purpose: Public Layout - Wraps all public-facing pages with the global Header and Footer,
//          and loads analytics only after cookie consent.

import Header from "@/components/client/Header";
import Footer from "@/components/client/Footer";
import AnalyticsConsent from "@/components/client/AnalyticsConsent";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/*
        The flex-1 ensures main content pushes the footer down
        even if the page content is short
      */}
      <main className="flex flex-col flex-1">{children}</main>

      <Footer />
      <AnalyticsConsent />
    </div>
  );
}