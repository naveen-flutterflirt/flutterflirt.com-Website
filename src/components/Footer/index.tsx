import Link from "next/link";

const locations = [
  {
    city: "Bengaluru (HQ)",
    country: "Karnataka, India",
  },
  {
    city: "New York",
    country: "U.S",
  },
  {
    city: "Bhubaneshwar",
    country: "Odisha, India",
  },
  {
    city: "Kentucky",
    country: "U.S",
  },
  {
    city: "Mumbai",
    country: "Maharashtra, India",
  },
  {
    city: "Bhopal",
    country: "Madhya Pradesh, India",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] px-10 pb-5 pt-10 text-white md:px-12 lg:px-10">
      <div className="mx-auto max-w-[1800px]">

        {/* ================= MAIN FOOTER ================= */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px_280px]">

          {/* ================= BRAND ================= */}
          <div className="flex min-h-[350px] flex-col">

            {/* Logo */}
            <Link href="/" className="inline-flex w-fit items-center">
              <div className="flex items-center gap-2">
               <img src="logo-white.png" width={167} height={111}  alt="FlutterFlirt Logo" />

              </div>
            </Link>

            {/* Description */}
            <div className="mt-16">
              <p className="text-[18px] font-light text-[#c3cad7]">
                At FlutterFlirt, we don't simply deliver software.
              </p>

              <p
                className="
                  mt-1
                  max-w-[800px]
                  font-serif
                  text-[23px]
                  font-bold
                  leading-[1.2]
                  text-white
                "
              >
                We built the digital foundation modern businesses rely on to
                grow.
              </p>
            </div>

            {/* Legal */}
            <div className="mt-auto pt-12">
              <div className="flex gap-10">
                <Link
                  href="/privacy"
                  className="
                    text-[15px]
                    text-[#4b5565]
                    transition-colors
                    hover:text-white
                  "
                >
                  Privacy Policies
                </Link>

                <Link
                  href="/services"
                  className="
                    text-[15px]
                    text-[#4b5565]
                    transition-colors
                    hover:text-white
                  "
                >
                  Service Policies
                </Link>
              </div>

              <p className="mt-2 text-[14px] text-[#4b5565]">
                © 2026 FlutterFlirt Technologies Pvt. Ltd. · All rights
                reserved.
              </p>
            </div>
          </div>

          {/* ================= LOCATIONS ================= */}
          <div>
            <h3
              className="
                text-[19px]
                font-normal
                uppercase
                tracking-[1px]
                text-[#2773e6]
              "
            >
              Our Locations
            </h3>

            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5">
              {locations.map((location) => (
                <div key={location.city}>
                  <p className="text-[19px] font-normal text-white">
                    {location.city}
                  </p>

                  <p className="mt-1 text-[14px] text-[#71809a]">
                    {location.country}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ================= CONTACT ================= */}
          <div>
            <h3
              className="
                text-[19px]
                font-normal
                uppercase
                tracking-[1px]
                text-[#2773e6]
              "
            >
              Contact
            </h3>

            {/* Email */}
            <a
              href="mailto:info@flutterflirt.com"
              className="
                mt-6
                flex
                items-center
                gap-2
                text-[18px]
                text-white
                transition-colors
                hover:text-[#2773e6]
              "
            >
              {/* Mail */}
              <svg
                className="h-5 w-5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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

              info@flutterflirt.com
            </a>

            {/* Phone */}
            <a
              href="tel:8926104326"
              className="
                mt-2
                flex
                items-center
                gap-2
                text-[18px]
                text-white
                transition-colors
                hover:text-[#2773e6]
              "
            >
              {/* Phone */}
              <svg
                className="h-5 w-5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2
                  19.79 19.79 0 0 1-8.63-3.07
                  19.5 19.5 0 0 1-6-6
                  19.79 19.79 0 0 1-3.07-8.67
                  A2 2 0 0 1 4.11 2h3
                  a2 2 0 0 1 2 1.72
                  12.84 12.84 0 0 0 .7 2.81
                  2 2 0 0 1-.45 2.11L8.09 9.91
                  a16 16 0 0 0 6 6l1.27-1.27
                  a2 2 0 0 1 2.11-.45
                  12.84 12.84 0 0 0 2.81.7
                  A2 2 0 0 1 22 16.92z"
                />
              </svg>

              8926104326
            </a>

            {/* Socials */}
            <div className="mt-8 flex items-center gap-7">

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/flutterflirt?originalSubdomain=in"
                aria-label="LinkedIn"
                className="transition-colors hover:text-[#2773e6]"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6.5 8.5H3V21h3.5V8.5ZM4.75 3A2.05 2.05 0 1 0 4.75 7.1 2.05 2.05 0 0 0 4.75 3ZM21 13.9c0-3.77-2.01-5.53-4.69-5.53-2.15 0-3.11 1.18-3.65 2.01V8.5H9.16V21h3.5v-6.19c0-1.63.31-3.2 2.33-3.2 1.99 0 2.02 1.85 2.02 3.3V21H21v-7.1Z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/official.flutterflirt/"
                aria-label="Instagram"
                className="transition-colors hover:text-[#2773e6]"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@flutterflirt"
                aria-label="YouTube"
                className="transition-colors hover:text-[#2773e6]"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="3" y="5" width="18" height="14" rx="4" />
                  <path d="m10 9 5 3-5 3V9Z" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM LINES ================= */}
        <div className="flex justify-end">
        <div className="grid grid-cols-1 gap-1">
        <span className="h-[4px] w-[100px] rounded-full bg-[#0879bb]" />
          <span className="h-[4px] w-[100px] rounded-full bg-[#ef3d45]" />
          <span className="h-[4px] w-[100px] rounded-full bg-[#168b5c]" /></div>
        
          </div>
        

      </div>
    </footer>
  );
}