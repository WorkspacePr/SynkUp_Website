"use client";

import OrganizationForm, {
  OrganizationFormData,
} from "@/components/forms/OrganizationForm";
import { useAuthedFetch } from "@/lib/use-authed-fetch";
import { useToast } from "@/components/common/ToastProvider";
import { extractErrorMessage } from "@/lib/error-utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { mapOrganizationToForm } from "@/lib/mappers/organization";

export default function EditOrganizationPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const orgId = params?.id;
  const { showToast } = useToast();
  const authedFetch = useAuthedFetch();
  const [initialData, setInitialData] = useState<OrganizationFormData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchOrganization = async () => {
      if (!orgId) return;
      setLoading(true);
      try {
        const res = await authedFetch(`/api/dashboard/organizations/${orgId}`);
        if (!res) return;
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(
            extractErrorMessage(errData) || "Failed to fetch organization",
          );
        }

        const data = await res.json();

        setInitialData(mapOrganizationToForm(data));
      } catch (error) {
        const message =
          extractErrorMessage(error) || "Failed to fetch organization";
        showToast(message, { variant: "error" });
        router.push("/organizations");
      } finally {
        setLoading(false);
      }
    };

    fetchOrganization();
  }, [orgId, authedFetch, showToast, router]);

  const handleUpdate = async (data: OrganizationFormData) => {
    if (!orgId) return;
    setSaving(true);
    try {
      const payload: Record<string, unknown> = { ...data };

      if ("organization_name" in payload && !("name" in payload)) {
        payload.name = payload.organization_name;
        delete payload.organization_name;
      }

      if (!payload.password) {
        delete payload.password;
      }

      if (!payload.confirm_password) {
        delete payload.confirm_password;
      } else if (!("password_confirm" in payload)) {
        payload.password_confirm = payload.confirm_password;
      }

      delete payload.confirm_password;

      const res = await authedFetch(`/api/dashboard/organizations/${orgId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res) return;

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(
          extractErrorMessage(errData) || "Failed to update organization",
        );
      }

      showToast("Organization updated successfully.", {
        variant: "success",
      });
      router.push("/organizations");
    } catch (error) {
      const message =
        extractErrorMessage(error) || "Failed to update organization";
      showToast(message, { variant: "error" });
    } finally {
      setSaving(true);
    }
  };

  if (loading) {
    return (
      <div className="p-8 bg-gray-100 min-h-screen text-gray-500">
        Loading organization...
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="p-8 bg-gray-100 min-h-screen text-gray-500">
        Organization not found.
      </div>
    );
  }

  return (
    <OrganizationForm
      mode="edit"
      initialData={initialData}
      onSubmit={handleUpdate}
      saving={saving}
    />
  );
}
