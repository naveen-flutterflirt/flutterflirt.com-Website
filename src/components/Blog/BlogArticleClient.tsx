"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Blog } from "@/types/blog";
import TiptapRenderer from "./TiptapRenderer";
import { ArrowLeft, Clock, Calendar, User, Bookmark, Share2, ChevronRight, Check } from "lucide-react";

interface BlogArticleClientProps {
  blog: Blog;
}

export default function BlogArticleClient({ blog }: BlogArticleClientProps) {
  const [activeSlug, setActiveSlug] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState(false);

  // Setup scroll spy for sections
  useEffect(() => {
    if (!blog.sections || blog.sections.length === 0) return;

    // Set initial active section
    setActiveSlug(blog.sections[0].slug);

    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find visible entries
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Take the topmost intersecting section
        setActiveSlug(visibleEntries[0].target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger when section is in top portion of viewport
      threshold: 0,
    });

    blog.sections.forEach((section) => {
      const el = document.getElementById(section.slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [blog.sections]);

  const handleCopyShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Calculate estimated reading time
  const totalWords = blog.sections.reduce((acc, sec) => {
    const text = JSON.stringify(sec.content);
    return acc + (text.match(/\w+/g)?.length || 0);
  }, 0) + (blog.excerpt?.match(/\w+/g)?.length || 0);
  const readingMinutes = Math.max(1, Math.ceil(totalWords / 180));

  const formattedDate = blog.published_at || blog.publishedAt || blog.created_at
    ? new Date(blog.published_at || blog.publishedAt || blog.created_at).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    : "Recently Published";

  return (
    <main className="min-h-screen bg-[#edf5ff] pb-32 pt-28 md:pt-36">
      {/* ── Breadcrumb & Navigation Bar ── */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="flex items-center justify-between border-b border-[#c8ddf7] pb-6">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#3b5980] transition hover:text-[#1b6fe6]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to all articles</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyShare}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#c4dcfa] bg-white px-4 py-1.5 text-xs font-semibold text-[#25466e] shadow-sm transition hover:bg-[#e4efff]"
            >
              {copiedLink ? (
                <>
                  <Check className="h-3.5 w-3.5 text-green-600" />
                  <span className="text-green-700">Copied URL</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5 text-[#2563eb]" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Article Header ── */}
      <header className="mx-auto max-w-[1400px] px-6 pt-10 lg:px-12">
        <div className="max-w-[960px]">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#d6e7ff] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#1e40af]">
            <Bookmark className="h-3 w-3" />
            {blog.category || "Insight"}
          </div>

          <h1 className="mt-5 font-serif text-[40px] font-bold leading-[1.08] text-[#112239] md:text-[58px] lg:text-[68px]">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="mt-6 text-[19px] leading-relaxed text-[#4b6382] md:text-[22px]">
              {blog.excerpt}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-[#d3e5fb] py-4 text-xs font-medium text-[#627d9f] md:text-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1b6fe6] font-bold text-white shadow-sm">
                {(blog.author || "F")[0]}
              </div>
              <span className="font-semibold text-[#1a2f4c]">{blog.author || "FlutterFlirt Team"}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-[#2563eb]" />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[#2563eb]" />
              <span>{readingMinutes} min read</span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {(blog.cover_image || blog.image) && (
          <div className="mt-10 overflow-hidden rounded-[28px] border border-[#d6e5fb] bg-white shadow-[0_20px_60px_rgba(20,50,90,0.08)]">
            <img
              src={blog.cover_image || blog.image}
              alt={blog.title}
              className="h-[320px] w-full object-cover md:h-[480px] lg:h-[540px]"
            />
          </div>
        )}
      </header>

      {/* ── Main Layout: Sidebar + Sections ── */}
      <div className="mx-auto mt-14 max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

          {/* ═════════════════════════════════════════════════
              DYNAMIC TABLE OF CONTENTS SIDEBAR (Col 1-4)
          ═════════════════════════════════════════════════ */}
          <aside className="lg:col-span-3">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-[24px] border border-[#cbe0fb] bg-white/85 p-6 shadow-[0_12px_36px_rgba(30,60,110,0.06)] backdrop-blur-md">
                <div className="flex items-center gap-2 pb-4 border-b border-[#e2edf9]">
                  <div className="h-2 w-2 rounded-full bg-[#2563eb] animate-pulse" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#213f63]">
                    Table of Contents
                  </h3>
                </div>

                <nav className="blog-sidebar mt-4 flex flex-col space-y-1.5" aria-label="Table of contents">
                  {blog.sections && blog.sections.length > 0 ? (
                    blog.sections.map((section, idx) => {
                      const isActive = activeSlug === section.slug;
                      return (
                        <a
                          key={section.id || idx}
                          href={`#${section.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveSlug(section.slug);
                            const target = document.getElementById(section.slug);
                            if (target) {
                              target.scrollIntoView({ behavior: "smooth", block: "start" });
                              history.pushState(null, "", `#${section.slug}`);
                            }
                          }}
                          className={`group flex items-start gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${isActive
                            ? "bg-[#2563eb] font-semibold text-white shadow-md shadow-blue-500/20"
                            : "text-[#4a6382] hover:bg-[#ebf4ff] hover:text-[#184478]"
                            }`}
                        >
                          <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${isActive ? "bg-white/20 text-white" : "bg-[#e5effb] text-[#3b6290]"
                              }`}
                          >
                            {idx + 1}
                          </span>
                          <span className="leading-snug">{section.heading}</span>
                        </a>
                      );
                    })
                  ) : (
                    <p className="text-xs text-[#7188a8]">No sections defined.</p>
                  )}
                </nav>
              </div>

              {/* Newsletter / CTA Card */}
              <div className="rounded-[24px] border border-[#bcd7fb] bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] p-6 text-white shadow-xl">
                <span className="text-[11px] font-bold uppercase tracking-widest text-blue-300">FlutterFlirt Studio</span>
                <h4 className="mt-2 font-serif text-xl font-bold">Build Your Next Project With Us</h4>
                <p className="mt-2 text-xs leading-relaxed text-blue-100">
                  Ready to craft world-class web and mobile experiences? Let's connect.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#1e3a8a] shadow-md transition hover:bg-blue-50"
                >
                  <span>Start Conversation</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </aside>

          {/* ═════════════════════════════════════════════════
              ORDERED BLOG SECTIONS (Col 5-12)
          ═════════════════════════════════════════════════ */}
          <div className="lg:col-span-9">
            <article className="space-y-16 rounded-[28px] border border-[#cbe0fb] bg-white p-8 shadow-[0_20px_50px_rgba(20,50,90,0.05)] md:p-12 lg:p-16">
              {blog.sections && blog.sections.length > 0 ? (
                blog.sections.map((section, idx) => (
                  <section
                    key={section.id || idx}
                    id={section.slug}
                    className="scroll-mt-36 border-b border-[#edf4fd] pb-14 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#2563eb]">
                      <span>Part {idx + 1}</span>
                      <span className="text-[#a8c6ea]">•</span>
                      <span className="font-mono text-[#7693b8]">#{section.slug}</span>
                    </div>

                    <h2 className="mt-3 font-serif text-[28px] font-bold leading-tight text-[#10233e] md:text-[36px]">
                      {section.heading}
                    </h2>

                    <div className="mt-6">
                      <TiptapRenderer content={section.content} />
                    </div>
                  </section>
                ))
              ) : (
                <div className="py-8 text-center text-[#6782a4]">
                  No section content available.
                </div>
              )}
            </article>
          </div>

        </div>
      </div>
    </main>
  );
}
