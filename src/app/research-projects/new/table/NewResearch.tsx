// // "use client";

// // import React, { useState } from "react";
// // import Table from "@/component/ui/Table";
// // import { BiSolidFilterAlt, BiSolidPlusCircle } from "react-icons/bi";
// // import ActionDropdown from "../action/ActionDropdown";
// // import Dropdown, { DropdownItem } from "@/component/ui/Dropdown"; // Adjust path

// // interface ResearchProject {
// //   id: number;
// //   title: string;
// //   researcher: string;
// //   campus: string;
// //   college: string;
// //   status: "Completed" | "Terminated" | "Pending" | "Ongoing";
// //   action?: React.ReactNode;
// // }

// // type ColumnKey = keyof ResearchProject | "action";

// // const NewResearchPage = () => {
// //   const data: ResearchProject[] = [
// //     {
// //       id: 1,
// //       title: "Plant Growth Study",
// //       researcher: "Dr. Alice",
// //       campus: "Main",
// //       college: "Science",
// //       status: "Pending",
// //     },
// //     {
// //       id: 2,
// //       title: "Soil Analysis",
// //       researcher: "Dr. Bob",
// //       campus: "West",
// //       college: "Agriculture",
// //       status: "Pending",
// //     },
// //     {
// //       id: 3,
// //       title: "Genetic Research",
// //       researcher: "Dr. Carol",
// //       campus: "Main",
// //       college: "Biotech",
// //       status: "Pending",
// //     },
// //     {
// //       id: 4,
// //       title: "Water Quality Study",
// //       researcher: "Dr. Dave",
// //       campus: "East",
// //       college: "Environment",
// //       status: "Pending",
// //     },
// //   ];

// //   const [year, setYear] = useState(2025);
// //   const [status, setStatus] = useState("All Proposal");

// //   const columns: Array<{
// //     key: ColumnKey;
// //     header: string;
// //     render?: (value: any, row: ResearchProject) => React.ReactNode;
// //     align?: "left" | "center";
// //     width?: string;
// //   }> = [
// //     { key: "id", header: "#", align: "center", width: "60px" },
// //     { key: "title", header: "Title", align: "left" },
// //     { key: "researcher", header: "Researcher", align: "left" },
// //     { key: "campus", header: "Campus", align: "center" },
// //     { key: "college", header: "College", align: "center" },
// //     {
// //       key: "status",
// //       header: "Status",
// //       align: "center",
// //       render: (value: ResearchProject["status"]) => {
// //         const styleMap = {
// //           Completed: "bg-green-100 text-green-700",
// //           Terminated: "bg-red-100 text-red-700",
// //           Pending: "bg-yellow-100 text-yellow-700",
// //           Ongoing: "bg-blue-100 text-blue-700",
// //         };
// //         return (
// //           <span
// //             className={`inline-block px-3 py-1 rounded-full font-medium select-none ${styleMap[value]}`}
// //           >
// //             {value}
// //           </span>
// //         );
// //       },
// //     },
// //     {
// //       key: "action",
// //       header: "Action",
// //       align: "center",
// //       width: "60px",
// //       render: (_, row) => (
// //         <ActionDropdown
// //           onView={() => alert(`Edit ${row.title}`)}
// //           onApprove={() => alert(`Delete ${row.title}`)}
// //           onRequest={() => alert(`View ${row.title}`)}
// //         />
// //       ),
// //     },
// //   ];

// //   // Dropdown items
// //   const yearItems: DropdownItem[] = [2023, 2024, 2025, 2026, 2027].map((y) => ({
// //     label: y.toString(),
// //     onClick: () => setYear(y),
// //   }));

// //   const statusItems: DropdownItem[] = [
// //     "All Proposal",
// //     "Completed",
// //     "Pending",
// //     "Ongoing",
// //     "Terminated",
// //   ].map((s) => ({
// //     label: s,
// //     onClick: () => setStatus(s),
// //   }));

// //   return (
// //     <div className="space-y-4 mt-[-10px] w-full">
// //       {/* Top Navigation */}
// //       <div className="max-w-full flex justify-end mb-[-5px]">
// //         <div className="inline-flex justify-end bg-white p-2 pr-5 rounded-full shadow space-x-4">
// //           <div className="flex items-center">
// //             <Dropdown buttonContent={`Year: ${year}`} items={yearItems} />
// //             <Dropdown buttonContent={`Status: ${status}`} items={statusItems} />
// //           </div>

// //           <div className="flex items-center text-sm text-slate-500 font-medium cursor-pointer select-none">
// //             <BiSolidFilterAlt className="mr-2 text-xl" />
// //             More Filters
// //           </div>
// //         </div>
// //       </div>

// //       {/* Table */}
// //       <Table<ResearchProject> columns={columns} data={data} />
// //     </div>
// //   );
// // };

// // export default NewResearchPage;












// "use client";

// import React, { useState, useMemo, useRef, useEffect } from "react";
// import { 
//   BiSearch, BiFilterAlt, BiShow, BiCheckCircle, 
//   BiRevision, BiChevronLeft, BiChevronRight, BiDotsVerticalRounded, BiX
// } from "react-icons/bi";

// const NewProposalsPage = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterCollege, setFilterCollege] = useState("All");
//   const [filterCommodity, setFilterCommodity] = useState("All");
//   const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const filterRef = useRef<HTMLDivElement>(null);

//   const data = useMemo(() => [
//     { id: 2, title: "Soil Analysis for Sustainable Agriculture", researcher: "Dr. Bob", commodity: "Corn", campus: "UEP Main Campus", college: "College of Engineering", status: "Pending" },
//     { id: 5, title: "Automated Irrigation Systems for Small Farms", researcher: "Dr. Eve", commodity: "Vegetables", campus: "UEP Main Campus", college: "College of Engineering", status: "Pending" },
//     { id: 14, title: "Bio-fertilizer Efficacy on Corn", researcher: "Dr. Nate", commodity: "Corn", campus: "UEP Main Campus", college: "College of Science", status: "Pending" },
//   ], []);

//   const filteredData = data.filter(item => {
//     const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCollege = filterCollege === "All" || item.college === filterCollege;
//     const matchesComm = filterCommodity === "All" || item.commodity === filterCommodity;
//     return matchesSearch && matchesCollege && matchesComm;
//   });

//   return (
//     <div className="bg-[#F8F9FD] min-h-screen p-4 md:p-10 font-sans text-slate-700">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-black text-slate-800 tracking-tight">New Proposals</h1>
//             <p className="text-sm text-slate-500 font-medium border-l-4 border-amber-400 pl-3 mt-1">Pending Review and Approval</p>
//           </div>
//           <div className="flex items-center gap-3">
//              <div className="relative">
//                 <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                 <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 w-64 shadow-sm outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
//              </div>
//              <div className="relative" ref={filterRef}>
//                 <button onClick={() => setIsFilterOpen(!isFilterOpen)} className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-sm transition-all shadow-sm ${isFilterOpen ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-gray-200 hover:border-indigo-300'}`}><BiFilterAlt size={18} /><span>Filter</span></button>
//                 {isFilterOpen && (
//                   <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[100] p-6 animate-in fade-in slide-in-from-top-4">
//                     <div className="space-y-5">
//                       <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">College</label>
//                         <select value={filterCollege} onChange={(e) => setFilterCollege(e.target.value)} className="w-full mt-2 bg-slate-50 border-none rounded-xl text-sm p-3 focus:ring-2 focus:ring-indigo-500 font-medium">
//                           <option value="All">All Colleges</option>
//                           <option value="College of Science">College of Science</option>
//                           <option value="College of Engineering">College of Engineering</option>
//                         </select>
//                       </div>
//                       <button onClick={() => { setFilterCollege("All"); setIsFilterOpen(false); }} className="w-full py-3 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-black uppercase tracking-tighter">Reset Filters</button>
//                     </div>
//                   </div>
//                 )}
//              </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
//           <div className="overflow-x-auto px-6">
//             <table className="w-full min-w-[1000px]">
//               <thead>
//                 <tr className="text-[10px] uppercase font-black text-slate-400 border-b border-gray-50">
//                   <th className="py-6 px-2 w-12 text-left">ID</th>
//                   <th className="py-6 px-2 text-left">Research Title</th>
//                   <th className="py-6 px-2 text-left">Researcher</th>
//                   <th className="py-6 px-2 text-left">College & Campus</th>
//                   <th className="py-6 px-2 text-center">Status</th>
//                   <th className="py-6 px-2 text-center w-20">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-50">
//                 {filteredData.map((item) => (
//                   <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
//                     <td className="py-5 px-2 text-xs font-bold text-slate-300">#{item.id}</td>
//                     <td className="py-5 px-2"><div className="w-80 font-bold text-slate-700 text-sm truncate group-hover:text-indigo-600 transition-colors" title={item.title}>{item.title}</div><div className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">{item.commodity}</div></td>
//                     <td className="py-5 px-2 text-sm font-semibold text-slate-600">{item.researcher}</td>
//                     <td className="py-5 px-2"><div className="text-xs font-bold text-slate-700 uppercase tracking-tighter">{item.college}</div><div className="text-[10px] text-slate-400 italic mt-0.5">{item.campus}</div></td>
//                     <td className="py-5 px-2 text-center"><span className="px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border bg-amber-50 text-amber-600 border-amber-100">Pending</span></td>
//                     <td className="py-5 px-2 text-center relative">
//                       <button onClick={() => setOpenDropdownId(openDropdownId === item.id ? null : item.id)} className="p-2 rounded-xl hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 transition-all text-slate-400"><BiDotsVerticalRounded size={20}/></button>
//                       {openDropdownId === item.id && (
//                         <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 py-2 animate-in fade-in slide-in-from-right-2">
//                           <button className="w-full px-5 py-2.5 text-left text-xs font-bold text-slate-600 hover:bg-indigo-50 flex items-center gap-3"><BiShow className="text-indigo-500" size={18}/> View Detail</button>
//                           <button className="w-full px-5 py-2.5 text-left text-xs font-bold text-slate-600 hover:bg-emerald-50 flex items-center gap-3"><BiCheckCircle className="text-emerald-500" size={18}/> Approve</button>
//                           <button className="w-full px-5 py-2.5 text-left text-xs font-bold text-slate-600 hover:bg-amber-50 flex items-center gap-3"><BiRevision className="text-amber-500" size={18}/> Revision</button>
//                         </div>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewProposalsPage;









import { Spinner } from "@/component/base/Spinner";
import ResearchLayout from "@/component/ui/ResearchTable";
import { useEffect, useState } from "react";

export default function NewProposalsPage() {
    const [loading, setLoading] = useState(true);
  
    // Simulate data loading on mount
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000); // 1 second delay to simulate an API call
  
      return () => clearTimeout(timer);
    }, []);
  
    if (loading) {
      return (
        <div className="flex flex-col justify-center items-center h-screen bg-[#F4F7FE]">
          <Spinner />
        </div>
      );
    }

  return (
    <ResearchLayout 
      pageTitle="New Proposals" 
      statusFilter="Pending" 
      // themeColor="bg-yellow-100 text-yellow-600" 
    />
  );
}