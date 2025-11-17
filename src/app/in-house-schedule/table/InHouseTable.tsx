// "use client";

// import React, { useState } from "react";
// import Table from "@/component/ui/Table";
// import { BiSolidFilterAlt, BiSolidPlusCircle } from "react-icons/bi";
// import ActionDropdown from "../action/ActionDropdown";
// import Dropdown, { DropdownItem } from "@/component/ui/Dropdown";

// interface ResearchProject {
//   id: number;
//   title: string;
//   researcher: string;
//   campus: string;
//   college: string;
//   status: "Completed" | "Terminated" | "Pending" | "Ongoing";
//   action?: React.ReactNode;
// }

// type ColumnKey = keyof ResearchProject | "action";

// const InHousePage = () => {
//   const data: ResearchProject[] = [
//     {
//       id: 1,
//       title: "Plant Growth Study",
//       researcher: "Dr. Alice",
//       campus: "Main",
//       college: "Science",
//       status: "Completed",
//     },
//     {
//       id: 2,
//       title: "Soil Analysis",
//       researcher: "Dr. Bob",
//       campus: "West",
//       college: "Agriculture",
//       status: "Pending",
//     },
//     {
//       id: 3,
//       title: "Genetic Research",
//       researcher: "Dr. Carol",
//       campus: "Main",
//       college: "Biotech",
//       status: "Ongoing",
//     },
//     {
//       id: 4,
//       title: "Water Quality Study",
//       researcher: "Dr. Dave",
//       campus: "East",
//       college: "Environment",
//       status: "Terminated",
//     },
//   ];

//   const [year, setYear] = useState(2025);
//   const [status, setStatus] = useState("All Proposal");

//   const columns: Array<{
//     key: ColumnKey;
//     header: string;
//     render?: (value: any, row: ResearchProject) => React.ReactNode;
//     align?: "left" | "center";
//     width?: string;
//   }> = [
//     { key: "id", header: "#", align: "center", width: "60px" },
//     { key: "title", header: "Title", align: "left" },
//     { key: "researcher", header: "Researcher", align: "left" },
//     { key: "campus", header: "Campus", align: "center" },
//     { key: "college", header: "College", align: "center" },
//     {
//       key: "status",
//       header: "Status",
//       align: "center",
//       render: (value: ResearchProject["status"]) => {
//         const styleMap = {
//           Completed: "bg-green-100 text-green-700",
//           Terminated: "bg-red-100 text-red-700",
//           Pending: "bg-yellow-100 text-yellow-700",
//           Ongoing: "bg-blue-100 text-blue-700",
//         };
//         return (
//           <span
//             className={`inline-block px-3 py-1 rounded-full font-medium select-none ${styleMap[value]}`}
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
//       render: (_, row) => (
//         <ActionDropdown
//           onView={() => alert(`Edit ${row.title}`)}
//           onApprove={() => alert(`Delete ${row.title}`)}
//           onRequest={() => alert(`View ${row.title}`)}
//         />
//       ),
//     },
//   ];

//   // Dropdown items
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
//           <div className="flex items-center">
//             <Dropdown buttonContent={`Year: ${year}`} items={yearItems} />
//             <Dropdown buttonContent={`Status: ${status}`} items={statusItems} />
//           </div>

//           <div className="flex items-center text-sm text-slate-500 font-medium cursor-pointer select-none">
//             <BiSolidFilterAlt className="mr-2 text-xl" />
//             More Filters
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <Table<ResearchProject> columns={columns} data={data} />
//     </div>
//   );
// };

// export default InHousePage;





"use client";

import React, { useState } from "react";
import Table from "@/component/ui/Table";
import { BiSolidFilterAlt } from "react-icons/bi";
import ActionDropdown from "../action/ActionDropdown";
import Dropdown, { DropdownItem } from "@/component/ui/Dropdown";

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

const InHousePage = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // 🚀 NEW DATA
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
          onView={() => alert(`Viewing ${row.batchId}`)}
          onApprove={() => alert(`Approving ${row.batchId}`)}
          onRequest={() => alert(`Request for ${row.batchId}`)}
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
      {/* Top Navigation */}
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
    </div>
  );
};

export default InHousePage;
