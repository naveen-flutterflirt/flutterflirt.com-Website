"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

const PROCESS_STEPS = [
  {
    step: "01",
    phase: "ASSESS",
    title: "Discovery & Value-Stream Blueprinting",
    description:
      "We audit your legacy architecture, interview operational stakeholders, and identify systemic friction points to architect a de-risked transition roadmap with clear ROI benchmarks.",
    deliverables: [
      "Current-state architectural audit & gap analysis",
      "Process optimization & value-stream mapping",
      "Target-state solution design & licensing strategy",
      "Comprehensive fixed-scope milestone timeline",
    ],
    duration: "Week 1 - 3",
  },
  {
    step: "02",
    phase: "BUILD",
    title: "Sprint Delivery & Modern Engineering",
    description:
      "Our senior engineering pods execute iterative two-week agile sprints, configuring core ERP/CRM schemas, building custom extensions, and automating business logic with zero compromise on code quality.",
    deliverables: [
      "Core Dynamics 365 & Power Platform configuration",
      "Custom AL & Next.js extension development",
      "Automated testing suites & code quality gates",
      "Weekly working software demos for stakeholder feedback",
    ],
    duration: "Week 4 - 12",
  },
  {
    step: "03",
    phase: "INTEGRATE",
    title: "Unified Data Fabric & Zero-Downtime Cutover",
    description:
      "We orchestrate resilient Azure Data Factory ETL pipelines, secure API gateways, and data migrations to synchronize legacy databases with the new cloud core seamlessly.",
    deliverables: [
      "High-throughput Azure ETL & Event Hub pipelines",
      "Legacy data sanitization, mapping & dry-run cuts",
      "End-to-end user acceptance testing (UAT)",
      "Zero-downtime weekend production cutover",
    ],
    duration: "Week 13 - 16",
  },
  {
    step: "04",
    phase: "SUPPORT",
    title: "Hypercare, Optimization & Continuous Scale",
    description:
      "We provide 24/7 post-launch hypercare, telemetry monitoring, role-based user training, and ongoing sprint pods to ensure high adoption and continuous feature evolution.",
    deliverables: [
      "Dedicated 24/7 go-live hypercare engineering team",
      "Role-based end-user training via D365 Academy",
      "Proactive cloud telemetry & performance tuning",
      "Quarterly executive roadmap reviews & AI upgrades",
    ],
    duration: "Post Go-Live",
  },
];

export default function ProcessMethodology() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#dfeaf3] via-[#ecf4fe] to-[#ffffff] py-16 sm:py-24 lg:py-32">
      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20">
        
        {/* Section Header */}
        <div className="text-center max-w-[840px] mx-auto mb-14 sm:mb-20">
          <p className="text-[11px] sm:text-[12.5px] font-bold uppercase tracking-[0.24em] text-[#2563eb]">
            CLIENT ENGAGEMENT APPROACH
          </p>
          <h2
            className="mt-2 text-[32px] sm:text-[42px] md:text-[48px] font-normal leading-[1.08] tracking-[-0.03em] text-[#0a0f18]"
            style={{ fontFamily: "var(--font-bigshot-one), Georgia, serif" }}
          >
            How We Deliver{" "}
            <span
              className="text-[1.12em] font-normal text-[#F14F57] inline-block select-none"
              style={{ fontFamily: "var(--font-allura), cursive" }}
            >
              Predictable
            </span>{" "}
            Outcomes.
          </h2>
          <p className="mt-4 text-[15px] sm:text-[17px] text-[#475569] leading-relaxed font-normal">
            A disciplined, 4-stage engagement methodology refined across dozens of enterprise cutovers—engineered to eliminate budget surprises, minimize disruption, and accelerate time-to-value.
          </p>
        </div>

        {/* Process Timeline Bar & Steps */}
        <div className="relative mx-auto max-w-[1240px]">
          
          {/* Top Horizontal Step Selector Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStep(idx)}
                  className={`group relative flex flex-col items-start rounded-2xl p-4 sm:p-5 text-left transition-all duration-300 ${
                    isActive
                      ? "bg-[#0a0f18] text-white shadow-xl shadow-slate-900/10 scale-[1.02]"
                      : "bg-white/80 text-slate-700 hover:bg-white hover:shadow-md border border-white"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-[#2563eb] text-white"
                          : "bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-[#2563eb]"
                      }`}
                    >
                      {step.phase}
                    </span>
                    <span className="text-[20px] sm:text-[24px] font-sans font-bold opacity-30">
                      {step.step}
                    </span>
                  </div>
                  <h4 className="text-[14px] sm:text-[15px] font-bold leading-snug line-clamp-2">
                    {step.title}
                  </h4>
                  <span className="text-[11px] opacity-70 mt-2 font-mono">
                    {step.duration}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Step Deep-Dive Showcase Card */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-[32px] border border-white/90 bg-white/90 p-6 sm:p-10 md:p-12 shadow-[0_20px_60px_rgba(20,50,90,0.06)] backdrop-blur-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 sm:gap-12 items-center">
              
              {/* Left Details */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-[11px] font-bold text-[#2563eb] mb-3 uppercase tracking-wider">
                  Phase {PROCESS_STEPS[activeStep].step} • {PROCESS_STEPS[activeStep].phase}
                </div>

                <h3
                  className="text-[26px] sm:text-[32px] md:text-[36px] font-bold text-[#0a0f18] leading-tight"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  {PROCESS_STEPS[activeStep].title}
                </h3>

                <p className="mt-4 text-[14.5px] sm:text-[16px] text-[#475569] leading-relaxed">
                  {PROCESS_STEPS[activeStep].description}
                </p>

                {/* Key Deliverables Bulleted */}
                <div className="mt-6 space-y-2.5">
                  <p className="text-[12px] font-bold uppercase tracking-wider text-slate-900">
                    Phase Deliverables & Milestones:
                  </p>
                  {PROCESS_STEPS[activeStep].deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-[13.5px] text-slate-700">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-white text-[10px] font-bold">
                        ✓
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Methodology Guarantee Stat Box */}
              <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/80 to-slate-50/80 p-6 sm:p-8 flex flex-col justify-between h-full">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#2563eb]">
                    The FlutterFlirt Assurance
                  </p>
                  <h4 className="mt-2 text-[20px] font-bold text-[#0a0f18]">
                    Zero Scope Drift. 100% Accountability.
                  </h4>
                  <p className="mt-3 text-[13px] text-slate-600 leading-relaxed">
                    Our fixed-iteration milestones and senior-led pods ensure that what gets architected during Discovery is what goes live on Cutover day—on time and on budget.
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-blue-200/60 flex items-center justify-between">
                  <div>
                    <span className="text-[28px] font-sans font-bold text-[#0a0f18] leading-none">
                      100%
                    </span>
                    <p className="text-[11.5px] text-slate-500 mt-0.5">
                      Senior Pod Staffing
                    </p>
                  </div>
                  <div className="h-8 w-px bg-blue-200" />
                  <div>
                    <span className="text-[28px] font-sans font-bold text-[#2563eb] leading-none">
                      0
                    </span>
                    <p className="text-[11.5px] text-slate-500 mt-0.5">
                      Unplanned Downtime Hours
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
