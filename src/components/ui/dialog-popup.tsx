"use client";

import React, { useEffect } from "react";
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X, Loader2 } from "lucide-react";

export interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  description: string;
  type?: "danger" | "warning" | "info" | "success";
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

export function PopupModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  type = "info",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
}: PopupModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !loading) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, loading, onClose]);

  if (!isOpen) return null;

  const iconConfig = {
    danger: {
      icon: AlertTriangle,
      color: "text-[#dc2626]",
      bg: "bg-[#fef2f2]",
      btnBg: "bg-[#dc2626] hover:bg-[#b91c1c] text-white",
    },
    warning: {
      icon: AlertTriangle,
      color: "text-[#d97706]",
      bg: "bg-[#fffbeb]",
      btnBg: "bg-[#d97706] hover:bg-[#b45309] text-white",
    },
    success: {
      icon: CheckCircle2,
      color: "text-[#059669]",
      bg: "bg-[#ecfdf5]",
      btnBg: "bg-[#059669] hover:bg-[#047857] text-white",
    },
    info: {
      icon: Info,
      color: "text-[#2563eb]",
      bg: "bg-[#edf5ff]",
      btnBg: "bg-[#2563eb] hover:bg-[#1d4ed8] text-white",
    },
  }[type];

  const IconComponent = iconConfig.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#142845]/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-7 shadow-2xl text-center animate-in zoom-in-95 duration-200">
        {!loading && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-xl p-1.5 text-[#8ba2bd] hover:bg-[#f8fbff] hover:text-[#142845] transition"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${iconConfig.bg} ${iconConfig.color} mb-4 shadow-xs`}>
          <IconComponent className="h-7 w-7" />
        </div>

        <h3 className="text-lg font-bold text-[#142845] tracking-tight">{title}</h3>
        <p className="mt-2 text-xs text-[#617b9b] leading-relaxed max-w-sm mx-auto">{description}</p>

        <div className="mt-6 flex items-center justify-center gap-3">
          {onConfirm && (
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 rounded-2xl bg-[#f8fbff] hover:bg-[#edf5ff] text-xs font-semibold text-[#617b9b] hover:text-[#142845] transition disabled:opacity-50"
            >
              {cancelText}
            </button>
          )}

          <button
            type="button"
            onClick={onConfirm || onClose}
            disabled={loading}
            className={`px-6 py-2.5 rounded-2xl text-xs font-bold shadow-xs transition disabled:opacity-50 flex items-center gap-2 ${iconConfig.btnBg}`}
          >
            {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            <span>{onConfirm ? confirmText : "Okay"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export interface PopupToastProps {
  message: string | null;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

export function PopupToast({
  message,
  type = "success",
  onClose,
  duration = 4000,
}: PopupToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const typeConfig = {
    success: {
      icon: CheckCircle2,
      color: "text-[#059669]",
      badgeBg: "bg-[#ecfdf5]",
    },
    error: {
      icon: AlertCircle,
      color: "text-[#dc2626]",
      badgeBg: "bg-[#fef2f2]",
    },
    info: {
      icon: Info,
      color: "text-[#2563eb]",
      badgeBg: "bg-[#edf5ff]",
    },
  }[type];

  const IconComponent = typeConfig.icon;

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl text-xs font-semibold text-[#142845] animate-in slide-in-from-top-4 fade-in duration-200">
      <div className={`flex h-7 w-7 items-center justify-center rounded-xl ${typeConfig.badgeBg} ${typeConfig.color} shrink-0`}>
        <IconComponent className="h-4 w-4" />
      </div>
      <span className="leading-snug max-w-sm">{message}</span>
      <button
        onClick={onClose}
        className="p-1 rounded-lg text-[#8ba2bd] hover:text-[#142845] hover:bg-[#f8fbff] transition ml-1 shrink-0"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
