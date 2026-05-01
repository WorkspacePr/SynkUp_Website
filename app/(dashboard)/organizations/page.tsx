"use client";

import { useRouter } from "next/navigation";
import { Search, Filter, Plus } from "lucide-react";
import OrganizationActions from "./components/OrganizationActions";
import { useEffect, useState } from "react";
import { useToast } from "@/components/common/ToastProvider";
import { useAuthedFetch } from "@/lib/use-authed-fetch";
import { extractErrorMessage } from "@/lib/error-utils";

export default function OrganizationsPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const authedFetch = useAuthedFetch();

  interface OrganizationRow {
    organization_id?: number | string;
    id?: number | string;
    name?: string;
    subdomain?: string;
    status?: string;
    plan?: string;
  }

  const [organizations, setOrganizations] = useState<OrganizationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");

  // Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchOrganizations(1, search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    fetchOrganizations(page);
  }, [page]);

  const fetchOrganizations = async (pageNumber = 1, searchTerm = "") => {
    setLoading(true);
    setError(null);

    try {
      const res = await authedFetch(
        `/api/dashboard/organizations?page=${pageNumber}&search=${searchTerm}`,
      );

      if (!res) {
        return;
      }

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(
          extractErrorMessage(errData) || "Failed to fetch organizations",
        );
      }

      const data = await res.json();

      setOrganizations(data.results || []);
      setCount(data.count || 0);
    } catch (err: unknown) {
      const message = extractErrorMessage(err) || "Something went wrong";
      setError(message);
      showToast(message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(count / 10); // Adjust if backend page size differs

  const statusStyles: Record<string, string> = {
    active: "text-green-600",
    pending: "text-yellow-600",
    trial: "text-blue-600",
    suspended: "text-gray-600",
    inactive: "text-red-600",
  };

  console.log(organizations);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Organizations</h1>

        <button
          onClick={() => router.push("/organizations/add-new")}
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {/* Card */}
      <div className="relative bg-white rounded-2xl shadow-sm p-6">
        {/* Top Controls */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-gray-700">Organization List</h2>

          <div className="flex items-center gap-6">
            {/* Search */}
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg w-64">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-black bg-transparent outline-none text-sm ml-2 w-full"
              />
            </div>

            {/* Filter */}
            <Filter className="text-gray-500 cursor-pointer" size={18} />

            {/* Date Filters */}
            <div className="flex items-center gap-4 text-sm">
              <button className="text-teal-600 font-medium">Month</button>
              <button className="text-gray-500 hover:text-gray-800">
                Year
              </button>
              <button className="text-gray-500 hover:text-gray-800">
                All Time
              </button>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12 text-gray-500">
            Loading organizations...
          </div>
        )}

        {/* Empty State */}
        {!loading && organizations.length === 0 && !error && (
          <div className="text-center py-12 text-gray-500">
            No organizations found.
          </div>
        )}

        {/* Table */}
        {!loading && organizations.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-bd-primary">
                    <th className="py-3 font-medium text-gray-500">
                      Organization Name
                    </th>
                    <th className="py-3 font-medium text-gray-500">
                      Subdomain
                    </th>
                    <th className="py-3 font-medium text-gray-500">Status</th>
                    <th className="py-3 font-medium text-gray-500">Plan</th>
                    <th className="py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bd-primary">
                  {organizations.map((org, index) => {
                    const statusKey = org.status?.toLowerCase() || "";
                    const statusClass =
                      statusStyles[statusKey] || "text-gray-600";
                    return (
                      <tr
                        key={org.organization_id ?? org.id ?? index}
                        className="border-b last:border-none hover:bg-gray-50 transition"
                      >
                        <td className="py-4 font-medium text-gray-800">
                          {org.name}
                        </td>
                        <td className="py-4 text-gray-600">
                          {org.subdomain}/synkup.com
                        </td>
                        <td
                          className={`py-4 font-medium capitalize ${statusClass}`}
                        >
                          {org.status}
                        </td>
                        <td className="py-4 text-gray-700 capitalize">
                          {org.plan ? org.plan : "None"}
                        </td>
                        <td className="py-4">
                          <div className="flex items-center justify-end gap-4 text-gray-500">
                            <OrganizationActions
                              org={org}
                              onRefresh={() => fetchOrganizations(page, search)}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-end gap-2 mt-6 text-sm">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-40"
                >
                  ‹
                </button>

                <span className="px-4 text-gray-600">
                  Page {page} of {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-40"
                >
                  ›
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
