"use client";

import { use, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  IoTMasterclass
} from "@/data/iot-masterclasses";
import {
  Play,
  Lock,
  CheckCircle2,
  ExternalLink,
  Key,
  ChevronLeft,
  ChevronRight,
  Video,
  Clock,
  Cpu,
  Package,
  Check,
  Download,
  BookOpen,
  Award,
  Layers,
  GraduationCap,
  LogOut,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  Radio,
  FileCode,
  Sparkles,
  ArrowRight,
  AlertCircle
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const NIVA_KIT_URL = process.env.NEXT_PUBLIC_NIVA_KIT_URL || "https://www.nivashop.in/iot-product";

interface StudentUser {
  id: string;
  name: string;
  email: string;
  is_kit_unlocked: boolean;
  kit_code?: string;
}

export default function MasterclassDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const router = useRouter();

  // Masterclass & active lesson
  const [masterclass, setMasterclass] = useState<IoTMasterclass | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  // Student Auth State (With instant cache reading & auth checking state to prevent flash)
  const [studentToken, setStudentToken] = useState<string | null>(null);
  const [studentUser, setStudentUser] = useState<StudentUser | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // Active Workspace Tab
  const [activeTab, setActiveTab] = useState<"syllabus" | "hardware" | "outcomes" | "resources">("syllabus");

  // Modals
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Kit Code Modal
  const [showKitModal, setShowKitModal] = useState(false);
  const [pendingKitModal, setPendingKitModal] = useState(false);
  const [activationCode, setActivationCode] = useState("");
  const [kitError, setKitError] = useState("");
  const [kitVerifying, setKitVerifying] = useState(false);
  const [kitSuccess, setKitSuccess] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  // 1. Synchronously load cached user & initialize masterclass data
  useEffect(() => {
    const savedToken = typeof window !== "undefined" ? localStorage.getItem("flutterflirt_iot_token") : null;
    const savedUserStr = typeof window !== "undefined" ? localStorage.getItem("flutterflirt_iot_user") : null;

    // Immediately populate cached user so there is NO unauthenticated flash on refresh
    if (savedUserStr) {
      try {
        const parsed = JSON.parse(savedUserStr);
        setStudentUser(parsed);
      } catch (e) {
        console.error("Failed to parse cached user:", e);
      }
    }

    if (savedToken) {
      setStudentToken(savedToken);
      fetchUserData(savedToken);
    } else {
      setIsAuthChecking(false);
      loadMasterclass(null);
    }
  }, [slug]);

  const fetchUserData = async (token: string) => {
    try {
      const res = await fetch(`${API_URL}/api/iot/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStudentUser(data.user);
        localStorage.setItem("flutterflirt_iot_user", JSON.stringify(data.user));
        loadMasterclass(token);
      } else {
        localStorage.removeItem("flutterflirt_iot_token");
        localStorage.removeItem("flutterflirt_iot_user");
        setStudentToken(null);
        setStudentUser(null);
        loadMasterclass(null);
      }
    } catch {
      loadMasterclass(token);
    } finally {
      setIsAuthChecking(false);
    }
  };

  const loadMasterclass = async (token: string | null) => {
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      // 1. Try dynamic course endpoint from backend first
      const res = await fetch(`${API_URL}/api/iot/courses/${slug}`, { headers });
      if (res.ok) {
        const data = await res.json();
        if (data.course) {
          setMasterclass(data.course);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn("Could not fetch course from /api/iot/courses, checking static/lectures:", err);
    }


    // 3. Fallback: check /api/iot/lectures
    try {
      const lecRes = await fetch(`${API_URL}/api/iot/lectures`, { headers });
      if (lecRes.ok) {
        const data = await lecRes.json();
        if (data.lectures && data.lectures.length > 0) {
          const match = data.lectures.find(
            (l: any) => l.slug === slug || l.id === slug
          );
          if (match) {
            setMasterclass({
              id: match.id,
              code: `IOT-${match.sequence_order || "101"}`,
              title: match.title,
              slug: match.slug,
              badge: "Physical Computing",
              level: "Intermediate",
              duration: match.duration || "25:00",
              thumbnail_url: match.thumbnail_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop&q=80",
              description: match.description,
              overview: match.description,
              hardware_used: [
                "ESP32 DevKit V1",
                "Niva Lab Sensors Bundle",
                "Solderless Breadboard"
              ],
              learning_outcomes: [
                "Understand real-time embedded system architecture",
                "Connect sensors and stream data to the cloud",
                "Build practical industrial automation solutions"
              ],
              lessons: [
                {
                  id: match.id,
                  sequence_order: match.sequence_order || 1,
                  title: match.title,
                  duration: match.duration || "25:00",
                  description: match.description,
                  is_preview: match.is_preview
                }
              ],
              resources: match.resources || [],
              videoUrl: match.videoUrl
            });
            setLoading(false);
            return;
          }
        }
      }
    } catch {} finally {
      setLoading(false);
    }

    // If nothing found, keep masterclass as null
    setMasterclass(null);
    setLoading(false);
  };

  // Auth Submit
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const endpoint = authMode === "register" ? "/api/iot/auth/register" : "/api/iot/auth/login";
      const payload =
        authMode === "register"
          ? { name: authName.trim(), email: authEmail.trim(), password: authPassword }
          : { email: authEmail.trim(), password: authPassword };

      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      localStorage.setItem("flutterflirt_iot_token", data.token);
      localStorage.setItem("flutterflirt_iot_user", JSON.stringify(data.user));
      setStudentToken(data.token);
      setStudentUser(data.user);
      setIsAuthChecking(false);
      setShowAuthModal(false);
      setAuthPassword("");

      await loadMasterclass(data.token);

      if (pendingKitModal) {
        setShowKitModal(true);
        setPendingKitModal(false);
      } else if (!data.user.is_kit_unlocked) {
        setShowKitModal(true);
      }
    } catch (err: any) {
      setAuthError(err.message || "Failed to authenticate.");
    } finally {
      setAuthLoading(false);
    }
  };

  // Kit Code Verification
  const handleVerifyKitCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setKitError("");
    setKitVerifying(true);

    try {
      if (!studentToken) {
        setShowKitModal(false);
        openAuth("login");
        return;
      }

      const res = await fetch(`${API_URL}/api/iot/verify-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${studentToken}`
        },
        body: JSON.stringify({ code: activationCode.trim() })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Invalid or already used kit activation code.");
      }

      setKitSuccess(true);
      const updatedUser = {
        ...(studentUser || { id: "", name: "Student", email: "" }),
        is_kit_unlocked: true,
        kit_code: activationCode.trim().toUpperCase()
      };
      setStudentUser(updatedUser);
      localStorage.setItem("flutterflirt_iot_user", JSON.stringify(updatedUser));

      await loadMasterclass(studentToken);

      setTimeout(() => {
        setShowKitModal(false);
        setKitSuccess(false);
        setActivationCode("");
      }, 1400);
    } catch (err: any) {
      setKitError(err.message || "Verification failed. Check your kit code.");
    } finally {
      setKitVerifying(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("flutterflirt_iot_token");
    localStorage.removeItem("flutterflirt_iot_user");
    setStudentToken(null);
    setStudentUser(null);
    setIsAuthChecking(false);
    loadMasterclass(null);
  };

  const openAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setAuthError("");
    setShowAuthModal(true);
  };

  const fillDemoAccount = () => {
    setAuthEmail("student.demo@flutterflirt.com");
    setAuthPassword("password123");
    if (authMode === "register") {
      setAuthName("Student Demo");
    }
  };

  const currentCourse = masterclass;
  const isKitUnlocked = studentUser?.is_kit_unlocked || false;

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
          <p className="text-slate-600 font-medium">Loading Lab Workspace...</p>
        </main>
      </>
    );
  }

  if (!currentCourse) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center">
          <AlertCircle className="w-12 h-12 text-slate-400 mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">Masterclass Not Found</h2>
          <p className="text-slate-500 mb-6">The requested IoT lab could not be found or has been removed.</p>
          <a href="/iot-labs" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition">
            Browse Masterclasses
          </a>
        </main>
      </>
    );
  }

  // Active Lesson
  const lessons = currentCourse.lessons || [];
  const activeLesson = lessons[activeLessonIndex] || lessons[0];
  const isLessonUnlocked = isKitUnlocked || activeLesson?.is_preview || false;

  // Video URL calculation
  const streamVideoUrl = isLessonUnlocked
    ? (activeLesson?.videoUrl || currentCourse.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4")
    : null;

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-[#f8fafc] text-slate-900 pb-24 overflow-hidden">
        {/* Floating Ambient Background Gradients */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-tr from-blue-400/20 via-indigo-300/15 to-purple-400/15 blur-3xl animate-float-slow" />
          <div className="absolute top-1/2 -right-32 w-80 h-80 sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-bl from-cyan-400/20 via-sky-300/15 to-blue-500/15 blur-3xl animate-float-reverse" />
          <div className="absolute bottom-10 left-1/3 w-72 h-72 sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-br from-indigo-400/15 via-purple-300/10 to-pink-300/10 blur-3xl animate-float-gentle" />
        </div>

        {/* Masterclass Workspace Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28">
          {/* Top Breadcrumbs & Student Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200/80">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Link
                href="/iot-labs"
                className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700 transition"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>All Masterclasses</span>
              </Link>
              <span className="text-slate-300">/</span>
              <span className="font-mono font-bold text-slate-800 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-2xs">
                {currentCourse.code}
              </span>
              <span className="text-slate-400 hidden md:inline truncate max-w-md">
                {currentCourse.title}
              </span>
            </div>

            {/* Student Auth status indicator with zero flicker */}
            <div className="flex items-center gap-2">
              {isAuthChecking && !studentUser ? (
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 backdrop-blur-sm px-3 py-1.5 shadow-2xs">
                  <Loader2 className="h-3.5 w-3.5 text-blue-600 animate-spin" />
                  <span className="text-[11px] text-slate-400 hidden xs:inline">Verifying session...</span>
                </div>
              ) : studentUser ? (
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/95 backdrop-blur-sm px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-2xs">
                  <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-[11px] sm:text-xs shadow-xs">
                    {studentUser.name?.charAt(0).toUpperCase() || "S"}
                  </div>
                  <div className="text-left hidden xs:block">
                    <p className="text-xs font-semibold text-slate-800 leading-tight max-w-[120px] truncate">
                      {studentUser.name}
                    </p>
                    <span
                      className={`text-[10px] font-semibold flex items-center gap-1 ${
                        studentUser.is_kit_unlocked ? "text-emerald-600" : "text-amber-600"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${studentUser.is_kit_unlocked ? "bg-emerald-500" : "bg-amber-500"}`} />
                      {studentUser.is_kit_unlocked ? "Kit Verified" : "Code Pending"}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    title="Sign Out"
                    className="ml-1 text-slate-400 hover:text-red-600 transition p-1"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openAuth("login")}
                    className="btn-secondary btn-sm text-xs py-1.5 px-3.5"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuth("register")}
                    className="btn-primary btn-sm text-xs py-1.5 px-3.5"
                  >
                    Create Account
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Masterclass Hero Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-3">
              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-1 rounded-md shadow-2xs">
                {currentCourse.code}
              </span>
              <span className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-md shadow-2xs">
                {currentCourse.level}
              </span>
              <span className="text-xs font-medium text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-2xs">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                {currentCourse.duration}
              </span>
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-md">
                {currentCourse.badge}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-tight">
              {currentCourse.title}
            </h1>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
              {currentCourse.description}
            </p>
          </div>

          {/* Main Grid: Player (8 cols) + Playlist Sidebar (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Column: 1080p Video Player & Lesson Details */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-sm p-3.5 sm:p-5 shadow-sm">
                {/* 16:9 Video Canvas */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black flex flex-col justify-center shadow-inner">
                  {isLessonUnlocked && streamVideoUrl ? (
                    <video
                      ref={videoRef}
                      key={streamVideoUrl}
                      controls
                      controlsList="nodownload"
                      className="h-full w-full object-contain"
                      poster={currentCourse.thumbnail_url || undefined}
                    >
                      <source src={streamVideoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    /* Locked Glassmorphic Overlay */
                    <div className="relative h-full w-full flex flex-col items-center justify-center p-6 sm:p-8 text-center text-white bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
                      <div className="relative mb-3.5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20 border border-blue-400/30 backdrop-blur-md shadow-lg">
                        <Lock className="h-6 w-6 text-blue-400" />
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
                        </span>
                      </div>

                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-300 mb-1">
                        HARDWARE LAB // NIVA KIT REQUIRED
                      </span>

                      <h3 className="text-base sm:text-xl md:text-2xl font-bold max-w-lg leading-snug">
                        {activeLesson?.title || currentCourse.title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed px-2">
                        This lesson requires wiring circuits with the official Niva Hardware Kit. Unlock 1080p video streams, PlatformIO code, and schematics.
                      </p>

                      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                        <a
                          href={NIVA_KIT_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary w-full sm:w-auto text-xs sm:text-sm py-2.5 px-5 shadow-lg shadow-blue-600/30"
                        >
                          <span>Buy Kit on Niva Shop</span>
                          <ExternalLink className="h-4 w-4" />
                        </a>

                        <button
                          onClick={() => {
                            if (!studentToken) {
                              setPendingKitModal(true);
                              openAuth("login");
                            } else {
                              setShowKitModal(true);
                            }
                          }}
                          className="btn-secondary w-full sm:w-auto text-xs sm:text-sm py-2.5 px-5 bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white backdrop-blur-sm"
                        >
                          <Key className="h-4 w-4" />
                          <span>Enter Kit Code</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Meta Strip Below Player */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      Module {activeLesson?.sequence_order || 1}
                    </span>
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                      <Clock className="h-3 w-3 text-slate-400" />
                      {activeLesson?.duration || "20:00"}
                    </span>
                    {activeLesson?.is_preview && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        Free Preview
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {isLessonUnlocked ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Ready to Stream</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full">
                        <Lock className="h-3.5 w-3.5 text-amber-600" />
                        <span>Kit Code Required</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Active Lesson Description */}
                <div className="mt-3">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    {activeLesson?.title || currentCourse.title}
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {activeLesson?.description || currentCourse.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Curriculum Playlist Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-sm p-5 shadow-sm">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Curriculum Modules
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {lessons.length} Modules • Complete Course Track
                    </p>
                  </div>
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
                    {currentCourse.code}
                  </span>
                </div>

                {/* Playlist Scroll Area */}
                <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1 scrollbar-none">
                  {lessons.map((lesson, idx) => {
                    const isActive = idx === activeLessonIndex;
                    const canWatch = isKitUnlocked || lesson.is_preview;

                    return (
                      <button
                        key={lesson.id || idx}
                        type="button"
                        onClick={() => setActiveLessonIndex(idx)}
                        className={`w-full text-left rounded-2xl p-3.5 border transition-all duration-200 flex items-start gap-3.5 ${
                          isActive
                            ? "border-blue-600 bg-blue-50/70 shadow-xs ring-1 ring-blue-600/30"
                            : "border-slate-200/70 hover:border-slate-300 hover:bg-slate-50/60 bg-white"
                        }`}
                      >
                        {/* Status Icon */}
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold text-xs transition ${
                            isActive
                              ? "bg-blue-600 text-white shadow-xs"
                              : canWatch
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 text-slate-500 border border-slate-200/80"
                          }`}
                        >
                          {canWatch ? (
                            <Play className="h-4 w-4 fill-current ml-0.5" />
                          ) : (
                            <Lock className="h-4 w-4" />
                          )}
                        </div>

                        {/* Module Info */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[11px] font-semibold text-blue-600">
                              Module 0{lesson.sequence_order} • {lesson.duration}
                            </span>
                            {lesson.is_preview && !isKitUnlocked && (
                              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                                Preview
                              </span>
                            )}
                          </div>
                          <h4
                            className={`text-xs sm:text-sm font-bold leading-snug line-clamp-2 ${
                              isActive ? "text-blue-950" : "text-slate-800"
                            }`}
                          >
                            {lesson.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                            {lesson.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Kit Verification CTA Card */}
              <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      Official Niva Hardware Kit
                    </h4>
                    <span className="text-[11px] text-blue-600 font-semibold">
                      Required for all hands-on builds
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mt-2 mb-4">
                  Includes ESP32 DevKit V1, precision sensors (DHT22, ultrasonic), I2C OLED display, relays, and complete jumper wire bundle.
                </p>

                <div className="flex flex-col gap-2">
                  <a
                    href={NIVA_KIT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full py-2.5 text-xs justify-center font-semibold"
                  >
                    <span>Order Kit on Niva Shop</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  {!isKitUnlocked && (
                    <button
                      type="button"
                      onClick={() => {
                        if (!studentToken) {
                          setPendingKitModal(true);
                          openAuth("login");
                        } else {
                          setShowKitModal(true);
                        }
                      }}
                      className="btn-secondary w-full py-2 text-xs justify-center font-semibold text-slate-700 bg-white"
                    >
                      <Key className="h-3.5 w-3.5 text-blue-600" />
                      <span>Redeem Activation Key</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Masterclass Detailed Information Workspace Tabs */}
          <div className="mt-12 rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
            {/* Tabs Selector Bar */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-4 overflow-x-auto scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveTab("syllabus")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 ${
                  activeTab === "syllabus"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Full Syllabus & Modules ({lessons.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("hardware")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 ${
                  activeTab === "hardware"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Cpu className="h-4 w-4" />
                <span>Hardware Bench ({currentCourse.hardware_used?.length || 0})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("outcomes")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 ${
                  activeTab === "outcomes"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Award className="h-4 w-4" />
                <span>Learning Outcomes</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("resources")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 ${
                  activeTab === "resources"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Download className="h-4 w-4" />
                <span>Downloads & Schematics</span>
              </button>
            </div>

            {/* Tab 1: Syllabus */}
            {activeTab === "syllabus" && (
              <div className="pt-6 space-y-6">
                <div className="max-w-3xl">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    Course Architecture & Comprehensive Syllabus
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    {currentCourse.overview}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 sm:p-5 hover:border-slate-300 transition"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">
                          Module 0{lesson.sequence_order}
                        </span>
                        <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                          <Clock className="h-3 w-3 text-slate-400" />
                          {lesson.duration}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        {lesson.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Hardware Bench */}
            {activeTab === "hardware" && (
              <div className="pt-6 space-y-6">
                <div className="max-w-3xl">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    Required Hardware Components from Niva Kit
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Every circuit in this masterclass is assembled on a physical solderless breadboard using verified components from the official kit.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentCourse.hardware_used?.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 flex items-center gap-3.5 shadow-2xs hover:shadow-sm transition"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                        <Cpu className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-slate-900 block leading-tight">
                          {item}
                        </span>
                        <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                          <Check className="h-3 w-3" />
                          <span>Included in Niva Kit</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Kit Order Strip */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
                      <Package className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-blue-950">
                        Need the official hardware bench kit?
                      </h4>
                      <p className="text-xs text-blue-700">
                        Complete with ESP32, all sensors, actuators, and jumper bundles.
                      </p>
                    </div>
                  </div>
                  <a
                    href={NIVA_KIT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs sm:text-sm py-2.5 px-5 shadow-sm shrink-0"
                  >
                    <span>Order on Niva Shop</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            )}

            {/* Tab 3: Outcomes */}
            {activeTab === "outcomes" && (
              <div className="pt-6 space-y-6">
                <div className="max-w-3xl">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    Verified Industry Engineering Competencies
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    By wiring, flashing, and debugging these physical circuits, you will gain hands-on mastery in:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentCourse.learning_outcomes?.map((outcome, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 flex items-start gap-3.5 shadow-2xs"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mt-0.5">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                        {outcome}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Resources */}
            {activeTab === "resources" && (
              <div className="pt-6 space-y-6">
                <div className="max-w-3xl">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    Schematics, Pinouts & Firmware Downloads
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Download verified circuit diagrams, pinout cheat sheets, and PlatformIO starter code for this masterclass.
                  </p>
                </div>

                <div className="space-y-3 max-w-2xl">
                  {currentCourse.resources?.map((res, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200 bg-white p-4 flex items-center justify-between gap-4 shadow-2xs hover:border-slate-300 transition"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                          <FileCode className="h-5 w-5" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {res.title}
                        </span>
                      </div>
                      <a
                        href={res.url}
                        className="btn-secondary text-xs py-2 px-4 shrink-0 font-semibold"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Student Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-sm max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xl">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>

            <div className="text-center mb-5">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 mb-2.5 shadow-2xs">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {authMode === "login" ? "Student Sign In" : "Create Student Account"}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {authMode === "login" ? "Access your unlocked lab workspace" : "Register to track your builds"}
              </p>
            </div>

            {authError && (
              <div className="mb-3.5 rounded-xl border border-red-200 bg-red-50 p-2.5 text-xs text-red-700">
                {authError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-3">
              {authMode === "register" && (
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="Alex Chen"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={fillDemoAccount}
                    className="text-[10px] font-semibold text-blue-600 hover:underline"
                  >
                    1-Click Demo Fill
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-200 px-3.5 pr-9 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="btn-primary w-full py-2.5 text-xs font-semibold mt-3"
              >
                {authLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                ) : authMode === "login" ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Kit Activation Modal */}
      {showKitModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-sm max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xl">
            <button
              onClick={() => setShowKitModal(false)}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>

            <div className="text-center mb-5">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 mb-2.5 shadow-2xs">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Hardware Kit Required
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Enter your secret key from your kit packaging to unlock all masterclasses.
              </p>
            </div>

            {kitSuccess ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center">
                <CheckCircle2 className="h-7 w-7 text-emerald-600 mx-auto mb-1.5" />
                <h4 className="font-bold text-xs text-emerald-900">Kit Code Verified!</h4>
                <p className="text-[11px] text-emerald-700 mt-0.5">All 1080p lab video streams are now unlocked.</p>
              </div>
            ) : (
              <div className="space-y-3.5">
                <a
                  href={NIVA_KIT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition shadow-xs"
                >
                  <span>Buy Kit on Niva Shop</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <div className="text-center text-[11px] text-slate-400">or enter your code below</div>

                <form onSubmit={handleVerifyKitCode} className="space-y-3">
                  {kitError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-2 text-xs text-red-700">
                      {kitError}
                    </div>
                  )}

                  <div>
                    <input
                      type="text"
                      required
                      value={activationCode}
                      onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
                      placeholder="e.g. NIVA-IOT-2025"
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-center font-mono text-xs font-bold uppercase text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block text-center">
                      Demo Code: <code className="text-blue-600 font-semibold cursor-pointer hover:underline" onClick={() => setActivationCode("NIVA-IOT-2025")}>NIVA-IOT-2025</code>
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={kitVerifying}
                    className="btn-primary w-full py-2.5 text-xs font-semibold"
                  >
                    {kitVerifying ? "Verifying..." : "Unlock Masterclasses"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
