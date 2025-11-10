"use client";

import React, { useMemo, useState } from "react";
import TextInput from "@/components/ui/TextInput";
import CustomButton from "@/components/ui/CustomButton";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const uid = sp.get("uid") ?? "";
  const token = sp.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const pwError = useMemo(() => {
    if (!password) return null;
    if (password.length < 8) return "Password must be at least 8 characters.";
    return null;
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (!uid || !token) {
      setErr("Invalid or expired reset link.");
      return;
    }
    if (pwError) {
      setErr(pwError);
      return;
    }
    if (password !== confirm) {
      setErr("Passwords do not match.");
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/auth/password-reset/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, token, new_password: password }),
      });
      const txt = await res.text();
      let data: any = {};
      try {
        data = txt ? JSON.parse(txt) : {};
      } catch {}

      if (!res.ok) throw new Error(data?.message || "Could not reset password");

      router.replace("/password-changed");
    } catch (e: any) {
      setErr(e?.message || "Could not reset password");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <TextInput
        placeholder="Enter new password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <TextInput
        placeholder="Confirm password"
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />

      {err && <p className="text-red-500 text-sm">{err}</p>}

      <CustomButton
        type="submit"
        variant="primary"
        className="w-full mt-4"
        disabled={busy}
      >
        {busy ? <div className="loader"></div> : "Change password"}
      </CustomButton>

      {/* <div className="w-full flex justify-center">
        <Link
          href="/login"
          className="flex items-center gap-1 text-xs text-sub-text"
        >
          <BackIcon className="w-4 h-4" />
          <span>Go back to Login page</span>
        </Link>
      </div> */}
    </form>
  );
}
