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
          className="relative mx-auto max-w-[880px] rounded-[32px] sm:rounded-[40px] md:rounded-[48px] border border-white/90 bg-white/80 p-8 sm:p-10 md:p-12 lg:p-14 text-center shadow-[0_30px_90px_rgba(20,50,90,0.08)] backdrop-blur-xl overflow-hidden"
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
            className="mx-auto max-w-[800px] font-light text-[#0a0f18] tracking-[-0.02em] leading-[1.1]"
            style={{
              fontFamily: "var(--font-bigshot-one), Georgia, serif",
              fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)",
            }}
          >
            Ready to Architect Systems That Drive Real{" "}
            <span
              className="font-light text-[1.15em] text-[#F14F57] inline-block select-none"
              style={{ fontFamily: "var(--font-allura), cursive" }}
            >
              Momentum
            </span>
            ?
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mt-4 max-w-[640px] text-[14px] sm:text-[15px] text-[#475569] leading-relaxed font-light">
            Whether you need a full enterprise Dynamics 365 implementation, automated Power Platform workflows, or dedicated engineering pods, our senior partners are ready to consult.
          </p>

          {/* CTA Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0a0f18] to-[#1a2333] px-6 py-2.5 text-[13px] sm:text-[14px] font-medium text-white shadow-[0_8px_20px_rgba(10,15,24,0.15)] transition-all duration-300 hover:shadow-[0_12px_25px_rgba(10,15,24,0.25)] hover:-translate-y-0.5 active:translate-y-0 ring-1 ring-white/10"
            >
              <span>Schedule Architecture Discovery</span>
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>

            <Link
              href="/our-story"
              className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/60 px-5 py-2.5 text-[13px] sm:text-[14px] font-medium text-[#475569] shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#0a0f18] hover:border-slate-300 hover:shadow-md"
            >
              <span>Read Our Story</span>
              <span className="text-sm transition-transform group-hover:translate-x-0.5">→</span>
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
