"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PopupToast } from "@/components/ui/dialog-popup";
import { IoTMasterclass } from "@/data/iot-masterclasses";
import {
  Video,
  Lock,
  CheckCircle2,
  ExternalLink,
  Play,
  Key,
  ShieldCheck,
  Cpu,
  Radio,
  Wifi,
  Layers,
  Sparkles,
  AlertCircle,
  Loader2,
  ChevronRight,
  Package,
  HelpCircle,
  LogOut,
  Mail,
  Zap,
  Activity,
  Code2,
  Server,
  Award,
  BookOpen,
  GraduationCap,
  Building2,
  Users,
  Eye,
  EyeOff,
  Clock,
  Send,
  Check,
  Compass,
  Laptop
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

interface AdminLecture {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  sequence_order: number;
  is_preview: boolean;
  thumbnail_url: string;
  resources?: { title: string; url: string }[];
  isLocked: boolean;
  videoUrl: string | null;
}

// Hardware & Curriculum Ecosystem Tabs
const ECOSYSTEM_HARDWARE_ITEMS = [
  {
    name: "ESP32 DevKit V1 Microcontroller",
    tag: "Silicon Core",
    desc: "240MHz dual-core Xtensa MCU with integrated 802.11 b/g/n Wi-Fi, Bluetooth 4.2 BLE, 36 GPIO pins, ADC, DAC, and capacitive touch sensors."
  },
  {
    name: "Precision Sensor Array",
    tag: "Analog & Digital",
    desc: "DHT22 digital temperature & humidity, HC-SR04 ultrasonic sonar, analog light-dependent resistor (LDR), and passive infrared (PIR) motion detector."
  },
  {
    name: "Actuators & Power Switching",
    tag: "Industrial Control",
    desc: "Optocoupled 5V/220V AC relay module for smart-mains switching, SG90 micro servo for mechanical actuation, active buzzer, and RGB status LEDs."
  },
  {
    name: "Breadboard & Prototyping Gear",
    tag: "Bench Prototyping",
    desc: "830-tie point solderless breadboard, 65-piece male-to-male jumper wire bundle, 10k potentiometer, push buttons, and USB-C/Micro-B flash cable."
  }
];

const ECOSYSTEM_CURRICULUM_TRACKS = [
  {
    track: "Track 01",
    title: "ESP32 Bare-Metal & FreeRTOS",
    tech: "C++ / PlatformIO",
    desc: "Direct register manipulation, hardware interrupts, FreeRTOS tasks, and real-time scheduling on dual Xtensa cores."
  },
  {
    track: "Track 02",
    title: "Edge Sensors & Actuator Interfacing",
    tech: "I2C / SPI / ADC",
    desc: "Calibrating 12-bit ADCs, reading single-wire DHT22 sensor buses, and driving high-voltage optocoupled relays safely."
  },
  {
    track: "Track 03",
    title: "Industrial MQTT & TLS Edge Networking",
    tech: "MQTT / TLS 1.3",
    desc: "Deploying resilient Wi-Fi state machines, TLS certificate validation, and pub/sub message brokers on EMQX and HiveMQ."
  },
  {
    track: "Track 04",
    title: "Full-Stack Flutter IoT Dashboard",
    tech: "Flutter / WebSockets",
    desc: "Architecting responsive mobile and web dashboards, real-time WebSocket telemetry charts, and remote relay switching."
  }
];

const UNIVERSITY_PILLARS = [
  {
    title: "Industry-Grade Lab Benches",
    desc: "Equip your electrical and computer engineering labs with standardized ESP32 hardware kits, eliminating mismatched components and student wiring downtime."
  },
  {
    title: "Turnkey Semester Lab Curriculum",
    desc: "16-week structured lab manuals, laboratory assignment rubrics, and circuit schematics aligned with modern ABET and NBA engineering accreditation criteria."
  },
  {
    title: "Faculty Enablement Workshops",
    desc: "Comprehensive onboarding for professors and lab assistants, covering FreeRTOS, edge IoT protocols, cloud broker setup, and hardware troubleshooting."
  },
  {
    title: "Verifiable Student Certification",
    desc: "Students who complete real-world lab builds earn cryptographically verifiable FlutterFlirt IoT Specialist credentials for their engineering portfolios."
  }
];

const PURCHASING_STEPS = [
  {
    step: "01",
    title: "Order on Niva Shop",
    desc: "Purchase the verified FlutterFlirt IoT Engineering Kit directly on the official Niva Shop with fast, insured delivery."
  },
  {
    step: "02",
    title: "Locate Your Secret Key",
    desc: "Inside your physical package or in your confirmation email, find your unique serial activation code (e.g. NIVA-IOT-XXXX)."
  },
  {
    step: "03",
    title: "Unlock All Masterclasses",
    desc: "Sign in to FlutterFlirt IoT Labs, enter your activation key, and all 1080p lab video masterclasses will immediately unlock permanently."
  },
  {
    step: "04",
    title: "Build, Wire & Stream",
    desc: "Follow the masterclasses, assemble circuits on your breadboard, flash firmware, and stream telemetry live to the cloud."
  }
];

export default function IoTLabsPage() {
  const [dynamicCourses, setDynamicCourses] = useState<IoTMasterclass[]>([]);
  const [adminLectures, setAdminLectures] = useState<AdminLecture[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"All" | "Beginner" | "Intermediate" | "Advanced">("All");

  // Student Auth State (With instant cache reading & auth checking state to prevent flash)
  const [studentToken, setStudentToken] = useState<string | null>(null);
  const [studentUser, setStudentUser] = useState<StudentUser | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // Modal Flow States
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Kit Activation Modal
  const [showKitModal, setShowKitModal] = useState(false);
  const [activationCode, setActivationCode] = useState("");
  const [kitError, setKitError] = useState("");
  const [kitVerifying, setKitVerifying] = useState(false);
  const [kitSuccess, setKitSuccess] = useState(false);

  // College Partnership Modal
  const [showCollegeModal, setShowCollegeModal] = useState(false);
  const [collegeName, setCollegeName] = useState("");
  const [collegeContact, setCollegeContact] = useState("");
  const [collegeEmail, setCollegeEmail] = useState("");
  const [collegePhone, setCollegePhone] = useState("");
  const [collegeBatchSize, setCollegeBatchSize] = useState("60-120 Students");
  const [collegeSubmitted, setCollegeSubmitted] = useState(false);
  const [collegeSubmitting, setCollegeSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // Active ecosystem tab
  const [ecosystemTab, setEcosystemTab] = useState<"hardware" | "curriculum">("hardware");

  const masterclassesSectionRef = useRef<HTMLDivElement>(null);
  const collegeSectionRef = useRef<HTMLDivElement>(null);

  // 1. Check local session & fetch user info with local cache
  useEffect(() => {
    const savedToken = typeof window !== "undefined" ? localStorage.getItem("flutterflirt_iot_token") : null;
    const savedUserStr = typeof window !== "undefined" ? localStorage.getItem("flutterflirt_iot_user") : null;

    // Immediately populate cached user so there is NO unauthenticated flash
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
      fetchCoursesAndLectures(null);
    }
  }, []);

  const fetchUserData = async (token: string) => {
    try {
      const res = await fetch(`${API_URL}/api/iot/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStudentUser(data.user);
        localStorage.setItem("flutterflirt_iot_user", JSON.stringify(data.user));
        fetchCoursesAndLectures(token);
      } else {
        localStorage.removeItem("flutterflirt_iot_token");
        localStorage.removeItem("flutterflirt_iot_user");
        setStudentToken(null);
        setStudentUser(null);
        fetchCoursesAndLectures(null);
      }
    } catch {
      fetchCoursesAndLectures(token);
    } finally {
      setIsAuthChecking(false);
    }
  };

  const fetchCoursesAndLectures = async (token: string | null) => {
    setLoading(true);
    try {
      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      // Fetch dynamic courses & lectures in parallel
      const [coursesRes, lecturesRes] = await Promise.allSettled([
        fetch(`${API_URL}/api/iot/courses`, { headers }),
        fetch(`${API_URL}/api/iot/lectures`, { headers }),
      ]);

      if (coursesRes.status === "fulfilled" && coursesRes.value.ok) {
        const cData = await coursesRes.value.json();
        if (cData.courses) {
          setDynamicCourses(cData.courses);
        }
      }

      if (lecturesRes.status === "fulfilled" && lecturesRes.value.ok) {
        const lData = await lecturesRes.value.json();
        if (lData.lectures) {
          setAdminLectures(lData.lectures);
        }
      }
    } catch (err) {
      console.error("Failed to load IoT Labs dynamic data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Merge dynamic backend courses with any standalone admin-uploaded lectures
  const allMasterclasses: IoTMasterclass[] = useMemo(() => {
    const baseList: IoTMasterclass[] = [...dynamicCourses];

    if (adminLectures && adminLectures.length > 0) {
      adminLectures.forEach((adm, idx) => {
        const existingIdx = baseList.findIndex(
          (m) => m.slug === adm.slug || m.id === adm.id
        );

        if (existingIdx >= 0) {
          if (adm.videoUrl) {
            baseList[existingIdx] = {
              ...baseList[existingIdx],
              videoUrl: adm.videoUrl,
              isLocked: adm.isLocked
            };
          }
        }
      });
    }

    return baseList;
  }, [dynamicCourses, adminLectures]);

  // Filtered masterclasses for grid
  const displayedMasterclasses = useMemo(() => {
    if (activeFilter === "All") return allMasterclasses;
    return allMasterclasses.filter((m) => m.level === activeFilter);
  }, [allMasterclasses, activeFilter]);

  const scrollToMasterclasses = () => {
    masterclassesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToColleges = () => {
    collegeSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = () => {
    localStorage.removeItem("flutterflirt_iot_token");
    localStorage.removeItem("flutterflirt_iot_user");
    setStudentToken(null);
    setStudentUser(null);
    setIsAuthChecking(false);
    fetchCoursesAndLectures(null);
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

      await fetchCoursesAndLectures(data.token);

      if (!data.user.is_kit_unlocked) {
        setShowKitModal(true);
      }
    } catch (err: any) {
      setAuthError(err.message || "Failed to authenticate. Please check your credentials.");
    } finally {
      setAuthLoading(false);
    }
  };

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

      await fetchCoursesAndLectures(studentToken);

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

  const handleCollegeInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setCollegeSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/iot/college-inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collegeName: collegeName.trim(),
          contactPerson: collegeContact.trim(),
          email: collegeEmail.trim(),
          phone: collegePhone.trim(),
          batchSize: collegeBatchSize,
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to submit partnership request.");
      }

      setCollegeSubmitted(true);
    } catch (err: any) {
      setToastMsg({ message: err.message || "Something went wrong. Please try again.", type: "error" });
    } finally {
      setCollegeSubmitting(false);
    }
  };

  const isKitUnlocked = studentUser?.is_kit_unlocked || false;

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-[#f8fafc] text-slate-900 overflow-hidden">
        {/* =========================================================================
            FLOATING AMBIENT GRADIENT ANIMATIONS IN BACKGROUND
            ========================================================================= */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 sm:w-[540px] sm:h-[540px] rounded-full bg-gradient-to-tr from-blue-400/20 via-indigo-300/15 to-purple-400/15 blur-3xl animate-float-slow" />
          <div className="absolute top-1/3 -right-32 w-80 h-80 sm:w-[520px] sm:h-[520px] rounded-full bg-gradient-to-bl from-cyan-400/20 via-sky-300/15 to-blue-500/15 blur-3xl animate-float-reverse" />
          <div className="absolute bottom-20 left-1/4 w-72 h-72 sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-br from-indigo-400/15 via-purple-300/10 to-pink-300/10 blur-3xl animate-float-gentle" />
        </div>

        {/* =========================================================================
            HERO SECTION: FOCUSED, STUNNING & DIRECT (FULLY RESPONSIVE)
            ========================================================================= */}
        <section className="relative z-10 pt-24 sm:pt-36 pb-14 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          {/* Top Bar: Clean Badge + Distinct Student Auth Indicator with Zero Flash */}
          <div className="flex items-center justify-between gap-2 sm:gap-4 mb-8 sm:mb-12 w-full">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-blue-200/80 bg-white/90 backdrop-blur-sm px-2.5 py-1 sm:px-3.5 sm:py-1.5 shadow-sm">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-blue-600 shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-blue-800 uppercase">
                <span className="sm:hidden">IOT LABS</span>
                <span className="hidden sm:inline">FLUTTERFLIRT LABS // PHYSICAL COMPUTING ACADEMY</span>
              </span>
            </div>

            {/* Direct Student Status / Login & Create Account (Sleek Skeleton on Refresh) */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {isAuthChecking && !studentUser ? (
                <div className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/90 backdrop-blur-sm px-3 py-1.5 shadow-sm">
                  <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Loader2 className="h-3.5 w-3.5 text-blue-600 animate-spin" />
                  </div>
                  <div className="h-3 w-16 bg-slate-100 rounded hidden xs:block animate-pulse" />
                </div>
              ) : studentUser ? (
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 backdrop-blur-sm px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-sm">
                  <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-[11px] sm:text-xs">
                    {studentUser.name?.charAt(0).toUpperCase() || "S"}
                  </div>
                  <div className="text-left hidden xs:block sm:block">
                    <p className="text-[11px] sm:text-xs font-semibold text-slate-800 leading-tight max-w-[90px] sm:max-w-none truncate">
                      {studentUser.name}
                    </p>
                    <span
                      className={`text-[9px] sm:text-[10px] font-medium flex items-center gap-1 ${
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
                    className="ml-1 rounded-md p-1 text-slate-400 hover:text-red-600 transition"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={() => openAuth("login")}
                    className="btn-secondary btn-sm text-[11px] sm:text-xs px-2.5 sm:px-3.5 py-1 sm:py-1.5"
                  >
                    Sign In
                  </button>

                  <button
                    onClick={() => openAuth("register")}
                    className="btn-primary btn-sm text-[11px] sm:text-xs px-2.5 sm:px-3.5 py-1 sm:py-1.5"
                  >
                    Create Account
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Hero Core Copy */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.2] sm:leading-[1.12]">
              From Silicon to Cloud: The <span className="whitespace-nowrap">Hands-On</span>{" "}
              <span className="text-blue-600">
                IoT Engineering Lab
              </span>
            </h1>

            <p className="mt-3.5 sm:mt-5 text-sm sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto px-1">
              Bridge the divide between software architecture and physical circuits. 
              Wire real sensors, flash C++ firmware, stream telemetry via MQTT, and build industrial automation.
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3.5 max-w-md sm:max-w-none mx-auto">
              <a
                href={NIVA_KIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto text-xs sm:text-sm py-2.5 px-4 sm:px-5"
              >
                <span>Buy Official Kit on Niva Shop</span>
                <ExternalLink className="h-4 w-4 shrink-0" />
              </a>

              <button
                onClick={scrollToMasterclasses}
                className="btn-secondary w-full sm:w-auto text-xs sm:text-sm py-2.5 px-4 sm:px-5"
              >
                <span>Explore Masterclasses</span>
                <ChevronRight className="h-4 w-4 text-slate-400 shrink-0" />
              </button>

              <button
                onClick={scrollToColleges}
                className="btn-secondary w-full sm:w-auto text-indigo-900 border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-xs sm:text-sm py-2.5 px-4 sm:px-5"
              >
                <GraduationCap className="h-4 w-4 text-indigo-600 shrink-0" />
                <span>For Universities</span>
              </button>
            </div>

            {/* Trust Indicators Strip */}
            <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-x-4 gap-y-2.5 sm:gap-8 text-left sm:text-center text-[11px] sm:text-xs font-medium text-slate-500 border-t border-slate-200/80 pt-5 sm:pt-6">
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600 shrink-0" />
                <span>Physical Kit Included</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600 shrink-0" />
                <span>1080p HD on AWS S3</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600 shrink-0" />
                <span>Production C++ Code</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600 shrink-0" />
                <span>Verifiable Certificate</span>
              </span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 1: THE COMPLETE ECOSYSTEM (HARDWARE & CURRICULUM UNIFIED)
            ========================================================================= */}
        <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8 sm:mb-10">
            <div>
              <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-blue-600">
                COMPLETE LEARNING PACKAGE
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-1">
                What's Inside the Lab
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                Everything you receive to master embedded engineering from silicon circuits to cloud dashboards.
              </p>
            </div>

            {/* Switcher Tab: Hardware vs. Curriculum */}
            <div className="grid grid-cols-2 sm:flex w-full sm:w-auto rounded-xl border border-slate-200 bg-white p-1 shadow-sm shrink-0">
              <button
                type="button"
                onClick={() => setEcosystemTab("hardware")}
                className={`rounded-lg py-2 px-2.5 sm:px-4 text-center text-xs font-semibold transition ${
                  ecosystemTab === "hardware"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Hardware Bench ({ECOSYSTEM_HARDWARE_ITEMS.length} Modules)
              </button>
              <button
                type="button"
                onClick={() => setEcosystemTab("curriculum")}
                className={`rounded-lg py-2 px-2.5 sm:px-4 text-center text-xs font-semibold transition ${
                  ecosystemTab === "curriculum"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Curriculum ({ECOSYSTEM_CURRICULUM_TRACKS.length} Tracks)
              </button>
            </div>
          </div>

          {/* Tab 1: Hardware Bench */}
          {ecosystemTab === "hardware" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {ECOSYSTEM_HARDWARE_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-sm p-5 sm:p-6 shadow-sm hover:shadow-md transition"
                >
                  <span className="inline-block rounded-full bg-blue-50 px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-blue-700 mb-3">
                    {item.tag}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            /* Tab 2: Curriculum Tracks */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {ECOSYSTEM_CURRICULUM_TRACKS.map((track, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-sm p-5 sm:p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-mono font-bold text-xs">
                      {track.track}
                    </div>
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                      {track.tech}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">{track.title}</h3>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{track.desc}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* =========================================================================
            SECTION 2: MASTERCLASSES DIRECTORY (3 IN ONE ROW GRID)
            - Dynamically fetched from backend (/api/iot/courses)
            - Standalone admin lectures seamlessly merged
            - Clicking any card opens in another browser tab
            ========================================================================= */}
        <section
          ref={masterclassesSectionRef}
          className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-200/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-blue-600">
                INDUSTRY-GRADE CURRICULUM
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-1">
                Explore Hands-On Masterclasses
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                Select any masterclass to open the full lab workspace in a new tab with 1080p HD video player, hardware bench, and interactive code.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {isKitUnlocked ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-800">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Kit Verified // All Masterclasses Unlocked
                </span>
              ) : (
                <button
                  onClick={() => {
                    if (!studentToken) {
                      openAuth("login");
                    } else {
                      setShowKitModal(true);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold text-amber-900 hover:bg-amber-100 transition shadow-sm"
                >
                  <Lock className="h-3.5 w-3.5 text-amber-600" />
                  <span>Enter Kit Code to Unlock</span>
                </button>
              )}
            </div>
          </div>

          {/* Track Filter Tabs */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
            {(["All", "Beginner", "Intermediate", "Advanced"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition shrink-0 ${
                  activeFilter === filter
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                }`}
              >
                {filter === "All" ? `All Masterclasses (${allMasterclasses.length})` : `${filter} Level`}
              </button>
            ))}
          </div>

          {/* 3 IN ONE ROW GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {displayedMasterclasses.map((mc) => (
              <a
                key={mc.id}
                href={`/iot-labs/${mc.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-sm p-5 shadow-sm hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Card Header Tags */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                      {mc.code}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {mc.level}
                      </span>
                    </div>
                  </div>

                  {/* Thumbnail Container with Zoom Effect */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-900 mb-4">
                    <img
                      src={mc.thumbnail_url}
                      alt={mc.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-black/20 to-transparent" />
                    
                    {/* Play Badge */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-blue-600 shadow-md group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Play className="h-4 w-4 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Track Badge */}
                    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px] font-medium">
                      <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-medium truncate max-w-[150px]">
                        {mc.badge}
                      </span>
                      <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] flex items-center gap-1 font-mono">
                        <Clock className="h-3 w-3" />
                        {mc.duration?.split("•")[1]?.trim() || mc.duration}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition line-clamp-2">
                    {mc.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {mc.description}
                  </p>

                  {/* Hardware Tags */}
                  {mc.hardware_used && mc.hardware_used.length > 0 && (
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {mc.hardware_used.slice(0, 2).map((chip, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 rounded-md bg-slate-50 border border-slate-200/80 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                        >
                          <Cpu className="h-2.5 w-2.5 text-blue-500" />
                          <span className="truncate max-w-[120px]">{chip}</span>
                        </span>
                      ))}
                      {mc.hardware_used.length > 2 && (
                        <span className="inline-flex items-center rounded-md bg-slate-50 border border-slate-200/80 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
                          +{mc.hardware_used.length - 2} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Footer: Lessons count & Action button */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500 font-medium">
                    <span>{mc.lessons?.length || 4} Lessons</span>
                    <span className="mx-1.5 text-slate-300">•</span>
                    <span className="text-emerald-600 font-semibold">Niva Kit Ready</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                    <span>Open Lab</span>
                    <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: HOW COLLEGES & UNIVERSITIES TRAIN STUDENTS
            ========================================================================= */}
        <section
          ref={collegeSectionRef}
          className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-200/80"
        >
          <div className="rounded-3xl border border-indigo-100 bg-gradient-to-b from-white to-indigo-50/40 p-5 sm:p-8 md:p-12 shadow-sm">
            <div className="max-w-3xl mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[10px] sm:text-[11px] font-semibold text-indigo-800">
                <GraduationCap className="h-3.5 w-3.5 text-indigo-600" />
                ACADEMIC EXCELLENCE // CAMPUS HARDWARE LABS
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-2 sm:mt-3">
                How Colleges & Universities Can Train Their Students
              </h2>
              <p className="text-xs sm:text-base text-slate-600 mt-2 leading-relaxed">
                Traditional engineering curricula often leave students in obsolete 8051 simulations. 
                FlutterFlirt IoT Labs supplies universities with <strong>turnkey physical hardware benches</strong>, 
                accredited 16-week semester lab curricula, and faculty enablement workshops.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-8 sm:mb-10">
              {UNIVERSITY_PILLARS.map((pillar, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-indigo-100/80 bg-white/90 backdrop-blur-sm p-4 sm:p-5 shadow-xs"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs">
                      0{idx + 1}
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-9">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* College CTA Action Bar */}
            <div className="rounded-2xl border border-indigo-200 bg-indigo-900 text-white p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base sm:text-xl font-bold">
                  Modernize Your Campus Engineering Lab
                </h3>
                <p className="text-xs sm:text-sm text-indigo-200 mt-1 max-w-xl">
                  Get in touch with our university partnerships director for batch discounts on hardware kits and accredited lab syllabi.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCollegeModal(true)}
                className="btn-primary w-full sm:w-auto text-xs sm:text-sm py-2.5 px-5 bg-white text-indigo-900 hover:bg-indigo-50 shrink-0 font-semibold"
              >
                Request College Lab Kit & Syllabus
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: 4 STEPS TO BUYING THE HARDWARE KIT
            ========================================================================= */}
        <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-200/80">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-blue-600">
              SIMPLE ONBOARDING
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-1">
              How to Get Started with the Lab
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              Four straightforward steps to receiving your hardware kit and unlocking full masterclass access.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PURCHASING_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-sm p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="font-mono text-xs font-bold text-blue-600 bg-blue-50 w-8 h-8 rounded-lg flex items-center justify-center mb-3">
                  {step.step}
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href={NIVA_KIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-xs sm:text-sm py-2.5 px-6 shadow-md"
            >
              <span>Order Official Hardware Kit on Niva Shop</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      {/* =========================================================================
          POPUP 1: STUDENT LOGIN / SIGN UP MODAL
          ========================================================================= */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-sm max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xl">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>

            <div className="text-center mb-5">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-2">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {authMode === "login" ? "Student Sign In" : "Create Student Account"}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {authMode === "login"
                  ? "Access your enrolled lab tracks & kit status"
                  : "Join the physical computing academy"}
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1 mb-4">
              <button
                type="button"
                onClick={() => {
                  setAuthMode("login");
                  setAuthError("");
                }}
                className={`rounded-lg py-1.5 text-xs font-semibold transition ${
                  authMode === "login" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode("register");
                  setAuthError("");
                }}
                className={`rounded-lg py-1.5 text-xs font-semibold transition ${
                  authMode === "register" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Register
              </button>
            </div>

            {authError && (
              <div className="mb-3 rounded-lg border border-red-200 bg-red-50 p-2 text-xs text-red-700 flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{authError}</span>
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
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={fillDemoAccount}
                    className="text-[10px] font-medium text-blue-600 hover:underline"
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
                    className="w-full rounded-lg border border-slate-200 px-3 pr-8 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="btn-primary w-full py-2.5 text-xs font-semibold mt-2"
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

      {/* =========================================================================
          POPUP 2: KIT ACTIVATION CODE MODAL
          ========================================================================= */}
      {showKitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-sm max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xl">
            <button
              onClick={() => setShowKitModal(false)}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>

            <div className="text-center mb-5">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 mb-2">
                <Package className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Hardware Kit Required
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Purchase the kit on Niva Shop to receive your activation key and unlock all masterclasses.
              </p>
            </div>

            {kitSuccess ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
                <CheckCircle2 className="h-6 w-6 text-emerald-600 mx-auto mb-1" />
                <h4 className="font-bold text-xs text-emerald-800">Kit Unlocked!</h4>
                <p className="text-[11px] text-emerald-700 mt-0.5">All masterclasses are now unlocked.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <a
                  href={NIVA_KIT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-900 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition"
                >
                  <span>Buy Kit on Niva Shop</span>
                  <ExternalLink className="h-3 w-3" />
                </a>

                <div className="text-center text-[11px] text-slate-400">or enter your key below</div>

                <form onSubmit={handleVerifyKitCode} className="space-y-2.5">
                  {kitError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-2 text-xs text-red-700">
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
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-center font-mono text-xs font-bold uppercase text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
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

      {/* =========================================================================
          POPUP 3: UNIVERSITY PARTNERSHIP MODAL
          ========================================================================= */}
      {showCollegeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xl">
            <button
              onClick={() => {
                setShowCollegeModal(false);
                setCollegeSubmitted(false);
              }}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>

            <div className="text-center mb-5">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-2">
                <Building2 className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Institutional Lab Partnership
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Request turnkey hardware kits & semester syllabi for your campus
              </p>
            </div>

            {collegeSubmitted ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center">
                <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                <h4 className="font-bold text-sm text-emerald-900">Request Received!</h4>
                <p className="text-xs text-emerald-700 mt-1">
                  Our academic team will contact your institution within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCollegeInquiry} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">College / University Name *</label>
                  <input
                    type="text"
                    required
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="National Institute of Technology"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Contact Person *</label>
                    <input
                      type="text"
                      required
                      value={collegeContact}
                      onChange={(e) => setCollegeContact(e.target.value)}
                      placeholder="Dr. Rajesh (HOD)"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Official Email *</label>
                    <input
                      type="email"
                      required
                      value={collegeEmail}
                      onChange={(e) => setCollegeEmail(e.target.value)}
                      placeholder="hod@univ.edu"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={collegePhone}
                      onChange={(e) => setCollegePhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Estimated Batch Size</label>
                    <select
                      value={collegeBatchSize}
                      onChange={(e) => setCollegeBatchSize(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    >
                      <option value="30-60 Students">30-60 Students (1 Section)</option>
                      <option value="60-120 Students">60-120 Students (Department)</option>
                      <option value="120+ Students">120+ Students (Campus-Wide)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={collegeSubmitting}
                  className="btn-primary w-full py-2.5 text-xs font-semibold bg-indigo-900 hover:bg-indigo-800 disabled:opacity-50 mt-2"
                >
                  {collegeSubmitting ? "Submitting..." : "Submit Partnership Request"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* In-app Toast Notification */}
      <PopupToast
        message={toastMsg?.message || null}
        type={toastMsg?.type || "info"}
        onClose={() => setToastMsg(null)}
      />

      <Footer />
    </>
  );
}
