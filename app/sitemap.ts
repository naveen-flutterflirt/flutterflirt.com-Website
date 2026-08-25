import type { MetadataRoute } from "next";
import { blogs } from "@/data/blog";

const SITE_URL = "https://flutterflirt.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/our-story`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];

  return [
    ...routes,
    ...blogs.map((blog) => ({
      url: `${SITE_URL}/blog/${blog.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}