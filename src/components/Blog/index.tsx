"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useMemo, useState, useRef } from "react";
import { Blog } from "@/types/blog";
import {
  ArrowRight,
  Bookmark,
  Search,
  X,
  ChevronDown,
  FileText,
  Tag,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const INITIAL_BLOGS_LIMIT = 10;

function BlogSkeleton() {
  return (
    <main className="overflow-hidden bg-[#edf5ff]">
      <section className="px-6 pb-16 pt-32 md:px-10 md:pt-40 lg:px-16">
        <div className="mx-auto max-w-[1600px] animate-pulse">
          <div className="h-4 w-40 rounded bg-[#d6e5fb]" />
          <div className="mt-6 h-16 w-full max-w-[900px] rounded bg-[#d6e5fb] md:h-20" />
          <div className="mt-4 h-16 w-full max-w-[760px] rounded bg-[#d6e5fb] md:h-20" />
          <div className="mt-8 h-6 w-full max-w-[680px] rounded bg-[#dbe8fc]" />
        </div>
      </section>

      <section className="px-6 pb-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1600px] animate-pulse overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(60,100,150,0.05)] lg:grid lg:grid-cols-2">
          <div className="h-[350px] bg-[#dbe8fc] lg:h-[500px]" />
          <div className="p-8 md:p-12 lg:p-16">
            <div className="h-8 w-32 rounded-full bg-[#d7eee8]" />
            <div className="mt-6 h-14 w-full rounded bg-[#d6e5fb]" />
            <div className="mt-4 h-14 w-[90%] rounded bg-[#d6e5fb]" />
            <div className="mt-6 h-6 w-[80%] rounded bg-[#dbe8fc]" />
            <div className="mt-8 h-5 w-52 rounded bg-[#dbe8fc]" />
            <div className="mt-8 h-5 w-32 rounded bg-[#cfe0ff]" />
          </div>
        </div>
      </section>
    </main>
  );
}

interface BlogListProps {
  initialBlogs?: Blog[];
}

export default function BlogList({ initialBlogs }: BlogListProps) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs || []);
  const [loading, setLoading] = useState(!initialBlogs || initialBlogs.length === 0);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_BLOGS_LIMIT);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (initialBlogs && initialBlogs.length > 0) {
      setBlogs(initialBlogs);
      setLoading(false);
      return;
    }

    const loadBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}/api/blogs`, {
          next: { revalidate: 60 },
        });
        const data = await response.json();
        const list = data.data || data.blogs || [];
        setBlogs(list);
      } catch (error) {
        console.error("Failed to load blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, [initialBlogs]);

  // Unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>(["All"]);
    blogs.forEach((b) => {
      if (b.category) cats.add(b.category);
    });
    return Array.from(cats);
  }, [blogs]);

  // Dropdown suggestions (Categories & Matching Blog Titles)
  const suggestions = useMemo(() => {
    const q = debouncedSearchQuery.trim().toLowerCase();
    if (!q) return { categories: [], blogs: [] };

    const matchedCategories = categories
      .filter((cat) => cat !== "All" && cat.toLowerCase().includes(q))
      .map((cat) => ({
        name: cat,
        count: blogs.filter((b) => b.category?.toLowerCase() === cat.toLowerCase()).length,
      }));

    const matchedBlogs = blogs
      .filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt?.toLowerCase().includes(q) ||
          b.slug.toLowerCase().includes(q)
      )
      .slice(0, 5);

    return {
      categories: matchedCategories,
      blogs: matchedBlogs,
    };
  }, [debouncedSearchQuery, categories, blogs]);

  // Filtered blogs based on Category + Search Query (Title, Category, Excerpt)
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === "All" ||
        blog.category?.toLowerCase() === selectedCategory.toLowerCase();

      const q = debouncedSearchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        blog.title.toLowerCase().includes(q) ||
        blog.category?.toLowerCase().includes(q) ||
        blog.excerpt?.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [blogs, selectedCategory, debouncedSearchQuery]);

  // Featured article (first featured article or first filtered item when no active search)
  const featured = useMemo(() => {
    if (debouncedSearchQuery.trim()) return null; // Show standard grid when actively searching
    return filteredBlogs.find((b) => b.featured) || (selectedCategory === "All" ? filteredBlogs[0] : null);
  }, [filteredBlogs, debouncedSearchQuery, selectedCategory]);

  // List of remaining blogs after featured
  const gridBlogs = useMemo(() => {
    if (!featured) return filteredBlogs;
    return filteredBlogs.filter((b) => b.id !== featured.id);
  }, [filteredBlogs, featured]);

  // Slice to max visibleCount
  const displayedBlogs = useMemo(() => {
    return gridBlogs.slice(0, visibleCount);
  }, [gridBlogs, visibleCount]);

  const hasMore = gridBlogs.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + INITIAL_BLOGS_LIMIT);
  };

  const handleSelectCategorySuggestion = (cat: string) => {
    setSelectedCategory(cat);
    setSearchQuery("");
    setIsDropdownOpen(false);
    setVisibleCount(INITIAL_BLOGS_LIMIT);
  };

  const handleSelectBlogSuggestion = () => {
    setIsDropdownOpen(false);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setVisibleCount(INITIAL_BLOGS_LIMIT);
  };

  if (loading) {
    return <BlogSkeleton />;
  }

  if (!blogs.length) {
    return (
      <main className="min-h-screen bg-[#edf5ff] px-6 py-40 text-center text-[#1d2b42]">
        <div className="mx-auto max-w-[600px] rounded-3xl border border-[#cfe2fc] bg-white p-12 shadow-sm">
          <Bookmark className="mx-auto h-12 w-12 text-[#2563eb]" />
          <h2 className="mt-4 font-serif text-3xl font-bold">No Published Articles Yet</h2>
          <p className="mt-2 text-sm text-[#617b9b]">
            Check back soon for new insights, or visit the admin panel to create posts.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="overflow-hidden bg-[#edf5ff]">
      {/* ── HERO SECTION ── */}
      <section className="px-6 pb-12 pt-32 md:px-10 md:pt-40 lg:px-16">
        <div className="mx-auto max-w-[1600px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[13px] font-bold uppercase tracking-[3px] text-[#2563eb]"
          >
            FlutterFlirt Insights & Guides
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-[900px] font-serif text-[54px] font-bold leading-[0.96] tracking-[-2.5px] text-[#1d2b42] md:text-[80px] lg:text-[100px]"
          >
            Ideas that help <span className="italic text-[#244572]">products grow.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 max-w-[680px] text-[17px] leading-[1.6] text-[#7185a2] md:text-[19px]"
          >
            Practical insights on frontend engineering, cross-platform architecture, mobile development, and modern product design.
          </motion.p>
        </div>
      </section>

      {/* ── FEATURED BLOG CARD ── */}
      {featured && (
        <section className="px-6 pb-16 md:px-10 lg:px-16">
          <div className="mx-auto max-w-[1600px]">
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="group overflow-hidden rounded-[28px] border border-[#cbe0fb] bg-white shadow-[0_20px_60px_rgba(60,100,150,0.05)] transition hover:shadow-[0_25px_70px_rgba(30,70,130,0.1)]"
            >
              <Link href={`/blog/${featured.slug}`} className="grid lg:grid-cols-2">
                <div className="h-[320px] overflow-hidden bg-[#eaf2fc] lg:h-[480px]">
                  <img
                    src={featured.cover_image || featured.image || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop"}
                    alt={featured.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
                  <div className="flex items-center gap-3">
                    <span className="w-fit rounded-full bg-[#d7eee8] px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-wider text-[#16865f]">
                      {featured.category || "Featured"}
                    </span>
                    {featured.sections && (
                      <span className="text-xs font-semibold text-[#8ca3c3]">
                        {featured.sections.length} Sections
                      </span>
                    )}
                  </div>

                  <h2 className="mt-6 max-w-[600px] font-serif text-[34px] font-bold leading-[1.08] tracking-[-1px] text-[#1d2b42] md:text-[44px]">
                    {featured.title}
                  </h2>

                  <p className="mt-5 max-w-[550px] text-[16px] leading-[1.6] text-[#7185a2]">
                    {featured.excerpt}
                  </p>

                  <div className="mt-8 flex items-center gap-4 text-[13px] text-[#8a9bb3]">
                    <span>
                      {new Date(featured.published_at || featured.publishedAt || featured.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span>•</span>
                    <span>{featured.author || "FlutterFlirt Team"}</span>
                  </div>

                  <div className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-[#2563eb] transition-all group-hover:text-[#1d4ed8]">
                    <span>Read complete guide</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.article>
          </div>
        </section>
      )}

      {/* ── ARTICLES GRID & CATEGORY FILTER ── */}
      <section className="px-6 pb-28 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1600px]">

          <div className="flex flex-col gap-6 border-t border-dashed border-[#a9c9ff] pt-8 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <h2 className="font-serif text-[28px] font-bold text-[#1d2b42]">
                {debouncedSearchQuery ? `Results for "${debouncedSearchQuery}"` : "Latest Articles"}
              </h2>
              <p className="text-xs text-[#718dae]">
                Showing {displayedBlogs.length} of {gridBlogs.length} articles
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
              </p>
            </div>

            <div className="flex flex-col gap-5 md:flex-row md:items-center">



              {/* ═══════════════════════════════════════════════
                  SEARCH BAR WITH DROPDOWN SUGGESTIONS
              ═══════════════════════════════════════════════ */}
              <div ref={searchContainerRef} className="relative w-full md:w-[320px] shrink-0">
                <div className="relative flex items-center">
                  <Search className="absolute left-3.5 h-4 w-4 text-[#7b98b7]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onFocus={() => setIsDropdownOpen(true)}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsDropdownOpen(true);
                      setVisibleCount(INITIAL_BLOGS_LIMIT);
                    }}
                    placeholder="Search articles..."
                    className="w-full rounded-xl border border-[#cbe0fb] bg-white py-2.5 pl-10 pr-10 text-[14px] font-medium text-[#112239] shadow-sm transition placeholder:text-[#839cb8] focus:border-[#2563eb] focus:outline-none focus:ring-4 focus:ring-[#2563eb]/15"
                  />

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-3 rounded-full p-1 text-[#8babc6] transition hover:bg-[#e4efff] hover:text-[#1e3a60]"
                      title="Clear search"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Dropdown Suggestions Menu */}
                <AnimatePresence>
                  {isDropdownOpen && debouncedSearchQuery.trim() && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full z-50 mt-2 w-full min-w-[300px] max-h-[380px] overflow-y-auto rounded-xl border border-[#cbe0fb] bg-white p-3 shadow-2xl"
                    >
                      {/* Category Suggestions */}
                      {suggestions.categories.length > 0 && (
                        <div className="mb-3">
                          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#738ea8]">
                            Suggested Categories
                          </div>
                          <div className="flex flex-wrap gap-1.5 p-1">
                            {suggestions.categories.map((cat) => (
                              <button
                                key={cat.name}
                                type="button"
                                onClick={() => handleSelectCategorySuggestion(cat.name)}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-[#cbe0fb] bg-[#f0f6ff] px-2.5 py-1 text-xs font-semibold text-[#1e40af] transition hover:bg-[#2563eb] hover:text-white"
                              >
                                <Tag className="h-3 w-3" />
                                <span>{cat.name}</span>
                                <span className="rounded-full bg-white/60 px-1.5 py-0.5 text-[9px] font-bold">
                                  {cat.count}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Blog Title Suggestions */}
                      {suggestions.blogs.length > 0 && (
                        <div>
                          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#738ea8]">
                            Matching Articles
                          </div>
                          <div className="space-y-1">
                            {suggestions.blogs.map((b) => (
                              <Link
                                key={b.slug}
                                href={`/blog/${b.slug}`}
                                onClick={handleSelectBlogSuggestion}
                                className="flex items-start gap-3 rounded-lg p-2.5 transition hover:bg-[#f2f7ff]"
                              >
                                <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2563eb]" />
                                <div className="min-w-0 flex-1">
                                  <div className="truncate text-xs font-bold text-[#142845]">
                                    {b.title}
                                  </div>
                                  {b.category && (
                                    <span className="text-[10px] font-medium text-[#738ea8]">
                                      in {b.category}
                                    </span>
                                  )}
                                </div>
                                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#8ea4be]" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* No Suggestions */}
                      {suggestions.categories.length === 0 && suggestions.blogs.length === 0 && (
                        <div className="p-4 text-center text-xs text-[#718dae]">
                          No categories or articles matching "<strong>{debouncedSearchQuery}</strong>"
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Grid of max 6 initially */}
          {displayedBlogs.length > 0 ? (
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {displayedBlogs.map((blog, index) => (
                <motion.article
                  key={blog.slug || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
                  className="group flex flex-col overflow-hidden rounded-[24px] border border-[#cbe0fb] bg-white transition hover:shadow-[0_20px_50px_rgba(60,100,150,0.08)]"
                >
                  <Link href={`/blog/${blog.slug}`} className="flex h-full flex-col">
                    <div className="h-[240px] overflow-hidden bg-[#edf5ff]">
                      <img
                        src={blog.cover_image || blog.image || "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop"}
                        alt={blog.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-7">
                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="rounded-md bg-[#eef4ff] px-2.5 py-1 text-[12px] font-bold uppercase tracking-wider text-[#2563eb]">
                            {blog.category || "Article"}
                          </span>
                          <span className="text-[12px] text-[#9aa9bd]">
                            {blog.sections?.length || 1} sections
                          </span>
                        </div>

                        <h3 className="mt-4 font-serif text-[24px] font-bold leading-[1.15] text-[#1d2b42] transition group-hover:text-[#2563eb]">
                          {blog.title}
                        </h3>

                        <p className="mt-3 line-clamp-3 text-[14px] leading-[1.6] text-[#697f9e]">
                          {blog.excerpt}
                        </p>
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-[#f0f4fb] pt-4 text-[13px] font-medium text-[#2563eb]">
                        <span className="text-[#8e9fb7]">
                          {new Date(blog.published_at || blog.publishedAt || blog.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1 font-semibold group-hover:underline">
                          Read <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-3xl border border-[#cbe0fb] bg-white p-12 text-center">
              <Search className="mx-auto h-10 w-10 text-[#8fa7c4]" />
              <h3 className="mt-4 font-serif text-2xl font-bold text-[#142845]">No matching articles found</h3>
              <p className="mt-2 text-sm text-[#6984a6]">
                Try adjusting your search terms or selecting a different category.
              </p>
              <button
                type="button"
                onClick={handleClearSearch}
                className="mt-6 rounded-xl bg-[#2563eb] px-5 py-2.5 text-xs font-bold text-white shadow-sm"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* ═══════════════════════════════════════════════
              VIEW MORE BUTTON (When > 6 articles)
          ═══════════════════════════════════════════════ */}
          {hasMore && (
            <div className="mt-16 flex flex-col items-center justify-center gap-2">
              <button
                type="button"
                onClick={handleLoadMore}
                className="group inline-flex items-center gap-2 rounded-2xl border border-[#b8d4f8] bg-white px-8 py-3.5 text-sm font-bold text-[#1e40af] shadow-md shadow-blue-500/5 transition hover:bg-[#2563eb] hover:text-white hover:shadow-lg hover:shadow-blue-500/20"
              >
                <span>View More Articles</span>
                <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </button>
              <span className="text-xs text-[#718dae]">
                {gridBlogs.length - visibleCount} more available
              </span>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}