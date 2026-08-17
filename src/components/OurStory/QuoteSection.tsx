"use client";

import React from "react";
import { motion } from "motion/react";

export default function QuoteSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#ebf3fe] via-[#dce8fa] to-[#d0e0f8] py-12 sm:py-16 lg:py-24">
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        
        {/* Compact & Sleek Rectangular Glass Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          animate={{ y: [-4, 4, -4] }}
          // @ts-expect-error motion float
          transition={{
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative mx-auto max-w-[860px] rounded-[24px] sm:rounded-[32px] md:rounded-[38px] border border-white/70 bg-white/40 px-6 py-8 sm:px-10 sm:py-10 md:px-14 md:py-11 text-center shadow-[0_16px_40px_rgba(100,140,200,0.1)] backdrop-blur-2xl"
        >
          
          {/* Top Stylized Quotation Mark '99' Glyph */}
          <div className="flex justify-center mb-3 sm:mb-4 select-none">
            <svg
              className="w-7 h-5 sm:w-8 sm:h-6 text-[#8fa8cf] opacity-80"
              viewBox="0 0 40 28"
              fill="currentColor"
            >
              <path d="M 6 14 C 6 8, 10 4, 16 4 L 16 9 C 12 9, 11 11, 11 14 L 16 14 L 16 26 L 6 26 Z M 24 14 C 24 8, 28 4, 34 4 L 34 9 C 30 9, 29 11, 29 14 L 34 14 L 34 26 L 24 26 Z" />
            </svg>
          </div>

          {/* Quote Main Text (3 Balanced Lines, Crisp Sizing) */}
          <blockquote
            className="mx-auto max-w-[760px] text-[17px] sm:text-[20px] md:text-[23px] lg:text-[25px] font-normal leading-[1.42] sm:leading-[1.46] tracking-[-0.015em] text-[#0a0f18] select-none"
            style={{ fontFamily: "var(--font-bigshot-one), Georgia, serif" }}
          >
            <span className="block whitespace-normal md:whitespace-nowrap">
              &ldquo;We didn&apos;t set out to open five offices. We set out to
            </span>
            <span className="block whitespace-normal md:whitespace-nowrap">
              solve one problem well enough that people kept
            </span>
            <span className="block whitespace-normal md:whitespace-nowrap">
              asking us to solve it somewhere else.&rdquo;
            </span>
          </blockquote>

          {/* Center Divider Line */}
          <div className="mx-auto mt-5 mb-3 sm:mt-6 sm:mb-3.5 h-[2px] w-8 rounded-full bg-[#4a7fc4]" />

          {/* Bottom Subtitle Tag */}
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#4a7fc4] font-sans">
            OUR STORY, IN ONE LINE
          </p>

        </motion.div>

      </div>
    </section>
  );
}


