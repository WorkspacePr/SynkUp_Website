"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CustomButton from "../ui/CustomButton";

export default function PasswordChangedForm() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 🔐 send to your API here

    router.push("/login");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <CustomButton type="submit" variant="primary" className="w-full mt-8">
        Back to Login
      </CustomButton>
    </form>
  );
}
