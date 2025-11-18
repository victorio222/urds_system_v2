// "use client";
// import React from "react";
// import Button from "@/component/ui/Button";
// import Table from "@/component/ui/Table";
// import { BiSolidFilterAlt, BiSolidPlusCircle } from "react-icons/bi";
// import ActionDropdown from "../action/ActionDropdown";

// interface ResearchProject {
//   id: number;
//   title: string;
//   researcher: string;
//   campus: string;
//   college: string;
//   status: "Completed" | "Terminated" | "Pending" | "Ongoing";
//   action?: React.ReactNode;
// }

// // Column key type
// type ColumnKey = keyof ResearchProject | "action";

// const AllResearchPage = () => {
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
//     {
//       id: 5,
//       title: "Greenhouse Management",
//       researcher: "Dr. Eve",
//       campus: "North",
//       college: "Horticulture",
//       status: "Completed",
//     },
//     {
//       id: 6,
//       title: "Crop Yield Analysis",
//       researcher: "Dr. Frank",
//       campus: "West",
//       college: "Agriculture",
//       status: "Pending",
//     },
//     {
//       id: 7,
//       title: "Pesticide Impact Study",
//       researcher: "Dr. Grace",
//       campus: "Main",
//       college: "Science",
//       status: "Terminated",
//     },
//   ];

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
//         // Map each status to appropriate background and text colors
//         const styleMap = {
//           Completed: "bg-green-100 text-green-700",
//           Terminated: "bg-red-100 text-red-700",
//           Pending: "bg-yellow-100 text-yellow-700",
//           Ongoing: "bg-blue-100 text-blue-700",
//         };

//         return (
//           <span
//             className={`inline-block px-3 py-1 rounded-full font-medium select-none ${
//               styleMap[value]
//             }`}
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

//   return (
//     <div className="space-y-4 mt-[-10px]">
//       {/* Top Navigation */}
//       <nav className="flex justify-end mb-4">
//         <div className="bg-white p-2 rounded-full shadow flex space-x-4">
//           <Button
//             type="button"
//             className="text-sm flex items-center px-3 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
//           >
//             <BiSolidPlusCircle className="mr-1 text-xl" />
//             Create Research Project
//           </Button>

//           <div className="text-sm text-slate-500 flex items-center font-medium cursor-pointer select-none">
//             <BiSolidFilterAlt className="mr-2 text-xl" />
//             More Filters
//           </div>
//         </div>
//       </nav>

//       {/* Table */}
//       <Table<ResearchProject>
//         columns={columns}
//         data={data}
//       />
//     </div>
//   );
// };

// export default AllResearchPage;

"use client";

import React, { useState } from "react";
import Table from "@/component/ui/Table";
import { BiSolidFilterAlt, BiSolidPlusCircle } from "react-icons/bi";
import ActionDropdown from "../action/ActionDropdown";
import Dropdown, { DropdownItem } from "@/component/ui/Dropdown"; // Adjust path

interface ResearchProject {
  id: number;
  title: string;
  researcher: string;
  campus: string;
  college: string;
  status: "Completed" | "Terminated" | "Pending" | "Ongoing";
  action?: React.ReactNode;
}

type ColumnKey = keyof ResearchProject | "action";

const AllResearchPage = () => {
  const data: ResearchProject[] = [
    {
      id: 1,
      title: "Plant Growth Study",
      researcher: "Dr. Alice",
      campus: "Main",
      college: "Science",
      status: "Completed",
    },
    {
      id: 2,
      title: "Soil Analysis",
      researcher: "Dr. Bob",
      campus: "West",
      college: "Agriculture",
      status: "Pending",
    },
    {
      id: 3,
      title: "Genetic Research",
      researcher: "Dr. Carol",
      campus: "Main",
      college: "Biotech",
      status: "Ongoing",
    },
    {
      id: 4,
      title: "Water Quality Study",
      researcher: "Dr. Dave",
      campus: "East",
      college: "Environment",
      status: "Terminated",
    },
  ];

  const [year, setYear] = useState(2025);
  const [status, setStatus] = useState("All Proposal");

  const columns: Array<{
    key: ColumnKey;
    header: string;
    render?: (value: any, row: ResearchProject) => React.ReactNode;
    align?: "left" | "center";
    width?: string;
  }> = [
    { key: "id", header: "#", align: "center", width: "60px" },
    { key: "title", header: "Title", align: "left" },
    { key: "researcher", header: "Researcher", align: "left" },
    { key: "campus", header: "Campus", align: "center" },
    { key: "college", header: "College", align: "center" },
    {
      key: "status",
      header: "Status",
      align: "center",
      render: (value: ResearchProject["status"]) => {
        const styleMap = {
          Completed: "bg-green-100 text-green-700",
          Terminated: "bg-red-100 text-red-700",
          Pending: "bg-yellow-100 text-yellow-700",
          Ongoing: "bg-blue-100 text-blue-700",
        };
        return (
          <span
            className={`inline-block px-3 py-1 rounded-full font-medium select-none ${styleMap[value]}`}
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
      render: (_, row) => (
        <ActionDropdown
          onView={() => alert(`Edit ${row.title}`)}
          onApprove={() => alert(`Delete ${row.title}`)}
          onRequest={() => alert(`View ${row.title}`)}
        />
      ),
    },
  ];

  // Dropdown items
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
          <div className="flex items-center">
            <Dropdown buttonContent={`Year: ${year}`} items={yearItems} />
            <Dropdown buttonContent={`Status: ${status}`} items={statusItems} />
          </div>

          <div className="flex items-center text-sm text-slate-500 font-medium cursor-pointer select-none">
            <BiSolidFilterAlt className="mr-2 text-xl" />
            More Filters
          </div>
        </div>
      </div>

      {/* Table */}
      <Table<ResearchProject> columns={columns} data={data} />
    </div>
  );
};

export default AllResearchPage;
