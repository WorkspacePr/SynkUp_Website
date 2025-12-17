import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

export default function ModuleRuntimeCharts() {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  // Module Usage Data
  const moduleData = [
    { name: "Attendance Taking", value: 52, color: "#3B82F6" },
    { name: "Reports & Analytics", value: 20, color: "#F97316" },
    { name: "User Management", value: 15, color: "#9CA3AF" },
    { name: "Notifications", value: 8, color: "#FCD34D" },
  ];

  // Runtime Data
  const runtimeData = [
    { name: "System Uptime", value: 85, color: "#48bb78" },
    { name: "System Downtime", value: 15, color: "#f56565" },
  ];

  const renderCustomLabel = (text1: string, text2: string) => {
    return ({ cx, cy }: any) => (
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
        <tspan
          x={cx}
          dy="-0.5em"
          className="text-sm font-semibold fill-gray-700 dark:fill-header"
        >
          {text1}
        </tspan>
        <tspan
          x={cx}
          dy="1.2em"
          className="text-sm font-semibold fill-gray-700 dark:fill-header"
        >
          {text2}
        </tspan>
      </text>
    );
  };

  const renderModuleLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-6">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm flex-shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <div className="flex flex-col">
              <span className="text-xs text-sub-text">{entry.value}</span>
              <span className="text-sm font-semibold text-header">
                {entry.payload.value}%
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderRuntimeLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex flex-col gap-4 mt-6">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-sm flex-shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm font-medium text-sub-text">
                {entry.value}
              </span>
            </div>
            <span className="text-lg font-bold text-header">
              {entry.payload.value}%
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="my-5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          {/* Module Usage Chart */}
          <div
            className="bg-foreground rounded-2xl p-8 shadow-lg"
            onMouseMove={handleMouseMove}
          >
            <div className="flex flex-col items-center relative">
              {hoveredModule && (
                <div
                  className="fixed z-50 flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-lg pointer-events-none"
                  style={{
                    left: `${tooltipPosition.x + 10}px`,
                    top: `${tooltipPosition.y + 10}px`,
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{
                      backgroundColor: moduleData.find(
                        (m) => m.name === hoveredModule
                      )?.color,
                    }}
                  />
                  <div className="text-right">
                    <div className="text-xs text-gray-500">{hoveredModule}</div>
                    <div className="text-sm font-bold text-gray-900">
                      {moduleData.find((m) => m.name === hoveredModule)?.value}%
                    </div>
                  </div>
                </div>
              )}
              <ResponsiveContainer width="100%" height={420}>
                <PieChart>
                  <Pie
                    data={moduleData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={0}
                    dataKey="value"
                    label={renderCustomLabel("Module", "Usage (%)")}
                    labelLine={false}
                    onMouseEnter={(data: any) => setHoveredModule(data.name)}
                    onMouseLeave={() => setHoveredModule(null)}
                  >
                    {moduleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend content={renderModuleLegend} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Runtime Chart */}
          <div
            className="bg-foreground rounded-2xl p-8 shadow-lg"
            onMouseMove={handleMouseMove}
          >
            <div className="flex flex-col items-center relative">
              {hoveredSegment && (
                <div
                  className="fixed z-50 flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-lg pointer-events-none"
                  style={{
                    left: `${tooltipPosition.x + 10}px`,
                    top: `${tooltipPosition.y + 10}px`,
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{
                      backgroundColor:
                        hoveredSegment === "System Uptime"
                          ? "#14B8A6"
                          : "#EF4444",
                    }}
                  />
                  <div className="text-right">
                    <div className="text-xs text-gray-500">
                      {hoveredSegment}
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                      {hoveredSegment === "System Uptime" ? "85%" : "15%"}
                    </div>
                  </div>
                </div>
              )}
              <ResponsiveContainer width="100%" height={420}>
                <PieChart>
                  <Pie
                    data={runtimeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={90}
                    outerRadius={140}
                    paddingAngle={0}
                    dataKey="value"
                    label={renderCustomLabel("Percentage", "Runtime")}
                    labelLine={false}
                    onMouseEnter={(data: any) => setHoveredSegment(data.name)}
                    onMouseLeave={() => setHoveredSegment(null)}
                  >
                    {runtimeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend content={renderRuntimeLegend} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}