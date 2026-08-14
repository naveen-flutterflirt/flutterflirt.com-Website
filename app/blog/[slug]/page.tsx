import { notFound } from "next/navigation";
import { blogs } from "@/data/blog";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#edf5ff] px-6 pb-24 pt-32">
      <article className="mx-auto max-w-[900px]">

        <p className="text-[14px] font-medium text-[#2563eb]">
          {blog.category}
        </p>

        <h1 className="mt-5 font-serif text-[52px] font-bold leading-[1] text-[#1d2b42] md:text-[76px]">
          {blog.title}
        </h1>

        <div className="mt-6 text-[14px] text-[#8a9bb3]">
          {blog.date} · {blog.readTime}
        </div>

        <img
          src={blog.image}
          alt={blog.title}
          className="mt-12 h-[450px] w-full rounded-[28px] object-cover"
        />

        <div className="mt-12 text-[18px] leading-[1.8] text-[#526987]">
          {blog.excerpt}
        </div>

      </article>
    </main>
  );
}