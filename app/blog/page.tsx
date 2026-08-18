import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogList from "@/components/Blog";
import { Blog } from "@/types/blog";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default async function BlogPage() {
  let initialBlogs: Blog[] = [];

  try {
    const res = await fetch(`${API_URL}/api/blogs`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      initialBlogs = data.data || data.blogs || [];
    }
  } catch (error) {
    console.error("Error pre-fetching blogs on server:", error);
  }

  return (
    <>
      <Navbar />
      <BlogList initialBlogs={initialBlogs} />
      <Footer />
    </>
  );
}