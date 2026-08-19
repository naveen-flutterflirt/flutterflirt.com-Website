"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface PhaseCard {
  id: string;
  num: string;
  phase: string;
  title: string;
  duration: string;
  theme: "dark" | "light";
}

const PHASES: PhaseCard[] = [
  {
    id: "01",
    num: "01",
    phase: "ASSESS",
    title: "Discovery & Value-Stream Blueprinting",
    duration: "Week 1 - 3",
    theme: "dark",
  },
  {
    id: "02",
    num: "02",
    phase: "BUILD",
    title: "Sprint Delivery & Modern Engineering",
    duration: "Week 4 - 12",
    theme: "light",
  },
  {
    id: "03",
    num: "03",
    phase: "INTEGRATE",
    title: "Unified Data Fabric & Zero-Downtime Cutover",
    duration: "Week 13 - 16",
    theme: "light",
  },
  {
    id: "04",
    num: "04",
    phase: "SUPPORT",
    title: "Hypercare, Optimization & Continuous Scale",
    duration: "Post Go-Live",
    theme: "light",
  },
];

export default function ServicesPhases() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // The section is 300vh tall, which gives the desktop sequence two viewport-length scrolls.
  // Complete the spread before the sequence ends so every card is visible in the viewport.
  const x1 = useTransform(scrollYProgress, [0, 0.72], ["0%", "-170%"]);
  const y1 = useTransform(scrollYProgress, [0, 0.72], ["0%", "0%"]);
  const rotate1 = useTransform(scrollYProgress, [0, 0.72], ["-6deg", "0deg"]);
  
  const x2 = useTransform(scrollYProgress, [0, 0.72], ["0%", "-55%"]);
  const y2 = useTransform(scrollYProgress, [0, 0.72], ["2%", "0%"]);
  const rotate2 = useTransform(scrollYProgress, [0, 0.72], ["-2deg", "0deg"]);

  const x3 = useTransform(scrollYProgress, [0, 0.72], ["0%", "55%"]);
  const y3 = useTransform(scrollYProgress, [0, 0.72], ["4%", "0%"]);
  const rotate3 = useTransform(scrollYProgress, [0, 0.72], ["2deg", "0deg"]);

  const x4 = useTransform(scrollYProgress, [0, 0.72], ["0%", "170%"]);
  const y4 = useTransform(scrollYProgress, [0, 0.72], ["6%", "0%"]);
  const rotate4 = useTransform(scrollYProgress, [0, 0.72], ["6deg", "0deg"]);

  // Animated straight background line follows the cards as they open.
  const lineWidth = useTransform(scrollYProgress, [0, 0.72], ["0%", "85%"]);

  const transforms = [
    { x: x1, y: y1, rotate: rotate1, zIndex: 40 },
    { x: x2, y: y2, rotate: rotate2, zIndex: 30 },
    { x: x3, y: y3, rotate: rotate3, zIndex: 20 },
    { x: x4, y: y4, rotate: rotate4, zIndex: 10 },
  ];

  return (
    <section ref={containerRef} className="relative md:h-[300vh] w-full bg-[#f4f8fc]">
      
      {/* ======================= */}
      {/* MOBILE VIEW (Stacked)   */}
      {/* ======================= */}
      <div className="md:hidden w-full flex flex-col items-center px-6 py-20">
        
        {/* Mobile Heading */}
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#2563EB] mb-2">
            DELIVERY METHODOLOGY
          </p>
          <h2 className="text-[32px] font-normal leading-[1.1] text-[#0a0f18]" style={{ fontFamily: "var(--font-bigshot-one), Georgia, serif" }}>
            The 4 Phases of Value Realization
          </h2>
        </div>

        {/* Mobile Cards */}
        <div className="flex flex-col gap-6 w-full max-w-[320px]">
          {PHASES.map((card) => {
            const isDark = card.theme === "dark";
            return (
              <div
                key={`mobile-${card.id}`}
                className={`relative w-full aspect-[4/3] rounded-3xl p-7 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.06)] overflow-hidden [contain:paint] [clip-path:inset(0_round_24px)] ${
                  isDark 
                    ? "bg-[#0c4a8e] border border-blue-400/30 text-white" 
                    : "bg-white border border-slate-100 text-[#0a0f18]"
                }`}
              >
                {/* Floating Gradient for Dark Card */}
                {isDark && (
                  <motion.div
                    className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] z-0 pointer-events-none opacity-40 mix-blend-screen"
                    style={{
                      background: "radial-gradient(circle at center, #60a5fa 0%, transparent 40%)"
                    }}
                    animate={{
                      x: ["0%", "-15%", "0%", "15%", "0%"],
                      y: ["0%", "15%", "0%", "-15%", "0%"],
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                  />
                )}

                <div className="relative z-10 flex items-center justify-between">
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    isDark ? "bg-[#93c5fd] text-[#1e3a8a]" : "bg-slate-100 text-slate-500"
                  }`}>
                    {card.phase}
                  </div>
                  <div className={`text-[20px] font-bold ${
                    isDark ? "text-blue-100/90" : "text-slate-300"
                  }`}>
                    {card.num}
                  </div>
                </div>
                <div className="relative z-10">
                  <h3 className={`text-[19px] font-bold leading-[1.2] mb-3 tracking-tight ${
                    isDark ? "text-white" : "text-[#0a0f18]"
                  }`}>
                    {card.title}
                  </h3>
                  <p className={`text-[13px] font-medium ${
                    isDark ? "text-blue-100" : "text-slate-500"
                  }`}>
                    {card.duration}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>


      {/* ======================= */}
      {/* DESKTOP VIEW (Animated) */}
      {/* ======================= */}
      <div className="hidden md:flex sticky top-0 h-screen w-full overflow-hidden flex-col items-center justify-center">
        
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="h-[500px] w-[500px] rounded-full bg-blue-100/50 blur-[100px]" />
        </div>

        {/* Section Heading */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
          className="absolute top-[8%] lg:top-[12%] text-center px-6"
        >
          <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#2563EB] mb-3">
            DELIVERY METHODOLOGY
          </p>
          <h2 className="text-[38px] lg:text-[46px] font-normal leading-[1.1] text-[#0a0f18]" style={{ fontFamily: "var(--font-bigshot-one), Georgia, serif" }}>
            The 4 Phases of Value Realization
          </h2>
          <p className="mt-4 text-[16px] text-slate-500 max-w-[500px] mx-auto">
            Scroll to unpack our enterprise delivery lifecycle.
          </p>
        </motion.div>

        {/* The Card Stack */}
        <div className="relative w-full max-w-[1320px] mx-auto flex items-center justify-center top-12 lg:top-16 z-10">
          
          {/* Animated Straight Background Line */}
          <motion.div 
            style={{ width: lineWidth }}
            className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#94a3b8] to-transparent z-0"
          />
          
          {PHASES.map((card, index) => {
            const isDark = card.theme === "dark";
            
            return (
              <motion.div
                key={card.id}
                style={{
                  x: transforms[index].x,
                  y: transforms[index].y,
                  rotate: transforms[index].rotate,
                  zIndex: transforms[index].zIndex,
                }}
                className={`absolute w-[250px] lg:w-[280px] aspect-[4/3] rounded-3xl p-6 lg:p-7 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-2xl overflow-hidden [contain:paint] [clip-path:inset(0_round_24px)] ${
                  isDark 
                    ? "bg-[#0c4a8e] border border-blue-400/30 text-white shadow-[0_15px_40px_rgba(12,74,142,0.35)]" 
                    : "bg-white border border-slate-100 text-[#0a0f18]"
                }`}
              >
                {/* Floating Gradient for Dark Card */}
                {isDark && (
                  <motion.div
                    className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] z-0 pointer-events-none opacity-40 mix-blend-screen"
                    style={{
                      background: "radial-gradient(circle at center, #60a5fa 0%, transparent 40%)"
                    }}
                    animate={{
                      x: ["0%", "-15%", "0%", "15%", "0%"],
                      y: ["0%", "15%", "0%", "-15%", "0%"],
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                  />
                )}

                {/* Top Row: Pill & Number */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                    isDark ? "bg-[#93c5fd] text-[#1e3a8a]" : "bg-slate-100 text-slate-500"
                  }`}>
                    {card.phase}
                  </div>
                  <div className={`text-[24px] font-bold ${
                    isDark ? "text-blue-100/90" : "text-slate-300"
                  }`}>
                    {card.num}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className={`text-[19px] lg:text-[21px] font-bold leading-[1.2] mb-3 tracking-tight ${
                    isDark ? "text-white" : "text-[#0a0f18]"
                  }`}>
                    {card.title}
                  </h3>
                  <p className={`text-[13px] font-medium ${
                    isDark ? "text-blue-100" : "text-slate-500"
                  }`}>
                    {card.duration}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
