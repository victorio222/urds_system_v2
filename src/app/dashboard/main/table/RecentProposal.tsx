// import React, { useState, useMemo } from "react";
// import { Eye, ChevronDown, ChevronLeft, ChevronRight, Filter } from "lucide-react";

// // 1. Interface
// interface ResearchProject {
//   id: number;
//   title: string;
//   researcher: string;
//   campus: string;
//   college: string;
//   status: "Completed" | "Terminated" | "Pending" | "Ongoing";
// }

// // 2. Mock Data (Extended for pagination demo)
// const initialData: ResearchProject[] = [
//   { id: 1, title: "Plant Growth Study and Analysis of Soil Variants", researcher: "Dr. Alice", campus: "Main", college: "Science", status: "Pending" },
//   { id: 2, title: "Soil Analysis in Western Highlands", researcher: "Dr. Bob", campus: "West", college: "Agriculture", status: "Pending" },
//   { id: 3, title: "Genetic Research on Rice Varieties", researcher: "Dr. Carol", campus: "Main", college: "Biotech", status: "Completed" },
//   { id: 4, title: "Water Quality Study in Coastal Areas", researcher: "Dr. Dave", campus: "East", college: "Environment", status: "Pending" },
//   { id: 5, title: "Urban Farming AI Automation System", researcher: "Dr. Evans", campus: "Main", college: "Technology", status: "Ongoing" },
//   { id: 6, title: "Renewable Energy Grid Optimization", researcher: "Dr. Frank", campus: "South", college: "Engineering", status: "Pending" },
//   { id: 7, title: "Marine Biodiversity Assessment", researcher: "Dr. Grace", campus: "East", college: "Fisheries", status: "Ongoing" },
// ];

// const ITEMS_PER_PAGE = 5;

// // Helper for Status Colors
// const getStatusStyles = (status: string) => {
//   switch (status) {
//     case "Completed": return "bg-emerald-50 text-emerald-700 border border-emerald-100";
//     case "Terminated": return "bg-red-50 text-red-700 border border-red-100";
//     case "Ongoing": return "bg-blue-50 text-blue-700 border border-blue-100";
//     default: return "bg-amber-50 text-amber-700 border border-amber-100";
//   }
// };

// const RecentProjectPage: React.FC = () => {
//   const [filterCategory, setFilterCategory] = useState<string>("All");
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);

//   // 1. Extract Unique Options for Filter
//   const uniqueCampuses = Array.from(new Set(initialData.map(item => item.campus)));
//   const uniqueColleges = Array.from(new Set(initialData.map(item => item.college)));

//   // 2. Filter Logic
//   const filteredData = useMemo(() => {
//     if (filterCategory === "All") return initialData;
//     return initialData.filter(
//       item => item.campus === filterCategory || item.college === filterCategory
//     );
//   }, [filterCategory]);

//   // 3. Pagination Logic
//   const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
//   const currentData = filteredData.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   const handleFilterSelect = (value: string) => {
//     setFilterCategory(value);
//     setIsFilterOpen(false);
//     setCurrentPage(1); // Reset to page 1 on filter change
//   };

//   const handleView = (title: string) => {
//     alert(`Viewing details for: ${title}`);
//   };

//   return (
//     <div className="w-full rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
      
//       {/* --- Header --- */}
//       <div className="mb-4 flex items-center justify-between">
//         <div>
//           <h2 className="text-base font-bold text-slate-800">Recent Review Proposals</h2>
//           <p className="text-[11px] font-medium text-slate-400">Manage and review latest submissions</p>
//         </div>

//         {/* Functional Filter Dropdown */}
//         <div className="relative">
//           <button 
//             onClick={() => setIsFilterOpen(!isFilterOpen)}
//             className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-[11px] font-semibold transition-colors ${filterCategory !== "All" ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
//           >
//              <Filter size={12} />
//              {filterCategory === "All" ? "Filter View" : filterCategory}
//              <ChevronDown size={12} />
//           </button>

//           {isFilterOpen && (
//             <div className="absolute right-0 top-full mt-1 w-40 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl z-20">
//               <div className="max-h-60 overflow-y-auto py-1">
//                 <button onClick={() => handleFilterSelect("All")} className="w-full px-4 py-2 text-left text-[11px] font-medium text-slate-600 hover:bg-slate-50">All Proposals</button>
                
//                 {/* Campus Group */}
//                 <div className="px-4 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50 mt-1">By Campus</div>
//                 {uniqueCampuses.map(c => (
//                   <button key={c} onClick={() => handleFilterSelect(c)} className="w-full px-4 py-1.5 text-left text-[11px] text-slate-600 hover:bg-slate-50 hover:text-indigo-600">{c}</button>
//                 ))}

//                 {/* College Group */}
//                 <div className="px-4 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50 mt-1">By College</div>
//                 {uniqueColleges.map(c => (
//                   <button key={c} onClick={() => handleFilterSelect(c)} className="w-full px-4 py-1.5 text-left text-[11px] text-slate-600 hover:bg-slate-50 hover:text-indigo-600">{c}</button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* --- Table Container --- */}
//       <div className="w-full overflow-hidden rounded-xl border border-slate-100">
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-left">
            
//             {/* Compact Header */}
//             <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-100">
//               <tr>
//                 <th className="px-4 py-2.5 text-center w-12">#</th>
//                 <th className="px-4 py-2.5">Title</th>
//                 <th className="px-4 py-2.5">Researcher</th>
//                 <th className="px-4 py-2.5 text-center">Campus</th>
//                 <th className="px-4 py-2.5 text-center">College</th>
//                 <th className="px-4 py-2.5 text-center">Status</th>
//                 <th className="px-4 py-2.5 text-center w-16">Action</th>
//               </tr>
//             </thead>

//             {/* Compact Body */}
//             <tbody className="divide-y divide-slate-50 bg-white">
//               {currentData.length > 0 ? (
//                 currentData.map((row, index) => (
//                   <tr key={row.id} className="group hover:bg-slate-50/60 transition-colors">
//                     <td className="px-4 py-2.5 text-center text-[11px] font-medium text-slate-400">
//                       {row.id}
//                     </td>
//                     <td className="px-4 py-2.5">
//                       <div className="max-w-[180px] truncate text-[11px] font-bold text-slate-700" title={row.title}>
//                         {row.title}
//                       </div>
//                     </td>
//                     <td className="px-4 py-2.5 text-[11px] font-medium text-slate-600">
//                       {row.researcher}
//                     </td>
//                     <td className="px-4 py-2.5 text-center">
//                       <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">
//                         {row.campus}
//                       </span>
//                     </td>
//                     <td className="px-4 py-2.5 text-center text-[11px] text-slate-600">
//                       {row.college}
//                     </td>
//                     <td className="px-4 py-2.5 text-center">
//                       <span className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${getStatusStyles(row.status)}`}>
//                         {row.status}
//                       </span>
//                     </td>
//                     <td className="px-4 py-2.5 text-center">
//                       <button 
//                         onClick={() => handleView(row.title)}
//                         className="rounded-md p-1 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
//                         title="View Details"
//                       >
//                         <Eye size={14} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={7} className="px-4 py-8 text-center text-xs text-slate-400 italic">
//                     No results found for this filter.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
      
//       {/* --- Footer: Pagination (Bottom Left) --- */}
//       <div className="mt-3 flex items-center justify-start gap-3 pl-1">
//         <div className="flex items-center gap-1">
//             <button 
//               onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//               disabled={currentPage === 1}
//               className="rounded-md border border-slate-200 p-1 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white"
//             >
//               <ChevronLeft size={14} />
//             </button>
            
//             <span className="text-[10px] font-semibold text-slate-500">
//                Page {currentPage} of {totalPages || 1}
//             </span>

//             <button 
//               onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//               disabled={currentPage === totalPages || totalPages === 0}
//               className="rounded-md border border-slate-200 p-1 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white"
//             >
//               <ChevronRight size={14} />
//             </button>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default RecentProjectPage;



import React, { useState, useMemo } from "react";
import { Eye, ChevronDown, ChevronLeft, ChevronRight, Filter, ArrowRight } from "lucide-react";

// --- 1. Interface ---
interface ResearchProject {
  id: number;
  title: string;
  researcher: string;
  campus: string;
  college: string;
  status: "Completed" | "Terminated" | "Pending" | "Ongoing";
}

// --- 2. Mock Data ---
const initialData: ResearchProject[] = [
  { id: 1, title: "Plant Growth Study and Analysis of Soil Variants in Northern Regions", researcher: "Dr. Alice", campus: "Main", college: "Science", status: "Pending" },
  { id: 2, title: "Soil Analysis in Western Highlands and Agricultural Zones", researcher: "Dr. Bob", campus: "West", college: "Agriculture", status: "Pending" },
  { id: 3, title: "Genetic Research on Rice Varieties for Drought Resistance", researcher: "Dr. Carol", campus: "Main", college: "Biotech", status: "Completed" },
  { id: 4, title: "Water Quality Study in Coastal Areas and Marine Sanctuaries", researcher: "Dr. Dave", campus: "East", college: "Environment", status: "Pending" },
  { id: 5, title: "Urban Farming AI Automation System and Smart Irrigation", researcher: "Dr. Evans", campus: "Main", college: "Technology", status: "Ongoing" },
  { id: 6, title: "Renewable Energy Grid Optimization for Rural Communities", researcher: "Dr. Frank", campus: "South", college: "Engineering", status: "Pending" },
  { id: 7, title: "Marine Biodiversity Assessment in Protected Coral Reefs", researcher: "Dr. Grace", campus: "East", college: "Fisheries", status: "Ongoing" },
];

const ITEMS_PER_PAGE = 5;

// --- 3. Helper: Status Styling ---
const getStatusStyles = (status: string) => {
  switch (status) {
    case "Completed": return "bg-emerald-50 text-emerald-600 border border-emerald-100";
    case "Terminated": return "bg-red-50 text-red-600 border border-red-100";
    case "Ongoing": return "bg-blue-50 text-blue-600 border border-blue-100";
    default: return "bg-amber-50 text-amber-600 border border-amber-100";
  }
};

const RecentProjectPage: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter Logic
  const uniqueCampuses = Array.from(new Set(initialData.map(item => item.campus)));
  const uniqueColleges = Array.from(new Set(initialData.map(item => item.college)));

  const filteredData = useMemo(() => {
    if (filterCategory === "All") return initialData;
    return initialData.filter(
      item => item.campus === filterCategory || item.college === filterCategory
    );
  }, [filterCategory]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterSelect = (value: string) => {
    setFilterCategory(value);
    setIsFilterOpen(false);
    setCurrentPage(1); 
  };

  const handleViewAll = () => {
    // Add router navigation here
    console.log("Navigating to full list...");
  };

  return (
    <div className="w-full rounded-xl bg-white p-4 shadow-sm border border-slate-100 font-sans">
      
      {/* --- Header Section --- */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm lg:text-base font-meduim text-slate-800">
            Recent Reviewed Proposals
          </h2>
          <p className="text-xs  text-slate-400">
            Manage and review latest submissions
          </p>
        </div>

        {/* Filter Button */}
        <div className="relative">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-[11px] font-bold transition-all ${filterCategory !== "All" ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
          >
             <Filter size={12} />
             {filterCategory === "All" ? "Filter View" : filterCategory}
             <ChevronDown size={12} />
          </button>

          {/* Dropdown Menu */}
          {isFilterOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl z-20">
              <div className="max-h-60 overflow-y-auto py-1">
                <button onClick={() => handleFilterSelect("All")} className="w-full px-4 py-2 text-left text-[11px] font-bold text-slate-600 hover:bg-slate-50">All Proposals</button>
                
                <div className="px-4 py-1.5 text-[9px] font-extrabold text-slate-400 uppercase tracking-wider bg-slate-50 mt-1">By Campus</div>
                {uniqueCampuses.map(c => (
                  <button key={c} onClick={() => handleFilterSelect(c)} className="w-full px-4 py-2 text-left text-[11px] font-medium text-slate-600 hover:bg-slate-50 hover:text-indigo-600">{c}</button>
                ))}

                <div className="px-4 py-1.5 text-[9px] font-extrabold text-slate-400 uppercase tracking-wider bg-slate-50 mt-1">By College</div>
                {uniqueColleges.map(c => (
                  <button key={c} onClick={() => handleFilterSelect(c)} className="w-full px-4 py-2 text-left text-[11px] font-medium text-slate-600 hover:bg-slate-50 hover:text-indigo-600">{c}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- Table Container --- */}
      <div className="w-full overflow-hidden rounded-xl border border-slate-100">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            
            {/* Table Header */}
            <thead className="bg-slate-50/80 text-[10px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-100">
              <tr>
                <th className="px-4 py-2.5 text-center w-10">#</th>
                <th className="px-4 py-2.5">Title</th>
                <th className="px-4 py-2.5">Researcher</th>
                <th className="px-4 py-2.5 text-center">Campus</th>
                <th className="px-4 py-2.5 text-center">College</th>
                <th className="px-4 py-2.5 text-center">Status</th>
                <th className="px-4 py-2.5 text-center w-16">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-50 bg-white">
              {currentData.length > 0 ? (
                currentData.map((row) => (
                  <tr key={row.id} className="group hover:bg-slate-50/60 transition-colors">
                    {/* ID */}
                    <td className="px-4 py-2.5 text-center text-xs font-medium text-slate-400">
                      {row.id}
                    </td>
                    
                    {/* Title (Darker, Important) */}
                    <td className="px-4 py-2.5">
                      <div className="max-w-[350px] truncate text-xs lg:text-sm font-medium text-slate-800" title={row.title}>
                        {row.title}
                      </div>
                    </td>

                    {/* Researcher (Medium) */}
                    <td className="px-4 py-2.5 text-xs lg:text-sm font-medium text-slate-600">
                      {row.researcher}
                    </td>
                    
                    {/* Campus (Lighter) */}
                    <td className="px-4 py-2.5 text-center">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
                        {row.campus}
                      </span>
                    </td>
                    
                    {/* College (Lighter) */}
                    <td className="px-4 py-2.5 text-center text-xs text-slate-500">
                      {row.college}
                    </td>
                    
                    {/* Status */}
                    <td className="px-4 py-2.5 text-center">
                      <span className={`inline-block rounded-md px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide ${getStatusStyles(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                    
                    {/* Action */}
                    <td className="px-4 py-2.5 text-center">
                      <button 
                        onClick={() => alert(`View details for ${row.title}`)}
                        className="rounded-md p-1.5 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                        title="View Proposal"
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-xs text-slate-400 italic">
                    No results found for current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* --- Footer Controls --- */}
      <div className="mt-3 flex items-center justify-between px-1">
        
        {/* Pagination */}
        <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-slate-200 p-1 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            
            <span className="text-[10px] font-bold text-slate-500">
               Page {currentPage} of {totalPages || 1}
            </span>

            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="rounded-lg border border-slate-200 p-1 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-colors"
            >
              <ChevronRight size={14} />
            </button>
        </div>

        {/* View All Button */}
        <button 
          onClick={handleViewAll}
          className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          View All <ArrowRight size={12} />
        </button>

      </div>
    </div>
  );
};

export default RecentProjectPage;