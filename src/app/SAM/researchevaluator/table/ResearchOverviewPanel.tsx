// "use client";

// import React, { useState } from "react";

// interface EvaluationItem {
//   id: number;
//   title: string;
//   researcher: string;
//   evaluationId: string;
// }

// const ResearchOverviewPanel = () => {
//   const evaluations: EvaluationItem[] = [
//     {
//       id: 1,
//       title: "AI in Healthcare",
//       researcher: "Dr. James Smith",
//       evaluationId: "EV2025-001",
//     },
//     {
//       id: 2,
//       title: "Agricultural Automation",
//       researcher: "Engr. Carl Lohan",
//       evaluationId: "EV2025-002",
//     },
//     {
//       id: 3,
//       title: "Climate Privacy Review",
//       researcher: "Dr. John Cruz",
//       evaluationId: "EV2025-003",
//     },
//   ];

//   const [selected, setSelected] = useState(evaluations[0]);

//   return (
//     <div>
//       <div className="flex w-full">

//         {/* LEFT LIST */}
//         <div className="w-1/3 bg-white p-4 shadow border border-gray-100 min-h-[calc(100vh-64px)]">
//           <h2 className="text-lg font-semibold text-slate-700">
//             Scheduled Evaluation
//           </h2>

//           <div className="text-xs text-slate-500 mt-1 mb-3">
//             TOTAL: {evaluations.length}
//           </div>

//           <div className="space-y-2 max-h-[calc(100vh-120px)] overflow-y-auto pr-1">
//             {evaluations.map((item) => (
//               <div
//                 key={item.id}
//                 onClick={() => setSelected(item)}
//                 className={`p-3 rounded-lg cursor-pointer border transition ${selected.id === item.id
//                     ? "bg-blue-600 text-white border-blue-600"
//                     : "bg-gray-100 border-gray-200 text-slate-700 hover:bg-gray-200"
//                   }`}
//               >
//                 <div className="font-medium">{item.title}</div>
//                 <div className="text-sm opacity-90">
//                   Researcher: {item.researcher}
//                 </div>
//                 <div className="text-xs mt-1 opacity-70">
//                   Evaluation ID: {item.evaluationId}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>


//         {/* RIGHT OVERVIEW */}
//         <div className="w-2/3 bg-white m-3 p-8 rounded-sm shadow border border-gray-100">
//           <h2 className="text-xl font-semibold text-slate-700 mb-4">
//             Research Overview
//           </h2>

//           <div className="space-y-3 text-slate-700">
//             <div>
//               <span className="font-semibold">Title: </span>
//               {selected.title}
//             </div>

//             <div>
//               <span className="font-semibold">Author(s): </span>
//               {selected.researcher}
//             </div>

//             <div>
//               <span className="font-semibold">Status: </span>
//               <span className="text-purple-600 font-medium">
//                 New Research Proposal
//               </span>
//             </div>

//             <div>
//               <span className="font-semibold">Rationale:</span>
//               <p className="text-sm text-slate-500 mt-1">
//                 — No rationale provided —
//               </p>
//             </div>
//           </div>

//           <button className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
//             VIEW CONTENT
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ResearchOverviewPanel;




"use client";

import React, { useState } from "react";

interface EvaluationItem {
  id: number;
  title: string;
  researcher: string;
  evaluationId: string;
}

const ResearchOverviewPanel = () => {
  const evaluations: EvaluationItem[] = [
    {
      id: 1,
      title: "AI in Healthcare",
      researcher: "Dr. James Smith",
      evaluationId: "EV2025-001",
    },
    {
      id: 2,
      title: "Agricultural Automation",
      researcher: "Engr. Carl Lohan",
      evaluationId: "EV2025-002",
    },
    {
      id: 3,
      title: "Climate Privacy Review",
      researcher: "Dr. John Cruz",
      evaluationId: "EV2025-003",
    },
        {
      id: 4,
      title: "Climate Privacy Review",
      researcher: "Dr. John Cruz",
      evaluationId: "EV2025-003",
    },
        {
      id: 5,
      title: "Climate Privacy Review",
      researcher: "Dr. John Cruz",
      evaluationId: "EV2025-003",
    },
        {
      id: 6,
      title: "Climate Privacy Review",
      researcher: "Dr. John Cruz",
      evaluationId: "EV2025-003",
    },
        {
      id: 7,
      title: "Climate Privacy Review",
      researcher: "Dr. John Cruz",
      evaluationId: "EV2025-003",
    },
  ];

  const [selected, setSelected] = useState(evaluations[0]);

  return (
    <div className="flex w-full h-[calc(100vh-64px)] overflow-hidden">

      {/* LEFT PANEL */}
      <div className="w-1/3 bg-white p-4 shadow border border-gray-100 h-full overflow-y-auto">
        <h2 className="text-lg font-semibold text-slate-700">
          Scheduled Evaluation
        </h2>

        <div className="text-xs text-slate-500 mt-1 mb-3">
          TOTAL: {evaluations.length}
        </div>

        <div className="space-y-2">
          {evaluations.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelected(item)}
              className={`p-3 rounded-lg cursor-pointer border transition ${
                selected.id === item.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 border-gray-200 text-slate-700 hover:bg-gray-200"
              }`}
            >
              <div className="font-medium">{item.title}</div>
              <div className="text-sm opacity-90">
                Researcher: {item.researcher}
              </div>
              <div className="text-xs mt-1 opacity-70">
                Evaluation ID: {item.evaluationId}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-2/3 bg-white p-8 m-3 shadow border border-gray-100 h-auto overflow-y-auto">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">
          Research Overview
        </h2>

        <div className="space-y-3 text-slate-700">
          <div>
            <span className="font-semibold">Title: </span>
            {selected.title}
          </div>

          <div>
            <span className="font-semibold">Author(s): </span>
            {selected.researcher}
          </div>

          <div>
            <span className="font-semibold">Status: </span>
            <span className="text-purple-600 font-medium">
              New Research Proposal
            </span>
          </div>

          <div>
            <span className="font-semibold">Rationale:</span>
            <p className="text-sm text-slate-500 mt-1">
              — No rationale provided —
            </p>
          </div>
        </div>

        <button className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          VIEW CONTENT
        </button>
                <h2 className="text-xl font-semibold text-slate-700 mb-4">
          Research Overview
        </h2>

        <div className="space-y-3 text-slate-700">
          <div>
            <span className="font-semibold">Title: </span>
            {selected.title}
          </div>

          <div>
            <span className="font-semibold">Author(s): </span>
            {selected.researcher}
          </div>

          <div>
            <span className="font-semibold">Status: </span>
            <span className="text-purple-600 font-medium">
              New Research Proposal
            </span>
          </div>

          <div>
            <span className="font-semibold">Rationale:</span>
            <p className="text-sm text-slate-500 mt-1">
              — No rationale provided —
            </p>
          </div>
        </div>

        <button className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          VIEW CONTENT
        </button>
                <h2 className="text-xl font-semibold text-slate-700 mb-4">
          Research Overview
        </h2>

        <div className="space-y-3 text-slate-700">
          <div>
            <span className="font-semibold">Title: </span>
            {selected.title}
          </div>

          <div>
            <span className="font-semibold">Author(s): </span>
            {selected.researcher}
          </div>

          <div>
            <span className="font-semibold">Status: </span>
            <span className="text-purple-600 font-medium">
              New Research Proposal
            </span>
          </div>

          <div>
            <span className="font-semibold">Rationale:</span>
            <p className="text-sm text-slate-500 mt-1">
              — No rationale provided —
            </p>
          </div>
        </div>

        <button className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          VIEW CONTENT
        </button>
      </div>

    </div>
  );
};

export default ResearchOverviewPanel;
