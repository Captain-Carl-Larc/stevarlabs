import type { Metadata } from "next";
import CookieContent from "@/components/client/legal/CookieContent";

export const metadata: Metadata = {
  title: "Cookie Policy | Stevarlabs",
  description: "Stevarlabs does not currently use cookies or similar tracking technologies on this website.",
};

export default function CookiePolicyPage() {
  return <CookieContent />;
}