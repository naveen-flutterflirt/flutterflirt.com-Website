"use client";

import { motion } from "motion/react";

export default function Contact() {
  return (
    <main className="overflow-hidden bg-[#edf5ff]">

      {/* ================= HERO ================= */}
      <section className="px-6 pb-20 pt-32 md:px-10 md:pt-40 lg:px-16">
        <div className="mx-auto max-w-[1600px]">

          {/* Eyebrow */}
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
            Contact FlutterFlirt
          </motion.p>

          {/* Heading */}
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
              max-w-[950px]
              font-serif
              text-[58px]
              font-bold
              leading-[0.95]
              tracking-[-2.5px]
              text-[#1d2b42]
              md:text-[80px]
              lg:text-[105px]
            "
          >
            Let's build something
            <span className="italic text-[#244572]">
              {" "}meaningful.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.25,
            }}
            className="
              mt-8
              max-w-[650px]
              text-[17px]
              leading-[1.6]
              text-[#7185a2]
              md:text-[19px]
            "
          >
            Have a project in mind, need help with your existing systems, or
            simply want to explore what's possible? We'd love to hear from you.
          </motion.p>
        </div>
      </section>


      {/* ================= CONTACT AREA ================= */}
      <section className="px-6 pb-24 md:px-10 lg:px-16">
        <div
          className="
            mx-auto
            grid
            max-w-[1600px]
            gap-6
            lg:grid-cols-[0.8fr_1.5fr]
          "
        >

          {/* ================= CONTACT INFO ================= */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              min-h-[520px]
              overflow-hidden
              rounded-[28px]
              bg-[#dcece7]
              p-8
              md:p-10
              lg:p-12
            "
          >
            {/* Decorative circle */}
            <div
              className="
                absolute
                -right-20
                -top-20
                h-[220px]
                w-[220px]
                rounded-full
                bg-[#c5ded7]
                blur-[2px]
              "
            />

            <div className="relative z-10 flex h-full flex-col">

              <p
                className="
                  text-[13px]
                  font-medium
                  uppercase
                  tracking-[2px]
                  text-[#16865f]
                "
              >
                Get in touch
              </p>

              <h2
                className="
                  mt-5
                  max-w-[350px]
                  font-serif
                  text-[40px]
                  font-bold
                  leading-[1]
                  tracking-[-1px]
                  text-[#172b27]
                  md:text-[48px]
                "
              >
                Let's start a conversation.
              </h2>

              <p
                className="
                  mt-6
                  max-w-[390px]
                  text-[16px]
                  leading-[1.6]
                  text-[#58736d]
                "
              >
                Tell us what you're working on and we'll figure out the best
                way to move forward together.
              </p>

              {/* Contact details */}
              <div className="mt-auto space-y-6 pt-16">

                {/* Email */}
                <a
                  href="mailto:info@flutterflirt.com"
                  className="group flex items-center gap-4"
                >
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-[15px]
                      bg-white/70
                      text-[#16865f]
                      transition-transform
                      duration-300
                      group-hover:scale-105
                    "
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                      />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </div>

                  <div>
                    <p className="text-[13px] text-[#718f88]">
                      Email us
                    </p>

                    <p className="mt-1 text-[17px] font-medium text-[#172b27]">
                      info@flutterflirt.com
                    </p>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:8926104326"
                  className="group flex items-center gap-4"
                >
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-[15px]
                      bg-white/70
                      text-[#16865f]
                      transition-transform
                      duration-300
                      group-hover:scale-105
                    "
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 .12 4.18 2 2 0 0 1 2.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L6.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>

                  <div>
                    <p className="text-[13px] text-[#718f88]">
                      Call us
                    </p>

                    <p className="mt-1 text-[17px] font-medium text-[#172b27]">
                      8926104326
                    </p>
                  </div>
                </a>

              </div>
            </div>
          </motion.div>


          {/* ================= FORM ================= */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              rounded-[28px]
              bg-white
              p-8
              shadow-[0_20px_60px_rgba(60,100,150,0.06)]
              md:p-10
              lg:p-12
            "
          >
            <div className="mb-10">
              <p
                className="
                  text-[13px]
                  font-medium
                  uppercase
                  tracking-[2px]
                  text-[#2563eb]
                "
              >
                Start a project
              </p>

              <h2
                className="
                  mt-3
                  font-serif
                  text-[38px]
                  font-bold
                  leading-[1]
                  tracking-[-1px]
                  text-[#1d2b42]
                  md:text-[46px]
                "
              >
                Tell us about it.
              </h2>
            </div>

            <form className="space-y-7">

              {/* Name + Email */}
              <div className="grid gap-7 md:grid-cols-2">

                <div>
                  <label
                    htmlFor="name"
                    className="text-[14px] font-medium text-[#526987]"
                  >
                    Your name
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="
                      mt-2
                      w-full
                      border-b
                      border-[#d8e1ed]
                      bg-transparent
                      py-3
                      text-[16px]
                      text-[#1d2b42]
                      outline-none
                      transition-colors
                      placeholder:text-[#a8b5c7]
                      focus:border-[#2563eb]
                    "
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-[14px] font-medium text-[#526987]"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    className="
                      mt-2
                      w-full
                      border-b
                      border-[#d8e1ed]
                      bg-transparent
                      py-3
                      text-[16px]
                      text-[#1d2b42]
                      outline-none
                      transition-colors
                      placeholder:text-[#a8b5c7]
                      focus:border-[#2563eb]
                    "
                  />
                </div>

              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="text-[14px] font-medium text-[#526987]"
                >
                  Phone number
                </label>

                <input
                  id="phone"
                  type="tel"
                  placeholder="+91 00000 00000"
                  className="
                    mt-2
                    w-full
                    border-b
                    border-[#d8e1ed]
                    bg-transparent
                    py-3
                    text-[16px]
                    text-[#1d2b42]
                    outline-none
                    transition-colors
                    placeholder:text-[#a8b5c7]
                    focus:border-[#2563eb]
                  "
                />
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="company"
                  className="text-[14px] font-medium text-[#526987]"
                >
                  Company
                </label>

                <input
                  id="company"
                  type="text"
                  placeholder="Your company"
                  className="
                    mt-2
                    w-full
                    border-b
                    border-[#d8e1ed]
                    bg-transparent
                    py-3
                    text-[16px]
                    text-[#1d2b42]
                    outline-none
                    transition-colors
                    placeholder:text-[#a8b5c7]
                    focus:border-[#2563eb]
                  "
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="text-[14px] font-medium text-[#526987]"
                >
                  Tell us about your project
                </label>

                <textarea
                  id="message"
                  rows={4}
                  placeholder="What are you looking to build?"
                  className="
                    mt-2
                    w-full
                    resize-none
                    border-b
                    border-[#d8e1ed]
                    bg-transparent
                    py-3
                    text-[16px]
                    text-[#1d2b42]
                    outline-none
                    transition-colors
                    placeholder:text-[#a8b5c7]
                    focus:border-[#2563eb]
                  "
                />
              </div>

              {/* Submit */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-3
                    rounded-full
                    bg-[#2563eb]
                    px-7
                    py-3.5
                    text-[15px]
                    font-medium
                    text-white
                    transition-all
                    duration-300
                    hover:translate-x-1
                    hover:bg-[#1d56c7]
                    active:scale-[0.98]
                  "
                >
                  Send message

                  <span
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  >
                    →
                  </span>
                </button>
              </div>

            </form>
          </motion.div>

        </div>
      </section>

      {/* ================= BOTTOM CTA ================= */}
      <section className="px-6 pb-24 md:px-10 lg:px-16">
        <div
          className="
            mx-auto
            max-w-[1600px]
            rounded-[28px]
            border
            border-[#d8e5f5]
            bg-[#e5efff]
            px-8
            py-12
            text-center
            md:px-12
            md:py-16
          "
        >
          <p className="text-[14px] uppercase tracking-[2px] text-[#2563eb]">
            Prefer a direct conversation?
          </p>

          <h2
            className="
              mx-auto
              mt-4
              max-w-[700px]
              font-serif
              text-[38px]
              font-bold
              leading-[1]
              tracking-[-1px]
              text-[#1d2b42]
              md:text-[52px]
            "
          >
            Call us and let's talk.
          </h2>

          <a
            href="tel:8926104326"
            className="
              mt-7
              inline-flex
              rounded-full
              border
              border-[#2563eb]
              px-7
              py-3
              text-[15px]
              font-medium
              text-[#2563eb]
              transition-all
              duration-300
              hover:bg-[#2563eb]
              hover:text-white
            "
          >
            8926104326
          </a>
        </div>
      </section>

    </main>
  );
}