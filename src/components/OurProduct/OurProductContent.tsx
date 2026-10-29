"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  ExternalLink, 
  Layers, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  Database,
  BarChart3,
  Bot,
  Workflow
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
    id: "flutterflirt-erp",
    category: "erp",
    title: "FlutterFlirt Enterprise ERP",
    badge: "Enterprise Resource Planning",
    tagline: "Unify finance, supply chain, and global manufacturing operations in real time.",
    description:
      "A next-generation modular cloud ERP designed to eliminate business data silos. Seamlessly orchestrate automated procurement, multi-entity accounting, warehouse telemetry, and compliance reporting in one unified command center.",
    demoUrl: "https://demo.flutterflirt.com/erp", // Change to your live ERP demo link
    accentColor: "#2563eb",
    gradientBadge: "from-blue-600 to-indigo-600",
    keyFeatures: [
      "Real-time Financial Ledger & Multi-Currency Settlement",
      "Automated Inventory, Lot Tracking & Warehouse Logistics",
      "AI-Powered Demand Forecasting & Procurement Triggers",
      "End-to-End Compliance, GST/VAT & Regulatory Auditing",
      "Seamless Integration with Microsoft Dynamics & Azure"
    ],
    metrics: [
      { label: "Deployment Velocity", value: "3x Faster" },
      { label: "Reconciliation Time", value: "-68%" },
      { label: "Uptime SLA", value: "99.98%" }
    ],
    previewTags: ["Finance", "Supply Chain", "Procurement", "Analytics"]
  },
  {
    id: "flutterflirt-crm",
    category: "crm",
    title: "FlutterFlirt Customer Engagement CRM",
    badge: "Intelligent CRM & CX Suite",
    tagline: "Accelerate pipeline velocity and elevate omnichannel client relationships.",
    description:
      "Engineered for high-performing sales, customer support, and marketing teams. Empower your organization with intelligent deal pipelines, 360° contact intelligence, automated follow-up cadences, and predictive customer lifetime analytics.",
    demoUrl: "https://demo.flutterflirt.com/crm", // Change to your live CRM demo link
    accentColor: "#059669",
    gradientBadge: "from-emerald-600 to-teal-600",
    keyFeatures: [
      "Visual Kanban Pipeline & Automated Deal Scoring",
      "360° Omnichannel Client Profile & Activity Timeline",
      "AI-Assisted Email Follow-ups & Smart Meeting Summaries",
      "Field Service Ticketing, SLA Alerts & Live Dispatch",
      "Custom Workflow Automation & Bi-directional ERP Sync"
    ],
    metrics: [
      { label: "Lead Conversion Rate", value: "+42%" },
      { label: "Response Velocity", value: "10 mins" },
      { label: "Customer Retention", value: "94%" }
    ],
    previewTags: ["Sales Pipeline", "Omnichannel Service", "Field Service", "Automation"]
  }
];

export default function OurProductContent() {
  const [activeTab, setActiveTab] = useState<"all" | "erp" | "crm">("all");

  const filteredProducts = activeTab === "all" 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <div className="relative min-h-screen w-full bg-[#eef6ff]">
      {/* Dynamic Ambient Background */}
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
      <section className="relative mx-auto max-w-[1440px] px-6 pt-[120px] pb-12 sm:px-10 sm:pt-[140px] sm:pb-16 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-600/20 bg-white/70 px-4 py-1.5 shadow-[0_2px_12px_rgba(37,99,235,0.08)] backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-blue-700 uppercase">
              FlutterFlirt Product Suite
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0f172a] font-serif"
          >
            Built for Modern Business. <br />
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
              Engineered to Scale.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto"
          >
            Explore our flagship Enterprise Resource Planning (ERP) and Customer Relationship Management (CRM) solutions. Launch an interactive live demo in a new tab to see how they transform day-to-day operations.
          </motion.p>

          {/* Filter Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex items-center justify-center gap-2 sm:gap-3"
          >
            <button
              onClick={() => setActiveTab("all")}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                activeTab === "all"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-[1.02]"
                  : "bg-white/80 text-slate-700 hover:bg-white border border-slate-200"
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setActiveTab("erp")}
              className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                activeTab === "erp"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-[1.02]"
                  : "bg-white/80 text-slate-700 hover:bg-white border border-slate-200"
              }`}
            >
              <Layers className="h-4 w-4" />
              ERP System
            </button>
            <button
              onClick={() => setActiveTab("crm")}
              className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                activeTab === "crm"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-[1.02]"
                  : "bg-white/80 text-slate-700 hover:bg-white border border-slate-200"
              }`}
            >
              <Users className="h-4 w-4" />
              CRM Suite
            </button>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PRODUCT CARDS SECTION
      ════════════════════════════════════════ */}
      <section className="relative mx-auto max-w-[1440px] px-6 pb-20 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((prod, index) => {
              const isERP = prod.category === "erp";

              return (
                <motion.article
                  key={prod.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-blue-200/70 bg-white/80 p-8 sm:p-10 shadow-[0_16px_40px_rgba(37,99,235,0.06)] backdrop-blur-xl transition-all duration-300 hover:border-blue-400 hover:shadow-[0_24px_60px_rgba(37,99,235,0.14)]"
                >
                  {/* Top Ambient Highlight Gradient */}
                  <div 
                    className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl opacity-30 transition-opacity duration-300 group-hover:opacity-50"
                    style={{ backgroundColor: prod.accentColor }}
                  />

                  {/* Header Area */}
                  <div>
                    {/* Badge & Tags */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${prod.gradientBadge} px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm`}>
                        {isERP ? <Layers className="h-3.5 w-3.5" /> : <Users className="h-3.5 w-3.5" />}
                        {prod.badge}
                      </span>

                      <div className="flex flex-wrap items-center gap-1.5">
                        {prod.previewTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-blue-50/80 px-2.5 py-0.5 text-[11.5px] font-medium text-blue-700 border border-blue-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <h2 className="mt-6 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-serif">
                      {prod.title}
                    </h2>
                    <p className="mt-2 text-sm sm:text-base font-semibold text-blue-700">
                      {prod.tagline}
                    </p>

                    <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-slate-600">
                      {prod.description}
                    </p>

                    {/* Feature Checklist */}
                    <div className="mt-6 space-y-2.5 border-t border-slate-100 pt-6">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Capabilities & Capabilities
                      </h3>
                      <ul className="space-y-2 pt-1">
                        {prod.keyFeatures.map((feat) => (
                          <li key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Performance Metrics */}
                    <div className="mt-7 grid grid-cols-3 gap-2 rounded-2xl bg-slate-50/90 border border-slate-100 p-3 sm:p-4 text-center">
                      {prod.metrics.map((m) => (
                        <div key={m.label} className="p-1">
                          <p className="text-base sm:text-xl font-extrabold text-slate-900">
                            {m.value}
                          </p>
                          <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                            {m.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions / Demo Button */}
                  <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      <span>Instant sandbox access · No installation required</span>
                    </div>

                    <a
                      href={prod.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Take Demo View</span>
                      <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
      <section className="relative mx-auto max-w-[1440px] px-6 pb-24 sm:px-10 lg:px-16 xl:px-20">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
          <div className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
          
          <div className="relative max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Custom Enterprise Deployment
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-bold font-serif tracking-tight">
              Need a tailored ERP or CRM implementation?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Our certified engineering architects and consultants customize workflows, integrate legacy systems, and build bespoke modules tailored specifically to your organizational structure.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98]"
              >
                Schedule Architecture Consultation
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
              >
                Explore Consulting Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
