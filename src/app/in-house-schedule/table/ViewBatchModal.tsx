// import React from "react";
// import { X, FileText, Package } from "lucide-react";
// import { BatchEntry } from "./EditBatchModal"; // Importing shared interface

// interface ViewBatchModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   batch: BatchEntry | null;
// }

// // Local Interface for the Proposal Table
// interface Proposal {
//   id: number;
//   title: string;
//   researcher: string;
//   campus: string;
//   college: string;
// }

// // Mock Data for Proposals (You would fetch this based on batch.id in a real app)
// const MOCK_PROPOSALS: Proposal[] = [
//   { id: 101, title: "Analysis of Soil Variants in Northern Highlands", researcher: "Dr. Alice Smith", campus: "Main", college: "Science" },
//   { id: 102, title: "Sustainable Irrigation Systems for Rice Fields", researcher: "Engr. John Doe", campus: "West", college: "Agriculture" },
//   { id: 103, title: "Genetic Modifications in Local Corn Variants", researcher: "Dr. Sarah Lee", campus: "Main", college: "Biotech" },
//   { id: 104, title: "Impact of Climate Change on Crop Yield", researcher: "Mr. Mark Cruz", campus: "East", college: "Environment" },
//   { id: 105, title: "Automated Pest Detection Using Drones", researcher: "Dr. David Kim", campus: "South", college: "Technology" },
//   { id: 106, title: "Organic Fertilizer Efficiency Study", researcher: "Ms. Linda Ty", campus: "West", college: "Agriculture" },
// ];

// const ViewBatchModal: React.FC<ViewBatchModalProps> = ({ isOpen, onClose, batch }) => {
//   if (!isOpen || !batch) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
//       <div className="w-full max-w-4xl rounded-3xl bg-white p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
//         {/* --- Header --- */}
//         <div className="mb-6 flex items-center justify-between shrink-0">
//           <div>
//             <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
//               <Package className="text-indigo-600" size={24} />
//               {batch.batchId} 
//               <span className="text-slate-400 font-medium">|</span> 
//               <span className="text-slate-600">{batch.commodity}</span>
//             </h3>
//             <p className="text-sm font-medium text-slate-400 mt-1">
//               List of proposals submitted for this batch
//             </p>
//           </div>
//           <button 
//             onClick={onClose} 
//             className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         {/* --- Table Container (Scrollable) --- */}
//         <div className="flex-1 overflow-hidden rounded-2xl border border-slate-100 flex flex-col">
//           <div className="overflow-auto scrollbar-thin scrollbar-thumb-slate-200">
//             <table className="min-w-full text-left">
//               {/* Table Head */}
//               <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-100">
//                 <tr>
//                   <th className="px-6 py-4 text-center text-xs font-extrabold text-slate-500 uppercase tracking-wider w-16">#</th>
//                   <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Title</th>
//                   <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Researcher</th>
//                   <th className="px-6 py-4 text-center text-xs font-extrabold text-slate-500 uppercase tracking-wider">Campus</th>
//                   <th className="px-6 py-4 text-center text-xs font-extrabold text-slate-500 uppercase tracking-wider">College</th>
//                 </tr>
//               </thead>
              
//               {/* Table Body */}
//               <tbody className="divide-y divide-slate-50 bg-white">
//                 {MOCK_PROPOSALS.length > 0 ? (
//                   MOCK_PROPOSALS.map((proposal, index) => (
//                     <tr key={proposal.id} className="group hover:bg-slate-50/60 transition-colors">
//                       <td className="px-6 py-4 text-center text-sm font-bold text-slate-400">
//                         {index + 1}
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-start gap-3">
//                           <div className="mt-0.5 rounded-full bg-indigo-50 p-1.5 text-indigo-600 shrink-0">
//                             <FileText size={14} />
//                           </div>
//                           <span className="text-sm font-bold text-slate-700 line-clamp-2">
//                             {proposal.title}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-sm font-medium text-slate-600">
//                         {proposal.researcher}
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                         <span className="inline-block rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-500">
//                           {proposal.campus}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-center text-xs font-medium text-slate-500">
//                         {proposal.college}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-400 italic">
//                       No proposals found for this batch.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* --- Footer --- */}
//         <div className="mt-6 flex justify-end shrink-0">
//           <button 
//             onClick={onClose}
//             className="rounded-xl bg-slate-100 px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
//           >
//             Close
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ViewBatchModal;

import React, { useMemo } from "react";
import { X, FileText, Package } from "lucide-react";
import { BatchEntry } from "./EditBatchModal"; // Importing shared interface

interface ViewBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  batch: BatchEntry | null;
}

// Local Interface for the Proposal Table
interface Proposal {
  id: number;
  title: string;
  researcher: string;
  campus: string;
  college: string;
}

const ViewBatchModal: React.FC<ViewBatchModalProps> = ({ isOpen, onClose, batch }) => {
  
  // Dynamically generate proposals based on the batch.proposals count
  const proposalList = useMemo(() => {
    if (!batch) return [];
    
    return Array.from({ length: batch.proposals }, (_, i) => ({
      id: 101 + i,
      title: `${batch.commodity} Research: ${["Analysis", "Study", "Impact", "Development", "Optimization"][i % 5]} of Variant ${String.fromCharCode(65 + (i % 26))}`,
      researcher: `Dr. Researcher ${i + 1}`,
      campus: ["Main", "West", "East", "South"][i % 4],
      college: ["Science", "Agriculture", "Biotech", "Technology", "Fisheries"][i % 5]
    }));
  }, [batch]);

  if (!isOpen || !batch) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-4xl rounded-3xl bg-white p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* --- Header --- */}
        <div className="mb-6 flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Package className="text-indigo-600" size={24} />
              {batch.batchId} 
              <span className="text-slate-400 font-medium">|</span> 
              <span className="text-slate-600">{batch.commodity}</span>
            </h3>
            <div className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-400">
               <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-500">
                 {batch.proposals} Proposals
               </span>
               <span>submitted for this batch</span>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* --- Table Container (Scrollable) --- */}
        <div className="flex-1 overflow-hidden rounded-2xl border border-slate-100 flex flex-col">
          <div className="overflow-auto scrollbar-thin scrollbar-thumb-slate-200">
            <table className="min-w-full text-left">
              {/* Table Head */}
              <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-center text-xs font-extrabold text-slate-500 uppercase tracking-wider w-16">#</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Researcher</th>
                  <th className="px-6 py-4 text-center text-xs font-extrabold text-slate-500 uppercase tracking-wider">Campus</th>
                  <th className="px-6 py-4 text-center text-xs font-extrabold text-slate-500 uppercase tracking-wider">College</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="divide-y divide-slate-50 bg-white">
                {proposalList.length > 0 ? (
                  proposalList.map((proposal, index) => (
                    <tr key={proposal.id} className="group hover:bg-slate-50/60 transition-colors">
                      <td className="px-6 py-4 text-center text-sm font-bold text-slate-400">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 rounded-full bg-indigo-50 p-1.5 text-indigo-600 shrink-0">
                            <FileText size={14} />
                          </div>
                          <span className="text-sm font-bold text-slate-700 line-clamp-2">
                            {proposal.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">
                        {proposal.researcher}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-block rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-500">
                          {proposal.campus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-xs font-medium text-slate-500">
                        {proposal.college}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-400 italic">
                      No proposals found for this batch.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Footer --- */}
        <div className="mt-6 flex justify-end shrink-0">
          <button 
            onClick={onClose}
            className="rounded-xl bg-slate-100 px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default ViewBatchModal;