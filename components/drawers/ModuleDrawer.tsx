"use client";

import { X } from "lucide-react";
import { useState } from "react";

export default function ModuleDrawer({ module, onClose }: any) {
  const [tab, setTab] = useState("overview");

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="ml-auto w-[520px] bg-white h-full p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">{module.name}</h2>
            <p className="text-sm text-gray-500">
              Attendance Infrastructure Module
            </p>
          </div>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 text-sm">
          {["overview", "plan", "dependencies", "settings"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1 rounded ${
                tab === t ? "bg-green-200" : "bg-gray-100"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* CONTENT */}

        {tab === "overview" && (
          <div>
            <p className="text-sm text-gray-600 mb-4">
              {module.description || "No description"}
            </p>

            <h4 className="font-semibold mb-2">Capabilities</h4>
            <ul className="text-sm text-gray-600 list-disc pl-5">
              <li>QR Code Generation</li>
              <li>Attendance Validation</li>
            </ul>
          </div>
        )}

        {tab === "plan" && (
          <div className="space-y-3 text-sm">
            {["starter", "professional", "enterprise"].map((plan) => (
              <div
                key={plan}
                className="flex justify-between bg-gray-50 p-3 rounded"
              >
                <span className="capitalize">{plan}</span>
                <span className="text-green-600">Enabled</span>
              </div>
            ))}
          </div>
        )}

        {tab === "dependencies" && (
          <div>
            <h4 className="font-semibold mb-2">Dependencies</h4>
            <ul className="text-sm text-gray-600 list-disc pl-5">
              {module.dependencies?.map((d: string) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        )}

        {tab === "settings" && (
          <div className="space-y-4 text-sm">
            <div>
              <label>QR Refresh Interval</label>
              <input className="border p-2 w-full rounded mt-1" />
            </div>

            <div>
              <label>Validation Timeout</label>
              <input className="border p-2 w-full rounded mt-1" />
            </div>

            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
