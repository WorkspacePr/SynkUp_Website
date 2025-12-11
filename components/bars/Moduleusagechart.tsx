"use client";

import { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

export default function ModuleUsageChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [
          "Attendance Tracking",
          "Reports & Analytics",
          "User Management",
          "Notifications",
          "Settings",
        ],
        datasets: [
          {
            data: [52, 20, 15, 8, 5],
            backgroundColor: [
              "#3b82f6", // Blue
              "#ef4444", // Red
              "#9ca3af", // Gray
              "#fbbf24", // Yellow
              "#10b981", // Green
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            padding: 12,
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "#374151",
            borderWidth: 1,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-foreground rounded-xl p-6 shadow-sm border border-bd-primary">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-header uppercase tracking-wide">
          Module Usage (%)
        </h3>
        <select className="text-xs border border-bd-primary rounded-md px-3 py-1.5 text-input-text bg-input-bg focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option>October</option>
          <option>November</option>
          <option>December</option>
        </select>
      </div>

      <div className="relative h-64 mb-4">
        <canvas ref={chartRef}></canvas>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-[#3b82f6]"></div>
          <span className="text-sub-text">Attendance Tracking</span>
          <span className="font-semibold text-header">52%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-[#ef4444]"></div>
          <span className="text-sub-text">Reports & Analytics</span>
          <span className="font-semibold text-header">20%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-[#9ca3af]"></div>
          <span className="text-sub-text">User Management</span>
          <span className="font-semibold text-header">15%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-[#fbbf24]"></div>
          <span className="text-sub-text">Notifications</span>
          <span className="font-semibold text-header">8%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-[#10b981]"></div>
          <span className="text-sub-text">Settings</span>
          <span className="font-semibold text-header">5%</span>
        </div>
      </div>
    </div>
  );
}