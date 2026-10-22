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

    // Auto-trigger: Open automatically after 3.5s if not dismissed in this session
    const isDismissed = sessionStorage.getItem("ff_bizbox_popup_dismissed");
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem("ff_bizbox_popup_dismissed", "true");
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. SLEEK FLOATING PILL (Bottom-left trigger)
         ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {badgeVisible && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-6 z-[9990]"
          >
            <button
              type="button"
              onClick={handleOpenModal}
              className="group relative flex items-center gap-2.5 rounded-full border border-blue-500/30 bg-[#0a1122]/90 px-4 py-2 text-white shadow-[0_8px_32px_rgba(20,55,140,0.35)] backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-blue-400 hover:bg-[#0e1933] hover:shadow-[0_12px_40px_rgba(37,99,235,0.45)] active:scale-95 cursor-pointer"
              aria-label="View BizBox ERP"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
              </span>

              <span className="text-[13px] font-bold tracking-tight text-white group-hover:text-blue-200 transition-colors">
                BizBox ERP
              </span>

              <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-blue-300">
                New
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
          2. MINIMAL WHITE LUXURY POPUP (Pixel-perfect matching user image)
         ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9998] flex items-center justify-center p-3 sm:p-5 md:p-6 lg:p-8 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleDismiss}
              className="fixed inset-0 bg-slate-950/65 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 18 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[880px] my-auto overflow-hidden rounded-[24px] sm:rounded-[32px] md:rounded-[36px] bg-white shadow-[0_30px_90px_rgba(15,23,42,0.3)] border border-slate-100 max-h-[92vh] flex flex-col md:flex-row"
            >
              {/* Circular Close Button (top-right) */}
              <button
                onClick={handleDismiss}
                aria-label="Close modal"
                className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-slate-100/90 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-all shadow-xs cursor-pointer"
              >
                <X className="h-4 w-4 stroke-[2.5]" />
              </button>

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
                  {/* Card 1 */}
                  <div className="rounded-xl sm:rounded-2xl bg-slate-50/90 border border-slate-100 p-2.5 sm:p-3 transition-colors hover:bg-slate-100/70">
                    <div className="text-[12px] sm:text-[13px] font-bold text-slate-900 leading-tight">
                      0-Latency
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 font-medium">
                      Ledger sync
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="rounded-xl sm:rounded-2xl bg-slate-50/90 border border-slate-100 p-2.5 sm:p-3 transition-colors hover:bg-slate-100/70">
                    <div className="text-[12px] sm:text-[13px] font-bold text-slate-900 leading-tight">
                      100% RBAC
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 font-medium">
                      Strict audits
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="rounded-xl sm:rounded-2xl bg-slate-50/90 border border-slate-100 p-2.5 sm:p-3 transition-colors hover:bg-slate-100/70">
                    <div className="text-[12px] sm:text-[13px] font-bold text-slate-900 leading-tight">
                      Multi-Store
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 font-medium">
                      Warehouses
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="rounded-xl sm:rounded-2xl bg-slate-50/90 border border-slate-100 p-2.5 sm:p-3 transition-colors hover:bg-slate-100/70">
                    <div className="text-[12px] sm:text-[13px] font-bold text-slate-900 leading-tight">
                      Connected IoT
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 font-medium">
                      38+ Gateways
                    </div>
                  </div>
                </div>

                {/* Mobile/Tablet image banner between text and buttons */}
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

              {/* Right Side Device Photographic Container (Desktop & Large Screens) */}
              <div className="hidden md:flex relative flex-1 min-h-[460px] lg:min-h-[500px] pointer-events-none select-none items-center justify-end overflow-hidden">
                <Image
                  src="/bizbox/popup-device-exact.png"
                  alt="BizBox Hardware Device"
                  fill
                  sizes="(min-width: 768px) 50vw, 450px"
                  className="object-cover object-left-top scale-105"
                  priority
                />
                {/* Soft natural edge gradient into pure white content column */}
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
