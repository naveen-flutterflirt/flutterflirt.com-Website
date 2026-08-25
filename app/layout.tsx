import type { Metadata } from "next";
import { Bigshot_One, Allura, Manrope, Geist } from "next/font/google";
import "./globals.css";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ScrollToTop from "@/components/ScrollToTop";
import { cn } from "@/lib/utils";


const bigshotOne = Bigshot_One({
  variable: "--font-bigshot-one",
  subsets: ["latin"],
  weight: "400",
});

const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: "400",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flutterflirt.com"),
  title: {
    default: "FlutterFlirt | Enterprise Technology & Digital Transformation",
    template: "%s | FlutterFlirt",
  },
  description:
    "FlutterFlirt helps ambitious businesses modernize operations with Dynamics 365, Power Platform, Azure integrations, and custom digital experiences.",
  applicationName: "FlutterFlirt",
  keywords: [
    "Dynamics 365 consulting",
    "Power Platform consulting",
    "Azure integrations",
    "ERP implementation",
    "CRM implementation",
    "custom software development",
    "digital transformation",
  ],
  authors: [{ name: "FlutterFlirt Technologies Pvt. Ltd." }],
  creator: "FlutterFlirt Technologies Pvt. Ltd.",
  publisher: "FlutterFlirt Technologies Pvt. Ltd.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    url: "https://flutterflirt.com",
    siteName: "FlutterFlirt",
    title: "FlutterFlirt | Enterprise Technology & Digital Transformation",
    description:
      "Modern ERP, CRM, automation, cloud integration, and custom software solutions for growing businesses.",
    images: [
      {
        url: "/logo-black.webp",
        width: 512,
        height: 512,
        alt: "FlutterFlirt",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "FlutterFlirt | Enterprise Technology & Digital Transformation",
    description:
      "Modern ERP, CRM, automation, cloud integration, and custom software solutions for growing businesses.",
    images: ["/logo-black.webp"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", bigshotOne.variable, allura.variable, manrope.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://flutterflirt.com/#organization",
                  name: "FlutterFlirt Technologies Pvt. Ltd.",
                  url: "https://flutterflirt.com",
                  logo: "https://flutterflirt.com/logo-black.webp",
                  email: "info@flutterflirt.com",
                  telephone: "+918926104326",
                  sameAs: [
                    "https://www.linkedin.com/company/flutterflirt?originalSubdomain=in",
                    "https://www.instagram.com/official.flutterflirt/",
                    "https://www.youtube.com/@flutterflirt",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://flutterflirt.com/#website",
                  url: "https://flutterflirt.com",
                  name: "FlutterFlirt",
                  publisher: { "@id": "https://flutterflirt.com/#organization" },
                },
              ],
            }),
          }}
        />
        <ScrollToTop />
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
