"use client";

import { useRouter } from "next/navigation";
import { Search, Filter, Plus, Edit2, Trash2 } from "lucide-react";
import FilterButtons from "@/components/bars/Filterbuttons";

const organizations = [
  { name: "CFI Benin", plan: "Enterprise", users: 418, amount: "150,000", status: "Paid" },
  { name: "Harvesters Church", plan: "Pro", users: 267, amount: "50,000", status: "Pending" },
  { name: "BLW Campus Ministry", plan: "Enterprise", users: 114, amount: "150,000", status: "Paid" },
  { name: "NNPC", plan: "Enterprise", users: 1362, amount: "150,000", status: "Paid" },
  { name: "Nigerian Breweries PLC", plan: "Enterprise", users: 1205, amount: "150,000", status: "Pending" },
  { name: "Benson Idahosa University", plan: "Enterprise", users: 2943, amount: "150,000", status: "Overdue" },
  { name: "Landmark University", plan: "Pro", users: 431, amount: "50,000", status: "Paid" },
  { name: "Rhema Campus Hub", plan: "Free", users: 98, amount: "0", status: "Paid" },
  { name: "Unilever", plan: "Enterprise", users: 1552, amount: "150,000", status: "Pending" },
];

const tabs = [
  { label: "Organizations", path: "/billing" },
  { label: "Subscription", path: "/billing/subscription" },
  { label: "Settings", path: "/billing/settings" },
  { label: "Report", path: "/billing/report" },
];

const planFilters = ["ALL", "FREE", "PRO", "ENTERPRISE"];

const statusStyles = {
  Paid: "text-green-700 bg-green-50",
  Pending: "text-orange-700 bg-orange-50",
  Overdue: "text-red-700 bg-red-50",
};

export default function BillingSubscriptionPage() {
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
              tab.path === "/billing/subscription"
                ? "text-primary"
                : "text-sub-text hover:text-header"
            }`}
          >
            {tab.label}
            {tab.path === "/billing/subscription" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-foreground rounded-xl p-6 shadow-sm border border-bd-primary">
        <div className="flex items-center justify-between mb-6">
          {/* Search Bar */}
          <div className="flex items-center gap-3 bg-background border border-bd-primary rounded-lg px-4 py-2.5 w-96">
            <Filter className="w-4 h-4 text-icon-grey" />
            <Search className="w-4 h-4 text-icon-grey" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent border-none outline-none text-sm text-input-text placeholder:text-icon-grey w-full"
            />
          </div>

          {/* Plan Filters */}
          <FilterButtons
            filters={planFilters}
            activeFilter="ALL"
            onFilterChange={() => {}}
          />
        </div>

        {/* Table */}
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
                <th className="text-right px-4 py-3 text-xs font-semibold text-sub-text">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bd-primary">
              {organizations.map((org, index) => (
                <tr key={index} className="hover:bg-background/50 transition-colors">
                  <td className="px-4 py-4 text-sm font-medium text-header">
                    {org.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-sub-text">
                    {org.plan}
                  </td>
                  <td className="px-4 py-4 text-sm text-sub-text">
                    {org.users}
                  </td>
                  <td className="px-4 py-4 text-sm text-sub-text">
                    {org.amount}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                        statusStyles[org.status as keyof typeof statusStyles]
                      }`}
                    >
                      {org.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-background rounded transition-colors">
                        <Plus className="w-4 h-4 text-icon-grey" />
                      </button>
                      <button className="p-1.5 hover:bg-background rounded transition-colors">
                        <Edit2 className="w-4 h-4 text-icon-grey" />
                      </button>
                      <button className="p-1.5 hover:bg-background rounded transition-colors">
                        <Trash2 className="w-4 h-4 text-icon-grey" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 mt-6">
          <button className="px-3 py-1 text-sm border border-bd-primary rounded hover:bg-background transition-colors">
            «
          </button>
          <button className="px-3 py-1 text-sm border border-bd-primary rounded hover:bg-background transition-colors">
            ‹
          </button>
          <button className="px-3 py-1 text-sm bg-primary text-white rounded">1</button>
          <button className="px-3 py-1 text-sm border border-bd-primary rounded hover:bg-background transition-colors">2</button>
          <button className="px-3 py-1 text-sm border border-bd-primary rounded hover:bg-background transition-colors">3</button>
          <button className="px-3 py-1 text-sm border border-bd-primary rounded hover:bg-background transition-colors">...</button>
          <button className="px-3 py-1 text-sm border border-bd-primary rounded hover:bg-background transition-colors">
            ›
          </button>
          <button className="px-3 py-1 text-sm border border-bd-primary rounded hover:bg-background transition-colors">
            »
          </button>
        </div>
      </div>
    </div>
  );
}