import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/data/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) notFound();

  const related = blogs
    .filter((b) => b.slug !== slug)
    .filter((b) => b.category === blog.category)
    .concat(blogs.filter((b) => b.slug !== slug && b.category !== blog.category))
    .slice(0, 3);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#eef6ff]">

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-[#eef6ff] px-6 pb-0 pt-36 md:px-12 md:pt-44 lg:px-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,#ffffff_0%,#edf6ff_50%,#dceaff_100%)]" />

          <div className="relative mx-auto max-w-[900px]">
            {/* Back */}
            <Link
              href="/blog"
              className="group mb-8 inline-flex items-center gap-2 text-[13px] font-medium text-[#7184a0] transition-colors hover:text-[#2563eb]"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
              Back to insights
            </Link>

            {/* Category + meta */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#edf3ff] px-3.5 py-1.5 text-[11.5px] font-semibold text-[#2563eb]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
                {blog.category}
              </span>
              <span className="text-[13px] text-[#a3b8e5]">{blog.date}</span>
              <span className="h-1 w-1 rounded-full bg-[#a3b8e5]" />
              <span className="text-[13px] text-[#a3b8e5]">{blog.readTime}</span>
            </div>

            {/* Title */}
            <h1
              className="mt-6 leading-[1.02] tracking-[-0.04em] text-[#17243a]"
              style={{
                fontFamily: "var(--font-bigshot-one), Georgia, serif",
                fontSize: "clamp(2rem, 4.5vw, 4rem)",
              }}
            >
              {blog.title}
            </h1>

            {/* Lead */}
            <p className="mt-6 text-[17px] leading-[1.75] text-[#7184a0] md:text-[18px]">
              {blog.excerpt}
            </p>

            <div className="mt-10 h-px bg-gradient-to-r from-[#2563eb]/25 via-[#a3b8e5] to-transparent" />
          </div>
        </section>

        {/* ══════════════════════════════════════
            HERO IMAGE
        ══════════════════════════════════════ */}
        <div className="relative bg-[#eef6ff] px-6 pt-10 md:px-12 lg:px-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,#ffffff_0%,#edf6ff_50%,#dceaff_100%)]" />
          <div className="relative mx-auto max-w-[900px] overflow-hidden rounded-[24px] border border-[#a3b8e5] shadow-[0_20px_60px_rgba(59,100,160,0.12)]">
            <Image
              src={blog.image}
              alt={blog.title}
              width={900}
              height={500}
              className="h-[240px] w-full object-cover sm:h-[360px] md:h-[460px]"
              priority
            />
          </div>
        </div>

        {/* ══════════════════════════════════════
            ARTICLE  +  SIDEBAR
        ══════════════════════════════════════ */}
        <main className="px-6 py-16 md:px-12 lg:px-20">
          <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[1fr_280px]">

            {/* Article body */}
            <article className="rounded-[24px] border border-[#a3b8e5] bg-white p-8 shadow-[0_6px_30px_rgba(59,100,160,0.07)] md:p-12">

              <div className="space-y-6 text-[16.5px] leading-[1.85] text-[#526987]">
                <p>{blog.excerpt}</p>
                <p>
                  In today&apos;s competitive landscape, organisations that embrace modern platforms gain measurable advantages in speed, visibility, and operational resilience. Partnering with the right technology advisor is no longer optional—it&apos;s a strategic imperative.
                </p>

                <h2
                  className="mt-8 text-[24px] tracking-[-0.02em] text-[#17243a]"
                  style={{ fontFamily: "var(--font-bigshot-one), Georgia, serif" }}
                >
                  Why it matters now
                </h2>
                <p>
                  The convergence of cloud infrastructure, AI-driven automation, and real-time analytics has created a window of opportunity for enterprises willing to modernise. Those that act decisively position themselves ahead of competitors still relying on fragmented legacy systems.
                </p>
                <p>
                  FlutterFlirt has guided dozens of organisations through this transformation—from initial discovery and architecture design through to go-live and continuous optimisation. Our approach is always system-first, business-outcome-second, because sustainable growth requires both.
                </p>

                <h2
                  className="mt-8 text-[24px] tracking-[-0.02em] text-[#17243a]"
                  style={{ fontFamily: "var(--font-bigshot-one), Georgia, serif" }}
                >
                  Key considerations
                </h2>

                <ul className="space-y-3">
                  {[
                    "Align platform selection with your 3–5 year business roadmap.",
                    "Prioritise integration over point solutions to avoid data silos.",
                    "Invest in change management alongside technical implementation.",
                    "Establish clear KPIs before go-live to measure real ROI.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2563eb]" />
                      {item}
                    </li>
                  ))}
                </ul>

                <h2
                  className="mt-8 text-[24px] tracking-[-0.02em] text-[#17243a]"
                  style={{ fontFamily: "var(--font-bigshot-one), Georgia, serif" }}
                >
                  The FlutterFlirt approach
                </h2>
                <p>
                  We don&apos;t just implement software—we architect ecosystems. Every engagement starts with a deep-dive discovery session to understand your current state, goals, and constraints. From there, we design a phased roadmap that delivers quick wins while building toward the larger vision.
                </p>
                <p>
                  Whether you&apos;re starting from scratch or modernising an existing stack, our certified consultants bring the experience and methodology to make the transition smooth, fast, and measurably valuable.
                </p>
              </div>

              {/* Author + share */}
              <div className="mt-12 flex flex-col gap-6 border-t border-[#edf3ff] pt-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#2563eb]">
                    <img src="/icon.svg" alt="FF" className="h-6 w-6 brightness-0 invert" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#17243a]">FlutterFlirt Editorial</p>
                    <p className="text-[12.5px] text-[#7184a0]">Consulting & Technology team</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {["LinkedIn", "Twitter / X", "Copy link"].map((s) => (
                    <button
                      key={s}
                      className="rounded-full border border-[#a3b8e5] px-4 py-1.5 text-[12px] font-medium text-[#7184a0] transition-all duration-200 hover:border-[#2563eb] hover:text-[#2563eb]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </article>

            {/* Sticky sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-5">

                {/* Table of contents */}
                <div className="rounded-[20px] border border-[#b8d8ca] bg-[#dcece7] p-6 shadow-[0_6px_24px_rgba(22,134,95,0.08)]">
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#16865f]">In this article</p>
                  <ul className="mt-4 space-y-3">
                    {["Overview", "Why it matters now", "Key considerations", "The FlutterFlirt approach"].map((h) => (
                      <li key={h} className="flex items-center gap-2 text-[13px] text-[#111827] transition-colors hover:text-[#16865f] cursor-pointer">
                        <span className="h-px w-4 bg-[#8fc5ae]" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="relative overflow-hidden rounded-[20px] border border-[#a3b8e5] bg-white p-6 shadow-[0_6px_24px_rgba(59,100,160,0.07)]">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#dceaff]" />
                  <p className="relative text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#2563eb]">Get started</p>
                  <p className="relative mt-2 text-[15px] font-light leading-snug tracking-[0.01em] text-[#17243a]"
                    style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                  >
                    Ready to transform your business?
                  </p>
                  <p className="relative mt-2 text-[13px] leading-relaxed text-[#7184a0]">
                    Talk to our team about your next project.
                  </p>
                  <Link
                    href="/contact"
                    className="relative mt-5 inline-flex rounded-full bg-[#2563eb] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_4px_14px_rgba(37,99,235,0.28)] transition-all hover:bg-[#1d4ed8]"
                  >
                    Contact us →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </main>

        {/* ══════════════════════════════════════
            RELATED POSTS
        ══════════════════════════════════════ */}
        {related.length > 0 && (
          <section className="border-t border-dashed border-[#a3b8e5] px-6 py-20 md:px-12 lg:px-20">
            <div className="mx-auto max-w-[1200px]">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#2563eb]">Continue reading</p>
              <h2
                className="mt-1 tracking-[-0.03em] text-[#17243a]"
                style={{
                  fontFamily: "var(--font-bigshot-one), Georgia, serif",
                  fontSize: "clamp(1.6rem, 2vw, 2.2rem)",
                }}
              >
                Related Insights
              </h2>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex gap-4 rounded-[20px] border border-[#a3b8e5] bg-white p-5 shadow-[0_4px_20px_rgba(59,100,160,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(59,100,160,0.12)]"
                  >
                    <div className="relative h-[80px] w-[110px] flex-shrink-0 overflow-hidden rounded-[12px]">
                      <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#edf3ff] px-2.5 py-0.5 text-[10.5px] font-semibold text-[#2563eb]">
                        {post.category}
                      </span>
                      <p className="mt-1.5 text-[13.5px] font-semibold leading-tight text-[#17243a] line-clamp-2">
                        {post.title}
                      </p>
                      <p className="mt-1 text-[11.5px] text-[#a3b8e5]">{post.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <Footer />
    </>
  );
}
