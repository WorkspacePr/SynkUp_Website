"use client";

import React from "react";
import TextInput from "@/components/ui/TextInput";
import CustomButton from "@/components/ui/CustomButton";
import Link from "next/link";
import BackIcon from "@/assests/icons/svg/BackIcon";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {
  const [email, setEmail] = React.useState("");
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email });
    // 🔐 send to your API here
    
    router.push("/reset-password");
  };

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
            <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z" />
            <path d="M20 21a8 8 0 1 0-16 0" />
          </svg>
        }
      />

      <CustomButton type="submit" variant="primary" className="w-full mt-4">
        Send reset link
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
