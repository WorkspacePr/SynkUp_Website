"use client";

import React from "react";
import TextInput from "@/components/ui/TextInput";
import CustomButton from "@/components/ui/CustomButton";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email });
    // 🔐 send to your API here

    router.push("/password-changed");
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <CustomButton type="submit" variant="primary" className="w-full mt-4">
        Change password
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
