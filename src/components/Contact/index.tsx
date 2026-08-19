"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

const SERVICES = [
  { id: "d365",  label: "Dynamics 365",      icon: "⚙️" },
  { id: "erp",   label: "ERP / CRM",          icon: "🔗" },
  { id: "ai",    label: "AI & Automation",    icon: "🤖" },
  { id: "dev",   label: "Custom Software",    icon: "💻" },
  { id: "cloud", label: "Azure & Cloud",      icon: "☁️" },
  { id: "power", label: "Power Platform",     icon: "⚡" },
];

const BUDGETS = ["< $10k", "$10k – $50k", "$50k – $200k", "$200k+", "Not sure"];

function InputField({
  id, label, type = "text", placeholder, required = false,
}: {
  id: string; label: string; type?: string; placeholder: string; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label htmlFor={id} className={`block mb-1.5 text-[13px] font-semibold tracking-wide transition-colors ${focused ? "text-[#2563eb]" : "text-[#526987]"}`}>
        {label}{required && <span className="ml-0.5 text-[#F14F57]">*</span>}
      </label>
      <input
        id={id} name={id} type={type} placeholder={placeholder} required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full rounded-[12px] border bg-white px-4 py-3 text-[15px] text-[#17243a] outline-none transition-all duration-200 placeholder:text-[#a3b8e5] ${
          focused
            ? "border-[#2563eb] shadow-[0_0_0_3px_rgba(37,99,235,0.10)]"
            : "border-[#a3b8e5] hover:border-[#7184a0]"
        }`}
      />
    </div>
  );
}

function TextareaField({ id, label, placeholder }: { id: string; label: string; placeholder: string }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label htmlFor={id} className={`block mb-1.5 text-[13px] font-semibold tracking-wide transition-colors ${focused ? "text-[#2563eb]" : "text-[#526987]"}`}>
        {label}
      </label>
      <textarea
        id={id} name={id} rows={4} placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full resize-none rounded-[12px] border bg-white px-4 py-3 text-[15px] text-[#17243a] outline-none transition-all duration-200 placeholder:text-[#a3b8e5] ${
          focused
            ? "border-[#2563eb] shadow-[0_0_0_3px_rgba(37,99,235,0.10)]"
            : "border-[#a3b8e5] hover:border-[#7184a0]"
        }`}
      />
    </div>
  );
}

export default function Contact() {
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function toggleService(id: string) {
    setServices((p) => p.includes(id) ? p.filter((s) => s !== id) : [...p, id]);
  }

  return (
    <div className="min-h-screen bg-[#eef6ff]">

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#eef6ff] px-6 pb-20 pt-36 md:px-12 md:pt-44 lg:px-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,#ffffff_0%,#edf6ff_50%,#dceaff_100%)]" />

        <div className="relative mx-auto max-w-[1400px]">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium uppercase tracking-[0.25em] text-[#2563eb]"
          >
            Contact FlutterFlirt
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 leading-[0.92] tracking-[-0.04em] text-[#050505]"
            style={{
              fontFamily: "var(--font-bigshot-one), Georgia, serif",
              fontSize: "clamp(2rem, 6vw, 6.5rem)",
            }}
          >
            Let&apos;s build something
            <br />
            <span
              style={{
                fontFamily: "var(--font-allura), cursive",
                color: "#244572",
                fontSize: "1.08em",
                letterSpacing: "normal",
              }}
            >
              meaningful.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mt-7 max-w-[560px] text-[17px] leading-[1.65] text-[#647b9b] md:text-[18px]"
          >
            Have a project in mind, need help with your systems, or simply want
            to explore what&apos;s possible? We&apos;d love to hear from you.
          </motion.p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-8"
          >
            {[
              { val: "6",    label: "Global offices" },
              { val: "2",    label: "Countries" },
              { val: "< 24h", label: "Response time" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <span
                  className="text-[2.25rem] font-extrabold leading-none tracking-[-0.02em] text-[#2563eb]"
                  style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                >
                  {s.val}
                </span>
                <span className="mt-0.5 text-[13px] text-[#7184a0]">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MAIN — info + form
      ══════════════════════════════════════ */}
      <section className="px-6 pb-20 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[360px_1fr]">

          {/* ── LEFT INFO ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            {/* Green teal card — matches offices section palette */}
            <div className="relative min-h-[380px] overflow-hidden rounded-[28px] bg-[#dcece7] p-8 md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-[200px] w-[200px] rounded-full bg-[#c5ded7] blur-[2px]" />

              <div className="relative z-10 flex h-full flex-col">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#16865f]">Get in touch</p>
                <h2
                  className="mt-4 leading-[1.05] tracking-[-0.03em] text-[#172b27]"
                  style={{
                    fontFamily: "var(--font-bigshot-one), Georgia, serif",
                    fontSize: "clamp(1.6rem, 2vw, 2rem)",
                  }}
                >
                  Let&apos;s start a conversation.
                </h2>
                <p className="mt-3 text-[14.5px] leading-[1.65] text-[#58736d]">
                  Tell us what you&apos;re working on and we&apos;ll figure out the best way to move forward together.
                </p>

                <div className="mt-auto space-y-5 pt-12">
                  {[
                    {
                      href: "mailto:info@flutterflirt.com",
                      sublabel: "Email us",
                      value: "info@flutterflirt.com",
                      icon: (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <rect x="3" y="5" width="18" height="14" rx="2" />
                          <path d="m3 7 9 6 9-6" />
                        </svg>
                      ),
                    },
                    {
                      href: "tel:8926104326",
                      sublabel: "Call us",
                      value: "+91 892 610 4326",
                      icon: (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      ),
                    },
                  ].map((item) => (
                    <a key={item.sublabel} href={item.href} className="group flex items-center gap-4">
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[14px] bg-white/70 text-[#16865f] transition-transform duration-300 group-hover:scale-105">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[12px] text-[#718f88]">{item.sublabel}</p>
                        <p className="mt-0.5 text-[15px] font-medium text-[#172b27]">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Offices card */}
            <div className="rounded-[24px] border border-[#a3b8e5] bg-white p-6 shadow-[0_6px_24px_rgba(59,100,160,0.07)]">
              <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#2563eb]">Our offices</p>
              <div className="mt-4 space-y-4">
                {[
                  { city: "Bengaluru", sub: "Karnataka, India", hq: true },
                  { city: "New York",  sub: "United States",    hq: false },
                  { city: "Mumbai",    sub: "Maharashtra, India",hq: false },
                  { city: "Kentucky",  sub: "United States",    hq: false },
                  { city: "Bhubaneswar", sub: "Odisha, India",  hq: false },
                  { city: "Bhopal",    sub: "Madhya Pradesh, India", hq: false },
                ].map((o) => (
                  <div key={o.city} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2563eb]" />
                      <span className="text-[13.5px] font-medium text-[#17243a]">{o.city}</span>
                      <span className="text-[12px] text-[#a3b8e5]">{o.sub}</span>
                    </div>
                    {o.hq && (
                      <span className="rounded-full bg-[#edf3ff] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#2563eb]">
                        HQ
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT FORM ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[28px] border border-[#a3b8e5] bg-white p-8 shadow-[0_20px_60px_rgba(59,100,160,0.08)] md:p-10 lg:p-12"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex min-h-[500px] flex-col items-center justify-center text-center"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#dcece7] text-[2.2rem]">
                    ✓
                  </div>
                  <h2
                    className="mt-6 tracking-[-0.03em] text-[#17243a]"
                    style={{ fontFamily: "var(--font-bigshot-one), Georgia, serif", fontSize: "2rem" }}
                  >
                    Message sent!
                  </h2>
                  <p className="mt-3 max-w-[380px] text-[15px] leading-relaxed text-[#7184a0]">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 rounded-full border border-[#a3b8e5] px-6 py-2.5 text-[13.5px] font-medium text-[#2563eb] transition-all hover:border-[#2563eb] hover:bg-[#edf3ff]"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#2563eb]">Start a project</p>
                  <h2
                    className="mt-2 tracking-[-0.03em] text-[#17243a]"
                    style={{
                      fontFamily: "var(--font-bigshot-one), Georgia, serif",
                      fontSize: "clamp(1.7rem, 2.2vw, 2.6rem)",
                    }}
                  >
                    Tell us about it.
                  </h2>
                  <p className="mt-1.5 text-[14.5px] text-[#7184a0]">Fill in the details and we&apos;ll be in touch shortly.</p>

                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="mt-8 space-y-6">

                    <div className="grid gap-6 sm:grid-cols-2">
                      <InputField id="name"  label="Your name"     placeholder="Jane Smith"          required />
                      <InputField id="email" label="Email address" placeholder="jane@company.com"    required type="email" />
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <InputField id="phone"   label="Phone number" placeholder="+91 00000 00000"  type="tel" />
                      <InputField id="company" label="Company"      placeholder="Your organisation" />
                    </div>

                    {/* Services */}
                    <div>
                      <p className="mb-2.5 text-[13px] font-semibold tracking-wide text-[#526987]">
                        Services interested in
                      </p>
                      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                        {SERVICES.map((svc) => {
                          const on = services.includes(svc.id);
                          return (
                            <button
                              key={svc.id} type="button" onClick={() => toggleService(svc.id)}
                              className={`flex items-center gap-2 rounded-[12px] border px-3.5 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                                on
                                  ? "border-[#2563eb] bg-[#edf3ff] text-[#2563eb] shadow-[0_0_0_2px_rgba(37,99,235,0.14)]"
                                  : "border-[#a3b8e5] bg-white text-[#526987] hover:border-[#2563eb] hover:text-[#2563eb]"
                              }`}
                            >
                              <span>{svc.icon}</span>{svc.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <p className="mb-2.5 text-[13px] font-semibold tracking-wide text-[#526987]">Project budget</p>
                      <div className="flex flex-wrap gap-2">
                        {BUDGETS.map((b) => (
                          <button
                            key={b} type="button" onClick={() => setBudget(b)}
                            className={`rounded-full border px-4 py-1.5 text-[12.5px] font-medium transition-all duration-200 ${
                              budget === b
                                ? "border-[#2563eb] bg-[#edf3ff] text-[#2563eb]"
                                : "border-[#a3b8e5] bg-white text-[#526987] hover:border-[#2563eb] hover:text-[#2563eb]"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <TextareaField
                      id="message"
                      label="Project details"
                      placeholder="Tell us about your goals, current systems, and what success looks like for you..."
                    />

                    <div className="flex items-center gap-4 pt-1">
                      <button
                        type="submit"
                        className="group inline-flex items-center gap-3 rounded-full bg-[#2563eb] px-8 py-3.5 text-[15px] font-semibold text-white shadow-[0_4px_18px_rgba(37,99,235,0.32)] transition-all duration-300 hover:bg-[#1d4ed8] hover:shadow-[0_6px_24px_rgba(37,99,235,0.42)] active:scale-[0.98]"
                      >
                        Send message
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </button>
                      <p className="text-[12.5px] text-[#a3b8e5]">We reply within 24h</p>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════ */}
      <section className="px-6 pb-28 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[28px] border border-[#a3b8e5] bg-white px-8 py-14 text-center shadow-[0_20px_60px_rgba(59,100,160,0.08)] md:px-16"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-[260px] w-[260px] rounded-full bg-[#dceaff]/60 blur-[2px]" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-[200px] w-[200px] rounded-full bg-[#dcece7]/80" />

            <p className="relative text-[11px] font-bold uppercase tracking-[0.22em] text-[#2563eb]">Prefer to talk?</p>
            <h2
              className="relative mt-3 tracking-[-0.03em] text-[#17243a]"
              style={{
                fontFamily: "var(--font-bigshot-one), Georgia, serif",
                fontSize: "clamp(1.8rem, 3vw, 3.2rem)",
              }}
            >
              Call us{" "}
              <span style={{ fontFamily: "var(--font-allura), cursive", color: "#F14F57", fontSize: "1.15em" }}>
                directly.
              </span>
            </h2>
            <p className="relative mx-auto mt-3 max-w-[420px] text-[15px] leading-relaxed text-[#7184a0]">
              Speak with one of our consultants to discuss your project and get an honest assessment of what&apos;s possible.
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="tel:8926104326"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#2563eb] px-8 py-3.5 text-[14px] font-semibold text-white shadow-[0_4px_18px_rgba(37,99,235,0.32)] transition-all hover:bg-[#1d4ed8] hover:shadow-[0_6px_24px_rgba(37,99,235,0.42)]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +91 892 610 4326
              </a>
              <Link
                href="/our-story"
                className="rounded-full border border-[#a3b8e5] px-8 py-3.5 text-[14px] font-semibold text-[#647b9b] transition-all hover:border-[#2563eb] hover:text-[#2563eb]"
              >
                Learn about us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
