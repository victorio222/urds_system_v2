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





// // "use client";

// // import React, { useEffect, useState } from "react";
// // import Table from "@/component/ui/Table";
// // import { BiSolidFilterAlt } from "react-icons/bi";
// // import ActionDropdown from "../action/ActionDropdown";
// // import Dropdown, { DropdownItem } from "@/component/ui/Dropdown";
// // import { apiAuth } from "@/utils/apiHelpers";
// // import Modal from "@/component/ui/Modal";

// // interface ResearchProposal {
// //   proposal_id: number;
// //   title: string;
// //   commodity: string;
// //   natureOfResearch: string;
// //   location: string;
// //   durationStart: string;
// //   durationEnd: string;
// //   budget: number;
// //   status: string;
// //   versionNumber: number;
// //   submissionDate: string;
// //   createdAt: string;
// //   updatedAt: string;
// // }

// // type ColumnKey = keyof ResearchProposal | "action" | "seq";

// // const AllResearchPage = () => {
// //   const [data, setData] = useState<ResearchProposal[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [year, setYear] = useState<number | "All">("All");
// //   const [status, setStatus] = useState<string>("All Proposal");

// //   const [viewModal, setViewModal] = useState<ResearchProposal | null>(null);
// //   const [confirmModal, setConfirmModal] = useState<{
// //     type: "approve" | "revision";
// //     project: ResearchProposal;
// //   } | null>(null);

// //   const [years, setYears] = useState<number[]>([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         setLoading(true);
// //         const res = await apiAuth.get("/proposals");
// //         let projects: ResearchProposal[] = res.data;

// //         // Filter only New, Ongoing, Completed, Terminated
// //         projects = projects.filter((p) =>
// //           ["New", "Ongoing", "Completed", "Terminated"].includes(p.status)
// //         );

// //         // Sort by createdAt descending (most recent first)
// //         projects.sort(
// //           (a, b) =>
// //             new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
// //         );

// //         setData(projects);

// //         const uniqueYears = Array.from(
// //           new Set(projects.map((p) => new Date(p.createdAt).getFullYear()))
// //         ).sort((a, b) => b - a);
// //         setYears(uniqueYears);
// //       } catch (err) {
// //         console.error("Failed to fetch proposals", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchData();
// //   }, []);

// //   // Add sequential number before passing to Table
// //   const tableData = filteredData().map((p, index) => ({
// //     ...p,
// //     seq: index + 1,
// //     id: p.proposal_id,
// //   }));

// //   const columns: Array<{
// //     key: ColumnKey;
// //     header: string;
// //     render?: (value: any, row: any) => React.ReactNode;
// //     align?: "left" | "center";
// //     width?: string;
// //   }> = [
// //     { key: "seq", header: "#", align: "center", width: "60px" },
// //     { key: "title", header: "Title", align: "left" },
// //     { key: "commodity", header: "Commodity", align: "left" },
// //     { key: "natureOfResearch", header: "Nature", align: "center" },
// //     { key: "location", header: "Location", align: "center" },
// //     {
// //       key: "status",
// //       header: "Status",
// //       align: "center",
// //       render: (status) => {
// //         const styleMap: Record<string, string> = {
// //           New: "bg-blue-100 text-blue-700",
// //           Ongoing: "bg-indigo-100 text-indigo-700",
// //           Completed: "bg-green-100 text-green-700",
// //           Terminated: "bg-red-100 text-red-700",
// //         };
// //         return (
// //           <span
// //             className={`inline-block px-3 py-1 rounded-full font-medium select-none ${
// //               styleMap[status] || "bg-gray-100 text-gray-700"
// //             }`}
// //           >
// //             {status}
// //           </span>
// //         );
// //       },
// //     },
// //     {
// //       key: "action",
// //       header: "Action",
// //       align: "center",
// //       width: "80px",
// //       render: (_, row) => {
// //         if (["Completed", "Terminated"].includes(row.status)) {
// //           return <ActionDropdown onView={() => setViewModal(row)} />;
// //         }
// //         return (
// //           <ActionDropdown
// //             onView={() => setViewModal(row)}
// //             onApprove={() => setConfirmModal({ type: "approve", project: row })}
// //             onRequest={() =>
// //               setConfirmModal({ type: "revision", project: row })
// //             }
// //           />
// //         );
// //       },
// //     },
// //   ];

// //   const yearItems: DropdownItem[] = [
// //     { label: "All", onClick: () => setYear("All") },
// //     ...years.map((y) => ({ label: y.toString(), onClick: () => setYear(y) })),
// //   ];

// //   const statusItems: DropdownItem[] = [
// //     "All Proposal",
// //     "New",
// //     "Ongoing",
// //     "Completed",
// //     "Terminated",
// //   ].map((s) => ({ label: s, onClick: () => setStatus(s) }));

// //   function filteredData() {
// //     return data.filter((p) => {
// //       const matchesYear =
// //         year === "All" || new Date(p.createdAt).getFullYear() === year;
// //       const matchesStatus = status === "All Proposal" || p.status === status;
// //       return matchesYear && matchesStatus;
// //     });
// //   }

// //   return (
// //     <div className="space-y-4 mt-[-10px] w-full">
// //       <div className="max-w-full flex justify-end mb-[-5px]">
// //         <div className="inline-flex justify-end bg-white p-2 pr-5 rounded-full shadow space-x-4">
// //           <div className="flex items-center">
// //             <Dropdown buttonContent={`Year: ${year}`} items={yearItems} />
// //             <Dropdown buttonContent={`Status: ${status}`} items={statusItems} />
// //           </div>
// //           <div className="flex items-center text-sm text-slate-500 font-medium cursor-pointer select-none">
// //             <BiSolidFilterAlt className="mr-2 text-xl" /> More Filters
// //           </div>
// //         </div>
// //       </div>

// //       <Table
// //         columns={columns}
// //         data={tableData}
// //         loading={loading}
// //         rowKey={(row) => row.id}
// //       />

// //       {/* View Modal */}
// //       {viewModal && (
// //         <Modal
// //           opened={!!viewModal}
// //           onClose={() => setViewModal(null)}
// //           title="Proposal Details"
// //         >
// //           <div className="space-y-2">
// //             <p>
// //               <strong>Title:</strong> {viewModal.title}
// //             </p>
// //             <p>
// //               <strong>Commodity:</strong> {viewModal.commodity}
// //             </p>
// //             <p>
// //               <strong>Nature of Research:</strong> {viewModal.natureOfResearch}
// //             </p>
// //             <p>
// //               <strong>Location:</strong> {viewModal.location}
// //             </p>
// //             <p>
// //               <strong>Duration:</strong>{" "}
// //               {new Date(viewModal.durationStart).toLocaleDateString()} -{" "}
// //               {new Date(viewModal.durationEnd).toLocaleDateString()}
// //             </p>
// //             <p>
// //               <strong>Budget:</strong> ${viewModal.budget.toLocaleString()}
// //             </p>
// //             <p>
// //               <strong>Status:</strong> {viewModal.status}
// //             </p>
// //             <p>
// //               <strong>Submission Date:</strong>{" "}
// //               {new Date(viewModal.submissionDate).toLocaleString()}
// //             </p>
// //           </div>
// //         </Modal>
// //       )}

// //       {/* Confirm Modal */}
// //       {confirmModal && (
// //         <Modal
// //           opened={!!confirmModal}
// //           onClose={() => setConfirmModal(null)}
// //           title={
// //             confirmModal.type === "approve"
// //               ? "Approve Proposal"
// //               : "Request Revision"
// //           }
// //         >
// //           <p>
// //             Are you sure you want to{" "}
// //             {confirmModal.type === "approve" ? "approve" : "request revision"}{" "}
// //             <strong>{confirmModal.project.title}</strong>?
// //           </p>
// //           <div className="mt-4 flex justify-end space-x-2">
// //             <button
// //               onClick={() => setConfirmModal(null)}
// //               className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               onClick={() => {
// //                 console.log(
// //                   confirmModal.type,
// //                   confirmModal.project.proposal_id
// //                 );
// //                 setConfirmModal(null);
// //               }}
// //               className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
// //             >
// //               Confirm
// //             </button>
// //           </div>
// //         </Modal>
// //       )}
// //     </div>
// //   );
// // };

// // export default AllResearchPage;




// "use client";

// import React, { useEffect, useState } from "react";
// import Table from "@/component/ui/Table";
// import { BiSolidFilterAlt } from "react-icons/bi";
// import ActionDropdown from "../action/ActionDropdown";
// import Dropdown, { DropdownItem } from "@/component/ui/Dropdown";
// import { apiAuth } from "@/utils/apiHelpers";
// import Modal from "@/component/ui/Modal";

// interface ResearchProposal {
//   proposal_id: number;
//   title: string;
//   commodity: string;
//   natureOfResearch: string;
//   location: string;
//   durationStart: string;
//   durationEnd: string;
//   budget: number;
//   status: string;
//   versionNumber: number;
//   submissionDate: string;
//   createdAt: string;
//   updatedAt: string;
// }

// // Table row type includes seq and id
// type TableRow = ResearchProposal & {
//   seq: number;
//   id: number;
// };

// type ColumnKey = keyof TableRow;

// const AllResearchPage: React.FC = () => {
//   const [data, setData] = useState<ResearchProposal[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [year, setYear] = useState<number | "All">("All");
//   const [status, setStatus] = useState<string>("All Proposal");
//   const [viewModal, setViewModal] = useState<ResearchProposal | null>(null);
//   const [confirmModal, setConfirmModal] = useState<{
//     type: "approve" | "revision";
//     project: ResearchProposal;
//   } | null>(null);
//   const [years, setYears] = useState<number[]>([]);

//   // Fetch proposals
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const res = await apiAuth.get("/proposals");
//         let projects: ResearchProposal[] = res.data;

//         // Filter relevant statuses
//         projects = projects.filter((p) =>
//           ["New", "Ongoing", "Completed", "Terminated"].includes(p.status)
//         );

//         // Sort descending by createdAt
//         projects.sort(
//           (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//         );

//         setData(projects);

//         // Extract unique years
//         const uniqueYears = Array.from(
//           new Set(projects.map((p) => new Date(p.createdAt).getFullYear()))
//         ).sort((a, b) => b - a);
//         setYears(uniqueYears);
//       } catch (err) {
//         console.error("Failed to fetch proposals", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // Filtered data with seq and id
//   const filteredData = (): TableRow[] => {
//     return data
//       .filter((p) => (year === "All" ? true : new Date(p.createdAt).getFullYear() === year))
//       .filter((p) => (status === "All Proposal" ? true : p.status === status))
//       .map((p, index) => ({
//         ...p,
//         seq: index + 1,
//         id: p.proposal_id,
//       }));
//   };

//   // Table columns
//   const columns: Array<{
//     key: ColumnKey;
//     header: string;
//     render?: (value: TableRow[keyof TableRow], row: TableRow) => React.ReactNode;
//     align?: "left" | "center";
//     width?: string;
//   }> = [
//     { key: "seq", header: "#", align: "center", width: "60px" },
//     { key: "title", header: "Title", align: "left" },
//     { key: "commodity", header: "Commodity", align: "left" },
//     { key: "natureOfResearch", header: "Nature", align: "center" },
//     { key: "location", header: "Location", align: "center" },
//     {
//       key: "status",
//       header: "Status",
//       align: "center",
//       render: (statusValue) => {
//         const styleMap: Record<string, string> = {
//           New: "bg-blue-100 text-blue-700",
//           Ongoing: "bg-indigo-100 text-indigo-700",
//           Completed: "bg-green-100 text-green-700",
//           Terminated: "bg-red-100 text-red-700",
//         };
//         return (
//           <span
//             className={`inline-block px-3 py-1 rounded-full font-medium select-none ${
//               styleMap[statusValue as string] || "bg-gray-100 text-gray-700"
//             }`}
//           >
//             {statusValue}
//           </span>
//         );
//       },
//     },
//     {
//       key: "action",
//       header: "Action",
//       align: "center",
//       width: "80px",
//       render: (_value, row) => {
//         if (["Completed", "Terminated"].includes(row.status)) {
//           return <ActionDropdown onView={() => setViewModal(row)} />;
//         }
//         return (
//           <ActionDropdown
//             onView={() => setViewModal(row)}
//             onApprove={() => setConfirmModal({ type: "approve", project: row })}
//             onRequest={() => setConfirmModal({ type: "revision", project: row })}
//           />
//         );
//       },
//     },
//   ];

//   // Dropdown items
//   const yearItems: DropdownItem[] = [
//     { label: "All", onClick: () => setYear("All") },
//     ...years.map((y) => ({ label: y.toString(), onClick: () => setYear(y) })),
//   ];

//   const statusItems: DropdownItem[] = [
//     "All Proposal",
//     "New",
//     "Ongoing",
//     "Completed",
//     "Terminated",
//   ].map((s) => ({ label: s, onClick: () => setStatus(s) }));

//   return (
//     <div className="space-y-4 mt-[-10px] w-full">
//       {/* Filters */}
//       <div className="max-w-full flex justify-end mb-[-5px]">
//         <div className="inline-flex justify-end bg-white p-2 pr-5 rounded-full shadow space-x-4">
//           <div className="flex items-center">
//             <Dropdown buttonContent={`Year: ${year}`} items={yearItems} />
//             <Dropdown buttonContent={`Status: ${status}`} items={statusItems} />
//           </div>
//           <div className="flex items-center text-sm text-slate-500 font-medium cursor-pointer select-none">
//             <BiSolidFilterAlt className="mr-2 text-xl" /> More Filters
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       {loading ? (
//         <div className="text-center py-10">Loading...</div>
//       ) : (
//         <Table columns={columns} data={filteredData()} rowKey={(row) => row.id} />
//       )}

//       {/* View Modal */}
//       {viewModal && (
//         <Modal
//           opened={!!viewModal}
//           onClose={() => setViewModal(null)}
//           title="Proposal Details"
//         >
//           <div className="space-y-2">
//             <p>
//               <strong>Title:</strong> {viewModal.title}
//             </p>
//             <p>
//               <strong>Commodity:</strong> {viewModal.commodity}
//             </p>
//             <p>
//               <strong>Nature of Research:</strong> {viewModal.natureOfResearch}
//             </p>
//             <p>
//               <strong>Location:</strong> {viewModal.location}
//             </p>
//             <p>
//               <strong>Duration:</strong>{" "}
//               {new Date(viewModal.durationStart).toLocaleDateString()} -{" "}
//               {new Date(viewModal.durationEnd).toLocaleDateString()}
//             </p>
//             <p>
//               <strong>Budget:</strong> ${viewModal.budget.toLocaleString()}
//             </p>
//             <p>
//               <strong>Status:</strong> {viewModal.status}
//             </p>
//             <p>
//               <strong>Submission Date:</strong>{" "}
//               {new Date(viewModal.submissionDate).toLocaleString()}
//             </p>
//           </div>
//         </Modal>
//       )}

//       {/* Confirm Modal */}
//       {confirmModal && (
//         <Modal
//           opened={!!confirmModal}
//           onClose={() => setConfirmModal(null)}
//           title={
//             confirmModal.type === "approve"
//               ? "Approve Proposal"
//               : "Request Revision"
//           }
//         >
//           <p>
//             Are you sure you want to{" "}
//             {confirmModal.type === "approve" ? "approve" : "request revision"}{" "}
//             <strong>{confirmModal.project.title}</strong>?
//           </p>
//           <div className="mt-4 flex justify-end space-x-2">
//             <button
//               onClick={() => setConfirmModal(null)}
//               className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={() => {
//                 console.log(confirmModal.type, confirmModal.project.proposal_id);
//                 setConfirmModal(null);
//               }}
//               className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
//             >
//               Confirm
//             </button>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default AllResearchPage;




'use client';

import React, { useEffect, useState } from "react";
import Table from "@/component/ui/Table";
import { BiSolidFilterAlt } from "react-icons/bi";
import ActionDropdown from "../action/ActionDropdown";
import Dropdown, { DropdownItem } from "@/component/ui/Dropdown";
import { apiAuth } from "@/utils/apiHelpers";
import Modal from "@/component/ui/Modal";

// Main data type
interface ResearchProposal {
  proposal_id: number;
  title: string;
  commodity: string;
  natureOfResearch: string;
  location: string;
  durationStart: string;
  durationEnd: string;
  budget: number;
  status: "New" | "Ongoing" | "Completed" | "Terminated";
  versionNumber: number;
  submissionDate: string;
  createdAt: string;
  updatedAt: string;
}

// Table row type
type TableRow = ResearchProposal & {
  seq: number;
  id: number;
  action?: string;
};

const AllResearchPage: React.FC = () => {
  const [data, setData] = useState<ResearchProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState<number | "All">("All");
  const [status, setStatus] = useState<string>("All Proposal");

  const [viewModal, setViewModal] = useState<ResearchProposal | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    type: "approve" | "revision";
    project: ResearchProposal;
  } | null>(null);

  const [years, setYears] = useState<number[]>([]);

  // Fetch proposals
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiAuth.get("/proposals");
        let projects: ResearchProposal[] = res.data;

        // Filter relevant statuses
        projects = projects.filter((p) =>
          ["New", "Ongoing", "Completed", "Terminated"].includes(p.status)
        );

        // Sort descending by createdAt
        projects.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setData(projects);

        // Extract unique years
        const uniqueYears = Array.from(
          new Set(projects.map((p) => new Date(p.createdAt).getFullYear()))
        ).sort((a, b) => b - a);
        setYears(uniqueYears);
      } catch (err) {
        console.error("Failed to fetch proposals", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtered data with seq and id
  const filteredData = (): TableRow[] =>
    data
      .filter((p) => (year === "All" ? true : new Date(p.createdAt).getFullYear() === year))
      .filter((p) => (status === "All Proposal" ? true : p.status === status))
      .map((p, index) => ({ ...p, seq: index + 1, id: p.proposal_id }));

  // Table columns
  const columns = [
    { key: "seq", header: "#", width: "60px", align: "center" },
    { key: "title", header: "Title", align: "left" },
    { key: "commodity", header: "Commodity", align: "left" },
    { key: "natureOfResearch", header: "Nature", align: "center" },
    { key: "location", header: "Location", align: "center" },
    {
      key: "status",
      header: "Status",
      align: "center",
      render: (value: ResearchProposal["status"]) => {
        const styleMap: Record<string, string> = {
          New: "bg-blue-100 text-blue-700",
          Ongoing: "bg-indigo-100 text-indigo-700",
          Completed: "bg-green-100 text-green-700",
          Terminated: "bg-red-100 text-red-700",
        };
        return (
          <span
            className={`inline-block px-3 py-1 rounded-full font-medium select-none ${
              styleMap[value] || "bg-gray-100 text-gray-700"
            }`}
          >
            {value}
          </span>
        );
      },
    },
    {
      // Action column: no key to avoid TS error
      key: "action",
      header: "Action",
      align: "center",
      width: "80px",
      render: (_: any, row: TableRow) => {
        if (["Completed", "Terminated"].includes(row.status)) {
          return <ActionDropdown onView={() => setViewModal(row)} />;
        }
        return (
          <ActionDropdown
            onView={() => setViewModal(row)}
            onApprove={() => setConfirmModal({ type: "approve", project: row })}
            onRequest={() => setConfirmModal({ type: "revision", project: row })}
          />
        );
      },
    },
  ];

  // Dropdown items
  const yearItems: DropdownItem[] = [
    { label: "All", onClick: () => setYear("All") },
    ...years.map((y) => ({ label: y.toString(), onClick: () => setYear(y) })),
  ];

  const statusItems: DropdownItem[] = [
    "All Proposal",
    "New",
    "Ongoing",
    "Completed",
    "Terminated",
  ].map((s) => ({ label: s, onClick: () => setStatus(s) }));

  return (
    <div className="space-y-4 mt-[-10px] w-full">
      {/* Filters */}
      <div className="max-w-full flex justify-end mb-[-5px]">
        <div className="inline-flex justify-end bg-white p-2 pr-5 rounded-full shadow space-x-4">
          <Dropdown buttonContent={`Year: ${year}`} items={yearItems} />
          <Dropdown buttonContent={`Status: ${status}`} items={statusItems} />
          <div className="flex items-center text-sm text-slate-500 font-medium cursor-pointer select-none">
            <BiSolidFilterAlt className="mr-2 text-xl" /> More Filters
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <Table<TableRow> columns={columns} data={filteredData()} />
      )}

      {/* View Modal */}
      {viewModal && (
        <Modal
          opened={!!viewModal}
          onClose={() => setViewModal(null)}
          title="Proposal Details"
        >
          <div className="space-y-2">
            <p><strong>Title:</strong> {viewModal.title}</p>
            <p><strong>Commodity:</strong> {viewModal.commodity}</p>
            <p><strong>Nature of Research:</strong> {viewModal.natureOfResearch}</p>
            <p><strong>Location:</strong> {viewModal.location}</p>
            <p>
              <strong>Duration:</strong>{" "}
              {new Date(viewModal.durationStart).toLocaleDateString()} -{" "}
              {new Date(viewModal.durationEnd).toLocaleDateString()}
            </p>
            <p><strong>Budget:</strong> ${viewModal.budget.toLocaleString()}</p>
            <p><strong>Status:</strong> {viewModal.status}</p>
            <p>
              <strong>Submission Date:</strong>{" "}
              {new Date(viewModal.submissionDate).toLocaleString()}
            </p>
          </div>
        </Modal>
      )}

      {/* Confirm Modal */}
      {confirmModal && (
        <Modal
          opened={!!confirmModal}
          onClose={() => setConfirmModal(null)}
          title={confirmModal.type === "approve" ? "Approve Proposal" : "Request Revision"}
        >
          <p>
            Are you sure you want to{" "}
            {confirmModal.type === "approve" ? "approve" : "request revision"}{" "}
            <strong>{confirmModal.project.title}</strong>?
          </p>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setConfirmModal(null)}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log(confirmModal.type, confirmModal.project.proposal_id);
                setConfirmModal(null);
              }}
              className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
              Confirm
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AllResearchPage;
