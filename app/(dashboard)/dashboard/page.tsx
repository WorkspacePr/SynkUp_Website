"use client";

import { useAuth } from "@/lib/auth-context";
import SystemStatusDashboard from "./components/StatCards";
import ModuleRuntimeCharts from "./components/charts/PieChart";
import DailyActiveUsersChart from "./components/charts/BarChart";
import RecentActivitiesTable from "./components/charts/RecentActivitiesTable";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-8 px-6 bg-background text-header min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <SystemStatusDashboard />

      <ModuleRuntimeCharts />

      <DailyActiveUsersChart />

      <RecentActivitiesTable />

      <div className="bg-foreground rounded-lg shadow-sm p-6 border border-gray-200">
        <p className="text-gray-600">
          Overview of your activities, analytics, or quick links can go here.
          Use the sidebar to navigate between different sections such as
          Organizations, Billing, and Reports.
        </p>
      </div>
    </div>
  );
}
