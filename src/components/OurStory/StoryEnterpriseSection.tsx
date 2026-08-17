"use client";

import React from "react";
import { motion } from "motion/react";

export default function StoryEnterpriseSection() {
  return (
    <section
      className="relative w-full overflow-hidden pt-6 pb-20 lg:pt-10 lg:pb-28"
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #ffffff 46%, #e4f0fc 46%, #ecf4fe 100%)",
      }}
    >
      {/* Background Decorative 1/4 Pizza Slice Vector Arc on Right */}
      <div className="pointer-events-none absolute right-0 top-[18%] h-[420px] w-[420px] rounded-bl-[100%] bg-[#dbebfc]/60 select-none" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 md:px-10">
        
        {/* Floating Animated Compact Rectangular Card Container */}
        <motion.div
          animate={{
            y: [-14, 14, -14],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative mx-auto max-w-[1020px] overflow-hidden rounded-[24px] sm:rounded-[28px] md:rounded-[32px] border border-[#e2edf9] bg-white py-10 px-6 sm:px-10 md:py-12 md:px-16 shadow-[0_24px_70px_rgba(25,50,95,0.08),_0_6px_20px_rgba(25,50,95,0.04)]"
        >
          {/* Left Vertical Timeline Line & Node (Inside Card) */}
          <div className="pointer-events-none absolute left-6 sm:left-10 md:left-14 top-0 bottom-0 flex items-center justify-center">
            <div className="relative h-full w-[2px] bg-[#2563eb]">
              {/* Center circular node */}
              <div className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#2563eb] shadow-[0_0_0_3px_rgba(37,99,235,0.25)]" />
            </div>
          </div>

          {/* Top-Right 1/4 Pizza Slice Background in Card */}
          <div className="pointer-events-none absolute right-0 top-0 h-[340px] w-[340px] rounded-bl-[100%] bg-[#edf4fe]/90 select-none" />

          {/* Exact Figma 302 x 332 Rotated 1/4 Pizza Slice Shape */}
          <div 
            className="pointer-events-none absolute -right-4 top-2 w-[302px] h-[332px] select-none"
            style={{
              transform: "rotate(-15deg)",
              transformOrigin: "top right",
            }}
          >
            <svg
              width="302"
              height="332"
              viewBox="0 0 302 332"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* 1/4 Pizza Slice: Vertex at (302,0), flat top to (0,0), circular arc to (302,332), flat right edge back to (302,0) */}
              <path
                d="M 302 0 L 0 0 A 302 332 0 0 0 302 332 Z"
                fill="#d8e8fc"
                fillOpacity="0.75"
              />
            </svg>
          </div>

          {/* Card Content Container */}
          <div className="relative z-10 pl-6 sm:pl-10 md:pl-14 pr-4 sm:pr-8 md:pr-12">
            
            {/* Top Sparkle / Compass Star Icon Badge */}
            <div className="mx-auto mb-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#d2e4fb] bg-[#edf4fe] text-[#2563eb] shadow-[inset_0_1px_1px_rgba(255,255,255,1)]">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="2" x2="12" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
              </svg>
            </div>

            {/* Headline */}
            <h2
              className="text-center text-[24px] sm:text-[28px] md:text-[34px] font-normal leading-[1.2] tracking-[-0.03em] text-[#0a0f18]"
              style={{ fontFamily: "var(--font-bigshot-one), Georgia, serif" }}
            >
              It started as{" "}
              <span
                className="font-normal text-[1.2em] tracking-normal inline-block px-1 select-none"
                style={{
                  fontFamily: "var(--font-allura), 'Brush Script MT', cursive",
                  color: "#F14F57",
                }}
              >
                just
              </span>{" "}
              an enterprise.
            </h2>

            {/* Body Paragraphs */}
            <div className="mx-auto mt-6 max-w-[720px] space-y-4 text-[14px] sm:text-[15px] md:text-[15.5px] font-serif leading-[1.75] text-[#374151]">
              <p>
                In the early days, our mandate was simple: architect a system that
                didn&apos;t buckle under pressure. We were a small group of
                specialists, operating out of a single room, obsessing over the
                structural integrity of data flows and the elegant logic of clean
                code.
              </p>

              <p>
                We didn&apos;t call ourselves a consultancy then. We were
                builders. But as the systems we deployed began to fundamentally
                shift how our clients operated—saving them millions, unlocking new
                markets—the word &apos;just&apos; faded away. The enterprise
                became an ecosystem. And the single room wasn&apos;t enough anymore.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}






