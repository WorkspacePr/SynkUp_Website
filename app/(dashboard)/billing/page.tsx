"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, Eye, Download, MoreVertical, ArrowLeft, ChevronDown, FileText } from "lucide-react";
import StatsCard from "@/components/bars/Statscard";
import FilterButtons from "@/components/bars/Filterbuttons";
import Image from "next/image";

const organizations = [
  { name: "CFI Benin", plan: "Enterprise", users: 418, lastPayment: "Oct 22, 2025", amount: "150,000", status: "Paid", nextDue: "Nov 22, 2025", units: 35, totalUsers: "1,270,000", audience: 130, audienceManagers: 50, lastModified: "November 11, 2025", dateCreated: "March 27, 2022", lastSession: "22:14:09 November 11, 2025" },
  { name: "Harvesters Church", plan: "Professional", users: 267, lastPayment: "Oct 10, 2025", amount: "50,000", status: "Pending", nextDue: "Nov 10, 2025", units: 12, totalUsers: "540,000", audience: 95, audienceManagers: 20, lastModified: "November 10, 2025", dateCreated: "January 15, 2023", lastSession: "14:22:10 November 10, 2025" },
  { name: "BLW Campus Ministry", plan: "Enterprise", users: 114, lastPayment: "Sep 30, 2025", amount: "150,000", status: "Paid", nextDue: "Oct 30, 2025", units: 24, totalUsers: "890,000", audience: 110, audienceManagers: 35, lastModified: "November 09, 2025", dateCreated: "June 18, 2022", lastSession: "09:15:30 November 11, 2025" },
  { name: "NNPC", plan: "Enterprise", users: 1362, lastPayment: "Oct 19, 2025", amount: "150,000", status: "Paid", nextDue: "Nov 19, 2025", units: 150, totalUsers: "4,500,000", audience: 1200, audienceManagers: 450, lastModified: "November 11, 2025", dateCreated: "August 05, 2021", lastSession: "18:45:12 November 11, 2025" },
  { name: "Nigerian Breweries PLC", plan: "Enterprise", users: 1205, lastPayment: "Oct 25, 2025", amount: "150,000", status: "Pending", nextDue: "Nov 25, 2025", units: 95, totalUsers: "3,200,000", audience: 850, audienceManagers: 310, lastModified: "November 11, 2025", dateCreated: "February 12, 2021", lastSession: "11:30:00 November 11, 2025" },
  { name: "Benson Idahosa University", plan: "Enterprise", users: 2943, lastPayment: "Oct 18, 2025", amount: "150,000", status: "Overdue", nextDue: "Nov 18, 2025", units: 80, totalUsers: "12,400,000", audience: 2400, audienceManagers: 120, lastModified: "November 08, 2025", dateCreated: "April 20, 2020", lastSession: "16:20:15 November 10, 2025" },
  { name: "Landmark University", plan: "Professional", users: 431, lastPayment: "Sept 28, 2025", amount: "50,000", status: "Paid", nextDue: "Oct 28, 2025", units: 40, totalUsers: "1,500,000", audience: 390, audienceManagers: 85, lastModified: "November 07, 2025", dateCreated: "May 14, 2022", lastSession: "08:12:44 November 08, 2025" },
  { name: "Rhema Campus Hub", plan: "Starter", users: 98, lastPayment: "Oct 23, 2025", amount: "0", status: "Paid", nextDue: "Nov 23, 2025", units: 10, totalUsers: "150,000", audience: 75, audienceManagers: 15, lastModified: "November 11, 2025", dateCreated: "September 01, 2024", lastSession: "21:05:00 November 11, 2025" },
  { name: "Unilever", plan: "Enterprise", users: 1552, lastPayment: "Oct 06, 2025", amount: "150,000", status: "Pending", nextDue: "Nov 06, 2025", units: 110, totalUsers: "5,800,000", audience: 1400, audienceManagers: 520, lastModified: "November 11, 2025", dateCreated: "January 30, 2021", lastSession: "23:55:12 November 11, 2025" },
];

// Mock audience rows per org for the report view
const orgAudienceData: Record<string, { audience: string; manager: string; extras: number; status: "Active" | "Inactive" }[]> = {
  "CFI Benin": [
    { audience: "BIU CFI", manager: "Pst. Jane Doe", extras: 2, status: "Active" },
    { audience: "UNIBEN CFI", manager: "Pst Jane Doe", extras: 0, status: "Active" },
    { audience: "CFI HQ (Benin)", manager: "Rev John Doe", extras: 0, status: "Active" },
    { audience: "AAU CFI", manager: "Pst. John Doe", extras: 1, status: "Inactive" },
  ],
};

const getAudienceRows = (orgName: string) =>
  orgAudienceData[orgName] ?? [
    { audience: `${orgName} Main`, manager: "Admin User", extras: 0, status: "Active" as const },
    { audience: `${orgName} Branch A`, manager: "Branch Manager", extras: 1, status: "Active" as const },
  ];

const tabs = [
  { label: "Organizations", path: "/billing" },
  { label: "Subscription", path: "/billing/subscription" },
  { label: "Settings", path: "/billing/settings" },
  { label: "Report", path: "/billing/report" },
];

const planFilters = ["ALL", "PENDING", "PAID", "OVERDUE"];

const audienceOptions = [
  "All Users",
  "Active Users",
  "Inactive Users",
  "Audience Managers",
  "Administrators",
  "Billing Contacts",
];

type OrgType = typeof organizations[0];

interface ReportData {
  org: OrgType;
  startDate: string;
  endDate: string;
  audiences: string[];
}

export default function BillingOrganizationsPage() {
  const router = useRouter();
  const [activePlan, setActivePlan] = useState("ALL");
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);

  // Org Details Drawer
  const [selectedOrg, setSelectedOrg] = useState<OrgType | null>(null);
  const [activeDetailsTab, setActiveDetailsTab] = useState("Overview");

  // Generate Report Drawer
  const [downloadOrg, setDownloadOrg] = useState<OrgType | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [showAudienceDropdown, setShowAudienceDropdown] = useState(false);

  // Report Results View
  const [reportData, setReportData] = useState<ReportData | null>(null);

  const handleTabChange = (path: string) => router.push(path);

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const toggleAudience = (audience: string) => {
    setSelectedAudiences((prev) =>
      prev.includes(audience) ? prev.filter((a) => a !== audience) : [...prev, audience]
    );
  };

  const isFormValid = startDate !== "" && endDate !== "" && selectedAudiences.length > 0;

  const handleGenerateReport = () => {
    if (!isFormValid || !downloadOrg) return;
    setReportData({ org: downloadOrg, startDate, endDate, audiences: selectedAudiences });
    setDownloadOrg(null);
    setStartDate("");
    setEndDate("");
    setSelectedAudiences([]);
  };

  const openDownloadDrawer = (org: OrgType, e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloadOrg(org);
    setSelectedAudiences([]);
    setStartDate("");
    setEndDate("");
  };

  const isAnyDrawerOpen = selectedOrg || downloadOrg;

  // ─── Report Results Page ───────────────────────────────────────────────────
  if (reportData) {
    const rows = getAudienceRows(reportData.org.name);

    return (
      <div className="p-8 min-h-screen">
        {/* Back link */}
        <button
          onClick={() => setReportData(null)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Billing
        </button>

        {/* Tabs */}
        <div className="flex items-center gap-8 mb-8 border-b border-bd-primary">
          {tabs.map((tab) => (
            <button
              key={tab.path}
              onClick={() => handleTabChange(tab.path)}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                tab.path === "/billing" ? "text-primary" : "text-sub-text hover:text-header"
              }`}
            >
              {tab.label}
              {tab.path === "/billing" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Org Title */}
        <h1 className="text-3xl font-bold text-header mb-8">{reportData.org.name}</h1>

        {/* Audience Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-10">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Audience</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Audience Manager</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-700">{row.audience}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {row.manager}
                    {row.extras > 0 && (
                      <span className="text-gray-400"> + {row.extras} {row.extras === 1 ? "Other" : "Others"}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <span className={row.status === "Active" ? "text-green-500" : "text-red-400"}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Download Buttons */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {/* CSV */}
          <button className="flex items-center gap-3 px-8 py-4 bg-[#009688] hover:bg-[#00897b] text-white font-semibold text-sm rounded-xl transition-colors shadow-sm min-w-[180px] justify-center">
            <div className="flex flex-col items-center leading-none">
              <FileText className="w-5 h-5 mb-0.5" />
              <span className="text-[9px] font-bold tracking-wider">CSV</span>
            </div>
            Download as CSV
          </button>

          {/* PDF */}
          <button className="flex items-center gap-3 px-8 py-4 bg-[#009688] hover:bg-[#00897b] text-white font-semibold text-sm rounded-xl transition-colors shadow-sm min-w-[180px] justify-center">
            <div className="flex flex-col items-center leading-none">
              <FileText className="w-5 h-5 mb-0.5" />
              <span className="text-[9px] font-bold tracking-wider">PDF</span>
            </div>
            Download as PDF
          </button>

          {/* DOCX */}
          <button className="flex items-center gap-3 px-8 py-4 bg-[#009688] hover:bg-[#00897b] text-white font-semibold text-sm rounded-xl transition-colors shadow-sm min-w-[180px] justify-center">
            <div className="flex flex-col items-center leading-none">
              <FileText className="w-5 h-5 mb-0.5" />
              <span className="text-[9px] font-bold tracking-wider">DOCX</span>
            </div>
            Download as DOCX
          </button>
        </div>
      </div>
    );
  }

  // ─── Main Billing Page ─────────────────────────────────────────────────────
  return (
    <div className="p-8 relative min-h-screen overflow-hidden">

      {/* Content Layer */}
      <div className={`transition-all duration-300 ${isAnyDrawerOpen ? "blur-sm pointer-events-none opacity-60" : ""}`}>
        <h1 className="text-3xl font-bold text-header mb-6">Billing</h1>

        {/* Tabs */}
        <div className="flex items-center gap-8 mb-8 border-b border-bd-primary">
          {tabs.map((tab) => (
            <button
              key={tab.path}
              onClick={() => handleTabChange(tab.path)}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                tab.path === "/billing" ? "text-primary" : "text-sub-text hover:text-header"
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
          <StatsCard value="699" label={"Organizations\nRegistered"} icon={<Image src="/organization.svg" alt="Orgs" width={47} height={47} />} bgColor="bg-[#CBD99B]" />
          <StatsCard value="542" label="Active&#10;Subscriptions" icon={<Image src="/tabler_activity.svg" alt="Act" width={47} height={47} />} bgColor="bg-gray-200" />
          <StatsCard value="25" label="Overdue&#10;Billings" icon={<Image src="/rotate.svg" alt="Rot" width={47} height={47} />} bgColor="bg-gray-200" />
          <StatsCard value="5,325,000" label="Total&#10;Billed(₦)" icon={<Image src="/money.svg" alt="Mon" width={30} height={30} />} bgColor="bg-gray-200" />
        </div>

        {/* Table Section */}
        <div className="bg-foreground rounded-xl p-6 shadow-sm border border-bd-primary">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 bg-background border border-bd-primary rounded-lg px-4 py-2.5 w-96">
              <Filter className="w-4 h-4 text-icon-grey" />
              <Search className="w-4 h-4 text-icon-grey" />
              <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-sm text-input-text placeholder:text-icon-grey w-full" />
            </div>
            <FilterButtons filters={planFilters} activeFilter={activePlan} onFilterChange={setActivePlan} />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-bd-primary">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text">Organization</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text">Plan</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-sub-text">Last Payment</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-sub-text">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bd-primary">
                {organizations.map((org, index) => (
                  <tr key={index} className="hover:bg-background/50 transition-colors">
                    <td className="px-4 py-4 text-sm font-medium text-header">{org.name}</td>
                    <td className="px-4 py-4 text-sm text-sub-text">{org.plan}</td>
                    <td className="px-4 py-4 text-sm text-sub-text">{org.lastPayment}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2 relative">
                        <button
                          onClick={() => setSelectedOrg(org)}
                          className="p-1.5 hover:bg-background rounded transition-colors"
                        >
                          <Eye className="w-4 h-4 text-icon-grey" />
                        </button>
                        <button
                          onClick={(e) => openDownloadDrawer(org, e)}
                          className="p-1.5 hover:bg-background rounded transition-colors"
                        >
                          <Download className="w-4 h-4 text-icon-grey" />
                        </button>
                        <button onClick={() => toggleDropdown(index)} className="p-1.5 hover:bg-background rounded transition-colors">
                          <MoreVertical className="w-4 h-4 text-icon-grey" />
                        </button>

                        {openDropdownIndex === index && (
                          <>
                            <div className="fixed inset-0 z-30" onClick={() => setOpenDropdownIndex(null)} />
                            <div className="absolute right-0 top-full mt-1 w-36 rounded-md bg-[#e9ecf0] shadow-lg ring-1 ring-black ring-opacity-5 z-40 overflow-hidden divide-y divide-slate-300">
                              <button onClick={() => setOpenDropdownIndex(null)} className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200/60 transition-colors">Suspend Tenant</button>
                              <button onClick={() => setOpenDropdownIndex(null)} className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200/60 transition-colors">Restore Tenant</button>
                              <button onClick={() => setOpenDropdownIndex(null)} className="w-full text-left px-4 py-2 text-xs font-semibold text-red-500 hover:bg-slate-200/60 transition-colors">Delete Tenant</button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-end gap-2 mt-6">
            <button className="w-9 h-9 flex items-center justify-center text-sm font-semibold rounded-md bg-[#e9ecf0] text-gray-400">«</button>
            <button className="w-9 h-9 flex items-center justify-center text-sm font-semibold rounded-md bg-[#e9ecf0] text-gray-400">‹</button>
            <button className="w-9 h-9 flex items-center justify-center text-sm font-bold rounded-md bg-[#009688] text-white">1</button>
            <button className="w-9 h-9 flex items-center justify-center text-sm font-bold rounded-md bg-[#e9ecf0] text-gray-900">2</button>
            <button className="w-9 h-9 flex items-center justify-center text-sm font-bold rounded-md bg-[#e9ecf0] text-gray-900">...</button>
            <button className="w-9 h-9 flex items-center justify-center text-sm font-semibold rounded-md bg-[#e9ecf0] text-gray-900">›</button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isAnyDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/10 z-40 transition-opacity"
          onClick={() => { setSelectedOrg(null); setDownloadOrg(null); }}
        />
      )}

      {/* ── Org Details Drawer ── */}
      <div className={`fixed right-0 top-0 h-full w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-gray-100 flex flex-col justify-between ${selectedOrg ? "translate-x-0" : "translate-x-full"}`}>
        {selectedOrg && (
          <>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex items-center gap-4 mb-6">
                <button onClick={() => setSelectedOrg(null)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-800" />
                </button>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Organization Details</h2>
              </div>

              <div className="flex flex-col items-center justify-center border-b border-gray-100 pb-6 mb-6">
                <div className="w-16 h-16 bg-[#e9ecf0] rounded-full flex items-center justify-center font-bold text-slate-700 text-xl border border-gray-200 shadow-sm mb-2 overflow-hidden">
                  <span className="text-xs text-center p-1 leading-tight font-black uppercase text-blue-900">
                    {selectedOrg.name.split(" ").map((n) => n[0]).join("").slice(0, 3)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{selectedOrg.name}</h3>
                <span className="inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Active
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 border-b border-gray-100 pb-6 mb-6 text-center">
                <div>
                  <span className="block text-[11px] font-semibold text-gray-400 uppercase">Plan</span>
                  <span className="text-sm font-medium text-gray-700">{selectedOrg.plan}</span>
                </div>
                <div>
                  <span className="block text-[11px] font-semibold text-gray-400 uppercase">Units</span>
                  <span className="text-sm font-medium text-gray-700">{selectedOrg.units}</span>
                </div>
                <div>
                  <span className="block text-[11px] font-semibold text-gray-400 uppercase">User</span>
                  <span className="text-sm font-medium text-gray-700">{selectedOrg.totalUsers}</span>
                </div>
              </div>

              <div className="space-y-3 border-b border-gray-100 pb-6 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Last Payment:</span>
                  <span className="text-gray-700 font-medium">{selectedOrg.lastPayment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Next Payment:</span>
                  <span className="text-red-500 font-semibold">{selectedOrg.nextDue}</span>
                </div>
              </div>

              <div className="flex gap-6 border-b border-gray-100 mb-6">
                {["Overview", "Plan Limits"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveDetailsTab(tab)}
                    className={`pb-2 text-sm font-medium relative transition-colors ${activeDetailsTab === tab ? "text-teal-600 font-semibold" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    {tab}
                    {activeDetailsTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600" />}
                  </button>
                ))}
              </div>

              {activeDetailsTab === "Overview" ? (
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Audience</span>
                    <span className="text-gray-800 font-semibold text-base">{selectedOrg.audience}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Audience Managers</span>
                    <span className="text-gray-800 font-semibold text-base">{selectedOrg.audienceManagers}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Last Modified</span>
                    <span className="text-gray-800 font-medium">{selectedOrg.lastModified}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Date Created</span>
                    <span className="text-gray-800 font-medium">{selectedOrg.dateCreated}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Last Session</span>
                    <span className="text-indigo-600 font-medium">{selectedOrg.lastSession}</span>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-400 italic">Plan limits and parameters modules configuration dashboard view details section.</div>
              )}
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-3">
              <button className="w-full py-3 bg-green-50 hover:bg-green-100/80 text-green-600 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors border border-green-200/50">
                Upgrade Plan
              </button>
              <button className="w-full py-3 bg-red-100 hover:bg-red-200/80 text-red-500 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors border border-red-200/30">
                Deactivate
              </button>
            </div>
          </>
        )}
      </div>

      {/* ── Generate Report Drawer ── */}
      <div className={`fixed right-0 top-0 h-full w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-gray-100 flex flex-col ${downloadOrg ? "translate-x-0" : "translate-x-full"}`}>
        {downloadOrg && (
          <div className="p-6 overflow-y-auto flex-1">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setDownloadOrg(null)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-800" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Organization Details</h2>
            </div>

            {/* Identity */}
            <div className="flex flex-col items-center justify-center pb-6 mb-6">
              <div className="w-16 h-16 bg-[#e9ecf0] rounded-full flex items-center justify-center font-bold text-slate-700 text-xl border border-gray-200 shadow-sm mb-2 overflow-hidden">
                <span className="text-xs text-center p-1 leading-tight font-black uppercase text-blue-900">
                  {downloadOrg.name.split(" ").map((n: string) => n[0]).join("").slice(0, 3)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{downloadOrg.name}</h3>
              <span className="inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Active
              </span>
            </div>

            {/* Meta */}
            <div className="grid grid-cols-3 gap-2 border-t border-b border-gray-100 py-4 mb-6 text-center">
              <div>
                <span className="text-[11px] font-semibold text-gray-500">Plan: </span>
                <span className="text-sm font-medium text-gray-700">{downloadOrg.plan}</span>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-gray-500">Units: </span>
                <span className="text-sm font-medium text-gray-700">{downloadOrg.units}</span>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-gray-500">User: </span>
                <span className="text-sm font-medium text-gray-700">{downloadOrg.totalUsers}</span>
              </div>
            </div>

            {/* Payments */}
            <div className="space-y-3 border-b border-gray-100 pb-6 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Last Payment:</span>
                <span className="text-gray-700 font-medium">{downloadOrg.lastPayment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Next Payment:</span>
                <span className="text-red-500 font-semibold">{downloadOrg.nextDue}</span>
              </div>
            </div>

            {/* Date Range */}
            <div className="mb-6">
              <h4 className="text-base font-bold text-gray-900 mb-4">Date Range</h4>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
              </div>
            </div>

            {/* Audience */}
            <div className="mb-8 relative">
              <h4 className="text-base font-bold text-gray-900 mb-4">Audience</h4>
              <button
                onClick={() => setShowAudienceDropdown(!showAudienceDropdown)}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-sm hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              >
                <span className={selectedAudiences.length > 0 ? "text-gray-900" : "text-gray-400"}>
                  {selectedAudiences.length > 0 ? `${selectedAudiences.length} selected` : "Select Multiple"}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showAudienceDropdown ? "rotate-180" : ""}`} />
              </button>

              {showAudienceDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowAudienceDropdown(false)} />
                  <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden max-h-60 overflow-y-auto">
                    {audienceOptions.map((option) => (
                      <label key={option} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedAudiences.includes(option)}
                          onChange={() => toggleAudience(option)}
                          className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </>
              )}

              {selectedAudiences.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedAudiences.map((audience) => (
                    <span key={audience} className="inline-flex items-center gap-1 px-2.5 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-md border border-teal-100">
                      {audience}
                      <button onClick={() => toggleAudience(audience)} className="hover:text-teal-900 ml-0.5">×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Generate Report Button */}
            <div className="flex justify-center">
              <button
                onClick={handleGenerateReport}
                disabled={!isFormValid}
                className={`px-6 py-2.5 font-semibold text-sm rounded-lg transition-colors shadow-sm ${
                  isFormValid
                    ? "bg-[#009688] hover:bg-[#00897b] text-white shadow-teal-500/20 cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Generate Report
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}