import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The FlutterFlirt page you requested could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        className="relative isolate flex items-center overflow-hidden bg-[#eef6ff] px-6 pb-20 pt-[clamp(8rem,14vh,10rem)] md:px-12 md:pb-28 lg:px-20"
        style={{ minHeight: "calc(100svh - 88px)" }}
      >
        <div className="pointer-events-none absolute -right-24 top-20 h-[360px] w-[360px] rounded-full bg-[#dceaff] opacity-70 blur-[2px]" />
        <div className="pointer-events-none absolute -bottom-32 left-[-80px] h-[320px] w-[320px] rounded-full bg-[#dcece7] opacity-80" />

        <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.28em] text-[#2563eb]">
              <span className="h-2 w-2 rounded-full bg-[#ef5350]" />
              Route not found
            </p>

            <h1
              className="mt-6 max-w-[650px] text-[#101d32]"
              style={{
                fontFamily: "var(--font-geist), Georgia, serif",
                fontSize: "clamp(3.25rem, 6.5vw, 6.5rem)",
                lineHeight: 0.9,
              }}
            >
              This page took a
              <span
                className="block text-[#2563eb]"
                style={{
                  fontFamily: "var(--font-allura), cursive",
                  fontSize: "1.18em",
                  lineHeight: 0.9,
                }}
              >
                wrong turn.
              </span>
            </h1>

            <p className="mt-8 max-w-[530px] text-[16px] leading-[1.7] text-[#647b9b] md:text-[18px]">
              The page you&apos;re looking for has moved, disappeared, or was
              never part of the plan. Let&apos;s get you back to something useful.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#2563eb] px-7 text-[14px] font-bold text-white shadow-[0_8px_24px_rgba(37,99,235,0.25)] transition-all hover:bg-[#1d4ed8] hover:shadow-[0_10px_30px_rgba(37,99,235,0.35)]"
              >
                Back to home
                <span className="ml-2 text-[17px]" aria-hidden="true">-&gt;</span>
              </Link>
              <Link
                href="/contact#contact-form"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[#a3b8e5] bg-white/60 px-7 text-[14px] font-bold text-[#2563eb] transition-all hover:border-[#2563eb] hover:bg-white"
              >
                Talk to our team
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[400px]">
            <div className="relative overflow-hidden rounded-[30px] border border-white/80 bg-white/75 p-6 shadow-[0_24px_70px_rgba(59,100,160,0.14)] backdrop-blur-md md:p-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#16865f]">
                    FlutterFlirt navigation
                  </p>
                  <p className="mt-3 text-[15px] font-semibold text-[#17243a]">
                    Nothing here, for now.
                  </p>
                </div>
                <span className="rounded-full bg-[#edf3ff] px-3 py-1 text-[11px] font-extrabold tracking-[0.08em] text-[#2563eb]">
                  404
                </span>
              </div>

              <div className="relative mt-8 flex items-center justify-center py-5">
                <div className="absolute h-40 w-40 rounded-full border border-[#a3b8e5]/60" />
                <div className="absolute h-28 w-28 rounded-full border border-[#dcece7]" />
                <span
                  className="relative text-[5.5rem] leading-none text-[#17243a]"
                  style={{ fontFamily: "var(--font-geist), Georgia, serif" }}
                >
                  404
                </span>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3 border-t border-[#e3ebf7] pt-5">
                <Link href="/services" className="rounded-[14px] bg-[#edf3ff] px-4 py-3 text-[13px] font-semibold text-[#2563eb] transition-colors hover:bg-[#dceaff]">
                  Explore services
                </Link>
                <Link href="/blog" className="rounded-[14px] bg-[#f0f8f5] px-4 py-3 text-[13px] font-semibold text-[#16865f] transition-colors hover:bg-[#dcece7]">
                  Read our blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
