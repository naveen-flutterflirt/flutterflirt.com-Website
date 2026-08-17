"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

export interface ServiceItem {
  id: string;
  pillar: "enterprise" | "bi-automation" | "digital-talent";
  pillarLabel: string;
  icon: string;
  bgColor: string;
  textColor: string;
  title: string;
  outcomeHeadline: string;
  description: string;
  tags: string[];
  deliverables: string[];
  businessImpact: string;
}

const SERVICES_DATA: ServiceItem[] = [
  // 1. Dynamics 365 Finance & Operations
  {
    id: "d365-fo",
    pillar: "enterprise",
    pillarLabel: "Enterprise Systems",
    icon: "/Icon-1.svg",
    bgColor: "#D4E7E1",
    textColor: "#1A7A4A",
    title: "Dynamics 365 Finance & Operations",
    outcomeHeadline: "Streamlining Finance & Global Operations for Enterprise Scale",
    description:
      "End-to-end ERP for finance, supply chain, manufacturing, and business operations. Modernize multi-country ledger setups, unify demand forecasting, and eliminate operational bottlenecks.",
    tags: ["Global Financials", "Supply Chain", "Manufacturing", "Retail Commerce"],
    deliverables: [
      "Multi-entity financial ledger setup & automated consolidations",
      "End-to-end supply chain planning & warehouse management",
      "Discrete & process manufacturing workflow digitization",
      "Statutory tax and multi-currency compliance localization",
    ],
    businessImpact: "Up to 38% reduction in monthly close cycles and complete supply chain transparency.",
  },

  // 2. Dynamics 365 Business Central
  {
    id: "d365-bc",
    pillar: "enterprise",
    pillarLabel: "Enterprise Systems",
    icon: "/Icon-2.svg",
    bgColor: "#E5EBF7",
    textColor: "#2C5BA9",
    title: "Dynamics 365 Business Central",
    outcomeHeadline: "The Right-Sized All-in-One Cloud ERP for Growing Enterprises",
    description:
      "The right-sized ERP for growing companies, helping streamline finance, inventory, and operations in a nimble cloud platform with zero-downtime legacy NAV migrations.",
    tags: ["Localization", "NAV Upgrades", "Growing Businesses", "Multi-Entity"],
    deliverables: [
      "Zero-downtime legacy Dynamics NAV to Business Central migrations",
      "Automated cash-flow forecasting & AP/AR reconciliation",
      "Multi-warehouse tracking with real-time stock replenishment",
      "Custom AL extensions engineered for long-term scalability",
    ],
    businessImpact: "Accelerates daily transactional velocity by 45% while cutting maintenance costs.",
  },

  // 3. Customer Engagement (CRM)
  {
    id: "d365-crm",
    pillar: "enterprise",
    pillarLabel: "Enterprise Systems",
    icon: "/Icon-3.svg",
    bgColor: "#F9EAEF",
    textColor: "#F14F57",
    title: "Customer Engagement (CRM)",
    outcomeHeadline: "Unifying Sales, Field Service & Predictive Customer Intelligence",
    description:
      "Sales, Service, Field Service, and Marketing solutions to strengthen customer relationships, automate lead-to-cash pipelines, and increase technician first-time fix rates.",
    tags: ["Sales", "Service", "Field Service", "Marketing"],
    deliverables: [
      "Dynamics 365 Sales automated lead-to-cash pipeline",
      "Customer Service omnichannel contact center integration",
      "Field Service intelligent technician scheduling & mobile enablement",
      "Real-time customer journey automation & predictive analytics",
    ],
    businessImpact: "Boosts sales conversion rates by 28% and increases field service fix rates by 34%.",
  },

  // 4. Power Platform
  {
    id: "power-platform",
    pillar: "bi-automation",
    pillarLabel: "BI & Automation",
    icon: "/Icon-5.svg",
    bgColor: "#F5BDE2",
    textColor: "#F80788",
    title: "Power Platform",
    outcomeHeadline: "Intelligent Low-Code Automation & Workflow Acceleration",
    description:
      "Power Apps, Power Automate, Power BI, and Copilot Studio solutions for smarter workflows, rapid internal tooling, robotic process automation, and executive KPI intelligence.",
    tags: ["Power Apps", "Automate", "BI", "Copilot Studio"],
    deliverables: [
      "Custom canvas and model-driven enterprise line-of-business apps",
      "Complex robotic process automation (RPA) for repetitive tasks",
      "Executive Power BI data cubes with real-time KPI telemetries",
      "Custom Copilot Studio conversational bots and knowledge copilots",
    ],
    businessImpact: "Automates over 60% of routine paperwork and unlocks instant executive decision intelligence.",
  },

  // 5. Azure & Integrations
  {
    id: "azure-integrations",
    pillar: "bi-automation",
    pillarLabel: "BI & Automation",
    icon: "/Icon-6.svg",
    bgColor: "#FBECD7",
    textColor: "#FF9810",
    title: "Azure & Integrations",
    outcomeHeadline: "Cloud Ecosystems, Synapse Analytics & Seamless API Fabric",
    description:
      "Landing zones, Data Factory, Synapse, and APIs to connect and scale your digital ecosystem with zero data silos, bi-directional synchronicity, and high-throughput security.",
    tags: ["Landing Zones", "Data Factory", "Synapse", "APIs"],
    deliverables: [
      "Enterprise Cloud Landing Zones configured to strict security benchmarks",
      "High-throughput Azure Data Factory & Event Hub pipelines",
      "Centralized Azure Synapse & Fabric analytical architectures",
      "Secure REST / GraphQL API middleware connecting ERP, CRM & 3rd parties",
    ],
    businessImpact: "Guarantees 99.99% integration uptime and real-time bi-directional data synchronicity.",
  },

  // 6. Custom Apps — React & Next.js
  {
    id: "custom-apps",
    pillar: "digital-talent",
    pillarLabel: "Digital Experience & Talent",
    icon: "/Icon-7.svg",
    bgColor: "#F6F6D3",
    textColor: "#9A7B00",
    title: "Custom Apps — React & Next.js",
    outcomeHeadline: "High-Performance Portals, Dashboards & Modern Digital Experiences",
    description:
      "Portals, dashboards, and headless CMS solutions built for modern digital experiences with sub-second response times, integrated directly into your ERP and CRM backends.",
    tags: ["Web Portals", "Dashboards", "Headless CMS", "Next.js"],
    deliverables: [
      "Custom React & Next.js enterprise portals integrated into ERP backends",
      "Secure multi-tenant customer & partner self-service dashboards",
      "Modern headless UI architecture for blistering load performance",
      "Mobile-responsive Progressive Web Applications (PWA)",
    ],
    businessImpact: "Delivers sub-second response times and dramatically enhances stakeholder engagement.",
  },

  // 7. Resource Augmentation & Outsourcing
  {
    id: "resource-augmentation",
    pillar: "digital-talent",
    pillarLabel: "Digital Experience & Talent",
    icon: "/Icon-4.svg",
    bgColor: "#DAC3E4",
    textColor: "#6A0087",
    title: "Resource Augmentation & Outsourcing",
    outcomeHeadline: "On-Demand Elite Dynamics & Cloud Engineers to Multiply Velocity",
    description:
      "On-demand D365 and React consultants to extend your team and accelerate delivery without recruitment overhead, ramping up within 5 business days.",
    tags: ["Staff Augmentation", "Outsourcing", "On-Demand", "Dedicated Pods"],
    deliverables: [
      "Vetted Senior Dynamics 365 Technical & Functional Consultants",
      "Dedicated full-stack React / Next.js engineering pods",
      "Flexible fractional or dedicated engagement models",
      "Immediate ramp-up within 5 business days with zero recruitment overhead",
    ],
    businessImpact: "Multiplies sprint velocity by 2.5x while reducing total staffing cost by up to 40%.",
  },

  // 8. D365 Academy
  {
    id: "d365-academy",
    pillar: "digital-talent",
    pillarLabel: "Digital Experience & Talent",
    icon: "/Icon-8.svg",
    bgColor: "#FAEBEF",
    textColor: "#F14F57",
    title: "D365 Academy",
    outcomeHeadline: "Empowering Internal Teams Through Certified Hands-On Mastery",
    description:
      "Structured training and placement programs to build practical Dynamics 365 expertise, certified Microsoft pathways, and customized post-go-live playbooks.",
    tags: ["Training", "Certification", "Placement", "Bootcamps"],
    deliverables: [
      "Role-based end-user training tailored to your customized ERP/CRM workflows",
      "Administrator & developer masterclasses for internal maintenance independence",
      "Official Microsoft certification preparation and assessment guidance",
      "Recorded video modules and searchable enterprise runbooks",
    ],
    businessImpact: "Achieves 95%+ end-user adoption within 30 days of production cutover.",
  },
];

export default function ServicesPillars() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="services-grid" className="relative w-full bg-[#dfeaf3] py-16 sm:py-24 lg:py-32">
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        
        {/* Section Header */}
        <div className="text-center max-w-[860px] mx-auto mb-14 sm:mb-20">
          <p className="text-[11px] sm:text-[12.5px] font-bold uppercase tracking-[0.24em] text-[#2563eb]">
            ENTERPRISE CAPABILITIES & PRACTICES
          </p>
          <h2
            className="mt-2 text-[32px] sm:text-[42px] md:text-[50px] font-normal leading-[1.06] tracking-[-0.03em] text-[#0a0f18]"
            style={{ fontFamily: "var(--font-bigshot-one), Georgia, serif" }}
          >
            Eight Core Practices.{" "}
            <span
              className="text-[1.12em] font-normal text-[#F14F57] inline-block select-none"
              style={{ fontFamily: "var(--font-allura), cursive" }}
            >
              Unified
            </span>{" "}
            Execution.
          </h2>
          <p className="mt-4 text-[15px] sm:text-[16.5px] text-[#475569] leading-relaxed font-normal">
            Scroll down to explore each specialized capability, engineered for seamless enterprise transformation.
          </p>
        </div>

        {/* =========================================================================
            ULTRA-MINIMAL & SPACIOUS STACKED SCROLL CARDS
            No practice numbers, no paragraph blocks, color-matched badges, right-side button only
           ========================================================================= */}
        <div className="relative mx-auto max-w-[1180px] pb-20 space-y-10 sm:space-y-14">
          {SERVICES_DATA.map((service, index) => {
            const topOffsetDesktop = 90 + index * 16;
            const topOffsetMobile = 70 + index * 10;

            return (
              <div
                key={service.id}
                style={{
                  top: `clamp(${topOffsetMobile}px, 6vw, ${topOffsetDesktop}px)`,
                }}
                className="sticky w-full"
              >
                <article
                  className="
                    group
                    relative
                    w-full
                    overflow-hidden
                    rounded-[28px] sm:rounded-[36px] md:rounded-[44px]
                    bg-white/95
                    border border-[#d6e4f2]
                    p-7 sm:p-10 md:p-12
                    shadow-[0_18px_50px_rgba(20,50,90,0.06)]
                    backdrop-blur-xl
                    transition-all duration-300
                  "
                >
                  {/* Top Bar: Pillar Label & Icon */}
                  <div className="flex items-center justify-between border-b border-slate-100/90 pb-5 mb-6">
                    <span className="text-[11.5px] sm:text-[12.5px] font-bold uppercase tracking-[0.22em] text-[#2563eb]">
                      {service.pillarLabel}
                    </span>

                    {/* Top Right Icon with matching background */}
                    <div
                      style={{ backgroundColor: service.bgColor }}
                      className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl shadow-xs transition-transform duration-300 group-hover:scale-105"
                    >
                      <Image
                        src={service.icon}
                        alt={service.title}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Title & Outcome Subtitle */}
                  <div>
                    <h3
                      className="text-[23px] sm:text-[28px] md:text-[32px] font-bold text-[#0a0f18] leading-[1.14] tracking-tight"
                      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    >
                      {service.title}
                    </h3>

                    <p className="mt-1.5 text-[14px] sm:text-[15px] font-semibold text-[#2563eb] leading-snug">
                      {service.outcomeHeadline}
                    </p>
                  </div>

                  {/* Bottom Row: Badges (Color matched to top-right icon) + Right Button Only */}
                  <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                    
                    {/* Capability Badges using EXACT same color palette as top-right icon */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            backgroundColor: service.bgColor,
                            color: service.textColor,
                          }}
                          className="rounded-full px-3.5 py-1.5 text-[11px] sm:text-[12px] font-bold shadow-2xs transition-transform duration-200 hover:scale-105"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Right Side: Small Button Only */}
                    <div className="shrink-0">
                      <button
                        onClick={() => setSelectedService(service)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0a0f18] py-2.5 px-5 text-[12px] sm:text-[12.5px] font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#2563eb] hover:shadow-[0_6px_16px_rgba(37,99,235,0.22)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                      >
                        <span>View Architecture Specs</span>
                        <span className="text-xs">→</span>
                      </button>
                    </div>

                  </div>

                </article>
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            MINIMAL PREMIUM MODAL (No Scrollbars, No Close Button in Header)
           ========================================================================= */}
        <AnimatePresence>
          {selectedService && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedService(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="
                  relative
                  w-full max-w-[580px]
                  rounded-[24px] sm:rounded-[32px]
                  bg-white
                  p-5 sm:p-7 md:p-8
                  shadow-[0_25px_70px_rgba(0,0,0,0.18)]
                  border border-slate-100
                  [scrollbar-width:none]
                  [-ms-overflow-style:none]
                  [&::-webkit-scrollbar]:hidden
                "
              >
                {/* Cross Close Icon in Right Top */}
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 sm:top-5 right-4 sm:right-5 flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-800 transition-colors cursor-pointer text-xs font-bold"
                  aria-label="Close modal"
                >
                  ✕
                </button>

                {/* Header */}
                <div className="flex items-center gap-3 pr-8">
                  <div
                    style={{ backgroundColor: selectedService.bgColor }}
                    className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl shadow-xs"
                  >
                    <Image
                      src={selectedService.icon}
                      alt={selectedService.title}
                      width={22}
                      height={22}
                    />
                  </div>
                  <div>
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#2563eb]">
                      {selectedService.pillarLabel}
                    </span>
                    <h3
                      className="text-[18px] sm:text-[20px] font-bold text-[#0a0f18] leading-tight"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {selectedService.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-3 text-[13px] font-semibold text-[#2563eb]">
                  {selectedService.outcomeHeadline}
                </p>

                <p className="mt-1.5 text-[12px] sm:text-[12.5px] text-[#475569] leading-relaxed">
                  {selectedService.description}
                </p>

                {/* Scope & Deliverables */}
                <div className="mt-4 border-t border-slate-100 pt-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-900 mb-2">
                    Scope & Core Deliverables
                  </p>
                  <div className="space-y-1.5">
                    {selectedService.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-[12px] text-slate-700">
                        <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-bold">
                          ✓
                        </span>
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Proven Value Badge with same color token */}
                <div
                  style={{ backgroundColor: selectedService.bgColor }}
                  className="mt-4 rounded-xl p-3 shadow-xs"
                >
                  <p
                    style={{ color: selectedService.textColor }}
                    className="text-[9.5px] font-bold uppercase tracking-wider"
                  >
                    PROVEN ENTERPRISE VALUE
                  </p>
                  <p
                    style={{ color: selectedService.textColor }}
                    className="text-[12px] font-bold mt-0.5 leading-snug"
                  >
                    {selectedService.businessImpact}
                  </p>
                </div>

                {/* Actions (Small CTA button only) */}
                <div className="mt-4 flex items-center justify-end pt-3 border-t border-slate-100">
                  <Link
                    href="/contact"
                    className="rounded-full bg-[#2563eb] px-3 py-1 text-[9px] sm:text-[9.5px] font-semibold text-white shadow-2xs hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Consult on this Practice →
                  </Link>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
