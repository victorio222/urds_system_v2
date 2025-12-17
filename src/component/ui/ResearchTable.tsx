// "use client";
// import React, { useState } from "react";
// import { BiSearch, BiDotsVerticalRounded, BiShow, BiCheckCircle, BiRevision } from "react-icons/bi";
// import { fullData, ResearchProject } from "@/app/data/research-proposal";

// interface Props {
//   title: string;
//   statusFilter: "Completed" | "Terminated" | "Pending" | "Ongoing";
//   themeColor: string;
// }

// export default function ResearchTable({ title, statusFilter, themeColor }: Props) {
//   const [search, setSearch] = useState("");
  
//   const filtered = fullData.filter(item => 
//     item.status === statusFilter && 
//     item.title.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="bg-[#F4F7FE] min-h-screen p-4 md:p-8">
//       <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100">
//         {/* Header */}
//         <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
//           <div>
//             <h1 className="text-2xl font-black text-slate-800">{title}</h1>
//             <p className="text-sm text-slate-400">Manage all {statusFilter.toLowerCase()} projects</p>
//           </div>
//           <div className="relative w-full md:w-64">
//             <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//             <input 
//               type="text" 
//               placeholder="Search..." 
//               className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="text-[10px] uppercase font-bold text-slate-400 border-b border-gray-50">
//                 <th className="p-4">Project</th>
//                 <th className="p-4">Researcher</th>
//                 <th className="p-4">Status</th>
//                 <th className="p-4 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {filtered.map((item) => (
//                 <tr key={item.id} className="hover:bg-slate-50 transition-colors">
//                   <td className="p-4">
//                     <div className="text-sm font-bold text-slate-700">{item.title}</div>
//                     <div className="text-[10px] text-indigo-500 font-medium">{item.commodity}</div>
//                   </td>
//                   <td className="p-4">
//                     <div className="text-sm text-slate-600">{item.researcher}</div>
//                     <div className="text-[10px] text-slate-400">{item.college}</div>
//                   </td>
//                   <td className="p-4">
//                     <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${themeColor}`}>
//                       {item.status}
//                     </span>
//                   </td>
//                   <td className="p-4 text-center">
//                     <button className="p-2 hover:bg-white hover:shadow-md rounded-lg transition-all text-slate-400">
//                       <BiDotsVerticalRounded size={20} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }







"use client";
import React, { useState, useMemo } from "react";
import { BiSearch, BiFilterAlt, BiShow, BiCheckCircle, BiRevision, BiChevronLeft, BiChevronRight, BiDotsVerticalRounded, BiX } from "react-icons/bi";
import { fullData, ResearchProject } from "@/app/data/research-proposal";

interface Props {
  pageTitle: string;
  statusFilter: "Completed" | "Terminated" | "Pending" | "Ongoing";
}

export default function ResearchLayout({ pageTitle, statusFilter }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Modals
  const [showApproveModal, setShowApproveModal] = useState<number | null>(null);
  const [showRevisionModal, setShowRevisionModal] = useState<number | null>(null);

  // Filter Logic
  const filteredData = useMemo(() => {
    return fullData.filter(item => 
      item.status === statusFilter && 
      (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
       item.researcher.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="bg-[#F4F7FE] min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-md shadow-sm border border-gray-100 relative">
        
        {/* Simplified Header (No Nav Tabs) */}
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="w-full">
            <h1 className="text-md md:text-1xl font-black text-slate-800">{pageTitle}</h1>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Research Management</p>
          </div>

          <div className="flex w-full items-center gap-3 justify-between md:justify-end">
            <div className="relative">
              <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="p-2.5 bg-white border border-gray-200 rounded-xl text-slate-500 hover:border-indigo-500 hover:text-indigo-500 transition-all"
            >
              <BiFilterAlt size={20} />
            </button>
          </div>
        </div>

        {/* Table - Using your exact design */}
        <div className="overflow-x-auto px-4">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="text-[10px] uppercase font-bold text-slate-400 border-b border-gray-50">
                <th className="py-4 px-2 w-12">ID</th>
                <th className="py-4 px-2 text-left">Research Title</th>
                <th className="py-4 px-2 text-left">Lead Researcher</th>
                <th className="py-4 px-2 text-left">College & Campus</th>
                <th className="py-4 px-2 text-center">Status</th>
                <th className="py-4 px-2 text-center w-16">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedData.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-2 text-xs text-slate-400">#{item.id}</td>
                  <td className="py-4 px-2">
                    <div className="w-80 font-bold text-slate-700 text-sm truncate" title={item.title}>{item.title}</div>
                    <div className="text-[10px] text-indigo-500 font-medium mt-0.5">{item.commodity}</div>
                  </td>
                  <td className="py-4 px-2 text-sm font-medium text-slate-600">{item.researcher}</td>
                  <td className="py-4 px-2">
                    <div className="text-xs font-bold text-slate-700">{item.college}</div>
                    <div className="text-[10px] text-slate-400 italic">{item.campus}</div>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter 
                      ${statusFilter === "Completed" ? "bg-green-100 text-green-600" : 
                        statusFilter === "Ongoing" ? "bg-blue-100 text-blue-600" :
                        statusFilter === "Pending" ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-center relative">
                    <button 
                      onClick={() => setOpenDropdownId(openDropdownId === item.id ? null : item.id)}
                      className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 text-slate-500"
                    >
                      <BiDotsVerticalRounded size={20} />
                    </button>
                    
                    {openDropdownId === item.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-[50] py-2 animate-in fade-in slide-in-from-top-1">
                         <button className="w-full px-4 py-2 text-left text-xs font-bold text-slate-600 hover:bg-indigo-50 flex items-center gap-2">
                            <BiShow className="text-indigo-500" size={16} /> View Details
                         </button>
                         {statusFilter === "Pending" && (
                           <>
                            <button onClick={() => {setShowApproveModal(item.id); setOpenDropdownId(null)}} className="w-full px-4 py-2 text-left text-xs font-bold text-slate-600 hover:bg-green-50 flex items-center gap-2">
                                <BiCheckCircle className="text-green-500" size={16} /> Approve
                            </button>
                            <button onClick={() => {setShowRevisionModal(item.id); setOpenDropdownId(null)}} className="w-full px-4 py-2 text-left text-xs font-bold text-slate-600 hover:bg-amber-50 flex items-center gap-2">
                                <BiRevision className="text-amber-500" size={16} /> Revision
                            </button>
                           </>
                         )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="p-6 border-t border-gray-50 flex justify-between items-center">
            <div className="text-xs font-bold text-slate-400">
                Showing {paginatedData.length} of {filteredData.length} Results
            </div>
            <div className="flex items-center gap-1">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-2 text-slate-400 disabled:opacity-20"><BiChevronLeft size={20}/></button>
                <span className="text-xs font-black px-4 py-2 bg-indigo-600 text-white rounded-lg">{currentPage}</span>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-2 text-slate-400 disabled:opacity-20"><BiChevronRight size={20}/></button>
            </div>
        </div>
      </div>

      {/* Logic for Modals (Approve/Revision) remains the same as your code... */}
    </div>
  );
}