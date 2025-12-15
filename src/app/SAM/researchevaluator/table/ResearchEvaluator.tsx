// "use client";

// import React from "react";
// import ResearchOverviewPanel from "./ResearchOverviewPanel";
// import EvaluatorHeader from "../EvaluatorHeader";


// const ResearchEvaluator = () => {
//   return (
   
//       <div className="min-h-screen bg-blue-50">

//       <div>

//         {/* Page Title */}
//         {/* <h1 className="text-2xl font-semibold mb-5">Research Overview</h1> */}
//         <EvaluatorHeader />
//         {/* Main Panel */}
//         <ResearchOverviewPanel />
//       </div>
//     </div>
//   );
// };

// export default ResearchEvaluator;

"use client";

import React from "react";
import ResearchOverviewPanel from "./ResearchOverviewPanel";
import EvaluatorHeader from "../EvaluatorHeader";

const ResearchEvaluator = () => {
  return (
    <div className="min-h-screen bg-blue-50 overflow-hidden">
      {/* HEADER */}
      <EvaluatorHeader />

      {/* MAIN CONTENT (height = screen - header) */}
      <ResearchOverviewPanel />
    </div>
  );
};

export default ResearchEvaluator;
