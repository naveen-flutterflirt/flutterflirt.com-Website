"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { slideFromLeft, slideFromRight } from "@/components/animations/variants";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const milestones = [
  {
    id: "01",
    date: "FEB 2022",
    label: "Inception",
    title: "Inception",
    description:
      "Founded in a small workspace with a singular focus on flawless architecture.",
  },
  {
    id: "02",
    date: "2023 – 2024",
    label: "Expansion",
    title: "Expansion",
    description:
      "First major international deployment. Team grows from 5 to 50.",
  },
  {
    id: "03",
    date: "FEB 2025",
    label: "Milestone",
    title: "Milestone",
    description:
      "Opening of our 5th global office, cementing our presence across two continents.",
  },
  {
    id: "04",
    date: "2025 & BEYOND",
    label: "The Future",
    title: "The Future",
    description:
      "Scaling intelligent solutions. Redefining what enterprise consulting means.",
  },
];

const steps = [
  {
    number: "01",
    title: "Discover",
    subtitle: "Understand your world",
    description:
      "We begin by listening. Deep discovery sessions with stakeholders across all levels—mapping your current state, aspirations, and the gaps in between. No assumptions, only clarity.",
    detail:
      "Our discovery phase involves structured workshops, system audits, and workflow mapping sessions. We document every dependency and constraint so our recommendations are grounded in your actual reality—not a generic playbook.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M18 18L23 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M9 12h6M12 9v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    visual: {
      bg: "from-[#e8f0fe] to-[#dbeafe]",
      accent: "#2563eb",
      label: "Discovery Phase",
      items: ["Stakeholder interviews", "System audit", "Workflow mapping", "Gap analysis"],
    },
  },
  {
    number: "02",
    title: "Architect",
    subtitle: "Design the right solution",
    description:
      "With a full picture in hand, we design a solution architecture that is both technically robust and commercially pragmatic. Every decision is justified, documented, and future-proof.",
    detail:
      "Architecture documents, data flow diagrams, integration blueprints, and cost-benefit analyses. We present multiple approaches with trade-offs clearly laid out so you make informed decisions.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="3" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="16" y="3" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="3" y="16" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="16" y="16" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    visual: {
      bg: "from-[#fdf2f8] to-[#fce7f3]",
      accent: "#db2777",
      label: "Architecture Phase",
      items: ["Solution design", "Integration blueprint", "Tech stack selection", "Cost modelling"],
    },
  },
  {
    number: "03",
    title: "Build",
    subtitle: "Execute with precision",
    description:
      "Our engineers configure, customize, and build. Agile sprints, weekly check-ins, and continuous testing ensure the work matches the spec—and the spec matches reality.",
    detail:
      "Two-week sprints with live demos. Every build includes automated tests, code reviews, and performance benchmarks. You have full visibility into progress at every stage through our client portal.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M8 20L4 24M14 6l8 8-10 10-8-8 10-10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 2l4 4-2 2-4-4 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    visual: {
      bg: "from-[#f0fdf4] to-[#dcfce7]",
      accent: "#16a34a",
      label: "Build Phase",
      items: ["Agile sprints", "Continuous testing", "Code reviews", "Client portal access"],
    },
  },
  {
    number: "04",
    title: "Deploy",
    subtitle: "Launch with confidence",
    description:
      "Go-live is not a gamble—it is a choreographed event. Data migration, parallel runs, cutover planning, and hypercare support ensure a smooth transition with zero business disruption.",
    detail:
      "30-day hypercare post go-live. Dedicated support engineer on-call. Rollback plans prepared. We do not leave until your team is confident and your system is stable.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L14 17M14 3L9 8M14 3L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 17v4a2 2 0 002 2h10a2 2 0 002-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    visual: {
      bg: "from-[#fffbeb] to-[#fef3c7]",
      accent: "#d97706",
      label: "Deploy Phase",
      items: ["Data migration", "Cutover planning", "Parallel runs", "30-day hypercare"],
    },
  },
  {
    number: "05",
    title: "Grow",
    subtitle: "Optimise and scale",
    description:
      "After go-live, we stay. Monitoring, optimisation, training, and iterative improvements compound over time. We grow as your business grows.",
    detail:
      "Quarterly business reviews, SLA-backed managed services, user adoption programmes, and a dedicated success manager. Your system evolves with your ambitions.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 20L10 14L14 18L20 10L24 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 10h4v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    visual: {
      bg: "from-[#f0f9ff] to-[#e0f2fe]",
      accent: "#0284c7",
      label: "Growth Phase",
      items: ["Managed services", "User training", "QBRs", "Continuous optimisation"],
    },
  },
];

const values = [
  {
    icon: "◆",
    title: "Structural Integrity",
    description:
      "Every system we architect is built to last—clean data flows, elegant logic, no technical debt.",
  },
  {
    icon: "◎",
    title: "Client Centricity",
    description:
      "We measure our success by yours. Outcomes, not deliverables, are what we are accountable to.",
  },
  {
    icon: "✦",
    title: "Relentless Precision",
    description:
      "Details matter. From the first discovery session to the final optimisation cycle, nothing is approximate.",
  },
  {
    icon: "♧",
    title: "Long-term Partnership",
    description:
      "We don't implement and leave. We stay, we grow with you, and we share in every milestone.",
  },
];

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

function StepVisual({ step }: { step: typeof steps[0] }) {
  return (
    <motion.div
      key={step.number}
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.97 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className={`h-full w-full rounded-[22px] bg-gradient-to-br ${step.visual.bg} p-8 flex flex-col justify-between`}
    >
      {/* Top label */}
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-bold uppercase tracking-[0.18em]"
          style={{ color: step.visual.accent }}
        >
          {step.visual.label}
        </span>
        <span
          className="text-[48px] font-bold leading-none opacity-[0.08] select-none"
          style={{ color: step.visual.accent }}
        >
          {step.number}
        </span>
      </div>

      {/* Checklist */}
      <div className="mt-6 flex flex-col gap-3">
        {step.visual.items.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.28, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] text-white"
              style={{ backgroundColor: step.visual.accent }}
            >
              ✓
            </span>
            <span className="text-[15px] font-medium text-[#1d2b42]">{item}</span>
          </motion.div>
        ))}
      </div>

      {/* Detail text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.22, duration: 0.35 }}
        className="mt-8 text-[14px] leading-[1.65] text-[#526987]"
      >
        {step.detail}
      </motion.p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */

export default function OurStory() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <main className="bg-[#edf5ff]">

      {/* ════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#eef6ff] px-6 pt-36 pb-24 md:px-12 lg:px-20">
        {/* Radial bg */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(255,255,255,0.9)_0%,#edf6ff_55%,#dceaff_100%)]" />

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

            {/* Left copy */}
            <motion.div
              variants={slideFromLeft}
              initial="hidden"
              animate="visible"
            >
              <p className="mb-6 text-sm font-bold uppercase tracking-[0.22em] text-[#2563eb]">
                Our Story
              </p>

              {/* Bordered headline block — matches reference */}
              <div className="inline-block rounded-[4px] border-[3px] border-[#e040fb] px-4 py-4 mb-8">
                <h1
                  className="font-[family-name:var(--font-bigshot-one)] text-[46px] leading-[0.95] tracking-[-0.03em] text-[#0f1723] md:text-[56px] lg:text-[62px]"
                >
                  Every System We&apos;ve<br />Built Started With One
                </h1>
                <p className="font-[family-name:var(--font-allura)] text-[56px] leading-[1.1] text-[#0f1723] md:text-[66px]">
                  Belief.
                </p>
              </div>

              <p className="max-w-[560px] text-[17px] leading-[1.7] text-[#526987] md:text-[18px]">
                We believe the right technology transforms how businesses
                operate, scale, and compete in an ever-changing world.
              </p>
            </motion.div>

            {/* Right — decorative stat cards */}
            <motion.div
              variants={slideFromRight}
              initial="hidden"
              animate="visible"
              className="hidden lg:grid grid-cols-2 gap-5"
            >
              {[
                { value: "100+", label: "Clients served globally", color: "#2563eb" },
                { value: "250+", label: "Projects delivered on time", color: "#db2777" },
                { value: "6", label: "Global offices", color: "#16a34a" },
                { value: "2022", label: "Founded — and still building", color: "#d97706" },
              ].map((stat) => (
                <div
                  key={stat.value}
                  className="rounded-[20px] border border-[#dce7f4] bg-white/80 p-7 shadow-[0_8px_30px_rgba(40,80,130,0.06)] backdrop-blur-sm"
                >
                  <p
                    className="font-[family-name:var(--font-bigshot-one)] text-[44px] leading-none tracking-[-0.04em]"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-3 text-[13px] leading-[1.4] text-[#7185a2]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          ORIGIN STORY CARD
      ════════════════════════════════════════════════════ */}
      <section className="bg-[#edf5ff] px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-[28px] border border-[#dce7f4] bg-white px-8 py-12 shadow-[0_20px_60px_rgba(40,80,130,0.06)] md:px-12 md:py-14"
          >
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr]">

              {/* Left */}
              <div>
                {/* Compass icon */}
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#e8f0fe] text-[#2563eb]">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <circle cx="13" cy="13" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M13 3v2M13 21v2M3 13h2M21 13h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M16 10l-6 3 3 6 6-3-3-6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                </div>

                <h2 className="text-[28px] font-bold leading-[1.2] text-[#1d2b42] md:text-[32px]">
                  It started as{" "}
                  <span className="font-[family-name:var(--font-allura)] text-[38px] text-[#2563eb] italic">
                    just
                  </span>{" "}
                  an enterprise.
                </h2>

                <p className="mt-5 text-[15px] leading-[1.75] text-[#526987]">
                  In the early days, our mandate was simple: architect a system
                  that didn&apos;t buckle under pressure. We were a small group of
                  specialists, operating out of a single room, obsessing over the
                  structural integrity of data flows and the elegant logic of
                  clean code.
                </p>
              </div>

              {/* Right */}
              <div className="flex flex-col justify-center">
                <p className="text-[15px] leading-[1.75] text-[#526987]">
                  We didn&apos;t call ourselves a consultancy then. We were builders.
                  But as the systems we deployed began to fundamentally shift how
                  our clients operated—saving them millions, unlocking new
                  markets—the word &apos;just&apos; faded away. The enterprise became an
                  ecosystem. And the single room wasn&apos;t enough anymore.
                </p>

                <div className="mt-8 flex items-center gap-6 border-t border-[#e8eef6] pt-7">
                  <div>
                    <p className="text-[32px] font-bold text-[#1d2b42]">4+</p>
                    <p className="mt-1 text-[13px] text-[#7185a2]">Years building</p>
                  </div>
                  <div className="h-10 w-px bg-[#dce7f4]" />
                  <div>
                    <p className="text-[32px] font-bold text-[#1d2b42]">50+</p>
                    <p className="mt-1 text-[13px] text-[#7185a2]">Team members</p>
                  </div>
                  <div className="h-10 w-px bg-[#dce7f4]" />
                  <div>
                    <p className="text-[32px] font-bold text-[#1d2b42]">6</p>
                    <p className="mt-1 text-[13px] text-[#7185a2]">Offices worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          TRAJECTORY — HOW WE GREW
      ════════════════════════════════════════════════════ */}
      <section className="bg-[#edf5ff] px-6 pb-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1400px]">

          {/* Section header */}
          <div className="mb-14 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#2563eb]">
              Trajectory
            </p>
            <h2 className="text-[32px] font-bold text-[#1d2b42] md:text-[36px]">
              How We Grew
            </h2>
            <div className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-[#2563eb]" />
          </div>

          {/* Timeline image strip */}
          <div className="relative overflow-hidden rounded-[24px] shadow-[0_24px_60px_rgba(40,80,130,0.12)]">
            {/* Placeholder hero image — office/team photo */}
            <div className="relative h-[340px] w-full bg-gradient-to-br from-[#1d2b42] to-[#243b55] md:h-[420px]">
              {/* Layered abstract shapes to simulate photo feel */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute left-[8%] top-[20%] h-24 w-24 rounded-full bg-white/5" />
                <div className="absolute right-[12%] top-[30%] h-40 w-40 rounded-full bg-white/5" />
                <div className="absolute left-[35%] bottom-[15%] h-32 w-32 rounded-full bg-white/5" />
                <p className="relative z-10 text-center font-[family-name:var(--font-allura)] text-[52px] text-white/30 md:text-[68px]">
                  FlutterFlirt
                </p>
              </div>
              {/* Dark gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0f1723]/80 to-transparent" />
            </div>

            {/* Milestone strip */}
            <div className="relative grid grid-cols-2 bg-[#0f1723] md:grid-cols-4">
              {milestones.map((m, i) => (
                <div
                  key={m.id}
                  className={`relative px-6 py-7 ${i < milestones.length - 1 ? "border-r border-white/10" : ""}`}
                >
                  {/* Number bubble */}
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[13px] font-bold text-white/80">
                    {m.id}
                  </span>

                  {/* Date */}
                  <p
                    className={`mt-3 text-[10px] font-bold uppercase tracking-[0.18em] ${
                      i === milestones.length - 1
                        ? "text-[#2563eb]"
                        : "text-[#8ba0bb]"
                    }`}
                  >
                    {m.date}
                  </p>

                  {/* Title */}
                  <p className="mt-1 font-[family-name:var(--font-allura)] text-[26px] text-white">
                    {m.title}
                  </p>

                  {/* Description */}
                  <p className="mt-1 text-[13px] leading-[1.55] text-[#7185a2]">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          HOW WE WORK — INTERACTIVE STEPS
      ════════════════════════════════════════════════════ */}
      <section className="bg-white px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1400px]">

          {/* Header */}
          <div className="mb-14">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#2563eb]">
              How We Work
            </p>
            <h2 className="text-[32px] font-bold text-[#1d2b42] md:text-[38px]">
              Our Process
            </h2>
            <p className="mt-3 max-w-[560px] text-[16px] leading-[1.6] text-[#7185a2]">
              A disciplined, repeatable approach that has delivered results across
              100+ engagements — from SMBs to global enterprises.
            </p>
          </div>

          {/* Interactive layout */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[420px_1fr]">

            {/* Left — step selector */}
            <div className="flex flex-col gap-3">
              {steps.map((step, i) => (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(i)}
                  className={`group relative w-full overflow-hidden rounded-[18px] border text-left transition-all duration-300 ${
                    activeStep === i
                      ? "border-[#2563eb]/20 bg-[#f0f6ff] shadow-[0_8px_30px_rgba(37,99,235,0.10)]"
                      : "border-[#e8eef6] bg-white hover:border-[#c5d8f0] hover:bg-[#f8fbff]"
                  }`}
                >
                  {/* Active indicator bar */}
                  <div
                    className={`absolute left-0 top-0 h-full w-1 rounded-l-[18px] transition-all duration-300 ${
                      activeStep === i ? "bg-[#2563eb]" : "bg-transparent"
                    }`}
                  />

                  <div className="flex items-start gap-4 px-5 py-5">
                    {/* Number */}
                    <span
                      className={`mt-0.5 shrink-0 flex h-9 w-9 items-center justify-center rounded-[10px] text-sm font-bold transition-all duration-300 ${
                        activeStep === i
                          ? "bg-[#2563eb] text-white"
                          : "bg-[#eef3fb] text-[#4d6ea8]"
                      }`}
                    >
                      {step.number}
                    </span>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[16px] font-bold transition-colors duration-200 ${
                            activeStep === i ? "text-[#1d2b42]" : "text-[#3d5068]"
                          }`}
                        >
                          {step.title}
                        </span>
                        <span className="text-[12px] text-[#a0b4cc]">—</span>
                        <span className="text-[12px] text-[#7185a2]">
                          {step.subtitle}
                        </span>
                      </div>

                      <p
                        className={`mt-1.5 text-[13px] leading-[1.55] transition-all duration-300 ${
                          activeStep === i
                            ? "max-h-20 text-[#526987] opacity-100"
                            : "max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <motion.span
                      animate={{ x: activeStep === i ? 0 : -4, opacity: activeStep === i ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-1 shrink-0 text-[#2563eb]"
                    >
                      →
                    </motion.span>
                  </div>
                </button>
              ))}
            </div>

            {/* Right — visual panel */}
            <div className="relative min-h-[420px] lg:min-h-0">
              <AnimatePresence mode="wait">
                <StepVisual key={activeStep} step={steps[activeStep]} />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          VALUES
      ════════════════════════════════════════════════════ */}
      <section className="bg-[#edf5ff] px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1400px]">

          <div className="mb-14 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#2563eb]">
              What Drives Us
            </p>
            <h2 className="text-[32px] font-bold text-[#1d2b42] md:text-[36px]">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[22px] border border-[#dce7f4] bg-white p-7 shadow-[0_8px_30px_rgba(40,80,130,0.04)] transition-shadow duration-300 hover:shadow-[0_16px_50px_rgba(40,80,130,0.09)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#e8f0fe] text-[22px] text-[#2563eb]">
                  {v.icon}
                </div>
                <h3 className="text-[17px] font-bold text-[#1d2b42]">{v.title}</h3>
                <p className="mt-3 text-[14px] leading-[1.65] text-[#7185a2]">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          BOTTOM CTA
      ════════════════════════════════════════════════════ */}
      <section className="bg-[#0f1723] px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#2563eb]">
              Ready to start?
            </p>
            <h2 className="max-w-[680px] font-[family-name:var(--font-bigshot-one)] text-[38px] leading-[1.05] tracking-[-0.03em] text-white md:text-[52px]">
              Let&apos;s build something that matters.
            </h2>
            <p className="mt-5 max-w-[480px] text-[16px] leading-[1.65] text-[#7185a2]">
              Tell us where you are. We will tell you how to get where you want to be.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contact"
                className="flex h-[50px] items-center rounded-full bg-[#2563eb] px-8 text-[15px] font-bold text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)] transition-all duration-200 hover:bg-[#1b4fca] hover:shadow-[0_12px_32px_rgba(37,99,235,0.45)] hover:scale-[1.02]"
              >
                Get in touch
              </a>
              <a
                href="/services"
                className="flex h-[50px] items-center rounded-full border border-white/20 px-8 text-[15px] font-bold text-white/80 transition-all duration-200 hover:border-white/40 hover:text-white"
              >
                Explore services →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
