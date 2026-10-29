"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  ExternalLink, 
  Layers, 
  Users, 
  CheckCircle2, 
  ArrowUpRight, 
  ShieldCheck, 
  Boxes,
  Database,
  BarChart3,
  Bot,
  Cpu,
  Radio,
  Zap,
  ArrowRight
} from "lucide-react";

interface Product {
  id: string;
  category: "erp" | "crm";
  title: string;
  badge: string;
  tagline: string;
  description: string;
  demoUrl: string;
  accentColor: string;
  glowColor: string;
  gradientBadge: string;
  iconBg: string;
  icon: React.ComponentType<{ className?: string }>;
  keyFeatures: string[];
  metrics: { label: string; value: string }[];
  previewTags: string[];
}

const products: Product[] = [
  {
    id: "flutterflirt-finance-supply-chain-erp",
    category: "erp",
    title: "Dynamics 365 Finance & Operations",
    badge: "Enterprise ERP",
    tagline: "Unify multi-entity financial accounting and global supply chain.",
    description:
      "Enterprise-grade cloud ERP built for mid-market and global organizations. Centralize general ledgers, automate accounts receivable/payable, track real-time inventory across multi-location warehouses, and comply with international financial reporting standards.",
    demoUrl: "https://demo.flutterflirt.com/erp-finance",
    accentColor: "#2563eb",
    glowColor: "rgba(37, 99, 235, 0.22)",
    gradientBadge: "from-blue-600 to-indigo-600",
    iconBg: "bg-blue-50 text-blue-600 border-blue-200/60",
    icon: Database,
    keyFeatures: [
      "Multi-Currency & Multi-Entity Ledger Consolidation",
      "Automated Procurement & AI Supplier Invoicing",
      "Real-time Multi-Warehouse Lot & Serial Tracking"
    ],
    metrics: [
      { label: "Close Cycle", value: "-45%" },
      { label: "Reporting", value: "3x Faster" }
    ],
    previewTags: ["Finance", "Supply Chain", "Global ERP"]
  },
  {
    id: "flutterflirt-business-central-erp",
    category: "erp",
    title: "Dynamics 365 Business Central",
    badge: "SME Cloud ERP",
    tagline: "Agile, modern business management engineered for growing companies.",
    description:
      "The right-sized all-in-one ERP that scales with your growth. Seamlessly connects sales, purchasing, inventory, manufacturing, and customer service with out-of-the-box Microsoft 365, Teams, and Excel workflows.",
    demoUrl: "https://demo.flutterflirt.com/business-central",
    accentColor: "#0284c7",
    glowColor: "rgba(2, 132, 199, 0.22)",
    gradientBadge: "from-sky-600 to-blue-600",
    iconBg: "bg-sky-50 text-sky-600 border-sky-200/60",
    icon: BarChart3,
    keyFeatures: [
      "Unified Accounting, Banking & Cash Projections",
      "Automated Order-to-Cash & Quote Generation",
      "Native Outlook & Teams Task Automation"
    ],
    metrics: [
      { label: "Go-Live", value: "4 Weeks" },
      { label: "Efficiency", value: "+38%" }
    ],
    previewTags: ["Business Central", "SME Operations", "Cloud"]
  },
  {
    id: "flutterflirt-sales-marketing-crm",
    category: "crm",
    title: "Customer Engagement & Sales CRM",
    badge: "Intelligent Sales Suite",
    tagline: "Accelerate pipeline velocity and close deals with actionable AI insights.",
    description:
      "Empower your revenue teams with visual Kanban deal stages, 360° prospect profiles, automated email cadences, and predictive deal scoring. Transform prospects into long-term loyal clients with zero friction.",
    demoUrl: "https://demo.flutterflirt.com/sales-crm",
    accentColor: "#059669",
    glowColor: "rgba(5, 150, 105, 0.22)",
    gradientBadge: "from-emerald-600 to-teal-600",
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
    icon: Users,
    keyFeatures: [
      "Visual Kanban Sales Funnel & Deal Velocity",
      "360° Client Omnichannel Activity History",
      "Predictive Lead Scoring & Smart Follow-ups"
    ],
    metrics: [
      { label: "Win Rate", value: "+42%" },
      { label: "Response", value: "< 15m" }
    ],
    previewTags: ["Sales Pipeline", "Lead Scoring", "RevOps"]
  },
  {
    id: "flutterflirt-service-field-crm",
    category: "crm",
    title: "Field Service & Support CRM",
    badge: "Service & Dispatch",
    tagline: "Deliver responsive customer support and optimize mobile field dispatch.",
    description:
      "Bridge customer support inquiries with field service operations. Automate ticket routing, schedule mobile technicians using intelligent dispatch maps, track service SLAs, and manage customer warranties seamlessly.",
    demoUrl: "https://demo.flutterflirt.com/field-service",
    accentColor: "#0d9488",
    glowColor: "rgba(13, 148, 136, 0.22)",
    gradientBadge: "from-teal-600 to-cyan-600",
    iconBg: "bg-teal-50 text-teal-600 border-teal-200/60",
    icon: Bot,
    keyFeatures: [
      "Smart Ticket Routing & Automated SLA Escalations",
      "Mobile Technician Dispatch & Live GPS Mapping",
      "Customer Self-Service Support & Parts Portal"
    ],
    metrics: [
      { label: "First-Fix Rate", value: "89%" },
      { label: "CSAT Score", value: "4.9/5" }
    ],
    previewTags: ["Field Service", "Helpdesk", "Dispatch"]
  },
  {
    id: "flutterflirt-bizbox-connected-erp",
    category: "erp",
    title: "BizBox IoT & Smart Manufacturing ERP",
    badge: "Connected Industry ERP",
    tagline: "Real-time edge telemetry and hardware telemetry integrated into ERP.",
    description:
      "Our specialized connected enterprise platform combining IoT shop-floor telemetry, machine uptime tracking, and predictive maintenance directly with your ERP inventory and supply chain backbones.",
    demoUrl: "https://demo.flutterflirt.com/bizbox-erp",
    accentColor: "#7c3aed",
    glowColor: "rgba(124, 58, 237, 0.22)",
    gradientBadge: "from-violet-600 to-purple-600",
    iconBg: "bg-purple-50 text-purple-600 border-purple-200/60",
    icon: Cpu,
    keyFeatures: [
      "Real-Time Edge Sensor & Shop Floor Telemetry",
      "Predictive Machine Maintenance Alerts & Logs",
      "Direct ERP Work Order Generation from Telemetry"
    ],
    metrics: [
      { label: "Uptime Boost", value: "+28%" },
      { label: "Downtime Cut", value: "-52%" }
    ],
    previewTags: ["IoT Telemetry", "Smart Factory", "Azure IoT"]
  }
];

export default function OurProductContent() {
  const [activeTab, setActiveTab] = useState<"all" | "erp" | "crm">("all");

  const filteredProducts = activeTab === "all" 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#eef6ff]">
      {/* ════════════════════════════════════════════════════════════════
          FLOATING ANIMATED GRADIENT ORBS (WHOLE PAGE AMBIENCE)
      ════════════════════════════════════════════════════════════════ */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Soft Radial Foundation */}
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(90% 70% at 50% 0%, #bad8fb 0%, #d5e6fd 25%, #e8f1fc 50%, #eef6ff 100%)",
          }}
        />

        {/* Ambient Subtle Grid Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563eb07_1px,transparent_1px),linear-gradient(to_bottom,#2563eb07_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Floating Gradient Orb 1 (Top Left Electric Blue) */}
        <motion.div
          animate={{
            x: [0, 45, -30, 0],
            y: [0, -35, 25, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-blue-400/35 via-indigo-300/25 to-sky-200/20 blur-[110px]"
        />

        {/* Floating Gradient Orb 2 (Top Right Cyan / Purple) */}
        <motion.div
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 -right-28 h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-sky-400/30 via-indigo-400/20 to-purple-300/20 blur-[120px]"
        />

        {/* Floating Gradient Orb 3 (Mid-Page Center Emerald / Blue) */}
        <motion.div
          animate={{
            x: [0, 30, -40, 0],
            y: [0, -25, 35, 0],
            scale: [0.95, 1.1, 0.9, 0.95],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[45%] left-[20%] h-[600px] w-[600px] rounded-full bg-gradient-to-r from-blue-300/20 via-teal-300/15 to-indigo-200/20 blur-[140px]"
        />

        {/* Floating Gradient Orb 4 (Bottom Right Royal Indigo) */}
        <motion.div
          animate={{
            x: [0, -35, 25, 0],
            y: [0, 30, -35, 0],
            scale: [1, 1.12, 0.98, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 right-[-10%] h-[650px] w-[650px] rounded-full bg-gradient-to-tl from-indigo-400/25 via-blue-500/20 to-sky-300/15 blur-[130px]"
        />
      </div>

      {/* ════════════════════════════════════════════════════════════════
          HERO SECTION (RESPONSIVE FOR MOBILE / TAB / DESKTOP)
      ════════════════════════════════════════════════════════════════ */}
      <section className="relative mx-auto max-w-[1440px] px-4 pt-[115px] pb-8 sm:px-8 sm:pt-[135px] sm:pb-12 md:px-10 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-4xl text-center">
          
          {/* Glass Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-white/75 px-4 py-1.5 shadow-[0_4px_16px_rgba(37,99,235,0.08)] backdrop-blur-xl"
          >
            <Boxes className="h-4 w-4 text-blue-600" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-blue-800 uppercase">
              FlutterFlirt Product Suite
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0f172a] font-serif leading-[1.12]"
          >
            Enterprise Cloud ERP & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
              Intelligent CRM Suite
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal px-2"
          >
            High-performance modular enterprise applications built for agility and seamless scale. Launch an interactive live demo to explore full system capabilities.
          </motion.p>

          {/* Filter Pills with Glass Effect */}
          <motion.div 
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            <button
              onClick={() => setActiveTab("all")}
              className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "all"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-[1.03]"
                  : "bg-white/80 text-slate-700 hover:bg-white border border-slate-200/90 shadow-xs"
              }`}
            >
              All Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab("erp")}
              className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "erp"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-[1.03]"
                  : "bg-white/80 text-slate-700 hover:bg-white border border-slate-200/90 shadow-xs"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              ERP Systems ({products.filter(p => p.category === "erp").length})
            </button>
            <button
              onClick={() => setActiveTab("crm")}
              className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "crm"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-[1.03]"
                  : "bg-white/80 text-slate-700 hover:bg-white border border-slate-200/90 shadow-xs"
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              CRM Suites ({products.filter(p => p.category === "crm").length})
            </button>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          5 PREMIUM COMPACT PRODUCT CARDS GRID (FULLY RESPONSIVE)
      ════════════════════════════════════════════════════════════════ */}
      <section className="relative mx-auto max-w-[1440px] px-4 pb-16 sm:px-6 md:px-10 lg:px-14 xl:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 xl:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((prod, index) => {
              const isERP = prod.category === "erp";
              const IconComponent = prod.icon;

              return (
                <motion.article
                  key={prod.id}
                  layout
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-white/70 bg-white/75 p-6 sm:p-7 shadow-[0_10px_30px_rgba(37,99,235,0.06),0_1px_3px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-400/80 hover:bg-white/90 hover:shadow-[0_20px_45px_rgba(37,99,235,0.14)]"
                >
                  {/* Subtle Top-Right Ambient Inner Glow */}
                  <div 
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-2xl opacity-20 transition-opacity duration-300 group-hover:opacity-40"
                    style={{ backgroundColor: prod.accentColor }}
                  />

                  {/* Card Content Upper */}
                  <div>
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between gap-3">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border shadow-xs transition-transform duration-300 group-hover:scale-105 ${prod.iconBg}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>

                      <span className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${prod.gradientBadge} px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-xs`}>
                        {isERP ? <Layers className="h-3 w-3" /> : <Users className="h-3 w-3" />}
                        {prod.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="mt-5 text-xl font-bold text-[#0f172a] tracking-tight font-serif leading-snug group-hover:text-blue-700 transition-colors duration-200">
                      {prod.title}
                    </h2>

                    {/* Tagline */}
                    <p className="mt-1.5 text-xs font-semibold text-blue-600/95 leading-normal">
                      {prod.tagline}
                    </p>

                    {/* Description */}
                    <p className="mt-3 text-xs sm:text-[13px] leading-relaxed text-slate-600 line-clamp-3">
                      {prod.description}
                    </p>

                    {/* Preview Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {prod.previewTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg bg-blue-50/90 px-2.5 py-0.5 text-[11px] font-medium text-blue-700 border border-blue-100/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Compact Feature Bullet Points */}
                    <div className="mt-4.5 border-t border-slate-100/90 pt-3.5">
                      <ul className="space-y-2">
                        {prod.keyFeatures.map((feat) => (
                          <li key={feat} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-blue-600 mt-0.5" />
                            <span className="line-clamp-1 font-normal">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Performance Metrics Pill */}
                    <div className="mt-4.5 grid grid-cols-2 gap-2 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50/40 border border-slate-100 p-2.5 text-center">
                      {prod.metrics.map((m) => (
                        <div key={m.label} className="px-1 py-0.5">
                          <p className="text-sm font-extrabold text-slate-900 leading-tight">
                            {m.value}
                          </p>
                          <p className="text-[10.5px] font-medium text-slate-500 mt-0.5">
                            {m.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-[11.5px] text-slate-400 font-medium">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Live Sandbox</span>
                    </div>

                    <a
                      href={prod.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-blue-600/20 transition-all duration-200 hover:shadow-md hover:shadow-blue-600/30 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                    >
                      <span>Take Demo</span>
                      <ExternalLink className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          ELEGANT BOTTOM BANNER / CONSULTATION CTA (FULLY RESPONSIVE)
      ════════════════════════════════════════════════════════════════ */}
      <section className="relative mx-auto max-w-[1440px] px-4 pb-24 sm:px-6 md:px-10 lg:px-14 xl:px-20">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0c1322] via-[#162238] to-[#0c1322] p-7 sm:p-10 md:p-12 lg:p-14 text-white shadow-2xl border border-white/10">
          {/* Subtle Ambient Radial Highlight */}
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-indigo-600/15 blur-3xl" />

          <div className="relative max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400">
              <Zap className="h-3.5 w-3.5 text-blue-400" />
              Custom Enterprise Architecture
            </span>

            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold font-serif tracking-tight leading-snug">
              Looking for a tailored ERP or CRM configuration?
            </h2>

            <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
              Our certified engineering architects and consultants customize workflows, integrate legacy systems, and build bespoke modules tailored specifically to your business operations.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98]"
              >
                Schedule Architecture Consultation
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-xs sm:text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
              >
                Explore Consulting Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
