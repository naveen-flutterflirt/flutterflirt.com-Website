"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  ShieldCheck,
  Package,
  Search,
  Plus,
  Trash2,
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  Loader2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Mail,
  Calendar,
  Key
} from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { PopupModal, PopupToast } from "@/components/ui/dialog-popup";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Student {
  id: string;
  name: string;
  email: string;
  is_kit_unlocked: boolean;
  kit_code?: string;
  unlocked_at?: string;
  last_login_at?: string;
  created_at: string;
}

interface StudentStats {
  totalStudents: number;
  kitUnlockedCount: number;
  pendingCodeCount: number;
  activePastWeek: number;
  newThisMonth: number;
}

export default function AdminStudentsPage() {
  const router = useRouter();

  // Auth & Page State
  const [token, setToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [stats, setStats] = useState<StudentStats>({
    totalStudents: 0,
    kitUnlockedCount: 0,
    pendingCodeCount: 0,
    activePastWeek: 0,
    newThisMonth: 0,
  });

  // Filter & Search
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "unlocked" | "pending">("all");



  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");

  // Delete student modal
  const [deleteStudentModal, setDeleteStudentModal] = useState<{ id: string; name: string } | null>(null);
  const [isDeletingStudent, setIsDeletingStudent] = useState(false);

  const showToast = (msg: string, type: "success" | "error" | "info" = "success") => {
    setToastType(type);
    setToastMessage(msg);
  };

  // 1. Check Admin Auth
  useEffect(() => {
    const adminToken = sessionStorage.getItem("flutterflirt_admin_token");
    if (!adminToken) {
      router.push("/flutterflirt-admin-login");
    } else {
      setToken(adminToken);
      fetchStudents(adminToken, "", "all");
    }
    setIsInitializing(false);
  }, [router]);

  // 2. Fetch Students from Backend
  const fetchStudents = async (
    authToken: string,
    searchQuery: string = search,
    status: string = statusFilter
  ) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.append("search", searchQuery.trim());
      if (status !== "all") params.append("status", status);

      const res = await fetch(`${API_URL}/api/admin/iot/students?${params.toString()}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          sessionStorage.removeItem("flutterflirt_admin_token");
          router.push("/flutterflirt-admin-login");
          return;
        }
        throw new Error("Failed to load students");
      }

      const data = await res.json();
      setStudents(data.students || []);
      if (data.stats) {
        setStats(data.stats);
      }
    } catch (err: any) {
      console.error("Error fetching students:", err);
      showToast(err.message || "Failed to load student records.");
    } finally {
      setLoading(false);
    }
  };

  // Search & Filter change handler
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token) fetchStudents(token, search, statusFilter);
  };

  const handleFilterChange = (filter: "all" | "unlocked" | "pending") => {
    setStatusFilter(filter);
    if (token) fetchStudents(token, search, filter);
  };

  // Toggle Student Kit Access
  const handleToggleKit = async (studentId: string) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/iot/students/${studentId}/toggle-kit`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update kit access");
      }

      showToast(data.message || "Student kit status updated.");
      fetchStudents(token, search, statusFilter);
    } catch (err: any) {
      showToast(err.message || "Could not update student kit access.");
    }
  };

  // Delete Student
  const handleDeleteStudent = (studentId: string, studentName: string) => {
    setDeleteStudentModal({ id: studentId, name: studentName });
  };

  const confirmDeleteStudent = async () => {
    if (!deleteStudentModal || !token) return;
    setIsDeletingStudent(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/iot/students/${deleteStudentModal.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete student");
      }

      showToast(data.message || "Student removed.");
      fetchStudents(token, search, statusFilter);
    } catch (err: any) {
      showToast(err.message || "Could not delete student.", "error");
    } finally {
      setIsDeletingStudent(false);
      setDeleteStudentModal(null);
    }
  };



  if (isInitializing || (loading && students.length === 0)) {
    return (
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full bg-[#edf5ff] text-[#142845] font-['Manrope',sans-serif]">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <header className="sticky top-0 z-30 flex items-center justify-between bg-white/75 backdrop-blur-md px-6 py-4 border-b border-[#cbdff8]">
              <div className="flex items-center gap-3">
                <SidebarTrigger />
                <div className="animate-pulse">
                  <div className="h-5 w-40 bg-gray-200 rounded mb-1.5"></div>
                  <div className="h-3 w-56 bg-gray-200 rounded hidden sm:block"></div>
                </div>
              </div>
            </header>
            <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
              <div className="animate-pulse space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <div className="h-10 w-full sm:w-72 bg-gray-200 rounded-xl"></div>
                  <div className="h-10 w-full sm:w-32 bg-gray-200 rounded-xl"></div>
                  <div className="h-10 w-full sm:w-32 bg-gray-200 rounded-xl sm:ml-auto"></div>
                </div>
                <div className="bg-white rounded-3xl p-6 space-y-4">
                  {[1, 2, 3, 4, 5, 6].map(i => (
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

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#edf5ff] text-[#142845] font-['Manrope',sans-serif]">
        <AppSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <header className="sticky top-0 z-30 flex items-center justify-between bg-white/75 backdrop-blur-md px-6 py-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div>
                <h1 className="text-lg font-bold text-[#142845] leading-tight flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#2563eb]" />
                  <span>Students Management</span>
                </h1>
                <p className="text-xs text-[#617b9b] hidden sm:block">
                  Monitor registered students, active logins, and hardware kit activations.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => token && fetchStudents(token)}
                title="Refresh Records"
                className="p-2 rounded-2xl bg-white text-[#2563eb] shadow-xs hover:bg-[#f0f6ff] transition"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              </button>


            </div>
          </header>

          {/* Custom Toast */}
          <PopupToast
            message={toastMessage}
            type={toastType}
            onClose={() => setToastMessage(null)}
          />

          {/* Delete Student Confirmation Modal */}
          <PopupModal
            isOpen={!!deleteStudentModal}
            onClose={() => setDeleteStudentModal(null)}
            onConfirm={confirmDeleteStudent}
            title="Delete Student Account"
            description={`Are you sure you want to permanently delete the account for "${deleteStudentModal?.name}"? This action cannot be undone.`}
            type="danger"
            confirmText="Delete Student"
            loading={isDeletingStudent}
          />

          {/* Main Dashboard Body */}
          <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
            {/* Metric Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-3xl bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#617b9b]">Total Registered</span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#edf5ff] text-[#2563eb]">
                    <Users className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-[#142845]">{stats.totalStudents}</span>
                  <span className="text-[11px] text-[#059669] font-bold">Students</span>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#617b9b]">Kit Verified</span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#ecfdf5] text-[#059669]">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-[#059669]">{stats.kitUnlockedCount}</span>
                  <span className="text-[11px] text-[#8ba2bd] font-medium">Unlocked</span>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#617b9b]">Code Pending</span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#fffbeb] text-[#d97706]">
                    <Lock className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-[#d97706]">{stats.pendingCodeCount}</span>
                  <span className="text-[11px] text-[#8ba2bd] font-medium">Awaiting kit</span>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#617b9b]">Active This Week</span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#faf5ff] text-[#9333ea]">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-[#9333ea]">{stats.activePastWeek}</span>
                  <span className="text-[11px] text-[#9333ea] font-medium">Logged in</span>
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl shadow-xs">
              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <button
                  type="button"
                  onClick={() => handleFilterChange("all")}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition shrink-0 ${
                    statusFilter === "all"
                      ? "bg-[#142845] text-white shadow-xs"
                      : "text-[#617b9b] hover:bg-[#f8fbff]"
                  }`}
                >
                  All ({stats.totalStudents})
                </button>
                <button
                  type="button"
                  onClick={() => handleFilterChange("unlocked")}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition shrink-0 ${
                    statusFilter === "unlocked"
                      ? "bg-[#059669] text-white shadow-xs"
                      : "text-[#617b9b] hover:bg-[#f8fbff]"
                  }`}
                >
                  Verified ({stats.kitUnlockedCount})
                </button>
                <button
                  type="button"
                  onClick={() => handleFilterChange("pending")}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition shrink-0 ${
                    statusFilter === "pending"
                      ? "bg-[#d97706] text-white shadow-xs"
                      : "text-[#617b9b] hover:bg-[#f8fbff]"
                  }`}
                >
                  Pending ({stats.pendingCodeCount})
                </button>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSearchSubmit} className="relative sm:w-72">
                <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-[#8ba2bd]" />
                <input
                  type="text"
                  placeholder="Search name, email, code..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl bg-[#f8fbff] focus:bg-white pl-9 pr-3 py-2 text-xs text-[#142845] focus:outline-none shadow-2xs"
                />
              </form>
            </div>

            {/* Students Table */}
            <div className="rounded-3xl bg-white overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#4a6382]">
                  <thead className="bg-[#f8fbff] text-[11px] font-bold text-[#8ba2bd] uppercase tracking-wider">
                    <tr>
                      <th className="py-4 px-5">Student</th>
                      <th className="py-4 px-5">Kit Status</th>
                      <th className="py-4 px-5">Activation Key</th>
                      <th className="py-4 px-5">Last Active</th>
                      <th className="py-4 px-5">Registered</th>
                      <th className="py-4 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="font-medium">
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-[#8ba2bd]">
                          <Loader2 className="h-6 w-6 animate-spin mx-auto text-[#2563eb] mb-2" />
                          <span>Loading student records...</span>
                        </td>
                      </tr>
                    ) : students.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-[#8ba2bd]">
                          <Users className="h-8 w-8 mx-auto text-[#cbdff8] mb-2" />
                          <p className="font-semibold text-[#142845]">No student accounts found.</p>
                          <p className="text-[11px] text-[#8ba2bd] mt-0.5">Try searching with a different keyword or create a new student.</p>
                        </td>
                      </tr>
                    ) : (
                      students.map((student) => {
                        return (
                          <tr key={student.id} className="hover:bg-[#f8fbff] transition">
                            {/* Student Info */}
                            <td className="py-4 px-5">
                              <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#edf5ff] text-[#2563eb] font-bold text-xs shadow-2xs">
                                  {student.name?.charAt(0).toUpperCase() || "S"}
                                </div>
                                <div className="min-w-0">
                                  <p className="font-bold text-[#142845] truncate">{student.name}</p>
                                  <p className="text-[11px] text-[#8ba2bd] truncate flex items-center gap-1">
                                    <Mail className="h-3 w-3" />
                                    <span>{student.email}</span>
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Kit Status */}
                            <td className="py-4 px-5">
                              {student.is_kit_unlocked ? (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ecfdf5] px-3 py-1 text-[11px] font-bold text-[#059669]">
                                  <span className="h-1.5 w-1.5 rounded-full bg-[#059669]" />
                                  <span>Kit Verified</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fffbeb] px-3 py-1 text-[11px] font-bold text-[#d97706]">
                                  <span className="h-1.5 w-1.5 rounded-full bg-[#d97706]" />
                                  <span>Code Pending</span>
                                </span>
                              )}
                            </td>

                            {/* Activation Key */}
                            <td className="py-4 px-5">
                              {student.kit_code ? (
                                <span className="font-mono text-[11px] font-bold text-[#2563eb] bg-[#eff6ff] px-2.5 py-1 rounded-xl">
                                  {student.kit_code}
                                </span>
                              ) : (
                                <span className="text-[11px] text-[#8ba2bd] italic">None</span>
                              )}
                            </td>

                            {/* Last Active Timestamp */}
                            <td className="py-4 px-5 text-[#617b9b] text-[11px]">
                              {student.last_login_at ? (
                                <span>{new Date(student.last_login_at).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                              ) : (
                                <span className="text-[#8ba2bd] italic">Never</span>
                              )}
                            </td>

                            {/* Registered Date */}
                            <td className="py-4 px-5 text-[#8ba2bd] text-[11px]">
                              {new Date(student.created_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </td>

                            {/* Actions */}
                            <td className="py-4 px-5 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleToggleKit(student.id)}
                                  title={student.is_kit_unlocked ? "Lock Kit Access" : "Grant Kit Access"}
                                  className={`rounded-xl p-2 transition shadow-xs ${
                                    student.is_kit_unlocked
                                      ? "bg-[#fffbeb] text-[#d97706] hover:bg-[#fef3c7]"
                                      : "bg-[#ecfdf5] text-[#059669] hover:bg-[#d1fae5]"
                                  }`}
                                >
                                  {student.is_kit_unlocked ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDeleteStudent(student.id, student.name)}
                                  title="Delete Account"
                                  className="rounded-xl p-2 bg-[#fef2f2] text-[#dc2626] hover:bg-[#fee2e2] shadow-xs transition"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
