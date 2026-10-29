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
  Database,
  BarChart3,
  Bot,
  Cpu,
  Boxes,
  Briefcase
} from "lucide-react";

interface Product {
  id: string;
  category: "erp" | "crm";
  title: string;
  badge: string;
  tagline: string;
  description: string;
  demoUrl: string; // opens in another tab
  accentColor: string;
  gradientBadge: string;
  keyFeatures: string[];
  metrics: { label: string; value: string }[];
  previewTags: string[];
}

const products: Product[] = [
  {
    id: "flutterflirt-finance-supply-chain-erp",
    category: "erp",
    title: "Dynamics 365 Finance & Operations ERP",
    badge: "Enterprise ERP",
    tagline: "Unify multi-entity financial accounting and global supply chain.",
    description:
      "Enterprise-grade cloud ERP built for mid-market and large enterprises. Centralize general ledgers, automate accounts receivable/payable, track real-time inventory across multi-location warehouses, and comply with international financial reporting standards.",
    demoUrl: "https://demo.flutterflirt.com/erp-finance",
    accentColor: "#2563eb",
    gradientBadge: "from-blue-600 to-indigo-600",
    keyFeatures: [
      "Multi-Currency & Multi-Entity Financial Consolidation",
      "Automated Procurement, PO Approvals & Vendor Portals",
      "AI Inventory Forecasting & Warehouse Lot Tracking",
      "Automated Tax Compliance & Regulatory Auditing"
    ],
    metrics: [
      { label: "Reporting Velocity", value: "3x Faster" },
      { label: "Close Cycle", value: "-45%" }
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
    gradientBadge: "from-sky-600 to-blue-600",
    keyFeatures: [
      "Unified Accounting, Banking & Cash-Flow Projections",
      "End-to-End Order-to-Cash & Quote Generation",
      "Native Outlook & Teams Business Task Integration",
      "Rapid Cloud Deployment & Cost-Effective Scaling"
    ],
    metrics: [
      { label: "Setup Velocity", value: "4 Weeks" },
      { label: "Efficiency Gain", value: "+38%" }
    ],
    previewTags: ["Business Central", "SME Operations", "Cloud Accounting"]
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
    gradientBadge: "from-emerald-600 to-teal-600",
    keyFeatures: [
      "Visual Kanban Sales Funnel & Pipeline Velocity Tracking",
      "360° Omnichannel Client Intelligence & Activity History",
      "AI Smart Follow-up Reminders & Meeting Intelligence",
      "Automated Lead Scoring, Attribution & Commission Tracking"
    ],
    metrics: [
      { label: "Deal Win Rate", value: "+42%" },
      { label: "Lead Response", value: "< 15m" }
    ],
    previewTags: ["Sales Pipeline", "Lead Scoring", "Revenue Ops"]
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
    gradientBadge: "from-teal-600 to-cyan-600",
    keyFeatures: [
      "Intelligent Ticket Routing & SLA Breach Escalation",
      "Mobile Field Dispatch & Real-Time Map Scheduling",
      "Customer Self-Service Support Portal & Knowledge Base",
      "Parts Inventory Consumption & Digital Work Orders"
    ],
    metrics: [
      { label: "First-Time Fix", value: "89%" },
      { label: "Customer CSAT", value: "4.9/5" }
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
    gradientBadge: "from-violet-600 to-purple-600",
    keyFeatures: [
      "Direct IoT Edge Telemetry & Real-Time Sensor Sync",
      "Predictive Machine Maintenance & Downtime Alerts",
      "Automated Work Order Triggers from Machine Telemetry",
      "Cloud Azure IoT Hub & Centralized Telemetry Portals"
    ],
    metrics: [
      { label: "Uptime Increase", value: "+28%" },
      { label: "Downtime Cut", value: "-52%" }
    ],
    previewTags: ["IoT Telemetry", "Manufacturing", "Predictive Maintenance"]
  }
];

export default function OurProductContent() {
  const [activeTab, setActiveTab] = useState<"all" | "erp" | "crm">("all");

  const filteredProducts = activeTab === "all" 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <div className="relative min-h-screen w-full bg-[#eef6ff]">
      {/* Background Gradients */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(100% 75% at 50% 0%, #bad8fb 0%, #cee1fc 25%, #e2edf9 55%, #eef6ff 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-5 bg-[linear-gradient(to_right,#1d4ed808_1px,transparent_1px),linear-gradient(to_bottom,#1d4ed808_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* ════════════════════════════════════════
          HERO HEADER
      ════════════════════════════════════════ */}
      <section className="relative mx-auto max-w-[1440px] px-4 pt-[115px] pb-10 sm:px-8 sm:pt-[135px] sm:pb-12 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-600/20 bg-white/70 px-4 py-1.5 shadow-[0_2px_12px_rgba(37,99,235,0.08)] backdrop-blur-md"
          >
            <Boxes className="h-4 w-4 text-blue-600" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-blue-700 uppercase">
              FlutterFlirt Product Suite
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0f172a] font-serif"
          >
            Enterprise Cloud ERP & Intelligent CRM
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto"
          >
            Compact, high-performance business applications tailored for enterprise scalability. Click below to launch an interactive live demo in a new tab.
          </motion.p>

          {/* Filter Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 flex items-center justify-center gap-2"
          >
            <button
              onClick={() => setActiveTab("all")}
              className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === "all"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 scale-[1.02]"
                  : "bg-white/80 text-slate-700 hover:bg-white border border-slate-200"
              }`}
            >
              All Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab("erp")}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === "erp"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 scale-[1.02]"
                  : "bg-white/80 text-slate-700 hover:bg-white border border-slate-200"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              ERP ({products.filter(p => p.category === "erp").length})
            </button>
            <button
              onClick={() => setActiveTab("crm")}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === "crm"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 scale-[1.02]"
                  : "bg-white/80 text-slate-700 hover:bg-white border border-slate-200"
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              CRM ({products.filter(p => p.category === "crm").length})
            </button>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          5 COMPACT PRODUCT CARDS GRID
      ════════════════════════════════════════ */}
      <section className="relative mx-auto max-w-[1440px] px-4 pb-16 sm:px-8 sm:pb-20 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((prod, index) => {
              const isERP = prod.category === "erp";

              return (
                <motion.article
                  key={prod.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="group relative flex flex-col justify-between rounded-2xl border border-blue-200/80 bg-white/85 p-5 sm:p-6 shadow-[0_8px_24px_rgba(37,99,235,0.05)] backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-blue-400 hover:shadow-[0_16px_36px_rgba(37,99,235,0.12)]"
                >
                  {/* Card Content Top */}
                  <div>
                    {/* Header: Badge & Category Icon */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${prod.gradientBadge} px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-xs`}>
                        {isERP ? <Layers className="h-3 w-3" /> : <Users className="h-3 w-3" />}
                        {prod.badge}
                      </span>

                      <div className="flex flex-wrap gap-1">
                        {prod.previewTags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-blue-50 px-2 py-0.5 text-[10.5px] font-medium text-blue-700 border border-blue-100/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="mt-4 text-lg font-bold text-slate-900 tracking-tight font-serif leading-snug">
                      {prod.title}
                    </h2>

                    {/* Tagline */}
                    <p className="mt-1.5 text-xs font-semibold text-blue-600 leading-normal">
                      {prod.tagline}
                    </p>

                    {/* Description */}
                    <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-slate-600 line-clamp-3">
                      {prod.description}
                    </p>

                    {/* Compact Feature Bullet Points */}
                    <div className="mt-4 border-t border-slate-100 pt-3">
                      <ul className="space-y-1.5">
                        {prod.keyFeatures.slice(0, 3).map((feat) => (
                          <li key={feat} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-blue-600 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Small Metrics Pill */}
                    <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-slate-50/90 border border-slate-100/90 p-2 text-center">
                      {prod.metrics.map((m) => (
                        <div key={m.label} className="px-1 py-0.5">
                          <p className="text-sm font-extrabold text-slate-900 leading-tight">
                            {m.value}
                          </p>
                          <p className="text-[10px] font-medium text-slate-500 mt-0.5">
                            {m.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-5 border-t border-slate-100 pt-3 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-400 font-medium">
                      Live sandbox
                    </span>

                    <a
                      href={prod.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Take Demo</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* ════════════════════════════════════════
          BOTTOM CALL TO ACTION
      ════════════════════════════════════════ */}
      <section className="relative mx-auto max-w-[1440px] px-4 pb-20 sm:px-8 lg:px-12 xl:px-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6 sm:p-10 text-white shadow-xl">
          <div className="relative max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Custom Implementation
            </span>
            <h2 className="mt-2 text-xl sm:text-2xl font-bold font-serif tracking-tight">
              Looking for a tailored ERP or CRM configuration?
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our certified engineering architects and consultants customize workflows, integrate legacy systems, and build bespoke modules tailored specifically to your business.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-blue-500"
              >
                Schedule Consultation
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
