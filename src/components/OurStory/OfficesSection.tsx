"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";

interface OfficeLocation {
  id: string;
  number: string;
  numberColor: "blue" | "coral";
  label: string;
  city: string;
  region: string;
  coordinates: string;
  image: string;
}

const OFFICES: OfficeLocation[] = [
  {
    id: "bengaluru",
    number: "01",
    numberColor: "blue",
    label: "HEADQUARTERS",
    city: "Bengaluru",
    region: "Karnataka, India",
    coordinates: "12.9716° N, 77.5946° E",
    image: "/Bhubneaswar.png",
  },
  {
    id: "new-york",
    number: "02",
    numberColor: "coral",
    label: "GLOBAL OFFICE",
    city: "New York",
    region: "U.S.",
    coordinates: "40.7128° N, 74.0060° W",
    image: "/NewYork.png",
  },
  {
    id: "bhubaneswar",
    number: "03",
    numberColor: "blue",
    label: "GLOBAL OFFICE",
    city: "Bhubaneswar",
    region: "Odisha, India",
    coordinates: "20.2961° N, 85.8245° E",
    image: "/Bhubneaswar.png",
  },
  {
    id: "bhopal",
    number: "06",
    numberColor: "blue",
    label: "GLOBAL OFFICE",
    city: "Bhopal",
    region: "Madhya Pradesh, India",
    coordinates: "23.2599° N, 77.4126° E",
    image: "/Bhopal.png",
  },
  {
    id: "kentucky",
    number: "04",
    numberColor: "coral",
    label: "GLOBAL OFFICE",
    city: "Kentucky",
    region: "U.S.",
    coordinates: "37.8393° N, 84.2700° W",
    image: "/Kentucky.png",
  },
  {
    id: "mumbai",
    number: "05",
    numberColor: "blue",
    label: "GLOBAL OFFICE",
    city: "Mumbai",
    region: "Maharashtra, India",
    coordinates: "19.0760° N, 72.8777° E",
    image: "/Mumbai.png",
  },
];

// Interactive 3D Flip Card Component (Isolated per card, flips on hover, auto-reverts to content after 2s)
function FlipOfficeCard({
  office,
  index,
}: {
  office: OfficeLocation;
  index: number;
}) {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    setIsFlipped(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    // After flipping image, after 2 seconds show content again
    timerRef.current = setTimeout(() => {
      setIsFlipped(false);
    }, 2000);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        delay: 0.08 + index * 0.08,
        duration: 0.5,
        ease: "easeOut",
      }}
      className="w-full h-[210px] sm:h-[225px] md:h-[235px] [perspective:1000px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Flipping Container */}
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative h-full w-full rounded-[20px] cursor-pointer"
      >
        {/* ===== FRONT FACE (Exact Figma Layout with Thin Typography & Matching Sans-Serif Numbers) ===== */}
        <div className="absolute inset-0 h-full w-full rounded-[20px] border border-[#e2edf9] bg-white p-5 sm:p-6 shadow-[0_6px_20px_rgba(20,50,90,0.04)] flex flex-col justify-between [backface-visibility:hidden]">
          
          {/* Header */}
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#64748b]">
                {office.label}
              </p>
              {/* Thin Elegant City Name */}
              <h3
                className="mt-1 text-[21px] sm:text-[23px] font-normal tracking-[-0.01em] text-[#0a0f18]"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {office.city}
              </h3>
              <p className="text-[12px] sm:text-[13px] font-normal text-[#64748b] mt-0.5">
                {office.region}
              </p>
            </div>

            {/* Number Badge (Exact Same Sans-Serif Font as the '2' in Header) */}
            <span
              className={`text-[32px] sm:text-[38px] font-sans font-bold leading-none tracking-tight select-none ${
                office.numberColor === "coral"
                  ? "text-[#F14F57]"
                  : "text-[#2563eb]"
              }`}
            >
              {office.number}
            </span>
          </div>

          {/* Footer */}
          <div className="relative z-10 flex items-center justify-between pt-3 border-t border-[#f0f4f9]">
            <div className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-mono text-[#64748b]">
              <span className="h-2 w-2 rounded-full bg-[#2563eb]" />
              <span>{office.coordinates}</span>
            </div>

            <span className="flex items-center gap-1 text-[10.5px] sm:text-[11px] font-bold text-[#2563eb] tracking-wide">
              VIEW LOCATION →
            </span>
          </div>

        </div>

        {/* ===== BACK FACE (Pure Image Only - No Text) ===== */}
        <div className="absolute inset-0 h-full w-full rounded-[20px] overflow-hidden border border-[#e2edf9] shadow-[0_16px_40px_rgba(20,50,90,0.14)] [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <Image
            src={office.image}
            alt={`${office.city} photo`}
            fill
            className="object-cover object-center"
          />
        </div>

      </motion.div>
    </motion.div>
  );
}

export default function OfficesSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f4f8fe] py-14 sm:py-20 lg:py-28">
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-8 md:px-12 lg:px-16">
        
        {/* Main Floating Outer Card */}
        <div className="relative mx-auto max-w-[1340px] rounded-[28px] sm:rounded-[36px] md:rounded-[44px] border border-[#e2edf9] bg-white/95 p-6 sm:p-10 md:p-14 lg:p-18 shadow-[0_30px_90px_rgba(25,50,95,0.06)] backdrop-blur-sm">
          
          {/* Top Section Header & Country Stats */}
          <div className="mb-10 sm:mb-12 grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_0.7fr] items-start">
            
            {/* Left Title & Description */}
            <div>
              <p className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.22em] text-[#2563eb]">
                CURRENT SCALE
              </p>
              
              <h2 className="mt-2 text-[32px] sm:text-[40px] md:text-[46px] font-normal leading-[1.1] tracking-[-0.03em] text-[#0a0f18]">
                <span
                  className="font-normal text-[1.12em] tracking-normal inline-block pr-2 select-none"
                  style={{
                    fontFamily: "var(--font-allura), 'Brush Script MT', cursive",
                    color: "#F14F57",
                  }}
                >
                  Six
                </span>
                <span style={{ fontFamily: "var(--font-bigshot-one), Georgia, serif" }}>
                  Offices.
                </span>
              </h2>

              <p className="mt-3.5 max-w-[620px] text-[13.5px] sm:text-[14.5px] md:text-[15px] text-[#475569] leading-relaxed">
                From our headquarters in Innovation District, CA, to hubs across the globe, we are strategically positioned to deploy top-tier talent wherever complex systemic challenges arise. We operate as one unified entity, regardless of geography.
              </p>
            </div>

            {/* Right Stats Widget (Exact Figma Match) */}
            <div className="flex flex-col sm:items-end justify-center lg:pt-2">
              <div className="flex items-center gap-5">
                {/* Coral/Red Google Globe Icon Badge (Exact Screenshot Design) */}
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#fde8e8] shadow-sm flex-shrink-0">
                  <svg
                    className="h-8 w-8 sm:h-9 sm:w-9"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                      fill="#ea4b53"
                    />
                  </svg>
                </div>

                {/* Exact Sans-Serif '2' and Serif 'Countries' */}
                <div className="flex flex-col">
                  <div
                    className="text-[60px] sm:text-[72px] font-bold leading-[0.88] tracking-tight text-[#F14F57] font-sans select-none"
                  >
                    2
                  </div>
                  <p
                    className="text-[17px] sm:text-[19px] font-normal text-[#0a0f18] mt-1"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                  >
                    Countries
                  </p>
                </div>
              </div>

              {/* Upcoming Locations */}
              <div className="mt-4 sm:text-right">
                <p
                  className="text-[17px] sm:text-[19px] font-bold text-[#0a0f18]"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  Upcoming locations
                </p>
                <p className="text-[14.5px] sm:text-[15.5px] font-light text-[#475569] mt-0.5">
                  Australia.
                </p>
              </div>
            </div>

          </div>

          {/* 6 Office Cards Grid (3 Columns x 2 Rows on Desktop) */}
          <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {OFFICES.map((office, idx) => (
              <FlipOfficeCard key={office.id} office={office} index={idx} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}




