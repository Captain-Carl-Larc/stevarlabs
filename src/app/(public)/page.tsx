// File: page.tsx
// Route/Folder: src/app/(public)
// Purpose: Main Homepage route. Orchestrates all the individual homepage sections into a single view.
// Imports: Hero, Problem, Offer, Services, HowItWorks, ProofAndTerms, ResourcesTeaser, Faq, AuditCta
// Used in: Root URL (/)

import Hero from "@/components/client/homepage/Hero";
import Problem from "@/components/client/homepage/Problem";
import Offer from "@/components/client/homepage/Offer";
import Services from "@/components/client/homepage/Services";
import HowItWorks from "@/components/client/homepage/HowItWorks";
import ProofAndTerms from "@/components/client/homepage/ProofAndTerms";
import ResourcesTeaser from "@/components/client/homepage/ResourcesTeaser";
import Faq from "@/components/client/homepage/Faq";
import AuditCta from "@/components/client/shared/AuditCta";

export default function Homepage() {
  return (
    <>
      <Hero />
      <Problem />
      <Offer />
      <Services />
      <HowItWorks />
      <ProofAndTerms />
      <ResourcesTeaser />
      <Faq />
      <AuditCta />
    </>
  );
}