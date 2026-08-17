import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesHero from "@/components/Services/ServicesHero";
import ServicesPillars from "@/components/Services/ServicesPillars";
import ProcessMethodology from "@/components/Services/ProcessMethodology";
import ServicesTrustStats from "@/components/Services/ServicesTrustStats";
import ServicesCTA from "@/components/Services/ServicesCTA";

export const metadata: Metadata = {
  title: "Enterprise Services & Technology Practices | FlutterFlirt",
  description:
    "Explore FlutterFlirt's comprehensive technology and consulting practices: Dynamics 365 ERP & CRM, Power Platform Automation, Azure Cloud Integrations, Custom React/Next.js Applications, and Resource Augmentation.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen w-full bg-[#dfeaf3]">
        {/* 1. Hero Section with Interconnected Topology Visual */}
        <ServicesHero />

        {/* 2. 8 Core Services structured in 3 Strategic Pillars */}
        <ServicesPillars />

        {/* 3. Client Engagement Approach (Assess, Build, Integrate, Support) */}
        <ProcessMethodology />

        {/* 4. Enterprise Track Record & Trust Metrics */}
        <ServicesTrustStats />

        {/* 5. Pre-Footer Call to Action */}
        <ServicesCTA />
      </main>

      <Footer />
    </>
  );
}