"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Search,
  Eye, 
  CheckCircle, 
  Edit,
  Check,
  Package,
  Calendar
} from "lucide-react";

import EditBatchModal, { BatchEntry } from "./EditBatchModal";
import ViewBatchModal from "./ViewBatchModal";

// --- Mock Data (Generating 3 statuses) ---
const initialData: BatchEntry[] = Array.from({ length: 25 }, (_, i) => {
  const statuses = ["New", "Approved", "Ongoing"] as const;
  const commodities = ["Rice", "Corn", "Vegetables", "Fisheries", "Livestock"];
  
  return {
    id: i + 1,
    batchId: `BATCH-${(i + 1).toString().padStart(3, "0")}`,
    commodity: commodities[i % commodities.length],
    proposals: Math.floor(Math.random() * 20) + 5,
    panels: Math.floor(Math.random() * 5) + 2,
    schedule: `2025-${(Math.floor(Math.random() * 12) + 1).toString().padStart(2, "0")}-${(Math.floor(Math.random() * 28) + 1).toString().padStart(2, "0")}`,
    status: statuses[i % 3], 
  };
});

const InHousePage = () => {
  const [data, setData] = useState<BatchEntry[]>(initialData);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  
  // Navigation
  const [activeTab, setActiveTab] = useState<string>("New");
  
  // Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Actions & Modals
  const [openActionId, setOpenActionId] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BatchEntry | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingItem, setViewingItem] = useState<BatchEntry | null>(null);

  // --- Logic: Data Processing ---
  const processedData = useMemo(() => {
    let filtered = [...data];

    // 1. Tab Filter
    if (activeTab !== "All") {
       filtered = filtered.filter((item) => item.status === activeTab);
    }

    // 2. Search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.batchId.toLowerCase().includes(lowerQuery) || 
        item.commodity.toLowerCase().includes(lowerQuery)
      );
    }

    // 3. Sort
    if (sortConfig) {
      filtered.sort((a, b) => {
        if (sortConfig.key === "schedule") {
          const dateA = new Date(a.schedule).getTime();
          const dateB = new Date(b.schedule).getTime();
          return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
        } else if (sortConfig.key === "panels") {
          return sortConfig.direction === "asc" ? a.panels - b.panels : b.panels - a.panels;
        }
        return 0;
      });
    }

    return filtered;
  }, [data, activeTab, searchQuery, sortConfig]);

  const totalPages = Math.ceil(processedData.length / rowsPerPage);
  const currentData = processedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // --- Logic: Bulk Selection (Only allowed for "New" items) ---
  const approvableSelectedIds = useMemo(() => {
    return selectedRows.filter(id => {
      const item = data.find(d => d.id === id);
      return item && item.status === "New";
    });
  }, [selectedRows, data]);

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === currentData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentData.map((item) => item.id));
    }
  };

  // --- Logic: Actions ---
  const handleAction = (action: string, item: BatchEntry) => {
    setOpenActionId(null);
    
    if (action === "Approve") {
      setData(prev => prev.map(entry => 
        entry.id === item.id ? { ...entry, status: "Approved" } : entry
      ));
    } else if (action === "Edit") {
      setEditingItem(item);
      setIsEditModalOpen(true);
    } else if (action === "View") {
      setViewingItem(item);
      setIsViewModalOpen(true);
    }
  };

  const handleBulkApprove = () => {
    if (approvableSelectedIds.length === 0) return;
    setData(prev => prev.map(entry => 
      approvableSelectedIds.includes(entry.id) ? { ...entry, status: "Approved" } : entry
    ));
    setSelectedRows([]);
    alert(`Successfully approved ${approvableSelectedIds.length} batches.`);
  };

  const handleSaveEdit = (updatedBatch: BatchEntry) => {
    setData((prev) => prev.map((item) => (item.id === updatedBatch.id ? updatedBatch : item)));
    setIsEditModalOpen(false);
    setEditingItem(null);
  };

  // Click Outside Listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.action-menu-container')) setOpenActionId(null);
      if (!(event.target as Element).closest('.filter-container')) setIsFilterOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => { setCurrentPage(1); }, [activeTab, searchQuery, rowsPerPage]);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "New": return "bg-blue-50 text-blue-600 border border-blue-100";
      case "Approved": return "bg-emerald-50 text-emerald-600 border border-emerald-100";
      case "Ongoing": return "bg-orange-50 text-orange-600 border border-orange-100";
      default: return "bg-slate-50 text-slate-600 border border-slate-100";
    }
  };

  return (
    <div className="w-full rounded-sm bg-white p-6 shadow-sm border border-slate-100 font-sans min-h-auto flex flex-col relative">
      
      {/* --- Bulk Action Floating Bar --- */}
      {approvableSelectedIds.length > 0 && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 rounded-xl bg-slate-900 px-5 py-2.5 text-white shadow-xl animate-in fade-in slide-in-from-top-2">
          <span className="text-xs font-semibold">
            {approvableSelectedIds.length} batch{approvableSelectedIds.length > 1 ? 'es' : ''} ready for approval
          </span>
          <div className="h-4 w-px bg-slate-700"></div>
          <button 
            onClick={handleBulkApprove}
            className="flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <Check size={14} /> Approve Selection
          </button>
        </div>
      )}

      {/* --- Top Navigation & Controls --- */}
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        
        {/* Left: Tabs */}
        <div className="flex items-center gap-8 border-b border-transparent">
          {["New", "Approved", "Ongoing"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-bold transition-all ${
                activeTab === tab 
                  ? "border-b-2 border-indigo-600 text-indigo-600" 
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab}
            </button>
          ))}
          <button
              onClick={() => setActiveTab("All")}
              className={`pb-2 text-sm font-bold transition-all ${
                activeTab === "All" 
                  ? "border-b-2 border-indigo-600 text-indigo-600" 
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              All
            </button>
        </div>

        {/* Right: Search & Filter */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 rounded-xl border border-slate-100 bg-slate-50 pl-10 pr-4 py-2 text-xs font-semibold text-slate-700 focus:border-indigo-200 focus:ring-2 focus:ring-indigo-50 outline-none transition-all"
            />
          </div>
          
          <div className="relative filter-container">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`rounded-xl border p-2 transition-colors ${isFilterOpen ? "bg-indigo-50 border-indigo-200 text-indigo-600" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}
            >
              <Filter size={18} />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl z-30 p-2 animate-in fade-in zoom-in-95 origin-top-right">
                <div className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Sort By Date</div>
                <button onClick={() => setSortConfig({ key: "schedule", direction: "desc" })} className="w-full rounded-lg px-3 py-2 text-left text-xs font-bold text-slate-600 hover:bg-slate-50">Newest First</button>
                <button onClick={() => setSortConfig({ key: "schedule", direction: "asc" })} className="w-full rounded-lg px-3 py-2 text-left text-xs font-bold text-slate-600 hover:bg-slate-50">Oldest First</button>

                <div className="mt-2 h-px bg-slate-100 mx-2"></div>

                <div className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Sort By Panels</div>
                <button onClick={() => setSortConfig({ key: "panels", direction: "desc" })} className="w-full rounded-lg px-3 py-2 text-left text-xs font-bold text-slate-600 hover:bg-slate-50">Most Panels</button>
                <button onClick={() => setSortConfig({ key: "panels", direction: "asc" })} className="w-full rounded-lg px-3 py-2 text-left text-xs font-bold text-slate-600 hover:bg-slate-50">Fewest Panels</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Table --- */}
      <div className="flex-1 w-full overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-4 py-4 w-12 text-center">
                 <input type="checkbox" checked={currentData.length > 0 && selectedRows.length === currentData.length} onChange={toggleSelectAll} className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
              </th>
              <th className="px-4 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider w-16">ID</th>
              <th className="px-4 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Batch Details</th>
              <th className="px-4 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Schedule</th>
              <th className="px-4 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Stats</th>
              <th className="px-4 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider text-center">Status</th>
              <th className="px-4 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((row) => (
                <tr key={row.id} className={`group border-b border-slate-50 hover:bg-slate-50/50 transition-colors ${selectedRows.includes(row.id) ? "bg-indigo-50/20" : ""}`}>
                  <td className="px-4 py-5 text-center">
                    <input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => toggleRow(row.id)} className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                  </td>
                  <td className="px-4 py-5 text-xs font-bold text-slate-300">#{row.id}</td>
                  <td className="px-4 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800">{row.batchId}</span>
                      <span className="text-xs font-bold text-indigo-500 mt-1 flex items-center gap-1"><Package size={12} /> {row.commodity}</span>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                     <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5"><Calendar size={12} className="text-slate-400"/> {row.schedule}</span>
                     </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium text-slate-500">Proposals: <span className="font-bold text-slate-800">{row.proposals}</span></span>
                      <span className="text-xs font-medium text-slate-500">Panels: <span className="font-bold text-slate-800">{row.panels}</span></span>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className={`inline-block rounded-md px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide ${getStatusStyles(row.status)}`}>{row.status}</span>
                  </td>
                  
                  {/* --- Action Column Logic --- */}
                  <td className="px-4 py-5 text-center relative action-menu-container">
                    <button onClick={() => setOpenActionId(openActionId === row.id ? null : row.id)} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                      <MoreVertical size={18} />
                    </button>

                     {openActionId === row.id && (
                        <div className="absolute right-10 top-2 z-10 w-32 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl animate-in fade-in zoom-in-95 origin-top-right">
                          
                          {/* 1. ALWAYS SHOW VIEW */}
                          <button onClick={() => handleAction("View", row)} className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-[11px] font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600">
                            <Eye size={14} /> View
                          </button>
                          
                          {/* 2. IF "New": Show Approve + Edit */}
                          {row.status === "New" && (
                            <>
                              <button onClick={() => handleAction("Approve", row)} className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-[11px] font-bold text-slate-600 hover:bg-slate-50 hover:text-emerald-600">
                                <CheckCircle size={14} /> Approve
                              </button>
                              <button onClick={() => handleAction("Edit", row)} className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-[11px] font-bold text-slate-600 hover:bg-slate-50 hover:text-orange-600">
                                <Edit size={14} /> Edit
                              </button>
                            </>
                          )}

                          {/* 3. IF "Approved": Show Edit (NO Approve) */}
                          {row.status === "Approved" && (
                             <button onClick={() => handleAction("Edit", row)} className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-[11px] font-bold text-slate-600 hover:bg-slate-50 hover:text-orange-600">
                                <Edit size={14} /> Edit
                             </button>
                          )}
                          
                        </div>
                      )}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={7} className="px-6 py-12 text-center text-sm text-slate-400 italic">No batches found for this category.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <span>Show</span>
          <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))} className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-bold text-slate-700 outline-none cursor-pointer">
            {[5, 10, 15, 20].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <span>results of {processedData.length}</span>
        </div>
        <div className="flex items-center gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1 text-slate-400 hover:text-indigo-600 disabled:opacity-30 transition-colors"><ChevronLeft size={16} /></button>
            <button className="h-8 w-8 rounded-lg bg-indigo-600 text-xs font-bold text-white shadow-md shadow-indigo-200">{currentPage}</button>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalPages === 0} className="p-1 text-slate-400 hover:text-indigo-600 disabled:opacity-30 transition-colors"><ChevronRight size={16} /></button>
        </div>
      </div>

      <EditBatchModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} batch={editingItem} onSave={handleSaveEdit} />
      <ViewBatchModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} batch={viewingItem} />

    </div>
  );
};

export default InHousePage;