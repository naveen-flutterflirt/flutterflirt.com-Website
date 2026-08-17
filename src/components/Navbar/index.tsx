"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Our Story", href: "/our-story" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const SCROLL_THRESHOLD = 60;


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const close = () => setMobileOpen(false);
    window.addEventListener("scroll", close, { passive: true, once: true });
    return () => window.removeEventListener("scroll", close);
  }, [mobileOpen]);

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center">
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
            border
            will-change-transform
          "
          style={{
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
                src="/logo-white.png"
                alt="FlutterFlirt"
                width={250}
                height={170}
                className="h-auto w-[165px] brightness-0 lg:w-[190px]"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop links */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="
                  group
                  relative
                  text-[13.5px]
                  font-bold
                  tracking-[0.04em]
                  text-[#0f1723]
                  transition-colors
                  duration-200
                  hover:text-black
                "
              >
                {link.name}
                <span
                  className="
                    absolute -bottom-0.5 left-0
                    h-[2px] w-0 rounded-full
                    bg-[#0f1723]
                    transition-all duration-300 ease-out
                    group-hover:w-full
                  "
                />
              </Link>
            ))}
          </div>

          {/* Help CTA — text on desktop */}
          <Link
            href="#help"
            className={`
              flex items-center justify-center
              rounded-full border border-blue-600
              font-bold text-blue-600
              transition-all duration-200 shrink-0
              hover:bg-blue-600 hover:text-white
              hover:shadow-[0_4px_18px_rgba(37,99,235,0.32)]
              hover:scale-[1.03] active:scale-[0.97]
              ${scrolled ? "h-[35px] px-5 text-[12.5px]" : "h-[38px] px-6 text-[13px]"}
            `}
          >
            Help
          </Link>
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
            border
            will-change-transform
          "
          style={{
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
              src="/logo-white.png"
              alt="FlutterFlirt"
              width={200}
              height={136}
              className="h-auto w-[140px] brightness-0"
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
                {navLinks.map((link, i) => (
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
                      className="
                        flex items-center gap-2
                        rounded-[14px] px-4 py-3
                        text-[14px] font-bold tracking-wide
                        text-[#0f1723]
                        transition-all duration-150
                        hover:bg-black/5 hover:text-black
                        active:scale-[0.98]
                      "
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                {/* Divider + Help row */}
                <div className="mx-1 mt-2 border-t border-slate-100 pt-2">
                  <Link
                    href="#help"
                    onClick={() => setMobileOpen(false)}
                    className="
                      flex h-11 w-full items-center justify-center
                      rounded-[14px]
                      border border-blue-600
                      text-[14px] font-bold text-blue-600
                      transition-all duration-200
                      hover:bg-blue-600 hover:text-white
                      active:scale-[0.97]
                    "
                  >
                    Help
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}