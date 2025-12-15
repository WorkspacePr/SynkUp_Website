"use client";

import Link from "next/link";
<<<<<<< HEAD
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  LayoutDashboard, 
  Building2, 
  CreditCard, 
  Package, 
  Settings as SettingsIcon, 
  FileText,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronRight
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Building2, label: "Organizations", href: "/organizations" },
  { 
    icon: CreditCard, 
    label: "Billing", 
    href: "/billing",
    submenu: [
      { label: "Organizations", href: "/billing/" },
      { label: "Subscription", href: "/billing/subscription" },
      { label: "Settings", href: "/billing/settings" },
      { label: "Report", href: "/billing/report" },
    ]
=======
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
>>>>>>> 273865ca88080846dace092fcd4518b4cc48c09f
  },
  { icon: Package, label: "Modules", href: "/modules" },
  { icon: SettingsIcon, label: "Configurations", href: "/configurations" },
  { icon: FileText, label: "Reports & Logs", href: "/reports" },
];

<<<<<<< HEAD
interface SidebarProps {
  isOpen: boolean;
}
=======
const bottomItems = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Support", href: "/support", icon: HelpCircle },
  // { name: "Logout", href: "/dashboard/logout", icon: LogOut },
];
>>>>>>> 273865ca88080846dace092fcd4518b4cc48c09f

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();
<<<<<<< HEAD
  const [openSubmenu, setOpenSubmenu] = useState<string | null>("Billing");

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <aside className={`bg-foreground border-r border-bd-primary flex flex-col fixed left-0 top-0 bottom-0 z-40 transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-0 overflow-hidden'
    }`}>
      {/* Logo */}
      <div className="px-6 py-5 border-b border-bd-primary flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">
            S
          </div>
          <span className="text-xl font-bold text-header">Synkup</span>
        </Link>
=======
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
>>>>>>> 273865ca88080846dace092fcd4518b4cc48c09f
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isSubmenuOpen = openSubmenu === item.label;
          
          return (
            <div key={item.href}>
              {hasSubmenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-sub-text hover:bg-background hover:text-header"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {isSubmenuOpen ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  {/* Submenu */}
                  {isSubmenuOpen && (
                    <div className="ml-11 space-y-1 mb-2">
                      {item.submenu.map((subItem) => {
                        const isSubActive = pathname === subItem.href;
                        return (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={`block px-3 py-2 rounded-lg text-sm transition-all ${
                              isSubActive
                                ? "text-primary font-medium"
                                : "text-sub-text hover:bg-background hover:text-header"
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-sub-text hover:bg-background hover:text-header"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )}
            </div>
          );
        })}
<<<<<<< HEAD
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-bd-primary space-y-1">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sub-text hover:bg-background hover:text-header transition-all"
        >
          <SettingsIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </Link>
        <Link
          href="/support"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sub-text hover:bg-background hover:text-header transition-all"
        >
          <HelpCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Support</span>
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sub-text hover:bg-background hover:text-red transition-all">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Log Out</span>
=======

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
>>>>>>> 273865ca88080846dace092fcd4518b4cc48c09f
        </button>
      </div>
    </aside>
  );
}