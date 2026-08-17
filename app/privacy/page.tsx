import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrivacyContent from "@/components/Privacy/PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | FlutterFlirt Enterprise Data Governance",
  description:
    "Learn how FlutterFlirt collects, uses, protects, and governs personal and enterprise data across our Dynamics 365, Azure, and digital transformation consulting practices.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full bg-[#dfeaf3]">
        <PrivacyContent />
      </main>
      <Footer />
    </>
  );
}
