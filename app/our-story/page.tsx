"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoryEnterpriseSection from "@/components/OurStory/StoryEnterpriseSection";
import TrajectorySection from "@/components/OurStory/TrajectorySection";
import OfficesSection from "@/components/OurStory/OfficesSection";
import QuoteSection from "@/components/OurStory/QuoteSection";

export default function OurStoryPage() {
  return (
    <>
      <Navbar />

      <main
        className="relative min-h-[calc(100vh-86px)] w-full overflow-hidden pt-[86px] flex items-center"
        style={{
          background:
            "radial-gradient(110% 85% at 0% 0%, #bad8fb 0%, #cee1fc 25%, #e3effe 50%, #f4f8fe 75%, #ffffff 100%)",
        }}
      >
        <div className="relative mx-auto w-full max-w-[1460px] px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-6 lg:py-0">
          {/* ===== 2-COLUMN HERO GRID (HORIZONTALLY LEVELED) ===== */}
          <div className="grid w-full grid-cols-1 items-center gap-6 lg:grid-cols-[1.1fr_0.9fr] xl:grid-cols-[1.12fr_0.88fr]">
            
            {/* ===== LEFT CONTENT ===== */}
            <div className="flex flex-col justify-center z-10 max-w-[700px]">
              {/* Title - Exactly 2 lines */}
              <h1
                className="font-normal text-[#0a0f16] tracking-[-0.04em] leading-[0.98]"
                style={{
                  fontFamily: "var(--font-bigshot-one), Georgia, serif",
                  fontSize: "clamp(1.8rem, 4.4vw, 5rem)",
                }}
              >
                <span className="block">
                  Every System We&apos;ve Built
                </span>
                <span className="block">
                  Started With One
                </span>
              </h1>

              {/* Script Accent - "Belief." */}
              <div
                className="font-normal leading-[1.05] tracking-normal text-[#1e4067] -mt-1 mb-4 select-none"
                style={{
                  fontFamily: "var(--font-allura), 'Brush Script MT', cursive",
                  fontSize: "clamp(2.8rem, 5.8vw, 6.4rem)",
                }}
              >
                Belief.
              </div>

              {/* Description */}
              <p className="max-w-[580px] text-[16px] sm:text-[18px] md:text-[19px] leading-[1.7] tracking-[-0.01em] text-[#475569]">
                We belive the right technology transforms how businesses operate,scale, and compete in an ever-changing world .
              </p>
            </div>

            {/* ===== RIGHT CONTENT - CHART WITH ROCKET FLIGHT ===== */}
            <div className="relative flex w-full items-center justify-center lg:justify-end h-[360px] sm:h-[440px] md:h-[500px] lg:h-[550px] xl:h-[600px]">
              <div className="relative h-[76%] w-full max-w-[680px] rounded-[28px] bg-white/96 shadow-[0_25px_80px_rgba(17,34,61,0.08)] ring-1 ring-[#e6edf8]">
                <div className="absolute inset-[4%]">
                  <Image
                    src="/Bar.webp"
                    alt="Bar chart illustration"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                <motion.div
                  className="absolute bottom-[35%] left-[8%] z-20 h-[24%] w-[18%]"
                  initial={{
                    x: 0,
                    y: 0,
                  }}
                  animate={{
                    x: 250,
                    y: -175,
                  }}
                  transition={{
                    duration: 2.0,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src="/Rocket.webp"
                    alt="Rocket graphic"
                    fill
                    className="object-contain drop-shadow-[0_20px_26px_rgba(37,99,235,0.18)]"
                  />
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Story Enterprise Floating Card Section */}
      <StoryEnterpriseSection />

      {/* Trajectory / How We Grew Interactive Slider Section */}
      <TrajectorySection />

      {/* Current Scale / Six Offices Section */}
      <OfficesSection />

      {/* Our Story In One Line Quote Section */}
      <QuoteSection />

      <Footer />
    </>
  );
}