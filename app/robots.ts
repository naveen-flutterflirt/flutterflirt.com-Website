import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/flutterflirt-admin-login/"],
    },
    sitemap: "https://flutterflirt.com/sitemap.xml",
  };
}