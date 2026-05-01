"use client";

import { useRouter } from "next/navigation";
import OrganizationForm, {
  OrganizationFormData,
} from "@/components/forms/OrganizationForm";
import { useToast } from "@/components/common/ToastProvider";
import { useAuthedFetch } from "@/lib/use-authed-fetch";
import { extractErrorMessage } from "@/lib/error-utils";
import { useState } from "react";

export default function AddOrganizationPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const authedFetch = useAuthedFetch();
  const [saving, setSaving] = useState(false);

  const handleCreate = async (data: OrganizationFormData) => {
    setSaving(true);
    try {
      const payload: Record<string, unknown> = { ...data };

      if ("organization_name" in payload && !("name" in payload)) {
        payload.name = payload.organization_name;
        delete payload.organization_name;
      }

      if ("confirm_password" in payload && !("password_confirm" in payload)) {
        payload.password_confirm = payload.confirm_password;
        delete payload.confirm_password;
      }

      const res = await authedFetch("/api/dashboard/organizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res) {
        return;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        const detail = extractErrorMessage(errData);
        throw new Error(detail || "Failed to create organization");
      }

      const response = await res.json();
      console.log("Created:", response);
      showToast("Organization created successfully.", {
        variant: "success",
      });

      router.push("/organizations");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      console.error("Error:", error);
      showToast(message, { variant: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <OrganizationForm mode="create" onSubmit={handleCreate} saving={saving} />
  );
}
