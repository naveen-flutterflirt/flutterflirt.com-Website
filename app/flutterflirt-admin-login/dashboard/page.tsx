"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  Video,
  GraduationCap,
  ExternalLink,
  RefreshCw,
  Loader2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Layers,
  ChevronRight,
  Eye,
  ShieldCheck,
  ArrowUpRight
} from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { PopupToast } from "@/components/ui/dialog-popup";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface DashboardMetrics {
  students: {
    total: number;
    kitUnlocked: number;
    pending: number;
    activePastWeek: number;
  };
  courses: {
    total: number;
    published: number;
    totalModules: number;
    totalLessons: number;
  };
  collegeInquiries: {
    total: number;
    pending: number;
    contacted: number;
    inDiscussion: number;
    partnered: number;
  };
}

interface RecentData {
  students: Array<{
    id: string;
    name: string;
    email: string;
    is_kit_unlocked: boolean;
    kit_code?: string;
    last_login_at?: string;
    created_at: string;
  }>;
  collegeInquiries: Array<{
    id: string;
    college_name: string;
    contact_person: string;
    email: string;
    phone?: string;
    batch_size?: string;
    status: string;
    created_at: string;
  }>;
  courses: Array<{
    id: string;
    code: string;
    title: string;
    slug: string;
    badge: string;
    level: string;
    duration: string;
    thumbnail_url: string;
    description: string;
    lessons?: any[];
  }>;
}

export default function AdminDashboardPage() {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [recentData, setRecentData] = useState<RecentData | null>(null);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

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
      fetchOverview();
    }
  }, [token]);

  const fetchOverview = async () => {
    if (!token) return;
    setLoading(true);
    setErrorBanner(null);
    try {
      const res = await fetch(`${API_URL}/api/admin/iot/dashboard-overview`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMetrics(data.metrics);
        setRecentData(data.recentData);
      } else {
        if (res.status === 401) {
          sessionStorage.removeItem("flutterflirt_admin_token");
          router.push("/flutterflirt-admin-login");
          return;
        }
        setErrorBanner(data.message || "Failed to load dashboard metrics");
      }
    } catch {
      setErrorBanner("Network error connecting to backend service.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleKit = async (studentId: string, currentUnlocked: boolean) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/iot/students/${studentId}/toggle-kit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isKitUnlocked: !currentUnlocked })
      });
      if (res.ok) {
        setToastMsg({ message: "Student kit status updated successfully.", type: "success" });
        fetchOverview();
      } else {
        setToastMsg({ message: "Failed to update kit access.", type: "error" });
      }
    } catch {
      setToastMsg({ message: "Failed to update kit access.", type: "error" });
    }
  };

  const handleUpdateInquiryStatus = async (id: string, newStatus: string) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/iot/college-inquiries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setToastMsg({ message: "Inquiry status updated successfully.", type: "success" });
        fetchOverview();
      } else {
        setToastMsg({ message: "Failed to update inquiry status.", type: "error" });
      }
    } catch {
      setToastMsg({ message: "Failed to update inquiry status.", type: "error" });
    }
  };

  if (isInitializing || (loading && !metrics)) {
    return (
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full bg-[#edf5ff] text-[#142845] font-['Manrope',sans-serif]">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <header className="sticky top-0 z-30 flex items-center justify-between bg-white/75 backdrop-blur-md px-6 py-4">
              <div className="flex items-center gap-3">
                <SidebarTrigger />
                <div className="animate-pulse">
                  <div className="h-5 w-24 bg-gray-200 rounded mb-1.5"></div>
                  <div className="h-3 w-40 bg-gray-200 rounded"></div>
                </div>
              </div>
            </header>
            <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
              {/* Skeleton Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[1, 2, 3].map(i => (
                  <div key={i} className="p-6 rounded-3xl bg-white shadow-xs h-[148px] flex flex-col justify-between animate-pulse">
                    <div className="flex items-center justify-between mb-4">
                       <div className="h-3 w-24 bg-gray-100 rounded"></div>
                       <div className="h-10 w-10 bg-gray-100 rounded-2xl"></div>
                    </div>
                    <div>
                       <div className="h-8 w-16 bg-gray-100 rounded mb-3"></div>
                       <div className="flex justify-between">
                         <div className="h-4 w-20 bg-gray-100 rounded-full"></div>
                         <div className="h-3 w-16 bg-gray-100 rounded"></div>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Skeleton 2 Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 bg-white rounded-3xl p-6 space-y-4 animate-pulse">
                   <div className="flex justify-between items-center mb-2">
                     <div>
                       <div className="h-5 w-48 bg-gray-100 rounded mb-1.5"></div>
                       <div className="h-3 w-32 bg-gray-100 rounded"></div>
                     </div>
                     <div className="h-4 w-16 bg-gray-100 rounded"></div>
                   </div>
                   <div className="space-y-3">
                     {[1, 2, 3, 4, 5].map(i => (
                       <div key={i} className="h-20 bg-[#f8fbff] rounded-2xl"></div>
                     ))}
                   </div>
                </div>
                
                <div className="lg:col-span-5 space-y-6 animate-pulse">
                  <div className="bg-white rounded-3xl p-6 space-y-4">
                     <div className="flex justify-between items-center mb-2">
                       <div>
                         <div className="h-5 w-32 bg-gray-100 rounded mb-1.5"></div>
                         <div className="h-3 w-24 bg-gray-100 rounded"></div>
                       </div>
                     </div>
                     <div className="space-y-2.5">
                       {[1, 2, 3, 4].map(i => (
                         <div key={i} className="h-[68px] bg-[#f8fbff] rounded-2xl"></div>
                       ))}
                     </div>
                  </div>
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
        <AppSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Elegant Line-Free Header */}
          <header className="sticky top-0 z-30 flex items-center justify-between bg-white/75 backdrop-blur-md px-6 py-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div>
                <h1 className="text-lg font-bold text-[#142845] tracking-tight">
                  Overview
                </h1>
                <p className="text-xs text-[#617b9b]">
                  Platform statistics & operational quick view
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={fetchOverview}
                disabled={loading}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-2xl bg-white text-[#2563eb] shadow-xs hover:bg-[#f0f6ff] transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>

            </div>
          </header>

          {/* Main Dashboard Canvas */}
          <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
            {errorBanner && (
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#fef2f2] text-[#dc2626] text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorBanner}</span>
              </div>
            )}

            {/* 3 Minimal Modern Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Card 1: Students */}
              <Link
                href="/flutterflirt-admin-login/students"
                className="group p-6 rounded-3xl bg-white shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-[#617b9b] uppercase tracking-wider">
                    Enrolled Students
                  </span>
                  <div className="p-2.5 rounded-2xl bg-[#edf5ff] text-[#2563eb] group-hover:bg-[#dbe8fc] transition">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-black text-[#142845] tracking-tight">
                    {metrics?.students.total ?? 0}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#ecfdf5] text-[#059669]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {metrics?.students.kitUnlocked ?? 0} Kit Verified
                    </span>
                    <span className="text-xs font-bold text-[#2563eb] flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                      Manage <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Card 2: IoT Masterclasses */}
              <Link
                href="/flutterflirt-admin-login/iot-labs"
                className="group p-6 rounded-3xl bg-white shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-[#617b9b] uppercase tracking-wider">
                    IoT Masterclasses
                  </span>
                  <div className="p-2.5 rounded-2xl bg-[#edf5ff] text-[#2563eb] group-hover:bg-[#dbe8fc] transition">
                    <Video className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-black text-[#142845] tracking-tight">
                    {metrics?.courses.total ?? 0}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#eff6ff] text-[#2563eb]">
                      <Layers className="w-3.5 h-3.5" />
                      {metrics?.courses.totalLessons ?? 0} Lessons
                    </span>
                    <span className="text-xs font-bold text-[#2563eb] flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                      Courses <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Card 3: University Requests */}
              <Link
                href="/flutterflirt-admin-login/college-requests"
                className="group p-6 rounded-3xl bg-white shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-[#617b9b] uppercase tracking-wider">
                    University Inquiries
                  </span>
                  <div className="p-2.5 rounded-2xl bg-[#faf5ff] text-[#9333ea] group-hover:bg-[#f3e8ff] transition">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-black text-[#142845] tracking-tight">
                    {metrics?.collegeInquiries.total ?? 0}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#fffbeb] text-[#d97706]">
                      <Clock className="w-3.5 h-3.5" />
                      {metrics?.collegeInquiries.pending ?? 0} Pending
                    </span>
                    <span className="text-xs font-bold text-[#9333ea] flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                      Inquiries <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Balanced 2-Column Clean Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: University Partnership Requests (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-[#142845]">
                      University Partnership Requests
                    </h2>
                    <p className="text-xs text-[#617b9b]">
                      Institutional lab inquiries from colleges
                    </p>
                  </div>
                  <Link
                    href="/flutterflirt-admin-login/college-requests"
                    className="text-xs font-bold text-[#2563eb] hover:underline flex items-center gap-1"
                  >
                    <span>View all</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {recentData?.collegeInquiries.length === 0 ? (
                  <div className="py-12 text-center text-xs text-[#617b9b]">
                    No university inquiries submitted yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentData?.collegeInquiries.slice(0, 5).map((inq) => (
                      <div
                        key={inq.id}
                        className="p-4 rounded-2xl bg-[#f8fbff] hover:bg-[#edf5ff] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[#142845] truncate">
                              {inq.college_name}
                            </span>
                            {inq.batch_size && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#eff6ff] text-[#2563eb] shrink-0">
                                {inq.batch_size} students
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#617b9b] truncate">
                            {inq.contact_person} • {inq.email}
                          </p>
                        </div>

                        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                          <span className="text-[11px] text-[#8ba2bd]">
                            {new Date(inq.created_at).toLocaleDateString()}
                          </span>
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                            className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-white text-[#142845] shadow-xs focus:outline-none cursor-pointer"
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="in_discussion">Discussion</option>
                            <option value="partnered">Partnered</option>
                            <option value="rejected">Closed</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: IoT Masterclasses & Students Quick Access (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Active Masterclasses Card */}
                <div className="bg-white rounded-3xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-[#142845]">
                        Active Masterclasses
                      </h2>
                      <p className="text-xs text-[#617b9b]">
                        Live curriculum courses
                      </p>
                    </div>
                    <Link
                      href="/flutterflirt-admin-login/iot-labs"
                      className="text-xs font-bold text-[#2563eb] hover:underline flex items-center gap-1"
                    >
                      <span>Manage</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="space-y-2.5">
                    {recentData?.courses.slice(0, 3).map((course) => {
                      const lessonCount = Array.isArray(course.lessons)
                        ? course.lessons.length
                        : 4;

                      return (
                        <div
                          key={course.id}
                          className="p-3.5 rounded-2xl bg-[#f8fbff] hover:bg-[#edf5ff] transition-colors flex items-center justify-between gap-3"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#2563eb] shadow-xs">
                                {course.code}
                              </span>
                              <h3 className="text-xs font-bold text-[#142845] truncate">
                                {course.title}
                              </h3>
                            </div>
                            <p className="text-[11px] text-[#617b9b] mt-0.5">
                              {lessonCount} Lessons • {course.duration}
                            </p>
                          </div>

                          <a
                            href={`/iot-labs/${course.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-xl bg-white hover:bg-[#2563eb] text-[#2563eb] hover:text-white shadow-xs transition shrink-0"
                            title="Open Course Syllabus"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recent Registered Students Card */}
                <div className="bg-white rounded-3xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-[#142845]">
                        Recent Students
                      </h2>
                      <p className="text-xs text-[#617b9b]">
                        Latest enrolled accounts
                      </p>
                    </div>
                    <Link
                      href="/flutterflirt-admin-login/students"
                      className="text-xs font-bold text-[#2563eb] hover:underline flex items-center gap-1"
                    >
                      <span>All students</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="space-y-2.5">
                    {recentData?.students.slice(0, 4).map((student) => (
                      <div
                        key={student.id}
                        className="p-3.5 rounded-2xl bg-[#f8fbff] hover:bg-[#edf5ff] transition-colors flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#142845] truncate">{student.name}</p>
                          <p className="text-[11px] text-[#617b9b] truncate">{student.email}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {student.is_kit_unlocked ? (
                            <span className="text-[10px] font-bold text-[#059669] bg-[#ecfdf5] px-2 py-0.5 rounded-full">
                              Kit Active
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-[#d97706] bg-[#fffbeb] px-2 py-0.5 rounded-full">
                              Pending
                            </span>
                          )}

                          <button
                            onClick={() => handleToggleKit(student.id, student.is_kit_unlocked)}
                            className={`text-[11px] font-semibold px-2.5 py-1 rounded-xl transition ${
                              student.is_kit_unlocked
                                ? "bg-white text-[#64748b] hover:text-[#dc2626] shadow-xs"
                                : "bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-xs"
                            }`}
                          >
                            {student.is_kit_unlocked ? "Revoke" : "Grant"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        <PopupToast
          message={toastMsg?.message || null}
          type={toastMsg?.type || "info"}
          onClose={() => setToastMsg(null)}
        />
      </div>
    </SidebarProvider>
  );
}
