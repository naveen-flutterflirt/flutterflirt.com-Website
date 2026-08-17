"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";

export default function ServicesHero() {
  return (
    <section className="relative w-full overflow-hidden pt-[110px] pb-16 sm:pb-24 lg:pt-[130px] lg:pb-28">
      {/* Background Radial & Ambient Lighting */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(100% 85% at 20% 0%, #bad8fb 0%, #cee1fc 30%, #e2edf9 60%, #dfeaf3 100%)",
        }}
      />

      {/* Dynamic Ambient Background Nodes / Mesh Vector */}
      <div className="pointer-events-none absolute inset-0 -z-5 overflow-hidden opacity-40">
        <svg
          className="absolute -top-10 right-0 w-[600px] sm:w-[800px] lg:w-[1000px] h-[600px] text-blue-400/30"
          viewBox="0 0 800 600"
          fill="none"
        >
          <motion.circle
            cx="400"
            cy="300"
            r="220"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="6 6"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "400px 300px" }}
          />
          <motion.circle
            cx="400"
            cy="300"
            r="140"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "400px 300px" }}
          />
          <line x1="180" y1="300" x2="620" y2="300" stroke="currentColor" strokeWidth="0.8" />
          <line x1="400" y1="80" x2="400" y2="520" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col z-10 max-w-[760px]"
          >
            {/* Top Category Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/70 px-4 py-1.5 shadow-xs backdrop-blur-sm w-fit mb-5">
              <span className="h-2 w-2 rounded-full bg-[#2563eb] animate-pulse" />
              <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.22em] text-[#2563eb]">
                ENTERPRISE CAPABILITIES & PRACTICES
              </span>
            </div>

            {/* Headline with Bigshot One + Script Accent */}
            <h1
              className="text-[#0a0f18] tracking-[-0.035em] leading-[1.02]"
              style={{
                fontFamily: "var(--font-bigshot-one), Georgia, serif",
                fontSize: "clamp(2.4rem, 4.5vw, 4.8rem)",
              }}
            >
              Architecting Systems Built For{" "}
              <span
                className="font-normal text-[1.18em] tracking-normal inline-block select-none text-[#F14F57]"
                style={{
                  fontFamily: "var(--font-allura), 'Brush Script MT', cursive",
                }}
              >
                Unstoppable
              </span>{" "}
              Scale.
            </h1>

            {/* Subtext in Manrope addressing Enterprise Pain Points */}
            <p className="mt-5 max-w-[620px] text-[16px] sm:text-[18px] md:text-[19px] leading-[1.65] text-[#334155] font-normal">
              Eliminate disconnected silos and systemic friction. We engineer unified Dynamics 365, Power Platform, Azure integrations, and custom web architectures that turn complex operations into predictable enterprise momentum.
            </p>

            {/* Action Buttons & Trust Indicator */}
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#0a0f18] px-7 py-3.5 text-[14.5px] sm:text-[15.5px] font-semibold text-white shadow-[0_10px_30px_rgba(10,15,24,0.25)] transition-all duration-300 hover:bg-[#2563eb] hover:shadow-[0_12px_35px_rgba(37,99,235,0.35)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Let&apos;s Build Something Meaningful</span>
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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

              <a
                href="#services-grid"
                className="inline-flex items-center gap-2 rounded-full border border-[#cbd5e1] bg-white/80 px-6 py-3.5 text-[14.5px] sm:text-[15.5px] font-semibold text-[#0a0f18] shadow-xs backdrop-blur-sm transition-all duration-300 hover:bg-white hover:border-[#2563eb] hover:text-[#2563eb]"
              >
                <span>Explore 8 Core Practices</span>
                <span className="text-xs">↓</span>
              </a>
            </div>

            {/* Micro Trust Proof Points */}
            <div className="mt-10 flex items-center gap-6 sm:gap-8 border-t border-[#cbd5e1]/60 pt-6">
              <div>
                <p className="text-[22px] sm:text-[26px] font-bold text-[#0a0f18] font-sans leading-none">
                  50+
                </p>
                <p className="text-[12px] sm:text-[13px] text-[#64748b] mt-1 font-medium">
                  Enterprise Deployments
                </p>
              </div>
              <div className="h-8 w-px bg-slate-300" />
              <div>
                <p className="text-[22px] sm:text-[26px] font-bold text-[#0a0f18] font-sans leading-none">
                  99.4%
                </p>
                <p className="text-[12px] sm:text-[13px] text-[#64748b] mt-1 font-medium">
                  On-Time Milestone Velocity
                </p>
              </div>
              <div className="h-8 w-px bg-slate-300 hidden sm:block" />
              <div className="hidden sm:block">
                <p className="text-[22px] sm:text-[26px] font-bold text-[#0a0f18] font-sans leading-none">
                  6+
                </p>
                <p className="text-[12px] sm:text-[13px] text-[#64748b] mt-1 font-medium">
                  Global Hubs
                </p>
              </div>
            </div>

          </motion.div>

          {/* Right Visual Element: Interactive System Topology Glass Orb / Network Hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            {/* Main Interactive Glass Node Display */}
            <div className="relative w-full max-w-[480px] sm:max-w-[520px] rounded-[36px] border border-white/80 bg-white/60 p-6 sm:p-8 shadow-[0_25px_70px_rgba(20,50,90,0.08)] backdrop-blur-xl">
              
              {/* Top Bar */}
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#F14F57]" />
                  <span className="h-3 w-3 rounded-full bg-[#f59e0b]" />
                  <span className="h-3 w-3 rounded-full bg-[#10b981]" />
                  <span className="ml-2 text-[11px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                    Ecosystem Topology
                  </span>
                </div>
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-[#2563eb]">
                  Real-Time Synergy
                </span>
              </div>

              {/* Node Visualization Elements */}
              <div className="relative my-6 flex flex-col gap-3.5">
                
                {/* Node 1: Dynamics 365 Core */}
                <div className="flex items-center justify-between rounded-2xl border border-white bg-white/80 p-3.5 shadow-sm transition-all hover:bg-white hover:scale-[1.02]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4E7E1] text-[#1A7A4A] font-bold text-sm">
                      D365
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-[#0a0f18]">
                        Enterprise Core (F&O / BC / CRM)
                      </h4>
                      <p className="text-[11.5px] text-slate-500">
                        Financial ledger, inventory & global operations
                      </p>
                    </div>
                  </div>
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                {/* Node 2: Power Platform & Automations */}
                <div className="flex items-center justify-between rounded-2xl border border-white bg-white/80 p-3.5 shadow-sm transition-all hover:bg-white hover:scale-[1.02]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5BDE2] text-[#F80788] font-bold text-sm">
                      PP
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-[#0a0f18]">
                        Intelligence & Automated Workflows
                      </h4>
                      <p className="text-[11.5px] text-slate-500">
                        Power Apps, Power BI & Copilot AI agents
                      </p>
                    </div>
                  </div>
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                </div>

                {/* Node 3: Azure & Next.js Custom Layer */}
                <div className="flex items-center justify-between rounded-2xl border border-white bg-white/80 p-3.5 shadow-sm transition-all hover:bg-white hover:scale-[1.02]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FBECD7] text-[#FF9810] font-bold text-sm">
                      API
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-[#0a0f18]">
                        Cloud Integrations & Custom Frontends
                      </h4>
                      <p className="text-[11.5px] text-slate-500">
                        Azure Synapse, Data Factory & Next.js portals
                      </p>
                    </div>
                  </div>
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                </div>

              </div>

              {/* Bottom System Status */}
              <div className="rounded-xl bg-slate-900 px-4 py-3 text-white flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-[12px] font-mono text-slate-300">
                    Integration Pipeline Active
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">
                  Zero Data Silos
                </span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
