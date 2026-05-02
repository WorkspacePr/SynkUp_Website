"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FileDown } from "lucide-react";

// Mock data for audiences - in real app, this would come from The API
const organizationAudiences = {
  "CFI Benin": [
    { name: "BIU CFI", manager: "Pst. Jane Doe + 2 Others", status: "Active" },
    { name: "UNIBEN CFI", manager: "Pst Jane Doe", status: "Active" },
    { name: "CFI HQ (Benin)", manager: "Rev John Doe", status: "Active" },
    { name: "AAU CFI", manager: "Pst. John Doe + 1 Other", status: "Inactive" },
  ],
  "Harvesters Church": [
    { name: "Main Auditorium", manager: "Pst. Sarah Smith", status: "Active" },
    { name: "Youth Ministry", manager: "Pst. Mike Johnson", status: "Active" },
    { name: "Children's Church", manager: "Sis. Mary Brown", status: "Active" },
  ],
  "NNPC": [
    { name: "Corporate HQ", manager: "Mr. Ahmed Ali", status: "Active" },
    { name: "Refinery Division", manager: "Mrs. Obi + 3 Others", status: "Active" },
    { name: "Marketing Department", manager: "Mr. Chukwu", status: "Active" },
  ],
  "Nigerian Breweries PLC": [
    { name: "Lagos Plant", manager: "Mr. Adeyemi", status: "Active" },
    { name: "Ibadan Brewery", manager: "Mrs. Okafor + 2 Others", status: "Active" },
  ],
  "Benson Idahosa University": [
    { name: "Main Campus", manager: "Dr. Emmanuel", status: "Active" },
    { name: "Faculty of Engineering", manager: "Prof. Osagie + 1 Other", status: "Active" },
    { name: "Student Affairs", manager: "Mr. Daniel", status: "Inactive" },
  ],
  // Add more organizations as needed
};

export default function BillingReportPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orgName = searchParams.get("org");

  const audiences = orgName ? organizationAudiences[orgName as keyof typeof organizationAudiences] || [] : [];

  const handleDownload = (format: string) => {
    // Implement download logic here
    console.log(`Downloading as ${format}`);
    alert(`Downloading report as ${format}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-header mb-6">Billing</h1>

      {/* Tabs */}
      <div className="flex items-center gap-8 mb-8 border-b border-bd-primary">
        <button
          onClick={() => router.push("/billing")}
          className="pb-3 text-sm font-medium text-primary transition-colors relative"
        >
          Organizations
        </button>
        <button
          onClick={() => router.push("/billing/subscription")}
          className="pb-3 text-sm font-medium text-sub-text hover:text-header transition-colors"
        >
          Subscription
        </button>
        <button
          onClick={() => router.push("/billing/settings")}
          className="pb-3 text-sm font-medium text-sub-text hover:text-header transition-colors"
        >
          Settings
        </button>
        <button
            onClick={() => router.push("/billing/report")} 
            className="pb-3 text-sm font-medium text-sub-text transition-colors hover:text-header">
          Report
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
        </button>
      </div>

      {/* Organization Title */}
      <h2 className="text-2xl font-bold text-header mb-8">{orgName || "No Organization Selected"}</h2>

      {/* Audiences Table */}
      {audiences.length > 0 ? (
        <div className="bg-foreground rounded-xl shadow-sm border border-bd-primary mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b border-bd-primary">
                <th className="text-left px-6 py-4 text-sm font-semibold text-sub-text">
                  Audience
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-sub-text">
                  Audience Manager
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-sub-text">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {audiences.map((audience, index) => (
                <tr key={index} className="border-b border-bd-primary last:border-b-0">
                  <td className="px-6 py-4 text-sm text-header">
                    {audience.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-sub-text">
                    {audience.manager}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-medium ${
                        audience.status === "Active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {audience.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-foreground rounded-xl shadow-sm border border-bd-primary p-12 text-center">
          <p className="text-sub-text">No audiences found for this organization.</p>
        </div>
      )}

      {/* Download Buttons */}
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={() => handleDownload("CSV")}
          className="flex items-center gap-3 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <FileDown className="w-5 h-5" />
          <div className="text-left">
            <div className="text-xs">CSV</div>
            <div className="text-sm">Download as CSV</div>
          </div>
        </button>

        <button
          onClick={() => handleDownload("PDF")}
          className="flex items-center gap-3 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <FileDown className="w-5 h-5" />
          <div className="text-left">
            <div className="text-xs">PDF</div>
            <div className="text-sm">Download as PDF</div>
          </div>
        </button>

        <button
          onClick={() => handleDownload("DOCX")}
          className="flex items-center gap-3 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <FileDown className="w-5 h-5" />
          <div className="text-left">
            <div className="text-xs">DOCX</div>
            <div className="text-sm">Download as DOCX</div>
          </div>
        </button>
      </div>
    </div>
  );
}