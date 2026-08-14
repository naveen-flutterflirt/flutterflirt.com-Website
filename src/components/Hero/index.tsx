"use client";

import { motion } from "motion/react";

const cardAnimation = {
  initial: (direction: { x: number; y: number }) => ({
    opacity: 0,
    x: direction.x,
    y: direction.y,
    scale: 0.8,
  }),

  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
  },
};

export default function Hero() {
  return (
    <section
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#eef6ff]
      "
    >
      {/* Background */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_65%_45%,#ffffff_0%,#edf6ff_45%,#dceaff_100%)]
        "
      />

      {/* Main content */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          w-[92%]
          max-w-[1400px]
          items-center
          pt-24
        "
      >
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr]">

          {/* ================= LEFT ================= */}
          <div className="max-w-[680px] height-[484px] flex-col 
          py-10" >

            {/* Label */}
            <p
              className="
                mb-7
                text-sm
                font-medium
                uppercase
                tracking-[0.25em]
                text-[#2563eb]
              "
            >
              About FlutterFlirt
            </p>

            {/* Heading */}
            <h1
              className="
                font-serif
                text-[50px]
                font-bold
                leading-[0.95]
                tracking-[-2px]
                text-[#050505]
              "
            >
              <span className="inline-block py-3">More Than Software.</span>
              
              <br />
                <span className="inline-block">We Build Business</span>
              
              <br />

              <span
                className="
                  font-[family-name:var(--font-allura)]
                   text-[68px]
                    font-normal
                    tracking-normal
                    text-[#244572]
                "
              >
                Growth.
              </span>
            </h1>

            {/* Description */}
            <div
              className="
                mt-7
                max-w-[650px]
                space-y-6
                text-[17px]
                leading-[1.65]
                text-[#647b9b]
                md:text-[18px]
              "
            >
              <p>
                Technology alone doesn&apos;t transform businesses—strategy,
                expertise, and execution do.
              </p>

              <p>
                FlutterFlirt partners with organizations to simplify
                operations through Microsoft Dynamics 365, ERP, CRM, AI
                automation, cloud solutions, and custom software development.
                We help businesses eliminate disconnected systems, streamline
                workflows, and build scalable digital ecosystems that support
                long-term growth.
              </p>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div
            className="
              relative
              hidden
              h-[580px]
              lg:block
            "
          >

            {/* Analytics Card */}
            <motion.div
              custom={{ x: -250, y: -220 }}
              variants={cardAnimation}
              initial="initial"
              animate="animate"
              transition={{
                duration: 1.1,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                left-[2%]
                top-[10%]
                w-[350px]
                rounded-[18px]
                border-1
                border-[#a3b8e5]
                bg-white/90
                p-6
                shadow-[0_20px_50px_rgba(59,100,160,0.10)]
                backdrop-blur-xl
              "
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-[#17243a]">
                  <span className="h-2 w-2 rounded-full bg-[#2563eb]" />
                  Dynamics 365 Analytics
                </div>

                <span className="text-xs font-medium text-[#2563eb]">
                  LIVE
                </span>
              </div>

              <div className="mt-5 text-[34px] font-bold text-[#17243a]">
                $142,384
              </div>

              <p className="mt-1 text-sm text-[#7184a0]">
                Operations pipeline this quarter
              </p>

              {/* Fake chart */}
              <div className="mt-5 h-[55px]">
                <svg
                  viewBox="0 0 250 55"
                  className="h-full w-full"
                  fill="none"
                >
                  <path
                    d="M0 42 L30 25 L60 42 L95 20 L110 48 L150 24"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Dynamics 365 */}
            <motion.div
              custom={{ x: 300, y: -200 }}
              variants={cardAnimation}
              initial="initial"
              animate="animate"
              transition={{
                duration: 1.1,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                right-[4%]
                top-0
                w-[255px]
                rounded-[18px]
                border-1
                border-[#a3b8e5]
                bg-white
                p-5
                shadow-[0_20px_50px_rgba(59,100,160,0.10)]
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#edf3ff]
                  text-xl
                  text-[#2563eb]
                "
              >
                ✦
              </div>

              <h3 className="mt-4 text-xl font-semibold text-[#17243a]">
                Dynamics 365
              </h3>

              <p className="mt-1 text-sm text-[#7184a0]">
                Business Central & Finance
              </p>
            </motion.div>

            {/* ERP Sync */}
            <motion.div
              custom={{ x: 350, y: -30 }}
              variants={cardAnimation}
              initial="initial"
              animate="animate"
              transition={{
                duration: 1,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                right-[10%]
                top-[30%]
                w-[280px]
                rounded-[16px]
                bg-white
                border-1
                border-[#a3b8e5]
                px-5
                py-4
                shadow-[0_15px_40px_rgba(59,100,160,0.08)]
              "
            >
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#edf3ff] text-[#2563eb]">
                  ◉
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-[#17243a]">
                    ERP Sync Active
                  </h4>

                  <p className="text-xs text-[#7184a0]">
                    12 micro-services online
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CRM Hub */}
            <motion.div
              custom={{ x: -350, y: 40 }}
              variants={cardAnimation}
              initial="initial"
              animate="animate"
              transition={{
                duration: 1.1,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                left-[7%]
                top-[57%]
                w-[300px]
                rounded-[18px]
                bg-white
                border-1
                border-[#a3b8e5]
                p-5
                shadow-[0_20px_50px_rgba(59,100,160,0.10)]
              "
            >
              <h3 className="text-xl font-semibold text-[#17243a]">
                CRM Hub
              </h3>

              <p className="mt-1 text-sm text-[#7184a0]">
                Sales · Marketing · Customer Care
              </p>
            </motion.div>

            {/* Center sync circle */}
            <motion.div
                initial={{
                  opacity: 0,
                  scale: 0,
                  rotate: 0,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 360,
                }}
                transition={{
                  duration: 1,
                  delay: 0.4,
                  ease: "easeOut",
                }}

              className="
                absolute
                left-[56%]
                top-[50%]
                flex
                h-[54px]
                w-[54px]
                -translate-x-1/2
                items-center
                justify-center
                rounded-full
                bg-[#2563eb]
                text-xl
                text-white
                shadow-[0_10px_30px_rgba(37,99,235,0.30)]
              "
            >
              <img src="/refresh-cw.svg" alt="Sync" className="h-6 w-6 brightness-100 invert" />
            </motion.div>

            {/* Cloud Node */}
            <motion.div
              custom={{ x: 400, y: 30 }}
              variants={cardAnimation}
              initial="initial"
              animate="animate"
              transition={{
                duration: 1,
                delay: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                right-0
                top-[45%]
                rounded-[14px]
                bg-white
                px-5
                border-1
                border-[#a3b8e5]
                py-4
                shadow-[0_15px_40px_rgba(59,100,160,0.08)]
              "
            >
              <div className="flex items-center gap-3">
                <span className="text-[#2563eb]">♧</span>

                <span className="text-sm font-semibold text-[#17243a]">
                  Cloud Native Node
                </span>
              </div>
            </motion.div>

            {/* Security */}
            <motion.div
              custom={{ x: 350, y: 250 }}
              variants={cardAnimation}
              initial="initial"
              animate="animate"
              transition={{
                duration: 1.1,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                right-[2%]
                top-[57%]
                w-[260px]
                rounded-[18px]
                bg-white
                border-1
                border-[#a3b8e5]
                p-5
                shadow-[0_20px_50px_rgba(59,100,160,0.10)]
              "
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf3ff] text-[#2563eb]">
                ◆
              </div>

              <h3 className="mt-4 text-xl font-semibold text-[#17243a]">
                Security & Compliance
              </h3>

              <p className="mt-1 text-sm text-[#7184a0]">
                Data protection & access
              </p>
            </motion.div>

            {/* AI Logic Router */}
            <motion.div
              custom={{ x: -180, y: 250 }}
              variants={cardAnimation}
              initial="initial"
              animate="animate"
              transition={{
                duration: 1.2,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                bottom-[5%]
                left-[25%]
                w-[255px]
                rounded-[15px]
                bg-white
                border-1
                border-[#a3b8e5]
                p-4
                shadow-[0_15px_40px_rgba(59,100,160,0.08)]
              "
            > 
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#17243a]">
                  ⚙ AI Logic Router
                </span>

                <span className="text-xs font-medium text-[#2563eb]">
                  +94.2%
                </span>
              </div>

              <p className="mt-2 text-xs text-[#7184a0]">
                Efficiency
              </p>

              <div className="mt-2 h-1.5 rounded-full bg-[#dbe7f8]">
                <div className="h-full w-[94%] rounded-full bg-[#2563eb]" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}