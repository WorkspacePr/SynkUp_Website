"use client";

import ViewOrganizationDrawer from "@/components/drawers/ViewOrganizationDrawer";
import DeleteOrganizationModal from "@/components/modals/DeleteOrganizationModal";
import SuspendOrganizationModal from "@/components/modals/SuspendModal";
import { Eye, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/common/ToastProvider";
import { useAuthedFetch } from "@/lib/use-authed-fetch";
import { extractErrorMessage } from "@/lib/error-utils";

interface OrganizationRow {
  organization_id?: number | string;
  id?: number | string;
  name?: string;
  subdomain?: string;
  status?: string;
  plan?: string;
}

interface OrganizationActionsProps {
  org: OrganizationRow;
  onRefresh?: () => void;
}

export default function OrganizationActions({
  org,
  onRefresh,
}: OrganizationActionsProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const authedFetch = useAuthedFetch();
  const [openMenu, setOpenMenu] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showSuspend, setShowSuspend] = useState(false);
  const [showView, setShowView] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSuspending, setIsSuspending] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<any>(null);

  const orgId = org.organization_id ?? org.id;
  const isSuspended = (org.status ?? "").toLowerCase() === "suspended";

  const handleDelete = async (reason?: string) => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      const res = await authedFetch(`/api/dashboard/organizations/${orgId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: reason ? JSON.stringify({ reason }) : null,
      });

      if (!res) {
        return;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(
          extractErrorMessage(errData) || "Failed to delete organization",
        );
      }

      showToast("Organization deleted.", { variant: "success" });
      setShowDelete(false);
      onRefresh?.();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete organization";
      showToast(message, { variant: "error" });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSuspend = async (reason?: string) => {
    if (isSuspending) return;
    setIsSuspending(true);
    try {
      const res = await authedFetch(
        `/api/dashboard/organizations/${orgId}/suspend`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: reason ? JSON.stringify({ reason }) : null,
        },
      );

      if (!res) {
        return;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(
          extractErrorMessage(errData) || "Failed to suspend organization",
        );
      }

      showToast("Organization suspended.", { variant: "success" });
      setShowSuspend(false);
      onRefresh?.();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to suspend organization";
      showToast(message, { variant: "error" });
    } finally {
      setIsSuspending(false);
    }
  };

  const handleReactivate = async () => {
    if (isSuspending) return;
    setIsSuspending(true);
    try {
      const res = await authedFetch(
        `/api/dashboard/organizations/${orgId}/reactivate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: null,
        },
      );

      if (!res) {
        return;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(
          extractErrorMessage(errData) || "Failed to reactivate organization",
        );
      }

      showToast("Organization reactivated.", { variant: "success" });
      onRefresh?.();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to reactivate organization";
      showToast(message, { variant: "error" });
    } finally {
      setIsSuspending(false);
    }
  };

  const handleView = async () => {
    if (!orgId) {
      showToast("Missing organization id.", { variant: "error" });
      return;
    }
    setShowView(true)

    try {
      const res = await authedFetch(
        `/api/dashboard/organizations/${orgId}`,
      );

      if (!res) {
        return;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(
          extractErrorMessage(errData) ||
            "Failed to fetch organization details",
        );
      }

      const payload = await res.json().catch(() => ({}));
      setSelectedOrganization(payload?.data ?? payload ?? org);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to fetch organization details";
      showToast(message, { variant: "error" });
      setSelectedOrganization(org);
    } finally {
      setOpenMenu(false);
    }
  };

  return (
    <div className="">
      {/* Eye Button */}
      <button
        onClick={handleView}
      >
        <Eye size={18} className="cursor-pointer hover:text-gray-800" />
      </button>
      {/* More Button */}
      <button
        onClick={() => setOpenMenu(!openMenu)}
        className="p-2 hover:bg-gray-100 rounded-lg"
      >
        <MoreVertical size={18} />
      </button>

      {/* Dropdown */}
      {openMenu && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl p-4 z-50 space-y-4">
          <button
            onClick={() => router.push(`/organizations/${orgId}/edit`)}
            className="block w-full text-left hover:text-teal-600"
          >
            Update
          </button>

          {isSuspended ? (
            <button
              onClick={() => {
                handleReactivate();
                setOpenMenu(false);
              }}
              disabled={isSuspending}
              className="block w-full text-left hover:text-green-600 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSuspending ? "Reactivating..." : "Reactivate"}
            </button>
          ) : (
            <button
              onClick={() => {
                setShowSuspend(true);
                setOpenMenu(false);
              }}
              className="block w-full text-left hover:text-yellow-600"
            >
              Suspend
            </button>
          )}

          <button
            onClick={() => {
              setShowDelete(true);
              setOpenMenu(false);
            }}
            className="block w-full text-left text-red-600 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      )}

      {showDelete && (
        <DeleteOrganizationModal
          organizationName={org.name}
          onClose={() => setShowDelete(false)}
          onConfirm={handleDelete}
          isLoading={isDeleting}
        />
      )}

      {showSuspend && (
        <SuspendOrganizationModal
          organizationName={org.name}
          onClose={() => setShowSuspend(false)}
          onConfirm={handleSuspend}
          isLoading={isSuspending}
        />
      )}

      {showView && (
        <ViewOrganizationDrawer
          organization={selectedOrganization}
          onClose={() => {
            setShowView(false);
            setSelectedOrganization(null);
          }}
        />
      )}
    </div>
  );
}
