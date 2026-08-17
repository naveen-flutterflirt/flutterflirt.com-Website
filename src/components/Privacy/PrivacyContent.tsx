"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";

interface PolicySection {
  id: string;
  title: string;
}

const SECTIONS: PolicySection[] = [
  { id: "overview", title: "1. Overview & Commitment" },
  { id: "collection", title: "2. Information We Collect" },
  { id: "usage", title: "3. How We Use Information" },
  { id: "legal-basis", title: "4. Legal Basis (GDPR/CCPA)" },
  { id: "sharing", title: "5. Information Sharing" },
  { id: "security", title: "6. Security & Data Retention" },
  { id: "rights", title: "7. Your Privacy Rights" },
  { id: "cookies", title: "8. Cookies & Telemetry" },
  { id: "third-party", title: "9. Third-Party Integrations" },
  { id: "children", title: "10. Children's Privacy" },
  { id: "changes", title: "11. Policy Amendments" },
  { id: "contact", title: "12. Contact & DPO" },
];

export default function PrivacyContent() {
  const [activeSection, setActiveSection] = useState<string>("overview");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#dfeaf3] pt-[110px] pb-20 sm:pt-[130px] sm:pb-32">
      {/* Background Radial Atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(100% 80% at 20% 0%, #bad8fb 0%, #cee1fc 30%, #e2edf9 60%, #dfeaf3 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20">
        
        {/* ===== HERO SECTION ===== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="text-center max-w-[860px] mx-auto mb-12 sm:mb-16"
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/70 px-4 py-1.5 shadow-xs backdrop-blur-sm mb-5">
            <span className="h-2 w-2 rounded-full bg-[#2563eb] animate-pulse" />
            <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.22em] text-[#2563eb]">
              LEGAL & TRUST GOVERNANCE
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className="text-[#0a0f18] tracking-[-0.035em] leading-[1.04]"
            style={{
              fontFamily: "var(--font-bigshot-one), Georgia, serif",
              fontSize: "clamp(2.4rem, 4.4vw, 4.6rem)",
            }}
          >
            Privacy{" "}
            <span
              className="font-normal text-[1.15em] text-[#F14F57] inline-block select-none"
              style={{ fontFamily: "var(--font-allura), cursive" }}
            >
              Protection
            </span>{" "}
            & Policy.
          </h1>

          {/* Subtext */}
          <p className="mt-4 text-[16px] sm:text-[18px] text-[#475569] leading-relaxed font-normal">
            How we collect, use, and protect your information across our enterprise solutions, consulting engagements, and digital platforms.
          </p>

          {/* Metadata Compliance Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
            <span className="rounded-full bg-white/90 border border-slate-200/80 px-3.5 py-1 text-[11.5px] font-bold text-slate-700 shadow-xs">
              📅 Last Updated: August 17, 2026
            </span>
            <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1 text-[11.5px] font-bold text-emerald-700 shadow-xs">
              ✓ GDPR & CCPA Compliant
            </span>
            <span className="rounded-full bg-blue-50 border border-blue-200 px-3.5 py-1 text-[11.5px] font-bold text-[#2563eb] shadow-xs">
              🔒 SOC2 Type II Aligned
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-mono text-slate-600">
              v2.4
            </span>
          </div>
        </motion.div>

        {/* ===== 2-COLUMN MAIN CONTENT (STICKY NAV + POLICY READER) ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr] gap-8 sm:gap-12 items-start">
          
          {/* LEFT COLUMN: Sticky Table of Contents Sidebar */}
          <aside className="hidden lg:block sticky top-28 z-20">
            <div className="rounded-[28px] border border-white/80 bg-white/75 p-6 shadow-[0_12px_40px_rgba(20,50,90,0.05)] backdrop-blur-xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#64748b] mb-4">
                TABLE OF CONTENTS
              </p>
              <nav className="space-y-1">
                {SECTIONS.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[13px] font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-[#0a0f18] text-white shadow-sm font-semibold translate-x-1"
                          : "text-slate-600 hover:bg-white hover:text-slate-900"
                      }`}
                    >
                      <span className="truncate">{sec.title}</span>
                      {isActive && <span className="text-blue-400 font-bold">●</span>}
                    </button>
                  );
                })}
              </nav>

              {/* DPO Quick Card */}
              <div className="mt-6 border-t border-slate-200/60 pt-5 text-center">
                <p className="text-[12px] font-bold text-slate-900">
                  Have Privacy Inquiries?
                </p>
                <a
                  href="mailto:privacy@flutterflirt.com"
                  className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-4 py-1.5 text-[12px] font-bold text-[#2563eb] hover:bg-[#2563eb] hover:text-white transition-colors"
                >
                  <span>privacy@flutterflirt.com</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: Comprehensive Privacy Policy Reading Card */}
          <main className="rounded-[32px] sm:rounded-[40px] md:rounded-[48px] border border-white/90 bg-white/90 p-6 sm:p-10 md:p-14 lg:p-16 shadow-[0_24px_70px_rgba(20,50,90,0.06)] backdrop-blur-xl text-slate-800 space-y-12">
            
            {/* Section 1: Overview & Commitment */}
            <section id="overview" className="scroll-mt-28">
              <h2
                className="text-[24px] sm:text-[30px] font-bold text-[#0a0f18] tracking-tight mb-4"
                style={{ fontFamily: "var(--font-bigshot-one), Georgia, serif" }}
              >
                1. Overview & Commitment to Privacy
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#334155] leading-[1.8]">
                At FlutterFlirt (&ldquo;FlutterFlirt,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), protecting the confidentiality, integrity, and security of personal and enterprise information is paramount to our mission as a Microsoft Solution Partner and digital transformation consultancy.
              </p>
              <p className="mt-3 text-[15px] sm:text-[16px] text-[#334155] leading-[1.8]">
                This Privacy Policy articulates our practices regarding the collection, processing, storage, and safeguarding of information obtained when you visit our website (<strong>flutterflirt.com</strong>), interact with our customer portals, enroll in D365 Academy programs, or engage our consulting pods for enterprise implementations.
              </p>
              
              {/* Highlight Box */}
              <div className="mt-5 rounded-2xl border-l-4 border-[#2563eb] bg-blue-50/70 p-4.5 sm:p-5">
                <p className="text-[13.5px] font-bold text-[#1e40af] uppercase tracking-wider mb-1">
                  Core Privacy Pledge:
                </p>
                <p className="text-[14px] text-slate-700 leading-relaxed font-medium">
                  We collect only the minimum data required to deliver high-performance consulting and web experiences. We never sell, rent, or monetize your personal or proprietary business data to third-party advertisers or brokers.
                </p>
              </div>
            </section>

            <hr className="border-slate-200" />

            {/* Section 2: Information We Collect */}
            <section id="collection" className="scroll-mt-28">
              <h2
                className="text-[24px] sm:text-[30px] font-bold text-[#0a0f18] tracking-tight mb-4"
                style={{ fontFamily: "var(--font-bigshot-one), Georgia, serif" }}
              >
                2. Information We Collect
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#334155] leading-[1.8]">
                We categorize the data collected through our digital interfaces and consulting engagements into three distinct channels:
              </p>

              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
                  <h3 className="text-[16px] font-bold text-[#0a0f18]">
                    A. Information You Voluntarily Provide
                  </h3>
                  <p className="mt-1 text-[14px] text-[#475569] leading-relaxed">
                    When you request an architecture discovery session, subscribe to our technical insights, or submit inquiries via our contact forms, you may provide:
                  </p>
                  <ul className="mt-2.5 list-disc list-inside space-y-1 text-[13.5px] text-slate-700">
                    <li>Full Name, Professional Email Address, and Phone Number</li>
                    <li>Organization / Enterprise Name, Industry, and Headquarters Location</li>
                    <li>Project Scope, Technology Stack Requirements, and Timeline Goals</li>
                    <li>Billing and invoicing credentials during active service engagements</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
                  <h3 className="text-[16px] font-bold text-[#0a0f18]">
                    B. Automatically Collected Technical & Telemetry Data
                  </h3>
                  <p className="mt-1 text-[14px] text-[#475569] leading-relaxed">
                    When accessing our web applications, our servers automatically log technical parameters to diagnose connectivity and optimize performance:
                  </p>
                  <ul className="mt-2.5 list-disc list-inside space-y-1 text-[13.5px] text-slate-700">
                    <li>Internet Protocol (IP) address and approximate geographical region</li>
                    <li>Browser user-agent, operating system, and screen resolution</li>
                    <li>Referring URL, navigation pathways, and timestamp metrics</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
                  <h3 className="text-[16px] font-bold text-[#0a0f18]">
                    C. Enterprise Engagement & Training Data
                  </h3>
                  <p className="mt-1 text-[14px] text-[#475569] leading-relaxed">
                    For corporate training programs and resource pods: participant progress metrics, certification assessments, and sandbox environment access logs.
                  </p>
                </div>
              </div>
            </section>

            <hr className="border-slate-200" />

            {/* Section 3: How We Use Your Information */}
            <section id="usage" className="scroll-mt-28">
              <h2
                className="text-[24px] sm:text-[30px] font-bold text-[#0a0f18] tracking-tight mb-4"
                style={{ fontFamily: "var(--font-bigshot-one), Georgia, serif" }}
              >
                3. How We Use Your Information
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#334155] leading-[1.8]">
                We use collected information exclusively for lawful business operations, including:
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  {
                    title: "Service Delivery & Scoping",
                    desc: "Architecting custom Dynamics 365, Power Platform, and Azure integration proposals.",
                  },
                  {
                    title: "Operational Communication",
                    desc: "Direct communication with sprint leads, milestone updates, and security advisories.",
                  },
                  {
                    title: "Security & Fraud Defense",
                    desc: "Monitoring system uptime, mitigating malicious traffic, and enforcing RBAC compliance.",
                  },
                  {
                    title: "Legal & Regulatory Compliance",
                    desc: "Fulfilling statutory accounting, tax, and export control obligations in the US and India.",
                  },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl border border-slate-100 bg-white p-4 shadow-xs">
                    <h4 className="text-[14.5px] font-bold text-[#0a0f18]">{item.title}</h4>
                    <p className="mt-1 text-[13px] text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-slate-200" />

            {/* Section 4: Legal Basis for Processing */}
            <section id="legal-basis" className="scroll-mt-28">
              <h2
                className="text-[24px] sm:text-[30px] font-bold text-[#0a0f18] tracking-tight mb-4"
                style={{ fontFamily: "var(--font-bigshot-one), Georgia, serif" }}
              >
                4. Legal Basis for Processing (GDPR / CCPA)
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#334155] leading-[1.8]">
                If you reside in the European Economic Area (EEA), United Kingdom, or jurisdictions with comparable privacy regulations, our processing of your personal data is grounded in the following legal bases:
              </p>
              <ul className="mt-3 space-y-2 text-[14.5px] text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#2563eb] font-bold">▪</span>
                  <span><strong>Contractual Necessity:</strong> Processing required to fulfill agreements, Master Service Agreements (MSAs), or statements of work (SOWs).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2563eb] font-bold">▪</span>
                  <span><strong>Legitimate Interests:</strong> Conducting B2B outreach, optimizing platform latency, and protecting enterprise IP without overriding fundamental rights.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2563eb] font-bold">▪</span>
                  <span><strong>Consent:</strong> When you have explicitly opted in to receive quarterly technical newsletters or marketing communications.</span>
                </li>
              </ul>
            </section>

            <hr className="border-slate-200" />

            {/* Section 5: Information Sharing & Disclosures */}
            <section id="sharing" className="scroll-mt-28">
              <h2
                className="text-[24px] sm:text-[30px] font-bold text-[#0a0f18] tracking-tight mb-4"
                style={{ fontFamily: "var(--font-bigshot-one), Georgia, serif" }}
              >
                5. Information Sharing & Third-Party Disclosures
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#334155] leading-[1.8]">
                FlutterFlirt does not sell, lease, or distribute your confidential data. We only share information with vetted partners under strict Non-Disclosure Agreements (NDAs) and Data Processing Addendums (DPAs):
              </p>
              <ul className="mt-3 space-y-2.5 text-[14.5px] text-slate-700">
                <li><strong>Cloud Infrastructure Providers:</strong> Microsoft Azure and secure tier-4 hosting providers hosting our production databases and portal services.</li>
                <li><strong>Enterprise Collaboration Tools:</strong> Secure communication and ticketing software used for client sprint coordination.</li>
                <li><strong>Legal & Regulatory Authorities:</strong> Only when compelled by valid legal processes, court orders, or statutory regulatory frameworks.</li>
              </ul>
            </section>

            <hr className="border-slate-200" />

            {/* Section 6: Security & Data Retention */}
            <section id="security" className="scroll-mt-28">
              <h2
                className="text-[24px] sm:text-[30px] font-bold text-[#0a0f18] tracking-tight mb-4"
                style={{ fontFamily: "var(--font-bigshot-one), Georgia, serif" }}
              >
                6. Security Controls & Data Retention
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#334155] leading-[1.8]">
                We enforce comprehensive technical and organizational measures to safeguard data against unauthorized access, destruction, or alteration:
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl bg-slate-50 p-4 text-center border border-slate-100">
                  <span className="text-[20px]">🔐</span>
                  <p className="text-[13px] font-bold text-slate-900 mt-1">TLS 1.3 & AES-256</p>
                  <p className="text-[11.5px] text-slate-500">Encryption in transit and at rest</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4 text-center border border-slate-100">
                  <span className="text-[20px]">🛡️</span>
                  <p className="text-[13px] font-bold text-slate-900 mt-1">RBAC & MFA</p>
                  <p className="text-[11.5px] text-slate-500">Strict least-privilege employee access</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4 text-center border border-slate-100">
                  <span className="text-[20px]">🔍</span>
                  <p className="text-[13px] font-bold text-slate-900 mt-1">Audit Logs</p>
                  <p className="text-[11.5px] text-slate-500">Continuous telemetry & anomaly detection</p>
                </div>
              </div>
              <p className="mt-4 text-[14.5px] text-[#475569] leading-relaxed">
                <strong>Retention Period:</strong> Personal data is retained only for the duration necessary to fulfill the operational purpose for which it was gathered, or as mandated by statutory financial and audit retention regulations.
              </p>
            </section>

            <hr className="border-slate-200" />

            {/* Section 7: Your Privacy Rights */}
            <section id="rights" className="scroll-mt-28">
              <h2
                className="text-[24px] sm:text-[30px] font-bold text-[#0a0f18] tracking-tight mb-4"
                style={{ fontFamily: "var(--font-bigshot-one), Georgia, serif" }}
              >
                7. Your Privacy Rights & Choices
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#334155] leading-[1.8]">
                Regardless of your geographic location, we respect your fundamental privacy rights and provide transparent mechanisms to exercise them:
              </p>
              <div className="mt-4 space-y-2.5 text-[14.5px] text-slate-700">
                <p><strong>• Right of Access:</strong> Request a complete copy of all personal records we hold concerning you.</p>
                <p><strong>• Right to Rectification:</strong> Request prompt correction of inaccurate or incomplete information.</p>
                <p><strong>• Right to Erasure:</strong> Request the deletion of your personal data where retention is no longer legally justified.</p>
                <p><strong>• Right to Restrict Processing:</strong> Request limits on how your personal data is utilized.</p>
                <p><strong>• Right to Data Portability:</strong> Obtain your data in a structured, machine-readable format.</p>
              </div>
              <p className="mt-4 text-[14.5px] text-[#475569]">
                To exercise any of these rights, please email our Data Protection Officer at{" "}
                <a href="mailto:privacy@flutterflirt.com" className="font-bold text-[#2563eb] underline">
                  privacy@flutterflirt.com
                </a>. Requests are resolved within 30 days without charge.
              </p>
            </section>

            <hr className="border-slate-200" />

            {/* Section 8: Cookies & Telemetry */}
            <section id="cookies" className="scroll-mt-28">
              <h2
                className="text-[24px] sm:text-[30px] font-bold text-[#0a0f18] tracking-tight mb-4"
                style={{ fontFamily: "var(--font-bigshot-one), Georgia, serif" }}
              >
                8. Cookies & Telemetry Technologies
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#334155] leading-[1.8]">
                Our website uses minimal, functional cookies and anonymized telemetry to ensure secure authentication, remember preferences, and analyze aggregate page engagement. You may disable cookies through your browser preferences at any time without compromising core site accessibility.
              </p>
            </section>

            <hr className="border-slate-200" />

            {/* Section 9: Third-Party Integrations */}
            <section id="third-party" className="scroll-mt-28">
              <h2
                className="text-[24px] sm:text-[30px] font-bold text-[#0a0f18] tracking-tight mb-4"
                style={{ fontFamily: "var(--font-bigshot-one), Georgia, serif" }}
              >
                9. Third-Party Services & External Links
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#334155] leading-[1.8]">
                Our website may contain links to third-party resources (such as official Microsoft documentation or industry frameworks). FlutterFlirt is not responsible for the privacy practices or content of external websites. We encourage you to review their respective privacy notices when navigating away from our domain.
              </p>
            </section>

            <hr className="border-slate-200" />

            {/* Section 10: Children's Privacy */}
            <section id="children" className="scroll-mt-28">
              <h2
                className="text-[24px] sm:text-[30px] font-bold text-[#0a0f18] tracking-tight mb-4"
                style={{ fontFamily: "var(--font-bigshot-one), Georgia, serif" }}
              >
                10. Children&apos;s Privacy
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#334155] leading-[1.8]">
                FlutterFlirt provides enterprise B2B consulting, cloud architecture, and corporate training. Our services are not directed toward children under the age of 18, and we do not knowingly collect personal information from minors.
              </p>
            </section>

            <hr className="border-slate-200" />

            {/* Section 11: Policy Amendments */}
            <section id="changes" className="scroll-mt-28">
              <h2
                className="text-[24px] sm:text-[30px] font-bold text-[#0a0f18] tracking-tight mb-4"
                style={{ fontFamily: "var(--font-bigshot-one), Georgia, serif" }}
              >
                11. Changes to This Policy
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#334155] leading-[1.8]">
                We may periodically update this Privacy Policy to reflect modifications in our service practices, cloud architectures, or statutory regulations. Any revisions will be published on this page with an updated &ldquo;Last Updated&rdquo; timestamp. Significant modifications will be announced prominently via our homepage or direct client communication channels.
              </p>
            </section>

            <hr className="border-slate-200" />

            {/* Section 12: Contact & DPO */}
            <section id="contact" className="scroll-mt-28">
              <h2
                className="text-[24px] sm:text-[30px] font-bold text-[#0a0f18] tracking-tight mb-4"
                style={{ fontFamily: "var(--font-bigshot-one), Georgia, serif" }}
              >
                12. Contact Information & Data Protection Officer
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#334155] leading-[1.8]">
                If you have questions, regulatory inquiries, or wish to submit a data subject rights request, please contact our Data Governance Team:
              </p>

              <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/60 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h4 className="text-[17px] font-bold text-[#0a0f18]">
                    FlutterFlirt Data Protection Office
                  </h4>
                  <p className="text-[13.5px] text-slate-600 mt-1">
                    Email:{" "}
                    <a href="mailto:privacy@flutterflirt.com" className="font-bold text-[#2563eb] underline">
                      privacy@flutterflirt.com
                    </a>
                  </p>
                  <p className="text-[13.5px] text-slate-600 mt-0.5">
                    Corporate Inquiries:{" "}
                    <a href="mailto:contact@flutterflirt.com" className="font-bold text-[#2563eb] underline">
                      contact@flutterflirt.com
                    </a>
                  </p>
                  <p className="text-[13px] text-slate-500 mt-1">
                    Operating Hubs: Bengaluru, India & New York, USA
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="rounded-full bg-[#0a0f18] px-6 py-3 text-[13.5px] font-bold text-white shadow-md hover:bg-[#2563eb] transition-colors whitespace-nowrap"
                >
                  Contact Form →
                </Link>
              </div>
            </section>

          </main>

        </div>

      </div>
    </div>
  );
}
