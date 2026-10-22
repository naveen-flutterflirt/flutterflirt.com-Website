"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import {
  CreditCard,
  ShoppingCart,
  Package,
  Users,
  Receipt,
  Headphones,
  Cpu,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Store,
  Truck,
  Wrench,
  Radio,
  Building2,
  ChevronDown,
  Sparkles,
  Lock,
  Network,
  ClipboardList,
  Layers,
  Check,
  Server,
  Zap,
  Play,
  Settings,
  RotateCcw,
} from "lucide-react";

export default function BizboxContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleReplayVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => { });
      setIsVideoEnded(false);
    }
  };

  const modules = [
    {
      code: "POS-01",
      title: "Point of Sale (POS)",
      desc: "Fast billing at the counter with live barcode lookup, instant discounts, and split payments. Every transaction synchronizes warehouse stock and financial ledgers without latency.",
      tags: ["Barcode Lookup", "Split Payments", "Offline Sync"],
      metric: "< 2s",
      metricLabel: "Checkout speed",
      icon: CreditCard,
    },
    {
      code: "INV-02",
      title: "Inventory & Stock",
      desc: "Live stock tracking across multi-location warehouses, retail outlets, and distribution transit hubs. Automated re-order triggers, batch transfers, and shrinkage reports.",
      tags: ["Multi-Location", "Batch & Expiry", "Stock Alerts"],
      metric: "100%",
      metricLabel: "Audit visibility",
      icon: Package,
    },
    {
      code: "CRM-03",
      title: "Customers (CRM)",
      desc: "A unified single source of truth for customer history, billing records, recurring service tickets, warranty contracts, and lifetime loyalty telemetry in one searchable workspace.",
      tags: ["360° Profile", "Service Records", "Contract History"],
      metric: "Single",
      metricLabel: "Customer record",
      icon: Users,
    },
    {
      code: "BIL-04",
      title: "Billing & Invoicing",
      desc: "Automated GST-compliant e-invoicing, recurring contracts, subscription cycles, and payment gateway reconciliations. Converts usage telemetry into invoices with zero manual spreadsheets.",
      tags: ["GST Compliant", "Recurring Cycles", "Auto-Reconcile"],
      metric: "0",
      metricLabel: "Spreadsheet hours",
      icon: Receipt,
    },
    {
      code: "SRV-05",
      title: "Service & Tickets",
      desc: "Raise, assign, and SLA-track technical service requests from customer intake to field engineer dispatch. Engineers receive complete equipment schematics and asset history on-site.",
      tags: ["SLA Tracking", "Field Dispatch", "Asset Context"],
      metric: "4x",
      metricLabel: "Faster resolution",
      icon: Headphones,
    },
    {
      code: "IOT-06",
      title: "Device & Asset Management",
      desc: "Telemetric dashboard for remote connected assets—EV chargers, automated dispensers, sensors, and edge IoT gateways. Monitors runtime telemetry, anomaly alarms, and predictive failures.",
      tags: ["Telemetry Alarms", "Predictive Maint.", "IoT Gateways"],
      metric: "24/7",
      metricLabel: "Real-time telemetry",
      icon: Cpu,
    },
    {
      code: "RPT-07",
      title: "Reports & Executive Dashboards",
      desc: "Live visibility into regional sales, stock turnaround, collections velocity, and branch performance with role-based dashboard widgets exportable to BI pipelines.",
      tags: ["Executive Views", "Branch P&L", "BI Export"],
      metric: "Live",
      metricLabel: "Consolidated views",
      icon: BarChart3,
    },
  ];

  const securityFeatures = [
    {
      title: "Individual Verified Access",
      desc: "Unique credentials, 2FA support, and enterprise SSO integration ensure zero shared passwords across cashier counters or branches.",
      icon: Lock,
    },
    {
      title: "Granular Role Governance (RBAC)",
      desc: "Segmented permissions for owners, store managers, cashiers, technicians, and auditors. Every user views only their exact authorized scope.",
      icon: ShieldCheck,
    },
    {
      title: "Autonomous Branch Architecture",
      desc: "Outlets operate autonomously with local caching during disruptions while head office maintains synchronized real-time oversight.",
      icon: Network,
    },
    {
      title: "Immutable Activity Ledger",
      desc: "Complete audit trails log who modified prices, dispatched inventory, voided bills, or approved credits with timestamps and IP records.",
      icon: ClipboardList,
    },
  ];

  const targetIndustries = [
    {
      title: "Retail & Outlets",
      desc: "High-speed POS billing, unified inventory, customer rewards, and centralized multi-store management.",
      image: "/bizbox/industries/retail.png",
      cardImage: "/bizbox/industries/retail-card.png",
      icon: Store,
    },
    {
      title: "Distributors & Wholesalers",
      desc: "Regional stock distribution, wholesale credit limits, purchase orders, and multi-tier dealer billing.",
      image: "/bizbox/industries/wholesale.png",
      cardImage: "/bizbox/industries/wholesale-card.png",
      icon: Truck,
    },
    {
      title: "Service & Field Operations",
      desc: "Ticketing pipelines, technician scheduling, AMC contracts, and on-site service documentation.",
      image: "/bizbox/industries/field-service.png",
      cardImage: "/bizbox/industries/service-card.png",
      icon: Wrench,
    },
    {
      title: "Smart Hardware & Connected Ops",
      desc: "Real-time device monitoring, usage metering, telemetric alerts, and remote maintenance triggers.",
      image: "/bizbox/industries/smart-hardware.png",
      cardImage: "/bizbox/industries/hardware-card.png",
      icon: Radio,
    },
    {
      title: "Multi-City Growing Enterprises",
      desc: "One central ERP backbone replacing disconnected legacy software as you expand into new territories.",
      image: "/bizbox/industries/multicity.png",
      cardImage: "/bizbox/industries/multicity-card.png",
      icon: Building2,
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Select Modules",
      desc: "Choose only the applications your operations demand today—add more as you grow.",
    },
    {
      num: "02",
      title: "Configure & Seed",
      desc: "Import master catalogues, assign branch hierarchies, and define role-based access rules.",
    },
    {
      num: "03",
      title: "Operate",
      desc: "Transact at counters, process orders, dispatch technicians, and monitor live telemetry.",
    },
    {
      num: "04",
      title: "Scale",
      desc: "Seamlessly provision new outlets, regional warehouses, and connected devices without downtime.",
    },
  ];

  const whyBizbox = [
    {
      title: "Single Unified Database",
      desc: "POS, warehouse, CRM, and accounting share one live datastore—eliminating sync delays and duplicate entries.",
    },
    {
      title: "True Modular Scalability",
      desc: "Start with retail POS and activate CRM, maintenance ticketing, or IoT telemetry whenever your roadmap demands it.",
    },
    {
      title: "Zero-Trust Security Architecture",
      desc: "Fine-grained role permissions and cryptographic activity logs keep your operations safe from internal discrepancies.",
    },
    {
      title: "Multi-Branch Ready",
      desc: "Operate 50+ stores or regional hubs independently while leadership views consolidated financial health.",
    },
    {
      title: "Enterprise Ecosystem Compatibility",
      desc: "Engineered by FlutterFlirt with native connectors for Microsoft Dynamics 365, Azure Cloud, and SAP.",
    },
    {
      title: "In-House Engineering & Support",
      desc: "Direct support from the core engineering team that designed the platform—no third-party call centers.",
    },
  ];

  const faqs = [
    {
      q: "Is BizBox only for one type of business?",
      a: "No. BizBox is built on a modular ERP foundation. You simply turn on the specific modules relevant to your business—whether that's retail POS, wholesale distribution, field ticketing, or connected hardware telemetry.",
    },
    {
      q: "Can I use only the POS module?",
      a: "Yes. You can start with just Point of Sale and billing, and later activate inventory, CRM, or device management as your operations grow.",
    },
    {
      q: "Does BizBox support multiple branches and warehouses?",
      a: "Yes. Each branch or warehouse operates with its own users, inventory, and transactions, while headquarters has consolidated, real-time reporting across all entities.",
    },
    {
      q: "How is access secured across different team members?",
      a: "Every team member signs in with their own verified credentials. Granular role-based access ensures cashiers, technicians, managers, and accountants see only the tools and data relevant to their role.",
    },
    {
      q: "Can it integrate with our existing enterprise infrastructure?",
      a: "Yes. Our enterprise engineering team connects BizBox directly with Microsoft Dynamics 365, SAP, Azure datastores, and payment gateways.",
    },
    {
      q: "Is BizBox cloud-based?",
      a: "Yes. BizBox is accessible securely via any web browser on desktop, tablet, and mobile devices with encrypted cloud synchronization.",
    },
  ];

  return (
    <div className="relative bg-[#f8fafc] text-slate-800 antialiased selection:bg-blue-600 selection:text-white">

      {/* ── 1. HERO SECTION (Pristine White Theme with Silver-White BizBox Hardware) ── */}
      <section className="relative overflow-hidden bg-[#f8fafc] text-slate-900 min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-20 pb-8 sm:pt-24 lg:pt-28 border-b border-slate-200">
        {/* Hero Background - Right-aligned device image, clean 100% white left & center */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[52%] z-0 pointer-events-none overflow-hidden">
          <Image
            src="/bizbox/white-hero-bg.jpg"
            alt="BizBox White Sovereign Edge Hardware Device"
            fill
            sizes="(max-width: 1024px) 100vw, 52vw"
            priority
            quality={100}
            className="object-cover object-right"
          />
          {/* Smooth left-edge fade into pure solid background */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f8fafc] to-transparent" />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#f8fafc] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#f8fafc] to-transparent" />
        </div>

        {/* Hero Content Left Column */}
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 sm:px-10 md:px-12 pt-2 sm:pt-4 lg:pt-14 pb-6">
          <div className="max-w-[580px] lg:max-w-[700px]">
            {/* Category / Sub-heading */}
            <p className="text-[11px] sm:text-[12px] lg:text-[13px] font-bold uppercase tracking-[0.28em] text-[#e11463] mb-4">
              A SMART EDGE DEVICE FOR MODERN BUSINESSES
            </p>

            {/* Main Headline - Uniform across lg & xl */}
            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold tracking-[-0.035em] leading-[1.06] text-slate-950">
              One platform to run your{" "}
              <span className="text-[#e11463] font-extrabold">
                entire business.
              </span>
            </h1>

            {/* Description - Uniform across lg & xl */}
            <p className="mt-5 text-[15px] sm:text-[17px] lg:text-[17.5px] text-slate-600 leading-relaxed font-normal max-w-[580px]">
              BizBox is a secure, multi-purpose ERP that brings <strong className="text-slate-900 font-semibold">POS, inventory, customers, billing, service</strong> and <strong className="text-slate-900 font-semibold">connected devices</strong> into one powerful device and software platform.
            </p>

            {/* Primary & Secondary Action Buttons - Uniform across lg & xl */}
            <div className="mt-8 lg:mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 rounded-lg bg-[#e11463] hover:bg-[#c90f55] px-7 py-3.5 lg:px-8 lg:py-4 text-[15px] lg:text-[16px] font-bold text-white shadow-[0_8px_24px_rgba(225,20,99,0.3)] hover:shadow-[0_10px_30px_rgba(225,20,99,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Book a Demo</span>
                <span className="text-lg leading-none">→</span>
              </Link>
              <a
                href="#modules"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white/80 hover:border-slate-400 hover:bg-white px-6 py-3.5 lg:px-7 lg:py-4 text-[15px] lg:text-[16px] font-semibold text-slate-800 shadow-sm transition-all active:scale-95 backdrop-blur-sm"
              >
                <span>Explore Modules</span>
              </a>
            </div>

            {/* Services / Feature Module Icons Deck - Uniform across lg & xl */}
            <div className="mt-10 lg:mt-12 pt-7 border-t border-slate-300/80">
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-3.5 sm:gap-4 lg:gap-5 text-center">

                <div className="flex flex-col items-center gap-2.5 group cursor-pointer">
                  <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-xs text-slate-700 group-hover:text-[#e11463] group-hover:border-[#e11463]/40 group-hover:shadow-md transition-all">
                    <CreditCard className="h-5 w-5 lg:h-6 lg:w-6 stroke-[1.75]" />
                  </div>
                  <span className="text-[11.5px] lg:text-[12.5px] font-semibold text-slate-700 leading-tight">
                    POS<br />Ready
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2.5 group cursor-pointer">
                  <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-xs text-slate-700 group-hover:text-[#e11463] group-hover:border-[#e11463]/40 group-hover:shadow-md transition-all">
                    <Package className="h-5 w-5 lg:h-6 lg:w-6 stroke-[1.75]" />
                  </div>
                  <span className="text-[11.5px] lg:text-[12.5px] font-semibold text-slate-700 leading-tight">
                    Inventory<br />Management
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2.5 group cursor-pointer">
                  <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-xs text-slate-700 group-hover:text-[#e11463] group-hover:border-[#e11463]/40 group-hover:shadow-md transition-all">
                    <Users className="h-5 w-5 lg:h-6 lg:w-6 stroke-[1.75]" />
                  </div>
                  <span className="text-[11.5px] lg:text-[12.5px] font-semibold text-slate-700 leading-tight">
                    Customers<br />(CRM)
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2.5 group cursor-pointer">
                  <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-xs text-slate-700 group-hover:text-[#e11463] group-hover:border-[#e11463]/40 group-hover:shadow-md transition-all">
                    <Receipt className="h-5 w-5 lg:h-6 lg:w-6 stroke-[1.75]" />
                  </div>
                  <span className="text-[11.5px] lg:text-[12.5px] font-semibold text-slate-700 leading-tight">
                    Billing &amp;<br />Invoicing
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2.5 group cursor-pointer">
                  <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-xs text-slate-700 group-hover:text-[#e11463] group-hover:border-[#e11463]/40 group-hover:shadow-md transition-all">
                    <Wrench className="h-5 w-5 lg:h-6 lg:w-6 stroke-[1.75]" />
                  </div>
                  <span className="text-[11.5px] lg:text-[12.5px] font-semibold text-slate-700 leading-tight">
                    Service<br />&amp; Tickets
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2.5 group cursor-pointer">
                  <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-xs text-slate-700 group-hover:text-[#e11463] group-hover:border-[#e11463]/40 group-hover:shadow-md transition-all">
                    <Radio className="h-5 w-5 lg:h-6 lg:w-6 stroke-[1.75]" />
                  </div>
                  <span className="text-[11.5px] lg:text-[12.5px] font-semibold text-slate-700 leading-tight">
                    Device<br />Management
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2.5 group cursor-pointer">
                  <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-xs text-slate-700 group-hover:text-[#e11463] group-hover:border-[#e11463]/40 group-hover:shadow-md transition-all">
                    <BarChart3 className="h-5 w-5 lg:h-6 lg:w-6 stroke-[1.75]" />
                  </div>
                  <span className="text-[11.5px] lg:text-[12.5px] font-semibold text-slate-700 leading-tight">
                    Reports &amp;<br />Dashboards
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. THE PROBLEM (Page 2) ── */}
      <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 bg-white border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              {/* Tag / Category */}
              <div className="flex items-center gap-2 mb-4">
                <span className="h-4 w-1 bg-[#e11463] rounded-full inline-block" />
                <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.22em] text-[#e11463]">
                  THE PROBLEM
                </span>
              </div>

              {/* Title */}
              <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-slate-900 tracking-[-0.03em] leading-[1.08]">
                Too many tools. <br />
                <span className="text-slate-600 font-extrabold">Not enough control.</span>
              </h2>

              {/* Description Paragraph */}
              <p className="mt-6 text-[15px] sm:text-[16.5px] text-slate-600 leading-relaxed font-normal">
                Sales happen at one counter, stock sits in another sheet, customers live in a CRM nobody updates, and invoices get made by hand. Every system needs its own login and its own reports, and none of them talk to each other.
              </p>

              {/* Divider */}
              <div className="my-8 border-t border-slate-200/90" />

              {/* Bottom Value Prop with Single Sign-on */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                <p className="text-[15px] sm:text-[16px] font-bold text-slate-900 leading-snug max-w-[360px]">
                  BizBox replaces that patchwork with one authoritative system your whole team can use.
                </p>
                <div className="inline-flex shrink-0 items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-blue-600 whitespace-nowrap">
                  <span>Unified Single Sign-On</span>
                  <Check className="h-4 w-4 stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* Right Video Showcase Column */}
            <div className="lg:col-span-7 relative w-full">
              <div className="relative mx-auto max-w-[720px] p-1 sm:p-2">

                {/* Modern Browser/Dashboard Window Frame */}
                <div className="relative rounded-2xl bg-white border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.12)] overflow-hidden group">
                  {/* Window Title Bar */}
                  <div className="px-4 py-3 bg-slate-50/90 border-b border-slate-200 flex items-center justify-between select-none">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-rose-400 inline-block" />
                      <span className="h-3 w-3 rounded-full bg-amber-400 inline-block" />
                      <span className="h-3 w-3 rounded-full bg-emerald-400 inline-block" />
                    </div>

                    {/* URL bar with interactive Refresh / Replay Button (Icon only) */}
                    <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-slate-200/80 text-[11px] font-mono text-slate-600 shadow-2xs">
                      <span>flutterflirt.com/bizbox</span>
                      <button
                        type="button"
                        onClick={handleReplayVideo}
                        title="Replay video"
                        aria-label="Replay video"
                        className="ml-0.5 text-slate-400 hover:text-blue-600 hover:rotate-180 transition-all p-1 rounded-md hover:bg-slate-100 cursor-pointer"
                      >
                        <RotateCcw className="h-3 w-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                    </div>
                  </div>

                  {/* Video Player Container (Tap on video to replay) */}
                  <div
                    onClick={handleReplayVideo}
                    title={isVideoEnded ? "Tap to replay" : undefined}
                    className="relative bg-slate-950 aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center overflow-hidden cursor-pointer group/vid"
                  >
                    <video
                      ref={videoRef}
                      src="/bizbox/video.mp4"
                      autoPlay
                      muted
                      playsInline
                      onEnded={() => setIsVideoEnded(true)}
                      onPlay={() => setIsVideoEnded(false)}
                      className="w-full h-full object-contain bg-black"
                    >
                      Your browser does not support the video tag.
                    </video>

                    {/* "Tap to replay" Note Overlay - ONLY shown when video has finished playing */}
                    {isVideoEnded && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/45 backdrop-blur-[2px] transition-all animate-in fade-in duration-300">
                        <div className="inline-flex items-center gap-2.5 rounded-full bg-[#0a1122]/90 hover:bg-[#0a1122] border border-white/20 px-5 py-2.5 text-sm font-semibold text-white shadow-2xl hover:scale-105 active:scale-95 transition-all">
                          <RotateCcw className="h-4 w-4 text-[#e11463] animate-spin-reverse" />
                          <span>Tap to replay</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subtle decorative glow under video */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-[#e11463]/15 blur-2xl rounded-full pointer-events-none -z-10" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. MODULES (Page 3) ── */}
      <section id="modules" className="relative py-20 lg:py-28 px-6 sm:px-10 lg:px-16 min-h-[900px] border-b border-slate-200 overflow-hidden bg-slate-50">

        {/* Section-wide Decorative Tech Background (Dot matrix, subtle grid, ambient glow rings - pointer-events-none) */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          {/* Subtle Dot Matrix Pattern across entire section */}
          <div
            className="absolute inset-0 opacity-[0.45]"
            style={{
              backgroundImage: "radial-gradient(#cbd5e1 1.25px, transparent 1.25px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Soft ambient gradient orbs */}
          <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl" />
          <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] rounded-full bg-sky-100/35 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-rose-50/40 blur-3xl" />

          {/* Decorative faint concentric circles in empty spaces */}
          <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 opacity-30">
            <div className="w-72 h-72 rounded-full border border-slate-300/60 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border border-dashed border-slate-300/70 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border border-slate-200" />
              </div>
            </div>
          </div>

          <div className="hidden lg:block absolute right-12 top-1/4 opacity-25">
            <div className="w-80 h-80 rounded-full border border-blue-200/50 flex items-center justify-center">
              <div className="w-52 h-52 rounded-full border border-dashed border-blue-200/60" />
            </div>
          </div>

          {/* Faint subtle data pulse points in section background */}
          <div className="absolute top-20 right-1/4 h-2 w-2 rounded-full bg-blue-400/40 animate-pulse" />
          <div className="absolute top-2/3 left-1/5 h-1.5 w-1.5 rounded-full bg-sky-400/50" />
          <div className="absolute bottom-28 right-1/3 h-2 w-2 rounded-full bg-indigo-400/30" />
        </div>

        {/* Note: Device image is now locked inside the grid center column below for 100% responsive consistency */}

        {/* Foreground Content Container - Adjust cards positioning here */}
        <div className="relative z-10 max-w-[1440px] mx-auto w-full">

          {/* Header */}
          <div className="max-w-2xl mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-4 w-1 bg-[#e11463] rounded-full inline-block" />
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.24em] text-[#e11463]">
                MODULES
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-[-0.03em] leading-[1.08]">
              Everything you need. <br />
              <span className="text-[#e11463] font-extrabold">Switch on only what you use.</span>
            </h2>

            <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
              No bloated software bundles. Each module operates standalone or integrates seamlessly into the complete enterprise workflow.
            </p>


          </div>

          {/* Cards Grid around the background */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[550px]">

            {/* Left 3 Cards - wider cards */}
            <div className="lg:col-span-4 space-y-4">

              {/* 01. POS */}
              <div className="rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-all flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-rose-50 flex items-center justify-center shrink-0">
                  <ShoppingCart className="h-6 w-6 text-rose-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Point of Sale (POS)</h3>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100/90 px-2.5 py-0.5 rounded-full shrink-0">
                      01
                    </span>
                  </div>
                  <p className="text-[12.5px] text-slate-600 leading-relaxed font-normal">
                    Fast billing at the counter with live barcode lookup, instant discounts, and split payments. Works offline and syncs automatically.
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {["Barcode Lookup", "Split Payments", "Offline Sync"].map((t) => (
                      <span key={t} className="text-[11px] font-medium bg-slate-100/90 text-slate-700 px-2.5 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 02. Inventory */}
              <div className="rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-all flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Inventory &amp; Stock</h3>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100/90 px-2.5 py-0.5 rounded-full shrink-0">
                      02
                    </span>
                  </div>
                  <p className="text-[12.5px] text-slate-600 leading-relaxed font-normal">
                    Live stock tracking across multiple locations, retail outlets and distribution hubs. Automated re-order triggers and batch management.
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {["Multi-Location", "Batch & Expiry", "Stock Alerts"].map((t) => (
                      <span key={t} className="text-[11px] font-medium bg-slate-100/90 text-slate-700 px-2.5 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 03. Billing */}
              <div className="rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-all flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <Receipt className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Billing &amp; Invoicing</h3>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100/90 px-2.5 py-0.5 rounded-full shrink-0">
                      03
                    </span>
                  </div>
                  <p className="text-[12.5px] text-slate-600 leading-relaxed font-normal">
                    Automated GST-compliant e-invoicing, recurring contracts, subscription cycles, and payment gateway reconciliation.
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {["GST Compliant", "Recurring Cycles", "Auto-Reconcile"].map((t) => (
                      <span key={t} className="text-[11px] font-medium bg-slate-100/90 text-slate-700 px-2.5 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Center Area: Holds the BizBox Hardware & Tablet Image locked with container width (Hidden on mobile/tablet, visible on desktop lg+) */}
            <div className="hidden lg:flex relative lg:col-span-4 items-center justify-center my-6 lg:my-0 min-h-[260px] sm:min-h-[340px] lg:min-h-[460px] pointer-events-none select-none">
              <div className="relative w-full h-[280px] sm:h-[360px] lg:h-[480px] scale-[1.05] sm:scale-[1.12] lg:scale-[1.18] xl:scale-[1.25] transition-transform">
                <Image
                  src="/bizbox/image.png"
                  alt="BizBox Services Hardware & Tablet Display"
                  fill
                  sizes="(max-width: 1024px) 90vw, 35vw"
                  priority
                  unoptimized
                  className="object-contain object-center"
                />
              </div>
            </div>

            {/* Right 3 Cards - wider cards shifted slightly upward */}
            <div className="lg:col-span-4 space-y-4 lg:-translate-y-20 transition-transform">

              {/* 04. CRM */}
              <div className="rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-all flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-purple-50 flex items-center justify-center shrink-0">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Customers (CRM)</h3>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100/90 px-2.5 py-0.5 rounded-full shrink-0">
                      04
                    </span>
                  </div>
                  <p className="text-[12.5px] text-slate-600 leading-relaxed font-normal">
                    A unified view for customer history, billing records, service tickets, warranty contracts and lifetime loyalty.
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {["360° Profile", "Service Records", "Contact History"].map((t) => (
                      <span key={t} className="text-[11px] font-medium bg-slate-100/90 text-slate-700 px-2.5 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 05. Service */}
              <div className="rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-all flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0">
                  <Headphones className="h-6 w-6 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Service &amp; Tickets</h3>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100/90 px-2.5 py-0.5 rounded-full shrink-0">
                      05
                    </span>
                  </div>
                  <p className="text-[12.5px] text-slate-600 leading-relaxed font-normal">
                    Raise, assign and SLA-track technical service requests from customer intake to field dispatch.
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {["SLA Tracking", "Field Dispatch", "Asset Context"].map((t) => (
                      <span key={t} className="text-[11px] font-medium bg-slate-100/90 text-slate-700 px-2.5 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 06. Devices */}
              <div className="rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-all flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0">
                  <Cpu className="h-6 w-6 text-teal-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Device &amp; Asset Management</h3>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100/90 px-2.5 py-0.5 rounded-full shrink-0">
                      06
                    </span>
                  </div>
                  <p className="text-[12.5px] text-slate-600 leading-relaxed font-normal">
                    Monitor connected assets, EV chargers, IoT devices and sensors with real-time telemetry and predictive alerts.
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {["Telemetry Alarms", "Predictive Maint.", "IoT Gateways"].map((t) => (
                      <span key={t} className="text-[11px] font-medium bg-slate-100/90 text-slate-700 px-2.5 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Card 07 - Centered, Compact & sitting snugly under hardware */}
          <div className="mt-4 sm:mt-6 max-w-2xl lg:max-w-3xl mx-auto rounded-2xl bg-[#091427]/95 border border-slate-700/50 backdrop-blur-md text-white p-5 sm:p-6 shadow-[0_16px_36px_rgba(9,20,39,0.3)] lg:-translate-y-28 lg:translate-x-40 relative overflow-hidden transition-transform">
            {/* Ambient background decorative tech bytes: dot matrix, rings, and glowing points (pointer-events-none, layout unaltered) */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
              {/* Subtle Dot Matrix Grid in the card background */}
              <div
                className="absolute inset-0 opacity-[0.14]"
                style={{
                  backgroundImage: "radial-gradient(circle, #38bdf8 1px, transparent 1px)",
                  backgroundSize: "16px 16px"
                }}
              />

              {/* Glowing cyan & blue ambient orb lights */}
              <div className="absolute -left-10 -top-10 w-44 h-44 rounded-full bg-blue-500/15 blur-2xl" />
              <div className="absolute right-12 -bottom-10 w-48 h-48 rounded-full bg-[#38bdf8]/20 blur-3xl" />

              {/* Decorative Concentric Tech Circles on the left */}
              <div className="absolute left-1/3 top-1/2 -translate-y-1/2 -translate-x-1/2 opacity-[0.18]">
                <div className="w-40 h-40 rounded-full border border-sky-400/40 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border border-dashed border-sky-300/50 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full border border-sky-400/30" />
                  </div>
                </div>
              </div>

              {/* Subtle floating tech dots / data bytes */}
              <div className="absolute top-3 left-1/4 h-1 w-1 rounded-full bg-cyan-400 animate-pulse" />
              <div className="absolute bottom-4 left-1/2 h-1.5 w-1.5 rounded-full bg-sky-400 opacity-60" />
              <div className="absolute top-1/2 right-1/4 h-1 w-1 rounded-full bg-blue-400 animate-ping opacity-40" />
              <div className="absolute top-4 right-1/3 h-1 w-1 rounded-full bg-emerald-400/70" />
            </div>

            {/* Ambient background glow & subtle wave curve */}
            <div className="absolute right-0 bottom-0 w-2/5 h-full pointer-events-none opacity-40">
              <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                <path
                  d="M0 80 Q 50 30, 100 65 T 200 40 T 300 20 L 300 100 L 0 100 Z"
                  fill="url(#card7Grad)"
                />
                <path
                  d="M0 80 Q 50 30, 100 65 T 200 40 T 300 20"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                />
                <defs>
                  <linearGradient id="card7Grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="flex items-start gap-3.5">
                <div className="h-11 w-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-md">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      Reports &amp; Executive Dashboards
                    </h3>
                    <span className="font-mono text-[11px] font-bold text-slate-400 bg-white/10 px-2 py-0.5 rounded-full">
                      07
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-[12.5px] leading-relaxed max-w-md">
                    Live visibility into regional sales, stock turnaround, collections velocity and branch performance with role-based dashboards.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {["Executive Views", "Branch P&L", "BI Export"].map((t) => (
                      <span key={t} className="text-[10.5px] font-medium bg-white/10 text-slate-200 px-2.5 py-0.5 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white/10 border border-white/10 px-4 py-2.5 text-right shrink-0 backdrop-blur-sm self-start sm:self-center">
                <span className="text-xs font-bold text-emerald-400 flex items-center justify-end gap-1">
                  <span>+32%</span>
                  <span>↑</span>
                </span>
                <span className="text-[10.5px] text-slate-300">Sales Growth</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. SECURE BY DESIGN (Page 3) ── */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#091427] text-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-4 w-1 bg-[#e11463] rounded-full inline-block" />
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.24em] text-[#e11463]">
                Secure by Design
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Authenticated access. <br />
              <span className="font-serif italic font-normal text-[#ff6b9d]">
                Total control.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityFeatures.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 flex items-start gap-5 hover:border-[#e11463]/40 hover:bg-slate-900/80 transition-all group"
                >
                  <div className="h-11 w-11 rounded-2xl bg-[#e11463]/10 border border-[#e11463]/25 text-[#e11463] group-hover:scale-105 group-hover:bg-[#e11463]/20 flex items-center justify-center shrink-0 transition-all">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{sec.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{sec.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. WHO IT'S FOR (Page 4) ── */}
      <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto">

          {/* Header with WHO IT'S FOR tag & hand-drawn blue underline under 'every kind.' */}
          <div className="max-w-3xl mb-12 lg:mb-14">
            <div className="inline-block relative mb-3">
              <span className="text-[12px] sm:text-[13px] font-black uppercase tracking-[0.24em] text-[#e11463]">
                WHO IT&apos;S FOR
              </span>
              <span className="absolute -bottom-1 left-0 w-8 h-[2px] bg-[#e11463]/70 rounded-full" />
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-slate-950 tracking-[-0.03em] leading-[1.08]">
              Built for businesses <br className="hidden sm:inline" />
              of{" "}
              <span className="relative inline-block text-[#e11463] font-black">
                every kind.
                {/* Hand-drawn scribble / brush underline */}
                <svg
                  className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-blue-400/80 pointer-events-none"
                  viewBox="0 0 250 20"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 14C50 6 120 4 247 11C180 16 90 18 15 17"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
          </div>

          {/* 6 Grid Cards (3 columns x 2 rows) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Card 1: Retail & Outlets */}
            <div className="group relative rounded-2xl bg-[#fafafa] border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between min-h-[190px]">
              {/* Right Side Image Blend */}
              <div className="absolute right-0 top-0 bottom-0 w-[48%] sm:w-[50%] pointer-events-none select-none overflow-hidden">
                <Image
                  src="/bizbox/industries/retail.png"
                  alt="Retail cashier POS checkout"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-left"
                />
                {/* Smooth left-edge fade into pure card background */}
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/80 to-transparent" />
                <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/5 to-transparent" />
              </div>

              {/* Card Text Content */}
              <div className="relative z-10 p-6 sm:p-7 max-w-[58%] sm:max-w-[56%]">
                <h3 className="text-base sm:text-[17px] font-black text-slate-900 tracking-tight leading-snug">
                  Retail &amp; Outlets
                </h3>
                <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                  High-speed POS billing, unified inventory, customer rewards, and centralized multi-store management.
                </p>
              </div>
            </div>

            {/* Card 2: Distributors & Wholesalers */}
            <div className="group relative rounded-2xl bg-[#fafafa] border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between min-h-[190px]">
              {/* Right Side Image Blend */}
              <div className="absolute right-0 top-0 bottom-0 w-[48%] sm:w-[50%] pointer-events-none select-none overflow-hidden">
                <Image
                  src="/bizbox/industries/wholesale.png"
                  alt="Distributor warehouse manager inventory tablet"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-left"
                />
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/80 to-transparent" />
                <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/5 to-transparent" />
              </div>

              <div className="relative z-10 p-6 sm:p-7 max-w-[58%] sm:max-w-[56%]">
                <h3 className="text-base sm:text-[17px] font-black text-slate-900 tracking-tight leading-snug">
                  Distributors &amp; Wholesalers
                </h3>
                <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                  Regional stock distribution, wholesale credit limits, purchase orders, and multi-tier dealer billing.
                </p>
              </div>
            </div>

            {/* Card 3: Service & Field Operations */}
            <div className="group relative rounded-2xl bg-[#fafafa] border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between min-h-[190px]">
              {/* Right Side Image Blend */}
              <div className="absolute right-0 top-0 bottom-0 w-[48%] sm:w-[50%] pointer-events-none select-none overflow-hidden">
                <Image
                  src="/bizbox/industries/field-service.png"
                  alt="Technician servicing HVAC with field tablet"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-left"
                />
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/80 to-transparent" />
                <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/5 to-transparent" />
              </div>

              <div className="relative z-10 p-6 sm:p-7 max-w-[58%] sm:max-w-[56%]">
                <h3 className="text-base sm:text-[17px] font-black text-slate-900 tracking-tight leading-snug">
                  Service &amp; Field Operations
                </h3>
                <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                  Ticketing pipelines, technician scheduling, AMC contracts, and on-site service documentation.
                </p>
              </div>
            </div>

            {/* Card 4: Smart Hardware & Connected Ops */}
            <div className="group relative rounded-2xl bg-[#fafafa] border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between min-h-[190px]">
              {/* Right Side Image Blend */}
              <div className="absolute right-0 top-0 bottom-0 w-[48%] sm:w-[50%] pointer-events-none select-none overflow-hidden">
                <Image
                  src="/bizbox/industries/smart-hardware.png"
                  alt="BizBox IoT edge gateway device on desk"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/80 to-transparent" />
                <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/5 to-transparent" />
              </div>

              <div className="relative z-10 p-6 sm:p-7 max-w-[58%] sm:max-w-[56%]">
                <h3 className="text-base sm:text-[17px] font-black text-slate-900 tracking-tight leading-snug">
                  Smart Hardware &amp; Connected Ops
                </h3>
                <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                  Real-time device monitoring, usage metering, telemetric alerts, and remote maintenance triggers.
                </p>
              </div>
            </div>

            {/* Card 5: Multi-City Growing Enterprises */}
            <div className="group relative rounded-2xl bg-[#fafafa] border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between min-h-[190px]">
              {/* Right Side Image Blend */}
              <div className="absolute right-0 top-0 bottom-0 w-[48%] sm:w-[50%] pointer-events-none select-none overflow-hidden">
                <Image
                  src="/bizbox/industries/multicity.png"
                  alt="Multi-city franchise network on dashboard"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-left"
                />
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/80 to-transparent" />
                <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/5 to-transparent" />
              </div>

              <div className="relative z-10 p-6 sm:p-7 max-w-[58%] sm:max-w-[56%]">
                <h3 className="text-base sm:text-[17px] font-black text-slate-900 tracking-tight leading-snug">
                  Multi-City Growing Enterprises
                </h3>
                <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                  One central ERP backbone replacing disconnected legacy software as you expand into new territories.
                </p>
              </div>
            </div>

            {/* Card 6: Custom Deployment Ready (Vibrant Blue Card) */}
            <div className="relative rounded-2xl bg-[#e11463] text-white p-6 sm:p-7 flex flex-col justify-between min-h-[190px] shadow-sm overflow-hidden group">
              {/* Background ambient radial circles */}
              <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-blue-400/20 blur-xl pointer-events-none" />
              <div className="absolute -right-12 -bottom-12 w-52 h-52 rounded-full bg-sky-300/15 pointer-events-none" />

              <div className="relative z-10">
                <span className="font-mono text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-200 block mb-1.5">
                  ENTERPRISE EXPANSION
                </span>
                <h3 className="text-xl sm:text-[22px] font-black tracking-tight text-white mb-2 leading-tight">
                  Custom Deployment Ready
                </h3>
                <p className="text-blue-100/90 text-xs sm:text-[12.5px] leading-relaxed font-normal">
                  Whether managing 1 flagship showroom or 100 regional distribution hubs, BizBox scales schema, users, and multi-currency records automatically.
                </p>
              </div>

              <div className="relative z-10 mt-5 pt-1">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-[#e11463] hover:text-[#e11463] hover:bg-white px-5 py-2.5 text-xs sm:text-[13px] font-bold shadow-xs hover:shadow transition-all group-hover:gap-2.5"
                >
                  <span>Speak with our Solution Architect</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 6. HOW IT WORKS (Page 4) ── */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-4 w-1 bg-[#e11463] rounded-full inline-block" />
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.24em] text-[#e11463]">
                How It Works
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Up and running in four steps.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-white border border-slate-200 p-8 relative flex flex-col justify-between hover:shadow-md hover:border-[#e11463]/30 transition-all group"
              >
                <div>
                  <div className="font-mono text-3xl font-black text-[#e11463] mb-6">
                    {st.num}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{st.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. WHY BIZBOX (Page 4) ── */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-4 w-1 bg-[#e11463] rounded-full inline-block" />
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.24em] text-[#e11463]">
                Why BizBox
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Why businesses choose BizBox.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {whyBizbox.map((w, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 sm:p-7 flex items-start gap-4 hover:border-[#e11463]/30 hover:bg-white hover:shadow-xs transition-all group"
              >
                <div className="h-6 w-6 rounded-full bg-[#e11463]/10 text-[#e11463] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 group-hover:bg-[#e11463] group-hover:text-white transition-all">
                  <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{w.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FAQ (Page 5) ── */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-4 w-1 bg-[#e11463] rounded-full inline-block" />
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.24em] text-[#e11463]">
                FAQ
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Frequently asked questions.
            </h2>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-slate-900 hover:text-[#e11463] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180 text-[#e11463]" : ""
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 9. FINAL CTA (Page 5) ── */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#091427] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.25em] text-[#f43f5e] uppercase mb-4">
            Final CTA
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Stop juggling tools. <br />
            <span className="font-serif italic font-normal text-sky-300">
              Start running your business.
            </span>
          </h2>
          <p className="mt-6 text-slate-300 text-base sm:text-xl font-normal max-w-2xl mx-auto leading-relaxed">
            See BizBox live, set up around your own workflows.
          </p>

          <div className="mt-10 flex items-center justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#e11d48] px-9 py-4 text-base font-semibold text-white shadow-[0_10px_35px_rgba(225,29,72,0.4)] hover:bg-[#be123c] transition-all duration-200"
            >
              <span>Book a Demo</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="mt-14 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-400 font-mono">
            <span>FlutterFlirt Private Limited</span>
            <span>•</span>
            <a href="mailto:info@flutterflirt.com" className="hover:text-white transition-colors">
              info@flutterflirt.com
            </a>
            <span>•</span>
            <a href="https://www.flutterflirt.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              www.flutterflirt.com
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
