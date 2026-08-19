"use client";

import { useState } from "react";
import Link from "next/link";

const services = [
  {
    icon: "icon-1.svg",
    color: "#D4E7E1",
    text_color : "#1A7A4A",
    title: "Dynamics 365 Finance & Operations",
    image: "service-1.webp",
    description:
      "End-to-end ERP for finance, supply chain, manufacturing, and business operations.",
    tags: ["Finance", "Supply Chain", "Manufacturing", "Retail"],
  },
  {
    icon: "icon-2.svg",
    color: "#E5EBF7",
    text_color : "#2C5BA9",
    title: "Dynamics 365 Business Central",
    image: "service-2.svg",
    description:
      "The right-sized ERP for growing companies, helping streamline finance and operations.",
    tags: ["Localization", "NAV Upgrades", "Growing Businesses"],
  },
  {
    icon: "icon-3.svg",
    color: "#F9EAEF",
    text_color : "#F14F57",
    title: "Customer Engagement (CRM)",
    image: "service-3.svg",
    description:
      "Sales, Service, Field Service, and Marketing solutions to strengthen customer relationships.",
    tags: ["Sales", "Service", "Field Service", "Marketing"],
  },
  {
    icon: "icon-4.svg",
    color: "#DAC3E4",
    text_color : "#6A0087",
    title: "Resource Augmentation & Outsourcing",
    image: "service-4.svg",
    description:
      "On-demand D365 and React consultants to extend your team and accelerate delivery.",
    tags: ["Staff Augmentation", "Outsourcing", "On-Demand"],
  },
  {
    icon: "icon-5.svg",
    color: "#F5BDE2",
    text_color : "#F80788",
    title: "Power Platform",
    image: "service-5.svg",
    description:
      "Power Apps, Power Automate, Power BI, and Copilot Studio solutions for smarter workflows.",
    tags: ["Power Apps", "Automate", "BI", "Copilot Studio"],
  },
  {
    icon: "icon-6.svg",
    color: "#FBECD7",
    text_color : "#FF9810",
    title: "Azure & Integrations",
    image: "service-6.svg",
    description:
      "Landing zones, Data Factory, Synapse, and APIs to connect and scale your digital ecosystem.",
    tags: ["Landing Zones", "Data Factory", "Synapse", "APIs"],
  },
  {
    icon: "icon-7.svg",
    color: "#F6F6D3",
    text_color : "#EBE425",
    title: "Custom Apps — React & Next.js",
    image: "service-7.svg",
    description:
      "Portals, dashboards, and headless CMS solutions built for modern digital experiences.",
    tags: ["Web Portals", "Dashboards", "Headless CMS"],
  },
  {
    icon: "icon-8.svg",
    color: "#FAEBEF",
    text_color : "#F14F57",
    title: "D365 Academy",
    image: "service-8.svg",
    description:
      "Structured training and placement programs to build practical Dynamics 365 expertise.",
    tags: ["Training", "Certification", "Placement"],
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="overflow-hidden bg-[#edf5ff] px-8 pb-16 pt-8 md:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-[1280px]">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-[26px] font-semibold text-[#1d2b42]">
            Services
          </h2>

          <Link
            href="/services"
            className="
              rounded-full
              border
              border-[#dce8f7]
              px-5
              py-2.5
              text-[15px]
              font-medium
              text-[#2563eb]
              transition-all
              duration-300
              hover:bg-[#2563eb]
              hover:text-white
            "
          >
            View all services →
          </Link>
        </div>

        {/* Cards */}
        <div
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          className="
            flex
            gap-5
            overflow-x-auto
            scroll-smooth
            snap-x
            snap-mandatory
            pb-3
            [scrollbar-width:none]
            [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {services.map((service, index) => {
            const isActive = activeIndex === index;

            return (
              <article
                key={service.title}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveIndex(index);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                className={`
                  group
                  relative
                  h-[468px]
                  shrink-0
                  snap-center
                  cursor-pointer
                  overflow-hidden
                  rounded-[26px]
                  bg-white
                  transition-all
                  duration-500
                  ease-out
                  ${isActive ? "w-[336px]" : "w-[168px]"}
                `}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className={`
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    ${isActive ? "scale-[1.03]" : "scale-100"}
                  `}
                />

                <div
                  className={`
                    absolute
                    inset-0
                    z-10
                    transition-opacity
                    duration-300
                    ${isActive ? "opacity-50" : "opacity-0"}
                  `}
                />

                <div
                  className={`
                    absolute
                    inset-0
                    z-20
                    p-6
                    transition-all
                    bg-white/60
                    duration-500
                    ${isActive ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}
                  `}
                >
                  <div
                    style={{ backgroundColor: service.color }}
                    className="mb-5 inline-flex h-[56px] w-[56px] items-center justify-center rounded-[20px]"
                  >
                    <img src={service.icon} className="h-[21px] w-[21px]" alt={service.title} />
                  </div>

                  <h3 
                    style={{ 
                      color: "#414141", 
                     
                    }}
                    className="max-w-[270px] font-bold font-serif text-[27px] font-bold leading-[1.05] text-shadow-[0_1px_2px_rgba(255,255,255,0.7)]"
                  >
                    {service.title}
                  </h3>

                  <div className="absolute bottom-6 left-6 right-6 flex max-w-[290px] flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{ backgroundColor: service.color }}
                        className="
                          rounded-full
                          px-5
                          py-2
                          text-[14px]
                          font-normal
                          text-[#000000]
                          text-shadow-[0_1px_2px_rgba(d,d,d,0.3)]
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="mt-7 flex items-center justify-center gap-2" aria-label="Service carousel status">
          {services.map((_, index) => (
            <span
              key={index}
              aria-hidden="true"
              className={`
                block
                h-2
                rounded-full
                transition-all
                duration-300
                ${
                  activeIndex === index
                    ? "w-8 bg-[#2563eb]"
                    : "w-2 bg-[#bfd3ed]"
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}