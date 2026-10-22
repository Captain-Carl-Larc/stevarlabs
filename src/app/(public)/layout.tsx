// File: layout.tsx
// Route/Folder: src/app/(public)
// Purpose: Public Layout - Wraps all public-facing pages with the global Header and Footer.
// Imports: Header, Footer components
// Used in: Wraps all routes inside (public)

import Header from "@/components/client/Header";
import Footer from "@/components/client/Footer";

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
      <main className="flex flex-col flex-1">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}