"use client";

import {
  LayoutDashboard,
  Building2,
  CreditCard,
  Layers,
  Settings,
  LogOut,
  HelpCircle,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
  { name: "Dashboard", href: "/dashboard/dashboard", icon: LayoutDashboard },
  { name: "Organizations", href: "/dashboard/organizations", icon: Building2 },
  {
    name: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
    children: [
      { name: "Organizations", href: "/dashboard/billing" },
      { name: "Subscription", href: "/dashboard/billing/subscription" },
      { name: "Settings", href: "/dashboard/billing/settings" },
      { name: "Report", href: "/dashboard/billing/report" },
    ],
  },
  { name: "Modules", href: "/dashboard/modules", icon: Layers },
  { name: "Configurations", href: "/dashboard/configurations", icon: Settings },
  {
    name: "Reports & Logs",
    href: "/dashboard/reports-logs",
    icon: ClipboardList,
  },
];

const bottomItems = [
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Support", href: "/dashboard/support", icon: HelpCircle },
  { name: "Logout", href: "/dashboard/logout", icon: LogOut },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-200 text-gray-800 flex flex-col justify-between shadow-sm">
      {/* Top section */}
      <div>
        <div className="p-6 font-bold text-xl text-blue-600">Synkup</div>

        <nav className="mt-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-6 py-2 text-sm font-medium rounded-md transition-colors",
                  active
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100 text-gray-700"
                )}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="pb-4 border-t border-gray-200 mt-4 pt-2">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition"
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
