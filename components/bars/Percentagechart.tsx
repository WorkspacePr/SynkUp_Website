"use client";

import { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

export default function PercentageChart() {
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
        labels: ["Uptime 165 days", "Downtime 2 days"],
        datasets: [
          {
            data: [99, 1],
            backgroundColor: ["#3b82f6", "#ef4444"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "75%",
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
            callbacks: {
              label: function (context) {
                return context.label + ": " + context.parsed + "%";
              },
            },
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
    <div className="bg-foreground rounded-xl p-6 shadow-sm border border-bd-primary col-span-2">
      <h3 className="text-sm font-semibold text-header uppercase tracking-wide mb-6 text-center">
        Percentage
      </h3>

      <div className="relative h-64 flex items-center justify-center">
        <canvas ref={chartRef} className="max-w-xs mx-auto"></canvas>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">99%</div>
            <div className="text-xs text-sub-text">Uptime</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-6 justify-center text-xs mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-[#3b82f6]"></div>
          <span className="text-sub-text">Uptime 165 days</span>
          <span className="font-semibold text-header">99%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-[#ef4444]"></div>
          <span className="text-sub-text">Downtime 2 days</span>
          <span className="font-semibold text-header">1%</span>
        </div>
      </div>
    </div>
  );
}