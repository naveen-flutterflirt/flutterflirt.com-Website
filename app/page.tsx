import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Enterprise Technology That Moves Business Forward",
  description:
    "FlutterFlirt builds reliable digital foundations with Dynamics 365, Power Platform, Azure, and custom software for modern businesses.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}