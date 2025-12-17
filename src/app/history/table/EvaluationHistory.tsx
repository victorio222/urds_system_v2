// "use client";

// import React, { useMemo } from "react";
// import { ChevronLeft, ChevronRight, ChevronDown, Filter, Eye } from "lucide-react";

// interface BatchEntry {
//   id: number;
//   title: string;
//   researcher: string;
//   commodity: string;
//   dateevaluated: string;
//   status: "Completed" | "Terminated" | "Pending" | "Ongoing";
// }

// const EvaluationHistory = () => {
//   const data: BatchEntry[] = [
//     { id: 1, title: "Plant Growth Study and Analysis of Soil Variants in Northern Region", researcher: "Dr. Alice", commodity: "Technological", dateevaluated: "01-01-2025", status: "Pending" },
//     { id: 2, title: "Soil Analysis in Western Highlands and Agricultural Impact", researcher: "Dr. Bob", commodity: "Technological", dateevaluated: "02-01-2025", status: "Pending" },
//     { id: 3, title: "Genetic Research on Rice Varieties for Drought Resistance", researcher: "Dr. Carol", commodity: "Agricultural", dateevaluated: "03-01-2025", status: "Completed" },
//     { id: 4, title: "Water Quality Study in Coastal Areas and Marine Samples", researcher: "Dr. Dave", commodity: "Fisheries", dateevaluated: "04-01-2025", status: "Pending" },
//     { id: 5, title: "Urban Farming AI Automation System and Smart Irrigation", researcher: "Dr. Evans", commodity: "Hospitality", dateevaluated: "05-01-2025", status: "Ongoing" },
//   ];

//   return (
//     <div className="w-full bg-white rounded-sm shadow-sm border border-slate-200 overflow-hidden font-sans">
//       {/* 1. TOP HEADER SECTION */}
//       <div className="px-6 py-5 flex items-start justify-between">
//         <div>
//           <h2 className="text-xl font-semibold text-slate-700 tracking-tight">
//             Recent Reviewed Proposals
//           </h2>
//           <p className="text-sm text-slate-400 mt-0.5">
//             Manage and review latest submissions
//           </p>
//         </div>
        
//         <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
//           <Filter size={16} className="text-slate-400" />
//           Filter View
//           <ChevronDown size={14} className="text-slate-400" />
//         </button>
//       </div>

//       {/* 2. TABLE SECTION */}
//       <div className="overflow-x-auto">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="border-y border-slate-100 bg-slate-50/30">
//               <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-12 text-center">#</th>
//               <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Title</th>
//               <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Researcher</th>
//               <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Campus</th>
//               <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">College</th>
//               <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-100">
//             {data.map((item, index) => (
//               <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
//                 <td className="px-6 py-4 text-sm text-slate-400 text-center font-medium">
//                   {index + 1}
//                 </td>
//                 <td className="px-6 py-4 max-w-md">
//                   <p className="text-sm font-medium text-slate-600 line-clamp-1 group-hover:text-blue-600 transition-colors">
//                     {item.title}
//                   </p>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-slate-500 text-center font-medium">
//                   {item.researcher}
//                 </td>
//                 <td className="px-6 py-4 text-center">
//                   <span className="inline-flex px-2.5 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-500 uppercase">
//                     Main
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-slate-400 text-center">
//                   {item.commodity === 'Technological' ? 'Technology' : item.commodity === 'Agricultural' ? 'Agriculture' : 'Science'}
//                 </td>
//                 <td className="px-6 py-4 text-center">
//                   <span className={`inline-flex px-3 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider
//                     ${item.status === 'Pending' ? 'bg-amber-50 text-amber-500 border border-amber-100' : ''}
//                     ${item.status === 'Completed' ? 'bg-emerald-50 text-emerald-500 border border-emerald-100' : ''}
//                     ${item.status === 'Ongoing' ? 'bg-blue-50 text-blue-500 border border-blue-100' : ''}
//                     ${item.status === 'Terminated' ? 'bg-rose-50 text-rose-500 border border-rose-100' : ''}
//                   `}>
//                     {item.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* 3. FOOTER / PAGINATION SECTION */}
//       <div className="px-6 py-4 flex items-center justify-between border-t border-slate-100 bg-slate-50/20">
//         <div className="flex items-center gap-2">
//           <button className="p-1.5 rounded-md border border-slate-200 text-slate-400 hover:bg-white disabled:opacity-40" disabled>
//             <ChevronLeft size={16} />
//           </button>
//           <span className="text-xs font-medium text-slate-500">
//             Page <span className="text-slate-800">1</span> of 2
//           </span>
//           <button className="p-1.5 rounded-md border border-slate-200 text-slate-400 hover:bg-white">
//             <ChevronRight size={16} />
//           </button>
//         </div>

//         <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-all group">
//           View All 
//           <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EvaluationHistory;











"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, Filter, X } from "lucide-react";

interface BatchEntry {
  id: number;
  title: string;
  researcher: string;
  commodity: string;
  dateevaluated: string;
  status: "Completed" | "Terminated" | "Pending" | "Ongoing";
}

const EvaluationHistory = () => {
  // 1. STATE MANAGEMENT
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const data: BatchEntry[] = [
    { id: 1, title: "Plant Growth Study and Analysis of Soil Variants in Northern Region", researcher: "Dr. Alice", commodity: "Technological", dateevaluated: "01-01-2025", status: "Pending" },
    { id: 2, title: "Soil Analysis in Western Highlands and Agricultural Impact", researcher: "Dr. Bob", commodity: "Technological", dateevaluated: "02-01-2025", status: "Pending" },
    { id: 3, title: "Genetic Research on Rice Varieties for Drought Resistance", researcher: "Dr. Carol", commodity: "Agricultural", dateevaluated: "03-01-2025", status: "Completed" },
    { id: 4, title: "Water Quality Study in Coastal Areas and Marine Samples", researcher: "Dr. Dave", commodity: "Fisheries", dateevaluated: "04-01-2025", status: "Pending" },
    { id: 5, title: "Urban Farming AI Automation System and Smart Irrigation", researcher: "Dr. Evans", commodity: "Hospitality", dateevaluated: "05-01-2025", status: "Ongoing" },
  ];

  // 2. FILTER LOGIC
  const filteredData = useMemo(() => {
    if (filterStatus === "All") return data;
    return data.filter((item) => item.status === filterStatus);
  }, [filterStatus]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-white rounded-sm shadow-sm border border-slate-200 overflow-hidden font-sans">
      {/* 1. TOP HEADER SECTION */}
      <div className="px-6 py-5 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-700 tracking-tight">
            Recent Reviewed Proposals
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Manage and review latest submissions
          </p>
        </div>
        
        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center gap-2">
            {/* Clear Filter Button (Only shows when a filter is active) */}
            {filterStatus !== "All" && (
              <button 
                onClick={() => setFilterStatus("All")}
                className="flex items-center gap-1 text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors mr-2"
              >
                <X size={14} /> Clear
              </button>
            )}

            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm font-medium transition-all
                ${isDropdownOpen || filterStatus !== "All" 
                  ? "border-indigo-600 text-indigo-600 bg-indigo-50/30" 
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
            >
              <Filter size={16} className={isDropdownOpen || filterStatus !== "All" ? "text-indigo-600" : "text-slate-400"} />
              {filterStatus === "All" ? "Filter View" : filterStatus}
              <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* DYNAMIC DROPDOWN MENU */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 shadow-xl rounded-xl z-50 py-1 animate-in fade-in zoom-in duration-150">
              <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                Filter by Status
              </div>
              {["All", "Pending", "Ongoing", "Completed", "Terminated"].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setFilterStatus(status);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                    ${filterStatus === status 
                      ? "bg-indigo-50 text-indigo-600 font-semibold" 
                      : "text-slate-600 hover:bg-slate-50"
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. TABLE SECTION */}
      <div className="overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-y border-slate-100 bg-slate-50/30">
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-12 text-center">#</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Title</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Researcher</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Campus</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">College</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredData.map((item, index) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 text-sm text-slate-400 text-center font-medium">
                  {index + 1}
                </td>
                <td className="px-6 py-4 max-w-md">
                  <p className="text-sm font-medium text-slate-600 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </p>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 text-center font-medium">
                  {item.researcher}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex px-2.5 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-500 uppercase">
                    Main
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400 text-center">
                  {item.commodity === 'Technological' ? 'Technology' : item.commodity === 'Agricultural' ? 'Agriculture' : 'Science'}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex px-3 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider
                    ${item.status === 'Pending' ? 'bg-amber-50 text-amber-500 border border-amber-100' : ''}
                    ${item.status === 'Completed' ? 'bg-emerald-50 text-emerald-500 border border-emerald-100' : ''}
                    ${item.status === 'Ongoing' ? 'bg-blue-50 text-blue-500 border border-blue-100' : ''}
                    ${item.status === 'Terminated' ? 'bg-rose-50 text-rose-500 border border-rose-100' : ''}
                  `}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 text-sm italic">No proposals found with status "{filterStatus}"</p>
          </div>
        )}
      </div>

      {/* 3. FOOTER / PAGINATION SECTION */}
      <div className="px-6 py-4 flex items-center justify-between border-t border-slate-100 bg-slate-50/20">
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md border border-slate-200 text-slate-400 hover:bg-white disabled:opacity-40" disabled>
            <ChevronLeft size={16} />
          </button>
          <span className="text-xs font-medium text-slate-500">
            Page <span className="text-slate-800">1</span> of 2
          </span>
          <button className="p-1.5 rounded-md border border-slate-200 text-slate-400 hover:bg-white">
            <ChevronRight size={16} />
          </button>
        </div>

        <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-all group">
          View All 
          <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default EvaluationHistory;