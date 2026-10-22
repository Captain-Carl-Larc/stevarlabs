import type { Metadata } from "next";
import PrivacyContent from "@/components/client/legal/PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | Stevarlabs",
  description: "Privacy policy and data protection information for Stevarlabs.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyContent />;
}