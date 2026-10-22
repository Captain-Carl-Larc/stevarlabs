import type { Metadata } from "next";
import CookieContent from "@/components/client/legal/CookieContent";

export const metadata: Metadata = {
  title: "Cookie Policy | Stevarlabs",
  description: "Cookie policy detailing how Stevarlabs uses cookies to improve your experience.",
};

export default function CookiePolicyPage() {
  return <CookieContent />;
}