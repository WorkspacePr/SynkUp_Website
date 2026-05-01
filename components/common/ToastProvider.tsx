"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

type ToastVariant = "info" | "success" | "error";

interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastOptions {
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  showToast: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

function generateToastId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const TOAST_BASE = "toast pointer-events-auto";

const TOAST_VARIANTS: Record<ToastVariant, string> = {
  info: "toast--info",
  success: "toast--success",
  error: "toast--error",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showToast = (message: string, options: ToastOptions = {}) => {
    const id = generateToastId();
    const toast: ToastItem = {
      id,
      message,
      variant: options.variant ?? "info",
    };

    setToasts((prev) => [...prev, toast]);

    const duration = options.duration ?? 4500;
    if (duration > 0) {
      window.setTimeout(() => removeToast(id), duration);
    }
  };

  const value = useMemo(() => ({ showToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed right-4 bottom-4 z-[60] flex w-[320px] max-w-[90vw] flex-col gap-2"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${TOAST_BASE} ${TOAST_VARIANTS[toast.variant]}`}
            role="status"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="leading-snug">{toast.message}</p>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-xs font-semibold uppercase tracking-wide text-slate-400 hover:text-slate-600"
              >
                Close
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
