"use client";

import { useEffect, useState } from "react";
import { Search, Filter, Folder, Blocks, Puzzle, Link } from "lucide-react";
import { useAuthedFetch } from "@/lib/use-authed-fetch";
import { useToast } from "@/components/common/ToastProvider";
import { extractErrorMessage } from "@/lib/error-utils";
import ModuleDrawer from "@/components/drawers/ModuleDrawer";
import StatsCard from "@/components/bars/Statscard";
import { FilterDropdown } from "@/components/ui/FilterDropdown";

interface Module {
  id: string;
  name: string;
  category: string;
  type: string;
  availability: string;
  status: string;
  last_updated: string;
}

const STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "Failed", value: "failed" },
];

const CATEGORY_OPTIONS = [
  { label: "Transfer", value: "transfer" },
  { label: "Payment", value: "payment" },
  { label: "Top-up", value: "topup" },
  { label: "Withdrawal", value: "withdrawal" },
];

export default function ModulesPage() {
  const authedFetch = useAuthedFetch();
  const { showToast } = useToast();

  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState<any>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchModules(search);
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  const fetchModules = async (searchTerm = "") => {
    setLoading(true);

    try {
      //   const res = await authedFetch(
      //     `/api/dashboard/modules?search=${searchTerm}`,
      //   );
      //   if (!res.ok) {
      //     const err = await res.json();
      //     throw new Error(extractErrorMessage(err));
      //   }
      //   const data = await res.json();
      //   setModules(data.results || []);
    } catch (err: any) {
      showToast(err.message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const statusColor: Record<string, string> = {
    active: "text-green-600",
    disabled: "text-red-600",
    limited: "text-yellow-600",
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900">Module Management</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 my-6">
        <StatsCard
          label="Total Modules"
          value="16"
          bgColor="bg-green-200"
          icon={Folder}
          iconColor="black"
        />
        <StatsCard
          label="Core Modules"
          value="8"
          bgColor="bg-gray-200"
          icon={Blocks}
          iconColor="black"
        />
        <StatsCard
          label="Add-Ons"
          value="5"
          bgColor="bg-gray-200"
          icon={Puzzle}
          iconColor="black"
        />
        <StatsCard
          label="Plan-Based"
          value="3"
          bgColor="bg-gray-200"
          icon={Link}
          iconColor="black"
        />
      </div>

      {/* Table Card */}
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
          <div className="flex items-center gap-2.5 px-4 py-3">
            <FilterDropdown
              label="Status"
              options={STATUS_OPTIONS}
              selected={statusFilter}
              onSelect={setStatusFilter}
            />
            <FilterDropdown
              label="Category"
              options={CATEGORY_OPTIONS}
              selected={categoryFilter}
              onSelect={setCategoryFilter}
            />
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-center py-10 text-gray-500">Loading modules...</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-bd-primary">
                <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text">
                  Module
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text">
                  Availability
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text">
                  Type
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text">
                  Category
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text">
                  Last Updated
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text"></th>
              </tr>
            </thead>

            <tbody>
              {modules.map((mod) => (
                <tr
                  key={mod.id}
                  className="hover:bg-background/50 transition-colors"
                  onClick={() => setSelectedModule(mod)}
                >
                  <td className={`py-4 ${statusColor[mod.status]}`}>
                    ● {mod.status}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-header">
                    {mod.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-sub-text">
                    {mod.availability}
                  </td>
                  <td className="px-4 py-4 text-sm text-sub-text">
                    {mod.type}
                  </td>
                  <td className="px-4 py-4 text-sm text-sub-text">
                    {mod.category}
                  </td>
                  <td className="px-4 py-4 text-sm text-sub-text">
                    {mod.last_updated}
                  </td>
                  <td className="text-primary text-sm">View</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Drawer */}
      {selectedModule && (
        <ModuleDrawer
          module={selectedModule}
          onClose={() => setSelectedModule(null)}
        />
      )}
    </div>
  );
}
