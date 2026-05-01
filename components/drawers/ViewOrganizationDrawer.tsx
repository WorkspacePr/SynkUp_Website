"use client";

import { X } from "lucide-react";
import StatusBadge from "../ui/StatusBadge";

export default function ViewOrganizationDrawer({ organization, onClose }: any) {
  console.log(organization);
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Drawer */}
      <div className="relative ml-auto w-[520px] bg-white h-full shadow-2xl p-8 overflow-y-auto">
        {!organization ? (
          <div className="flex items-center justify-center">
            <p>Loading organization...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-3">
                  {organization.organizational_info?.name || "-"}

                  <StatusBadge status={organization.status || "Active"} />
                </h2>
              </div>

              <button onClick={onClose}>
                <X />
              </button>
            </div>

            {/* Sections */}
            <div className="space-y-6">
              <InfoCard title="Organizational Information">
                <InfoRow
                  label="Official Email"
                  value={organization.organizational_info.official_email || "-"}
                />
                <InfoRow
                  label="Organization Type"
                  value={
                    organization.organizational_info.organization_type || "-"
                  }
                />
                <InfoRow
                  label="Industry Sector"
                  value={
                    organization.organizational_info.industry_sector || "-"
                  }
                />
                <InfoRow
                  label="Country"
                  value={organization.organizational_info.country || "-"}
                />
              </InfoCard>

              <InfoCard title="Admin Information">
                <InfoRow
                  label="Admin username"
                  value={organization.admin_info.username}
                />
                <InfoRow
                  label="Account status"
                  value={organization.admin_info.account_status}
                />
                <InfoRow
                  label="Access level"
                  value={organization.admin_info.access_level}
                />
              </InfoCard>

              <InfoCard title="Billing Information">
                <InfoRow label="Plan" 
                  value={organization.billing_info.plan} />
                <InfoRow label="Amount" value={organization.billing_info.amount_monthly} />
                <InfoRow label="Next due date" value={organization.billing_info.next_due_date} />
              </InfoCard>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function InfoCard({ title, children }: any) {
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: any) {
  return (
    <div className="flex justify-between text-sm capitalize">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
