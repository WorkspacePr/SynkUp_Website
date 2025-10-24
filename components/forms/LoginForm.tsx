"use client";

import React from "react";
import TextInput from "@/components/ui/TextInput";
import CustomButton from "@/components/ui/CustomButton";
import { StyledCheckbox } from "@/components/ui/CustomCheckbox";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [remember, setRemember] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, remember });
    // 🔐 send to your API here

    router.push("/two-factor");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
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

      <CustomButton type="submit" variant="primary" className="w-full mt-4">
        Log in
      </CustomButton>
    </form>
  );
}
