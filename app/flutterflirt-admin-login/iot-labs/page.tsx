"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Video,
  Plus,
  Trash2,
  Edit2,
  Key,
  Copy,
  Check,
  UploadCloud,
  Film,
  Sparkles,
  Loader2,
  AlertCircle,
  Eye,
  CheckCircle2,
  X,
  RefreshCw,
  Search,
  ExternalLink,
  ShieldCheck,
  Clock,
  Play,
  BookOpen,
  Layers,
  ChevronDown,
  ChevronUp,
  Cpu,
  Award,
  FileCode,
  ListPlus
} from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { PopupModal, PopupToast } from "@/components/ui/dialog-popup";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface IoTResource {
  title: string;
  url: string;
}

interface IoTLecture {
  id: string;
  title: string;
  slug: string;
  description: string;
  s3_key: string;
  video_url: string;
  duration: string;
  sequence_order: number;
  is_preview: boolean;
  thumbnail_url: string;
  resources?: IoTResource[];
  status: "draft" | "published";
  previewStreamUrl?: string;
  created_at: string;
}

interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  description?: string;
  videoUrl?: string | null;
  s3Key?: string | null;
  isPreview?: boolean;
  isLocked?: boolean;
}

interface CourseModule {
  id: string;
  title: string;
  description?: string;
  lessons: CourseLesson[];
}

interface IoTCourse {
  id: string;
  code: string;
  title: string;
  slug: string;
  badge: string;
  level: string;
  duration: string;
  thumbnail_url: string;
  description: string;
  overview?: string;
  hardware_items: string[];
  learning_outcomes: string[];
  modules: CourseModule[];
  status: "draft" | "published";
  created_at?: string;
  updated_at?: string;
}

interface KitAccessCode {
  id: string;
  code: string;
  description: string;
  max_uses: number;
  times_used: number;
  is_active: boolean;
  created_at: string;
  redeemed_at?: string;
  redeemed_by?: string;
}

export default function AdminIoTLabsPage() {
  const router = useRouter();

  // Auth State
  const [token, setToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Active Tab: "courses" | "lectures" | "codes"
  const [activeTab, setActiveTab] = useState<"courses" | "lectures" | "codes">("courses");

  // Data States
  const [courses, setCourses] = useState<IoTCourse[]>([]);
  const [lectures, setLectures] = useState<IoTLecture[]>([]);
  const [codes, setCodes] = useState<KitAccessCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");

  // Delete confirmation modals
  const [deleteCourseModal, setDeleteCourseModal] = useState<{ id: string; title: string } | null>(null);
  const [isDeletingCourse, setIsDeletingCourse] = useState(false);
  const [deleteLectureModal, setDeleteLectureModal] = useState<{ id: string; title: string } | null>(null);
  const [isDeletingLecture, setIsDeletingLecture] = useState(false);

  // Search States
  const [courseSearch, setCourseSearch] = useState("");
  const [lectureSearch, setLectureSearch] = useState("");
  const [codeSearch, setCodeSearch] = useState("");

  // ===================== COURSES (MASTERCLASSES) STATE =====================
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<IoTCourse | null>(null);
  const [savingCourse, setSavingCourse] = useState(false);

  // Course Form fields
  const [cCode, setCCode] = useState("IOT-101");
  const [cTitle, setCTitle] = useState("");
  const [cSlug, setCSlug] = useState("");
  const [cBadge, setCBadge] = useState("Core Foundation");
  const [cLevel, setCLevel] = useState("Beginner");
  const [cDuration, setCDuration] = useState("12 hrs");
  const [cThumbnail, setCThumbnail] = useState("");
  const [cDescription, setCDescription] = useState("");
  const [cOverview, setCOverview] = useState("");
  const [cHardware, setCHardware] = useState<string[]>([]);
  const [hardwareInput, setHardwareInput] = useState("");
  const [cOutcomes, setCOutcomes] = useState<string[]>([]);
  const [outcomeInput, setOutcomeInput] = useState("");
  const [cModules, setCModules] = useState<CourseModule[]>([]);
  const [cStatus, setCStatus] = useState<"draft" | "published">("published");

  // Per-lesson video upload state within Course Modal
  const [uploadingLessonKey, setUploadingLessonKey] = useState<string | null>(null);
  const [lessonUploadProgress, setLessonUploadProgress] = useState(0);
  const [lessonUploadStatus, setLessonUploadStatus] = useState("");
  const lessonVideoInputRef = useRef<HTMLInputElement>(null);
  const targetLessonRef = useRef<{ modIdx: number; lesIdx: number } | null>(null);

  // ===================== LECTURES STATE =====================
  const [isLectureModalOpen, setIsLectureModalOpen] = useState(false);
  const [editingLecture, setEditingLecture] = useState<IoTLecture | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formS3Key, setFormS3Key] = useState("");
  const [formVideoUrl, setFormVideoUrl] = useState("");
  const [formDuration, setFormDuration] = useState("15:00");
  const [formSequence, setFormSequence] = useState(1);
  const [formIsPreview, setFormIsPreview] = useState(false);
  const [formThumbnail, setFormThumbnail] = useState("");
  const [formStatus, setFormStatus] = useState<"draft" | "published">("published");

  // Video Upload States for Lectures
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatusText, setUploadStatusText] = useState("");
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Video Preview Modal
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  // ===================== CODES STATE =====================
  const [codePrefix, setCodePrefix] = useState("NIVA");
  const [codeCount, setCodeCount] = useState(5);
  const [codeDescription, setCodeDescription] = useState("Niva IoT Kit Verified Code");
  const [codeMaxUses, setCodeMaxUses] = useState(1);
  const [isGeneratingCodes, setIsGeneratingCodes] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const showToast = (msg: string, type: "success" | "error" | "info" = "success") => {
    setToastType(type);
    setToastMessage(msg);
  };

  useEffect(() => {
    const savedToken = sessionStorage.getItem("flutterflirt_admin_token");
    if (!savedToken) {
      router.push("/flutterflirt-admin-login");
    } else {
      setToken(savedToken);
    }
    setIsInitializing(false);
  }, [router]);

  const fetchData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const coursesRes = await fetch(`${API_URL}/api/admin/iot/courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (coursesRes.ok) {
        const cData = await coursesRes.json();
        setCourses(cData.courses || []);
      }

      const lecRes = await fetch(`${API_URL}/api/admin/iot/lectures`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (lecRes.ok) {
        const lecData = await lecRes.json();
        setLectures(lecData.lectures || []);
      }

      const codeRes = await fetch(`${API_URL}/api/admin/iot/codes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (codeRes.ok) {
        const codeData = await codeRes.json();
        setCodes(codeData.codes || []);
      }
    } catch (err: any) {
      console.error("Error fetching admin data:", err);
      showToast("Failed to load IoT data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  // ===================== COURSE ACTIONS =====================
  const openCourseModal = (course?: IoTCourse) => {
    if (course) {
      setEditingCourse(course);
      setCCode(course.code || "IOT-101");
      setCTitle(course.title || "");
      setCSlug(course.slug || "");
      setCBadge(course.badge || "Core Foundation");
      setCLevel(course.level || "Beginner");
      setCDuration(course.duration || "12 hrs");
      setCThumbnail(course.thumbnail_url || "");
      setCDescription(course.description || "");
      setCOverview(course.overview || "");
      setCHardware(Array.isArray(course.hardware_items) ? [...course.hardware_items] : []);
      setCOutcomes(Array.isArray(course.learning_outcomes) ? [...course.learning_outcomes] : []);
      setCModules(Array.isArray(course.modules) ? JSON.parse(JSON.stringify(course.modules)) : []);
      setCStatus(course.status || "published");
    } else {
      setEditingCourse(null);
      setCCode(`IOT-${(courses.length + 1) * 100 + 1}`);
      setCTitle("");
      setCSlug("");
      setCBadge("");
      setCLevel("Beginner");
      setCDuration("");
      setCThumbnail("");
      setCDescription("");
      setCOverview("");
      setCHardware([]);
      setCOutcomes([]);
      setCModules([]);
      setCStatus("published");
    }
    setHardwareInput("");
    setOutcomeInput("");
    setUploadingLessonKey(null);
    setIsCourseModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setCTitle(val);
    if (!editingCourse) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setCSlug(generatedSlug);
    }
  };

  const handleAddHardware = () => {
    if (!hardwareInput.trim()) return;
    if (!cHardware.includes(hardwareInput.trim())) {
      setCHardware([...cHardware, hardwareInput.trim()]);
    }
    setHardwareInput("");
  };

  const handleRemoveHardware = (item: string) => {
    setCHardware(cHardware.filter((h) => h !== item));
  };

  const handleAddOutcome = () => {
    if (!outcomeInput.trim()) return;
    if (!cOutcomes.includes(outcomeInput.trim())) {
      setCOutcomes([...cOutcomes, outcomeInput.trim()]);
    }
    setOutcomeInput("");
  };

  const handleRemoveOutcome = (item: string) => {
    setCOutcomes(cOutcomes.filter((o) => o !== item));
  };

  // Module Management
  const handleAddModule = () => {
    const newModIdx = cModules.length + 1;
    const newModule: CourseModule = {
      id: `mod-${Date.now()}`,
      title: `Module ${newModIdx}: New Section`,
      description: "Module overview and topics covered",
      lessons: [
        {
          id: `les-${Date.now()}-1`,
          title: `${newModIdx}.1 Getting Started`,
          duration: "12:00",
          description: "Initial lesson in this module",
          videoUrl: "",
          isPreview: false,
          isLocked: false
        }
      ]
    };
    setCModules([...cModules, newModule]);
  };

  const handleRemoveModule = (modIdx: number) => {
    if (cModules.length <= 1) {
      showToast("A course must have at least 1 module.", "info");
      return;
    }
    setCModules(cModules.filter((_, idx) => idx !== modIdx));
  };

  const handleUpdateModuleTitle = (modIdx: number, title: string) => {
    const updated = [...cModules];
    updated[modIdx].title = title;
    setCModules(updated);
  };

  const handleAddLesson = (modIdx: number) => {
    const updated = [...cModules];
    const mod = updated[modIdx];
    const lessonNum = `${modIdx + 1}.${mod.lessons.length + 1}`;
    mod.lessons.push({
      id: `les-${Date.now()}-${mod.lessons.length + 1}`,
      title: `${lessonNum} Lesson Title`,
      duration: "15:00",
      description: "Lesson details and implementation guide",
      videoUrl: "",
      isPreview: false,
      isLocked: false
    });
    setCModules(updated);
  };

  const handleRemoveLesson = (modIdx: number, lesIdx: number) => {
    const updated = [...cModules];
    if (updated[modIdx].lessons.length <= 1) {
      showToast("A module must have at least 1 lesson.", "info");
      return;
    }
    updated[modIdx].lessons = updated[modIdx].lessons.filter((_, idx) => idx !== lesIdx);
    setCModules(updated);
  };

  const handleUpdateLesson = (
    modIdx: number,
    lesIdx: number,
    field: keyof CourseLesson,
    val: any
  ) => {
    const updated = [...cModules];
    (updated[modIdx].lessons[lesIdx] as any)[field] = val;
    setCModules(updated);
  };

  const triggerLessonVideoUpload = (modIdx: number, lesIdx: number) => {
    targetLessonRef.current = { modIdx, lesIdx };
    lessonVideoInputRef.current?.click();
  };

  const handleLessonFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !targetLessonRef.current || !token) return;

    const { modIdx, lesIdx } = targetLessonRef.current;
    const lessonKey = `${modIdx}-${lesIdx}`;
    setUploadingLessonKey(lessonKey);
    setLessonUploadProgress(10);
    setLessonUploadStatus("Requesting S3 upload ticket...");

    try {
      const presignRes = await fetch(`${API_URL}/api/admin/iot/presigned-upload-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type || "video/mp4",
          fileSize: file.size,
          masterclassSlug: cSlug || editingCourse?.slug || cCode || "general"
        })
      });

      if (!presignRes.ok) throw new Error("Could not acquire S3 upload signature.");

      const { presignedUrl, s3Key, directUrl } = await presignRes.json();
      setLessonUploadProgress(35);
      setLessonUploadStatus("Uploading directly to AWS S3 bucket...");

      const xhr = new XMLHttpRequest();
      const uploadPromise = new Promise<void>((resolve, reject) => {
        xhr.upload.addEventListener("progress", (evt) => {
          if (evt.lengthComputable) {
            const pct = Math.round(35 + (evt.loaded / evt.total) * 60);
            setLessonUploadProgress(pct);
          }
        });
        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) resolve();
          else reject(new Error(`S3 responded with status ${xhr.status}`));
        });
        xhr.addEventListener("error", () => reject(new Error("Network error uploading to S3")));
        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type || "video/mp4");
        xhr.send(file);
      });

      try {
        await uploadPromise;
        setLessonUploadProgress(100);
        setLessonUploadStatus("Uploaded!");
        handleUpdateLesson(modIdx, lesIdx, "videoUrl", directUrl);
        handleUpdateLesson(modIdx, lesIdx, "s3Key", s3Key);
        showToast("Video uploaded and attached to lesson!");
      } catch (s3Err) {
        setLessonUploadStatus("Attempting server fallback upload...");
        const formData = new FormData();
        formData.append("video", file);
        const fbRes = await fetch(`${API_URL}/api/admin/iot/upload-video`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData
        });
        if (!fbRes.ok) throw new Error("Video upload failed.");
        const fbData = await fbRes.json();
        setLessonUploadProgress(100);
        setLessonUploadStatus("Uploaded via server!");
        handleUpdateLesson(modIdx, lesIdx, "videoUrl", fbData.directUrl);
        handleUpdateLesson(modIdx, lesIdx, "s3Key", fbData.s3Key);
        showToast("Video uploaded and attached!");
      }
    } catch (err: any) {
      showToast("Lesson video upload error: " + err.message, "error");
    } finally {
      setUploadingLessonKey(null);
      if (lessonVideoInputRef.current) {
        lessonVideoInputRef.current.value = "";
      }
    }
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (!cTitle.trim() || cTitle.trim().length < 3 || cTitle.trim().length > 100) {
      showToast("Course Title must be between 3 and 100 characters.", "error");
      return;
    }

    if (!cCode.trim() || !/^[A-Z0-9-]+$/.test(cCode.trim())) {
      showToast("Course Code must contain only uppercase letters, numbers, and hyphens.", "error");
      return;
    }

    if (!cSlug.trim() || !/^[a-z0-9-]+$/.test(cSlug.trim())) {
      showToast("Slug must contain only lowercase letters, numbers, and hyphens.", "error");
      return;
    }

    if (cThumbnail.trim() && !/^https?:\/\/.+\..+/.test(cThumbnail.trim())) {
      showToast("Please provide a valid URL for the thumbnail image.", "error");
      return;
    }

    if (cModules.length === 0) {
      showToast("A course must have at least one module.", "error");
      return;
    }

    setSavingCourse(true);
    const payload = {
      code: cCode.trim(),
      title: cTitle.trim(),
      slug: cSlug.trim(),
      badge: cBadge.trim(),
      level: cLevel,
      duration: cDuration.trim(),
      thumbnail_url: cThumbnail.trim(),
      description: cDescription.trim(),
      overview: cOverview.trim(),
      hardware_items: cHardware,
      learning_outcomes: cOutcomes,
      modules: cModules,
      status: cStatus
    };

    try {
      const url = editingCourse
        ? `${API_URL}/api/admin/iot/courses/${editingCourse.id}`
        : `${API_URL}/api/admin/iot/courses`;
      const method = editingCourse ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save course.");

      showToast(editingCourse ? "Course updated successfully!" : "New course published!");
      setIsCourseModalOpen(false);
      fetchData();
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setSavingCourse(false);
    }
  };

  const handleDeleteCourse = (id: string, title: string) => {
    setDeleteCourseModal({ id, title });
  };

  const confirmDeleteCourse = async () => {
    if (!deleteCourseModal || !token) return;
    setIsDeletingCourse(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/iot/courses/${deleteCourseModal.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showToast("Course deleted successfully.");
        fetchData();
      } else {
        const data = await res.json();
        showToast(data.message || "Failed to delete course.", "error");
      }
    } catch (err: any) {
      showToast("Network error: " + err.message, "error");
    } finally {
      setIsDeletingCourse(false);
      setDeleteCourseModal(null);
    }
  };

  // ===================== LECTURES ACTIONS =====================
  const openLectureModal = (lecture?: IoTLecture) => {
    if (lecture) {
      setEditingLecture(lecture);
      setFormTitle(lecture.title);
      setFormDescription(lecture.description || "");
      setFormS3Key(lecture.s3_key || "");
      setFormVideoUrl(lecture.video_url || "");
      setFormDuration(lecture.duration || "15:00");
      setFormSequence(lecture.sequence_order || 1);
      setFormIsPreview(lecture.is_preview || false);
      setFormThumbnail(lecture.thumbnail_url || "");
      setFormStatus(lecture.status || "published");
    } else {
      setEditingLecture(null);
      setFormTitle("");
      setFormDescription("");
      setFormS3Key("");
      setFormVideoUrl("");
      setFormDuration("");
      setFormSequence(lectures.length + 1);
      setFormIsPreview(false);
      setFormThumbnail("");
      setFormStatus("published");
    }
    setSelectedVideoFile(null);
    setUploadProgress(0);
    setUploadStatusText("");
    setIsLectureModalOpen(true);
  };

  const handleVideoUpload = async (file: File) => {
    if (!token) return;
    setIsUploadingVideo(true);
    setUploadProgress(10);
    setUploadStatusText("Requesting AWS S3 upload ticket...");

    try {
      const presignRes = await fetch(`${API_URL}/api/admin/iot/presigned-upload-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type || "video/mp4",
          fileSize: file.size,
          masterclassSlug: cSlug || editingCourse?.slug || cCode || "general"
        })
      });

      if (!presignRes.ok) throw new Error("Could not retrieve AWS S3 upload authorization");

      const { presignedUrl, s3Key, directUrl } = await presignRes.json();
      setUploadProgress(30);
      setUploadStatusText("Uploading video binary to AWS S3 bucket...");

      const xhr = new XMLHttpRequest();
      const uploadPromise = new Promise<void>((resolve, reject) => {
        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round(30 + (event.loaded / event.total) * 65);
            setUploadProgress(percentComplete);
          }
        });
        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) resolve();
          else reject(new Error(`S3 error: ${xhr.status}`));
        });
        xhr.addEventListener("error", () => reject(new Error("Network error during S3 upload.")));
        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type || "video/mp4");
        xhr.send(file);
      });

      try {
        await uploadPromise;
        setUploadProgress(100);
        setUploadStatusText("Upload complete!");
        setFormS3Key(s3Key);
        setFormVideoUrl(directUrl);
        showToast("Video uploaded to S3 successfully!");
      } catch (s3Error) {
        setUploadStatusText("Falling back to backend video route...");
        const formData = new FormData();
        formData.append("video", file);
        const fallbackRes = await fetch(`${API_URL}/api/admin/iot/upload-video`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData
        });
        if (!fallbackRes.ok) throw new Error("Fallback failed.");
        const fallbackData = await fallbackRes.json();
        setUploadProgress(100);
        setUploadStatusText("Uploaded via fallback endpoint!");
        setFormS3Key(fallbackData.s3Key);
        setFormVideoUrl(fallbackData.directUrl);
        showToast("Video uploaded successfully!");
      }
    } catch (err: any) {
      showToast("Upload failed: " + err.message);
    } finally {
      setIsUploadingVideo(false);
    }
  };

  const handleSaveLecture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    if (!formTitle.trim() || formTitle.trim().length < 3 || formTitle.trim().length > 150) {
      showToast("Lecture Title must be between 3 and 150 characters.", "error");
      return;
    }

    if (formDescription.trim() && formDescription.trim().length > 500) {
      showToast("Description cannot exceed 500 characters.", "error");
      return;
    }

    if (!formDuration.trim() || !/^\d{1,2}:\d{2}(:\d{2})?$/.test(formDuration.trim())) {
      showToast("Please provide a valid duration format (MM:SS or HH:MM:SS).", "error");
      return;
    }

    if (formVideoUrl.trim() && !/^https?:\/\/.+\..+/.test(formVideoUrl.trim())) {
      showToast("Please provide a valid URL for the video.", "error");
      return;
    }

    if (formThumbnail.trim() && !/^https?:\/\/.+\..+/.test(formThumbnail.trim())) {
      showToast("Please provide a valid URL for the thumbnail image.", "error");
      return;
    }

    const payload = {
      title: formTitle.trim(),
      description: formDescription.trim(),
      s3_key: formS3Key.trim(),
      video_url: formVideoUrl.trim(),
      duration: formDuration.trim(),
      sequence_order: Number(formSequence) || 1,
      is_preview: formIsPreview,
      thumbnail_url: formThumbnail.trim(),
      status: formStatus
    };

    try {
      const url = editingLecture
        ? `${API_URL}/api/admin/iot/lectures/${editingLecture.id}`
        : `${API_URL}/api/admin/iot/lectures`;
      const method = editingLecture ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to save lecture");
      showToast(editingLecture ? "Lecture updated!" : "Lecture published!");
      setIsLectureModalOpen(false);
      fetchData();
    } catch (err: any) {
      showToast(err.message);
    }
  };

  const handleDeleteLecture = (id: string, title: string) => {
    setDeleteLectureModal({ id, title });
  };

  const confirmDeleteLecture = async () => {
    if (!deleteLectureModal || !token) return;
    setIsDeletingLecture(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/iot/lectures/${deleteLectureModal.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete lecture");
      showToast("Lecture deleted successfully");
      fetchData();
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setIsDeletingLecture(false);
      setDeleteLectureModal(null);
    }
  };

  // ===================== CODES ACTIONS =====================
  const handleGenerateCodes = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setIsGeneratingCodes(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/iot/codes/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          prefix: codePrefix.trim().toUpperCase() || "NIVA",
          count: codeCount,
          description: codeDescription.trim(),
          maxUses: codeMaxUses
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to generate codes");
      showToast(`Generated ${data.codes?.length || codeCount} activation codes!`);
      fetchData();
    } catch (err: any) {
      showToast(err.message);
    } finally {
      setIsGeneratingCodes(false);
    }
  };

  const handleToggleCode = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/iot/codes/${id}/toggle`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showToast("Code status updated");
        fetchData();
      }
    } catch (err: any) {
      showToast(err.message);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (isInitializing || (loading && courses.length === 0 && activeTab === "courses")) {
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
              <div className="bg-white rounded-3xl p-6 shadow-xs min-h-[500px] animate-pulse space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 mb-6 border-b border-[#cbdff8] pb-4">
                  <div className="h-10 w-full sm:w-64 bg-gray-100 rounded-xl"></div>
                  <div className="h-10 w-full sm:w-32 bg-gray-100 rounded-xl sm:ml-auto"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-80 bg-[#f8fbff] rounded-3xl"></div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
    c.code.toLowerCase().includes(courseSearch.toLowerCase()) ||
    c.description?.toLowerCase().includes(courseSearch.toLowerCase())
  );

  const filteredLectures = lectures.filter((l) =>
    l.title.toLowerCase().includes(lectureSearch.toLowerCase()) ||
    l.description?.toLowerCase().includes(lectureSearch.toLowerCase())
  );

  const filteredCodes = codes.filter((c) =>
    c.code.toLowerCase().includes(codeSearch.toLowerCase()) ||
    c.description?.toLowerCase().includes(codeSearch.toLowerCase()) ||
    c.redeemed_by?.toLowerCase().includes(codeSearch.toLowerCase())
  );

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-[#edf5ff] text-[#142845] font-['Manrope',sans-serif]">
        <AppSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <header className="sticky top-0 z-30 flex items-center justify-between bg-white/75 backdrop-blur-md px-6 py-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-[#edf5ff] text-[#2563eb] shadow-xs">
                  <Video className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-[#142845] tracking-tight">
                    IoT Labs Curriculum & Video Management
                  </h1>
                  <p className="text-xs text-[#617b9b]">
                    Manage courses, hardware kits, video stream sources, and modules
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={fetchData}
                disabled={loading}
                className="flex items-center gap-2 rounded-2xl bg-white hover:bg-[#f0f6ff] px-3.5 py-2 text-xs font-semibold text-[#2563eb] shadow-xs transition"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </button>


            </div>
          </header>

          {/* Custom Toast */}
          <PopupToast
            message={toastMessage}
            type={toastType}
            onClose={() => setToastMessage(null)}
          />

          {/* Delete Course Confirmation Modal */}
          <PopupModal
            isOpen={!!deleteCourseModal}
            onClose={() => setDeleteCourseModal(null)}
            onConfirm={confirmDeleteCourse}
            title="Delete Course"
            description={`Are you sure you want to permanently delete the course "${deleteCourseModal?.title}"? All modules and lessons will be removed.`}
            type="danger"
            confirmText="Delete Course"
            loading={isDeletingCourse}
          />

          {/* Delete Lecture Confirmation Modal */}
          <PopupModal
            isOpen={!!deleteLectureModal}
            onClose={() => setDeleteLectureModal(null)}
            onConfirm={confirmDeleteLecture}
            title="Delete Lecture"
            description={`Are you sure you want to permanently delete "${deleteLectureModal?.title}"?`}
            type="danger"
            confirmText="Delete Lecture"
            loading={isDeletingLecture}
          />

          {/* Hidden File Input for Lesson Video Upload */}
          <input
            type="file"
            ref={lessonVideoInputRef}
            onChange={handleLessonFileChange}
            accept="video/*"
            className="hidden"
          />

          {/* Main Content */}
          <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-[#142845] flex items-center gap-2">
                  IoT Labs Curriculum & Masterclasses
                </h2>
                <p className="mt-1 text-xs text-[#617b9b]">
                  Upload masterclass video lectures, configure hardware requirements, and manage Niva hardware kit activation codes.
                </p>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-1.5 rounded-2xl border border-[#cbe0fb] bg-white p-1.5 shadow-sm">
                <button
                  onClick={() => setActiveTab("courses")}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                    activeTab === "courses"
                      ? "bg-[#2563eb] text-white shadow-sm"
                      : "text-[#475569] hover:bg-[#eff6ff] hover:text-[#1e3a60]"
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Courses & Masterclasses ({courses.length})
                </button>
                <button
                  onClick={() => setActiveTab("lectures")}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                    activeTab === "lectures"
                      ? "bg-[#2563eb] text-white shadow-sm"
                      : "text-[#475569] hover:bg-[#eff6ff] hover:text-[#1e3a60]"
                  }`}
                >
                  <Film className="h-3.5 w-3.5" />
                  Standalone Lectures ({lectures.length})
                </button>
                <button
                  onClick={() => setActiveTab("codes")}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                    activeTab === "codes"
                      ? "bg-[#2563eb] text-white shadow-sm"
                      : "text-[#475569] hover:bg-[#eff6ff] hover:text-[#1e3a60]"
                  }`}
                >
                  <Key className="h-3.5 w-3.5" />
                  Kit Codes ({codes.length})
                </button>
              </div>
            </div>

            {/* ===================== TAB 1: COURSES (MASTERCLASSES) ===================== */}
            {activeTab === "courses" && (
              <div className="space-y-6">
                {/* Search & Add Course Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#cbe0fb] shadow-sm">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-[#617b9b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search courses, codes, topics..."
                      value={courseSearch}
                      onChange={(e) => setCourseSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-xs bg-[#f8fbff] border border-[#cbdff8] rounded-xl text-[#142845] placeholder-[#9aaebd] focus:outline-none focus:border-[#2563eb] transition"
                    />
                  </div>

                  <button
                    onClick={() => openCourseModal()}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition"
                  >
                    <Plus className="h-4 w-4" />
                    Add Masterclass Course
                  </button>
                </div>

                {loading ? (
                  <div className="flex h-64 items-center justify-center rounded-2xl border border-[#cbe0fb] bg-white shadow-sm">
                    <Loader2 className="h-8 w-8 animate-spin text-[#2563eb]" />
                  </div>
                ) : filteredCourses.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#cbe0fb] bg-white p-12 text-center">
                    <BookOpen className="h-12 w-12 text-[#94a3b8] mb-3" />
                    <h3 className="text-base font-bold text-[#142845]">No courses found</h3>
                    <p className="mt-1 text-xs text-[#617b9b] max-w-sm">
                      Create your first comprehensive IoT masterclass course with curriculum modules and video lessons.
                    </p>
                    <button
                      onClick={() => openCourseModal()}
                      className="mt-4 flex items-center gap-2 rounded-xl bg-[#2563eb] px-4 py-2 text-xs font-bold text-white hover:bg-[#1d4ed8]"
                    >
                      <Plus className="h-4 w-4" />
                      Create Course
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => {
                      const totalLessons = Array.isArray(course.modules)
                        ? course.modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0)
                        : 4;

                      return (
                        <div
                          key={course.id}
                          className="group relative flex flex-col rounded-2xl border border-[#cbe0fb] bg-white overflow-hidden hover:border-[#2563eb] transition shadow-sm hover:shadow-md"
                        >
                          <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                            <img
                              src={course.thumbnail_url}
                              alt={course.title}
                              className="h-full w-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                            <div className="absolute top-3 left-3 flex items-center gap-2">
                              <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-white/95 text-[#2563eb] shadow-xs">
                                {course.code}
                              </span>
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/60 text-white backdrop-blur-xs">
                                {course.badge}
                              </span>
                            </div>

                            <div className="absolute top-3 right-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  course.status === "published"
                                    ? "bg-emerald-500 text-white"
                                    : "bg-amber-500 text-white"
                                }`}
                              >
                                {course.status}
                              </span>
                            </div>

                            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                              <span className="flex items-center gap-1 font-semibold">
                                <Clock className="w-3.5 h-3.5 text-cyan-300" />
                                {course.duration}
                              </span>
                              <span className="flex items-center gap-1 font-semibold">
                                <Layers className="w-3.5 h-3.5 text-purple-300" />
                                {course.modules?.length || 4} Modules ({totalLessons} Lessons)
                              </span>
                            </div>
                          </div>

                          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                            <div>
                              <h3 className="text-base font-bold text-[#142845] group-hover:text-[#2563eb] transition line-clamp-1">
                                {course.title}
                              </h3>
                              <p className="text-xs text-[#617b9b] mt-1.5 line-clamp-2 leading-relaxed">
                                {course.description}
                              </p>
                            </div>

                            {Array.isArray(course.hardware_items) && course.hardware_items.length > 0 && (
                              <div>
                                <p className="text-[10px] uppercase font-bold text-[#617b9b] tracking-wider mb-1.5 flex items-center gap-1">
                                  <Cpu className="w-3 h-3 text-[#2563eb]" /> Hardware Included:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {(course.hardware_items || []).slice(0, 3).map((item, i) => (
                                    <span
                                      key={i}
                                      className="text-[10px] px-2 py-0.5 rounded-md bg-[#eff4fb] text-[#1e3a60] border border-[#cbe0fb]"
                                    >
                                      {item}
                                    </span>
                                  ))}
                                  {course.hardware_items.length > 3 && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#f1f5f9] text-[#64748b]">
                                      +{course.hardware_items.length - 3} more
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}

                            <div className="pt-3 border-t border-[#e2edf9] flex items-center justify-between gap-2">
                              <a
                                href={`/iot-labs/${course.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs font-bold text-[#2563eb] hover:underline"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                Public Syllabus
                              </a>

                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => openCourseModal(course)}
                                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#eff4fb] hover:bg-[#dbe8fc] text-[#2563eb] text-xs font-semibold border border-[#cbe0fb] transition"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteCourse(course.id, course.title)}
                                  className="p-1.5 rounded-lg text-[#94a3b8] hover:text-[#dc2626] hover:bg-[#fef2f2] transition"
                                  title="Delete Course"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ===================== TAB 2: STANDALONE LECTURES ===================== */}
            {activeTab === "lectures" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#cbe0fb] shadow-sm">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-[#617b9b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search standalone lectures..."
                      value={lectureSearch}
                      onChange={(e) => setLectureSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-xs bg-[#f8fbff] border border-[#cbdff8] rounded-xl text-[#142845] placeholder-[#9aaebd] focus:outline-none focus:border-[#2563eb] transition"
                    />
                  </div>

                  <button
                    onClick={() => openLectureModal()}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-[#1d4ed8] transition"
                  >
                    <Plus className="h-4 w-4" />
                    Upload & Add Lecture
                  </button>
                </div>

                {loading ? (
                  <div className="flex h-64 items-center justify-center rounded-2xl border border-[#cbe0fb] bg-white shadow-sm">
                    <Loader2 className="h-8 w-8 animate-spin text-[#2563eb]" />
                  </div>
                ) : filteredLectures.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#cbe0fb] bg-white p-12 text-center">
                    <Film className="h-12 w-12 text-[#94a3b8] mb-3" />
                    <h3 className="text-base font-bold text-[#142845]">No standalone lectures uploaded</h3>
                    <p className="mt-1 text-xs text-[#617b9b] max-w-sm">
                      Upload individual standalone videos to AWS S3.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLectures.map((lec) => (
                      <div
                        key={lec.id}
                        className="group flex flex-col rounded-2xl border border-[#cbe0fb] bg-white overflow-hidden hover:border-[#2563eb] transition shadow-sm"
                      >
                        <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                          <img
                            src={lec.thumbnail_url || ""}
                            alt={lec.title}
                            className="h-full w-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                          <div className="absolute top-3 left-3 flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-[#2563eb]">
                              #{lec.sequence_order}
                            </span>
                            {lec.is_preview && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-white">
                                Free Preview
                              </span>
                            )}
                          </div>

                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                            <span className="flex items-center gap-1 font-semibold">
                              <Clock className="w-3.5 h-3.5 text-cyan-300" />
                              {lec.duration}
                            </span>
                            {lec.video_url && (
                              <button
                                onClick={() => {
                                  setPreviewVideoUrl(lec.video_url);
                                  setPreviewTitle(lec.title);
                                }}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#2563eb] text-white text-[11px] font-bold hover:bg-[#1d4ed8]"
                              >
                                <Play className="w-3 h-3 fill-white" />
                                Preview
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div>
                            <h3 className="text-sm font-bold text-[#142845] group-hover:text-[#2563eb] transition line-clamp-1">
                              {lec.title}
                            </h3>
                            <p className="text-xs text-[#617b9b] mt-1 line-clamp-2 leading-relaxed">
                              {lec.description}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-[#e2edf9] flex items-center justify-between">
                            <span className="text-[11px] text-[#617b9b] truncate max-w-[160px]">
                              S3: {lec.s3_key || "Direct URL"}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openLectureModal(lec)}
                                className="p-1.5 rounded-lg text-[#617b9b] hover:text-[#2563eb] hover:bg-[#eff4fb] transition"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteLecture(lec.id, lec.title)}
                                className="p-1.5 rounded-lg text-[#94a3b8] hover:text-[#dc2626] hover:bg-[#fef2f2] transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ===================== TAB 3: KIT ACCESS CODES ===================== */}
            {activeTab === "codes" && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white border border-[#cbe0fb] shadow-sm">
                  <h3 className="text-sm font-bold text-[#142845] flex items-center gap-2 mb-4">
                    <Key className="w-4 h-4 text-[#2563eb]" />
                    Batch Generate Hardware Kit Activation Codes
                  </h3>
                  <form onSubmit={handleGenerateCodes} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#142845] mb-1">Prefix</label>
                      <input
                        type="text"
                        value={codePrefix}
                        onChange={(e) => setCodePrefix(e.target.value)}
                        placeholder="NIVA"
                        className="w-full px-3 py-2 text-xs bg-[#f8fbff] border border-[#cbdff8] rounded-xl text-[#142845] uppercase focus:outline-none focus:border-[#2563eb]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#142845] mb-1">Number of Codes</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={codeCount}
                        onChange={(e) => setCodeCount(parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 text-xs bg-[#f8fbff] border border-[#cbdff8] rounded-xl text-[#142845] focus:outline-none focus:border-[#2563eb]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#142845] mb-1">Max Uses Per Code</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={codeMaxUses}
                        onChange={(e) => setCodeMaxUses(parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 text-xs bg-[#f8fbff] border border-[#cbdff8] rounded-xl text-[#142845] focus:outline-none focus:border-[#2563eb]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#142845] mb-1">Description / Batch Tag</label>
                      <input
                        type="text"
                        value={codeDescription}
                        onChange={(e) => setCodeDescription(e.target.value)}
                        placeholder="Batch name"
                        className="w-full px-3 py-2 text-xs bg-[#f8fbff] border border-[#cbdff8] rounded-xl text-[#142845] focus:outline-none focus:border-[#2563eb]"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        type="submit"
                        disabled={isGeneratingCodes}
                        className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold transition shadow-sm"
                      >
                        {isGeneratingCodes ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Plus className="w-3.5 h-3.5" />
                        )}
                        Generate Codes
                      </button>
                    </div>
                  </form>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#cbe0fb] shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative w-full sm:w-80">
                      <Search className="w-4 h-4 text-[#617b9b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search codes, redeemed by..."
                        value={codeSearch}
                        onChange={(e) => setCodeSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-xs bg-[#f8fbff] border border-[#cbdff8] rounded-xl text-[#142845] placeholder-[#9aaebd] focus:outline-none focus:border-[#2563eb]"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-[#142845]">
                      <thead className="bg-[#f1f6fd] text-[#526987] border-b border-[#cbdff8]">
                        <tr>
                          <th className="p-3">Activation Code</th>
                          <th className="p-3">Batch Description</th>
                          <th className="p-3">Usage</th>
                          <th className="p-3">Redeemed By</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e2edf9]">
                        {filteredCodes.map((c) => (
                          <tr key={c.id} className="hover:bg-[#f8fbff]">
                            <td className="p-3 font-mono font-bold text-[#142845] flex items-center gap-2">
                              {c.code}
                              <button
                                onClick={() => copyToClipboard(c.code)}
                                className="text-[#617b9b] hover:text-[#2563eb]"
                                title="Copy"
                              >
                                {copiedCode === c.code ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </td>
                            <td className="p-3 text-[#617b9b]">{c.description}</td>
                            <td className="p-3 font-semibold">
                              {c.times_used} / {c.max_uses}
                            </td>
                            <td className="p-3 text-[#617b9b]">{c.redeemed_by || "—"}</td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  c.is_active
                                    ? "bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]"
                                    : "bg-[#f1f5f9] text-[#64748b]"
                                }`}
                              >
                                {c.is_active ? "Active" : "Disabled"}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => handleToggleCode(c.id)}
                                className="px-2.5 py-1 rounded-lg bg-[#eff4fb] hover:bg-[#dbe8fc] text-[#1e3a60] font-semibold text-[11px] border border-[#cbe0fb]"
                              >
                                {c.is_active ? "Disable" : "Enable"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* ===================== COURSE & CURRICULUM MODAL ===================== */}
        {isCourseModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="w-full max-w-4xl bg-white border border-[#cbe0fb] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto my-auto text-[#142845]">
              <div className="flex items-center justify-between border-b border-[#e2edf9] pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#eff4fb] text-[#2563eb] border border-[#cbe0fb]">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#142845]">
                      {editingCourse ? "Edit Masterclass Course & Syllabus" : "Create New Masterclass Course"}
                    </h3>
                    <p className="text-xs text-[#617b9b]">
                      Manage metadata, hardware list, outcomes, and curriculum video lessons.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCourseModalOpen(false)}
                  className="p-1 rounded-lg text-[#617b9b] hover:text-[#142845]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCourse} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#142845] mb-1">
                      Course Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={cCode}
                      onChange={(e) => setCCode(e.target.value)}
                      placeholder="e.g. IOT-101"
                      className="w-full px-3 py-2 text-xs bg-[#f8fbff] border border-[#cbdff8] rounded-xl text-[#142845] font-mono uppercase focus:outline-none focus:border-[#2563eb]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#142845] mb-1">
                      Course Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={cTitle}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. Embedded C & ESP32 Mastery"
                      className="w-full px-3 py-2 text-xs bg-[#f8fbff] border border-[#cbdff8] rounded-xl text-[#142845] focus:outline-none focus:border-[#2563eb]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#142845] mb-1">
                      Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={cSlug}
                      onChange={(e) => setCSlug(e.target.value)}
                      placeholder="embedded-c-esp32-mastery"
                      className="w-full px-3 py-2 text-xs bg-[#f8fbff] border border-[#cbdff8] rounded-xl text-[#142845] font-mono focus:outline-none focus:border-[#2563eb]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#142845] mb-1">
                      Badge
                    </label>
                    <input
                      type="text"
                      value={cBadge}
                      onChange={(e) => setCBadge(e.target.value)}
                      placeholder="Core Foundation"
                      className="w-full px-3 py-2 text-xs bg-[#f8fbff] border border-[#cbdff8] rounded-xl text-[#142845] focus:outline-none focus:border-[#2563eb]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#142845] mb-1">
                      Level
                    </label>
                    <select
                      value={cLevel}
                      onChange={(e) => setCLevel(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#f8fbff] border border-[#cbdff8] rounded-xl text-[#142845] focus:outline-none focus:border-[#2563eb]"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Specialist">Specialist</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#142845] mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={cDuration}
                      onChange={(e) => setCDuration(e.target.value)}
                      placeholder="12 hrs"
                      className="w-full px-3 py-2 text-xs bg-[#f8fbff] border border-[#cbdff8] rounded-xl text-[#142845] focus:outline-none focus:border-[#2563eb]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#142845] mb-1">
                      Thumbnail Image URL
                    </label>
                    <input
                      type="url"
                      value={cThumbnail}
                      onChange={(e) => setCThumbnail(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 text-xs bg-[#f8fbff] border border-[#cbdff8] rounded-xl text-[#142845] focus:outline-none focus:border-[#2563eb]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#142845] mb-1">
                      Publish Status
                    </label>
                    <select
                      value={cStatus}
                      onChange={(e) => setCStatus(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-[#f8fbff] border border-[#cbdff8] rounded-xl text-[#142845] focus:outline-none focus:border-[#2563eb]"
                    >
                      <option value="published">Published (Live)</option>
                      <option value="draft">Draft (Hidden)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#142845] mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={cDescription}
                    onChange={(e) => setCDescription(e.target.value)}
                    placeholder="Concise overview of what this course delivers..."
                    className="w-full px-3 py-2 text-xs bg-[#f8fbff] border border-[#cbdff8] rounded-xl text-[#142845] focus:outline-none focus:border-[#2563eb]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#142845] mb-1">
                    Detailed Overview & Syllabus Summary
                  </label>
                  <textarea
                    rows={3}
                    value={cOverview}
                    onChange={(e) => setCOverview(e.target.value)}
                    placeholder="Comprehensive explanation of projects and skills..."
                    className="w-full px-3 py-2 text-xs bg-[#f8fbff] border border-[#cbdff8] rounded-xl text-[#142845] focus:outline-none focus:border-[#2563eb]"
                  />
                </div>

                {/* Hardware Chips Tagging */}
                <div className="p-4 rounded-2xl bg-[#f8fbff] border border-[#dce7f5] space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#142845] flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#2563eb]" />
                      Hardware Kits & Components Included
                    </label>
                    <span className="text-[11px] text-[#617b9b]">
                      {cHardware.length} items
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={hardwareInput}
                      onChange={(e) => setHardwareInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddHardware();
                        }
                      }}
                      placeholder="Type component (e.g. ESP32 DevKit V1) and press Enter"
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#cbdff8] rounded-xl text-[#142845] focus:outline-none focus:border-[#2563eb]"
                    />
                    <button
                      type="button"
                      onClick={handleAddHardware}
                      className="px-3 py-1.5 text-xs font-bold bg-[#2563eb] text-white rounded-xl hover:bg-[#1d4ed8]"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(cHardware || []).map((hw, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#cbe0fb] text-xs text-[#1e3a60] shadow-xs"
                      >
                        {hw}
                        <button
                          type="button"
                          onClick={() => handleRemoveHardware(hw)}
                          className="text-[#94a3b8] hover:text-[#dc2626]"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Learning Outcomes Tagging */}
                <div className="p-4 rounded-2xl bg-[#f8fbff] border border-[#dce7f5] space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#142845] flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-[#2563eb]" />
                      Learning Outcomes & Skills Acquired
                    </label>
                    <span className="text-[11px] text-[#617b9b]">
                      {cOutcomes.length} outcomes
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={outcomeInput}
                      onChange={(e) => setOutcomeInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddOutcome();
                        }
                      }}
                      placeholder="Type outcome (e.g. Master MQTT over TLS) and press Enter"
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#cbdff8] rounded-xl text-[#142845] focus:outline-none focus:border-[#2563eb]"
                    />
                    <button
                      type="button"
                      onClick={handleAddOutcome}
                      className="px-3 py-1.5 text-xs font-bold bg-[#2563eb] text-white rounded-xl hover:bg-[#1d4ed8]"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(cOutcomes || []).map((out, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#cbe0fb] text-xs text-[#2563eb] shadow-xs"
                      >
                        {out}
                        <button
                          type="button"
                          onClick={() => handleRemoveOutcome(out)}
                          className="text-[#94a3b8] hover:text-[#dc2626]"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* CURRICULUM MODULES & VIDEO LESSONS TREE */}
                <div className="p-5 rounded-2xl bg-[#f8fbff] border border-[#cbe0fb] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#142845] flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#2563eb]" />
                        Curriculum Modules & Video Content
                      </h4>
                      <p className="text-[11px] text-[#617b9b]">
                        Add modules, individual lessons, and upload videos directly to AWS S3.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddModule}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#eff4fb] text-[#2563eb] border border-[#cbe0fb] hover:bg-[#dbe8fc] text-xs font-bold transition shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Module
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(cModules || []).map((mod, modIdx) => (
                      <div
                        key={mod.id || modIdx}
                        className="p-4 rounded-xl bg-white border border-[#dce7f5] shadow-sm space-y-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 flex-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#eff4fb] text-[#2563eb] border border-[#cbe0fb]">
                              M{modIdx + 1}
                            </span>
                            <input
                              type="text"
                              value={mod.title}
                              onChange={(e) => handleUpdateModuleTitle(modIdx, e.target.value)}
                              className="flex-1 px-2.5 py-1 text-xs font-bold bg-[#f8fbff] border border-[#cbdff8] rounded-lg text-[#142845] focus:outline-none focus:border-[#2563eb]"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleAddLesson(modIdx)}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#eff4fb] hover:bg-[#dbe8fc] text-[#2563eb] text-[11px] font-semibold border border-[#cbe0fb]"
                            >
                              <Plus className="w-3 h-3" />
                              Add Lesson
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveModule(modIdx)}
                              className="p-1 rounded-lg text-[#94a3b8] hover:text-[#dc2626]"
                              title="Delete Module"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="pl-3 space-y-2 border-l-2 border-[#cbdff8]">
                          {(mod.lessons || []).map((les, lesIdx) => {
                            const lessonKey = `${modIdx}-${lesIdx}`;
                            const isUploadingThis = uploadingLessonKey === lessonKey;

                            return (
                              <div
                                key={les.id || lesIdx}
                                className="p-3 rounded-lg bg-[#f8fbff] border border-[#dce7f5] space-y-2"
                              >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                  <div className="flex items-center gap-2 flex-1">
                                    <Film className="w-3.5 h-3.5 text-[#617b9b] shrink-0" />
                                    <input
                                      type="text"
                                      value={les.title}
                                      onChange={(e) =>
                                        handleUpdateLesson(modIdx, lesIdx, "title", e.target.value)
                                      }
                                      placeholder="Lesson title"
                                      className="flex-1 px-2 py-1 text-xs bg-white border border-[#cbdff8] rounded text-[#142845] focus:outline-none focus:border-[#2563eb]"
                                    />
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      value={les.duration}
                                      onChange={(e) =>
                                        handleUpdateLesson(modIdx, lesIdx, "duration", e.target.value)
                                      }
                                      placeholder="15:00"
                                      className="w-16 px-2 py-1 text-xs text-center bg-white border border-[#cbdff8] rounded text-[#142845] focus:outline-none"
                                    />

                                    <label className="flex items-center gap-1 text-[11px] text-[#475569] cursor-pointer font-medium">
                                      <input
                                        type="checkbox"
                                        checked={les.isPreview || false}
                                        onChange={(e) =>
                                          handleUpdateLesson(modIdx, lesIdx, "isPreview", e.target.checked)
                                        }
                                        className="rounded border-[#cbdff8] text-[#2563eb] focus:ring-0"
                                      />
                                      Free Preview
                                    </label>

                                    <button
                                      type="button"
                                      onClick={() => handleRemoveLesson(modIdx, lesIdx)}
                                      className="p-1 text-[#94a3b8] hover:text-[#dc2626]"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                                  <div className="relative flex-1 w-full">
                                    <input
                                      type="text"
                                      value={les.videoUrl || ""}
                                      onChange={(e) =>
                                        handleUpdateLesson(modIdx, lesIdx, "videoUrl", e.target.value)
                                      }
                                      placeholder="Paste S3 video URL or CloudFront link..."
                                      className="w-full px-2.5 py-1 text-[11px] bg-white border border-[#cbdff8] rounded text-[#142845] placeholder-[#9aaebd] focus:outline-none focus:border-[#2563eb]"
                                    />
                                  </div>

                                  <button
                                    type="button"
                                    disabled={isUploadingThis}
                                    onClick={() => triggerLessonVideoUpload(modIdx, lesIdx)}
                                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-1 rounded text-[11px] font-bold bg-[#2563eb] hover:bg-[#1d4ed8] text-white transition shrink-0 shadow-xs"
                                  >
                                    {isUploadingThis ? (
                                      <>
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                        {lessonUploadProgress}%
                                      </>
                                    ) : (
                                      <>
                                        <UploadCloud className="w-3 h-3" />
                                        Upload Video to S3
                                      </>
                                    )}
                                  </button>

                                  {les.videoUrl && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setPreviewVideoUrl(les.videoUrl || "");
                                        setPreviewTitle(les.title);
                                      }}
                                      className="p-1 rounded text-[#2563eb] hover:text-[#1d4ed8]"
                                      title="Preview Video"
                                    >
                                      <Play className="w-3.5 h-3.5 fill-[#2563eb]" />
                                    </button>
                                  )}
                                </div>

                                {isUploadingThis && (
                                  <div className="text-[10px] text-[#2563eb] flex items-center gap-1 font-semibold">
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                    {lessonUploadStatus}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e2edf9]">
                  <button
                    type="button"
                    onClick={() => setIsCourseModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0] transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingCourse}
                    className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white transition shadow-sm"
                  >
                    {savingCourse ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Saving Course...
                      </>
                    ) : editingCourse ? (
                      "Update Course & Curriculum"
                    ) : (
                      "Publish New Masterclass"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ===================== STANDALONE LECTURE MODAL ===================== */}
        {isLectureModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="w-full max-w-xl bg-white border border-[#cbe0fb] rounded-3xl shadow-2xl p-6 space-y-5 my-auto text-[#142845]">
              <div className="flex items-center justify-between border-b border-[#e2edf9] pb-3">
                <h3 className="text-base font-bold text-[#142845]">
                  {editingLecture ? "Edit Lecture" : "Upload Standalone Lecture"}
                </h3>
                <button
                  onClick={() => setIsLectureModalOpen(false)}
                  className="text-[#617b9b] hover:text-[#142845]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveLecture} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#142845] mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#f8fbff] border border-[#cbdff8] rounded-xl text-[#142845] focus:outline-none focus:border-[#2563eb]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#142845] mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#f8fbff] border border-[#cbdff8] rounded-xl text-[#142845] focus:outline-none focus:border-[#2563eb]"
                  />
                </div>

                <div className="p-4 rounded-xl border border-dashed border-[#cbdff8] bg-[#f8fbff] text-center space-y-2">
                  <UploadCloud className="w-8 h-8 text-[#2563eb] mx-auto" />
                  <p className="text-xs font-semibold text-[#142845]">Upload Video File to AWS S3</p>
                  <input
                    type="file"
                    ref={videoInputRef}
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleVideoUpload(file);
                    }}
                    className="hidden"
                  />
                  <button
                    type="button"
                    disabled={isUploadingVideo}
                    onClick={() => videoInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#eff6ff] text-xs font-bold text-[#2563eb] border border-[#cbe0fb] shadow-xs"
                  >
                    {isUploadingVideo ? "Uploading..." : "Select MP4 / Video File"}
                  </button>
                  {isUploadingVideo && (
                    <div className="space-y-1">
                      <div className="w-full bg-[#e2edf9] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#2563eb] h-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-[#2563eb] font-semibold">{uploadStatusText}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#617b9b] mb-1 font-semibold">Video Duration</label>
                    <input
                      type="text"
                      value={formDuration}
                      onChange={(e) => setFormDuration(e.target.value)}
                      placeholder="15:00"
                      className="w-full px-3 py-2 text-xs bg-[#f8fbff] border border-[#cbdff8] rounded-xl text-[#142845] focus:outline-none focus:border-[#2563eb]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#617b9b] mb-1 font-semibold">Sequence Order</label>
                    <input
                      type="number"
                      value={formSequence}
                      onChange={(e) => setFormSequence(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 text-xs bg-[#f8fbff] border border-[#cbdff8] rounded-xl text-[#142845] focus:outline-none focus:border-[#2563eb]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#617b9b] mb-1 font-semibold">
                    Video Direct URL (Auto-filled by S3 upload or paste manually)
                  </label>
                  <input
                    type="text"
                    value={formVideoUrl}
                    onChange={(e) => setFormVideoUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#f8fbff] border border-[#cbdff8] rounded-xl text-[#142845] focus:outline-none focus:border-[#2563eb]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#e2edf9]">
                  <button
                    type="button"
                    onClick={() => setIsLectureModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#f1f5f9] text-[#475569]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-xs"
                  >
                    Save Lecture
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ===================== VIDEO STREAM PREVIEW MODAL ===================== */}
        {previewVideoUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-3xl bg-white border border-[#cbe0fb] rounded-2xl p-5 space-y-3 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#142845] truncate">{previewTitle || "Video Preview"}</h3>
                <button
                  onClick={() => setPreviewVideoUrl(null)}
                  className="p-1 rounded text-[#617b9b] hover:text-[#142845]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="relative aspect-video w-full bg-black rounded-xl overflow-hidden shadow-inner">
                <video
                  src={previewVideoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </SidebarProvider>
  );
}
