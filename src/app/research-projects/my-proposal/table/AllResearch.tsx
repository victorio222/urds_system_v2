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

// // const AllResearchPage = () => {
// //   const data: ResearchProject[] = [
// //     {
// //       id: 1,
// //       title: "Plant Growth Study",
// //       researcher: "Dr. Alice",
// //       campus: "Main",
// //       college: "Science",
// //       status: "Completed",
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
// //       status: "Ongoing",
// //     },
// //     {
// //       id: 4,
// //       title: "Water Quality Study",
// //       researcher: "Dr. Dave",
// //       campus: "East",
// //       college: "Environment",
// //       status: "Terminated",
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

// // export default AllResearchPage;




// "use client";

// import React, { useState, useMemo } from "react";
// import Table from "@/component/ui/Table";
// import { BiSolidFilterAlt, BiSearch, BiPlus } from "react-icons/bi";
// import ActionDropdown from "../action/ActionDropdown";
// import Dropdown, { DropdownItem } from "@/component/ui/Dropdown";

// // Expanded Interface for a "Real" Research Hub
// interface ResearchProject {
//   id: string;
//   title: string;
//   researcher: string;
//   campus: string;
//   college: string;
//   dateSubmitted: string;
//   status: "Completed" | "Terminated" | "Pending" | "Ongoing";
// }

// const AllResearchPage = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [year, setYear] = useState(2025);
//   const [status, setStatus] = useState("All Proposals");

//   // Mock Data (In a real app, this comes from an API/Database)
//   const rawData: ResearchProject[] = [
//     { id: "PRJ-001", title: "Sustainable Urban Farming", researcher: "Dr. Alice Smith", campus: "Main", college: "Agriculture", dateSubmitted: "2025-01-12", status: "Ongoing" },
//     { id: "PRJ-002", title: "AI in Healthcare Diagnostics", researcher: "Prof. Bob Jones", campus: "West", college: "Engineering", dateSubmitted: "2024-11-05", status: "Completed" },
//     { id: "PRJ-003", title: "Microplastic Filtration", researcher: "Dr. Carol White", campus: "Main", college: "Science", dateSubmitted: "2025-02-20", status: "Pending" },
//   ];

//   // Filtering Logic
//   const filteredData = useMemo(() => {
//     return rawData.filter((item) => {
//       const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                             item.researcher.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesStatus = status === "All Proposals" || item.status === status;
//       return matchesSearch && matchesStatus;
//     });
//   }, [searchTerm, status]);

//   const columns = [
//     { key: "id", header: "ID", align: "left", width: "100px" },
//     { 
//       key: "title", 
//       header: "Project Title", 
//       render: (val: string) => <span className="font-semibold text-slate-800">{val}</span> 
//     },
//     { key: "researcher", header: "Principal Investigator" },
//     { key: "dateSubmitted", header: "Date Submitted" },
//     {
//       key: "status",
//       header: "Status",
//       render: (value: ResearchProject["status"]) => {
//         const styles = {
//           Completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
//           Terminated: "bg-rose-100 text-rose-700 border-rose-200",
//           Pending: "bg-amber-100 text-amber-700 border-amber-200",
//           Ongoing: "bg-sky-100 text-sky-700 border-sky-200",
//         };
//         return (
//           <span className={`px-2 py-1 rounded border text-xs font-bold uppercase ${styles[value]}`}>
//             {value}
//           </span>
//         );
//       },
//     },
//     {
//       key: "action",
//       header: "Action",
//       align: "center",
//       render: (_: any, row: ResearchProject) => (
//         <ActionDropdown 
//             onView={() => console.log("View", row.id)} 
//             onApprove={() => console.log("Edit", row.id)} 
//         />
//       ),
//     },
//   ];

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-800">Research Proposals</h1>
//           <p className="text-slate-500 text-sm">Manage and track institutional research projects.</p>
//         </div>
//         <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition shadow-sm">
//           <BiPlus className="mr-2 text-xl" />
//           New Proposal
//         </button>
//       </div>

//       {/* Stats Quick View */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         {[
//             { label: 'Total', count: rawData.length, color: 'text-slate-600' },
//             { label: 'Ongoing', count: 12, color: 'text-sky-600' },
//             { label: 'Pending', count: 5, color: 'text-amber-600' },
//             { label: 'Completed', count: 24, color: 'text-emerald-600' }
//         ].map((stat, i) => (
//             <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
//                 <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">{stat.label}</p>
//                 <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
//             </div>
//         ))}
//       </div>

//       {/* Tool Bar */}
//       <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-wrap items-center gap-4">
//         <div className="relative flex-grow max-w-md">
//           <BiSearch className="absolute left-3 top-1/2 -transform -translate-y-1/2 text-slate-400 text-lg" />
//           <input 
//             type="text"
//             placeholder="Search by title or researcher..."
//             className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
        
//         <div className="flex items-center gap-2 ml-auto">
//           <Dropdown buttonContent={`Year: ${year}`} items={[2024, 2025].map(y => ({ label: y.toString(), onClick: () => setYear(y) }))} />
//           <Dropdown buttonContent={status} items={["All Proposals", "Ongoing", "Completed", "Pending"].map(s => ({ label: s, onClick: () => setStatus(s) }))} />
//           <button className="flex items-center px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200">
//             <BiSolidFilterAlt className="mr-2" />
//             Filters
//           </button>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
//         <Table columns={columns as any} data={filteredData} />
//         {filteredData.length === 0 && (
//           <div className="p-10 text-center text-slate-500">
//             No proposals found matching your criteria.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllResearchPage;








"use client";

import React, { useState, useMemo } from "react";
import { 
  BiMessageDetail, BiHistory, BiPencil, BiRevision, 
  BiFilterAlt, BiSearch, BiPlus, BiX, BiCheckCircle 
} from "react-icons/bi";
import Table from "@/component/ui/Table";
import Dropdown from "@/component/ui/Dropdown";

// --- Types ---
interface Feedback {
  user: string;
  comment: string;
  date: string;
}

interface HistoryLog {
  status: string;
  date: string;
  note: string;
}

interface ResearchProject {
  id: string;
  title: string;
  researcher: string;
  status: "Draft" | "Under Revision" | "Pending" | "Ongoing" | "Completed";
  version: string;
  progress: number;
  feedback: Feedback[];
  history: HistoryLog[];
  lastUpdated: string;
}

// --- Main Component ---
const ResearchHub = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<ResearchProject | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock Data: Focused on the revision/drafting lifecycle
  const [projects] = useState<ResearchProject[]>([
    {
      id: "RES-2025-001",
      title: "Impact of AI on Rural Farming in Visayas",
      researcher: "Dr. Maria Santos",
      status: "Under Revision",
      version: "v2.1",
      progress: 65,
      lastUpdated: "2 hours ago",
      feedback: [
        { user: "Reviewer A", comment: "Please clarify the methodology in section 3.", date: "2025-12-14" },
        { user: "Admin", comment: "Budget breakdown is missing.", date: "2025-12-15" }
      ],
      history: [
        { status: "Draft Created", date: "2025-12-01", note: "Initial upload" },
        { status: "Submitted", date: "2025-12-05", note: "Sent for initial review" },
        { status: "Under Revision", date: "2025-12-14", note: "Revision requested by panel" }
      ]
    },
    {
      id: "RES-2025-004",
      title: "Hydroponics Efficiency Study",
      researcher: "Engr. John Doe",
      status: "Draft",
      version: "v1.0",
      progress: 25,
      lastUpdated: "Yesterday",
      feedback: [],
      history: [{ status: "Draft Created", date: "2025-12-10", note: "Started draft" }]
    }
  ]);

  // Filter Logic
  const filteredData = useMemo(() => {
    return projects.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.researcher.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, projects]);

  // Column Definitions
  const columns = [
    {
      key: "title",
      header: "Project Details",
      render: (val: string, row: ResearchProject) => (
        <div className="py-1">
          <div className="font-bold text-slate-800 leading-tight">{val}</div>
          <div className="flex items-center text-[11px] text-slate-500 mt-1 space-x-2 font-medium">
            <span className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">{row.id}</span>
            <span>•</span>
            <span className="flex items-center"><BiRevision className="mr-1"/> {row.version}</span>
            <span>•</span>
            <span>Updated {row.lastUpdated}</span>
          </div>
        </div>
      )
    },
    {
      key: "progress",
      header: "Completion",
      render: (val: number) => (
        <div className="w-full max-w-[100px]">
          <div className="flex justify-between text-[10px] mb-1 font-bold text-slate-500">
            <span>{val}%</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200">
            <div 
              className={`h-full transition-all ${val < 50 ? 'bg-amber-400' : 'bg-blue-500'}`} 
              style={{ width: `${val}%` }}
            />
          </div>
        </div>
      )
    },
    {
      key: "feedback",
      header: "Feedback",
      align: "center",
      render: (val: Feedback[]) => (
        <div className="relative inline-block">
          <BiMessageDetail className={`text-xl ${val.length > 0 ? 'text-blue-600' : 'text-slate-300'}`} />
          {val.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-[16px] h-4 flex items-center justify-center rounded-full px-1">
              {val.length}
            </span>
          )}
        </div>
      )
    },
    {
      key: "status",
      header: "Status",
      render: (status: string) => {
        const styles: any = {
          "Draft": "bg-slate-100 text-slate-600 border-slate-300",
          "Under Revision": "bg-purple-100 text-purple-700 border-purple-200",
          "Ongoing": "bg-blue-100 text-blue-700 border-blue-200",
          "Completed": "bg-emerald-100 text-emerald-700 border-emerald-200",
        };
        return (
          <span className={`px-2 py-1 rounded-md border text-[10px] font-bold uppercase tracking-tighter ${styles[status]}`}>
            {status}
          </span>
        );
      }
    },
    {
      key: "action",
      header: "Track",
      align: "center",
      render: (_: any, row: ResearchProject) => (
        <div className="flex items-center justify-center space-x-1">
          <button 
            onClick={() => { setSelectedProject(row); setIsSidebarOpen(true); }}
            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
            title="View History"
          >
            <BiHistory size={18} />
          </button>
          <button className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition" title="Edit">
            <BiPencil size={18} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex">
      {/* Main Content */}
      <div className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'mr-80' : 'mr-0'}`}>
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Research Hub</h1>
              <p className="text-slate-500 text-sm">Draft, revise, and track your proposal progress.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-semibold transition shadow-sm">
              <BiPlus className="mr-2 text-lg" /> New Proposal
            </button>
          </div>

          {/* Statistics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'In Drafting', val: '12', color: 'border-l-slate-400' },
              { label: 'Under Revision', val: '04', color: 'border-l-purple-500' },
              { label: 'Total Feedback', val: '28', color: 'border-l-blue-500' },
              { label: 'Success Rate', val: '92%', color: 'border-l-emerald-500' },
            ].map((stat, i) => (
              <div key={i} className={`bg-white p-4 rounded-xl border border-slate-200 border-l-4 shadow-sm ${stat.color}`}>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-xl font-black text-slate-800">{stat.val}</p>
              </div>
            ))}
          </div>

          {/* Search & Filters */}
          <div className="flex flex-wrap gap-3 items-center bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <div className="relative flex-grow max-w-sm">
              <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" placeholder="Search projects or researchers..." 
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/10 focus:outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 ml-auto">
              <button className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-lg">
                <BiFilterAlt className="mr-2" /> Filters
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <Table columns={columns as any} data={filteredData} />
          </div>
        </div>
      </div>

      {/* History & Feedback Sidebar */}
      {isSidebarOpen && selectedProject && (
        <div className="fixed right-0 top-0 h-full w-80 bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="font-bold text-slate-800">Project Timeline</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="p-1 hover:bg-slate-200 rounded">
              <BiX size={20} />
            </button>
          </div>
          
          <div className="p-4 overflow-y-auto flex-grow space-y-6">
            {/* Feedback Section */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center">
                <BiMessageDetail className="mr-2"/> Recent Feedback
              </h3>
              {selectedProject.feedback.length > 0 ? (
                selectedProject.feedback.map((f, i) => (
                  <div key={i} className="bg-blue-50 p-3 rounded-lg mb-2 text-sm border border-blue-100">
                    <div className="flex justify-between font-bold text-blue-800 text-[11px] mb-1">
                      <span>{f.user}</span>
                      <span>{f.date}</span>
                    </div>
                    <p className="text-slate-700 italic">"{f.comment}"</p>
                  </div>
                ))
              ) : <p className="text-xs text-slate-400 italic">No feedback yet.</p>}
            </div>

            {/* History Timeline */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center">
                <BiHistory className="mr-2"/> Status History
              </h3>
              <div className="relative border-l-2 border-slate-100 ml-2 pl-4 space-y-4">
                {selectedProject.history.map((h, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 bg-white border-2 border-blue-500 rounded-full"></div>
                    <p className="text-[11px] font-bold text-slate-800">{h.status}</p>
                    <p className="text-[10px] text-slate-500">{h.date}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{h.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-slate-100">
            <button className="w-full bg-slate-800 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center">
              <BiCheckCircle className="mr-2" /> Mark as Revised
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResearchHub;