"use client";

import { ReactNode } from "react";

interface Column {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
}

interface BillingTableProps {
  columns: Column[];
  data: any[];
  renderRow: (item: any, index: number) => ReactNode;
}

export default function BillingTable({ columns, data, renderRow }: BillingTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-bd-primary bg-background/50">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-3 text-xs font-semibold text-sub-text uppercase tracking-wide ${
                  column.align === "right" ? "text-right" : 
                  column.align === "center" ? "text-center" : "text-left"
                }`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-bd-primary">
          {data.map((item, index) => renderRow(item, index))}
        </tbody>
      </table>
    </div>
  );
}