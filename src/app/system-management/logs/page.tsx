"use client";

import React, { useEffect, useState, useMemo } from "react";
import DefaultLayout from "@/component/layout/DefaultLayout";
import { Spinner } from "@/component/base/Spinner";
import { BiSearch } from "react-icons/bi";
import { ChevronDown, ChevronLeft, ChevronRight, Filter } from "lucide-react";

interface SystemLog {
  id: number;
  action: string;
  user: string;
  description: string;
  datetime: string;
  status: "Success" | "Warning" | "Failed";
}

const SystemLogs = () => {
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const data: SystemLog[] = [
    { id: 1, action: "User Login", user: "URDS Director", description: "Logged into the research management system", datetime: "2025-02-01 08:12 AM", status: "Success" },
    { id: 2, action: "Proposal Submitted", user: "Researcher: Maria Santos", description: 'Submitted research proposal titled "Smart Irrigation System Using IoT"', datetime: "2025-02-01 09:45 AM", status: "Success" },
    { id: 6, action: "Proposal Returned", user: "URDS Director", description: 'Returned proposal "Smart Hydroponic Farming System" for revisions', datetime: "2025-02-03 09:20 AM", status: "Warning" },
    { id: 11, action: "Proposal Rejected", user: "URDS Director", description: 'Rejected proposal "Blockchain Attendance System"', datetime: "2025-02-06 04:18 PM", status: "Failed" },
    { id: 12, action: "Deadline Missed", user: "Reviewer: Prof. Elena Cruz", description: "Failed to submit review before deadline", datetime: "2025-02-07 08:00 AM", status: "Warning" },
  ];

  const filteredData = useMemo(() => {
    return data.filter((log) => {
      const matchesSearch = [log.action, log.user, log.description].some(field => 
        field.toLowerCase().includes(search.toLowerCase())
      );
      const matchesStatus = statusFilter === "All" || log.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <DefaultLayout pageName="Activity Logs">
      <div className="w-full bg-white rounded-sm shadow-sm border border-slate-200 overflow-hidden font-sans">
        
        {/* 1. TOP HEADER SECTION */}
        <div className="px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-700 tracking-tight">
              System Activity Logs
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Monitoring system events and audit trails
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search activities..."
                className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <Filter size={16} className="text-slate-400" />
                {statusFilter === "All" ? "Filter Status" : statusFilter}
                <ChevronDown size={14} className="text-slate-400" />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 shadow-xl rounded-lg z-50 py-1">
                  {["All", "Success", "Warning", "Failed"].map((s) => (
                    <button
                      key={s}
                      onClick={() => { setStatusFilter(s); setIsDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2. TABLE SECTION */}
        <div className="overflow-x-auto min-h-[400px]">
          {loading ? (
            <div className="flex justify-center items-center h-64"><Spinner /></div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-y border-slate-100 bg-slate-50/30">
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-12 text-center">#</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Timestamp</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Action</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">User</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Description</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {filteredData.map((log, index) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 text-xs text-slate-400 text-center font-medium">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-500 whitespace-nowrap">
                      {log.datetime}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-700">
                      {log.action}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      {log.user}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate italic">
                      {log.description}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider
                        ${log.status === 'Success' ? 'bg-emerald-50 text-emerald-500 border border-emerald-100' : ''}
                        ${log.status === 'Warning' ? 'bg-amber-50 text-amber-500 border border-amber-100' : ''}
                        ${log.status === 'Failed' ? 'bg-rose-50 text-rose-500 border border-rose-100' : ''}
                      `}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          {!loading && filteredData.length === 0 && (
            <div className="py-20 text-center text-slate-400 text-sm italic">
              No activity logs found.
            </div>
          )}
        </div>

        {/* 3. FOOTER SECTION */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-slate-100 bg-slate-50/20">
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-md border border-slate-200 text-slate-400 hover:bg-white disabled:opacity-40" disabled>
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-medium text-slate-500">
              Page <span className="text-slate-800">1</span> of 1
            </span>
            <button className="p-1.5 rounded-md border border-slate-200 text-slate-400 hover:bg-white" disabled>
              <ChevronRight size={16} />
            </button>
          </div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Log End of Record
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SystemLogs;