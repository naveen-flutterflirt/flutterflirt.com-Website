import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BizboxContent from "@/components/Bizbox/BizboxContent";

export const metadata: Metadata = {
  title: "BizBox - One platform to run your entire business | FlutterFlirt",
  description:
    "BizBox by FlutterFlirt: A secure, multi-purpose ERP for POS, inventory, customers, billing, service and connected devices.",
  alternates: { canonical: "/bizbox" },
};

export default function BizboxPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full bg-[#f8fafc]">
        <BizboxContent />
      </main>
      <Footer />
    </>
  );
}
