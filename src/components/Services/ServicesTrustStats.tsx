"use client";

import React from "react";
import { motion } from "motion/react";

const STATS = [
  {
    value: "50+",
    label: "Enterprise Deployments",
    description: "Complex multi-country rollouts across retail, manufacturing, and financial services.",
  },
  {
    value: "99.4%",
    label: "On-Time Milestone Velocity",
    description: "Predictable agile delivery without scope slippage or unbudgeted change requests.",
  },
  {
    value: "$120M+",
    label: "Client Value Unlocked",
    description: "Direct financial gains generated through process automations and streamlined ERP operations.",
  },
  {
    value: "6+",
    label: "Global Hubs",
    description: "Strategically located talent centers in the U.S. and India operating as one unified entity.",
  },
];

export default function ServicesTrustStats() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 sm:py-24 border-y border-[#e2edf9]">
      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20">
        
        {/* Top Header */}
        <div className="text-center max-w-[760px] mx-auto mb-14">
          <p className="text-[11px] sm:text-[12.5px] font-bold uppercase tracking-[0.24em] text-[#2563eb]">
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

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
              className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-[#f8fbff] p-6 sm:p-7 transition-all duration-300 hover:bg-white hover:shadow-lg hover:border-blue-100 hover:-translate-y-1"
            >
              <div>
                <span
                  className="text-[40px] sm:text-[46px] font-sans font-bold leading-none text-[#0a0f18] tracking-tight"
                >
                  {stat.value}
                </span>
                <h4 className="mt-3 text-[16px] sm:text-[17px] font-bold text-[#0a0f18]">
                  {stat.label}
                </h4>
                <p className="mt-2 text-[13px] text-[#64748b] leading-relaxed">
                  {stat.description}
                </p>
              </div>
              <div className="mt-5 h-1 w-8 rounded-full bg-[#2563eb]" />
            </motion.div>
          ))}
        </div>

        {/* Industry Trust Standards & Certifications Bar */}
        <div className="mt-14 rounded-2xl border border-slate-100 bg-slate-50 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-[#2563eb] font-bold">
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
