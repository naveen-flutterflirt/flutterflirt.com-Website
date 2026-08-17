"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";

export default function ServicesCTA() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#ffffff] via-[#ecf4fe] to-[#bad8fb]/60 py-20 sm:py-28 lg:py-36">
      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20">
        
        {/* Main Floating Glassmorphic CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto max-w-[1180px] rounded-[36px] sm:rounded-[48px] md:rounded-[56px] border border-white/90 bg-white/80 p-8 sm:p-14 md:p-18 lg:p-22 text-center shadow-[0_30px_90px_rgba(20,50,90,0.08)] backdrop-blur-xl overflow-hidden"
        >
          {/* Subtle Ambient Radial Orb inside Card */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-red-100/40 blur-3xl" />

          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/70 px-4 py-1.5 shadow-xs mb-6">
            <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.22em] text-[#2563eb]">
              START YOUR TRANSFORMATION
            </span>
          </div>

          {/* Headline */}
          <h2
            className="mx-auto max-w-[900px] text-[#0a0f18] tracking-[-0.03em] leading-[1.05]"
            style={{
              fontFamily: "var(--font-bigshot-one), Georgia, serif",
              fontSize: "clamp(2.2rem, 4vw, 4.2rem)",
            }}
          >
            Ready to Architect Systems That Drive Real{" "}
            <span
              className="font-normal text-[1.15em] text-[#F14F57] inline-block select-none"
              style={{ fontFamily: "var(--font-allura), cursive" }}
            >
              Momentum
            </span>
            ?
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mt-5 max-w-[680px] text-[16px] sm:text-[18px] text-[#475569] leading-relaxed font-normal">
            Whether you need a full enterprise Dynamics 365 implementation, automated Power Platform workflows, or dedicated engineering pods, our senior partners are ready to consult.
          </p>

          {/* CTA Action Buttons */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#0a0f18] px-8 py-4 text-[15px] sm:text-[16px] font-semibold text-white shadow-[0_12px_35px_rgba(10,15,24,0.25)] transition-all duration-300 hover:bg-[#2563eb] hover:shadow-[0_14px_40px_rgba(37,99,235,0.35)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Schedule Architecture Discovery</span>
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>

            <Link
              href="/our-story"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/90 px-7 py-4 text-[15px] sm:text-[16px] font-semibold text-[#0a0f18] shadow-xs backdrop-blur-sm transition-all duration-300 hover:bg-white hover:border-[#2563eb] hover:text-[#2563eb]"
            >
              <span>Read Our Story</span>
              <span className="text-sm">→</span>
            </Link>
          </div>

          {/* Fast Consultation Assurance */}
          <p className="mt-7 text-[12.5px] text-slate-500 font-medium">
            🔒 No generic sales decks. Direct consultation with Senior Dynamics & Cloud Architects within 24 hours.
          </p>

        </motion.div>

      </div>
    </section>
  );
}
