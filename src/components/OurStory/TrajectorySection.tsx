"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

interface MilestoneStep {
  id: number;
  label: string;
  isArrow?: boolean;
  dateTag: string;
  tagVariant: "gold" | "navy";
  title: string;
  description: string;
  image: string;
}

const STEPS: MilestoneStep[] = [
  {
    id: 1,
    label: "01",
    dateTag: "FEB 2023",
    tagVariant: "gold",
    title: "Inception",
    description:
      "Founded in a small workspace with a singular focus on flawless architecture.",
    image: "/slider1.png",
  },
  {
    id: 2,
    label: "02",
    dateTag: "2023 - 2024",
    tagVariant: "gold",
    title: "Expansion",
    description:
      "First major international deployment. Team grows from 5 to 50.",
    image: "/slider2.png",
  },
  {
    id: 3,
    label: "03",
    dateTag: "FEB 2025",
    tagVariant: "gold",
    title: "Milestone",
    description:
      "Opening of our 5th global office, cementing our presence across two continents.",
    image: "/slider3.png",
  },
  {
    id: 4,
    label: "→",
    isArrow: true,
    dateTag: "2025 & BEYOND",
    tagVariant: "navy",
    title: "The Future",
    description:
      "Scaling intelligent solutions. Redefining what enterprise consulting means.",
    image: "/slider4.png",
  },
];

export default function TrajectorySection() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const nextStep = useCallback(() => {
    setActiveStep((prev) => (prev + 1) % STEPS.length);
  }, []);

  // 1-second automatic slider interval
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextStep();
    }, 1000);
    return () => clearInterval(timer);
  }, [nextStep, isHovered]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#ecf4fe] via-[#f0f6fe] to-[#ffffff] pt-8 pb-20 sm:pt-12 sm:pb-32">
      <div className="relative mx-auto max-w-[1440px] px-3 sm:px-6 md:px-10 lg:px-16">
        
        {/* Section Header with Thin Font */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-[11px] sm:text-[13px] font-bold uppercase tracking-[0.24em] text-[#2563eb]">
            Trajectory
          </p>
          <h2
            className="mt-1.5 text-[28px] sm:text-[38px] md:text-[44px] font-light tracking-[-0.01em] text-[#0a0f18]"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            How We Grew
          </h2>
          <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-[#2563eb]" />
        </div>

        {/* Interactive Slider Container */}
        <div 
          className="relative mx-auto max-w-[1320px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* 1. Main Showcase Image Area */}
          <div className="relative w-full h-[220px] sm:h-[340px] md:h-[440px] lg:h-[500px] overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl shadow-[0_20px_60px_rgba(15,35,75,0.12)] border border-white/80 bg-slate-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 h-full w-full"
              >
                <Image
                  src={STEPS[activeStep].image}
                  alt={STEPS[activeStep].title}
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 2. Step Bar & States Track (Unified 4-Column Alignment) */}
          <div className="relative mt-6 sm:mt-10 px-1 sm:px-4 md:px-8">
            
            {/* Extended Continuous Step Line spanning edge to edge behind nodes */}
            <div className="relative mb-4 sm:mb-6">
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ originX: 0 }}
                className="absolute left-2 right-2 sm:left-4 sm:right-4 top-1/2 -translate-y-1/2 h-[2px] sm:h-[2.5px] bg-[#0e2138] z-0 flex items-center justify-between pointer-events-none"
              >
                {/* Left Arrow Head */}
                <span className="text-[#0e2138] -ml-2 select-none font-bold text-[10px] sm:text-xs">◀</span>
                {/* Right Arrow Head */}
                <span className="text-[#0e2138] -mr-2 select-none font-bold text-[10px] sm:text-xs">▶</span>
              </motion.div>

              {/* 4 Perfectly Centered Step Buttons */}
              <div className="relative z-10 grid grid-cols-4 gap-2 sm:gap-4 md:gap-6">
                {STEPS.map((step, idx) => {
                  const isActive = idx === activeStep;
                  return (
                    <div key={step.id} className="flex items-center justify-center">
                      <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          delay: 0.12 + idx * 0.12,
                          duration: 0.35,
                          ease: "backOut",
                        }}
                        onClick={() => handleStepClick(idx)}
                        aria-label={`Go to ${step.title}`}
                        className={`flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-full font-bold text-xs sm:text-sm md:text-base transition-all duration-300 transform active:scale-95 ${
                          isActive
                            ? "bg-[#0e2138] text-white shadow-[0_4px_16px_rgba(14,33,56,0.5)] ring-3 sm:ring-4 ring-[#2563eb]/30 scale-105 sm:scale-110"
                            : "bg-white text-[#0e2138] border-[1.5px] sm:border-2 border-[#0e2138] shadow-sm hover:scale-105 hover:bg-[#f0f6fe]"
                        }`}
                      >
                        {step.isArrow ? (
                          <svg
                            className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5"
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
                        ) : (
                          <span>{step.label}</span>
                        )}
                      </motion.button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. 4 Milestone Content States (Aligned Directly Under Step Nodes) */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6">
              {STEPS.map((step, idx) => {
                const isActive = idx === activeStep;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      delay: 0.25 + idx * 0.15,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    onClick={() => handleStepClick(idx)}
                    className={`cursor-pointer transition-all duration-300 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl text-center sm:text-left ${
                      isActive
                        ? "opacity-100 transform -translate-y-0.5 bg-white/90 shadow-sm sm:shadow-md border border-blue-100"
                        : "opacity-75 hover:opacity-100 hover:bg-white/40"
                    }`}
                  >
                    {/* Date Tag Badge */}
                    <div className="flex justify-center sm:justify-start">
                      {step.tagVariant === "gold" ? (
                        <span className="inline-block rounded-full bg-[#fef3c7] px-1.5 sm:px-2.5 md:px-3 py-0.5 text-[8.5px] sm:text-[10px] md:text-[11px] font-bold text-[#b45309] tracking-wide shadow-xs whitespace-nowrap">
                          {step.dateTag}
                        </span>
                      ) : (
                        <span className="inline-block rounded-full bg-[#0e2138] px-1.5 sm:px-2.5 md:px-3 py-0.5 text-[8.5px] sm:text-[10px] md:text-[11px] font-bold text-white tracking-wide shadow-xs whitespace-nowrap">
                          {step.dateTag}
                        </span>
                      )}
                    </div>

                    {/* Title (Cursive Script) */}
                    <h3
                      className="mt-1 sm:mt-2 font-normal text-[#0a0f18] text-[15px] sm:text-[22px] md:text-[28px] leading-tight select-none truncate"
                      style={{
                        fontFamily: "var(--font-allura), 'Brush Script MT', cursive",
                      }}
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-1 text-[10px] sm:text-[12px] md:text-[14px] text-[#475569] leading-tight sm:leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}


