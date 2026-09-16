"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Building2,
  Users,
  Search,
  CheckCircle2,
  Clock,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  Loader2,
  AlertCircle,
  RefreshCw,
  Trash2,
  ExternalLink,
  ChevronDown,
  Edit3,
  FileSpreadsheet
} from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { PopupModal } from "@/components/ui/dialog-popup";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface CollegeInquiry {
  id: string;
  college_name: string;
  contact_person: string;
  email: string;
  phone?: string;
  batch_size?: string;
  message?: string;
  status: "pending" | "contacted" | "in_discussion" | "partnered" | "archived";
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface InquiryStats {
  total: number;
  pending: number;
  contacted: number;
  inDiscussion: number;
  partnered: number;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; dot: string }
> = {
  pending: {
    label: "Pending Review",
    color: "text-[#b45309]",
    bg: "bg-[#fffbeb]",
    dot: "bg-[#d97706]"
  },
  contacted: {
    label: "Contacted",
    color: "text-[#1d4ed8]",
    bg: "bg-[#eff6ff]",
    dot: "bg-[#2563eb]"
  },
  in_discussion: {
    label: "In Discussion",
    color: "text-[#7e22ce]",
    bg: "bg-[#faf5ff]",
    dot: "bg-[#9333ea]"
  },
  partnered: {
    label: "Partnered",
    color: "text-[#047857]",
    bg: "bg-[#ecfdf5]",
    dot: "bg-[#059669]"
  },
  archived: {
    label: "Closed",
    color: "text-[#475569]",
    bg: "bg-[#f1f5f9]",
    dot: "bg-[#64748b]"
  }
};

export default function CollegeRequestsAdminPage() {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [loading, setLoading] = useState(true);
  const [inquiries, setInquiries] = useState<CollegeInquiry[]>([]);
  const [stats, setStats] = useState<InquiryStats>({
    total: 0,
    pending: 0,
    contacted: 0,
    inDiscussion: 0,
    partnered: 0
  });

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Notes Modal State
  const [activeInquiryForNotes, setActiveInquiryForNotes] = useState<CollegeInquiry | null>(null);
  const [notesInput, setNotesInput] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  // Status updating state map: id -> boolean
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  // Delete confirmation modal
  const [deleteModal, setDeleteModal] = useState<{ id: string; collegeName: string } | null>(null);
  const [isConfirmDeleting, setIsConfirmDeleting] = useState(false);

  useEffect(() => {
    const savedToken = sessionStorage.getItem("flutterflirt_admin_token");
    if (!savedToken) {
      router.push("/flutterflirt-admin-login");
      return;
    }
    setToken(savedToken);
    setIsInitializing(false);
  }, [router]);

  useEffect(() => {
    if (token) {
      fetchInquiries();
    }
  }, [token]);

  const fetchInquiries = async () => {
    if (!token) return;
    setLoading(true);
    setErrorBanner(null);
    try {
      const res = await fetch(`${API_URL}/api/admin/iot/college-inquiries`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setInquiries(data.inquiries || []);
        if (data.stats) {
          // Map backend property names to frontend interface
          setStats({
            total: data.stats.total ?? data.stats.totalInquiries ?? 0,
            pending: data.stats.pending ?? data.stats.pendingCount ?? 0,
            contacted: data.stats.contacted ?? data.stats.contactedCount ?? 0,
            inDiscussion: data.stats.inDiscussion ?? data.stats.inDiscussionCount ?? 0,
            partnered: data.stats.partnered ?? data.stats.partneredCount ?? 0,
          });
        }
      } else {
        if (res.status === 401) {
          sessionStorage.removeItem("flutterflirt_admin_token");
          router.push("/flutterflirt-admin-login");
          return;
        }
        setErrorBanner(data.message || "Failed to load inquiries.");
      }
    } catch (err: any) {
      setErrorBanner("Network error connecting to backend service.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    if (!token) return;
    setUpdatingId(id);
    try {
      const res = await fetch(`${API_URL}/api/admin/iot/college-inquiries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus as any } : item))
        );
        fetchInquiries();
      } else {
        setErrorBanner(data.message || "Failed to update status");
        setTimeout(() => setErrorBanner(null), 4000);
      }
    } catch {
      setErrorBanner("Network error while updating status.");
      setTimeout(() => setErrorBanner(null), 4000);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveNotes = async () => {
    if (!token || !activeInquiryForNotes) return;
    setSavingNotes(true);
    try {
      const res = await fetch(
        `${API_URL}/api/admin/iot/college-inquiries/${activeInquiryForNotes.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ notes: notesInput })
        }
      );
      const data = await res.json();
      if (res.ok && data.success) {
        setInquiries((prev) =>
          prev.map((item) =>
            item.id === activeInquiryForNotes.id ? { ...item, notes: notesInput } : item
          )
        );
        setActiveInquiryForNotes(null);
        setSuccessBanner("Notes saved successfully.");
        setTimeout(() => setSuccessBanner(null), 3500);
      } else {
        setErrorBanner(data.message || "Failed to save notes");
        setTimeout(() => setErrorBanner(null), 4000);
      }
    } catch {
      setErrorBanner("Network error saving notes");
      setTimeout(() => setErrorBanner(null), 4000);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = (id: string, collegeName: string) => {
    setDeleteModal({ id, collegeName });
  };

  const confirmDelete = async () => {
    if (!deleteModal || !token) return;
    const { id } = deleteModal;
    setIsConfirmDeleting(true);
    setDeletingId(id);
    try {
      const res = await fetch(`${API_URL}/api/admin/iot/college-inquiries/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        fetchInquiries();
        setSuccessBanner("Inquiry deleted successfully.");
        setTimeout(() => setSuccessBanner(null), 3500);
      } else {
        setErrorBanner(data.message || "Failed to delete inquiry");
        setTimeout(() => setErrorBanner(null), 4000);
      }
    } catch {
      setErrorBanner("Network error while deleting");
      setTimeout(() => setErrorBanner(null), 4000);
    } finally {
      setIsConfirmDeleting(false);
      setDeletingId(null);
      setDeleteModal(null);
    }
  };

  const exportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = [
      "College Name",
      "Contact Person",
      "Email",
      "Phone",
      "Batch Size",
      "Status",
      "Submitted At",
      "Notes"
    ];

    const rows = inquiries.map((item) => [
      `"${(item.college_name || "").replace(/"/g, '""')}"`,
      `"${(item.contact_person || "").replace(/"/g, '""')}"`,
      `"${(item.email || "").replace(/"/g, '""')}"`,
      `"${(item.phone || "").replace(/"/g, '""')}"`,
      `"${item.batch_size || ""}"`,
      `"${item.status}"`,
      `"${new Date(item.created_at).toLocaleDateString()}"`,
      `"${(item.notes || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `college_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered inquiries
  const filtered = inquiries.filter((item) => {
    const matchesSearch =
      item.college_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.contact_person && item.contact_person.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.phone && item.phone.includes(searchQuery));

    const matchesStatus = statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (isInitializing || (loading && inquiries.length === 0)) {
    return (
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full bg-[#edf5ff] text-[#142845] font-['Manrope',sans-serif]">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <header className="sticky top-0 z-30 flex items-center justify-between bg-white/75 backdrop-blur-md px-6 py-4">
              <div className="flex items-center gap-3">
                <SidebarTrigger />
                <div className="flex items-center gap-2.5 animate-pulse">
                  <div className="w-10 h-10 bg-gray-200 rounded-2xl"></div>
                  <div>
                    <div className="h-5 w-48 bg-gray-200 rounded mb-1.5"></div>
                    <div className="h-3 w-64 bg-gray-200 rounded hidden sm:block"></div>
                  </div>
                </div>
              </div>
            </header>
            <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 animate-pulse">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="p-5 rounded-3xl bg-white shadow-xs h-[104px]">
                     <div className="h-4 w-20 bg-gray-100 rounded mb-4"></div>
                     <div className="h-8 w-12 bg-gray-100 rounded"></div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-xs min-h-[500px] animate-pulse space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 mb-6 border-b border-[#cbdff8] pb-4">
                  <div className="h-10 w-full sm:w-64 bg-gray-100 rounded-xl"></div>
                  <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className="h-10 w-24 bg-gray-100 rounded-full shrink-0"></div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-24 bg-[#f8fbff] rounded-2xl"></div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-[#edf5ff] text-[#142845] font-['Manrope',sans-serif]">
        {/* Delete Confirmation Modal */}
        <PopupModal
          isOpen={!!deleteModal}
          onClose={() => setDeleteModal(null)}
          onConfirm={confirmDelete}
          title="Delete Inquiry"
          description={`Are you sure you want to permanently delete the inquiry from "${deleteModal?.collegeName}"? This action cannot be undone.`}
          type="danger"
          confirmText="Delete Inquiry"
          loading={isConfirmDeleting}
        />
        <AppSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="sticky top-0 z-30 flex items-center justify-between bg-white/75 backdrop-blur-md px-6 py-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-[#faf5ff] text-[#9333ea] shadow-xs">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-[#142845] tracking-tight flex items-center gap-2">
                    College & University Requests
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#faf5ff] text-[#9333ea] font-semibold">
                      IoT Partnerships
                    </span>
                  </h1>
                  <p className="text-xs text-[#617b9b]">
                    Review and coordinate institutional requests submitted via the IoT Labs landing page.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={exportCSV}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-2xl bg-white hover:bg-[#f0f6ff] text-[#142845] shadow-xs transition"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#059669]" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={fetchInquiries}
                disabled={loading}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-2xl bg-white hover:bg-[#f0f6ff] text-[#2563eb] shadow-xs transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </button>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
            {errorBanner && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#fef2f2] text-[#dc2626] text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorBanner}</span>
              </div>
            )}
            {successBanner && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#ecfdf5] text-[#047857] text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successBanner}</span>
              </div>
            )}

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="p-5 rounded-3xl bg-white shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#617b9b] font-semibold">Total Requests</p>
                  <p className="text-2xl font-black text-[#142845] mt-1">{stats.total}</p>
                </div>
                <div className="p-2.5 rounded-2xl bg-[#edf5ff] text-[#2563eb]">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#b45309] font-semibold">Pending</p>
                  <p className="text-2xl font-black text-[#b45309] mt-1">{stats.pending}</p>
                </div>
                <div className="p-2.5 rounded-2xl bg-[#fffbeb] text-[#d97706]">
                  <Clock className="w-5 h-5" />
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#1d4ed8] font-semibold">Contacted</p>
                  <p className="text-2xl font-black text-[#1d4ed8] mt-1">{stats.contacted}</p>
                </div>
                <div className="p-2.5 rounded-2xl bg-[#eff6ff] text-[#2563eb]">
                  <Phone className="w-5 h-5" />
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#7e22ce] font-semibold">In Discussion</p>
                  <p className="text-2xl font-black text-[#7e22ce] mt-1">{stats.inDiscussion}</p>
                </div>
                <div className="p-2.5 rounded-2xl bg-[#faf5ff] text-[#9333ea]">
                  <MessageSquare className="w-5 h-5" />
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#047857] font-semibold">Partnered</p>
                  <p className="text-2xl font-black text-[#047857] mt-1">{stats.partnered}</p>
                </div>
                <div className="p-2.5 rounded-2xl bg-[#ecfdf5] text-[#059669]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-3 rounded-2xl bg-white shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-[#8ba2bd] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search college, contact, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-[#f8fbff] focus:bg-white rounded-xl text-[#142845] placeholder-[#8ba2bd] focus:outline-none shadow-2xs transition"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
                {[
                  { key: "all", label: "All" },
                  { key: "pending", label: "Pending" },
                  { key: "contacted", label: "Contacted" },
                  { key: "in_discussion", label: "Discussion" },
                  { key: "partnered", label: "Partnered" },
                  { key: "archived", label: "Closed" }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setStatusFilter(tab.key)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition whitespace-nowrap ${
                      statusFilter === tab.key
                        ? "bg-[#2563eb] text-white shadow-xs"
                        : "bg-[#f8fbff] text-[#617b9b] hover:bg-[#edf5ff] hover:text-[#142845]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiries List */}
            <div className="rounded-3xl bg-white shadow-xs p-6">
              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-3 text-[#617b9b]">
                  <Loader2 className="w-7 h-7 text-[#2563eb] animate-spin" />
                  <p className="text-sm">Fetching university requests...</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="py-16 text-center text-[#617b9b] space-y-2">
                  <Building2 className="w-10 h-10 mx-auto text-[#cbdff8]" />
                  <p className="text-sm font-semibold text-[#142845]">No institutional requests found.</p>
                  <p className="text-xs text-[#8ba2bd]">
                    Requests submitted from the IoT Labs page will automatically appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map((item) => {
                    const statusCfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.pending;
                    return (
                      <div
                        key={item.id}
                        className="p-5 rounded-2xl bg-[#f8fbff] hover:bg-[#edf5ff] transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                      >
                        {/* College Info */}
                        <div className="space-y-2 max-w-2xl min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-bold text-[#142845] tracking-tight">
                              {item.college_name}
                            </h3>
                            {item.batch_size ? (
                              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#eff6ff] text-[#1d4ed8] font-bold flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {item.batch_size} students
                              </span>
                            ) : null}
                            <span className="text-[11px] text-[#8ba2bd] flex items-center gap-1 font-medium">
                              <Calendar className="w-3 h-3" />
                              {new Date(item.created_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                              })}
                            </span>
                          </div>

                          {/* Contact Details */}
                          <div className="flex flex-wrap items-center gap-4 text-xs text-[#617b9b]">
                            <span className="font-semibold text-[#142845]">
                              {item.contact_person}
                            </span>
                            <a
                              href={`mailto:${item.email}`}
                              className="flex items-center gap-1 text-[#2563eb] hover:underline font-semibold"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              {item.email}
                            </a>
                            {item.phone && (
                              <a
                                href={`tel:${item.phone}`}
                                className="flex items-center gap-1 text-[#059669] hover:underline font-semibold"
                              >
                                <Phone className="w-3.5 h-3.5" />
                                {item.phone}
                              </a>
                            )}
                          </div>

                          {/* Internal Notes Preview */}
                          {item.notes && (
                            <div className="text-[11px] text-[#b45309] bg-[#fffbeb] p-3 rounded-2xl flex items-start gap-2">
                              <MessageSquare className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#d97706]" />
                              <span>
                                <strong className="font-semibold">Internal Note:</strong> {item.notes}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Status Selector & Actions */}
                        <div className="flex flex-wrap items-center gap-3 self-start lg:self-center shrink-0">
                          {/* Status Dropdown */}
                          <div className="relative">
                            <select
                              value={item.status}
                              disabled={updatingId === item.id}
                              onChange={(e) => handleStatusChange(item.id, e.target.value)}
                              className={`appearance-none text-xs font-bold px-3 py-2 pr-7 rounded-xl ${statusCfg.bg} ${statusCfg.color} focus:outline-none cursor-pointer shadow-xs transition`}
                            >
                              <option value="pending">Pending Review</option>
                              <option value="contacted">Contacted</option>
                              <option value="in_discussion">In Discussion</option>
                              <option value="partnered">Partnered</option>
                              <option value="archived">Closed</option>
                            </select>
                            <ChevronDown className="w-3.5 h-3.5 text-neutral-500 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
                          </div>

                          {/* Add / Edit Note Button */}
                          <button
                            onClick={() => {
                              setActiveInquiryForNotes(item);
                              setNotesInput(item.notes || "");
                            }}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-[#edf5ff] text-[#142845] shadow-xs transition"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-[#d97706]" />
                            <span>{item.notes ? "Edit Note" : "Add Note"}</span>
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(item.id, item.college_name)}
                            disabled={deletingId === item.id}
                            className="p-2 rounded-xl text-[#8ba2bd] hover:text-[#dc2626] hover:bg-[#fef2f2] transition shadow-xs"
                            title="Delete inquiry"
                          >
                            {deletingId === item.id ? (
                              <Loader2 className="w-4 h-4 animate-spin text-[#dc2626]" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Modal for Editing Internal Notes */}
        {activeInquiryForNotes && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#142845]/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-2 text-[#142845] font-bold">
                  <Edit3 className="w-5 h-5 text-[#d97706]" />
                  <h3 className="text-base">Staff Notes & Follow-up Log</h3>
                </div>
                <button
                  onClick={() => setActiveInquiryForNotes(null)}
                  className="text-[#8ba2bd] hover:text-[#142845] text-sm p-1 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <div>
                <p className="text-xs text-[#617b9b]">
                  Institution:{" "}
                  <span className="text-[#142845] font-semibold">
                    {activeInquiryForNotes.college_name}
                  </span>{" "}
                  ({activeInquiryForNotes.contact_person})
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#142845] mb-1.5">
                  Internal Administrative Notes
                </label>
                <textarea
                  rows={4}
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="e.g., Contacted Dean Dr. Verma on Sept 16. Interested in 120 kits. Demo scheduled next Tuesday."
                  className="w-full p-3.5 text-xs bg-[#f8fbff] focus:bg-white rounded-2xl text-[#142845] placeholder-[#8ba2bd] focus:outline-none shadow-2xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveInquiryForNotes(null)}
                  className="px-4 py-2.5 text-xs font-semibold rounded-2xl bg-[#f8fbff] text-[#617b9b] hover:bg-[#edf5ff] hover:text-[#142845] transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNotes}
                  disabled={savingNotes}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-2xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white transition shadow-xs"
                >
                  {savingNotes ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    "Save Notes"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SidebarProvider>
  );
}
