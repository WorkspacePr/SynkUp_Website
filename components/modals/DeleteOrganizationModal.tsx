"use client";

import { AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function DeleteOrganizationModal({
  organizationName,
  onClose,
  onConfirm,
  isLoading = false,
}: {
  organizationName: string | undefined;
  onClose: () => void;
  onConfirm: (reason?: string) => void | Promise<void>;
  isLoading?: boolean;
}) {
  const [reason, setReason] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-2xl shadow-2xl p-8 text-center">
        {/* Icon */}
        <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={24} />
        </div>

        <h2 className="text-xl font-semibold mb-2">Are you sure?</h2>

        <p className="text-sm text-gray-500 mb-6">
          This action cannot be undone. All values associated with{" "}
          <span className="font-medium">{organizationName}</span> will be lost.
        </p>

        {/* Reason Select */}
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-4 text-sm"
        >
          <option value="">Reason</option>
          <option value="inactive">Inactive</option>
          <option value="duplicate">Duplicate</option>
          <option value="request">Requested deletion</option>
        </select>

        {/* Buttons */}
        <button
          onClick={() => onConfirm(reason || undefined)}
          disabled={isLoading}
          className="w-full bg-red-600 text-white py-2 rounded-lg mb-3 hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Deleting..." : "Delete field"}
        </button>

        <button
          onClick={onClose}
          disabled={isLoading}
          className="w-full border py-2 rounded-lg hover:bg-gray-100 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
