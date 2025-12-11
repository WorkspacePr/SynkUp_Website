"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const tabs = [
  { label: "Organizations", path: "/billing" },
  { label: "Subscription", path: "/billing/subscription" },
  { label: "Settings", path: "/billing/settings" },
  { label: "Report", path: "/billing/report" },
];

export default function BillingSettingsPage() {
  const router = useRouter();
  const [applyTaxAutomatically, setApplyTaxAutomatically] = useState(true);
  const [sendPaymentReminders, setSendPaymentReminders] = useState(true);
  const [sendOverdueAlerts, setSendOverdueAlerts] = useState(true);
  const [sandboxMode, setSandboxMode] = useState(false);

  const handleTabChange = (path: string) => {
    router.push(path);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-header mb-6">Billing</h1>

      {/* Tabs */}
      <div className="flex items-center gap-8 mb-8 border-b border-bd-primary">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => handleTabChange(tab.path)}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              tab.path === "/billing/settings"
                ? "text-primary"
                : "text-sub-text hover:text-header"
            }`}
          >
            {tab.label}
            {tab.path === "/billing/settings" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Settings Form */}
      <div className="max-w-2xl space-y-6">
        {/* Currency */}
        <div className="bg-foreground rounded-xl p-6 border border-bd-primary">
          <label className="block text-sm font-semibold text-header mb-3">
            Currency
          </label>
          <select className="w-full px-4 py-3 border border-bd-primary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-input-bg text-input-text">
            <option>₦ NGN</option>
            <option>$ USD</option>
            <option>£ GBP</option>
            <option>€ EUR</option>
          </select>
        </div>

        {/* Billing Cycle */}
        <div className="bg-foreground rounded-xl p-6 border border-bd-primary">
          <label className="block text-sm font-semibold text-header mb-3">
            Billing Cycle
          </label>
          <select className="w-full px-4 py-3 border border-bd-primary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-input-bg text-input-text">
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Yearly</option>
          </select>
        </div>

        {/* Invoice Due Period */}
        <div className="bg-foreground rounded-xl p-6 border border-bd-primary">
          <label className="block text-sm font-semibold text-header mb-3">
            Invoice Due Period
          </label>
          <select className="w-full px-4 py-3 border border-bd-primary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-input-bg text-input-text">
            <option>7 Days</option>
            <option>14 Days</option>
            <option>30 Days</option>
            <option>60 Days</option>
          </select>
        </div>

        {/* Tax Rate */}
        <div className="bg-foreground rounded-xl p-6 border border-bd-primary">
          <label className="block text-sm font-semibold text-header mb-3">
            Tax Rate (%)
          </label>
          <select className="w-full px-4 py-3 border border-bd-primary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-input-bg text-input-text mb-3">
            <option>7.5</option>
            <option>5.0</option>
            <option>10.0</option>
            <option>15.0</option>
          </select>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={applyTaxAutomatically}
              onChange={(e) => setApplyTaxAutomatically(e.target.checked)}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="text-sm text-sub-text">Apply tax automatically to all invoices</span>
          </label>
        </div>

        {/* Payment Gateway Settings */}
        <div className="bg-foreground rounded-xl p-6 border border-bd-primary">
          <h3 className="text-lg font-semibold text-header mb-4">Payment Gateway Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-header mb-3">
                Select Gateway
              </label>
              <select className="w-full px-4 py-3 border border-bd-primary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-input-bg text-input-text">
                <option>Flutterwave</option>
                <option>Paystack</option>
                <option>Stripe</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-header mb-3">
                Public Key
              </label>
              <input
                type="password"
                value="****************"
                readOnly
                className="w-full px-4 py-3 border border-bd-primary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-input-bg text-input-text"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-header mb-3">
                Secret Key
              </label>
              <input
                type="password"
                value="****************"
                readOnly
                className="w-full px-4 py-3 border border-bd-primary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-input-bg text-input-text"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-header mb-3">
                Website URL
              </label>
              <input
                type="url"
                value="https://synkup.com/api/webhook"
                readOnly
                className="w-full px-4 py-3 border border-bd-primary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-input-bg text-input-text"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={sandboxMode}
                onChange={(e) => setSandboxMode(e.target.checked)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm text-sub-text">Enable Sandbox Mode</span>
            </label>

            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sub-text">STATUS: All billing settings up to date</span>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-foreground rounded-xl p-6 border border-bd-primary">
          <h3 className="text-lg font-semibold text-header mb-4">Notification Settings</h3>
          
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={sendPaymentReminders}
                onChange={(e) => setSendPaymentReminders(e.target.checked)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm text-sub-text">Send payment reminders before due date</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={sendOverdueAlerts}
                onChange={(e) => setSendOverdueAlerts(e.target.checked)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm text-sub-text">Send overdue invoice alerts</span>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
}