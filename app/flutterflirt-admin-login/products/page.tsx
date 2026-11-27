"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { PopupToast } from "@/components/ui/dialog-popup";
import { VisualSeedModal } from "@/components/Admin/VisualSeedModal";
import { SeedDataViewerModal } from "@/components/Admin/SeedDataViewerModal";
import { CronHistoryModal } from "@/components/Admin/CronHistoryModal";
import {
  Boxes,
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Layers,
  Sparkles,
  Database,
  BarChart3,
  Bot,
  Zap,
  ShieldCheck,
  X,
  Loader2,
  Copy,
  TrendingUp,
  Tag,
  LayoutGrid,
  List,
  Server,
  Globe2,
  FileCode,
  Clock,
  Play,
  UploadCloud,
  Upload,
  Check,
  AlertCircle,
  ArrowRight,
  Eye,
  History,
  FileText,
  Wand2
} from "lucide-react";

interface SaaSProduct {
  id: string;
  category: "erp" | "crm" | "custom";
  title: string;
  badge: string;
  tagline: string;
  description: string;
  demoUrl: string;
  demoDbUrl?: string;
  accentColor: string;
  status: "active" | "draft" | "archived";
  keyFeatures: (string | { title?: string; desc?: string })[];
  metrics: { label: string; value: string }[];
  previewTags: string[];
  sortOrder?: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Helper: Smart Parser to extract Schema DDL and Seed Data from initDb.js or .sql file
function parseInitDbScript(rawContent: string): { schemaSql: string; seedSql: string; totalTables: number; totalInserts: number } {
  let schemaParts: string[] = [];
  let seedParts: string[] = [];

  // 1. Extract raw SQL blocks from JavaScript files (e.g. client.query(`...`))
  // Handles template literals `...`, single-quoted, and double-quoted strings inside query(...)
  const queryBlocks: string[] = [];
  const jsQueryRegex = /(?:client|pool|db)\.query\s*\(\s*`([\s\S]*?)`\s*(?:,\s*\[[\s\S]*?\])?\s*\)/gi;
  let match;
  while ((match = jsQueryRegex.exec(rawContent)) !== null) {
    if (match[1] && match[1].trim()) {
      queryBlocks.push(match[1].trim());
    }
  }

  // If no JS query calls found, treat the entire content as raw SQL
  const candidates = queryBlocks.length > 0 ? queryBlocks : [rawContent];

  for (const block of candidates) {
    // Split block into individual SQL statements separated by semicolon
    // We avoid splitting inside quoted strings by simple regex cleaning
    const statements = block
      .split(/;\s*(?=(?:[^']*'[^']*')*[^']*$)/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const stmt of statements) {
      const upper = stmt.toUpperCase();

      // Check if statement is a Schema DDL statement
      if (
        upper.startsWith("CREATE TABLE") ||
        upper.startsWith("CREATE EXTENSION") ||
        upper.startsWith("CREATE TYPE") ||
        upper.startsWith("CREATE INDEX") ||
        upper.startsWith("CREATE SEQUENCE") ||
        upper.startsWith("ALTER TABLE") ||
        upper.startsWith("DROP TABLE")
      ) {
        schemaParts.push(stmt.endsWith(";") ? stmt : stmt + ";");
      }
      // Check if statement is a Seed Record DML statement
      else if (upper.startsWith("INSERT INTO")) {
        seedParts.push(stmt.endsWith(";") ? stmt : stmt + ";");
      }
    }
  }

  const schemaSql = schemaParts.join("\n\n");
  const seedSql = seedParts.join("\n\n");

  const totalTables = (schemaSql.match(/CREATE\s+TABLE/gi) || []).length;
  const totalInserts = (seedSql.match(/INSERT\s+INTO/gi) || []).length;

  return { schemaSql, seedSql, totalTables, totalInserts };
}

export default function ProductManagementPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [products, setProducts] = useState<SaaSProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  // Live Database Connectivity Cache for Products: { [productId]: { connected: boolean; error?: string } }
  const [dbStatuses, setDbStatuses] = useState<Record<string, { connected: boolean; error?: string }>>({});
  const [checkingDbId, setCheckingDbId] = useState<string | null>(null);

  // Form Live DB Testing State
  const [testingFormDb, setTestingFormDb] = useState(false);
  const [formDbTestResult, setFormDbTestResult] = useState<{ connected: boolean; message: string } | null>(null);
  const [initDbExtractMsg, setInitDbExtractMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<1 | 2 | 3>(1);
  const [editingProduct, setEditingProduct] = useState<SaaSProduct | null>(null);
  const modalBodyRef = useRef<HTMLDivElement>(null);

  // Automatically scroll modal body to top when step changes or modal opens
  useEffect(() => {
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTop = 0;
    }
  }, [modalStep, isModalOpen]);

  // Form State
  const [formData, setFormData] = useState<Partial<SaaSProduct>>({
    category: "erp",
    status: "active",
    accentColor: "#2563eb",
    keyFeatures: [],
    metrics: [{ label: "", value: "" }],
    previewTags: []
  });

  // Viewer Modal State (Only table rows and X button)
  const [viewerModal, setViewerModal] = useState<{
    isOpen: boolean;
    title: string;
    content: string;
  }>({
    isOpen: false,
    title: "",
    content: ""
  });

  // Step 2 Dedicated DB & DDL / Seed State in unified Product Modal
  const [modalSchemaCode, setModalSchemaCode] = useState<string>("");
  const [modalSeedCode, setModalSeedCode] = useState<string>("");
  const [modalCronTime, setModalCronTime] = useState<string>("03:00");
  const [modalCronEnabled, setModalCronEnabled] = useState<boolean>(true);

  const [featureInput, setFeatureInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  // Seed Manager Modal State
  const [isSeedModalOpen, setIsSeedModalOpen] = useState(false);
  const [seedProduct, setSeedProduct] = useState<SaaSProduct | null>(null);
  const [seedConfig, setSeedConfig] = useState<{
    cronTime: string;
    isEnabled: boolean;
    fileName: string | null;
    originalName?: string;
    hasContent: boolean;
    fileContent?: string;
    lastRunAt?: string;
    lastStatus?: string;
    lastLog?: string;
  }>({
    cronTime: "03:00",
    isEnabled: true,
    fileName: null,
    hasContent: false,
    fileContent: "",
  });
  const [seedFile, setSeedFile] = useState<File | null>(null);
  const [seedCodeInput, setSeedCodeInput] = useState("");
  const [isUploadingSeed, setIsUploadingSeed] = useState(false);
  const [isTriggeringSeed, setIsTriggeringSeed] = useState(false);
  const [seedLogs, setSeedLogs] = useState<any[]>([]);

  // Cron History Tracking Modal State
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [historyProduct, setHistoryProduct] = useState<SaaSProduct | null>(null);
  const [historyConfig, setHistoryConfig] = useState<{
    cronTime: string;
    isEnabled: boolean;
    lastRunAt?: string;
    lastStatus?: string;
  } | null>(null);
  const [historyLogs, setHistoryLogs] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [isTriggeringHistorySeed, setIsTriggeringHistorySeed] = useState(false);

  const loadProducts = async (authToken: string) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/admin/products`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);

        // Trigger background live DB status check
        fetch(`${API_URL}/api/admin/products/db-status`, {
          headers: { Authorization: `Bearer ${authToken}` }
        })
          .then((r) => (r.ok ? r.json() : null))
          .then((resData) => {
            if (resData?.statuses) {
              setDbStatuses(resData.statuses);
            }
          })
          .catch(() => { });
      } else {
        setToastMessage("Failed to load products from server");
        setToastType("error");
      }
    } catch (err) {
      console.error("Failed to load products:", err);
      setToastMessage("Could not connect to backend server");
      setToastType("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedToken = sessionStorage.getItem("flutterflirt_admin_token");
    if (!savedToken) {
      router.push("/flutterflirt-admin-login");
    } else {
      setToken(savedToken);
      loadProducts(savedToken);
    }
    setIsInitializing(false);
  }, [router]);

  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.tagline.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || prod.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || prod.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      category: "erp",
      title: "",
      badge: "Cloud ERP",
      tagline: "",
      description: "",
      demoUrl: "",
      demoDbUrl: "",
      accentColor: "#2563eb",
      status: "active",
      keyFeatures: [],
      metrics: [
        { label: "Deployment", value: "Fast" },
        { label: "ROI", value: "3x" }
      ],
      previewTags: []
    });
    setFeatureInput("");
    setTagInput("");
    setFormDbTestResult(null);
    setModalSchemaCode("");
    setModalSeedCode("");
    setModalCronTime("03:00");
    setModalCronEnabled(true);
    setModalStep(1);
    setIsModalOpen(true);
  };

  const handleTestDatabaseUrl = async (urlToTest?: string, targetProductId?: string) => {
    const targetUrl = urlToTest !== undefined ? urlToTest : formData.demoDbUrl;
    const prodId = targetProductId || editingProduct?.id;

    if (!targetUrl || !targetUrl.trim()) {
      setFormDbTestResult({ connected: false, message: "Please enter a Database URL first." });
      return;
    }

    try {
      setTestingFormDb(true);
      setFormDbTestResult(null);
      const res = await fetch(`${API_URL}/api/admin/products/test-db-connection`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          demoDbUrl: targetUrl.trim(),
          productId: prodId || undefined
        })
      });
      const data = await res.json();
      if (data.connected) {
        setFormDbTestResult({
          connected: true,
          message: data.message || `Successfully connected (${data.latencyMs}ms)`
        });
        if (prodId) {
          setDbStatuses((prev) => ({
            ...prev,
            [prodId]: { connected: true }
          }));
          // Sync with local product state so seed modal immediately detects the saved URL
          setProducts((prev) =>
            prev.map((p) => (p.id === prodId ? { ...p, demoDbUrl: targetUrl.trim() } : p))
          );
          if (editingProduct?.id === prodId) {
            setEditingProduct((prev) => (prev ? { ...prev, demoDbUrl: targetUrl.trim() } : null));
          }
          if (seedProduct?.id === prodId) {
            setSeedProduct((prev) => (prev ? { ...prev, demoDbUrl: targetUrl.trim() } : null));
          }
        }
      } else {
        setFormDbTestResult({
          connected: false,
          message: data.message || data.error || "Could not reach database."
        });
        if (prodId) {
          setDbStatuses((prev) => ({
            ...prev,
            [prodId]: { connected: false, error: data.message }
          }));
        }
      }
    } catch (e: any) {
      setFormDbTestResult({
        connected: false,
        message: `Failed to test connection: ${e.message}`
      });
    } finally {
      setTestingFormDb(false);
    }
  };

  const handleOpenEdit = async (prod: SaaSProduct) => {
    setEditingProduct(prod);
    setFormData({ ...prod });
    setFeatureInput("");
    setTagInput("");
    setFormDbTestResult(null);
    setModalStep(1);
    setIsModalOpen(true);

    // Preload schema and seed data for step 2 & 3
    if (token) {
      try {
        const res = await fetch(`${API_URL}/api/admin/products/${prod.id}/seed-config`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.config) {
            setModalSchemaCode(data.config.schemaContent || "");
            setModalSeedCode(data.config.fileContent || "");
            setModalCronTime(data.config.cronTime || "03:00");
            setModalCronEnabled(data.config.isEnabled ?? true);
          }
        }
      } catch (_) { }
    }
  };

  const handleOpenSeedModal = async (prod: SaaSProduct) => {
    setSeedProduct(prod);
    setSeedFile(null);
    setSeedCodeInput("");
    setIsSeedModalOpen(true);

    try {
      const res = await fetch(`${API_URL}/api/admin/products/${prod.id}/seed-config`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setSeedConfig(data.config || {
          cronTime: "03:00",
          isEnabled: true,
          fileName: null,
          hasContent: false,
        });
        setSeedLogs(data.logs || []);
      }
    } catch (err) {
      console.error("Error fetching seed config:", err);
    }
  };

  const handleOpenCronHistory = async (prod: SaaSProduct) => {
    setHistoryProduct(prod);
    setIsHistoryModalOpen(true);
    setLoadingHistory(true);

    try {
      const res = await fetch(`${API_URL}/api/admin/products/${prod.id}/seed-config`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setHistoryConfig(data.config || null);
        setHistoryLogs(data.logs || []);
      }
    } catch (err) {
      console.error("Error fetching cron history:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleTriggerHistorySeed = async () => {
    if (!historyProduct || !token) return;
    try {
      setIsTriggeringHistorySeed(true);
      const res = await fetch(`${API_URL}/api/admin/products/${historyProduct.id}/seed-trigger`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setToastMessage(`Seed executed successfully in ${data.durationMs}ms!`);
        setToastType("success");
        // Reload logs
        handleOpenCronHistory(historyProduct);
      } else {
        setToastMessage(data.message || "Seed execution failed");
        setToastType("error");
      }
    } catch (err: any) {
      console.error("Trigger seed error:", err);
      setToastMessage(err.message || "Network error while triggering seed");
      setToastType("error");
    } finally {
      setIsTriggeringHistorySeed(false);
    }
  };

  const handleSaveSeedConfigFromModal = async (
    file: File | null,
    rawCode: string,
    cronTime: string,
    isEnabled: boolean,
    schemaFile?: File | null,
    schemaCode?: string
  ): Promise<boolean> => {
    if (!seedProduct || !token) return false;
    try {
      setIsUploadingSeed(true);
      const fd = new FormData();
      fd.append("cronTime", cronTime || "00:00");
      fd.append("isEnabled", String(isEnabled));
      if (file) {
        fd.append("seedFile", file);
      } else if (rawCode.trim()) {
        fd.append("seedCode", rawCode.trim());
      }
      if (schemaFile) {
        fd.append("schemaFile", schemaFile);
      } else if (schemaCode && schemaCode.trim()) {
        fd.append("schemaCode", schemaCode.trim());
      }

      const res = await fetch(`${API_URL}/api/admin/products/${seedProduct.id}/seed-config`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: fd
      });

      const data = await res.json();
      if (res.ok) {
        setToastMessage("Data package and midnight auto-seed schedule saved successfully!");
        setToastType("success");
        handleOpenSeedModal(seedProduct);
        return true;
      } else {
        setToastMessage(data.message || "Failed to save seed configuration");
        setToastType("error");
        return false;
      }
    } catch (err: any) {
      console.error("Save seed config error:", err);
      setToastMessage(err.message || "Network error while saving seed config");
      setToastType("error");
      return false;
    } finally {
      setIsUploadingSeed(false);
    }
  };

  const handleSaveSeedConfig = async () => {
    return handleSaveSeedConfigFromModal(seedFile, seedCodeInput, seedConfig.cronTime, seedConfig.isEnabled);
  };

  const handleTriggerSeedNow = async () => {
    if (!seedProduct || !token) return;
    if (!confirm(`Run seed file now for "${seedProduct.title}"? This will refresh demo tables according to your script while strictly preserving active demo users.`)) {
      return;
    }

    try {
      setIsTriggeringSeed(true);
      const res = await fetch(`${API_URL}/api/admin/products/${seedProduct.id}/seed-trigger`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (res.ok) {
        setToastMessage(`Seed executed successfully in ${data.durationMs}ms!`);
        setToastType("success");
        handleOpenSeedModal(seedProduct);
      } else {
        setToastMessage(data.message || "Seed execution failed");
        setToastType("error");
      }
    } catch (err: any) {
      console.error("Trigger seed error:", err);
      setToastMessage(err.message || "Network error while triggering seed");
      setToastType("error");
    } finally {
      setIsTriggeringSeed(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
        setToastMessage("Product removed successfully");
        setToastType("success");
      } else {
        const data = await res.json();
        setToastMessage(data.message || "Failed to delete product");
        setToastType("error");
      }
    } catch (err) {
      console.error(err);
      setToastMessage("Network error deleting product");
      setToastType("error");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.tagline) {
      setToastMessage("Please fill in the product title and tagline.");
      setToastType("error");
      return;
    }

    try {
      setSaving(true);
      const isEdit = Boolean(editingProduct?.id);
      const url = isEdit
        ? `${API_URL}/api/admin/products/${editingProduct!.id}`
        : `${API_URL}/api/admin/products`;
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category || "erp",
          badge: formData.badge || "Cloud Solution",
          tagline: formData.tagline,
          description: formData.description || "",
          demoUrl: formData.demoUrl || "",
          demoDbUrl: formData.demoDbUrl || "",
          accentColor: formData.accentColor || "#2563eb",
          status: formData.status || "active",
          keyFeatures: formData.keyFeatures || [],
          metrics: (formData.metrics || []).filter(m => m.label && m.value),
          previewTags: formData.previewTags || []
        })
      });

      const data = await res.json();
      if (!res.ok) {
        const errorMsg = data.errors && Array.isArray(data.errors)
          ? data.errors.map((e: any) => `${e.path?.join('.') || 'field'}: ${e.message}`).join(', ')
          : (data.message || "Failed to save product");
        throw new Error(errorMsg);
      }

      const savedProd = data.product;

      // Also persist Step 2 & 3 schema/seed config if provided
      if (savedProd?.id && (modalSchemaCode.trim() || modalSeedCode.trim() || modalCronTime)) {
        try {
          const fd = new FormData();
          fd.append("cronTime", modalCronTime || "03:00");
          fd.append("isEnabled", String(modalCronEnabled));
          if (modalSeedCode.trim()) fd.append("seedCode", modalSeedCode.trim());
          if (modalSchemaCode.trim()) fd.append("schemaCode", modalSchemaCode.trim());

          await fetch(`${API_URL}/api/admin/products/${savedProd.id}/seed-config`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: fd
          });
        } catch (_) { }
      }

      if (isEdit) {
        setProducts(products.map((p) => (p.id === data.product.id ? data.product : p)));
        setToastMessage("Product updated successfully!");
      } else {
        setProducts([data.product, ...products]);
        setToastMessage("New SaaS / ERP Product added live!");
      }

      setIsModalOpen(false);
      setToastType("success");
    } catch (err: any) {
      console.error(err);
      setToastMessage(err.message || "Error saving product");
      setToastType("error");
    } finally {
      setSaving(false);
    }
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        keyFeatures: [...(formData.keyFeatures || []), featureInput.trim()]
      });
      setFeatureInput("");
    }
  };

  const removeFeature = (idx: number) => {
    setFormData({
      ...formData,
      keyFeatures: (formData.keyFeatures || []).filter((_, i) => i !== idx)
    });
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setFormData({
        ...formData,
        previewTags: [...(formData.previewTags || []), tagInput.trim()]
      });
      setTagInput("");
    }
  };

  const removeTag = (idx: number) => {
    setFormData({
      ...formData,
      previewTags: (formData.previewTags || []).filter((_, i) => i !== idx)
    });
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 min-h-screen bg-[#edf5ff] pb-20 w-full">
        {toastMessage && (
          <PopupToast
            message={toastMessage}
            type={toastType}
            onClose={() => setToastMessage(null)}
          />
        )}

        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 w-full pt-4 md:pt-6">
          {/* Compact Page Header with Integrated Search & Action */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-[#cbdff8]/70 pb-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-[#cbe0fb] shadow-xs text-[#2563eb] shrink-0">
                <Boxes className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10223d]">
                    Product Management
                  </h1>
                  <span className="rounded-full bg-[#dbe8fc] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#1e40af]">
                    Catalog ({products.length})
                  </span>
                </div>
                <p className="text-xs text-[#617b9d]">
                  Manage cloud ERPs, CRMs, interactive demo URLs, and features.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
              {/* Compact Search Bar placed in top header */}
              <div className="relative w-full sm:w-64 md:w-72">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8babc6]" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8.5 pr-4 py-2 text-xs bg-white border border-[#cbe0fb] rounded-xl text-[#112239] shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]"
                />
              </div>

              <button
                onClick={handleOpenAdd}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563eb] px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-[#1d4ed8] shrink-0 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Product</span>
              </button>
            </div>
          </div>

          {/* Clean Filter Controls Bar */}
          <div className="flex items-center justify-between gap-3 flex-wrap rounded-2xl border border-[#cbe0fb] bg-white p-3.5 shadow-[0_6px_24px_rgba(20,50,90,0.03)] mb-6">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#617b9d] ml-1">
                Filter:
              </span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-xs px-3 py-1.5 bg-[#f8fbff] border border-[#cbe0fb] rounded-xl font-medium text-[#1e3b60] focus:outline-none cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="erp">ERP Systems</option>
                <option value="crm">Intelligent CRM</option>
                <option value="custom">Custom Platforms</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs px-3 py-1.5 bg-[#f8fbff] border border-[#cbe0fb] rounded-xl font-medium text-[#1e3b60] focus:outline-none cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#617b9d]">
                Showing {filteredProducts.length} of {products.length}
              </span>

              {/* View Toggle */}
              <div className="flex items-center bg-[#edf5ff] p-1 rounded-xl border border-[#cbe0fb]">
                <button
                  type="button"
                  onClick={() => setViewMode("card")}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === "card"
                    ? "bg-white text-[#2563eb] shadow-xs"
                    : "text-[#64748b] hover:text-[#0f172a]"
                    }`}
                  title="Card View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === "list"
                    ? "bg-white text-[#2563eb] shadow-xs"
                    : "text-[#64748b] hover:text-[#0f172a]"
                    }`}
                  title="Table / List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Display: Card or List View */}
          {loading ? (
            <div className="flex flex-col items-center justify-center p-16 rounded-[24px] border border-[#cbe0fb] bg-white shadow-xs">
              <Loader2 className="h-8 w-8 animate-spin text-[#2563eb]" />
              <p className="mt-3 text-xs font-semibold text-[#617b9d]">Loading products from server...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-16 text-center rounded-[24px] border border-[#cbe0fb] bg-white shadow-xs">
              <Boxes className="mx-auto h-10 w-10 text-[#9bb5d6]" />
              <p className="mt-3 text-base font-bold text-[#142845]">No products found</p>
              <p className="mt-1 text-xs text-[#617b9d]">Try adjusting your search query or category filters.</p>
            </div>
          ) : viewMode === "card" ? (
            <div className="pb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="group relative flex flex-col justify-between rounded-[24px] border border-[#cbe0fb] bg-white p-6 shadow-[0_12px_40px_rgba(20,50,90,0.05)] transition-all hover:border-[#2563eb]/40 h-[360px]"
                  >
                    <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200 space-y-3.5">
                      {/* Top row: Badge Heading & Status */}
                      <div className="flex items-center justify-between">
                        <span
                          className="text-[11px] font-bold uppercase tracking-wider"
                          style={{ color: prod.accentColor || "#2563eb" }}
                        >
                          {prod.badge}
                        </span>

                        {/* Small Status Indicator Dot with Tooltip */}
                        <div className="flex items-center gap-1.5" title={`Status: ${prod.status}`}>
                          <span
                            className={`h-2 w-2 rounded-full ${prod.status === "active"
                              ? "bg-emerald-500 ring-2 ring-emerald-100"
                              : "bg-slate-300"
                              }`}
                          />
                        </div>
                      </div>

                      {/* Title & Tagline */}
                      <div>
                        <h3 className="text-base font-bold text-[#142845] group-hover:text-[#2563eb] transition leading-snug">
                          {prod.title}
                        </h3>
                        <p className="text-xs text-[#617b9d] mt-1 line-clamp-2 leading-relaxed">{prod.tagline}</p>
                      </div>

                      {/* Tags (Horizontal scrolling or clean wrapped tags) */}
                      {prod.previewTags && prod.previewTags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 py-0.5">
                          {prod.previewTags.map((tag, i) => (
                            <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#f0f5fc] text-[#526987] whitespace-nowrap leading-tight">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Metrics preview */}
                      {prod.metrics && prod.metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#e5effb]">
                          {prod.metrics.map((m, i) => (
                            <div key={i} className="bg-[#f8fbff] p-2 rounded-xl text-center border border-[#e5effb]">
                              <span className="block text-[10px] text-[#8babc6] uppercase font-semibold">{m.label}</span>
                              <span className="font-bold text-xs text-[#142845]">{m.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions & Status (Fixed bottom footer) */}
                    <div className="mt-4 pt-3.5 border-t border-[#e5effb] flex items-center justify-between shrink-0">
                      {/* Left: Connectivity Icons (title on hover) */}
                      <div className="flex items-center gap-1.5">
                        {/* Demo URL Icon */}
                        {prod.demoUrl ? (
                          <a
                            href={prod.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-[#cbe0fb] bg-white text-[#2563eb] hover:bg-[#edf5ff] transition shadow-xs"
                            title="Preview"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span
                            className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-300 opacity-50 cursor-not-allowed"
                            title="Preview (Not Connected)"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </span>
                        )}

                        {/* Demo DB Icon with Live Health Color */}
                        {prod.demoDbUrl ? (
                          (() => {
                            const status = dbStatuses[prod.id];
                            const isConnected = status?.connected === true;
                            const isFailed = status?.connected === false;
                            const isPending = status === undefined;

                            return (
                              <button
                                type="button"
                                onClick={() => {
                                  // Click to re-verify live and save
                                  handleTestDatabaseUrl(prod.demoDbUrl, prod.id);
                                }}
                                className={`p-1.5 rounded-lg border transition shadow-xs cursor-pointer ${isConnected
                                  ? "border-emerald-200 bg-emerald-50/50 text-emerald-600 hover:bg-emerald-100/60"
                                  : isFailed
                                    ? "border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100/60"
                                    : "border-amber-200 bg-amber-50 text-amber-600 hover:bg-amber-100/60"
                                  }`}
                                title={
                                  isConnected
                                    ? `Database Connected & Active (${prod.demoDbUrl.split("@")[1]?.split("/")[0] || ""})`
                                    : isFailed
                                      ? `Database Connection Failed: ${status?.error || "Cannot reach host"}`
                                      : "Verifying Database Connection..."
                                }
                              >
                                <Database className="w-3.5 h-3.5" />
                              </button>
                            );
                          })()
                        ) : (
                          <span
                            className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-300 opacity-50 cursor-not-allowed"
                            title="DB Status (Not Linked)"
                          >
                            <Database className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>

                      {/* Right: Action Buttons (History, Edit, Delete) matching DB check button size */}
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenCronHistory(prod)}
                          className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-100 hover:border-slate-300 transition shadow-xs cursor-pointer"
                          title="Track Cron Job & Seed Reset History"
                        >
                          <History className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(prod)}
                          className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-100 hover:border-slate-300 transition shadow-xs cursor-pointer"
                          title="Edit Product & DB Setup"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id)}
                          className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition shadow-xs cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Table / List View (matching previous SaaS management view) */
            <div className="bg-white rounded-[24px] border border-[#cbe0fb] shadow-[0_12px_40px_rgba(20,50,90,0.05)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#e5effb] bg-[#f8fbff] text-[11px] font-semibold uppercase tracking-wider text-[#617b9d]">
                      <th className="py-4 px-6">Product / Application</th>
                      <th className="py-4 px-4">Category</th>
                      <th className="py-4 px-4 text-center">Connectivity</th>
                      <th className="py-4 px-4 text-center">Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5effb] text-xs">
                    {filteredProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#f8fbff]/70 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <span
                              className="w-3 h-3 rounded-full shrink-0"
                              style={{ backgroundColor: prod.accentColor || "#2563eb" }}
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-[#142845] text-sm">{prod.title}</span>
                                <span
                                  className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                                  style={{ backgroundColor: prod.accentColor || "#2563eb" }}
                                >
                                  {prod.badge}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#617b9d] line-clamp-1 max-w-[280px] mt-0.5">
                                {prod.tagline}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-block px-2.5 py-1 rounded-lg bg-[#edf5ff] text-[#2563eb] font-semibold text-[11px]">
                            {prod.category}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="inline-flex items-center gap-1.5 bg-[#f0f5fc] p-1 rounded-lg border border-[#e2ecf9]">
                            {/* Demo URL Icon */}
                            {prod.demoUrl ? (
                              <a
                                href={prod.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={`Demo URL Active: ${prod.demoUrl}`}
                                className="p-1.5 rounded-md text-[#2563eb] bg-white shadow-xs hover:bg-blue-50 transition"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            ) : (
                              <span
                                title="No Demo URL"
                                className="p-1.5 rounded-md text-slate-300 cursor-not-allowed"
                              >
                                <ExternalLink className="w-3.5 h-3.5 opacity-40" />
                              </span>
                            )}

                            {/* Demo DB Icon with Live Health Color */}
                            {prod.demoDbUrl ? (
                              (() => {
                                const status = dbStatuses[prod.id];
                                const isConnected = status?.connected === true;
                                const isFailed = status?.connected === false;
                                const isPending = status === undefined;

                                return (
                                  <button
                                    type="button"
                                    onClick={() => handleTestDatabaseUrl(prod.demoDbUrl, prod.id)}
                                    title={
                                      isConnected
                                        ? `Database Connected & Active: ${prod.demoDbUrl.split("@")[1]?.split("/")[0] || ""}`
                                        : isFailed
                                          ? `Database Connection Failed: ${status?.error || "Cannot reach host"}`
                                          : "Verifying Database Connection..."
                                    }
                                    className={`p-1.5 rounded-md shadow-xs cursor-pointer transition ${isConnected
                                      ? "text-emerald-600 bg-emerald-50 border border-emerald-200"
                                      : isFailed
                                        ? "text-rose-600 bg-rose-50 border border-rose-200"
                                        : "text-amber-600 bg-amber-50 border border-amber-200"
                                      }`}
                                  >
                                    <Database className="w-3.5 h-3.5" />
                                  </button>
                                );
                              })()
                            ) : (
                              <span
                                title="No Database Connected"
                                className="p-1.5 rounded-md text-slate-300 cursor-not-allowed"
                              >
                                <Database className="w-3.5 h-3.5 opacity-40" />
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span
                            className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${prod.status === "active"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                              }`}
                          >
                            {prod.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenCronHistory(prod)}
                              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-100 hover:border-slate-300 transition shadow-xs cursor-pointer"
                              title="Track Cron Job & Seed Reset History"
                            >
                              <History className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleOpenEdit(prod)}
                              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-100 hover:border-slate-300 transition shadow-xs cursor-pointer"
                              title="Edit Product"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(prod.id)}
                              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition shadow-xs cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Product Create / Edit Modal with 3-Phase Stepper */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 max-w-5xl w-full flex flex-col my-auto max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95">

              {/* Modal Top Header with Modern Stepper */}
              <div className="px-6 py-4 border-b border-slate-100 bg-white shrink-0">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shrink-0">
                      <Boxes className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">
                        {editingProduct ? `Configure: ${formData.title || "Product"}` : "Add New SaaS / ERP Product"}
                      </h2>
                      <p className="text-[11px] text-slate-500">
                        Fill card details, attach database credentials with DDL/Seed data, and configure reset timers
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Timeline Stepper UI (Static Numbers, Clean Minimal Layout) */}
                <div className="flex items-center justify-between max-w-2xl mx-auto pt-1 pb-1 px-4">
                  {[
                    { step: 1, title: "Card Details" },
                    { step: 2, title: "Database & DDL" },
                    { step: 3, title: "Schedule & Seed" },
                  ].map((s, index, arr) => {
                    const isCurrent = modalStep === s.step;

                    return (
                      <div key={s.step} className="flex items-center flex-1 last:flex-none">
                        {/* Step Item */}
                        <div
                          onClick={() => setModalStep(s.step as 1 | 2 | 3)}
                          className="flex flex-col items-center cursor-pointer group"
                        >
                          {/* Static Circle Number - No color change, no tick */}
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs group-hover:border-slate-300">
                            <span>{s.step}</span>
                          </div>

                          {/* Step Label Info */}
                          <div className="text-center mt-1.5">
                            <span className="text-[9px] font-bold tracking-wider uppercase text-slate-400 block">
                              STEP {s.step}
                            </span>
                            <span
                              className={`text-[11px] font-bold block whitespace-nowrap mt-0.5 ${isCurrent
                                ? "text-blue-600"
                                : "text-slate-600 group-hover:text-slate-800"
                                }`}
                            >
                              {s.title}
                            </span>
                          </div>
                        </div>

                        {/* Connecting Line between steps */}
                        {index < arr.length - 1 && (
                          <div className="flex-1 mx-3 sm:mx-5 mb-3.5">
                            <div className="h-0.5 rounded-full bg-slate-200" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Body: Render phase according to modalStep */}
              <div ref={modalBodyRef} className="flex-1 overflow-y-auto p-6">

                {/* ── PHASE 1: CARD DETAILS & LIVE PREVIEW ── */}
                {modalStep === 1 && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left Form: Clean, Card-Grouped Sections (7 Cols) */}
                    <div className="lg:col-span-7 space-y-4 text-xs">
                      {/* Section 1: Core Details */}
                      <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3.5">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-200/60 text-slate-800 font-bold text-xs">
                          <Boxes className="w-3.5 h-3.5 text-blue-600" />
                          <span>General Information</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="font-semibold text-slate-700 block mb-1">
                              Product Title <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. StockPilot WMS"
                              value={formData.title || ""}
                              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs font-medium text-slate-800"
                            />
                          </div>

                          <div>
                            <label className="font-semibold text-slate-700 block mb-1">Badge Label</label>
                            <input
                              type="text"
                              placeholder="e.g. Warehouse & Logistics ERP"
                              value={formData.badge || ""}
                              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs font-medium text-slate-800"
                            />
                          </div>

                          <div>
                            <label className="font-semibold text-slate-700 block mb-1">Category</label>
                            <select
                              value={formData.category || "erp"}
                              onChange={(e) =>
                                setFormData({ ...formData, category: e.target.value as SaaSProduct["category"] })
                              }
                              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs cursor-pointer"
                            >
                              <option value="erp">ERP System</option>
                              <option value="crm">Intelligent CRM</option>
                              <option value="custom">Custom Enterprise SaaS</option>
                            </select>
                          </div>

                          <div>
                            <label className="font-semibold text-slate-700 block mb-1">Status</label>
                            <select
                              value={formData.status || "active"}
                              onChange={(e) =>
                                setFormData({ ...formData, status: e.target.value as SaaSProduct["status"] })
                              }
                              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs cursor-pointer"
                            >
                              <option value="active">Active (Visible)</option>
                              <option value="draft">Draft (Hidden)</option>
                              <option value="archived">Archived</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">
                            Tagline <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Short punchy value proposition..."
                            value={formData.tagline || ""}
                            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">Full Description</label>
                          <textarea
                            rows={3}
                            placeholder="Comprehensive overview of modules, ledger handling, capabilities..."
                            value={formData.description || ""}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs text-slate-800 resize-none leading-relaxed"
                          />
                        </div>
                      </div>

                      {/* Section 2: Branding & Live Demo URL */}
                      <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3.5">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-200/60 text-slate-800 font-bold text-xs">
                          <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                          <span>Demo Link & Accent Color</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                          <div className="sm:col-span-8">
                            <label className="font-semibold text-slate-700 block mb-1">Live Demo Frontend URL</label>
                            <input
                              type="text"
                              placeholder="https://demostock-pilot-wms.vercel.app"
                              value={formData.demoUrl || ""}
                              onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs text-slate-800 font-mono text-[11px]"
                            />
                          </div>

                          <div className="sm:col-span-4">
                            <label className="font-semibold text-slate-700 block mb-1">Accent Color</label>
                            <div className="flex items-center gap-2">
                              <div className="relative w-9 h-8.5 rounded-xl border border-slate-200 overflow-hidden shrink-0 shadow-2xs">
                                <input
                                  type="color"
                                  value={formData.accentColor && /^#[0-9A-Fa-f]{6}$/.test(formData.accentColor) ? formData.accentColor : "#2563eb"}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setFormData((prev) => ({ ...prev, accentColor: val }));
                                  }}
                                  className="absolute -inset-2 w-14 h-14 cursor-pointer border-none bg-transparent"
                                />
                              </div>
                              <input
                                type="text"
                                placeholder="#2563EB"
                                value={formData.accentColor || ""}
                                onChange={(e) => {
                                  let val = e.target.value;
                                  if (val && !val.startsWith("#") && !val.startsWith("rgb")) {
                                    val = "#" + val;
                                  }
                                  setFormData((prev) => ({ ...prev, accentColor: val }));
                                }}
                                className="w-full px-2.5 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 uppercase font-mono text-[11px] shadow-2xs font-semibold text-slate-800"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Key Features & Preview Tags */}
                      <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-4">
                        {/* Key Features */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="font-semibold text-slate-700">Key Features</label>
                            <span className="text-[10px] text-slate-400 font-medium">Top 3 appear on website card</span>
                          </div>
                          <div className="flex gap-2 mb-2.5">
                            <input
                              type="text"
                              placeholder="Type a feature and press Enter or Add..."
                              value={featureInput}
                              onChange={(e) => setFeatureInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addFeature();
                                }
                              }}
                              className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                            />
                            <button
                              type="button"
                              onClick={addFeature}
                              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition cursor-pointer shadow-xs active:scale-95"
                            >
                              Add
                            </button>
                          </div>

                          {formData.keyFeatures && formData.keyFeatures.length > 0 ? (
                            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                              {formData.keyFeatures.map((f, idx) => {
                                const featTitle = typeof f === "string" ? f : (f?.title || f?.desc || "");
                                return (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs group"
                                  >
                                    <div className="flex items-center gap-2 text-slate-700 overflow-hidden">
                                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                      <span className="truncate">{featTitle}</span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeFeature(idx)}
                                      className="text-slate-400 hover:text-rose-600 p-0.5 rounded transition cursor-pointer"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <p className="text-[11px] text-slate-400 italic">No features added yet.</p>
                          )}
                        </div>

                        {/* Preview Tags */}
                        <div className="pt-3 border-t border-slate-200/60">
                          <label className="font-semibold text-slate-700 block mb-1.5">Filter / Search Tags</label>
                          <div className="flex gap-2 mb-2.5">
                            <input
                              type="text"
                              placeholder="e.g. WMS, Logistics, Inventory ERP..."
                              value={tagInput}
                              onChange={(e) => setTagInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addTag();
                                }
                              }}
                              className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                            />
                            <button
                              type="button"
                              onClick={addTag}
                              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition cursor-pointer shadow-xs active:scale-95"
                            >
                              Add Tag
                            </button>
                          </div>

                          {formData.previewTags && formData.previewTags.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {formData.previewTags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/70 font-medium text-[11px]"
                                >
                                  {tag}
                                  <button
                                    type="button"
                                    onClick={() => removeTag(idx)}
                                    className="text-blue-400 hover:text-rose-600 cursor-pointer"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-[11px] text-slate-400 italic">No tags added yet.</p>
                          )}
                        </div>

                        {/* Performance Metric Stat Tags (e.g. Speed, Accuracy, Efficiency) */}
                        <div className="pt-3 border-t border-slate-200/60 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="font-semibold text-slate-700 block text-xs">
                                Key Performance Metrics (Card Stat Badges)
                              </label>
                              <p className="text-[10px] text-slate-400">
                                Stat highlights shown on the product card (e.g. Label: "Billing Speed", Value: "&lt; 5 sec").
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  metrics: [...(prev.metrics || []), { label: "", value: "" }],
                                }));
                              }}
                              className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Stat</span>
                            </button>
                          </div>

                          <div className="space-y-2">
                            {(formData.metrics && formData.metrics.length > 0
                              ? formData.metrics
                              : [{ label: "", value: "" }]
                            ).map((m, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <input
                                  type="text"
                                  placeholder="Metric Label (e.g. Speed, Accuracy)"
                                  value={m.label}
                                  onChange={(e) => {
                                    const updated = [...(formData.metrics || [])];
                                    if (!updated[idx]) updated[idx] = { label: "", value: "" };
                                    updated[idx].label = e.target.value;
                                    setFormData((prev) => ({ ...prev, metrics: updated }));
                                  }}
                                  className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                                />
                                <input
                                  type="text"
                                  placeholder="Value (e.g. < 5 sec, 98%)"
                                  value={m.value}
                                  onChange={(e) => {
                                    const updated = [...(formData.metrics || [])];
                                    if (!updated[idx]) updated[idx] = { label: "", value: "" };
                                    updated[idx].value = e.target.value;
                                    setFormData((prev) => ({ ...prev, metrics: updated }));
                                  }}
                                  className="w-36 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                                />
                                {(formData.metrics || []).length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setFormData((prev) => ({
                                        ...prev,
                                        metrics: (prev.metrics || []).filter((_, i) => i !== idx),
                                      }));
                                    }}
                                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                                    title="Remove metric stat"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Live Card Preview (5 Cols Sticky) */}
                    <div className="lg:col-span-5 sticky top-2">
                      <div className="bg-gradient-to-b from-slate-50 to-blue-50/30 p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
                        {/* Header Banner */}
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                            Live Website Card Preview
                          </span>
                          <span className="text-[10px] font-semibold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200 shadow-2xs">
                            Exact Visitor View
                          </span>
                        </div>

                        {/* Exact Product Card Replica matching OurProductContent */}
                        <div className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-5 shadow-sm transition-all flex flex-col justify-between">
                          <div>
                            {/* Top Row: Badge only */}
                            <div className="flex items-center justify-between gap-3 mb-3">
                              <span
                                className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-2xs"
                                style={{ backgroundColor: formData.accentColor || "#2563eb" }}
                              >
                                {formData.badge || "Warehouse & Logistics ERP"}
                              </span>
                            </div>

                            {/* Title */}
                            <h3
                              className="text-base font-bold text-[#050505] tracking-tight leading-snug"
                              style={{ fontFamily: "var(--font-geist), Georgia, serif" }}
                            >
                              {formData.title || "Product Title Preview"}
                            </h3>

                            {/* Tagline */}
                            <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                              {formData.tagline || "Intelligent multi-warehouse inventory control, dispatch automation, and real-time stock telemetry."}
                            </p>

                            {/* Key Features Bullets */}
                            <div className="mt-3.5 border-t border-slate-100 pt-3">
                              <ul className="space-y-1.5">
                                {(formData.keyFeatures && formData.keyFeatures.length > 0
                                  ? formData.keyFeatures.slice(0, 3)
                                  : [
                                    "Multi-Location Lot, Batch & Serial Tracking",
                                    "Automated Inbound Receiving & Barcode Dispatch",
                                    "Live Database Sync & Automated Threshold Alerts"
                                  ]
                                ).map((feat, idx) => {
                                  const text = typeof feat === "string" ? feat : (feat?.title || feat?.desc || "");
                                  return (
                                    <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-blue-600 mt-0.5" />
                                      <span className="line-clamp-1">{text}</span>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>

                          {/* Card Bottom CTA */}
                          <div className="mt-4 border-t border-slate-100 pt-3.5 flex items-center justify-between gap-2">
                            <span className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs bg-slate-50 cursor-default">
                              Details
                            </span>

                            <div
                              className="inline-flex items-center justify-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold text-white shadow-xs cursor-default"
                              style={{ backgroundColor: formData.accentColor || "#2563eb" }}
                            >
                              <span>Take Demo</span>
                              <ArrowRight className="h-3 w-3" />
                            </div>
                          </div>
                        </div>

                        {/* Helper Hint */}
                        <div className="text-[11px] text-slate-500 bg-white/80 p-3 rounded-xl border border-slate-200/60 flex items-center justify-between">
                          <span className="font-medium">Category:</span>
                          <span className="font-bold uppercase tracking-wider text-slate-700 text-[10px] bg-slate-100 px-2 py-0.5 rounded-md">
                            {formData.category || "ERP"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── PHASE 2: DATABASE URL, SCHEMA DDL & SEED DATA ── */}
                {modalStep === 2 && (
                  <div className="space-y-5 text-xs">
                    {/* Database Connection String */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="font-bold text-slate-800 text-xs block">
                            Target PostgreSQL Database URL
                          </label>
                          <p className="text-[11px] text-slate-500">Neon / PostgreSQL connection string for this product's evaluation sandbox</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {formData.demoDbUrl && (
                            <button
                              type="button"
                              onClick={() => handleTestDatabaseUrl(formData.demoDbUrl, editingProduct?.id)}
                              disabled={testingFormDb}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold cursor-pointer disabled:opacity-50 transition"
                            >
                              {testingFormDb ? (
                                <>
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  <span>Testing...</span>
                                </>
                              ) : (
                                <>
                                  <Database className="w-3.5 h-3.5" />
                                  <span>Test Connection</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="relative">
                        <input
                          type="text"
                          placeholder="postgresql://neondb_owner:password@ep-host.aws.neon.tech/neondb?sslmode=require"
                          value={formData.demoDbUrl || ""}
                          onChange={(e) => {
                            setFormData({ ...formData, demoDbUrl: e.target.value });
                            setFormDbTestResult(null);
                          }}
                          className={`w-full px-3.5 py-2.5 pr-10 rounded-xl bg-white border font-mono text-[11px] text-slate-800 focus:outline-none focus:ring-2 ${formDbTestResult?.connected === true
                            ? "border-emerald-400 focus:ring-emerald-500/20"
                            : formDbTestResult?.connected === false
                              ? "border-rose-400 focus:ring-rose-500/20"
                              : "border-slate-300 focus:ring-blue-500/20 focus:border-blue-500"
                            }`}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          {testingFormDb ? (
                            <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                          ) : formDbTestResult?.connected === true ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : formDbTestResult?.connected === false ? (
                            <AlertCircle className="w-4 h-4 text-rose-500" />
                          ) : null}
                        </div>
                      </div>

                      {formDbTestResult && (
                        <div
                          className={`p-2.5 rounded-xl border text-[11px] flex items-start gap-2 ${formDbTestResult.connected
                            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                            : "bg-rose-50 border-rose-200 text-rose-800"
                            }`}
                        >
                          {formDbTestResult.connected ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          )}
                          <span className="leading-relaxed">{formDbTestResult.message}</span>
                        </div>
                      )}
                    </div>

                    {/* ⚡ NEW FEATURE: SMART ONE-CLICK AUTO-EXTRACT FROM initDb.js / .sql */}
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-slate-50 border border-blue-200/80 shadow-2xs">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-start gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                            <Wand2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-slate-900">
                                Smart One-Click Auto-Extract from Database File
                              </h4>
                              <span className="px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[9px] font-bold uppercase tracking-wider">
                                New Tool
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 mt-0.5">
                              Upload your project's <code className="px-1 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] text-blue-600 font-semibold">initDb.js</code>, <code className="px-1 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] text-blue-600 font-semibold">schema.sql</code>, or SQL dump. It automatically parses all tables into <strong className="text-slate-800">Section A (Schema DDL)</strong> and records into <strong className="text-slate-800">Section B (Seed Data)</strong>!
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Select initDb / .sql</span>
                            <input
                              type="file"
                              accept=".js,.ts,.sql,.txt"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const r = new FileReader();
                                  r.onload = (ev) => {
                                    const content = (ev.target?.result as string) || "";
                                    const result = parseInitDbScript(content);

                                    if (!result.schemaSql && !result.seedSql) {
                                      setInitDbExtractMsg({
                                        type: "error",
                                        text: "Could not find any CREATE TABLE or INSERT INTO statements in the uploaded file.",
                                      });
                                    } else {
                                      if (result.schemaSql) {
                                        setModalSchemaCode(result.schemaSql);
                                      }
                                      if (result.seedSql) {
                                        setModalSeedCode(result.seedSql);
                                      }
                                      setInitDbExtractMsg({
                                        type: "success",
                                        text: `Extracted ${result.totalTables} table(s) into Schema DDL and ${result.totalInserts} insert batch(es) into Seed Records!`,
                                      });
                                    }
                                  };
                                  r.readAsText(file);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      {initDbExtractMsg && (
                        <div
                          className={`mt-2.5 p-2 rounded-xl text-[11px] flex items-center gap-2 ${initDbExtractMsg.type === "success"
                            ? "bg-emerald-100/70 border border-emerald-300 text-emerald-800 font-medium"
                            : "bg-rose-100/70 border border-rose-300 text-rose-800 font-medium"
                            }`}
                        >
                          {initDbExtractMsg.type === "success" ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          )}
                          <span>{initDbExtractMsg.text}</span>
                        </div>
                      )}
                    </div>

                    {/* Side-by-Side: Schema DDL & Seed Data Input */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Section A: Schema DDL (CREATE TABLE) */}
                      <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5 flex flex-col">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                              A
                            </span>
                            <div>
                              <h3 className="font-bold text-slate-900 text-xs">Database Schema DDL</h3>
                              <p className="text-[10px] text-slate-500">Tables, Types, Extensions for blank DB</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {modalSchemaCode.trim() && (
                              <button
                                type="button"
                                onClick={() => {
                                  setViewerModal({
                                    isOpen: true,
                                    title: "Schema DDL - Tables & Definitions",
                                    content: modalSchemaCode
                                  });
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-semibold transition cursor-pointer border border-blue-200"
                                title="View Parsed DDL Schema Tables"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Preview</span>
                              </button>
                            )}

                            <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold cursor-pointer transition">
                              <Upload className="w-3 h-3" />
                              <span>Upload .sql</span>
                              <input
                                type="file"
                                accept=".sql"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const r = new FileReader();
                                    r.onload = (ev) => setModalSchemaCode((ev.target?.result as string) || "");
                                    r.readAsText(file);
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>

                        <textarea
                          rows={11}
                          placeholder="CREATE TABLE IF NOT EXISTS users (...);&#10;CREATE TABLE IF NOT EXISTS accounts (...);&#10;-- Paste your complete schema DDL here..."
                          value={modalSchemaCode}
                          onChange={(e) => setModalSchemaCode(e.target.value)}
                          className="w-full flex-1 p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-[11px] leading-relaxed focus:outline-none border border-slate-800 resize-none select-text"
                        />
                        <p className="text-[10px] text-slate-400">
                          Executed before seeding. Creates any missing tables if the target database is fresh or empty.
                        </p>
                      </div>

                      {/* Section B: Seed Data (INSERT INTO) */}
                      <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5 flex flex-col">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                              B
                            </span>
                            <div>
                              <h3 className="font-bold text-slate-900 text-xs">Seed Records SQL</h3>
                              <p className="text-[10px] text-slate-500">INSERT INTO statements for evaluation</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {modalSeedCode.trim() && (
                              <button
                                type="button"
                                onClick={() => {
                                  setViewerModal({
                                    isOpen: true,
                                    title: "Seed Records - Data Rows",
                                    content: modalSeedCode
                                  });
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-semibold transition cursor-pointer border border-emerald-200"
                                title="View Seed Records in Table View"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>View Records</span>
                              </button>
                            )}

                            <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold cursor-pointer transition">
                              <Upload className="w-3 h-3" />
                              <span>Upload .sql</span>
                              <input
                                type="file"
                                accept=".sql"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const r = new FileReader();
                                    r.onload = (ev) => setModalSeedCode((ev.target?.result as string) || "");
                                    r.readAsText(file);
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>

                        <textarea
                          rows={11}
                          placeholder="INSERT INTO accounts (name, type) VALUES ('Main Operating', 'bank');&#10;INSERT INTO categories (name) VALUES ('Tech');&#10;-- Paste your seed INSERT statements here..."
                          value={modalSeedCode}
                          onChange={(e) => setModalSeedCode(e.target.value)}
                          className="w-full flex-1 p-3 rounded-xl bg-slate-900 text-blue-300 font-mono text-[11px] leading-relaxed focus:outline-none border border-slate-800 resize-none select-text"
                        />
                        <p className="text-[10px] text-slate-400">
                          Wipes test rows and injects fresh evaluation data. Users table is safely preserved.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── PHASE 3: SCHEDULING & LIVE EXECUTION ── */}
                {modalStep === 3 && (
                  <div className="space-y-6 text-xs max-w-2xl mx-auto py-2">
                    {/* Auto Midnight Reset Box */}
                    <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-2xs space-y-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                            <Clock className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 text-sm">Automated Midnight Data Reset</h3>
                            <p className="text-xs text-slate-500">Every night, wipes junk test rows and refills with clean seed state</p>
                          </div>
                        </div>

                        {/* Toggle switch with clear outline border */}
                        <button
                          type="button"
                          role="switch"
                          aria-checked={modalCronEnabled}
                          onClick={() => setModalCronEnabled(!modalCronEnabled)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${modalCronEnabled
                            ? "bg-blue-600 border-blue-600"
                            : "bg-slate-200 border-slate-300"
                            }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${modalCronEnabled ? "translate-x-5" : "translate-x-0"
                              }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 pt-3 border-t border-slate-200/80">
                        <span className="font-semibold text-slate-700">Night Run Time:</span>
                        <input
                          type="time"
                          value={modalCronTime}
                          onChange={(e) => setModalCronTime(e.target.value)}
                          className="px-3 py-1.5 rounded-xl border border-slate-300 font-bold text-xs bg-white text-slate-800 focus:outline-none focus:border-blue-500 shadow-2xs"
                        />
                        <span className="text-[11px] font-semibold text-slate-500">
                          ({modalCronEnabled ? "Active & Scheduled" : "Paused"})
                        </span>
                      </div>
                    </div>

                    {/* Instant Run Trigger Card */}
                    <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-50/70 to-teal-50/40 border border-emerald-200/90 shadow-2xs space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs">
                            <Play className="w-5 h-5 fill-emerald-700" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 text-sm">Execute Immediately (Live Run)</h3>
                            <p className="text-xs text-slate-600">Applies Schema DDL, cleans old records, and seeds target database now</p>
                          </div>
                        </div>

                        {/* Execute Button */}
                        <button
                          type="button"
                          onClick={async () => {
                            if (!editingProduct) {
                              setToastMessage("Please save the product first before executing seed data!");
                              setToastType("error");
                              return;
                            }
                            if (!formData.demoDbUrl) {
                              setToastMessage("Please provide Target PostgreSQL DB URL in Step 2 first!");
                              setToastType("error");
                              return;
                            }
                            if (!modalSeedCode) {
                              setToastMessage("Please paste or upload Seed SQL in Step 2 first!");
                              setToastType("error");
                              return;
                            }

                            if (!confirm(`Run seed execution now for "${formData.title}"?`)) return;
                            try {
                              setIsTriggeringSeed(true);
                              // Auto save config first
                              const fd = new FormData();
                              fd.append("cronTime", modalCronTime);
                              fd.append("isEnabled", String(modalCronEnabled));
                              if (modalSeedCode) fd.append("seedCode", modalSeedCode);
                              if (modalSchemaCode) fd.append("schemaCode", modalSchemaCode);

                              await fetch(`${API_URL}/api/admin/products/${editingProduct.id}/seed-config`, {
                                method: "POST",
                                headers: { Authorization: `Bearer ${token}` },
                                body: fd
                              });

                              const res = await fetch(`${API_URL}/api/admin/products/${editingProduct.id}/seed-trigger`, {
                                method: "POST",
                                headers: { Authorization: `Bearer ${token}` }
                              });
                              const data = await res.json();
                              if (res.ok) {
                                setToastMessage(`Seed executed successfully in ${data.durationMs}ms!`);
                                setToastType("success");
                              } else {
                                setToastMessage(data.message || "Seed execution failed");
                                setToastType("error");
                              }
                            } catch (err: any) {
                              setToastMessage(err.message || "Execution error");
                              setToastType("error");
                            } finally {
                              setIsTriggeringSeed(false);
                            }
                          }}
                          disabled={isTriggeringSeed}
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-200 active:scale-98 cursor-pointer shrink-0 disabled:opacity-60"
                        >
                          {isTriggeringSeed ? (
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                          ) : (
                            <Play className="w-3.5 h-3.5 fill-white text-white" />
                          )}
                          <span>{isTriggeringSeed ? "Executing Seed..." : "Execute Seed Now"}</span>
                        </button>
                      </div>

                      {!editingProduct && (
                        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-800 text-[11px] font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                          <span>Product not saved yet. Please click &quot;Save Product&quot; below first before running live database injection.</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer Controls: Phase Navigators & Final Save */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2">
                  {modalStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setModalStep((prev) => (prev - 1) as 1 | 2 | 3)}
                      className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-xs transition cursor-pointer"
                    >
                      &larr; Back
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-200/60 rounded-xl transition text-xs cursor-pointer"
                  >
                    Close
                  </button>

                  {modalStep < 3 ? (
                    <button
                      type="button"
                      onClick={() => setModalStep((prev) => (prev + 1) as 1 | 2 | 3)}
                      className="inline-flex items-center gap-1.5 px-5 py-2 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-xs text-xs cursor-pointer active:scale-98"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : null}

                  {/* Save All Configuration Button */}
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving || !formData.title || !formData.tagline}
                    className="inline-flex items-center gap-2 px-5 py-2 font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition shadow-xs text-xs cursor-pointer active:scale-98 disabled:opacity-50"
                  >
                    {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>{saving ? "Saving..." : "Save Product"}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Clean Seed Data & Schema Records Table Viewer (Only data table and X button) */}
        {viewerModal.isOpen && (
          <SeedDataViewerModal
            isOpen={viewerModal.isOpen}
            onClose={() => setViewerModal({ isOpen: false, title: "", content: "" })}
            title={viewerModal.title}
            content={viewerModal.content}
          />
        )}

        {/* Dedicated Cron Job & Seed Reset History Tracker Modal */}
        <CronHistoryModal
          isOpen={isHistoryModalOpen}
          onClose={() => setIsHistoryModalOpen(false)}
          product={historyProduct}
          seedConfig={historyConfig}
          logs={historyLogs}
          isLoading={loadingHistory}
          onRefresh={() => historyProduct && handleOpenCronHistory(historyProduct)}
          onTriggerNow={handleTriggerHistorySeed}
          isTriggering={isTriggeringHistorySeed}
        />

        {/* Visual Interactive Seed & Midnight Reset Modal */}
        {isSeedModalOpen && seedProduct && (
          <VisualSeedModal
            isOpen={isSeedModalOpen}
            onClose={() => setIsSeedModalOpen(false)}
            product={{
              id: seedProduct.id,
              title: seedProduct.title,
              demoDbUrl: seedProduct.demoDbUrl
            }}
            seedConfig={seedConfig}
            seedLogs={seedLogs}
            onSaveConfig={handleSaveSeedConfigFromModal}
            onRunSeedNow={handleTriggerSeedNow}
            isSaving={isUploadingSeed}
            isRunning={isTriggeringSeed}
            onTestAndSaveDbUrl={async (url: string, prodId: string) => {
              const res = await fetch(`${API_URL}/api/admin/products/test-db-connection`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ demoDbUrl: url.trim(), productId: prodId })
              });
              const data = await res.json();
              if (data.connected) {
                setProducts((prev) =>
                  prev.map((p) => (p.id === prodId ? { ...p, demoDbUrl: url.trim() } : p))
                );
                setDbStatuses((prev) => ({ ...prev, [prodId]: { connected: true } }));
                if (seedProduct?.id === prodId) {
                  setSeedProduct((prev) => (prev ? { ...prev, demoDbUrl: url.trim() } : null));
                }
              }
              return { connected: !!data.connected, message: data.message || (data.connected ? "Connected & saved!" : "Connection failed") };
            }}
          />
        )}

        {toastMessage && (
          <PopupToast
            message={toastMessage}
            type={toastType}
            onClose={() => setToastMessage(null)}
          />
        )}
      </main>
    </SidebarProvider>
  );
}
