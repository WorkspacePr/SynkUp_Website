"use client";
import Card from "@/components/bars/Card";
import { useAuth } from "@/lib/auth-context";
import SystemStatusCard from "@/components/bars/Systemstatuscard";
import ModuleUsageChart from "@/components/bars/Moduleusagechart";
import ActiveUsersChart from "@/components/bars/Activeuserschart";
import PercentageChart from "@/components/bars/Percentagechart";
import RecentActivities from "@/components/bars/Recentactivities";
import { Users, RefreshCw, Building2, Activity, Ban, AlertTriangle } from "lucide-react";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-header mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* System Status Card - spans 2 rows */}
        <div className="row-span-2">
          <SystemStatusCard />
        </div>

        {/* Stats Cards */}
        <Card
          value="4,287"
          label="Users Registered"
          icon={Users}
          iconColor="var(--primary)"
          iconBg="rgba(13, 148, 136, 0.1)"
        />
        <Card
          value="12,564"
          label="Logs Synced"
          icon={RefreshCw}
          iconColor="var(--primary)"
          iconBg="rgba(13, 148, 136, 0.1)"
        />
        <Card
          value="57"
          label="Organizations Registered"
          icon={Building2}
          iconColor="#FFC107"
          iconBg="rgba(255, 193, 7, 0.1)"
        />
        <Card
          value="312"
          label="Active Sessions"
          icon={Activity}
          iconColor="#4CAF50"
          iconBg="rgba(76, 175, 80, 0.1)"
        />
        <Card
          value="25"
          label="Terminated Sessions"
          icon={Ban}
          iconColor="#F44336"
          iconBg="rgba(244, 67, 54, 0.1)"
        />
        <Card
          value="2"
          label="Downtimes (Past 7 days)"
          icon={AlertTriangle}
          iconColor="#FFC107"
          iconBg="rgba(255, 193, 7, 0.1)"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        <ModuleUsageChart />
        <ActiveUsersChart />
      </div>

      {/* Percentage Chart */}
      <div className="grid grid-cols-1 mb-8">
        <PercentageChart />
      </div>

      {/* Recent Activities */}
      <RecentActivities />
    </div>
  );
}