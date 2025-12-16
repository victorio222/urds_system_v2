// "use client";

// import React, { useState } from "react";
// import { BiPlus, BiChevronRight } from "react-icons/bi";
// // Ensure the filename is exactly ProjectWorkspace.tsx (lowercase 's')
// import ProjectWorkspace from "./ProjectWorkSpace"; 
// import { BsPlusCircleFill } from "react-icons/bs";

// const ProposalsPage = () => {
//   const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

//   const myProposals = [
//     { id: "PRJ-001", title: "Climate Resilient Corn Varieties", progress: 75, status: "Under Revision", date: "Dec 12, 2025" },
//     { id: "PRJ-002", title: "Urban Hydroponics System", progress: 30, status: "Draft", date: "Dec 15, 2025" },
//   ];

//   if (selectedProjectId) {
//     return <ProjectWorkspace id={selectedProjectId} onBack={() => setSelectedProjectId(null)} />;
//   }

//   return (
//     <div className="px-7 py-3 max-w-full">
//       <div className="flex justify-between items-center mb-2">
//         <div>
//           <p className="text-slate-500 text-sm">Manage your submissions and track revisions.</p>
//         </div>
//         <button className="bg-blue-600 text-sm hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center font-medium transition shadow-sm">
//           <BsPlusCircleFill className="mr-2" /> New Proposal
//         </button>
//       </div>

//       <div className="grid gap-1">
//         {myProposals.map((project) => (
//           <div key={project.id} className="bg-white border border-slate-200 rounded-xl px-3 py-3 hover:shadow-md transition flex items-center justify-between">
//             <div className="flex-grow">
//               <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{project.id}</span>
//               <h3 className="font-bold text-slate-800 text-lg">{project.title}</h3>
//               <div className="flex items-center gap-4 mt-2">
//                  <div className="w-48 bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
//                     <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${project.progress}%` }} />
//                  </div>
//                  <span className="text-xs font-semibold text-slate-500">{project.progress}% Complete</span>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-6">
//               <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${
//                 project.status === 'Draft' ? 'bg-slate-50 text-slate-500 border-slate-200' : 'bg-purple-50 text-purple-600 border-purple-100'
//               }`}>
//                 {project.status}
//               </span>
//               <button 
//                 onClick={() => setSelectedProjectId(project.id)}
//                 className="flex items-center gap-1 bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-900 transition shadow-sm"
//               >
//                 View & Manage <BiChevronRight size={18} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProposalsPage;











"use client";

import React, { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import ProjectWorkspace from "./ProjectWorkSpace";
import { BsPlusCircleFill } from "react-icons/bs";

const ProposalsPage = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const myProposals = [
    { id: "PRJ-001", title: "Climate Resilient Corn Varieties", progress: 75, status: "Under Revision", date: "Dec 12, 2025" },
    { id: "PRJ-002", title: "Urban Hydroponics System", progress: 30, status: "Draft", date: "Dec 15, 2025" },
  ];

  if (selectedProjectId) {
    return (
      <ProjectWorkspace
        id={selectedProjectId}
        onBack={() => setSelectedProjectId(null)}
      />
    );
  }

  return (
    <div className="px-4 sm:px-7 py-4 max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <p className="text-slate-500 text-sm">
          Manage your submissions and track revisions.
        </p>

        <div className="flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center justify-center font-medium transition shadow-sm text-sm w-40 sm:w-auto">
          <BsPlusCircleFill className="mr-2" />
          <span className="sm:inline">New Proposal</span>
        </button>
        </div>
      </div>

      {/* Proposal Cards */}
      <div className="grid gap-3">
        {myProposals.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            {/* Left Content */}
            <div className="flex-grow">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                {project.id}
              </span>
              <h3 className="font-bold text-slate-800 text-base sm:text-lg">
                {project.title}
              </h3>

              {/* Progress */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                <div className="w-full sm:w-48 bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="bg-blue-500 h-full transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {project.progress}% Complete
                </span>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <span
                className={`text-center px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${
                  project.status === "Draft"
                    ? "bg-slate-50 text-slate-500 border-slate-200"
                    : "bg-purple-50 text-purple-600 border-purple-100"
                }`}
              >
                {project.status}
              </span>

              <button
                onClick={() => setSelectedProjectId(project.id)}
                className="flex items-center justify-center gap-1 bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-900 transition shadow-sm w-full sm:w-auto"
              >
                View & Manage <BiChevronRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProposalsPage;
