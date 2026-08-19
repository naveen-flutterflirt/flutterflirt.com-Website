"use client";

import { motion } from "motion/react";
import { Headphones, Rocket, ShieldCheck, Users } from "lucide-react";
import {
  slideFromLeft,
  slideFromRight,
} from "@/components/animations/variants";

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-[#edf5ff] px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1400px]">

        {/* ================= MISSION ================= */}
        <motion.div
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        
            className="
              rounded-[20px]
              bg-[#e5efff]
              px-6
              py-7
              md:px-10
              md:py-8
              lg:px-12
            "
          >
          <p
            className="
              max-w-[1250px]
              font-serif
              text-[16px]
              font-bold
              leading-[1.35]
              text-[#203556]
              md:text-[22px]
              lg:text-[26px]
            "
          >
            “We partner with organizations to simplify operations, eliminate
            disconnected systems, and build scalable digital ecosystems that
            support long-term growth.”
          </p>

          <p
            className="
              mt-4
              text-sm
              font-medium
              uppercase
              tracking-wide
              text-[#1769ff]
            "
          >
            Our Mission
          </p>
        </motion.div>

        {/* ================= BEYOND IMPLEMENTATION ================= */}
        <motion.div
          variants={slideFromRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        
            className="
              mt-14
              flex
              flex-col
              gap-8
              rounded-[20px]
              bg-white
              px-8
              py-8
              shadow-[0_10px_40px_rgba(40,80,130,0.03)]
              lg:flex-row
              lg:items-center
              lg:px-9
            "
          >         
          {/* Icon */}
          <div
            className="
              flex
              h-[60px]
              w-[60px]
              shrink-0
              items-center
              justify-center
              rounded-[14px]
              bg-[#e9f1ff]
              text-[#0969ff]
            "
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 3L18.5 11.5L27 14L18.5 16.5L16 25L13.5 16.5L5 14L13.5 11.5L16 3Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M25 4V9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M22.5 6.5H27.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <h2
              className="
                text-[22px]
                font-semibold
                text-[#ef3d3d]
              "
            >
              Beyond Implementation.
            </h2>

            <p
              className="
                mt-3
                max-w-[900px]
                text-[15px]
                leading-[1.45]
                text-[#526987]
                md:text-[16px]
              "
            >
              From strategy and consulting to implementation, customization,
              integration, migration, user training, managed services, and
              continuous optimization—we stay with our clients through every
              stage of their digital journey.
            </p>
          </div>

          {/* Focus */}
          <div
            className="
              shrink-0
              border-t
              border-[#d8e1ed]
              pt-5
              lg:w-[275px]
              lg:border-l
              lg:border-t-0
              lg:pl-8
              lg:pt-0
            "
          >
            <p
              className="
                text-xs
                font-medium
                uppercase
                tracking-wide
                text-[#8ba0bb]
              "
            >
              Our Focus
            </p>

            <h3
              className="
                mt-2
                text-[22px]
                font-semibold
                text-[#ef3d3d]
              "
            >
              ERP & CRM
            </h3>

            <p
              className="
                mt-1
                text-sm
                leading-[1.4]
                text-[#526987]
              "
            >
              at the core. Everything else to make it exceptional.
            </p>
          </div>
        </motion.div>

        {/* ================= HOW WE WORK ================= */}
        <div className="mt-24 border-t border-dashed border-[#a9c9ff] pt-7">

          <h2
            className="
              text-[22px]
              font-semibold
              text-[#1d2b42]
            "
          >
            How We Work
          </h2>
          
          
          

          <div
            className="
              mt-10
              grid
              grid-cols-1
              gap-12
              md:grid-cols-2
              lg:grid-cols-4
              lg:gap-10
            "
          >
            {/* Step 1 */}
            <div>
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-[12px]
                  bg-[#d7eee8]
                  text-sm
                  font-medium
                  text-[#16865f]
                "
              >
                1
              </div>

              <h3 className="mt-3 text-lg font-semibold text-[#1d2b42]">
                Assess
              </h3>

              <p className="mt-3 text-[15px] leading-[1.55] text-[#7185a2]">
                Align goals, map workflows, and define the right technology
                stack.
              </p>
            </div>

            {/* Step 2 */}
            <div>
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-[12px]
                  bg-[#d7eee8]
                  text-sm
                  font-medium
                  text-[#16865f]
                "
              >
                2
              </div>

              <h3 className="mt-3 text-lg font-semibold text-[#1d2b42]">
                Build
              </h3>

              <p className="mt-3 text-[15px] leading-[1.55] text-[#7185a2]">
                Configure, customize, and build integrations with your team.
              </p>
            </div>

            {/* Step 3 */}
            <div>
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-[12px]
                  bg-[#d7eee8]
                  text-sm
                  font-medium
                  text-[#16865f]
                "
              >
                3
              </div>

              <h3 className="mt-3 text-lg font-semibold text-[#1d2b42]">
                Integrate
              </h3>

              <p className="mt-3 text-[15px] leading-[1.55] text-[#7185a2]">
                Connect systems, migrate data, and validate end-to-end flows.
              </p>
            </div>

            {/* Step 4 */}
            <div>
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-[12px]
                  bg-[#d7eee8]
                  text-sm
                  font-medium
                  text-[#16865f]
                "
              >
                4
              </div>

              <h3 className="mt-3 text-lg font-semibold text-[#1d2b42]">
                Support
              </h3>

              <p className="mt-3 text-[15px] leading-[1.55] text-[#7185a2]">
                Train users, monitor, and optimize for long-term growth.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom separator */}
        <div className="mt-24 border-t border-dashed border-[#a9c9ff]" /></div>

        {/* ================= WHY BUSINESSES CHOOSE US ================= */}
        <div className="mt-0 rounded-[22px] bg-[#edf4fc] px-5 py-8 sm:px-8 sm:py-10 md:px-10 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_2fr] lg:items-center lg:gap-10">
            {/* Heading */}
            <div>
            <h2
                className="text-[28px] font-bold leading-[1.12] text-[#1d2b42] md:text-[32px]"
            >
                Why Businesses Choose FlutterFlirt
            </h2>

            <p
                className="mt-3 max-w-[320px] text-[15px] leading-relaxed text-[#7185a2] md:text-[17px]"
            >
                Technology should accelerate business—not complicate it.
            </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4 lg:gap-3">
              {[
              { value: "100+", label: <>Happy Clients<br />Across Industries</>, Icon: Users, iconBg: "bg-[#203f69]", valueColor: "text-[#111d32]" },
              { value: "250+", label: <>Projects Delivered<br />Successfully</>, Icon: Rocket, iconBg: "bg-[#d83c2d]", valueColor: "text-[#ed3d3d]" },
              { value: "24/7", label: <>Support & Monitoring<br />We are always here</>, Icon: Headphones, iconBg: "bg-[#16804f]", valueColor: "text-[#111d32]" },
              { value: "100%", label: <>Commitment<br />To client success</>, Icon: ShieldCheck, iconBg: "bg-[#374151]", valueColor: "text-[#111d32]" },
              ].map(({ value, label, Icon, iconBg, valueColor }) => (
              <div key={value} className="flex min-h-[112px] flex-col rounded-[14px] border border-white/70 bg-white/75 p-3 shadow-[0_8px_24px_rgba(40,80,130,0.04)] transition-transform duration-200 hover:-translate-y-1 lg:h-[132px] lg:p-4">
                <div className="flex items-center gap-2.5">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] ${iconBg} text-white`}>
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className={`text-[26px] font-bold leading-none ${valueColor} sm:text-[30px]`}>{value}</h3>
                </div>
                <p className="mt-3 min-h-[34px] text-[11px] leading-[1.35] text-[#7185a2] sm:text-[13px]">{label}</p>
              </div>
              ))}
            </div>
        </div>
        </div>

    </section>
    
  );
}