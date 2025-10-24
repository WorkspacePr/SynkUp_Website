"use client";

import React, { useEffect, useRef, useState } from "react";
import TextInput from "@/components/ui/TextInput";
import CustomButton from "@/components/ui/CustomButton";
import Link from "next/link";
import BackIcon from "@/assests/icons/svg/BackIcon";
import { useRouter } from "next/navigation";

export default function TwoFactorForm() {
  const [email, setEmail] = React.useState("");
  const router = useRouter();

  const CODE_LENGTH = 6;

  const [otp, setOtp] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [error, setError] = // error message
    useState<string | null>(null);
  const [loading, setLoading] = useState(false); // loading state for API call

  const [resendLoading, setResendLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const [mounted, setMounted] = useState(false);
  const [suppressGuard, setSuppressGuard] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  type TFLocationState = {
    email?: string;
    two_factor_method?: "totp" | "email";
    remember?: boolean;
  };

  // read remember from state or sessionStorage fallback
  const rememberedFromSS = (() => {
    try {
      return JSON.parse(sessionStorage.getItem("adminRemember") || "false");
    } catch {
      return false;
    }
  })();
  //   const [remember, _setRemember] = useState<boolean>(
  //     state?.remember ?? rememberedFromSS
  //   );

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  // Refs for each input field (to manage focus)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // On mount, autofocus the first empty input
  useEffect(() => {
    const firstEmpty = otp.findIndex((d) => d === "");
    if (firstEmpty >= 0) {
      inputRefs.current[firstEmpty]?.focus();
    }
  }, []);

  // Handle a single-digit change
  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const digit = e.target.value.replace(/\D/g, "").slice(-1); // keep last numeric
    if (!/^\d?$/.test(digit)) return; // block non-digits

    // Prevent typing out-of-order
    if (index > 0 && otp[index - 1] === "") {
      inputRefs.current[index - 1]?.focus();
      return;
    }

    const next = [...otp];
    next[index] = digit;
    setOtp(next);

    // Autofocus next field if a digit was entered
    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Keyboard navigation (Backspace, Arrow keys)
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const isComplete = otp.every((d) => d !== ""); // check all digits filled

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email });
    // 🔐 send to your API here

    router.push("/dashboard");
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLDivElement | HTMLInputElement>
  ) => {
    const data = (e.clipboardData?.getData("text") || "").replace(/\D/g, "");
    if (!data) return;
    e.preventDefault();

    // Decide where to begin: focused cell -> first empty -> 0
    const emptyIdx = otp.findIndex((d) => d === "");
    const startIndex = focusedIndex ?? (emptyIdx >= 0 ? emptyIdx : 0);

    const next = [...otp];
    let write = 0;

    for (
      let i = startIndex;
      i < CODE_LENGTH && write < data.length;
      i += 1, write += 1
    ) {
      next[i] = data[write];
    }

    setOtp(next);

    // Focus the last cell we filled
    const last = Math.min(startIndex + write - 1, CODE_LENGTH - 1);
    if (last >= 0) {
      inputRefs.current[last]?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      {/* OTP inputs */}
      <div className="mb-6 grid grid-cols-6 gap-2 sm:gap-3">
        {otp.map((digit, idx) => {
          const isFocused = focusedIndex === idx;
          const isFilled = !!digit;

          const base =
            "h-14 w-12 text-xl sm:text-2xl text-input-text text-center rounded-md " +
            "border border-bd-primary bg-foreground/80 dark:bg-input-bg " +
            "outline-none " +
            "focus:border-primary focus:ring-2 focus:ring-primary/25 " +
            "placeholder:opacity-50 selection:bg-primary/20";

          const state =
            (isFocused ? " ring-2 ring-primary/30 scale-[1.02]" : "") +
            (isFilled
              ? " border-primary/70"
              : "");

          return (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              aria-label={`Digit ${idx + 1}`}
              aria-invalid={!!error}
              aria-describedby={error ? "otp-error" : undefined}
              className={base + state}
              onChange={(e) => handleChange(idx, e)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onFocus={() => setFocusedIndex(idx)}
              onBlur={() => setFocusedIndex(null)}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              autoComplete={idx === 0 ? "one-time-code" : "off"}
              onPaste={handlePaste}
            />
          );
        })}
      </div>

      {/* Resend link */}
      <div className="text-center">
        <button
          type="button"
          // onClick={handleResend}
          className="text-primary text-xs hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={cooldown > 0 || resendLoading}
        >
          {resendLoading
            ? "Sending..."
            : cooldown > 0
            ? `Resend in ${String(Math.floor(cooldown / 60)).padStart(
                2,
                "0"
              )}:${String(cooldown % 60).padStart(2, "0")}`
            : "Resend code"}
        </button>
      </div>

      <CustomButton
        type="submit"
        variant="primary"
        // disabled={!isComplete || loading}
        className="w-full mt-4"
      >
        {/* {loading ? <span className="loader" /> : "Verify"} */}
        Verify
      </CustomButton>

      <div className="w-full flex justify-center mt-4">
        <Link
          href="/login"
          className="flex items-center gap-1 text-xs text-sub-text"
        >
          <BackIcon className="w-4 h-4" />
          <span>Go back to Login page</span>
        </Link>
      </div>
    </form>
  );
}
