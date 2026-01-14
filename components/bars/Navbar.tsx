"use client";

import { Menu, Bell, Search } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export default function Navbar({ onMenuClick, sidebarOpen }: NavbarProps) {
  return (
    <nav
      className={`fixed top-0 right-0 h-16 bg-foreground border-b border-bd-primary z-30 transition-all duration-300 ${
        sidebarOpen ? "left-64" : "left-16"
      }`}
    >
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left side - Menu button and Search */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-background rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-sub-text" />
          </button>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sub-text" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 bg-input-bg border border-bd-primary rounded-lg text-sm text-input-text placeholder-sub-text focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
            />
          </div>
        </div>

        {/* Right side - Notifications and User */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-background rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-sub-text" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-bd-primary">
            <div className="text-right">
              <div className="text-sm font-semibold text-header">John Doe</div>
              <div className="text-xs text-sub-text">Admin</div>
            </div>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
              JD
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}