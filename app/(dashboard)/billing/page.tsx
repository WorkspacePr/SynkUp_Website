"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, Eye, Download, MoreVertical } from "lucide-react";
import StatsCard from "@/components/bars/Statscard";
import FilterButtons from "@/components/bars/Filterbuttons";

const organizations = [
  { name: "CFI Benin", plan: "Enterprise", users: 418, lastPayment: "Oct 22, 2025", amount: "150,000", status: "Paid", nextDue: "Nov 22, 2025" },
  { name: "Harvesters Church", plan: "Pro", users: 267, lastPayment: "Oct 10, 2025", amount: "50,000", status: "Pending", nextDue: "Nov 10, 2025" },
  { name: "BLW Campus Ministry", plan: "Enterprise", users: 114, lastPayment: "Sep 30, 2025", amount: "150,000", status: "Paid", nextDue: "Oct 30, 2025" },
  { name: "NNPC", plan: "Enterprise", users: 1362, lastPayment: "Oct 19, 2025", amount: "150,000", status: "Paid", nextDue: "Nov 19, 2025" },
  { name: "Nigerian Breweries PLC", plan: "Enterprise", users: 1205, lastPayment: "Oct 25, 2025", amount: "150,000", status: "Pending", nextDue: "Nov 25, 2025" },
  { name: "Benson Idahosa University", plan: "Enterprise", users: 2943, lastPayment: "Oct 18, 2025", amount: "150,000", status: "Overdue", nextDue: "Nov 18, 2025" },
  { name: "Landmark University", plan: "Pro", users: 431, lastPayment: "Sep 28, 2025", amount: "50,000", status: "Paid", nextDue: "Oct 28, 2025" },
  { name: "Rhema Campus Hub", plan: "Free", users: 98, lastPayment: "Oct 23, 2025", amount: "0", status: "Paid", nextDue: "Nov 23, 2025" },
  { name: "Unilever", plan: "Enterprise", users: 1552, lastPayment: "Oct 06, 2025", amount: "150,000", status: "Pending", nextDue: "Nov 06, 2025" },
];

const tabs = [
  { label: "Organizations", path: "/billing" },
  { label: "Subscription", path: "/billing/subscription" },
  { label: "Settings", path: "/billing/settings" },
  { label: "Report", path: "/billing/report" },
];

const planFilters = ["ALL", "PENDING", "PAID", "OVERDUE"];

const statusStyles = {
  Paid: "text-green-700 bg-green-50",
  Pending: "text-orange-700 bg-orange-50",
  Overdue: "text-red-700 bg-red-50",
};

export default function BillingOrganizationsPage() {
  const router = useRouter();
  const [activePlan, setActivePlan] = useState("ALL");

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
              tab.path === "/billing"
                ? "text-primary"
                : "text-sub-text hover:text-header"
            }`}
          >
            {tab.label}
            {tab.path === "/billing" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <StatsCard
          value="57"
          label="Organizations&#10;Registered"
          emoji="🏢"
          bgColor="bg-green-200"
        />
        <StatsCard
          value="176"
          label="Active&#10;Subscriptions"
          emoji="📈"
          bgColor="bg-gray-200"
        />
        <StatsCard
          value="25"
          label="Overdue&#10;Billings"
          emoji="🔄"
          bgColor="bg-gray-200"
        />
        <StatsCard
          value="5,325,000"
          label="Total&#10;Billed(₦)"
          emoji="💵"
          bgColor="bg-gray-200"
        />
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
            activeFilter={activePlan}
            onFilterChange={setActivePlan}
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
                  Last Payment
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text">
                  Amount (₦)
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text">
                  Next Due
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
                    {org.lastPayment}
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
                  <td className="px-4 py-4 text-sm text-sub-text">
                    {org.nextDue}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-background rounded transition-colors">
                        <Eye className="w-4 h-4 text-icon-grey" />
                      </button>
                      <button className="p-1.5 hover:bg-background rounded transition-colors">
                        <Download className="w-4 h-4 text-icon-grey" />
                      </button>
                      <button className="p-1.5 hover:bg-background rounded transition-colors">
                        <MoreVertical className="w-4 h-4 text-icon-grey" />
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