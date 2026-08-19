"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { blogs } from "@/data/blog";
import type { Blog as BlogPost } from "@/types/blog";

const CATEGORIES = ["All", "Dynamics 365", "Power Platform", "Azure", "AI", "Development"];

export default function Blog({ initialBlogs = [] }: { initialBlogs?: BlogPost[] }) {
  const [active, setActive] = useState("All");

  const getReadTime = (blog: any) => {
    if (blog.readTime) return blog.readTime;
    let wordCount = 0;
    blog.sections?.forEach((s: any) => {
      wordCount += s.heading ? s.heading.split(/\s+/).length : 0;
      if (s.content) {
        const text = typeof s.content === "string" ? s.content : JSON.stringify(s.content);
        wordCount += text.split(/\s+/).length;
      }
    });
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    return `${minutes} min read`;
  };

  const getFormattedDate = (blog: any) => {
    if (blog.date) return blog.date;
    const dateStr = blog.published_at || blog.publishedAt || blog.created_at;
    if (!dateStr) return "Aug 19, 2026";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const displayBlogs = initialBlogs.length > 0 ? initialBlogs : blogs;

  const featured = displayBlogs.find((b) => b.featured) || displayBlogs[0];

  const grid = displayBlogs.filter(
    (b) => b.slug !== featured?.slug && (active === "All" || b.category === active)
  );

  return (
    <div className="min-h-screen bg-[#eef6ff]">

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#eef6ff] px-6 pb-20 pt-36 md:px-12 md:pt-44 lg:px-20">
        {/* Radial bg — same as hero page */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,#ffffff_0%,#edf6ff_50%,#dceaff_100%)]" />

        <div className="relative mx-auto max-w-[1400px]">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium uppercase tracking-[0.25em] text-[#2563eb]"
          >
            FlutterFlirt Insights
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
            Ideas that move
            <br />
            <span
              style={{
                fontFamily: "var(--font-allura), cursive",
                color: "#244572",
                fontSize: "1.08em",
                letterSpacing: "normal",
              }}
            >
              businesses forward.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mt-7 max-w-[560px] text-[17px] leading-[1.65] text-[#647b9b] md:text-[18px]"
          >
            Practical insights on Dynamics 365, AI automation, cloud, and the
            tools helping modern enterprises scale with confidence.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURED ARTICLE
      ══════════════════════════════════════ */}
      <section className="px-6 pb-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-[28px] border border-[#a3b8e5] bg-white shadow-[0_20px_60px_rgba(59,100,160,0.10)] transition-all duration-500 hover:shadow-[0_30px_80px_rgba(59,100,160,0.16)] lg:grid-cols-[1.15fr_0.85fr]"
            >
              {/* Image */}
              <div className="relative h-[280px] overflow-hidden lg:h-[480px]">
                {featured && (
                  <Image
                    src={featured.image || (featured as any).cover_image || "/blog/blog-1.webp"}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-[#2563eb] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-md">
                  Featured
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#edf3ff] px-3.5 py-1.5 text-[11.5px] font-semibold tracking-wide text-[#2563eb]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
                  {featured.category}
                </span>

                <h2
                  className="mt-5 leading-[1.05] tracking-[-0.03em] text-[#17243a]"
                  style={{
                    fontFamily: "var(--font-bigshot-one), Georgia, serif",
                    fontSize: "clamp(1.55rem, 2.4vw, 2.6rem)",
                  }}
                >
                  {featured.title}
                </h2>

                <p className="mt-5 text-[15px] leading-[1.7] text-[#7184a0]">
                  {featured.excerpt}
                </p>

                <div className="mt-5 flex items-center gap-2.5 text-[13px] text-[#a3b8e5]">
                  <span>{getFormattedDate(featured)}</span>
                  <span className="h-1 w-1 rounded-full bg-[#a3b8e5]" />
                  <span>{getReadTime(featured)}</span>
                </div>

                <div className="mt-8 inline-flex items-center gap-2.5">
                  <span className="rounded-full bg-[#2563eb] px-6 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_4px_14px_rgba(37,99,235,0.30)] transition-all duration-300 group-hover:bg-[#1d4ed8] group-hover:shadow-[0_6px_20px_rgba(37,99,235,0.40)]">
                    Read article
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#a3b8e5] text-[#2563eb] transition-all duration-300 group-hover:translate-x-1 group-hover:border-[#2563eb] group-hover:bg-[#edf3ff]">
                    →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          LATEST — FILTER + GRID
      ══════════════════════════════════════ */}
      <section className="px-6 pb-28 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1400px]">

          {/* Section header + filter */}
          <div className="mb-10 flex flex-col gap-5 border-t border-dashed border-[#a3b8e5] pt-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#2563eb]">Latest</p>
              <h2
                className="mt-1 tracking-[-0.03em] text-[#17243a]"
                style={{
                  fontFamily: "var(--font-bigshot-one), Georgia, serif",
                  fontSize: "clamp(1.6rem, 2vw, 2.2rem)",
                }}
              >
                More Insights
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 max-w-full overflow-hidden">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`rounded-full border px-4 py-1.5 text-[13px] font-medium transition-all duration-200 ${
                    active === cat
                      ? "border-[#2563eb] bg-[#2563eb] text-white shadow-[0_2px_12px_rgba(37,99,235,0.28)]"
                      : "border-[#a3b8e5] bg-white text-[#647b9b] hover:border-[#2563eb] hover:text-[#2563eb]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {grid.length === 0 ? (
                <p className="col-span-3 py-16 text-center text-[16px] text-[#a3b8e5]">
                  No articles in this category yet.
                </p>
              ) : (
                grid.map((blog, i) => (
                  <motion.article
                    key={blog.slug}
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex flex-col overflow-hidden rounded-[24px] border border-[#a3b8e5] bg-white shadow-[0_6px_24px_rgba(59,100,160,0.07)] transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(59,100,160,0.14)]"
                  >
                    <Link href={`/blog/${blog.slug}`} className="flex flex-1 flex-col">
                      <div className="relative h-[210px] overflow-hidden">
                        <Image
                          src={blog.image || (blog as any).cover_image || "/blog/blog-1.webp"}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-600 group-hover:scale-[1.05]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#edf3ff] px-3 py-1 text-[11px] font-semibold text-[#2563eb]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
                            {blog.category}
                          </span>
                          <span className="text-[12px] text-[#a3b8e5]">{getReadTime(blog)}</span>
                        </div>

                        <h3
                          className="mt-4 flex-1 leading-[1.15] tracking-[-0.02em] text-[#17243a]"
                          style={{
                            fontFamily: "var(--font-bigshot-one), Georgia, serif",
                            fontSize: "clamp(1.1rem, 1.4vw, 1.35rem)",
                          }}
                        >
                          {blog.title}
                        </h3>

                        <p className="mt-3 text-[13.5px] leading-[1.65] text-[#7184a0] line-clamp-2">
                          {blog.excerpt}
                        </p>

                        <div className="mt-5 flex items-center justify-between border-t border-[#edf3ff] pt-4">
                          <span className="text-[12px] text-[#a3b8e5]">{getFormattedDate(blog)}</span>
                          <span className="flex items-center gap-1 text-[13px] font-semibold text-[#2563eb] transition-all duration-200 group-hover:gap-2">
                            Read more →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))
              )}
            </motion.div>
          </AnimatePresence>
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
            {/* Decorative circle — same as offices section */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-[260px] w-[260px] rounded-full bg-[#dceaff]/60 blur-[2px]" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-[200px] w-[200px] rounded-full bg-[#edf3ff]" />

            <p className="relative text-[11px] font-bold uppercase tracking-[0.22em] text-[#2563eb]">
              Work with us
            </p>
            <h2
              className="relative mt-3 tracking-[-0.03em] text-[#17243a]"
              style={{
                fontFamily: "var(--font-bigshot-one), Georgia, serif",
                fontSize: "clamp(1.8rem, 3vw, 3.2rem)",
              }}
            >
              Ready to transform your{" "}
              <span style={{ fontFamily: "var(--font-allura), cursive", color: "#F14F57", fontSize: "1.15em" }}>
                business?
              </span>
            </h2>
            <p className="relative mx-auto mt-4 max-w-[460px] text-[15px] leading-[1.65] text-[#7184a0]">
              Talk to our team about Dynamics 365, ERP, AI, and custom solutions built for long-term growth.
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-[#2563eb] px-8 py-3.5 text-[14px] font-semibold text-white shadow-[0_4px_18px_rgba(37,99,235,0.32)] transition-all duration-300 hover:bg-[#1d4ed8] hover:shadow-[0_6px_24px_rgba(37,99,235,0.42)]"
              >
                Start a project
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-[#a3b8e5] px-8 py-3.5 text-[14px] font-semibold text-[#647b9b] transition-all duration-300 hover:border-[#2563eb] hover:text-[#2563eb]"
              >
                View services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
