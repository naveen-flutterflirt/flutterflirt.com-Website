"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { blogs } from "@/data/blog";

const categories = [
  "All",
  "Dynamics 365",
  "Power Platform",
  "Azure",
  "AI",
  "Development",
];

export default function Blog() {
  const featured = blogs.find((blog) => blog.featured);
  const latest = blogs.filter((blog) => !blog.featured);

  return (
    <main className="overflow-hidden bg-[#edf5ff]">

      {/* ================= HERO ================= */}
      <section className="px-6 pb-16 pt-32 md:px-10 md:pt-40 lg:px-16">
        <div className="mx-auto max-w-[1600px]">

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="
              text-[13px]
              font-medium
              uppercase
              tracking-[3px]
              text-[#2563eb]
            "
          >
            FlutterFlirt Insights
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-5
              max-w-[900px]
              font-serif
              text-[58px]
              font-bold
              leading-[0.95]
              tracking-[-2.5px]
              text-[#1d2b42]
              md:text-[82px]
              lg:text-[105px]
            "
          >
            Ideas that help
            <span className="italic text-[#244572]">
              {" "}businesses grow.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="
              mt-8
              max-w-[680px]
              text-[17px]
              leading-[1.6]
              text-[#7185a2]
              md:text-[19px]
            "
          >
            Practical insights on technology, business systems, digital
            transformation, and the tools helping modern organizations move
            forward.
          </motion.p>
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      {featured && (
        <section className="px-6 pb-20 md:px-10 lg:px-16">
          <div className="mx-auto max-w-[1600px]">

            <motion.article
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="
                group
                overflow-hidden
                rounded-[28px]
                bg-white
                shadow-[0_20px_60px_rgba(60,100,150,0.05)]
              "
            >
              <Link
                href={`/blog/${featured.slug}`}
                className="grid lg:grid-cols-2"
              >
                <div className="h-[350px] overflow-hidden lg:h-[500px]">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                  />
                </div>

                <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
                  <span
                    className="
                      w-fit
                      rounded-full
                      bg-[#d7eee8]
                      px-4
                      py-2
                      text-[13px]
                      font-medium
                      text-[#16865f]
                    "
                  >
                    {featured.category}
                  </span>

                  <h2
                    className="
                      mt-6
                      max-w-[600px]
                      font-serif
                      text-[38px]
                      font-bold
                      leading-[1.05]
                      tracking-[-1px]
                      text-[#1d2b42]
                      md:text-[48px]
                    "
                  >
                    {featured.title}
                  </h2>

                  <p className="mt-6 max-w-[550px] text-[16px] leading-[1.6] text-[#7185a2]">
                    {featured.excerpt}
                  </p>

                  <div className="mt-8 flex items-center gap-4 text-[14px] text-[#8a9bb3]">
                    <span>{featured.date}</span>
                    <span>•</span>
                    <span>{featured.readTime}</span>
                  </div>

                  <div className="mt-8 text-[15px] font-medium text-[#2563eb]">
                    Read article
                    <span className="ml-2 transition-transform group-hover:ml-3">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>

          </div>
        </section>
      )}

      {/* ================= LATEST ================= */}
      <section className="px-6 pb-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1600px]">

          <div className="flex flex-col justify-between gap-6 border-t border-dashed border-[#a9c9ff] pt-8 md:flex-row md:items-center">

            <h2 className="text-[26px] font-semibold text-[#1d2b42]">
              Latest insights
            </h2>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category, index) => (
                <button
                  key={category}
                  type="button"
                  className={`
                    shrink-0
                    rounded-full
                    px-4
                    py-2
                    text-[14px]
                    transition-all
                    ${
                      index === 0
                        ? "bg-[#2563eb] text-white"
                        : "bg-white text-[#526987] hover:bg-[#e5efff]"
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog grid */}
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {latest.map((blog, index) => (
              <motion.article
                key={blog.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                className="
                  group
                  overflow-hidden
                  rounded-[24px]
                  bg-white
                  transition-shadow
                  duration-300
                  hover:shadow-[0_20px_50px_rgba(60,100,150,0.08)]
                "
              >
                <Link href={`/blog/${blog.slug}`}>

                  {/* Image */}
                  <div className="h-[250px] overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-105
                      "
                    />
                  </div>

                  {/* Content */}
                  <div className="p-7">

                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[13px] font-medium text-[#2563eb]">
                        {blog.category}
                      </span>

                      <span className="text-[13px] text-[#9aa9bd]">
                        {blog.readTime}
                      </span>
                    </div>

                    <h3
                      className="
                        mt-4
                        font-serif
                        text-[27px]
                        font-bold
                        leading-[1.08]
                        text-[#1d2b42]
                      "
                    >
                      {blog.title}
                    </h3>

                    <p className="mt-4 text-[15px] leading-[1.6] text-[#7185a2]">
                      {blog.excerpt}
                    </p>

                    <div className="mt-6 text-[14px] font-medium text-[#2563eb]">
                      Read more →
                    </div>

                  </div>
                </Link>
              </motion.article>
            ))}

          </div>
        </div>
      </section>

    </main>
  );
}