// "use client";

// import React, { useState } from "react";
// import { BiArrowBack, BiStats, BiHistory, BiMessageSquareDetail, BiFile, BiTimeFive, BiCheckCircle, BiPlus } from "react-icons/bi";

// type Tab = "drafts" | "statistics" | "timeline" | "evaluation";

// const ProjectWorkspace = ({ id, onBack }: { id: string; onBack: () => void }) => {
//   const [activeTab, setActiveTab] = useState<Tab>("drafts");

//   const navItems = [
//     { id: "drafts", label: "Drafts & Files", icon: <BiFile /> },
//     { id: "statistics", label: "Progress Stats", icon: <BiStats /> },
//     { id: "timeline", label: "Activity Timeline", icon: <BiTimeFive /> },
//     { id: "evaluation", label: "Comments & Feedback", icon: <BiMessageSquareDetail /> },
//   ];

//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col animate-in fade-in duration-500">
//       {/* Dynamic Header */}
//       <header className="bg-white border-b border-slate-200 p-4 sticky top-0 z-10 shadow-sm">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="flex items-center gap-4">
//             <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition text-slate-600">
//               <BiArrowBack size={20} />
//             </button>
//             <div>
//               <h2 className="font-bold text-slate-900 leading-tight">Project Workspace: {id}</h2>
//               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Research Hub Dashboard</p>
//             </div>
//           </div>
//           <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
//             {navItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => setActiveTab(item.id as Tab)}
//                 className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
//                   activeTab === item.id ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
//                 }`}
//               >
//                 {item.icon} {item.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </header>

//       {/* Content Area */}
//       <main className="p-6 max-w-7xl mx-auto w-full flex-grow">
//         {activeTab === "drafts" && <DraftsContent />}
//         {activeTab === "statistics" && <StatsContent />}
//         {activeTab === "timeline" && <TimelineContent />}
//         {activeTab === "evaluation" && <EvaluationContent />}
//       </main>
//     </div>
//   );
// };

// // --- Sub-Components ---

// const DraftsContent = () => (
//   <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
//     <div className="flex justify-between items-center">
//         <h3 className="text-lg font-bold text-slate-800">Document Revisions</h3>
//         <button className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition shadow-sm">Upload New Version</button>
//     </div>
//     <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
//         {['v2.0 - Full Technical Draft', 'v1.1 - Revised Abstract', 'v1.0 - Initial Proposal'].map((rev, i) => (
//             <div key={i} className="p-4 border-b last:border-0 flex justify-between items-center hover:bg-slate-50 transition cursor-pointer group">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-slate-100 rounded group-hover:bg-blue-100 transition"><BiFile className="text-slate-500 group-hover:text-blue-600"/></div>
//                   <span className="font-semibold text-slate-700 text-sm">{rev}</span>
//                 </div>
//                 <span className="text-[10px] font-bold text-slate-400 uppercase">Modified 2 days ago</span>
//             </div>
//         ))}
//     </div>
// </div>
// );

// const StatsContent = () => (
//   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-2 duration-300">
//     <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
//         <h4 className="text-slate-400 text-[10px] font-bold uppercase mb-4 tracking-widest">Section Completion</h4>
//         <div className="space-y-4">
//             {[{n:'Abstract', p:100}, {n:'Methodology', p:80}, {n:'Budget', p:40}, {n:'Literature', p:90}].map(s => (
//                 <div key={s.n}>
//                     <div className="flex justify-between text-[10px] font-bold mb-1 uppercase text-slate-500"><span>{s.n}</span><span>{s.p}%</span></div>
//                     <div className="w-full bg-slate-100 h-1.5 rounded-full"><div className={`h-full rounded-full ${s.p === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${s.p}%` }} /></div>
//                 </div>
//             ))}
//         </div>
//     </div>
//     <div className="md:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 border-dashed border-2">
//         <div className="text-center">
//           <BiStats className="mx-auto text-4xl mb-2 opacity-20" />
//           <p className="text-sm font-medium">Activity Chart Visualization</p>
//         </div>
//     </div>
//   </div>
// );

// const TimelineContent = () => (
//   <div className="max-w-full mx-auto bg-white p-8 rounded-xl border border-slate-200 shadow-sm animate-in slide-in-from-bottom-2 duration-300">
//     <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-100">
//       {[
//         { title: "Revision Submitted", date: "Dec 16", desc: "Sent v2.0 to panel for second review", icon: <BiCheckCircle/>, color: 'text-emerald-500' },
//         { title: "Reviewer Feedback", date: "Dec 14", desc: "Dr. Aris commented on Budget section regarding equipment costs", icon: <BiMessageSquareDetail/>, color: 'text-amber-500' },
//         { title: "Project Created", date: "Dec 10", desc: "Initial draft started by Principal Investigator", icon: <BiPlus/>, color: 'text-blue-500' },
//       ].map((item, i) => (
//         <div key={i} className="relative pl-12">
//           <div className="absolute left-0 top-1 w-10 h-10 bg-white rounded-full border-2 border-slate-100 flex items-center justify-center shadow-sm z-0">
//             <span className={item.color}>{item.icon}</span>
//           </div>
//           <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
//           <time className="text-[10px] font-bold text-slate-400 uppercase">{item.date}</time>
//           <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// const EvaluationContent = () => (
//   <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
//     <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl shadow-sm">
//         <h4 className="text-amber-800 font-bold text-sm flex items-center gap-2"><BiMessageSquareDetail /> Panel Feedback Required</h4>
//         <p className="text-amber-700 text-xs mt-1">Please address the comments regarding the sustainability plan before Dec 20, 2025.</p>
//     </div>
//     <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
//         <div className="flex gap-4">
//             <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs shrink-0">RA</div>
//             <div>
//                 <div className="flex items-center gap-2">
//                   <p className="font-bold text-slate-800 text-sm">Reviewer #1 (Admin)</p>
//                   <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold uppercase">Yesterday</span>
//                 </div>
//                 <p className="text-sm text-slate-600 mt-2 leading-relaxed italic">"The methodology is sound, but your sample size for the pilot study seems too small for statistical significance in this region."</p>
//                 <div className="mt-4 flex gap-3">
//                   <button className="text-blue-600 text-[10px] font-bold hover:underline">REPLY</button>
//                   <button className="text-slate-400 text-[10px] font-bold hover:underline uppercase tracking-widest">Mark as Resolved</button>
//                 </div>
//             </div>
//         </div>
//     </div>
//   </div>
// );

// export default ProjectWorkspace;








"use client";

import React, { useState } from "react";
import {
  BiArrowBack,
  BiStats,
  BiTimeFive,
  BiMessageSquareDetail,
  BiFile,
  BiCheckCircle,
  BiPlus,
} from "react-icons/bi";

type Tab = "drafts" | "statistics" | "timeline" | "evaluation";

const ProjectWorkspace = ({
  id,
  onBack,
}: {
  id: string;
  onBack: () => void;
}) => {
  const [activeTab, setActiveTab] = useState<Tab>("drafts");

  const navItems = [
    { id: "drafts", label: "Drafts & Files", icon: <BiFile /> },
    { id: "statistics", label: "Progress Stats", icon: <BiStats /> },
    { id: "timeline", label: "Activity Timeline", icon: <BiTimeFive /> },
    { id: "evaluation", label: "Comments & Feedback", icon: <BiMessageSquareDetail /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col animate-in fade-in duration-500">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 p-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-full transition text-slate-600 shrink-0"
            >
              <BiArrowBack size={20} />
            </button>

            <div>
              <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                Project Workspace: {id}
              </h2>
              <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Research Hub Dashboard
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 overflow-x-auto no-scrollbar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === item.id
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-4 sm:p-6 max-w-7xl mx-auto w-full flex-grow">
        {activeTab === "drafts" && <DraftsContent />}
        {activeTab === "statistics" && <StatsContent />}
        {activeTab === "timeline" && <TimelineContent />}
        {activeTab === "evaluation" && <EvaluationContent />}
      </main>
    </div>
  );
};

/* =======================
   SUB COMPONENTS
======================= */

const DraftsContent = () => (
  <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <h3 className="text-base sm:text-lg font-bold text-slate-800">
        Document Revisions
      </h3>
      <button className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition shadow-sm w-full sm:w-auto">
        Upload New Version
      </button>
    </div>

    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {[
        "v2.0 - Full Technical Draft",
        "v1.1 - Revised Abstract",
        "v1.0 - Initial Proposal",
      ].map((rev, i) => (
        <div
          key={i}
          className="p-4 border-b last:border-0 flex items-center justify-between gap-3 hover:bg-slate-50 transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded">
              <BiFile className="text-slate-500" />
            </div>
            <span className="font-semibold text-slate-700 text-sm">
              {rev}
            </span>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">
            Modified 2 days ago
          </span>
        </div>
      ))}
    </div>
  </div>
);

const StatsContent = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 animate-in slide-in-from-bottom-2 duration-300">
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <h4 className="text-slate-400 text-[10px] font-bold uppercase mb-4 tracking-widest">
        Section Completion
      </h4>

      <div className="space-y-4">
        {[
          { n: "Abstract", p: 100 },
          { n: "Methodology", p: 80 },
          { n: "Budget", p: 40 },
          { n: "Literature", p: 90 },
        ].map((s) => (
          <div key={s.n}>
            <div className="flex justify-between text-[10px] font-bold mb-1 uppercase text-slate-500">
              <span>{s.n}</span>
              <span>{s.p}%</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full">
              <div
                className={`h-full rounded-full ${
                  s.p === 100 ? "bg-emerald-500" : "bg-blue-500"
                }`}
                style={{ width: `${s.p}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 border-dashed border-2">
      <div className="text-center">
        <BiStats className="mx-auto text-4xl mb-2 opacity-20" />
        <p className="text-sm font-medium">Activity Chart Visualization</p>
      </div>
    </div>
  </div>
);

const TimelineContent = () => (
  <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm animate-in slide-in-from-bottom-2 duration-300">
    <div className="space-y-6 sm:space-y-8 relative before:absolute before:inset-y-0 before:left-5 before:w-0.5 before:bg-slate-100">
      {[
        {
          title: "Revision Submitted",
          date: "Dec 16",
          desc: "Sent v2.0 to panel for second review",
          icon: <BiCheckCircle />,
          color: "text-emerald-500",
        },
        {
          title: "Reviewer Feedback",
          date: "Dec 14",
          desc: "Dr. Aris commented on Budget section regarding equipment costs",
          icon: <BiMessageSquareDetail />,
          color: "text-amber-500",
        },
        {
          title: "Project Created",
          date: "Dec 10",
          desc: "Initial draft started by Principal Investigator",
          icon: <BiPlus />,
          color: "text-blue-500",
        },
      ].map((item, i) => (
        <div key={i} className="relative pl-12">
          <div className="absolute left-0 top-0 w-10 h-10 bg-white rounded-full border border-slate-200 flex items-center justify-center shadow-sm">
            <span className={item.color}>{item.icon}</span>
          </div>
          <h4 className="font-bold text-slate-800 text-sm">
            {item.title}
          </h4>
          <time className="text-[10px] font-bold text-slate-400 uppercase">
            {item.date}
          </time>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const EvaluationContent = () => (
  <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl shadow-sm">
      <h4 className="text-amber-800 font-bold text-sm flex items-center gap-2">
        <BiMessageSquareDetail /> Panel Feedback Required
      </h4>
      <p className="text-amber-700 text-xs mt-1">
        Please address the comments regarding the sustainability plan before
        Dec 20, 2025.
      </p>
    </div>

    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex gap-4">
        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
          RA
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-bold text-slate-800 text-sm">
              Reviewer #1 (Admin)
            </p>
            <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold uppercase">
              Yesterday
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed italic">
            "The methodology is sound, but your sample size for the pilot study
            seems too small for statistical significance in this region."
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <button className="text-blue-600 text-[10px] font-bold hover:underline">
              REPLY
            </button>
            <button className="text-slate-400 text-[10px] font-bold hover:underline uppercase tracking-widest">
              Mark as Resolved
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProjectWorkspace;
