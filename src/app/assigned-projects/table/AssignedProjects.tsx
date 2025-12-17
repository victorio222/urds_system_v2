// // "use client";

// // import React, { useState } from "react";
// // import Table from "@/component/ui/Table";
// // import { BiSolidFilterAlt } from "react-icons/bi";
// // import ActionDropdown from "../action/ActionDropdown";
// // import Dropdown, { DropdownItem } from "@/component/ui/Dropdown";

// // interface BatchEntry {
// //   id: number;
// //   title: string;
// //   researcher: string;
// //   commodity: string;
// //   college: "COE" | "CBA" | "CAC" | "COED" | "CS" | "COJ"| "CAFNR";
// //   status: "New" | "Completed" | "Ongoing" | "Terminated";
// // }

// // const AssignedProjectPage = () => {
// //   // DATA ONLY
// //   const data: BatchEntry[] = [
// //   {
// //     id: 1,
// //     title: "Title 1",
// //     researcher: "Author 1",
// //     commodity: "Technological",
// //     college: "COE",
// //     status: "New",
// //   },
// //   {
// //     id: 2,
// //     title: "Title 2",
// //     researcher: "Author 2",
// //     commodity: "Technological",
// //     college: "CBA",
// //     status: "Completed",
// //   },
// //   {
// //     id: 3,
// //     title: "Title 3",
// //     researcher: "Author 3",
// //     commodity: "Agricultural",
// //     college: "CAC",
// //     status: "Ongoing",
// //   },
// //   {
// //     id: 4,
// //     title: "Title 4",
// //     researcher: "Author 4",
// //     commodity: "Fisheries",
// //     college: "COED",
// //     status: "Terminated",
// //   },
// //   {
// //     id: 5,
// //     title: "Title 5",
// //     researcher: "Author 5",
// //     commodity: "Hospitality",
// //     college: "CS",
// //     status: "New",
// //   },
// //   {
// //     id: 6,
// //     title: "Title 6",
// //     researcher: "Author 6",
// //     commodity: "Manufacturing",
// //     college: "COJ",
// //     status: "Completed",
// //   },
// //   {
// //     id: 7,
// //     title: "Title 7",
// //     researcher: "Author 7",
// //     commodity: "Event Management",
// //     college: "CAFNR",
// //     status: "Ongoing",
// //   },
// //   {
// //     id: 8,
// //     title: "Title 8",
// //     researcher: "Author 8",
// //     commodity: "Community Development",
// //     college: "COE",
// //     status: "Terminated",
// //   },
// //   {
// //     id: 9,
// //     title: "Title 9",
// //     researcher: "Author 9",
// //     commodity: "Technological",
// //     college: "CBA",
// //     status: "New",
// //   },
// //   {
// //     id: 10,
// //     title: "Title 10",
// //     researcher: "Author 10",
// //     commodity: "Agricultural",
// //     college: "CAC",
// //     status: "Completed",
// //   },
// //   {
// //     id: 11,
// //     title: "Title 11",
// //     researcher: "Author 11",
// //     commodity: "Fisheries",
// //     college: "COED",
// //     status: "Ongoing",
// //   },
// //   {
// //     id: 12,
// //     title: "Title 12",
// //     researcher: "Author 12",
// //     commodity: "Hospitality",
// //     college: "CS",
// //     status: "Terminated",
// //   },
// //   {
// //     id: 13,
// //     title: "Title 13",
// //     researcher: "Author 13",
// //     commodity: "Manufacturing",
// //     college: "COJ",
// //     status: "New",
// //   },
// //   {
// //     id: 14,
// //     title: "Title 14",
// //     researcher: "Author 14",
// //     commodity: "Event Management",
// //     college: "CAFNR",
// //     status: "Completed",
// //   },
// //   {
// //     id: 15,
// //     title: "Title 15",
// //     researcher: "Author 15",
// //     commodity: "Community Development",
// //     college: "COE",
// //     status: "Ongoing",
// //   },
// // ];

// //   const columns = [
// //     { key: "id", header: "ID", align: "left" },
// //     { key: "title", header: "Title", align: "left" },
// //     { key: "researcher", header: "Researcher", align: "center" },
// //     { key: "commodity", header: "Commodity/Unit", align: "center" },
// //     { key: "college", header: "College", align: "center" },
// //     {
// //       key: "status",
// //       header: "Status",
// //       align: "center",
// //       render: (value: BatchEntry["status"]) => {
// //         const styleMap = {
// //           New: "bg-green-100 text-green-700",
// //           Terminated: "bg-red-100 text-red-700",
// //           Completed: "bg-yellow-100 text-yellow-700",
// //           Ongoing: "bg-blue-100 text-blue-700",
// //         };
// //         return (
// //           <span
// //             className={`px-3 py-1 rounded-full text-sm font-medium ${styleMap[value]}`}
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
// //       render: (_: any, row: BatchEntry) => (
// //         <ActionDropdown
// //           onView={() => alert(`Viewing ${row.id}`)}
// //           onApprove={() => alert(`Approving ${row.id}`)}
// //           onRequest={() => alert(`Request for ${row.id}`)}
// //         />
// //       ),
// //     },
// //   ];

// //   return (
// //     <div className="space-y-4 w-full">
// //       <Table columns={columns as any} data={data} />
// //     </div>
// //   );
// // };


// // export default AssignedProjectPage;






// // "use client";

// // import React, { useState, useMemo } from "react";
// // import { Clock, ChevronDown, Filter, BookOpen } from "lucide-react";

// // // 1. Interfaces
// // interface BatchEntry {
// //   id: number;
// //   title: string;
// //   researcher: string;
// //   commodity: string;
// //   college: "COE" | "CBA" | "CAC" | "COED" | "CS" | "COJ" | "CAFNR";
// //   status: "New" | "Completed" | "Ongoing" | "Terminated";
// // }

// // // 2. Updated Helper for Colors based on College
// // const getCollegeStyles = (college: string) => {
// //   const map: Record<string, { bg: string; text: string; dot: string; border: string }> = {
// //     COE: { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-600", border: "border-blue-100" },
// //     CBA: { bg: "bg-purple-50", text: "text-purple-600", dot: "bg-purple-600", border: "border-purple-100" },
// //     CAC: { bg: "bg-orange-50", text: "text-orange-500", dot: "bg-orange-500", border: "border-orange-100" },
// //     COED: { bg: "bg-emerald-50", text: "text-emerald-600", dot: "bg-emerald-600", border: "border-emerald-100" },
// //     CS: { bg: "bg-rose-50", text: "text-rose-600", dot: "bg-rose-600", border: "border-rose-100" },
// //     COJ: { bg: "bg-indigo-50", text: "text-indigo-600", dot: "bg-indigo-600", border: "border-indigo-100" },
// //     CAFNR: { bg: "bg-amber-50", text: "text-amber-600", dot: "bg-amber-600", border: "border-amber-100" },
// //   };
// //   return map[college] || map.COE;
// // };

// // const AssignedProjectPage = () => {
// //   const [filterStatus, setFilterStatus] = useState<string>("All");
// //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

// //   // Mock Data
// //   const data: BatchEntry[] = [
// //     { id: 1, title: "Smart Irrigation System", researcher: "Author 1", commodity: "Technological", college: "COE", status: "New" },
// //     { id: 2, title: "Market Trend Analysis", researcher: "Author 2", commodity: "Technological", college: "CBA", status: "Completed" },
// //     { id: 3, title: "Cultural Heritage Study", researcher: "Author 3", commodity: "Agricultural", college: "CAC", status: "Ongoing" },
// //     { id: 4, title: "Modern Pedagogy", researcher: "Author 4", commodity: "Fisheries", college: "COED", status: "Terminated" },
// //     { id: 7, title: "Soil Nutrient Mapping", researcher: "Author 7", commodity: "Event Management", college: "CAFNR", status: "Ongoing" },
// //   ];

// //   const filteredData = useMemo(() => {
// //     return filterStatus === "All" ? data : data.filter(item => item.status === filterStatus);
// //   }, [filterStatus]);

// //   return (
// //     <div className="w-full max-w-full mx-auto p-4">
// //       <section className="rounded-xl border border-slate-100 bg-white p-4 shadow-lg">
        
// //         {/* Header Section */}
// //         <div className="mb-6 flex items-center justify-between">
// //           <div>
// //             <h2 className="text-base font-semibold text-slate-800">
// //               Assigned Projects
// //             </h2>
// //             <p className="text-[11px] text-slate-400">Manage and monitor research entries</p>
// //           </div>
          
// //           {/* Status Filter Dropdown */}
// //           <div className="relative">
// //             <button 
// //               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
// //               className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 transition-colors hover:bg-slate-100"
// //             >
// //               <Filter size={12} />
// //               {filterStatus === "All" ? "All Status" : filterStatus}
// //               <ChevronDown size={12} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
// //             </button>

// //             {isDropdownOpen && (
// //               <div className="absolute right-0 top-full mt-1 w-32 overflow-hidden rounded-lg border border-slate-100 bg-white shadow-xl z-20">
// //                 {["All", "New", "Ongoing", "Completed", "Terminated"].map((status) => (
// //                   <button 
// //                     key={status}
// //                     onClick={() => { setFilterStatus(status); setIsDropdownOpen(false); }}
// //                     className="flex w-full px-3 py-2 text-left text-[11px] font-medium text-slate-600 hover:bg-slate-50"
// //                   >
// //                     {status}
// //                   </button>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* List Container */}
// //         <div className="flex flex-col gap-3">
// //           {filteredData.map((item) => {
// //             const style = getCollegeStyles(item.college);

// //             return (
// //               <div 
// //                 key={item.id} 
// //                 className="group flex items-center gap-4 rounded-xl border border-transparent p-2 transition-all hover:border-slate-100 hover:bg-slate-50/50"
// //               >
                
// //                 {/* 1. ID/College Badge (Left) */}
// //                 <div
// //                   className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border ${style.bg} ${style.border}`}
// //                 >
// //                   <span className={`text-[9px] font-bold uppercase tracking-tighter ${style.text} opacity-80`}>
// //                     ID
// //                   </span>
// //                   <span className={`text-base font-bold leading-none ${style.text}`}>
// //                     {item.id}
// //                   </span>
// //                 </div>

// //                 {/* 2. Middle Content: Title & Researcher */}
// //                 <div className="flex flex-1 flex-col justify-center min-w-0">
// //                   <h3 className="line-clamp-1 text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
// //                     {item.title}
// //                   </h3>
// //                   <div className="flex items-center gap-2 text-[11px] text-slate-500">
// //                     <span className="font-medium">By {item.researcher}</span>
// //                     <span className="text-slate-300">•</span>
// //                     <span className="truncate italic">{item.commodity}</span>
// //                   </div>
// //                 </div>

// //                 {/* 3. Right Side: College & Status */}
// //                 <div className="flex shrink-0 flex-col items-end justify-center gap-1.5">
                  
// //                   {/* College Tag */}
// //                   <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 ${style.bg}`}>
// //                     <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`}></span>
// //                     <span className={`text-[10px] font-bold ${style.text}`}>
// //                       {item.college}
// //                     </span>
// //                   </div>

// //                   {/* Status & View Action */}
// //                   <div className="flex items-center gap-3">
// //                      <span className={`text-[10px] font-bold uppercase tracking-wide
// //                         ${item.status === 'New' ? 'text-green-600' : 
// //                           item.status === 'Terminated' ? 'text-red-500' : 
// //                           item.status === 'Completed' ? 'text-amber-500' : 'text-blue-500'}`}
// //                      >
// //                        {item.status}
// //                      </span>
// //                      <button 
// //                         onClick={() => alert(`Viewing Project ${item.id}`)}
// //                         className="p-1 hover:bg-slate-200 rounded-md transition-colors text-slate-400 hover:text-slate-600"
// //                         title="View Project"
// //                      >
// //                         <BookOpen size={14} />
// //                      </button>
// //                   </div>
// //                 </div>

// //               </div>
// //             );
// //           })}
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default AssignedProjectPage;














// "use client";

// import React, { useMemo } from "react";
// import { BookOpen } from "lucide-react";

// // 1. Interfaces
// interface BatchEntry {
//   id: number;
//   title: string;
//   researcher: string;
//   commodity: string;
//   college: "COE" | "CBA" | "CAC" | "COED" | "CS" | "COJ" | "CAFNR";
//   status: "New" | "Completed" | "Ongoing" | "Terminated";
// }

// // 2. Updated Helper for Colors based on College
// const getCollegeStyles = (college: string) => {
//   const map: Record<string, { bg: string; text: string; dot: string; border: string }> = {
//     COE: { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-600", border: "border-blue-100" },
//     CBA: { bg: "bg-purple-50", text: "text-purple-600", dot: "bg-purple-600", border: "border-purple-100" },
//     CAC: { bg: "bg-orange-50", text: "text-orange-500", dot: "bg-orange-500", border: "border-orange-100" },
//     COED: { bg: "bg-emerald-50", text: "text-emerald-600", dot: "bg-emerald-600", border: "border-emerald-100" },
//     CS: { bg: "bg-rose-50", text: "text-rose-600", dot: "bg-rose-600", border: "border-rose-100" },
//     COJ: { bg: "bg-indigo-50", text: "text-indigo-600", dot: "bg-indigo-600", border: "border-indigo-100" },
//     CAFNR: { bg: "bg-amber-50", text: "text-amber-600", dot: "bg-amber-600", border: "border-amber-100" },
//   };
//   return map[college] || map.COE;
// };

// const AssignedProjectPage = () => {
//   // Mock Data
//   const data: BatchEntry[] = [
//     { id: 1, title: "Smart Irrigation System", researcher: "Author 1", commodity: "Technological", college: "COE", status: "New" },
//     { id: 2, title: "Market Trend Analysis", researcher: "Author 2", commodity: "Technological", college: "CBA", status: "Completed" },
//     { id: 3, title: "Cultural Heritage Study", researcher: "Author 3", commodity: "Agricultural", college: "CAC", status: "Ongoing" },
//     { id: 4, title: "Modern Pedagogy", researcher: "Author 4", commodity: "Fisheries", college: "COED", status: "Terminated" },
//     { id: 7, title: "Soil Nutrient Mapping", researcher: "Author 7", commodity: "Event Management", college: "CAFNR", status: "Ongoing" },
//     { id: 9, title: "Next-Gen AI Research", researcher: "Author 9", commodity: "Technological", college: "CS", status: "New" },
//   ];

//   // Logic: Filter only 'New' and 'Ongoing' projects
//   const activeProjects = useMemo(() => {
//     return data.filter(item => item.status === "New" || item.status === "Ongoing");
//   }, [data]);

//   return (
//     <div className="w-full max-w-full mx-auto p-4">
//       <section className="rounded-xl border border-slate-100 bg-white p-4 shadow-lg">
        
//         {/* Header Section */}
//         <div className="mb-6">
//           <h2 className="text-base font-semibold text-slate-800">
//             Active Assigned Projects
//           </h2>
//           <p className="text-[11px] text-slate-400">
//             Showing {activeProjects.length} pending and ongoing research entries
//           </p>
//         </div>

//         {/* List Container */}
//         <div className="flex flex-col gap-3">
//           {activeProjects.map((item) => {
//             const style = getCollegeStyles(item.college);

//             return (
//               <div 
//                 key={item.id} 
//                 className="group flex items-center gap-4 rounded-xl border border-transparent p-2 transition-all hover:border-slate-100 hover:bg-slate-50/50"
//               >
                
//                 {/* 1. ID/College Badge (Left) */}
//                 <div
//                   className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border ${style.bg} ${style.border}`}
//                 >
//                   <span className={`text-[9px] font-bold uppercase tracking-tighter ${style.text} opacity-80`}>
//                     ID
//                   </span>
//                   <span className={`text-base font-bold leading-none ${style.text}`}>
//                     {item.id}
//                   </span>
//                 </div>

//                 {/* 2. Middle Content: Title & Researcher */}
//                 <div className="flex flex-1 flex-col justify-center min-w-0">
//                   <h3 className="line-clamp-1 text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
//                     {item.title}
//                   </h3>
//                   <div className="flex items-center gap-2 text-[11px] text-slate-500">
//                     <span className="font-medium">By {item.researcher}</span>
//                     <span className="text-slate-300">•</span>
//                     <span className="truncate italic">{item.commodity}</span>
//                   </div>
//                 </div>

//                 {/* 3. Right Side: College & Status */}
//                 <div className="flex shrink-0 flex-col items-end justify-center gap-1.5">
                  
//                   {/* College Tag */}
//                   <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 ${style.bg}`}>
//                     <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`}></span>
//                     <span className={`text-[10px] font-bold ${style.text}`}>
//                       {item.college}
//                     </span>
//                   </div>

//                   {/* Status & View Action */}
//                   <div className="flex items-center gap-3">
//                      <span className={`text-[10px] font-bold uppercase tracking-wide
//                         ${item.status === 'New' ? 'text-green-600' : 'text-blue-500'}`}
//                      >
//                        {item.status}
//                      </span>
//                      <button 
//                         onClick={() => alert(`Viewing Project ${item.id}`)}
//                         className="p-1 hover:bg-slate-200 rounded-md transition-colors text-slate-400 hover:text-slate-600"
//                         title="View Project"
//                      >
//                         <BookOpen size={14} />
//                      </button>
//                   </div>
//                 </div>

//               </div>
//             );
//           })}

//           {activeProjects.length === 0 && (
//             <div className="py-8 text-center text-slate-400 text-sm italic">
//               No active projects found.
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AssignedProjectPage;

















"use client";

import React, { useMemo } from "react";
import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

// 1. Interfaces
interface BatchEntry {
  id: number;
  title: string;
  researcher: string;
  commodity: string;
  college: "COE" | "CBA" | "CAC" | "COED" | "CS" | "COJ" | "CAFNR";
  status: "New" | "Completed" | "Ongoing" | "Terminated";
}

// 2. Updated Helper for Colors based on College
const getCollegeStyles = (college: string) => {
  const map: Record<string, { bg: string; text: string; dot: string; border: string }> = {
    COE: { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-600", border: "border-blue-100" },
    CBA: { bg: "bg-purple-50", text: "text-purple-600", dot: "bg-purple-600", border: "border-purple-100" },
    CAC: { bg: "bg-orange-50", text: "text-orange-500", dot: "bg-orange-500", border: "border-orange-100" },
    COED: { bg: "bg-emerald-50", text: "text-emerald-600", dot: "bg-emerald-600", border: "border-emerald-100" },
    CS: { bg: "bg-rose-50", text: "text-rose-600", dot: "bg-rose-600", border: "border-rose-100" },
    COJ: { bg: "bg-indigo-50", text: "text-indigo-600", dot: "bg-indigo-600", border: "border-indigo-100" },
    CAFNR: { bg: "bg-amber-50", text: "text-amber-600", dot: "bg-amber-600", border: "border-amber-100" },
  };
  return map[college] || map.COE;
};

const AssignedProjectPage = () => {
  // Mock Data
  const data: BatchEntry[] = [
    { id: 101, title: "Smart Irrigation System", researcher: "Author 1", commodity: "Technological", college: "COE", status: "New" },
    { id: 102, title: "Market Trend Analysis", researcher: "Author 2", commodity: "Technological", college: "CBA", status: "Completed" },
    { id: 103, title: "Cultural Heritage Study", researcher: "Author 3", commodity: "Agricultural", college: "CAC", status: "Ongoing" },
    { id: 104, title: "Modern Pedagogy", researcher: "Author 4", commodity: "Fisheries", college: "COED", status: "Terminated" },
    { id: 107, title: "Soil Nutrient Mapping", researcher: "Author 7", commodity: "Event Management", college: "CAFNR", status: "Ongoing" },
    { id: 109, title: "Next-Gen AI Research", researcher: "Author 9", commodity: "Technological", college: "CS", status: "New" },
  ];

  const router = useRouter();

  // Logic: Filter only 'New' and 'Ongoing' projects
  const activeProjects = useMemo(() => {
    return data.filter(item => item.status === "New" || item.status === "Ongoing");
  }, [data]);

  const handleClick = () => {
    router.push('/evaluation/proposal')
  }

  return (
    <div className="w-full max-w-full mx-auto md:p-2">
      <section className="rounded-sm border border-slate-100 bg-white p-4 shadow-lg">
        
        {/* Header Section */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-slate-800">
            Active Assigned Projects
          </h2>
          <p className="text-[11px] text-slate-400">
            Showing {activeProjects.length} active research entries
          </p>
        </div>

        {/* List Container */}
        <div className="flex flex-col gap-3">
          {activeProjects.map((item, index) => {
            const style = getCollegeStyles(item.college);

            return (
              <div 
                key={item.id} 
                className="group flex items-center gap-4 rounded-xl border border-transparent p-2 transition-all hover:border-slate-100 hover:bg-slate-50/50"
              >
                
                {/* 1. SEQUENTIAL NUMBER Badge (Left) */}
                <div onClick={handleClick}
                  className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border ${style.bg} ${style.border}`}
                >
                  <span className={`text-[9px] font-bold uppercase tracking-tighter ${style.text} opacity-80`}>
                    NO.
                  </span>
                  <span className={`text-base font-bold leading-none ${style.text}`}>
                    {index + 1}
                  </span>
                </div>

                {/* 2. Middle Content: Title & Commodity Only */}
                <div onClick={handleClick} className="flex flex-1 flex-col justify-center min-w-0">
                  <h3 className="line-clamp-1 text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                    <span className="truncate italic">{item.commodity}</span>
                  </div>
                </div>

                {/* 3. Right Side: College & Status */}
                <div onClick={handleClick} className="flex shrink-0 flex-col items-end justify-center gap-1.5">
                  
                  {/* College Tag */}
                  <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 ${style.bg}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`}></span>
                    <span className={`text-[10px] font-bold ${style.text}`}>
                      {item.college}
                    </span>
                  </div>

                  {/* Status & View Action */}
                  <div onClick={handleClick} className="flex items-center gap-3">
                     <span className={`text-[10px] font-bold uppercase tracking-wide
                        ${item.status === 'New' ? 'text-green-600' : 'text-blue-500'}`}
                     >
                       {item.status}
                     </span>
                     <button 
                        onClick={() => alert(`Viewing Project: ${item.title}`)}
                        className="p-1 hover:bg-slate-200 rounded-md transition-colors text-slate-400 hover:text-slate-600"
                        title="View Project"
                     >
                        <BookOpen size={14} />
                     </button>
                  </div>
                </div>

              </div>
            );
          })}

          {activeProjects.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-sm italic">
              No active projects found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AssignedProjectPage;