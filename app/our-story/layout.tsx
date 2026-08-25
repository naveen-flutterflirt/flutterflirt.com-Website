import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story and Global Technology Team",
  description:
    "Learn how FlutterFlirt grew from a focused technology team into a global partner for enterprise systems, automation, and digital transformation.",
};

export default function OurStoryLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}