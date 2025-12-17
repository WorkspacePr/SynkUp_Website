"use client";

import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";

const activities = [
  {
    time: "9:48 AM",
    message: 'Chapel Attendance synced successfully for Thursday service',
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
    time: "8:64 AM",
    message: "Attendance report generated for NHPC",
    status: "INFO",
    category: "REPORTS",
  },
  {
    time: "8:42 AM",
    message: 'Admin "Chindu O." updated access roles for 4 accounts',
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
    message: "WARNING: Low response rate from Benson Idahosa University terminals",
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

const statusStyles = {
  SUCCESS: "text-green-600 bg-green-50",
  ERROR: "text-red-600 bg-red-50",
  INFO: "text-blue-600 bg-blue-50",
  WARNING: "text-orange-600 bg-orange-50",
};

const categoryStyles = {
  ATTENDANCE: "text-purple-600 bg-purple-50",
  USER: "text-blue-600 bg-blue-50",
  SYSTEM: "text-gray-600 bg-gray-50",
  REPORTS: "text-indigo-600 bg-indigo-50",
  NETWORK: "text-orange-600 bg-orange-50",
  NOTIFICATION: "text-cyan-600 bg-cyan-50",
};

export default function RecentActivities() {
  return (
    <div className="bg-foreground rounded-xl p-6 shadow-sm border border-bd-primary">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-header">Recent Activities</h2>
        <Link href="/activities" className="text-sm font-semibold text-primary hover:underline">
          View all
        </Link>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border border-bd-primary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-input-bg text-input-text placeholder:text-icon-grey"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-bd-primary bg-background">
              <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text uppercase tracking-wider">
                Time
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text uppercase tracking-wider">
                Messages
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text uppercase tracking-wider">
                Category
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-sub-text uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bd-primary">
            {activities.map((activity, index) => (
              <tr key={index} className="hover:bg-background/50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-header whitespace-nowrap">
                  {activity.time}
                </td>
                <td className="px-4 py-3 text-sm text-sub-text max-w-md">
                  {activity.message}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold ${
                      statusStyles[activity.status as keyof typeof statusStyles]
                    }`}
                  >
                    {activity.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold ${
                      categoryStyles[activity.category as keyof typeof categoryStyles]
                    }`}
                  >
                    {activity.category}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
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

      {/* Download Button */}
      <div className="mt-4 flex items-center gap-4">
        <button className="p-2 hover:bg-background rounded-lg transition-colors">
          <svg
            className="w-5 h-5 text-icon-grey"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
        <button className="p-2 hover:bg-background rounded-lg transition-colors">
          <svg
            className="w-5 h-5 text-icon-grey"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}