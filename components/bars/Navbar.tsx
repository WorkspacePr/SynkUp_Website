import { Menu, Bell, Search } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white text-gray-800 shadow-sm">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <button className="lg:hidden p-2 rounded-md hover:bg-gray-100">
          <Menu size={20} />
        </button>

        {/* Search bar */}
        <div className="relative w-64">
          <Search
            className="absolute left-3 top-2.5 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700"
          />
        </div>
      </div>

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
            <p className="font-semibold text-gray-800">John Doe</p>
            <p className="text-gray-500 text-xs">Admin</p>
          </div>
        </div>

        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>
    </header>
  );
}
