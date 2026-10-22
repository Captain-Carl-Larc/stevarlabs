import type { Metadata } from "next";
import TermsContent from "@/components/client/legal/TermsContent";

export const metadata: Metadata = {
  title: "Website Terms of Use | Stevarlabs",
  description: "Terms of use and legal disclaimers for the Stevarlabs website.",
};

export default function TermsPage() {
  return <TermsContent />;
}