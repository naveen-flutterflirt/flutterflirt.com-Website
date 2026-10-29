import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OurProductContent from "@/components/OurProduct/OurProductContent";

export const metadata: Metadata = {
  title: "Our Products — Enterprise ERP & Intelligent CRM | FlutterFlirt",
  description:
    "Explore FlutterFlirt's enterprise cloud products: modular ERP systems for finance and supply chain, and intelligent CRM suites for sales pipeline automation. Launch interactive live demos.",
  alternates: { canonical: "/our-product" },
};

export default function OurProductPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full">
        <OurProductContent />
      </main>
      <Footer />
    </>
  );
}
