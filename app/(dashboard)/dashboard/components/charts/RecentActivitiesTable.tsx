import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ExternalLink,
  Trash2,
  RefreshCw,
  Download,
} from "lucide-react";

export default function RecentActivitiesTable() {
  const [searchQuery, setSearchQuery] = useState("");

  const activities = [
    {
      time: "9:48 AM",
      message: "Chapel Attendance synced successfully for Thursday service",
      status: "SUCCESS",
      category: "ATTENDANCE",
    },
    {
      time: "9:41 AM",
      message: 'User "jane.doe" attempted login — Invalid Credentials',
      status: "ERROR",
      category: "USER",
    },
    {
      time: "9:27 AM",
      message: "18 new users registered",
      status: "SUCCESS",
      category: "USER",
    },
    {
      time: "9:15 AM",
      message: "Backup Complete — 0 warnings, 0 errors",
      status: "INFO",
      category: "SYSTEM",
    },
    {
      time: "9:03 AM",
      message: 'Module "Attendance API" slow response detected',
      status: "WARNING",
      category: "SYSTEM",
    },
    {
      time: "8:54 AM",
      message: "Attendance report generated for NNPC",
      status: "INFO",
      category: "REPORTS",
    },
    {
      time: "8:42 AM",
      message: 'Admin "Chinedu O." updated access roles for 4 accounts',
      status: "SUCCESS",
      category: "USER",
    },
    {
      time: "8:30 AM",
      message: "System rebooted after downtime",
      status: "INFO",
      category: "SYSTEM",
    },
    {
      time: "8:19 AM",
      message: 'Cell group "Cedar Cell" not synced — API Key expired',
      status: "WARNING",
      category: "ATTENDANCE",
    },
    {
      time: "8:10 AM",
      message: "Automatic cleanup of inactive sessions completed",
      status: "INFO",
      category: "SYSTEM",
    },
    {
      time: "7:55 AM",
      message:
        "WARNING: Low response rate from Benson Idahosa University terminals",
      status: "WARNING",
      category: "NETWORK",
    },
    {
      time: "7:40 AM",
      message: "Email reminders sent to various Tuesday attendees",
      status: "INFO",
      category: "NOTIFICATION",
    },
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "bg-green-50 text-green-700 border-green-200";
      case "ERROR":
        return "bg-red-50 text-red-700 border-red-200";
      case "WARNING":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "INFO":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case "ATTENDANCE":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "USER":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "SYSTEM":
        return "bg-slate-50 text-slate-700 border-slate-200";
      case "REPORTS":
        return "bg-cyan-50 text-cyan-700 border-cyan-200";
      case "NETWORK":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "NOTIFICATION":
        return "bg-pink-50 text-pink-700 border-pink-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const filteredActivities = activities.filter(
    (activity) =>
      activity.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="my-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            Recent Activities
          </h1>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            View all
          </button>
        </div>

        {/* Search Bar */}
        <div className="w-100 relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-input-bg border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Table */}
        <div className="bg-foreground rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      TIME
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      MESSAGES
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      STATUS
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      CATEGORY
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-right">
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      ACTIONS
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredActivities.map((activity, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {activity.time}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700 max-w-xl">
                        {activity.message}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusStyles(
                          activity.status
                        )}`}
                      >
                        {activity.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getCategoryStyles(
                          activity.category
                        )}`}
                      >
                        {activity.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View details"
                        >
                          <ExternalLink className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredActivities.length} of {activities.length}{" "}
              activities
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
