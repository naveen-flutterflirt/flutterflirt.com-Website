"use client";

import React from "react";
import { motion } from "motion/react";

interface StatCardConfig {
  value: string;
  color: string;
  title: string[];
  description: string;
}

const STATS: StatCardConfig[] = [
  {
    value: "50+",
    color: "text-[#059669]",
    title: ["Enterprise", "Deployments"],
    description: "Complex multi-country rollouts across retail, manufacturing, and financial services.",
  },
  {
    value: "99.4%",
    color: "text-[#2563EB]",
    title: ["On-Time", "Milestone", "Velocity"],
    description: "Predictable agile delivery without scope slippage or unbudgeted change requests.",
  },
  {
    value: "$120M+",
    color: "text-[#059669]",
    title: ["Client Value", "Unlocked"],
    description: "Direct financial gains generated through process automations and streamlined ERP operations.",
  },
  {
    value: "6+",
    color: "text-[#2563EB]",
    title: ["Global Hubs"],
    description: "Strategically located talent centers in the U.S. and India operating as one unified entity.",
  },
];

export default function ServicesTrustStats() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 sm:py-24 border-y border-[#e2edf9]">
      {/* Dynamic Balanced Movement Keyframes using Extreme Light Blues */}
      <style>{`
        @keyframes floatMorph1A {
          0% {
            transform: translate(0px, 0px) scale(1) rotate(0deg);
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          }
          50% {
            transform: translate(-45px, 38px) scale(1.28) rotate(180deg);
            border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%;
          }
          100% {
            transform: translate(0px, 0px) scale(1) rotate(360deg);
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          }
        }

        @keyframes floatMorph1B {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          50% {
            transform: translate(38px, -35px) scale(1.35);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes spinVortex2A {
          0% {
            transform: rotate(0deg) translate(30px) rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) translate(42px) rotate(-180deg) scale(1.3);
          }
          100% {
            transform: rotate(360deg) translate(30px) rotate(-360deg) scale(1);
          }
        }

        @keyframes spinVortex2B {
          0% {
            transform: translate(0px, 0px) scale(0.92);
            opacity: 0.75;
          }
          50% {
            transform: translate(-36px, -28px) scale(1.35);
            opacity: 1;
          }
          100% {
            transform: translate(0px, 0px) scale(0.92);
            opacity: 0.75;
          }
        }

        @keyframes crescentPulse3A {
          0% {
            transform: translate(0px, 0px) scale(1) rotate(0deg);
          }
          50% {
            transform: translate(-50px, -38px) scale(1.32) rotate(35deg);
          }
          100% {
            transform: translate(0px, 0px) scale(1) rotate(0deg);
          }
        }

        @keyframes crescentPulse3B {
          0% {
            transform: translate(0px, 0px) scale(0.95);
          }
          50% {
            transform: translate(36px, -40px) scale(1.35);
          }
          100% {
            transform: translate(0px, 0px) scale(0.95);
          }
        }

        @keyframes auroraDrift4A {
          0% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-50px) scale(1.32);
          }
          100% {
            transform: translateY(0px) scale(1);
          }
        }

        @keyframes auroraDrift4B {
          0% {
            transform: translate(0px, 0px) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translate(-36px, 32px) scale(1.35);
            opacity: 1;
          }
          100% {
            transform: translate(0px, 0px) scale(1);
            opacity: 0.7;
          }
        }
      `}</style>

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20">

        {/* Top Header */}
        <div className="text-center max-w-[760px] mx-auto mb-14">
          <p className="text-[11px] sm:text-[12.5px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">
            ENTERPRISE TRACK RECORD
          </p>
          <h2
            className="mt-2 text-[30px] sm:text-[38px] md:text-[44px] font-normal leading-[1.12] tracking-[-0.02em] text-[#0a0f18]"
            style={{ fontFamily: "var(--font-bigshot-one), Georgia, serif" }}
          >
            Engineered For Impact. Proven by{" "}
            <span
              className="text-[1.12em] font-normal text-[#F14F57] inline-block select-none"
              style={{ fontFamily: "var(--font-allura), cursive" }}
            >
              Numbers.
            </span>
          </h2>
        </div>

        {/* 4 Stats Grid: 1:1 Square Cards with Increased Speed & Non-Overflowing Gradients */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-7">

          {/* ================= CARD 1: 50+ (Diagonal Wave) ================= */}
          <div className="relative aspect-square w-full max-w-[380px] mx-auto sm:max-w-none flex flex-col justify-between rounded-[28px] sm:rounded-[32px] border border-[#bfdbfe]/50 bg-[#fbfdff] p-6 sm:p-7 xl:p-8 shadow-[0_12px_36px_rgba(191,219,254,0.3)] hover:shadow-[0_22px_55px_rgba(191,219,254,0.45)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden [isolation:isolate] [contain:paint] [transform:translateZ(0)] group">
            {/* Strict Internal Clip Container */}
            <div className="absolute inset-0 rounded-[28px] sm:rounded-[32px] overflow-hidden pointer-events-none [isolation:isolate] [clip-path:inset(0_round_28px)] sm:[clip-path:inset(0_round_32px)] [transform:translateZ(0)]">
              {/* Extreme Light Blue Blob 1 */}
              <div
                style={{
                  animation: "floatMorph1A 2.8s linear infinite",
                  background: "radial-gradient(circle, #bfdbfe 0%, #dbeafe 45%, #eff6ff 80%, rgba(255,255,255,0) 100%)",
                }}
                className="absolute -top-12 -right-12 h-64 w-64 rounded-full opacity-90 blur-[32px]"
              />
              {/* Extreme Light Blue Blob 2 */}
              <div
                style={{
                  animation: "floatMorph1B 2.4s ease-in-out infinite alternate",
                  background: "linear-gradient(135deg, #bae6fd 0%, #e0f2fe 50%, #eff6ff 100%)",
                }}
                className="absolute -bottom-14 -right-10 h-60 w-60 rounded-full opacity-95 blur-[34px]"
              />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <span className={`text-[38px] sm:text-[42px] lg:text-[38px] xl:text-[46px] font-sans font-bold leading-none tracking-tight block ${STATS[0].color}`}>
                {STATS[0].value}
              </span>
              <h3 className="mt-2.5 sm:mt-3 text-[19px] sm:text-[21px] lg:text-[19px] xl:text-[22px] font-bold text-[#0a0f18] leading-[1.15] tracking-tight">
                {STATS[0].title.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h3>
            </div>
            <div className="relative z-10 mt-auto">
              <p className="text-[11.5px] sm:text-[12px] xl:text-[12.5px] text-[#475569] leading-relaxed font-normal">
                {STATS[0].description}
              </p>
            </div>
          </div>

          {/* ================= CARD 2: 99.4% (Spinning Vortex) ================= */}
          <div className="relative aspect-square w-full max-w-[380px] mx-auto sm:max-w-none flex flex-col justify-between rounded-[28px] sm:rounded-[32px] border border-[#bfdbfe]/50 bg-[#fbfdff] p-6 sm:p-7 xl:p-8 shadow-[0_12px_36px_rgba(191,219,254,0.3)] hover:shadow-[0_22px_55px_rgba(191,219,254,0.45)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden [isolation:isolate] [contain:paint] [transform:translateZ(0)] group">
            {/* Strict Internal Clip Container */}
            <div className="absolute inset-0 rounded-[28px] sm:rounded-[32px] overflow-hidden pointer-events-none [isolation:isolate] [clip-path:inset(0_round_28px)] sm:[clip-path:inset(0_round_32px)] [transform:translateZ(0)]">
              {/* Extreme Light Blue Blob 1 */}
              <div
                style={{
                  animation: "spinVortex2A 3.2s linear infinite",
                  background: "radial-gradient(circle, #bae6fd 10%, #dbeafe 50%, #eff6ff 85%, rgba(255,255,255,0) 100%)",
                }}
                className="absolute top-2 -right-12 h-64 w-64 rounded-full opacity-90 blur-[34px]"
              />
              {/* Extreme Light Blue Blob 2 */}
              <div
                style={{
                  animation: "spinVortex2B 2.2s ease-in-out infinite alternate",
                  background: "linear-gradient(to top left, #bfdbfe 0%, #e0f2fe 60%, #eff6ff 100%)",
                }}
                className="absolute -bottom-10 right-2 h-56 w-56 rounded-full opacity-95 blur-[36px]"
              />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <span className={`text-[38px] sm:text-[42px] lg:text-[38px] xl:text-[46px] font-sans font-bold leading-none tracking-tight block ${STATS[1].color}`}>
                {STATS[1].value}
              </span>
              <h3 className="mt-2.5 sm:mt-3 text-[19px] sm:text-[21px] lg:text-[19px] xl:text-[22px] font-bold text-[#0a0f18] leading-[1.15] tracking-tight">
                {STATS[1].title.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h3>
            </div>
            <div className="relative z-10 mt-auto">
              <p className="text-[11.5px] sm:text-[12px] xl:text-[12.5px] text-[#475569] leading-relaxed font-normal">
                {STATS[1].description}
              </p>
            </div>
          </div>

          {/* ================= CARD 3: $120M+ (Sweeping Crescent) ================= */}
          <div className="relative aspect-square w-full max-w-[380px] mx-auto sm:max-w-none flex flex-col justify-between rounded-[28px] sm:rounded-[32px] border border-[#bfdbfe]/50 bg-[#fbfdff] p-6 sm:p-7 xl:p-8 shadow-[0_12px_36px_rgba(191,219,254,0.3)] hover:shadow-[0_22px_55px_rgba(191,219,254,0.45)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden [isolation:isolate] [contain:paint] [transform:translateZ(0)] group">
            {/* Strict Internal Clip Container */}
            <div className="absolute inset-0 rounded-[28px] sm:rounded-[32px] overflow-hidden pointer-events-none [isolation:isolate] [clip-path:inset(0_round_28px)] sm:[clip-path:inset(0_round_32px)] [transform:translateZ(0)]">
              {/* Extreme Light Blue Blob 1 */}
              <div
                style={{
                  animation: "crescentPulse3A 2.6s ease-in-out infinite alternate",
                  background: "linear-gradient(135deg, #bfdbfe 0%, #dbeafe 45%, #eff6ff 100%)",
                }}
                className="absolute -bottom-8 -right-8 h-72 w-72 rounded-full opacity-95 blur-[36px]"
              />
              {/* Extreme Light Blue Blob 2 */}
              <div
                style={{
                  animation: "crescentPulse3B 2.4s ease-in-out infinite alternate",
                  background: "radial-gradient(circle, #bae6fd 0%, #e0f2fe 55%, #eff6ff 100%)",
                }}
                className="absolute top-1/4 -right-10 h-52 w-52 rounded-full opacity-90 blur-[32px]"
              />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <span className={`text-[38px] sm:text-[42px] lg:text-[38px] xl:text-[46px] font-sans font-bold leading-none tracking-tight block ${STATS[2].color}`}>
                {STATS[2].value}
              </span>
              <h3 className="mt-2.5 sm:mt-3 text-[19px] sm:text-[21px] lg:text-[19px] xl:text-[22px] font-bold text-[#0a0f18] leading-[1.15] tracking-tight">
                {STATS[2].title.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h3>
            </div>
            <div className="relative z-10 mt-auto">
              <p className="text-[11.5px] sm:text-[12px] xl:text-[12.5px] text-[#475569] leading-relaxed font-normal">
                {STATS[2].description}
              </p>
            </div>
          </div>

          {/* ================= CARD 4: 6+ (Vertical Aurora) ================= */}
          <div className="relative aspect-square w-full max-w-[380px] mx-auto sm:max-w-none flex flex-col justify-between rounded-[28px] sm:rounded-[32px] border border-[#bfdbfe]/50 bg-[#fbfdff] p-6 sm:p-7 xl:p-8 shadow-[0_12px_36px_rgba(191,219,254,0.3)] hover:shadow-[0_22px_55px_rgba(191,219,254,0.45)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden [isolation:isolate] [contain:paint] [transform:translateZ(0)] group">
            {/* Strict Internal Clip Container */}
            <div className="absolute inset-0 rounded-[28px] sm:rounded-[32px] overflow-hidden pointer-events-none [isolation:isolate] [clip-path:inset(0_round_28px)] sm:[clip-path:inset(0_round_32px)] [transform:translateZ(0)]">
              {/* Extreme Light Blue Blob 1 */}
              <div
                style={{
                  animation: "auroraDrift4A 2.5s ease-in-out infinite alternate",
                  background: "linear-gradient(180deg, #bfdbfe 0%, #dbeafe 40%, #eff6ff 100%)",
                }}
                className="absolute -top-6 -right-14 h-80 w-56 rounded-full opacity-95 blur-[36px]"
              />
              {/* Extreme Light Blue Blob 2 */}
              <div
                style={{
                  animation: "auroraDrift4B 2.0s ease-in-out infinite alternate",
                  background: "radial-gradient(circle, #bae6fd 0%, #e0f2fe 50%, #eff6ff 100%)",
                }}
                className="absolute -bottom-10 -right-4 h-56 w-56 rounded-full opacity-90 blur-[34px]"
              />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <span className={`text-[38px] sm:text-[42px] lg:text-[38px] xl:text-[46px] font-sans font-bold leading-none tracking-tight block ${STATS[3].color}`}>
                {STATS[3].value}
              </span>
              <h3 className="mt-2.5 sm:mt-3 text-[19px] sm:text-[21px] lg:text-[19px] xl:text-[22px] font-bold text-[#0a0f18] leading-[1.15] tracking-tight">
                {STATS[3].title.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h3>
            </div>
            <div className="relative z-10 mt-auto">
              <p className="text-[11.5px] sm:text-[12px] xl:text-[12.5px] text-[#475569] leading-relaxed font-normal">
                {STATS[3].description}
              </p>
            </div>
          </div>

        </div>

        {/* Industry Trust Standards & Certifications Bar */}
        <div className="mt-14 rounded-2xl border border-slate-100 bg-slate-50 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-[#2563EB] font-bold">
              ✓
            </span>
            <div>
              <h5 className="text-[14px] font-bold text-slate-900">
                Microsoft Certified Solution Partner
              </h5>
              <p className="text-[12px] text-slate-500">
                Specialized in Dynamics 365 Business Applications, Azure & Power Platform
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[12.5px] font-semibold text-slate-700">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              SOC2 Type II Aligned
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              GDPR & Multi-Region Statutory Compliance
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Guaranteed SLA Uptime
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
