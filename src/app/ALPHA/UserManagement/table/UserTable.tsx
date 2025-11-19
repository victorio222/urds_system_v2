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

// const UserTable = () => {
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

// export default UserTable;







// "use client";

// import React, { useState } from "react";
// import Table from "@/component/ui/Table";
// import { BiSolidFilterAlt } from "react-icons/bi";
// import ActionDropdown from "../action/ActionDropdown";
// import Dropdown, { DropdownItem } from "@/component/ui/Dropdown";

// interface UserEntry {
//   id: number;
//   name: string;
//   role: string;
//   campus: string;
//   college: string;
//   status: "Active" | "Inactive" | "Suspended";
// }

// type ColumnKey = keyof UserEntry | "checkbox" | "action";

// const UserTable = () => {
//   const [selectedRows, setSelectedRows] = useState<number[]>([]);
//   const [selectAll, setSelectAll] = useState(false);

//   // 🚀 NEW USER DATA
//   const data: UserEntry[] = [
//     {
//       id: 101,
//       name: "John Doe",
//       role: "Administrator",
//       campus: "Main",
//       college: "IT",
//       status: "Active",
//     },
//     {
//       id: 102,
//       name: "Sarah Smith",
//       role: "Faculty",
//       campus: "North",
//       college: "Science",
//       status: "Inactive",
//     },
//     {
//       id: 103,
//       name: "Michael Brown",
//       role: "Student",
//       campus: "West",
//       college: "Engineering",
//       status: "Suspended",
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
//   const [status, setStatus] = useState("All Users");

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
//       render: (_: any, row: UserEntry) => (
//         <input
//           type="checkbox"
//           checked={selectedRows.includes(row.id)}
//           onChange={() => toggleRow(row.id)}
//           className="w-4 h-4 cursor-pointer"
//         />
//       ),
//     },

//     { key: "id", header: "ID", align: "center" },
//     { key: "name", header: "Name of User", align: "left" },
//     { key: "role", header: "Role", align: "center" },
//     { key: "campus", header: "Campus", align: "center" },
//     { key: "college", header: "College", align: "center" },

//     {
//       key: "status",
//       header: "Status",
//       align: "center",
//       render: (value: UserEntry["status"]) => {
//         const styleMap = {
//           Active: "bg-green-100 text-green-700",
//           Inactive: "bg-yellow-100 text-yellow-700",
//           Suspended: "bg-red-100 text-red-700",
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
//       render: (_: any, row: UserEntry) => (
//         <ActionDropdown
//           onView={() => alert(`Viewing ${row.name}`)}
//           onApprove={() => alert(`Editing ${row.name}`)}
//           onRequest={() => alert(`Deleting ${row.name}`)}
//         />
//       ),
//     },
//   ];

//   const yearItems: DropdownItem[] = [2023, 2024, 2025, 2026, 2027].map((y) => ({
//     label: y.toString(),
//     onClick: () => setYear(y),
//   }));

//   const statusItems: DropdownItem[] = [
//     "All Users",
//     "Active",
//     "Inactive",
//     "Suspended",
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
// export default UserTable;


// "use client";

// import React, { useState } from "react";
// import Table from "@/component/ui/Table";
// import { BiSolidFilterAlt } from "react-icons/bi";
// import ActionDropdown from "../action/ActionDropdown";
// import Dropdown, { DropdownItem } from "@/component/ui/Dropdown";
// import Modal from "@/component/ui/Modal";

// // ---------------------
// // Add User Form
// // ---------------------
// const AddUserForm = ({ close }: { close: () => void }) => {
//   // 🔹 Name fields
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [middleName, setMiddleName] = useState("");
//   const [suffix, setSuffix] = useState("");

//   // 🔹 Contact
//   const [email, setEmail] = useState("");

//   // 🔹 Role / Account fields
//   const [role, setRole] = useState("Administrator");
//   const [password, setPassword] = useState("");

//   // 🔹 Optional fields (if needed later)
//   const [campus, setCampus] = useState("Main");
//   const [college, setCollege] = useState("IT");
//   const [status, setStatus] = useState<"Active" | "Inactive" | "Suspended">(
//     "Active"
//   );

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log({
//       firstName,
//       lastName,
//       middleName,
//       suffix,
//       email,
//       role,
//       campus,
//       college,
//       status,
//     });
//     close();
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 mt-2">

//       {/* Row 1 */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm text-black font-medium mb-1">First Name</label>
//           <input
//             type="text"
//             className="w-full border px-3 py-2 rounded text-gray-600"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm text-black font-medium mb-1">Last Name</label>
//           <input
//             type="text"
//             className="w-full border px-3 py-2 rounded text-gray-600"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//           />
//         </div>
//       </div>

//       {/* Row 2 */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm text-black font-medium mb-1">Middle Name</label>
//           <input
//             type="text"
//             className="w-full border px-3 py-2 rounded text-gray-600"
//             value={middleName}
//             onChange={(e) => setMiddleName(e.target.value)}
//           />
//         </div>

//         <div>
//           <label className="block text-sm text-black font-medium mb-1">Suffix Name</label>
//           <input
//             type="text"
//             className="w-full border px-3 py-2 rounded text-gray-600"
//             value={suffix}
//             onChange={(e) => setSuffix(e.target.value)}
//           />
//         </div>
//       </div>

//        {/* Row 3 */}
//       <div className="grid grid-cols-2 gap-4">
//       <div>
//         <label className="block text-sm text-black font-medium mb-1">Email Address</label>
//         <input
//           type="email"
//           className="w-full border px-3 py-2 rounded text-gray-600"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>

//       <div>
//           <label className="block text-sm text-black font-medium mb-1">Role/Position</label>
//           <select
//             className="w-full border px-3 py-2 rounded text-gray-600"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//           >
//             <option>Administrator</option>
//             <option>Faculty</option>
//             <option>Staff</option>
//             <option>Student</option>
//             <option>Evaluator</option>
//           </select>
//         </div>
//          </div>

//         <div>
//           <label className="block text-sm text-black font-medium mb-1">Password</label>
//           <input
//             type="password"
//             className="w-full border px-3 py-2 rounded text-gray-600"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
     

//       {/* Buttons */}
//       <div className="flex justify-end gap-3 pt-2">
//         <button
//           type="button"
//           onClick={close}
//           className="px-4 py-2 border rounded-lg hover:bg-gray-100"
//         >
//           Cancel
//         </button>

//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         >
//           Save Changes
//         </button>
//       </div>
//     </form>
//   );
// };

// // ---------------------
// // Table Component
// // ---------------------
// interface UserEntry {
//   id: number;
//   name: string;
//   role: string;
//   campus: string;
//   college: string;
//   status: "Active" | "Inactive" | "Suspended";
// }

// type ColumnKey = keyof UserEntry | "checkbox" | "action";

// const UserTable = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedRows, setSelectedRows] = useState<number[]>([]);
//   const [selectAll, setSelectAll] = useState(false);

//   const data: UserEntry[] = [
//     { id: 101, name: "John Doe", role: "Administrator", campus: "Main", college: "IT", status: "Active" },
//     { id: 102, name: "Sarah Smith", role: "Faculty", campus: "North", college: "Science", status: "Inactive" },
//     { id: 103, name: "Michael Brown", role: "Student", campus: "West", college: "Engineering", status: "Suspended" },
//   ];

//   const toggleRow = (id: number) =>
//     setSelectedRows((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );

//   const toggleSelectAll = () => {
//     setSelectedRows(selectAll ? [] : data.map((item) => item.id));
//     setSelectAll(!selectAll);
//   };

//   const [year, setYear] = useState(2025);
//   const [status, setStatus] = useState("All Users");

//   const yearItems: DropdownItem[] = [2023, 2024, 2025, 2026, 2027].map((y) => ({
//     label: y.toString(),
//     onClick: () => setYear(y),
//   }));

//   const statusItems: DropdownItem[] = ["All Users", "Active", "Inactive", "Suspended"].map((s) => ({
//     label: s,
//     onClick: () => setStatus(s),
//   }));

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
//       render: (_: any, row: UserEntry) => (
//         <input
//           type="checkbox"
//           checked={selectedRows.includes(row.id)}
//           onChange={() => toggleRow(row.id)}
//           className="w-4 h-4 cursor-pointer"
//         />
//       ),
//     },
//     { key: "id", header: "ID", align: "center" },
//     { key: "name", header: "Name of User", align: "left" },
//     { key: "role", header: "Role", align: "center" },
//     { key: "campus", header: "Campus", align: "center" },
//     { key: "college", header: "College", align: "center" },
//     {
//       key: "status",
//       header: "Status",
//       align: "center",
//       render: (value: UserEntry["status"]) => {
//         const styleMap = {
//           Active: "bg-green-100 text-green-700",
//           Inactive: "bg-yellow-100 text-yellow-700",
//           Suspended: "bg-red-100 text-red-700",
//         };
//         return (
//           <span className={`px-3 py-1 rounded-full text-sm font-medium ${styleMap[value]}`}>
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
//       render: (_: any, row: UserEntry) => (
//         <ActionDropdown
//           onView={() => alert(`Viewing ${row.name}`)}
//           onApprove={() => alert(`Editing ${row.name}`)}
//           onRequest={() => alert(`Deleting ${row.name}`)}
//         />
//       ),
//     },
//   ];

//   return (
//     <div className="space-y-4 mt-[-10px] w-full">

//       {/* Filters */}
//       <div className="max-w-full flex justify-end mb-[-5px]">
//         <div className="inline-flex bg-white p-2 pr-5 rounded-full shadow space-x-4">
//           <Dropdown buttonContent={`Year: ${year}`} items={yearItems} />
//           <Dropdown buttonContent={`Status: ${status}`} items={statusItems} />

//           <div className="flex items-center text-sm text-slate-500 font-medium cursor-pointer">
//             <BiSolidFilterAlt className="mr-2 text-xl" />
//             More Filters
//           </div>
//         </div>
//       </div>

//       {/* Add Button */}
//       <div className="flex justify-end">
//         <button
//           onClick={() => setModalOpen(true)}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         >
//           Add New User
//         </button>
//       </div>

//       {/* Modal */}
//       <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title="Add New User">
//         <AddUserForm close={() => setModalOpen(false)} />
//       </Modal>

//       {/* Table */}
//       <Table columns={columns as any} data={data} />
//     </div>
//   );
// };

// export default UserTable;


"use client";

import React, { useState } from "react";
import Table from "@/component/ui/Table";
import { BiSolidFilterAlt } from "react-icons/bi";
import ActionDropdown from "../action/ActionDropdown";
import Dropdown, { DropdownItem } from "@/component/ui/Dropdown";
import Modal from "@/component/ui/Modal";
import UserConfirmationModal from './UserConfirmationModal'; 
// Tiyakin na ang 'UserConfirmationModal' ay na-define at na-import nang tama sa iyong project

// Interface para sa detalyadong data ng user na ipapasa sa modal
// Ito ang kailangan para maayos ang type error sa 'selectedUser' state
interface UserProfileData {
  fullName: string;
  position: string;
  accountStatus: "Pending" | "Active" | "Inactive";
  gender: string;
  emailAddress: string;
  campus: string;
  collegeDepartment: string;
}

// ---------------------
// Add User Form (Unchanged for brevity)
// ---------------------
const AddUserForm = ({ close }: { close: () => void }) => {
    // ... (Your existing AddUserForm implementation)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [suffix, setSuffix] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Administrator");
    const [password, setPassword] = useState("");
    const [campus, setCampus] = useState("Main");
    const [college, setCollege] = useState("IT");
    const [status, setStatus] = useState<"Active" | "Inactive" | "Suspended">("Active");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ firstName, lastName, middleName, suffix, email, role, campus, college, status, });
        close();
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4 mt-2">
        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-black font-medium mb-1">First Name</label>
            <input type="text" className="w-full border px-3 py-2 rounded text-gray-600" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm text-black font-medium mb-1">Last Name</label>
            <input type="text" className="w-full border px-3 py-2 rounded text-gray-600" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-black font-medium mb-1">Middle Name</label>
            <input type="text" className="w-full border px-3 py-2 rounded text-gray-600" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm text-black font-medium mb-1">Suffix Name</label>
            <input type="text" className="w-full border px-3 py-2 rounded text-gray-600" value={suffix} onChange={(e) => setSuffix(e.target.value)} />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-black font-medium mb-1">Email Address</label>
            <input type="email" className="w-full border px-3 py-2 rounded text-gray-600" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm text-black font-medium mb-1">Role/Position</label>
            <select className="w-full border px-3 py-2 rounded text-gray-600" value={role} onChange={(e) => setRole(e.target.value)} >
              <option>Administrator</option>
              <option>Faculty</option>
              <option>Staff</option>
              <option>Student</option>
              <option>Evaluator</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-black font-medium mb-1">Password</label>
          <input type="password" className="w-full border px-3 py-2 rounded text-gray-600" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={close} className="px-4 py-2 border rounded-lg hover:bg-gray-100" >
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" >
            Save Changes
          </button>
        </div>
      </form>
    );
};


// ---------------------
// Table Component
// ---------------------
interface UserEntry {
  id: number;
  name: string;
  role: string;
  campus: string;
  college: string;
  status: "Active" | "Inactive" | "Suspended";
}

type ColumnKey = keyof UserEntry | "checkbox" | "action";

const UserTable = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Ginamit ang UserProfileData interface dito para maayos ang type error
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfileData | null>(null);

  const data: UserEntry[] = [
    { id: 101, name: "Jake Turner", role: "Administrator", campus: "Main", college: "IT", status: "Active" },
    { id: 102, name: "Sarah Smith", role: "Faculty", campus: "North", college: "Science", status: "Inactive" },
    { id: 103, name: "Michael Brown", role: "Student", campus: "West", college: "Engineering", status: "Suspended" },
  ];

  // Function to handle the Approve action from the dropdown
  const handleApproveClick = (user: UserEntry) => {
    // Paggawa ng object na may tamang UserProfileData structure
    const detailedUserData: UserProfileData = { 
      fullName: user.name, 
      position: user.role,
      accountStatus: 'Pending', // Assume it's Pending when viewing the profile for approval
      gender: 'Male', // Dummy data, replace with actual data source field
      emailAddress: 'test@sample.com', // Dummy data, replace with actual data source field
      campus: user.campus,
      collegeDepartment: user.college,
    };
    
    // Walang error dito dahil UserProfileData na ang type ng state
    setSelectedUser(detailedUserData); 
    setConfirmationModalOpen(true);
  };
  
  const handleFinalApprove = () => {
      // ✅ FIX: Ginamit ang local variable na 'selectedUser' sa alert
      alert(`User ${selectedUser?.fullName} approved!`);
      // Add API call logic here
      setConfirmationModalOpen(false); // Close the modal after action
  };

  const handleFinalNotEligible = () => {
      // ✅ FIX: Ginamit ang local variable na 'selectedUser' sa alert
      alert(`User ${selectedUser?.fullName} marked as Not Eligible.`);
      // Add API call logic here
      setConfirmationModalOpen(false); // Close the modal after action
  };

  const toggleRow = (id: number) =>
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const toggleSelectAll = () => {
    setSelectedRows(selectAll ? [] : data.map((item) => item.id));
    setSelectAll(!selectAll);
  };

  const [year, setYear] = useState(2025);
  const [status, setStatus] = useState("All Users");

  const yearItems: DropdownItem[] = [2023, 2024, 2025, 2026, 2027].map((y) => ({
    label: y.toString(),
    onClick: () => setYear(y),
  }));

  const statusItems: DropdownItem[] = ["All Users", "Active", "Inactive", "Suspended"].map((s) => ({
    label: s,
    onClick: () => setStatus(s),
  }));

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
      render: (_: any, row: UserEntry) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(row.id)}
          onChange={() => toggleRow(row.id)}
          className="w-4 h-4 cursor-pointer"
        />
      ),
    },
    { key: "id", header: "ID", align: "center" },
    { key: "name", header: "Name of User", align: "left" },
    { key: "role", header: "Role", align: "center" },
    { key: "campus", header: "Campus", align: "center" },
    { key: "college", header: "College", align: "center" },
    {
      key: "status",
      header: "Status",
      align: "center",
      render: (value: UserEntry["status"]) => {
        const styleMap = {
          Active: "bg-green-100 text-green-700",
          Inactive: "bg-yellow-100 text-yellow-700",
          Suspended: "bg-red-100 text-red-700",
        };
        return (
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${styleMap[value]}`}>
            {value}
          </span>
        );
      },
    },
    // ✅ FIX: Inalis ang unang "action" column at pinanatili ang tamang implementation
    {
      key: "action",
      header: "Action",
      align: "center",
      width: "60px",
      render: (_: any, row: UserEntry) => (
        <ActionDropdown
          onView={() => alert(`Viewing ${row.name}`)}
          // I-update ang onApprove para buksan ang bagong modal
          onApprove={() => handleApproveClick(row)} 
          onRequest={() => alert(`Requesting revision for ${row.name}`)}
        />
      ),
    },
  ];

  return (
    <div className="space-y-4 mt-[-10px] w-full">

      {/* Filters */}
      <div className="max-w-full flex justify-end mb-[-5px]">
        <div className="inline-flex bg-white p-2 pr-5 rounded-full shadow space-x-4">
          <Dropdown buttonContent={`Year: ${year}`} items={yearItems} />
          <Dropdown buttonContent={`Status: ${status}`} items={statusItems} />

          <div className="flex items-center text-sm text-slate-500 font-medium cursor-pointer">
            <BiSolidFilterAlt className="mr-2 text-xl" />
            More Filters
          </div>
        </div>
      </div>

      {/* Add Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add New User
        </button>
      </div>

      {/* Modal for Add New User */}
      <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title="Add New User">
        <AddUserForm close={() => setModalOpen(false)} />
      </Modal>

      {/* User Profile/Confirmation Modal */}
      {selectedUser && ( // Render lang kung may selectedUser
          <UserConfirmationModal
              opened={confirmationModalOpen}
              onClose={() => {
                  setConfirmationModalOpen(false);
                  setSelectedUser(null); // Clear selected user when closing
              }}
              userData={selectedUser}
              onApprove={handleFinalApprove}
              onNotEligible={handleFinalNotEligible}
          />
      )}

      {/* Table */}
      <Table columns={columns as any} data={data} />
    </div>
  );
};

export default UserTable;

