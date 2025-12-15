"use client";

import { Search, Bell, Menu } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
  sidebarOpen?: boolean;
}

export default function Navbar({ onMenuClick, sidebarOpen = true }: NavbarProps) {
  return (
<<<<<<< HEAD
    <nav className={`h-16 bg-foreground border-b border-bd-primary px-6 flex items-center justify-between fixed top-0 right-0 z-50 transition-all duration-300 ${
      sidebarOpen ? 'left-64' : 'left-0'
    }`}>
      {/* Left Section - Hamburger and Search */}
      <div className="flex items-center gap-4">
        {/* Hamburger Menu - Always visible */}
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-background rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-icon-grey" />
=======
    <header className="w-full flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-foreground text-gray-800 shadow-sm">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <button className="lg:hidden p-2 rounded-md hover:bg-gray-100">
          <Menu size={20} />
>>>>>>> 273865ca88080846dace092fcd4518b4cc48c09f
        </button>

        {/* Search Bar */}
        <div className="flex items-center gap-3 bg-background border border-bd-primary rounded-lg px-4 py-2 w-80">
          <Search className="w-4 h-4 text-icon-grey" />
          <input
            type="text"
            placeholder="Search"
<<<<<<< HEAD
            className="bg-transparent border-none outline-none text-sm text-input-text placeholder:text-icon-grey w-full"
=======
            className="w-full border border-bd-primary rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-input-bg text-input-text"
>>>>>>> 273865ca88080846dace092fcd4518b4cc48c09f
          />
        </div>
      </div>

<<<<<<< HEAD
      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button className="relative p-2 hover:bg-background rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-icon-grey" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red rounded-full border-2 border-foreground"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer hover:bg-background px-3 py-2 rounded-lg transition-colors">
          <div className="text-right">
            <div className="text-sm font-semibold text-header">John Doe</div>
            <div className="text-xs text-sub-text">Admin</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-icon-grey flex items-center justify-center text-white font-semibold text-sm">
            JD
          </div>
        </div>
=======
      {/* Right section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Image
            src="/user-avatar.png"
            alt="User"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="text-sm">
            <p className="font-semibold text-header">John Doe</p>
            <p className="text-sub-text text-xs">Admin</p>
          </div>
        </div>

        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell size={20} className="text-icon-grey" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
>>>>>>> 273865ca88080846dace092fcd4518b4cc48c09f
      </div>
    </nav>
  );
}