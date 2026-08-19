"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Blog } from "@/types/blog";
import TiptapSectionEditor from "@/components/Blog/TiptapSectionEditor";
import {
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  ArrowUp,
  ArrowDown,
  Sparkles,
  CheckCircle2,
  FileText,
  Loader2,
  X
} from "lucide-react";

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function slugifyPreview(text: string): string {
  return (text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";
}

interface FormSectionState {
  id?: string;
  heading: string;
  content: any;
  slug?: string;
}

export default function BlogsPage() {
  const router = useRouter();
  // Auth State
  const [token, setToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Dashboard State
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"list" | "create" | "edit">("list");
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Form State
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("Technology");
  const [author, setAuthor] = useState("FlutterFlirt Team");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [sections, setSections] = useState<FormSectionState[]>([
    {
      heading: "What is React?",
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "React is a JavaScript library for building user interfaces." }],
          },
        ],
      },
    },
  ]);

  const [saving, setSaving] = useState(false);
  const [savingAction, setSavingAction] = useState<"draft" | "published" | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("flutterflirt_admin_token");
    if (savedToken) {
      setToken(savedToken);
    } else {
      router.push("/flutterflirt-admin-login");
    }
    setIsInitializing(false);
  }, [router]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadBlogs = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/admin/blogs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      const data = await res.json();
      setBlogs(data.data || data.blogs || []);
    } catch (err) {
      console.error("Failed to load blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadBlogs();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("flutterflirt_admin_token");
    setToken(null);
    setBlogs([]);
    router.push("/flutterflirt-admin-login");
  };

  const handleStartCreate = () => {
    setEditingBlogId(null);
    setTitle("");
    setExcerpt("");
    setCoverImage("");
    setCategory("Technology");
    setAuthor("FlutterFlirt Team");
    setFeatured(false);
    setStatus("draft");
    setSections([
      {
        heading: "Introduction",
        content: {
          type: "doc",
          content: [{ type: "paragraph", content: [{ type: "text", text: "Start writing section content..." }] }],
        },
      },
    ]);
    setActiveTab("create");
  };

  const handleStartEdit = (blog: Blog) => {
    setEditingBlogId(blog.id);
    setTitle(blog.title);
    setExcerpt(blog.excerpt || "");
    setCoverImage(blog.cover_image || blog.image || "");
    setCategory(blog.category || "General");
    setAuthor(blog.author || "FlutterFlirt Team");
    setFeatured(Boolean(blog.featured));
    setStatus(blog.status);
    setSections(
      blog.sections && blog.sections.length > 0
        ? blog.sections.map((s) => ({
          id: s.id,
          heading: s.heading,
          content: s.content,
          slug: s.slug,
        }))
        : [
          {
            heading: "Introduction",
            content: { type: "doc", content: [{ type: "paragraph", content: [] }] },
          },
        ]
    );
    setActiveTab("edit");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/blogs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showToast("Blog deleted successfully");
        loadBlogs();
      } else {
        if (res.status === 401) handleLogout();
        else alert("Failed to delete blog");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting blog");
    }
  };

  const handleAddSection = () => {
    setSections((prev) => [
      ...prev,
      {
        heading: `New Section ${prev.length + 1}`,
        content: {
          type: "doc",
          content: [{ type: "paragraph", content: [{ type: "text", text: "" }] }],
        },
      },
    ]);
  };

  const handleRemoveSection = (index: number) => {
    if (sections.length <= 1) {
      alert("A blog must have at least one section.");
      return;
    }
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setSections((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index - 1];
      copy[index - 1] = temp;
      return copy;
    });
  };

  const handleMoveDown = (index: number) => {
    if (index >= sections.length - 1) return;
    setSections((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index + 1];
      copy[index + 1] = temp;
      return copy;
    });
  };

  const handleSectionHeadingChange = (index: number, val: string) => {
    setSections((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], heading: val };
      return copy;
    });
  };

  const handleSectionContentChange = (index: number, content: any) => {
    setSections((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], content };
      return copy;
    });
  };

  const handleSubmit = async (submitStatus: "draft" | "published") => {
    if (saving) return;

    if (!title.trim()) {
      alert("Please enter a blog title");
      return;
    }

    setSaving(true);
    setSavingAction(submitStatus);

    const payload = {
      title: title.trim(),
      excerpt: excerpt.trim(),
      cover_image: coverImage.trim(),
      category: category.trim(),
      author: author.trim(),
      featured,
      status: submitStatus,
      sections: sections.map((sec) => ({
        id: sec.id,
        heading: sec.heading.trim() || "Untitled Section",
        content: sec.content,
      })),
    };

    try {
      let res;
      if (editingBlogId) {
        res = await fetch(`${API_URL}/api/admin/blogs/${editingBlogId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_URL}/api/admin/blogs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload),
        });
      }

      const json = await res.json();
      if (!res.ok || !json.success) {
        if (res.status === 401) handleLogout();
        throw new Error(json.message || "Failed to save blog");
      }

      showToast(editingBlogId ? "Blog updated successfully!" : "Blog created successfully!");
      setActiveTab("list");
      loadBlogs();
    } catch (err: any) {
      alert(err.message || "Error saving blog");
    } finally {
      setSaving(false);
      setSavingAction(null);
    }
  };

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#edf5ff]">
        <Loader2 className="h-8 w-8 animate-spin text-[#2563eb]" />
      </div>
    );
  }

  if (!token) return null;

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 min-h-screen bg-[#edf5ff] pb-20 pt-20 md:pt-15 w-full">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white shadow-2xl animate-in fade-in slide-in-from-bottom-4">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 w-full">
          {/* Header */}
          <div className="flex flex-col justify-between gap-4 border-b border-[#c9dff7] pb-6 md:flex-row md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#dbe8fc] px-3 py-1 text-xs font-bold text-[#1e40af]">
                <Sparkles className="h-3 w-3" />
                <span>Premium Access</span>
              </div>
              <h1 className="mt-3 font-serif text-[32px] font-bold text-[#10223d] md:text-[42px]">
                Blog Management
              </h1>
              <p className="text-sm text-[#617b9d]">
                Create and curate rich multi-section articles with Tiptap JSONB and auto-generated sidebar slugs.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {activeTab !== "list" ? (
                <button
                  type="button"
                  onClick={() => setActiveTab("list")}
                  className="rounded-xl border border-[#c2daf7] bg-white px-4 py-2.5 text-xs font-bold text-[#23456c] transition hover:bg-[#e4efff]"
                >
                  ← Back to Articles List
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStartCreate}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition hover:bg-[#1d4ed8]"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create New Blog</span>
                </button>
              )}
            </div>
          </div>

          {/* TAB 1: BLOGS LIST */}
          {activeTab === "list" && (
            <div className="mt-10">
              <div className="overflow-hidden rounded-[24px] border border-[#cbe0fb] bg-white shadow-[0_12px_40px_rgba(20,50,90,0.05)] w-full">
                <div className="flex flex-col gap-4 border-b border-[#e5effb] bg-[#f8fbff] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#1e3b60]">
                    All Articles ({blogs.length})
                  </h2>
                  <div className="relative w-full max-w-sm">
                    <input
                      type="text"
                      placeholder="Search articles by title or category..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-xl border border-[#cbe0fb] bg-white py-2 pl-4 pr-10 text-sm font-medium text-[#112239] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8babc6] hover:text-[#1e3a60]"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center p-16">
                    <Loader2 className="h-10 w-10 animate-spin text-[#9bb5d6]" />
                    <p className="mt-4 text-sm font-semibold text-[#738ea8]">Loading your articles securely...</p>
                  </div>
                ) : blogs.length === 0 ? (
                  <div className="p-16 text-center">
                    <FileText className="mx-auto h-12 w-12 text-[#9bb5d6]" />
                    <p className="mt-4 font-serif text-xl font-bold text-[#1a2f4c]">No articles found</p>
                    <p className="mt-1 text-sm text-[#6984a6]">Get started by creating your first multi-section post.</p>
                    <button
                      type="button"
                      onClick={handleStartCreate}
                      className="mt-6 rounded-xl bg-[#2563eb] px-5 py-2.5 text-xs font-bold text-white"
                    >
                      + Create First Blog
                    </button>
                  </div>
                ) : (
                  <div className="p-6">
                    {(() => {
                      const filtered = blogs.filter(
                        (b) =>
                          b.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                          b.category?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
                      );
                      const totalPages = Math.ceil(filtered.length / 10) || 1;
                      const paginated = filtered.slice((page - 1) * 10, page * 10);

                      if (filtered.length === 0) {
                        return (
                          <div className="py-12 text-center text-[#6984a6]">
                            No articles match your search.
                          </div>
                        );
                      }

                      return (
                        <>
                          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {paginated.map((blog) => (
                              <div
                                key={blog.id}
                                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#cbe0fb] bg-white shadow-sm transition hover:shadow-md hover:border-[#9cb9df]"
                              >
                                <div className="h-32 bg-[#eaf2fd] overflow-hidden relative">
                                  {blog.cover_image && (
                                    <img
                                      src={blog.cover_image}
                                      alt={blog.title}
                                      className="h-full w-full object-cover"
                                    />
                                  )}
                                  <div className="absolute top-3 left-3 flex gap-2">
                                    <span
                                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${blog.status === "published"
                                        ? "bg-[#dcfce7] text-[#15803d]"
                                        : "bg-[#fef3c7] text-[#b45309]"
                                        }`}
                                    >
                                      {blog.status}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex flex-1 flex-col justify-between p-5">
                                  <div>
                                    <span className="mb-2 inline-block rounded-md bg-[#f0f5fc] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#2563eb]">
                                      {blog.category || "General"}
                                    </span>
                                    <h3 className="line-clamp-2 font-serif text-lg font-bold leading-tight text-[#142845]">
                                      {blog.title}
                                    </h3>
                                    <p className="mt-1 line-clamp-2 text-xs text-[#6984a6]">
                                      {blog.excerpt}
                                    </p>
                                  </div>

                                  <div className="mt-5 border-t border-[#f0f4fb] pt-4">
                                    <div className="flex items-center justify-between text-xs text-[#718dae]">
                                      <span>{blog.sections?.length || 0} sections</span>
                                      <span>
                                        {blog.published_at || blog.publishedAt
                                          ? new Date(blog.published_at || blog.publishedAt!).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                                          : "Draft"}
                                      </span>
                                    </div>
                                    <div className="mt-4 flex items-center justify-end gap-2">
                                      <Link
                                        href={`/blog/${blog.slug}`}
                                        target="_blank"
                                        className="rounded-lg p-2 text-[#2563eb] transition hover:bg-[#e4efff]"
                                        title="View Public Page"
                                      >
                                        <ExternalLink className="h-4 w-4" />
                                      </Link>
                                      <button
                                        type="button"
                                        onClick={() => handleStartEdit(blog)}
                                        className="rounded-lg p-2 text-[#3b577a] transition hover:bg-[#e4efff] hover:text-[#1d4ed8]"
                                        title="Edit Blog"
                                      >
                                        <Edit className="h-4 w-4" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleDelete(blog.id)}
                                        className="rounded-lg p-2 text-[#dc2626] transition hover:bg-[#fee2e2]"
                                        title="Delete Blog"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Pagination Controls */}
                          {totalPages > 1 && (
                            <div className="mt-8 flex items-center justify-between border-t border-[#f0f4fb] pt-6">
                              <span className="text-xs text-[#6984a6]">
                                Page {page} of {totalPages} (Showing {paginated.length} of {filtered.length} articles)
                              </span>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                  disabled={page === 1}
                                  className="rounded-lg border border-[#cbe0fb] bg-white px-3 py-1.5 text-xs font-bold text-[#1e3b60] transition hover:bg-[#edf5ff] disabled:opacity-50 disabled:pointer-events-none"
                                >
                                  Previous
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                                  disabled={page === totalPages}
                                  className="rounded-lg border border-[#cbe0fb] bg-white px-3 py-1.5 text-xs font-bold text-[#1e3b60] transition hover:bg-[#edf5ff] disabled:opacity-50 disabled:pointer-events-none"
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2 / 3: CREATE & EDIT BLOG FORM */}
          {(activeTab === "create" || activeTab === "edit") && (
            <div className="mt-10 space-y-10">
              {/* Blog Metadata Card */}
              <div className="rounded-[28px] border border-[#cbe0fb] bg-white p-8 shadow-[0_12px_40px_rgba(20,50,90,0.05)] md:p-10">
                <h3 className="font-serif text-2xl font-bold text-[#142845]">
                  {activeTab === "edit" ? "Edit Article" : "Create New Article"}
                </h3>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#355375]">
                      Blog Title *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. How to Learn React in 2026"
                      className="mt-2 w-full rounded-xl border border-[#cbdff8] px-4 py-3 text-base text-[#112239] transition focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#355375]">
                      Category
                    </label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g. Frontend, Mobile Dev, Architecture"
                      className="mt-2 w-full rounded-xl border border-[#cbdff8] px-4 py-2.5 text-sm text-[#112239] focus:border-[#2563eb] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#355375]">
                      Author
                    </label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. FlutterFlirt Team"
                      className="mt-2 w-full rounded-xl border border-[#cbdff8] px-4 py-2.5 text-sm text-[#112239] focus:border-[#2563eb] focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#355375]">
                      Cover Image URL
                    </label>
                    <input
                      type="text"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="mt-2 w-full rounded-xl border border-[#cbdff8] px-4 py-2.5 text-sm text-[#112239] focus:border-[#2563eb] focus:outline-none"
                    />
                    {coverImage && (
                      <div className="mt-3 h-36 w-full max-w-sm overflow-hidden rounded-xl border border-[#cbe0fb]">
                        <img src={coverImage} alt="Preview" className="h-full w-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#355375]">
                      Excerpt / Summary
                    </label>
                    <textarea
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      rows={3}
                      placeholder="A short compelling overview that appears on cards and previews..."
                      className="mt-2 w-full rounded-xl border border-[#cbdff8] px-4 py-2.5 text-sm text-[#112239] focus:border-[#2563eb] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="featuredCheckbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-[#2563eb] focus:ring-[#2563eb]"
                    />
                    <label htmlFor="featuredCheckbox" className="text-sm font-semibold text-[#1e3a60]">
                      Highlight as Featured Article on homepage & blog hero
                    </label>
                  </div>
                </div>
              </div>

              {/* DYNAMIC SECTIONS MANAGER */}
              <div className="space-y-6">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#142845]">
                      Ordered Article Sections ({sections.length})
                    </h3>
                    <p className="text-xs text-[#6380a3]">
                      Each section gets its own heading, unique sidebar slug, and Tiptap rich content block.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddSection}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#1e40af] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#1d3587]"
                  >
                    <Plus className="h-4 w-4" />
                    <span>+ Add Section</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {sections.map((section, index) => {
                    const previewSlug = section.slug || slugifyPreview(section.heading);
                    return (
                      <div
                        key={index}
                        className="overflow-hidden rounded-[24px] border border-[#cbe0fb] bg-white p-6 shadow-[0_8px_30px_rgba(20,50,90,0.04)] md:p-8"
                      >
                        {/* Section Header Controls */}
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e8f1fc] pb-4">
                          <div className="flex items-center gap-3">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2563eb] text-xs font-bold text-white">
                              {index + 1}
                            </span>
                            <span className="font-bold text-[#142845]">Section {index + 1}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleMoveUp(index)}
                              disabled={index === 0}
                              className="rounded-lg border border-[#d6e5fb] p-1.5 text-xs text-[#3b5980] transition hover:bg-[#eaf2fd] disabled:opacity-30"
                              title="Move Up"
                            >
                              <ArrowUp className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveDown(index)}
                              disabled={index === sections.length - 1}
                              className="rounded-lg border border-[#d6e5fb] p-1.5 text-xs text-[#3b5980] transition hover:bg-[#eaf2fd] disabled:opacity-30"
                              title="Move Down"
                            >
                              <ArrowDown className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveSection(index)}
                              className="rounded-lg border border-[#fee2e2] p-1.5 text-xs text-[#dc2626] transition hover:bg-[#fef2f2]"
                              title="Remove Section"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Section Heading & Read-only Slug */}
                        <div className="mt-5 grid gap-4 md:grid-cols-3">
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#355375]">
                              Section Heading *
                            </label>
                            <input
                              type="text"
                              value={section.heading}
                              onChange={(e) => handleSectionHeadingChange(index, e.target.value)}
                              placeholder="e.g. Why Choose Flutter in 2026?"
                              className="mt-1.5 w-full rounded-xl border border-[#cbdff8] px-4 py-2.5 text-sm font-semibold text-[#112239] focus:border-[#2563eb] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#355375]">
                              Sidebar ID / Anchor (Read-only)
                            </label>
                            <div className="mt-1.5 flex items-center rounded-xl border border-[#dce7f5] bg-[#f0f6ff] px-3.5 py-2.5 font-mono text-xs text-[#2563eb]">
                              <span>#{previewSlug}</span>
                            </div>
                          </div>
                        </div>

                        {/* Tiptap Rich Editor */}
                        <div className="mt-5">
                          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#355375]">
                            Section Content (Tiptap JSONB)
                          </label>
                          <TiptapSectionEditor
                            initialContent={section.content}
                            onChange={(json) => handleSectionContentChange(index, json)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    type="button"
                    onClick={handleAddSection}
                    className="inline-flex items-center gap-2 rounded-2xl border-2 border-dashed border-[#9dbfe8] bg-white/60 px-8 py-3.5 text-sm font-bold text-[#1e40af] transition hover:bg-white hover:border-[#2563eb]"
                  >
                    <Plus className="h-4 w-4" />
                    <span>+ Add Another Section</span>
                  </button>
                </div>
              </div>

              {/* Form Actions Bar */}
              <div className="sticky bottom-6 z-40 flex items-center justify-between rounded-[24px] border border-[#bcd7fb] bg-white/95 p-5 shadow-2xl backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setActiveTab("list")}
                  className="rounded-xl border border-[#c2daf7] px-5 py-2.5 text-xs font-bold text-[#23456c] transition hover:bg-[#e4efff]"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleSubmit("draft")}
                    disabled={saving}
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#2563eb] bg-white px-5 py-2.5 text-xs font-bold text-[#2563eb] shadow-sm transition hover:bg-[#eef4ff] disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {saving && savingAction === "draft" && <Loader2 className="h-3 w-3 animate-spin" />}
                    {saving && savingAction === "draft" ? "Saving..." : "Save Draft"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSubmit("published")}
                    disabled={saving}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition hover:bg-[#1d4ed8] disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {saving && savingAction === "published" && <Loader2 className="h-3 w-3 animate-spin" />}
                    {saving && savingAction === "published" ? "Publishing..." : "Publish Article"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </SidebarProvider>
  );
}
