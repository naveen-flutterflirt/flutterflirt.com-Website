import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogArticleClient from "@/components/Blog/BlogArticleClient";
import { Blog } from "@/types/blog";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    // Cache for 60 seconds using Next.js ISR
    const response = await fetch(`${API_URL}/api/blogs/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      notFound();
    }

    const json = await response.json();
    const blog: Blog = json.data || json.blog;

    if (!blog) {
      notFound();
    }

    return (
      <>
        <Navbar />
        <BlogArticleClient blog={blog} />
        <Footer />
      </>
    );
  } catch (error) {
    console.error("Failed to load blog:", error);
    notFound();
  }
}