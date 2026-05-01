"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/components/common/ToastProvider";
import { useAuth } from "@/lib/auth-context";

export function useAuthedFetch() {
  const router = useRouter();
  const { showToast } = useToast();
  const { logout } = useAuth();

  const handleUnauthorized = () => {
    showToast("Session expired — please log in again.", {
      variant: "error",
    });
    logout().catch(() => {
      router.push("/login");
    });
  };

  return async function authedFetch(
    input: RequestInfo | URL,
    init?: RequestInit,
  ) {
    const res = await fetch(input, init);
    if (res.status === 401) {
      handleUnauthorized();
      return null;
    }
    return res;
  };
}
