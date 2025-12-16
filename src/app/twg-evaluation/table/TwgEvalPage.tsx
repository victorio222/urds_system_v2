// "use client";

// import React, { useState } from "react";
// import Table from "@/component/ui/Table";
// import { BiSolidFilterAlt } from "react-icons/bi";
// import ActionDropdown from "../action/ActionDropdown";
// import Dropdown, { DropdownItem } from "@/component/ui/Dropdown";


// interface BatchEntry {
//   id: number;
//   batchId: string;
//   commodity: string;
//   proposals: number;
//   panels: number;
//   schedule: string;
//   status: "Completed" | "Terminated" | "Pending" | "Ongoing";
// }

// type ColumnKey = keyof BatchEntry | "checkbox" | "action";

// const TwgEvalPage = () => {
//   const [selectedRows, setSelectedRows] = useState<number[]>([]);
//   const [selectAll, setSelectAll] = useState(false);


//   // 🚀 NEW DATA
//   const data: BatchEntry[] = [
//     {
//       id: 1,
//       batchId: "BATCH-001",
//       commodity: "Rice",
//       proposals: 12,
//       panels: 3,
//       schedule: "2025-03-10",
//       status: "Completed",
//     },
//     {
//       id: 2,
//       batchId: "BATCH-002",
//       commodity: "Corn",
//       proposals: 8,
//       panels: 2,
//       schedule: "2025-04-02",
//       status: "Pending",
//     },
//     {
//       id: 3,
//       batchId: "BATCH-003",
//       commodity: "Vegetables",
//       proposals: 15,
//       panels: 4,
//       schedule: "2025-05-15",
//       status: "Ongoing",
//     },
//   ];

//   const toggleRow = (id: number) => {
//     setSelectedRows((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   const toggleSelectAll = () => {
//     if (selectAll) {
//       setSelectedRows([]);
//     } else {
//       setSelectedRows(data.map((item) => item.id));
//     }
//     setSelectAll(!selectAll);
//   };

//   const [year, setYear] = useState(2025);
//   const [status, setStatus] = useState("All Proposal");

//   const columns = [
//     {
//       key: "checkbox" as ColumnKey,
//       header: (
//         <input
//           type="checkbox"
//           checked={selectAll}
//           onChange={toggleSelectAll}
//           className="w-4 h-4 cursor-pointer"
//         />
//       ),
//       align: "center",
//       width: "40px",
//       render: (_: any, row: BatchEntry) => (
//         <input
//           type="checkbox"
//           checked={selectedRows.includes(row.id)}
//           onChange={() => toggleRow(row.id)}
//           className="w-4 h-4 cursor-pointer"
//         />
//       ),
//     },
//     { key: "batchId", header: "Batch ID", align: "left" },
//     { key: "commodity", header: "Commodity", align: "left" },
//     { key: "proposals", header: "No. of Proposals", align: "center" },
//     { key: "panels", header: "No. of Panels", align: "center" },
//     { key: "schedule", header: "Date Schedule", align: "center" },
//     {
//       key: "status",
//       header: "Status",
//       align: "center",
//       render: (value: BatchEntry["status"]) => {
//         const styleMap = {
//           Completed: "bg-green-100 text-green-700",
//           Terminated: "bg-red-100 text-red-700",
//           Pending: "bg-yellow-100 text-yellow-700",
//           Ongoing: "bg-blue-100 text-blue-700",
//         };
//         return (
//           <span
//             className={`px-3 py-1 rounded-full text-sm font-medium ${styleMap[value]}`}
//           >
//             {value}
//           </span>
//         );
//       },
//     },
//     {
//       key: "action",
//       header: "Action",
//       align: "center",
//       width: "60px",
//       render: (_: any, row: BatchEntry) => (
//         <ActionDropdown
//           onView={() => alert(`Viewing ${row.batchId}`)}
//           onApprove={() => alert(`Approving ${row.batchId}`)}
//           onRequest={() => alert(`Request for ${row.batchId}`)}
//         />
//       ),
//     },
//   ];

//   const yearItems: DropdownItem[] = [2023, 2024, 2025, 2026, 2027].map((y) => ({
//     label: y.toString(),
//     onClick: () => setYear(y),
//   }));

//   const statusItems: DropdownItem[] = [
//     "All Proposal",
//     "Completed",
//     "Pending",
//     "Ongoing",
//     "Terminated",
//   ].map((s) => ({
//     label: s,
//     onClick: () => setStatus(s),
//   }));

//   return (
//     <div className="space-y-4 mt-[-10px] w-full">
//       {/* Top Navigation */}
//       <div className="max-w-full flex justify-end mb-[-5px]">
//         <div className="inline-flex justify-end bg-white p-2 pr-5 rounded-full shadow space-x-4">
//           <div className="flex items-center space-x-3">
//             <Dropdown buttonContent={`Year: ${year}`} items={yearItems} />
//             <Dropdown buttonContent={`Status: ${status}`} items={statusItems} />
//           </div>

//           <div className="flex items-center text-sm text-slate-500 font-medium cursor-pointer select-none">
//             <BiSolidFilterAlt className="mr-2 text-xl" />
//             More Filters
//           </div>
//         </div>
//       </div>

//       <Table columns={columns as any} data={data} />
//     </div>
//   );
// };

// export default TwgEvalPage;

"use client";

import React, { useState } from "react";
// ⭐ IMPORT THE ROUTER FROM NEXT/NAVIGATION
import { useRouter } from 'next/navigation';
import Table from "@/component/ui/Table";
import { BiSolidFilterAlt } from "react-icons/bi";
import ActionDropdown from "../action/ActionDropdown";
import Dropdown, { DropdownItem } from "@/component/ui/Dropdown";

// ⭐ IMPORT THE MODAL
import RequestRevisionModal from '../modal/RequestRevisionModal';
import ResearchApprovalModal from '../modal/ResearchApprovalModal';

// Interfaces for data
interface BatchEntry {
  id: number;
  batchId: string;
  commodity: string;
  proposals: number;
  panels: number;
  schedule: string;
  status: "Completed" | "Terminated" | "Pending" | "Ongoing";
}

type ColumnKey = keyof BatchEntry | "checkbox" | "action";

const TwgEvalPage = () => {
  // ⭐ Initialize the router
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // ⭐ STATE PARA SA REQUEST REVISION MODAL
  const [revisionModalOpen, setRevisionModalOpen] = useState(false);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false); // NEW STATE for Approval Modal
  // State para i-store ang data ng napiling batch
  const [selectedBatch, setSelectedBatch] = useState<BatchEntry | null>(null);


  const data: BatchEntry[] = [
    {
      id: 1,
      batchId: "BATCH-001",
      commodity: "Rice",
      proposals: 12,
      panels: 3,
      schedule: "2025-03-10",
      status: "Completed",
    },
    {
      id: 2,
      batchId: "BATCH-002",
      commodity: "Corn",
      proposals: 8,
      panels: 2,
      schedule: "2025-04-02",
      status: "Pending",
    },
    {
      id: 3,
      batchId: "BATCH-003",
      commodity: "Vegetables",
      proposals: 15,
      panels: 4,
      schedule: "2025-05-15",
      status: "Ongoing",
    },
  ];

  // ----------------------------------------------------
  // ⭐ HANDLER FUNCTIONS FOR REVISION MODAL
  // ----------------------------------------------------
  
  // BAGONG FUNCTION: Ito ang mag-tri-trigger ng navigation
  const handleViewDetails = (batchId: string) => {
    // Construct the path using the batchId (assuming it's a unique identifier)
    // Ang path na ito ay base sa folder structure mo
    // const path = `/DANIEL_C/layout/research-evaluator/page.tsx/${batchId}`;
          const path = `/ALPHA/twg-evaluation/reports`;
    // Use the router to navigate
    router.push(path);
  };

  // 1. Handle Approve Click (Opens Research Approval Modal) - NEW
  const handleApproveClick = (batch: BatchEntry) => {
    setSelectedBatch(batch);
    setApprovalModalOpen(true);
  };

  // 2. Final Approval Logic (Called from ResearchApprovalModal Approve Button) - NEW
  const handleFinalApprove = () => {
    alert(`Batch ${selectedBatch?.batchId} approved successfully!`);
    // Add API call to update batch status
    setApprovalModalOpen(false);
    setSelectedBatch(null);
  };
  
  // 3. Final Decline Logic (Called from ResearchApprovalModal Decline Button) - NEW
  const handleFinalDecline = () => {
    alert(`Batch ${selectedBatch?.batchId} declined.`);
    // Add API call to update batch status to Terminated/Declined
    setApprovalModalOpen(false);
    setSelectedBatch(null);
  };

  // 4. Handle Request Revision Click (Opens Revision/Feedback Modal) - UNCHANGED
  const handleRequestClick = (batch: BatchEntry) => {
    setSelectedBatch(batch);
    setRevisionModalOpen(true);
  };

  // 5. Revision Submission Logic (Called from RequestRevisionModal) - UNCHANGED
  const handleRevisionSubmit = (id: number, feedback: string) => {
    console.log(`Revision requested for Batch ID ${id} with feedback: "${feedback}"`);
    alert(`Revision request sent for ${selectedBatch?.batchId}!`);
    
    setRevisionModalOpen(false);
    setSelectedBatch(null);
  };
  
  // ----------------------------------------------------
  // Default Row/Select All Toggles (Unchanged)
  // ----------------------------------------------------

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const [year, setYear] = useState(2025);
  const [status, setStatus] = useState("All Proposal");

  // ----------------------------------------------------
  // Columns Definition
  // ----------------------------------------------------
  const columns = [
    {
      key: "checkbox" as ColumnKey,
      header: (
        <input
          type="checkbox"
          checked={selectAll}
          onChange={toggleSelectAll}
          className="w-4 h-4 cursor-pointer"
        />
      ),
      align: "center",
      width: "40px",
      render: (_: any, row: BatchEntry) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(row.id)}
          onChange={() => toggleRow(row.id)}
          className="w-4 h-4 cursor-pointer"
        />
      ),
    },
    { key: "batchId", header: "Batch ID", align: "left" },
    { key: "commodity", header: "Commodity", align: "left" },
    { key: "proposals", header: "No. of Proposals", align: "center" },
    { key: "panels", header: "No. of Panels", align: "center" },
    { key: "schedule", header: "Date Schedule", align: "center" },
    {
      key: "status",
      header: "Status",
      align: "center",
      render: (value: BatchEntry["status"]) => {
        const styleMap = {
          Completed: "bg-green-100 text-green-700",
          Terminated: "bg-red-100 text-red-700",
          Pending: "bg-yellow-100 text-yellow-700",
          Ongoing: "bg-blue-100 text-blue-700",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${styleMap[value]}`}
          >
            {value}
          </span>
        );
      },
    },
    {
      key: "action",
      header: "Action",
      align: "center",
      width: "60px",
      render: (_: any, row: BatchEntry) => (
        <ActionDropdown
          // ⭐ I-UPDATE ANG onView para tawagin ang navigation function
          onView={() => handleViewDetails(row.batchId)}
         // ⭐ I-HOOK UP ang onApprove sa Research Approval Modal
          onApprove={() => handleApproveClick(row)}
          // ⭐ I-HOOK UP ang onRequest sa bagong handler
          onRequest={() => handleRequestClick(row)} 
        />
      ),
    },
  ];

  const yearItems: DropdownItem[] = [2023, 2024, 2025, 2026, 2027].map((y) => ({
    label: y.toString(),
    onClick: () => setYear(y),
  }));

  const statusItems: DropdownItem[] = [
    "All Proposal",
    "Completed",
    "Pending",
    "Ongoing",
    "Terminated",
  ].map((s) => ({
    label: s,
    onClick: () => setStatus(s),
  }));

  return (
    <div className="space-y-4 mt-[-10px] w-full">
      {/* Top Navigation (Filters) */}
      <div className="max-w-full flex justify-end mb-[-5px]">
        <div className="inline-flex justify-end bg-white p-2 pr-5 rounded-full shadow space-x-4">
          <div className="flex items-center space-x-3">
            <Dropdown buttonContent={`Year: ${year}`} items={yearItems} />
            <Dropdown buttonContent={`Status: ${status}`} items={statusItems} />
          </div>

          <div className="flex items-center text-sm text-slate-500 font-medium cursor-pointer select-none">
            <BiSolidFilterAlt className="mr-2 text-xl" />
            More Filters
          </div>
        </div>
      </div>

      <Table columns={columns as any} data={data} />
      
      {/* ---------------------------------------------------- */}
      {/* ⭐ REQUEST REVISION MODAL (Comment/Feedback) */}
      {/* ---------------------------------------------------- */}
      {selectedBatch && (
        <RequestRevisionModal
          opened={revisionModalOpen}
          onClose={() => {
            setRevisionModalOpen(false);
            setSelectedBatch(null); // Clear selected batch when closing
          }}
          itemId={selectedBatch.id} // Pass the ID of the batch for submission
          onSubmit={handleRevisionSubmit}
        />
      )}

      {/* ---------------------------------------------------- */}
      {/* ⭐ RESEARCH APPROVAL MODAL (For Approve/Decline) */}
      {/* ---------------------------------------------------- */}
      {selectedBatch && (
        <ResearchApprovalModal
          opened={approvalModalOpen}
          onClose={() => {
            setApprovalModalOpen(false);
            setSelectedBatch(null);
          }}
          itemName={selectedBatch.batchId} 
          onApprove={handleFinalApprove}
          onDecline={handleFinalDecline}
        />
      )}
      
    </div>
  );
};

export default TwgEvalPage;