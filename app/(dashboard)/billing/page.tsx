"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  Eye,
  Download,
  MoreVertical,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import StatsCard from "@/components/bars/Statscard";
import FilterButtons from "@/components/bars/Filterbuttons";

const organizations = [
  {
    name: "CFI Benin",
    plan: "Enterprise",
    users: 1270000,
    lastPayment: "October 22, 2025",
    amount: "150,000",
    status: "Paid",
    nextDue: "November 22, 2025",
    units: 35,
  },
  {
    name: "Harvesters Church",
    plan: "Professional",
    users: 267,
    lastPayment: "October 10, 2025",
    amount: "50,000",
    status: "Pending",
    nextDue: "November 10, 2025",
    units: 15,
  },
  {
    name: "BLW Campus Ministry",
    plan: "Enterprise",
    users: 114,
    lastPayment: "September 30, 2025",
    amount: "150,000",
    status: "Paid",
    nextDue: "October 30, 2025",
    units: 20,
  },
  {
    name: "NNPC",
    plan: "Enterprise",
    users: 1362,
    lastPayment: "October 19, 2025",
    amount: "150,000",
    status: "Paid",
    nextDue: "November 19, 2025",
    units: 42,
  },
  {
    name: "Nigerian Breweries PLC",
    plan: "Enterprise",
    users: 1205,
    lastPayment: "October 25, 2025",
    amount: "150,000",
    status: "Pending",
    nextDue: "November 25, 2025",
    units: 38,
  },
  {
    name: "Benson Idahosa University",
    plan: "Enterprise",
    users: 2943,
    lastPayment: "October 18, 2025",
    amount: "150,000",
    status: "Overdue",
    nextDue: "November 18, 2025",
    units: 55,
  },
  {
    name: "Landmark University",
    plan: "Professional",
    users: 431,
    lastPayment: "September 28, 2025",
    amount: "50,000",
    status: "Paid",
    nextDue: "October 28, 2025",
    units: 18,
  },
  {
    name: "Rhema Campus Hub",
    plan: "Starter",
    users: 98,
    lastPayment: "October 23, 2025",
    amount: "0",
    status: "Paid",
    nextDue: "November 23, 2025",
    units: 5,
  },
  {
    name: "Unilever",
    plan: "Enterprise",
    users: 1552,
    lastPayment: "October 06, 2025",
    amount: "150,000",
    status: "Pending",
    nextDue: "November 06, 2025",
    units: 45,
  },
];

const tabs = [
  { label: "Organizations", path: "/billing" },
  { label: "Subscription", path: "/billing/subscription" },
  { label: "Settings", path: "/billing/settings" },
  { label: "Report", path: "/billing/report" },
];

const planFilters = ["ALL", "PENDING", "PAID", "OVERDUE"];

const statusStyles = {
  Paid: "text-green-700 bg-green-50",
  Pending: "text-orange-700 bg-orange-50",
  Overdue: "text-red-700 bg-red-50",
};

// Calendar Component
const Calendar = ({
  selectedDate,
  onSelectDate,
  onClose,
}: {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  onClose: () => void;
}) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  const handleDateClick = (day: number) => {
    const selected = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    onSelectDate(selected);
    onClose();
  };

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="h-8"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const isSelected =
      selectedDate &&
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear();

    days.push(
      <button
        key={day}
        onClick={() => handleDateClick(day)}
        className={`h-8 flex items-center justify-center rounded text-sm hover:bg-primary/10 transition-colors ${
          isSelected ? "bg-primary text-white hover:bg-primary" : "text-header"
        }`}
      >
        {day}
      </button>,
    );
  }

  return (
    <div className="absolute top-full left-0 mt-2 bg-foreground border border-bd-primary rounded-lg shadow-lg p-4 z-50 w-72">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1 hover:bg-background rounded">
          <ChevronLeft className="w-5 h-5 text-header" />
        </button>
        <div className="font-semibold text-header">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <button onClick={nextMonth} className="p-1 hover:bg-background rounded">
          <ChevronRight className="w-5 h-5 text-header" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-xs font-medium text-sub-text"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{days}</div>
    </div>
  );
};

export default function BillingOrganizationsPage() {
  const router = useRouter();
  const [activePlan, setActivePlan] = useState("ALL");
  const [selectedOrg, setSelectedOrg] = useState<
    (typeof organizations)[0] | null
  >(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  const handleTabChange = (path: string) => {
    router.push(path);
  };

  const handleOrgClick = (org: (typeof organizations)[0]) => {
    setSelectedOrg(org);
  };

  const handleClosePanel = () => {
    setSelectedOrg(null);
    setStartDate(null);
    setEndDate(null);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="p-8 relative">
      <h1 className="text-3xl font-bold text-header mb-6">Billing</h1>

      {/* Tabs */}
      <div className="flex items-center gap-8 mb-8 border-b border-bd-primary">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => handleTabChange(tab.path)}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              tab.path === "/billing"
                ? "text-primary"
                : "text-sub-text hover:text-header"
            }`}
          >
            {tab.label}
            {tab.path === "/billing" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <StatsCard
          value="57"
          label="Organizations&#10;Registered"
          emoji="🏢"
          bgColor="bg-green-200"
        />
        <StatsCard
          value="176"
          label="Active&#10;Subscriptions"
          emoji="📈"
          bgColor="bg-gray-200"
        />
        <StatsCard
          value="25"
          label="Overdue&#10;Billings"
          emoji="🔄"
          bgColor="bg-gray-200"
        />
        <StatsCard
          value="15,325,000"
          label="Total&#10;Billed(₦)"
          emoji="💵"
          bgColor="bg-gray-200"
        />
      </div>

      {/* Table Section */}
      <div className="bg-foreground rounded-xl p-6 shadow-sm border border-bd-primary">
        <div className="flex items-center justify-between mb-6">
          {/* Search Bar */}
          <div className="flex items-center gap-3 bg-background border border-bd-primary rounded-lg px-4 py-2.5 w-96">
            <Filter className="w-4 h-4 text-icon-grey" />
            <Search className="w-4 h-4 text-icon-grey" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent border-none outline-none text-sm text-input-text placeholder:text-icon-grey w-full"
            />
          </div>

          {/* Plan Filters */}
          <FilterButtons
            filters={planFilters}
            activeFilter={activePlan}
            onFilterChange={setActivePlan}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-bd-primary">
                <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text">
                  Organization
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text">
                  Plan
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text">
                  Users
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text">
                  Last Payment
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text">
                  Amount (₦)
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text">
                  Next Due
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-sub-text">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bd-primary">
              {organizations.map((org, index) => (
                <tr
                  key={index}
                  onClick={() => handleOrgClick(org)}
                  className="hover:bg-background/50 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-4 text-sm font-medium text-header">
                    {org.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-sub-text">
                    {org.plan}
                  </td>
                  <td className="px-4 py-4 text-sm text-sub-text">
                    {org.users}
                  </td>
                  <td className="px-4 py-4 text-sm text-sub-text">
                    {org.lastPayment.replace(
                      /^(\w+) (\d+), (\d+)$/,
                      "$1 $2, $3",
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-sub-text">
                    {org.amount}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                        statusStyles[org.status as keyof typeof statusStyles]
                      }`}
                    >
                      {org.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-sub-text">
                    {org.nextDue.replace(/^(\w+) (\d+), (\d+)$/, "$1 $2, $3")}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOrgClick(org);
                        }}
                        className="p-1.5 hover:bg-background rounded transition-colors"
                      >
                        <Eye className="w-4 h-4 text-icon-grey" />
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 hover:bg-background rounded transition-colors"
                      >
                        <Download className="w-4 h-4 text-icon-grey" />
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 hover:bg-background rounded transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-icon-grey" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 mt-6">
          <button className="px-3 py-1 text-sm border border-bd-primary rounded hover:bg-background transition-colors">
            «
          </button>
          <button className="px-3 py-1 text-sm border border-bd-primary rounded hover:bg-background transition-colors">
            ‹
          </button>
          <button className="px-3 py-1 text-sm bg-primary text-white rounded">
            1
          </button>
          <button className="px-3 py-1 text-sm border border-bd-primary rounded hover:bg-background transition-colors">
            2
          </button>
          <button className="px-3 py-1 text-sm border border-bd-primary rounded hover:bg-background transition-colors">
            3
          </button>
          <button className="px-3 py-1 text-sm border border-bd-primary rounded hover:bg-background transition-colors">
            ...
          </button>
          <button className="px-3 py-1 text-sm border border-bd-primary rounded hover:bg-background transition-colors">
            ›
          </button>
          <button className="px-3 py-1 text-sm border border-bd-primary rounded hover:bg-background transition-colors">
            »
          </button>
        </div>
      </div>

      {/* Side Panel Overlay */}
      {selectedOrg && (
        <>
          {/* Dark Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleClosePanel}
          />

          {/* Side Panel */}
          <div className="fixed right-0 top-0 h-full w-[500px] bg-foreground shadow-2xl z-50 overflow-y-auto">
            <div className="p-8">
              {/* Close Button */}
              <button
                onClick={handleClosePanel}
                className="mb-6 p-2 hover:bg-background rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-header" />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-header mb-6">
                  Organization Details
                </h1>

                {/* Organization Logo/Icon */}
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center border-4 border-gray-300">
                  <span className="text-xl font-bold text-gray-600">
                    {selectedOrg.name.substring(0, 3).toUpperCase()}
                  </span>
                </div>

                {/* Organization Name */}
                <h2 className="text-2xl font-bold text-header mb-3">
                  {selectedOrg.name}
                </h2>

                {/* Active Badge */}
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  ACTIVE
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-bd-primary">
                <div className="text-center">
                  <div className="text-xs text-sub-text mb-1">Plan:</div>
                  <div className="text-sm font-semibold text-header">
                    {selectedOrg.plan}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-sub-text mb-1">Units:</div>
                  <div className="text-sm font-semibold text-header">
                    {selectedOrg.units}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-sub-text mb-1">User:</div>
                  <div className="text-sm font-semibold text-header">
                    {selectedOrg.users.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-bd-primary">
                <div>
                  <div className="text-xs text-sub-text mb-2">
                    Last Payment:
                  </div>
                  <div className="text-sm font-medium text-header">
                    {selectedOrg.lastPayment}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-sub-text mb-2">
                    Next Payment:
                  </div>
                  <div className="text-sm font-medium text-red-600">
                    {selectedOrg.nextDue}
                  </div>
                </div>
              </div>

              {/* Date Range */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-header mb-4">
                  Date Range
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Start Date"
                      value={formatDate(startDate)}
                      onClick={() => {
                        setShowStartCalendar(!showStartCalendar);
                        setShowEndCalendar(false);
                      }}
                      readOnly
                      className="w-full px-3 py-2.5 border border-bd-primary rounded-lg bg-background text-input-text text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                    />
                    {showStartCalendar && (
                      <Calendar
                        selectedDate={startDate}
                        onSelectDate={setStartDate}
                        onClose={() => setShowStartCalendar(false)}
                      />
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="End Date"
                      value={formatDate(endDate)}
                      onClick={() => {
                        setShowEndCalendar(!showEndCalendar);
                        setShowStartCalendar(false);
                      }}
                      readOnly
                      className="w-full px-3 py-2.5 border border-bd-primary rounded-lg bg-background text-input-text text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                    />
                    {showEndCalendar && (
                      <Calendar
                        selectedDate={endDate}
                        onSelectDate={setEndDate}
                        onClose={() => setShowEndCalendar(false)}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Audience */}
              <div className="mb-8">
                <h3 className="text-base font-semibold text-header mb-4">
                  Audience
                </h3>
                <select className="w-full px-3 py-2.5 border border-bd-primary rounded-lg bg-background text-input-text text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer">
                  <option>Select Multiple</option>
                  <option>All Users</option>
                  <option>Active Users</option>
                  <option>Inactive Users</option>
                </select>
              </div>

              {/* Generate Report Button */}
              <button
                onClick={() => {
                  router.push(
                    `/billing/generatedReport?org=${encodeURIComponent(selectedOrg.name)}`,
                  );
                }}
                className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm"
              >
                Generate Report
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
