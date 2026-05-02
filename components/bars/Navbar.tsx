"use client";

import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  Mail,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";

interface NavbarProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export default function Navbar({ onMenuClick, sidebarOpen }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const fullName =
    user?.profile?.full_name?.trim() ||
    [user?.first_name, user?.last_name].filter(Boolean).join(" ").trim() ||
    user?.username ||
    "User";
  const email = user?.email || "No email";
  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-0 right-0 h-16 bg-foreground border-b border-bd-primary z-30 transition-all duration-300 ${
        sidebarOpen ? "left-64" : "left-16"
      }`}
    >
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left side */}
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

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-background rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-sub-text" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Profile Dropdown */}
          <div
            className="relative pl-4 border-l border-bd-primary"
            ref={dropdownRef}
          >
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-3 hover:bg-background rounded-xl px-2 py-1.5 transition-colors"
            >
              <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                {initials}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-sm font-semibold text-header leading-tight">
                  {fullName}
                </div>
                <div className="text-xs text-sub-text leading-tight">System Admin</div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-sub-text transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Panel */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-foreground border border-bd-primary rounded-2xl shadow-xl overflow-hidden z-50">
                {/* Profile Header */}
                <div className="px-4 py-4 border-b border-bd-primary flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-base shrink-0">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-header truncate">
                      {fullName}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Mail className="w-3 h-3 text-sub-text shrink-0" />
                      <span className="text-xs text-sub-text truncate">
                        {email}
                      </span>
                    </div>
                    <span className="inline-flex items-center mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary">
                      System Admin
                    </span>
                  </div>
                </div>

                {/* Menu Items */}
                {/* <div className="py-1.5">
                  <DropdownItem
                    icon={<User className="w-4 h-4" />}
                    label="View Profile"
                  />
                  <DropdownItem
                    icon={<Settings className="w-4 h-4" />}
                    label="Account Settings"
                  />
                  <DropdownItem
                    icon={<Shield className="w-4 h-4" />}
                    label="Privacy & Security"
                  />
                  <DropdownItem
                    icon={<Moon className="w-4 h-4" />}
                    label="Appearance"
                  />
                </div> */}

                {/* Divider + Sign out */}
                {/* <div className="border-t border-bd-primary py-1.5">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors">
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
