"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const reviews = [
  {
    quote:
      "FlutterFlirt helped Kaveri Egg Works bring our farm-to-pack operations into one connected D365 Business Central system. We gained complete traceability, clearer reporting, and a team that stayed with us through every stage of delivery.",
    author: "Operations Team",
    company: "Kaveri Egg Works • Manufacturing",
    initials: "KE",
    avatarClass: "bg-[#203f69]",
  },
  {
    quote:
      "C-Quick Serve gave us a faster, more reliable dispatch workflow. FlutterFlirt helped us connect order processing and delivery operations so our team could serve customers with confidence.",
    author: "Operations Team",
    company: "C-Quick Serve • Retail & QSR",
    initials: "CQ",
    avatarClass: "bg-[#d83c2d]",
  },
  {
    quote:
      "The team helped IIM Udaipur consolidate six systems into one connected student lifecycle. The result is a clearer experience for students and a more efficient operation for staff.",
    author: "Technology Team",
    company: "IIM Udaipur • Higher Education",
    initials: "IU",
    avatarClass: "bg-[#16804f]",
  },
  {
    quote:
      "FlutterFlirt modernized our warehouse operations with connected mobile workflows and dependable data. Our teams now move faster, with fewer delays and much better visibility.",
    author: "Distribution Team",
    company: "Distribution & 3PL",
    initials: "D3",
    avatarClass: "bg-[#374151]",
  },
  {
    quote:
      "The hospital chain project gave our teams a more unified view of billing and operations. FlutterFlirt delivered a dependable system that supports better decisions across every facility.",
    author: "Healthcare Operations Team",
    company: "Hospital Chain • Healthcare",
    initials: "HC",
    avatarClass: "bg-[#6d28d9]",
  },
];

export default function Testimonials() {
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % reviews.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const review = reviews[activeReview];

  return (
    <section className="bg-[#edf5ff] px-6 pb-20 pt-8 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1600px]">

        {/* Top separator */}
        <div className="mb-12 border-t border-dashed border-[#b8d2ff]" />

        {/* Testimonial Card */}
        <div
          className="
            rounded-[22px]
            border
            border-[#dce7f4]
            bg-white
            px-8
            py-10
            md:px-10
            md:py-11
            lg:px-10
          "
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeReview}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
          {/* Testimonial content */}
          <div className="flex gap-5">
            {/* Quote mark */}
            <div
              className="
                shrink-0
                pt-1
                font-serif
                text-[42px]
                font-bold
                leading-none
                text-[#ef3d3d]
              "
            >
              “
            </div>

            {/* Text */}
            <p
              className="
                max-w-[1350px]
                text-[16px]
                font-normal
                leading-[1.55]
                text-[#1f2d43]
                md:text-[20px]
                lg:text-[22px]
              "
            >
              {review.quote}
            </p>
          </div>

          {/* Author */}
          <div className="mt-7 flex items-center gap-5">

            {/* Avatar */}
            <div
              className={`flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full text-[17px] font-bold tracking-wide text-white ${review.avatarClass}`}
            >
              <span aria-label={`${review.company} avatar`}>{review.initials}</span>
            </div>

            {/* Author information */}
            <div>
              <h3
                className="
                  text-[18px]
                  font-semibold
                  leading-tight
                  text-[#1f2d43]
                "
              >
                {review.author}
              </h3>

              <p
                className="
                  mt-1
                  text-[16px]
                  leading-tight
                  text-[#7185a2]
                "
              >
                {review.company}
              </p>
            </div>
          </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}