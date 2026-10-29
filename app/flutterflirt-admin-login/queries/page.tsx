"use client";

import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar"
import { Loader2, MessageSquare, X, Send, Trash2, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { PopupToast } from "@/components/ui/dialog-popup";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface ContactQuery {
  id: string;
  name: string;
  email: string;
  companyName?: string;
  message: string;
  status: string;
  createdAt?: string;
  created_at?: string;
}

const formatQueryDate = (dateStr?: string) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    pending: "bg-[#fef3c7] text-[#b45309]",
    replied: "bg-[#dbeafe] text-[#1e40af]",
    closed: "bg-[#dcfce7] text-[#15803d]",
  };
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${styles[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
};

export default function QueriesPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "replied" | "closed">("all");

  const [selectedQuery, setSelectedQuery] = useState<ContactQuery | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [deleteModal, setDeleteModal] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    const savedToken = sessionStorage.getItem("flutterflirt_admin_token");
    if (savedToken) {
      setToken(savedToken);
    } else {
      router.push("/flutterflirt-admin-login");
    }
    setIsInitializing(false);
  }, [router]);

  const showToast = (msg: string, type: "success" | "error" | "info" = "success") => {
    setToastType(type);
    setToastMessage(msg);
  };

  const loadQueries = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/admin/contact-queries`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 401) {
        sessionStorage.removeItem("flutterflirt_admin_token");
        router.push("/flutterflirt-admin-login");
        return;
      }
      const data = await res.json();
      setQueries(data.contactQueries || data || []);
    } catch (err) {
      console.error("Failed to load queries:", err);
      showToast("Failed to load queries", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadQueries();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/contact-queries/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        showToast(`Query marked as ${status}`);
        loadQueries();
        if (selectedQuery && selectedQuery.id === id) {
          setSelectedQuery(prev => prev ? { ...prev, status } : null);
        }
      } else {
        showToast("Failed to update status", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error updating status", "error");
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuery || isSending) return;
    if (!replyText.trim() || replyText.trim().length < 10) {
      showToast("Reply message must be at least 10 characters.", "error");
      return;
    }
    try {
      setIsSending(true);
      const res = await fetch(`${API_URL}/api/admin/contact-queries/${selectedQuery.id}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ replyMessage: replyText })
      });
      const data = await res.json();
      if (res.ok) {
        showToast(data.message || "Reply sent successfully!");
        setReplyText("");
        setSelectedQuery(null);
        loadQueries();
      } else {
        showToast(data.message || "Failed to send reply", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error sending reply email", "error");
    } finally {
      setIsSending(false);
    }
  };

  const handleDeleteClick = (q: ContactQuery) => {
    setDeleteModal({ id: q.id, name: q.name });
  };

  const confirmDelete = async () => {
    if (!deleteModal || !token) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/contact-queries/${deleteModal.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setQueries(prev => prev.filter(q => q.id !== deleteModal.id));
        showToast("Query deleted successfully");
        setDeleteModal(null);
      } else {
        showToast(data.message || "Failed to delete query", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error deleting query", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isInitializing || (loading && queries.length === 0)) {
    return (
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full bg-[#edf5ff] text-[#142845]">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-6 pt-20 md:pt-8">
              <div className="bg-white rounded-3xl p-6 shadow-xs min-h-[500px] animate-pulse space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 mb-6 border-b border-[#cbdff8] pb-4">
                  <div className="h-10 w-full sm:w-64 bg-gray-100 rounded-xl"></div>
                  <div className="h-10 w-full sm:w-32 bg-gray-100 rounded-xl sm:ml-auto"></div>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-16 bg-[#f8fbff] rounded-2xl"></div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  const filtered = queries.filter((q) => {
    const matchesStatus = statusFilter === "all" || q.status === statusFilter;
    const queryStr = debouncedSearchQuery.toLowerCase();
    const matchesSearch =
      q.name.toLowerCase().includes(queryStr) ||
      q.email.toLowerCase().includes(queryStr) ||
      (q.companyName && q.companyName.toLowerCase().includes(queryStr));
    return matchesStatus && matchesSearch;
  });
  const totalPages = Math.ceil(filtered.length / 10) || 1;
  const paginated = filtered.slice((page - 1) * 10, page * 10);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 min-h-screen bg-[#edf5ff] pb-20 w-full">

        <PopupToast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage(null)}
        />

        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12 w-full pt-4 md:pt-8">

          {/* Page Header */}
          <div className="flex items-center gap-3 mb-2 pt-2">
            <SidebarTrigger />
            <div className="inline-flex items-center gap-2 rounded-full bg-[#dbe8fc] px-3 py-1 text-xs font-bold text-[#1e40af]">
              <MessageSquare className="h-3 w-3" />
              <span>Inbox</span>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-2 border-b border-[#c9dff7] pb-6 md:flex-row md:items-end mb-6">
            <div>
              <h1 className="mt-2 font-serif text-[28px] font-bold text-[#10223d] md:text-[42px]">
                Query Management
              </h1>
              <p className="text-sm text-[#617b9d]">
                Manage contact requests from your potential clients.
              </p>
            </div>
          </div>

          {/* Card Container */}
          <div className="overflow-hidden rounded-[24px] border border-[#cbe0fb] bg-white shadow-[0_12px_40px_rgba(20,50,90,0.05)] w-full">

            {/* Filters + Search */}
            <div className="flex flex-col gap-4 border-b border-[#e5effb] bg-[#f8fbff] px-4 sm:px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-3">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#1e3b60]">
                  Contact Queries
                </h2>
                <div className="flex flex-wrap gap-2">
                  {(["all", "pending", "replied", "closed"] as const).map((status) => {
                    const count = status === "all"
                      ? queries.length
                      : queries.filter((q) => q.status === status).length;
                    const label = status.charAt(0).toUpperCase() + status.slice(1);
                    const isSelected = statusFilter === status;
                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() => { setStatusFilter(status); setPage(1); }}
                        className={`rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
                          isSelected
                            ? "border-[#2563eb] bg-[#2563eb] text-white shadow-[0_2px_10px_rgba(37,99,235,0.2)]"
                            : "border-[#cbdff8] bg-white text-[#526987] hover:border-[#2563eb] hover:text-[#2563eb]"
                        }`}
                      >
                        {label} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="relative w-full sm:max-w-xs">
                <input
                  type="text"
                  placeholder="Search name, email, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-[#cbe0fb] bg-white py-2 pl-4 pr-9 text-sm font-medium text-[#112239] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
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
                <p className="mt-4 text-sm font-semibold text-[#738ea8]">Loading queries...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-16 text-center">
                <MessageSquare className="mx-auto h-12 w-12 text-[#9bb5d6]" />
                <p className="mt-4 font-serif text-xl font-bold text-[#1a2f4c]">No queries found</p>
                <p className="mt-1 text-sm text-[#6984a6]">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left text-sm text-[#3b577a]">
                    <thead className="bg-[#f0f5fc] text-xs uppercase text-[#1e3b60]">
                      <tr>
                        <th className="px-6 py-4 font-bold">Name</th>
                        <th className="px-6 py-4 font-bold">Email</th>
                        <th className="px-6 py-4 font-bold">Company</th>
                        <th className="px-6 py-4 font-bold">Date Received</th>
                        <th className="px-6 py-4 font-bold">Status</th>
                        <th className="px-6 py-4 font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e5effb]">
                      {paginated.map((q) => (
                        <tr key={q.id} className="transition hover:bg-[#f8fbff]">
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-[#112239]">{q.name}</td>
                          <td className="px-6 py-4 text-xs text-[#4a6580]">{q.email}</td>
                          <td className="whitespace-nowrap px-6 py-4">{q.companyName || '-'}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-[#526987]">
                            {formatQueryDate(q.createdAt || q.created_at)}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <StatusBadge status={q.status} />
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => { setSelectedQuery(q); setReplyText(""); }}
                                className="rounded-md bg-[#2563eb] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#1d4ed8]"
                              >
                                View / Reply
                              </button>
                              <button
                                onClick={() => updateStatus(q.id, 'closed')}
                                disabled={q.status === 'closed'}
                                className="rounded-md bg-[#475569] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#334155] disabled:opacity-40 disabled:cursor-not-allowed"
                              >
                                Close
                              </button>
                              <button
                                onClick={() => handleDeleteClick(q)}
                                title="Delete query"
                                className="inline-flex items-center gap-1.5 rounded-md bg-[#fee2e2] px-3 py-1.5 text-xs font-bold text-[#dc2626] transition hover:bg-[#fecaca]"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden divide-y divide-[#e5effb]">
                  {paginated.map((q) => (
                    <div key={q.id} className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-bold text-[#112239] text-sm">{q.name}</p>
                          <p className="text-xs text-[#4a6580] break-all">{q.email}</p>
                        </div>
                        <StatusBadge status={q.status} />
                      </div>
                      <div className="flex items-center justify-between text-xs text-[#526987]">
                        <span>{q.companyName || '-'}</span>
                        <span>{formatQueryDate(q.createdAt || q.created_at)}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <button
                          onClick={() => { setSelectedQuery(q); setReplyText(""); }}
                          className="flex-1 min-w-[100px] rounded-md bg-[#2563eb] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#1d4ed8]"
                        >
                          View / Reply
                        </button>
                        <button
                          onClick={() => updateStatus(q.id, 'closed')}
                          disabled={q.status === 'closed'}
                          className="rounded-md bg-[#475569] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#334155] disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Close
                        </button>
                        <button
                          onClick={() => handleDeleteClick(q)}
                          className="inline-flex items-center gap-1.5 rounded-md bg-[#fee2e2] px-3 py-2 text-xs font-bold text-[#dc2626] transition hover:bg-[#fecaca]"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#e5effb]">
                    <span className="text-xs text-[#6984a6]">
                      Page {page} of {totalPages} &middot; {filtered.length} total queries
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
            )}
          </div>
        </div>

        {/* View / Reply Modal */}
        {selectedQuery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-[#cbe0fb] bg-white shadow-2xl animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-[#e5effb] bg-[#f8fbff] px-6 py-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#142845]">Query Details</h3>
                  <p className="text-xs text-[#6984a6]">From {selectedQuery.name}</p>
                </div>
                <button
                  onClick={() => setSelectedQuery(null)}
                  className="rounded-lg p-1.5 text-[#8babc6] hover:bg-[#eff4fb] hover:text-[#1e3a60]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-[#f0f5fc] p-4 rounded-2xl">
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#6984a6]">Email</span>
                    <span className="font-semibold text-[#1e3a60] break-all">{selectedQuery.email}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#6984a6]">Company</span>
                    <span className="font-semibold text-[#1e3a60]">{selectedQuery.companyName || "-"}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#6984a6]">Date Received</span>
                    <span className="font-semibold text-[#1e3a60]">
                      {formatQueryDate(selectedQuery.createdAt || selectedQuery.created_at)}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#6984a6]">Status</span>
                    <div className="mt-1"><StatusBadge status={selectedQuery.status} /></div>
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#6984a6] mb-1.5">User Message</span>
                  <div className="rounded-2xl border border-[#cbdff8] bg-white p-4 text-[#112239] text-sm whitespace-pre-wrap leading-relaxed">
                    {selectedQuery.message}
                  </div>
                </div>

                <form onSubmit={handleSendReply} className="border-t border-[#e5effb] pt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#355375] mb-2">
                      Your Email Reply (will be sent directly to user)
                    </label>
                    <textarea
                      required
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={5}
                      placeholder="Type your response here..."
                      className="w-full rounded-xl border border-[#cbdff8] p-4 text-sm text-[#112239] transition focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const q = selectedQuery;
                        setSelectedQuery(null);
                        handleDeleteClick(q);
                      }}
                      className="inline-flex items-center gap-2 rounded-xl border border-[#fecaca] px-4 py-2 text-xs font-bold text-[#dc2626] transition hover:bg-[#fee2e2]"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete Query
                    </button>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedQuery(null)}
                        className="rounded-xl border border-[#c2daf7] px-4 py-2 text-xs font-bold text-[#23456c] transition hover:bg-[#e4efff]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSending || !replyText.trim()}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-5 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition hover:bg-[#1d4ed8] disabled:opacity-50"
                      >
                        {isSending ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-3.5 w-3.5" />
                            <span>Send Reply Email</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-md overflow-hidden rounded-[24px] border border-[#fecaca] bg-white shadow-2xl animate-in zoom-in-95">
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#fee2e2]">
                    <AlertTriangle className="h-5 w-5 text-[#dc2626]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#142845]">Delete Query</h3>
                    <p className="text-xs text-[#6984a6]">This action cannot be undone</p>
                  </div>
                </div>

                <p className="text-sm text-[#3b577a] leading-relaxed">
                  Are you sure you want to permanently delete the query from{" "}
                  <strong className="text-[#112239]">&quot;{deleteModal.name}&quot;</strong>?
                  This will remove it from the database forever.
                </p>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setDeleteModal(null)}
                    disabled={isDeleting}
                    className="flex-1 rounded-xl border border-[#c2daf7] py-2.5 text-sm font-bold text-[#23456c] transition hover:bg-[#e4efff] disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={confirmDelete}
                    disabled={isDeleting}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#dc2626] py-2.5 text-sm font-bold text-white transition hover:bg-[#b91c1c] disabled:opacity-60"
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Deleting...</span>
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4" />
                        <span>Delete Query</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </SidebarProvider>
  );
}
