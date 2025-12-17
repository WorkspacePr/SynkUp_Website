"use client";

import Link from "next/link";
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
  },
  { icon: Package, label: "Modules", href: "/modules" },
  { icon: SettingsIcon, label: "Configurations", href: "/configurations" },
  { icon: FileText, label: "Reports & Logs", href: "/reports" },
];

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();
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
        </button>
      </div>
    </aside>
  );
}