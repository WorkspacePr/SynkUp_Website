"use client";

import { useRouter } from "next/navigation";
import { FileText, Download } from "lucide-react";

const tabs = [
  { label: "Organizations", path: "/billing" },
  { label: "Subscription", path: "/billing/subscription" },
  { label: "Settings", path: "/billing/settings" },
  { label: "Report", path: "/billing/report" },
];

const sampleReports = [
  { name: "CFI Benin", plan: "Enterprise", users: 418, amount: "150,000", status: "Paid" },
  { name: "Harvesters Church", plan: "Pro", users: 267, amount: "50,000", status: "Pending" },
  { name: "BLW Campus Ministry", plan: "Enterprise", users: 114, amount: "150,000", status: "Paid" },
  { name: "Rhema Campus Hub", plan: "Free", users: 98, amount: "0", status: "Paid" },
];

export default function BillingReportPage() {
  const router = useRouter();

  const handleTabChange = (path: string) => {
    router.push(path);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-header mb-6">Billing</h1>

      {/* Tabs */}
      <div className="flex items-center gap-8 mb-8 border-b border-bd-primary">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => handleTabChange(tab.path)}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              tab.path === "/billing/report"
                ? "text-primary"
                : "text-sub-text hover:text-header"
            }`}
          >
            {tab.label}
            {tab.path === "/billing/report" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Report Generation Form */}
      <div className="max-w-2xl mb-8">
        <div className="bg-foreground rounded-xl p-6 border border-bd-primary">
          <h2 className="text-lg font-semibold text-header mb-6">Generate Billing Report</h2>
          
          <div className="space-y-4 mb-6">
            {/* Date Range */}
            <div>
              <label className="block text-sm font-semibold text-header mb-3">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-sub-text mb-2">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 border border-bd-primary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-input-bg text-input-text"
                  />
                </div>
                <div>
                  <label className="block text-xs text-sub-text mb-2">End Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 border border-bd-primary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-input-bg text-input-text"
                  />
                </div>
              </div>
            </div>

            {/* Organization */}
            <div>
              <label className="block text-sm font-semibold text-header mb-3">
                Organization
              </label>
              <select className="w-full px-4 py-3 border border-bd-primary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-input-bg text-input-text">
                <option>Select Multiple</option>
                <option>All Organizations</option>
                <option>CFI Benin</option>
                <option>Harvesters Church</option>
                <option>BLW Campus Ministry</option>
              </select>
            </div>

            {/* Plan and Status */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-header mb-3">
                  Plan
                </label>
                <select className="w-full px-4 py-3 border border-bd-primary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-input-bg text-input-text">
                  <option>Free</option>
                  <option>Pro</option>
                  <option>Enterprise</option>
                  <option>All Plans</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-header mb-3">
                  Status
                </label>
                <select className="w-full px-4 py-3 border border-bd-primary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-input-bg text-input-text">
                  <option>Pending</option>
                  <option>Paid</option>
                  <option>Overdue</option>
                  <option>All Statuses</option>
                </select>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Sample Report Preview */}
      <div className="bg-foreground rounded-xl p-6 border border-bd-primary">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-header">Report Preview</h2>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              <FileText className="w-4 h-4" />
              Download as CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              <Download className="w-4 h-4" />
              Download as PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              <Download className="w-4 h-4" />
              Download as DOCX
            </button>
          </div>
        </div>

        {/* Sample Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-bd-primary">
                <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text">
                  Organization
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text">
                  Plan
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text">
                  Users
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text">
                  Amount (₦)
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bd-primary">
              {sampleReports.map((report, index) => (
                <tr key={index} className="hover:bg-background/50 transition-colors">
                  <td className="px-4 py-4 text-sm font-medium text-header">
                    {report.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-sub-text">
                    {report.plan}
                  </td>
                  <td className="px-4 py-4 text-sm text-sub-text">
                    {report.users}
                  </td>
                  <td className="px-4 py-4 text-sm text-sub-text">
                    {report.amount}
                  </td>
                  <td className="px-4 py-4 text-sm text-sub-text">
                    {report.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}