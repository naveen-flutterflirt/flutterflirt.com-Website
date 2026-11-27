"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight } from "lucide-react";

export default function BizboxPopup() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(false);

  useEffect(() => {
    // Hide popup and badge completely on /bizbox or admin routes
    if (pathname === "/bizbox" || pathname?.startsWith("/flutterflirt-admin-login")) {
      setIsOpen(false);
      setBadgeVisible(false);
      return;
    }

    // Show trigger badge on other pages
    setBadgeVisible(true);

    // Auto-trigger: Open automatically after 5s once per 24 hours
    const lastDismissed = localStorage.getItem("ff_bizbox_popup_dismissed_time");
    const isRecentlyDismissed = lastDismissed && (Date.now() - parseInt(lastDismissed, 10)) < 24 * 60 * 60 * 1000;

    if (!isRecentlyDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem("ff_bizbox_popup_dismissed_time", Date.now().toString());
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  if (!badgeVisible) return null;

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. SLEEK FLOATING PILL BADGE AT BOTTOM LEFT
         ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{
              opacity: 1,
              scale: [0.85, 1.1, 0.98, 1],
              y: 0,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.28,
              delay: 0.2, // Snappy handoff right as card lands!
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed bottom-6 left-6 z-[99995] rounded-full border border-slate-200/90 bg-white/95 shadow-lg shadow-slate-900/10 backdrop-blur-md overflow-hidden"
          >
            <motion.button
              type="button"
              onClick={handleOpenModal}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 px-3.5 py-1.5 text-slate-800 transition cursor-pointer select-none"
              aria-label="View BizBox ERP"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />

              <span className="text-xs font-semibold tracking-tight text-slate-800 hover:text-slate-950 transition-colors">
                BizBox ERP
              </span>

              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 border border-slate-200/60">
                New
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
          2. MINIMAL WHITE LUXURY POPUP MODAL (Fast & Snappy Genie)
         ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="bizbox-modal-container"
            className="fixed inset-0 z-[100000] flex items-center justify-center p-3 pb-24 sm:p-5 md:p-6 lg:p-8 overflow-y-auto"
          >
            {/* Dim Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={handleDismiss}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md cursor-pointer"
            />

            {/* 
              FAST, CRISP & SNAPPY FLUID SUCK (0.32s):
              Quick squeeze and snappy swoop straight to the bottom-left corner!
            */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, scaleX: 1, scaleY: 1, x: 0, y: 0, skewX: 0, skewY: 0 }}
              exit={{
                x: [0, -120, "-46vw"],
                y: [0, 90, "42vh"],
                scaleX: [1, 0.45, 0.05],
                scaleY: [1, 0.85, 0.05],
                skewX: [0, 8, 0],
                skewY: [0, -4, 0],
                borderRadius: ["32px", "44px", "9999px"],
                opacity: [1, 0.9, 0],
                transition: {
                  duration: 0.32,
                  times: [0, 0.45, 1],
                  ease: [0.32, 0, 0.67, 0], // Snappy acceleration directly into the target corner
                },
              }}
              style={{
                transformOrigin: "bottom left",
              }}
              className="relative w-full max-w-[880px] my-auto overflow-hidden rounded-[24px] sm:rounded-[32px] md:rounded-[36px] bg-white shadow-[0_30px_90px_rgba(15,23,42,0.3)] border border-slate-100 max-h-[92vh] flex flex-col md:flex-row pointer-events-auto"
            >
              {/* Circular Close Button (top-right) */}
              <button
                onClick={handleDismiss}
                aria-label="Close modal"
                className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-slate-100/90 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-all shadow-xs cursor-pointer active:scale-90"
              >
                <X className="h-4 w-4 stroke-[2.5]" />
              </button>

              {/* Inner Content Column */}
              <div className="w-full flex flex-col md:flex-row">
                {/* Left Content Column */}
                <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-11 flex-1 flex flex-col justify-center overflow-y-auto max-w-full md:max-w-[54%]">
                  {/* 1. PRODUCT LAUNCH Pill Badge */}
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-50/90 border border-blue-100/90 px-3.5 py-1 text-[11px] font-bold tracking-[0.16em] text-blue-600 uppercase mb-3.5 sm:mb-4 self-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    PRODUCT LAUNCH
                  </div>

                  {/* 2. Headline */}
                  <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-950 tracking-[-0.035em] leading-[1.05] mb-2 sm:mb-2.5">
                    BizBox
                  </h2>

                  {/* 3. Sub-headline */}
                  <p className="text-base sm:text-lg lg:text-[21px] font-semibold text-slate-600 tracking-tight leading-snug mb-3.5 sm:mb-4">
                    The Sovereign Multi-Tenant ERP Suite
                  </p>

                  {/* 4. Description */}
                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal mb-5 sm:mb-6 max-w-[420px]">
                    Unify POS, live inventory, automated billing, field ticketing, and telemetric IoT devices into one single authoritative console built by FlutterFlirt.
                  </p>

                  {/* 5. 2x2 Feature Mini Cards */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-5 sm:mb-7">
                    <div className="rounded-xl sm:rounded-2xl bg-slate-50/90 border border-slate-100 p-2.5 sm:p-3 transition-colors hover:bg-slate-100/70">
                      <div className="text-[12px] sm:text-[13px] font-bold text-slate-900 leading-tight">
                        0-Latency
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 font-medium">
                        Ledger sync
                      </div>
                    </div>

                    <div className="rounded-xl sm:rounded-2xl bg-slate-50/90 border border-slate-100 p-2.5 sm:p-3 transition-colors hover:bg-slate-100/70">
                      <div className="text-[12px] sm:text-[13px] font-bold text-slate-900 leading-tight">
                        100% RBAC
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 font-medium">
                        Strict audits
                      </div>
                    </div>

                    <div className="rounded-xl sm:rounded-2xl bg-slate-50/90 border border-slate-100 p-2.5 sm:p-3 transition-colors hover:bg-slate-100/70">
                      <div className="text-[12px] sm:text-[13px] font-bold text-slate-900 leading-tight">
                        Multi-Store
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 font-medium">
                        Warehouses
                      </div>
                    </div>

                    <div className="rounded-xl sm:rounded-2xl bg-slate-50/90 border border-slate-100 p-2.5 sm:p-3 transition-colors hover:bg-slate-100/70">
                      <div className="text-[12px] sm:text-[13px] font-bold text-slate-900 leading-tight">
                        Connected IoT
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 font-medium">
                        38+ Gateways
                      </div>
                    </div>
                  </div>

                  {/* Mobile image banner */}
                  <div className="block md:hidden mb-5 relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 shrink-0">
                    <Image
                      src="/bizbox/popup-device-exact.png"
                      alt="BizBox Hardware Device"
                      fill
                      sizes="(max-width: 768px) 100vw, 450px"
                      className="object-cover object-center"
                    />
                  </div>

                  {/* 6. Action Buttons */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 pt-1">
                    <Link
                      href="/bizbox"
                      onClick={() => setIsOpen(false)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all text-center"
                    >
                      <span>Explore BizBox Suite</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={handleDismiss}
                      className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-slate-200/90 bg-slate-50 hover:bg-slate-100 px-4 sm:px-5 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-slate-700 transition-colors cursor-pointer text-center"
                    >
                      Maybe Later
                    </button>
                  </div>
                </div>

                {/* Right Side Device Container */}
                <div className="hidden md:flex relative flex-1 min-h-[460px] lg:min-h-[500px] pointer-events-none select-none items-center justify-end overflow-hidden">
                  <Image
                    src="/bizbox/popup-device-exact.png"
                    alt="BizBox Hardware Device"
                    fill
                    sizes="(min-width: 768px) 50vw, 450px"
                    className="object-cover object-left-top scale-105"
                    priority
                  />
                  <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
