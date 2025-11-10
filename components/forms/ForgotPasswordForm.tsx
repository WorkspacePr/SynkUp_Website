"use client";

import React, { useState } from "react";
import TextInput from "@/components/ui/TextInput";
import CustomButton from "@/components/ui/CustomButton";
import Link from "next/link";
import BackIcon from "@/assests/icons/svg/BackIcon";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    const v = email.trim();
    if (!v) {
      setErr("Enter your email.");
      return;
    }

    setBusy(true);
    try {
      await fetch("/api/password-reset/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: v }),
      });
      // Endpoint always responds with success text (even if email doesn't exist)
      setDone(true);
    } catch {
      // Still show success to avoid enumeration
      setDone(true);
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="mt-6 space-y-4">
        <p className="text-sm text-sub-text">
          If that email exists, we’ve sent password reset instructions. Please
          check your inbox (and spam).
        </p>
        <Link
          href="/login"
          className="flex items-center gap-1 text-xs text-sub-text"
        >
          <BackIcon className="w-4 h-4" />
          <span>Back to login</span>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <TextInput
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
          >
            <path d="M12 12a5 5 0 1 0-5-5  5 5 0 0 0 5 5Z" />
            <path d="M20 21a8 8 0 1 0-16 0" />
          </svg>
        }
      />

      {err && <p className="text-red-500 text-sm">{err}</p>}

      <CustomButton
        type="submit"
        variant="primary"
        className="w-full mt-4"
        disabled={busy}
      >
        {busy ? <div className="loader"></div> : "Send reset link"}
      </CustomButton>

      <div className="w-full flex justify-center">
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
