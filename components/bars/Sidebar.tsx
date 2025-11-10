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
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Organizations", href: "/organizations", icon: Building2 },
  {
    name: "Billing",
    href: "/billing",
    icon: CreditCard,
    children: [
      { name: "Organizations", href: "/billing" },
      { name: "Subscription", href: "/billing/subscription" },
      { name: "Settings", href: "/billing/settings" },
      { name: "Report", href: "/billing/report" },
    ],
  },
  { name: "Modules", href: "/modules", icon: Layers },
  { name: "Configurations", href: "/configurations", icon: Settings },
  {
    name: "Reports & Logs",
    href: "/reports-logs",
    icon: ClipboardList,
  },
];

const bottomItems = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Support", href: "/support", icon: HelpCircle },
  // { name: "Logout", href: "/dashboard/logout", icon: LogOut },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <aside className="h-screen w-64 bg-foreground border-r border-gray-200 text-gray-800 flex flex-col justify-between shadow-sm">
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

        {/* Logout button */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={clsx(
            "flex items-center gap-3 px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition w-full text-left",
            isLoggingOut && "opacity-50 cursor-not-allowed"
          )}
        >
          <LogOut size={18} />
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </aside>
  );
}
