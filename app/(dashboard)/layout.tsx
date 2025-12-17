"use client";

import { useState } from "react";
import Sidebar from "@/components/bars/Sidebar";
import Navbar from "@/components/bars/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Navbar at top - adjusts based on sidebar */}
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
      
      {/* Sidebar full height from top */}
      <Sidebar isOpen={sidebarOpen} />
      
      {/* Main Content with top padding for navbar and left margin for sidebar */}
      <main className={`pt-16 min-h-screen transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {children}
      </main>
    </div>
  );
}