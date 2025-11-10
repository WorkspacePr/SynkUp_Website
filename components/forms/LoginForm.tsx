"use client";

import React, { useState } from "react";
import TextInput from "@/components/ui/TextInput";
import CustomButton from "@/components/ui/CustomButton";
import { StyledCheckbox } from "@/components/ui/CustomCheckbox";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailTrim = email.trim();
    if (!emailTrim || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailTrim, password }),
      });
      const txt = await res.text();
      const data = txt ? JSON.parse(txt) : {};
      if (!res.ok) throw new Error(data?.message || "Login failed");

      router.push(
        `/two-factor?user_id=${data.user_id}` +
          `&email=${encodeURIComponent(emailTrim)}` +
          `&remember=${remember ? "1" : "0"}`
      );
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-5">
      <TextInput
        placeholder="Email / Username"
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
            <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z" />
            <path d="M20 21a8 8 0 1 0-16 0" />
          </svg>
        }
      />

      <TextInput
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-between items-center">
        <StyledCheckbox
          checked={remember}
          onChange={() => setRemember(!remember)}
          label="Remember me"
        />
        <Link
          href="/forgot-password"
          className="text-sub-text text-xs underline"
        >
          Forgot Password?
        </Link>
      </div>

      <CustomButton
        type="submit"
        variant="primary"
        className="w-full mt-4"
        disabled={loading}
      >
        {loading ? <span className="loader" /> : "Log in"}
      </CustomButton>
    </form>
  );
}
