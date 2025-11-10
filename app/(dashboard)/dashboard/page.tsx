"use client";

import { useAuth } from "@/lib/auth-context";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="p-8 bg-background text-gray-800 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

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
