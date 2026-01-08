import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DailyActiveUsersChart() {
  const data = [
    { day: "Sunday", users: 1150 },
    { day: "Monday", users: 450 },
    { day: "Tuesday", users: 1230 },
    { day: "Wednesday", users: 580 },
    { day: "Thursday", users: 1480 },
    { day: "Friday", users: 920 },
    { day: "Saturday", users: 460 },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-lg">
          <p className="text-xs text-gray-500">{payload[0].payload.day}</p>
          <p className="text-sm font-bold text-gray-900">
            {payload[0].value} users
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="my-4 w-full">
      <div className="bg-foreground rounded-2xl p-8 shadow-lg w-full max-w-7xl">
        <h1 className="text-2xl font-bold text-center mb-8">
          DAILY ACTIVE USERS
        </h1>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f0f0f0"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 14 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 14 }}
              domain={[0, 1750]}
              ticks={[250, 500, 750, 1000, 1250, 1500, 1750]}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#e5e7eb", strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#0D9488"
              strokeWidth={3}
              dot={{ fill: "#0D9488", r: 5 }}
              activeDot={{ r: 7, fill: "#0D9488" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
