"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const PHONE_NUMBER = "+919876543210";

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Our Story", href: "/our-story" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

// Pill transform starts after this many px of scroll
const PILL_THRESHOLD = 60;
// Hide/show behaviour only kicks in once past the hero (≈100vh)
// We read the real value on mount so it works on any screen size.
const HIDE_THRESHOLD_FALLBACK = 600;
// Ignore scroll deltas smaller than this to prevent jitter
const SCROLL_DELTA = 8;

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  // Will hold the pixel offset where the hero section ends
  const heroEndRef = useRef(HIDE_THRESHOLD_FALLBACK);

  // Measure actual hero height on mount (hero is min-h-screen)
  useEffect(() => {
    heroEndRef.current = window.innerHeight;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      // 1. Pill transform: kick in after PILL_THRESHOLD px
      setScrolled(currentY > PILL_THRESHOLD);

      // 2. Hide / show logic — only active past the hero section
      if (currentY > heroEndRef.current) {
        if (Math.abs(delta) > SCROLL_DELTA) {
          // Scrolling UP   → show navbar
          // Scrolling DOWN → hide navbar
          setIsVisible(delta < 0);
          lastScrollY.current = currentY;
        }
      } else {
        // Inside the hero: always visible
        setIsVisible(true);
        lastScrollY.current = currentY;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const close = () => setMobileOpen(false);
    window.addEventListener("scroll", close, { passive: true, once: true });
    return () => window.removeEventListener("scroll", close);
  }, [mobileOpen]);

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-50 flex justify-center"
      animate={{ y: isVisible ? 0 : -120, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      <div className="relative w-full flex justify-center">

        {/* ════════════════════════════════════════
            DESKTOP NAV  (md and above)
        ════════════════════════════════════════ */}
        <motion.nav
          aria-label="Main navigation"
          animate={
            scrolled
              ? {
                  /* ── Floating pill — large screens ── */
                  width: "80%",
                  marginTop: 12,
                  height: 60,
                  borderRadius: 999,
                  paddingLeft: 32,
                  paddingRight: 32,
                  backgroundColor: "rgba(255,255,255,0.92)",
                  boxShadow:
                    "0 12px 42px rgba(15,23,42,0.12), 0 2px 8px rgba(15,23,42,0.05), inset 0 1px 0 rgba(255,255,255,1)",
                  borderColor: "rgba(255,255,255,0.85)",
                  borderWidth: 1,
                }
              : {
                  /* ── Full-width top bar ── */
                  width: "100%",
                  marginTop: 0,
                  height: 88,
                  borderRadius: 0,
                  paddingLeft: 48,
                  paddingRight: 48,
                  backgroundColor: "rgba(255,255,255,0.0)",
                  boxShadow: "none",
                  borderColor: "rgba(255,255,255,0.0)",
                  borderWidth: 0,
                }
          }
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          /* Hidden entirely on mobile — replaced by the mobile bar below */
          className="
            hidden md:flex
            max-w-[1600px]
            items-center
            justify-between
            will-change-transform
          "
          style={{
            borderStyle: "solid",
            backdropFilter: scrolled
              ? "blur(22px) saturate(190%)"
              : "blur(0px)",
            WebkitBackdropFilter: scrolled
              ? "blur(22px) saturate(190%)"
              : "blur(0px)",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <motion.div
              animate={{ scale: scrolled ? 0.86 : 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/logo-nav.png"
                alt="FlutterFlirt"
                width={250}
                height={170}
                className="h-auto w-[165px] lg:w-[190px]"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop links */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "group relative text-[13.5px] tracking-[0.04em] transition-colors duration-200",
                    isActive ? "font-extrabold text-black" : "font-bold text-[#0f1723] hover:text-black",
                  ].join(" ")}
                >
                  {link.name}
                  <span
                    className={[
                      "absolute -bottom-0.5 left-1/2 h-[2px] rounded-full bg-[#0f1723] transition-all duration-300 ease-out",
                      isActive
                        ? "w-[18px] -translate-x-1/2"
                        : "w-0 -translate-x-1/2 group-hover:w-full",
                    ].join(" ")}
                  />
                </Link>
              );
            })}
          </div>

          {/* Call Us CTA — text on desktop */}
          <a
            href={`tel:${PHONE_NUMBER}`}
            className={`
              flex items-center justify-center gap-2
              rounded-full border border-blue-600
              font-bold text-blue-600
              transition-all duration-200 shrink-0
              hover:bg-blue-600 hover:text-white
              hover:shadow-[0_4px_18px_rgba(37,99,235,0.32)]
              hover:scale-[1.03] active:scale-[0.97]
              ${scrolled ? "h-[35px] px-5 text-[12.5px]" : "h-[38px] px-6 text-[13px]"}
            `}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19.95 21c-1.05 0-2.08-.4-3.08-1.12-2.01-1.58-4.89-4.43-6.41-6.23-1.54-1.83-2.81-4.64-3.44-6.61-.3-.95-.36-1.88-.11-2.75.07-.26.19-.55.38-.86l1.05-1.37C8.36 2.09 8.88.94 10 1c1.11.06 2.19.57 2.73 1.54l2.73 4.71c.57.98.37 2.25-.5 3.12l-1.42 1.42c.64 1.65 2.09 3.43 3.64 4.96 1.55 1.54 3.3 2.99 4.96 3.64l1.42-1.42c.87-.87 2.14-1.07 3.12-.5l4.71 2.73c.97.54 1.48 1.62 1.54 2.73.06 1.11-.9 1.64-1.54 2.73l-1.37 1.05c-.31.19-.6.31-.86.38-.87.25-1.8.19-2.75-.11-1.97-.63-4.78-1.9-6.61-3.44z"/>
            </svg>
            Call Us
          </a>
        </motion.nav>

        {/* ════════════════════════════════════════
            MOBILE NAV  (below md)
        ════════════════════════════════════════ */}
        <motion.div
          animate={
            scrolled
              ? {
                  width: "92%",
                  marginTop: 12,
                  height: 52,
                  borderRadius: 999,
                  paddingLeft: 18,
                  paddingRight: 16,
                  backgroundColor: "rgba(255,255,255,0.92)",
                  boxShadow:
                    "0 8px 32px rgba(15,23,42,0.14), 0 2px 8px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,1)",
                  borderColor: "rgba(255,255,255,0.8)",
                  borderWidth: 1,
                }
              : {
                  width: "100%",
                  marginTop: 0,
                  height: 68,
                  borderRadius: 0,
                  paddingLeft: 20,
                  paddingRight: 16,
                  backgroundColor: "rgba(255,255,255,0.0)",
                  boxShadow: "none",
                  borderColor: "rgba(255,255,255,0.0)",
                  borderWidth: 0,
                }
          }
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="
            flex md:hidden
            items-center
            justify-between
            will-change-transform
          "
          style={{
            borderStyle: "solid",
            backdropFilter: scrolled
              ? "blur(22px) saturate(190%)"
              : "blur(0px)",
            WebkitBackdropFilter: scrolled
              ? "blur(22px) saturate(190%)"
              : "blur(0px)",
          }}
        >
          {/* Mobile logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/logo-nav.png"
              alt="FlutterFlirt"
              width={200}
              height={136}
              className="h-auto w-[140px]"
              priority
            />
          </Link>

          {/* Mobile right: hamburger only */}
          <div className="flex items-center gap-2">

            {/* Hamburger */}
            <button
              className="
                flex h-9 w-9 flex-col items-center justify-center gap-[5.5px]
                rounded-lg transition-colors duration-150 hover:bg-black/5
              "
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <motion.span
                animate={
                  mobileOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="block h-[1.75px] w-[18px] rounded-full bg-[#0f1723] origin-center"
              />
              <motion.span
                animate={
                  mobileOpen
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.18 }}
                className="block h-[1.75px] w-[18px] rounded-full bg-[#0f1723] origin-center"
              />
              <motion.span
                animate={
                  mobileOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="block h-[1.75px] w-[18px] rounded-full bg-[#0f1723] origin-center"
              />
            </button>
          </div>
        </motion.div>

        {/* ── Accent separator (full-width bar only) ── */}
        <motion.div
          animate={{ opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="
            pointer-events-none
            absolute bottom-0 left-0 right-0
            h-px
            bg-gradient-to-r from-transparent via-black/[0.08] to-transparent
          "
        />

        {/* ════════════════════════════════════════
            MOBILE DROPDOWN MENU
        ════════════════════════════════════════ */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -14, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.95 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="
                absolute left-1/2 top-[calc(100%_+_8px)]
                w-[calc(100%-32px)] max-w-[440px]
                -translate-x-1/2
                rounded-[22px]
                border border-white/70
                bg-white/92
                px-3 py-3
                shadow-[0_28px_64px_rgba(15,23,42,0.18),_0_4px_16px_rgba(15,23,42,0.06)]
                backdrop-blur-2xl
                md:hidden
              "
            >
              <nav className="flex flex-col" aria-label="Mobile navigation">
                {navLinks.map((link, i) => {
                  const isActive =
                    link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: i * 0.055,
                        duration: 0.22,
                        ease: "easeOut",
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        className={[
                          "relative flex items-center gap-2 rounded-[14px] px-4 py-3 text-[14px] tracking-wide transition-all duration-150 hover:bg-black/5 hover:text-black active:scale-[0.98]",
                          isActive ? "font-extrabold text-black" : "font-bold text-[#0f1723]",
                        ].join(" ")}
                      >
                        <span>{link.name}</span>
                        <span
                          className={[
                            "ml-auto h-[2px] rounded-full bg-[#0f1723] transition-all duration-200",
                            isActive ? "w-[18px]" : "w-0",
                          ].join(" ")}
                        />
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Divider + Call Us row */}
                <div className="mx-1 mt-2 border-t border-slate-100 pt-2">
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    onClick={() => setMobileOpen(false)}
                    className="
                      flex h-11 w-full items-center justify-center gap-2
                      rounded-[14px]
                      border border-blue-600
                      text-[14px] font-bold text-blue-600
                      transition-all duration-200
                      hover:bg-blue-600 hover:text-white
                      active:scale-[0.97]
                    "
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19.95 21c-1.05 0-2.08-.4-3.08-1.12-2.01-1.58-4.89-4.43-6.41-6.23-1.54-1.83-2.81-4.64-3.44-6.61-.3-.95-.36-1.88-.11-2.75.07-.26.19-.55.38-.86l1.05-1.37C8.36 2.09 8.88.94 10 1c1.11.06 2.19.57 2.73 1.54l2.73 4.71c.57.98.37 2.25-.5 3.12l-1.42 1.42c.64 1.65 2.09 3.43 3.64 4.96 1.55 1.54 3.3 2.99 4.96 3.64l1.42-1.42c.87-.87 2.14-1.07 3.12-.5l4.71 2.73c.97.54 1.48 1.62 1.54 2.73.06 1.11-.9 1.64-1.54 2.73l-1.37 1.05c-.31.19-.6.31-.86.38-.87.25-1.8.19-2.75-.11-1.97-.63-4.78-1.9-6.61-3.44z"/>
                    </svg>
                    Call Us
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}