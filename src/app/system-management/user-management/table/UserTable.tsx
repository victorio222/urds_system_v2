// // "use client";

// // import React, { useState, useEffect } from "react";
// // import Table from "@/component/ui/Table";
// // import { BiSolidPlusCircle, BiSolidFilterAlt } from "react-icons/bi";
// // import ActionDropdown from "../action/ActionDropdown";
// // import Dropdown, { DropdownItem } from "@/component/ui/Dropdown";
// // import Modal from "@/component/ui/Modal";

// // import {
// //   getUsers,
// //   createUser,
// //   getRoles,
// //   getCampuses,
// //   getColleges,
// // } from "@/utils/apiHelpers";

// // import { useAuth } from "@/context/AuthContext";
// // import { Spinner } from "@/component/base/Spinner";

// // // --- Type Definitions ---
// // interface UserEntry {
// //   user_id: number;
// //   first_name: string;
// //   last_name: string;
// //   email: string;
// //   phone_number: string | null;
// //   status: "Approved" | "Pending" | "Suspended";
// //   role_id: number;
// //   campus_id: number;
// //   college_id: number;
// // }

// // interface TableUserEntry extends UserEntry {
// //   id: number;
// //   display_id: number;
// // }

// // type NewUserPayload = {
// //   first_name: string;
// //   last_name: string;
// //   middle_name: string;
// //   suffix_name: string;
// //   email: string;
// //   role: string;
// //   campus: string;
// //   college: string;
// //   password: string;
// // };

// // type LookupMap = Record<number, string>;

// // type TableDataKey = Exclude<keyof UserEntry, "user_id"> | "id" | "display_id";
// // type ControlKey = "checkbox" | "action";
// // type ColumnKey = TableDataKey | ControlKey;

// // interface TableColumnDefinition {
// //   key: ColumnKey;
// //   header: React.ReactNode;
// //   align?: "left" | "center" | "right";
// //   width?: string;
// //   render?: (value: any, row: TableUserEntry) => React.ReactNode;
// // }
// // type TableColumnList = TableColumnDefinition[];

// // // ---------------------
// // // Add User Form
// // // ---------------------
// // interface AddUserFormProps {
// //   close: () => void;
// //   onAdd: (newUserData: NewUserPayload) => Promise<void>;
// //   loading: boolean;
// //   error: string | null;
// // }

// // const AddUserForm = ({ close, onAdd, loading, error }: AddUserFormProps) => {
// //   const [first_name, setFirstName] = useState("");
// //   const [last_name, setLastName] = useState("");
// //   const [middle_name, setMiddleName] = useState("");
// //   const [suffix_name, setSuffix] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [role, setRole] = useState("Administrator");
// //   const [password, setPassword] = useState("");
// //   const [campus, setCampus] = useState("Main");
// //   const [college, setCollege] = useState("IT");

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     await onAdd({
// //       first_name,
// //       last_name,
// //       middle_name,
// //       suffix_name,
// //       email,
// //       role,
// //       campus,
// //       college,
// //       password,
// //     });
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="space-y-4 mt-2">
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <div>
// //           <label className="block text-sm text-black font-medium mb-1">
// //             First Name
// //           </label>
// //           <input
// //             type="text"
// //             className="w-full border px-3 py-2 rounded text-gray-600"
// //             value={first_name}
// //             onChange={(e) => setFirstName(e.target.value)}
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label className="block text-sm text-black font-medium mb-1">
// //             Last Name
// //           </label>
// //           <input
// //             type="text"
// //             className="w-full border px-3 py-2 rounded text-gray-600"
// //             value={last_name}
// //             onChange={(e) => setLastName(e.target.value)}
// //             required
// //           />
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <div>
// //           <label className="block text-sm text-black font-medium mb-1">
// //             Middle Name
// //           </label>
// //           <input
// //             type="text"
// //             className="w-full border px-3 py-2 rounded text-gray-600"
// //             value={middle_name}
// //             onChange={(e) => setMiddleName(e.target.value)}
// //           />
// //         </div>
// //         <div>
// //           <label className="block text-sm text-black font-medium mb-1">
// //             Suffix Name
// //           </label>
// //           <input
// //             type="text"
// //             className="w-full border px-3 py-2 rounded text-gray-600"
// //             value={suffix_name}
// //             onChange={(e) => setSuffix(e.target.value)}
// //           />
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <div>
// //           <label className="block text-sm text-black font-medium mb-1">
// //             Email Address
// //           </label>
// //           <input
// //             type="email"
// //             className="w-full border px-3 py-2 rounded text-gray-600"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label className="block text-sm text-black font-medium mb-1">
// //             Role/Position
// //           </label>
// //           <select
// //             className="w-full border px-3 py-2 rounded text-gray-600"
// //             value={role}
// //             onChange={(e) => setRole(e.target.value)}
// //           >
// //             <option>Administrator</option>
// //             <option>Faculty</option>
// //             <option>Staff</option>
// //             <option>Student</option>
// //             <option>Evaluator</option>
// //           </select>
// //         </div>
// //       </div>

// //       <div>
// //         <label className="block text-sm text-black font-medium mb-1">
// //           Password
// //         </label>
// //         <input
// //           type="password"
// //           className="w-full border px-3 py-2 rounded text-gray-600"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           required
// //         />
// //       </div>

// //       {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

// //       <div className="flex justify-end gap-3 pt-2">
// //         <button
// //           type="button"
// //           onClick={close}
// //           className="px-4 py-2 border rounded-lg hover:bg-gray-100"
// //           disabled={loading}
// //         >
// //           Cancel
// //         </button>
// //         <button
// //           type="submit"
// //           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
// //           disabled={loading}
// //         >
// //           {loading ? "Saving..." : "Save Changes"}
// //         </button>
// //       </div>
// //     </form>
// //   );
// // };

// // // ---------------------
// // // User Table
// // // ---------------------
// // interface UserTableProps {
// //   data: TableUserEntry[];
// //   setModalOpen: (open: boolean) => void;
// //   rolesMap: LookupMap;
// //   campusesMap: LookupMap;
// //   collegesMap: LookupMap;
// // }

// // const UserTable = ({
// //   data,
// //   setModalOpen,
// //   rolesMap,
// //   campusesMap,
// //   collegesMap,
// // }: UserTableProps) => {
// //   const [statusFilter, setStatusFilter] = useState("All Users");
// //   const [selectedRows, setSelectedRows] = useState<number[]>([]);
// //   const [selectAll, setSelectAll] = useState(false);

// //   const toggleRow = (id: number) =>
// //     setSelectedRows((prev) =>
// //       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
// //     );

// //   const toggleSelectAll = () => {
// //     setSelectedRows(selectAll ? [] : data.map((item) => item.id));
// //     setSelectAll(!selectAll);
// //   };

// //   const statusItems: DropdownItem[] = [
// //     { label: "All Users", onClick: () => setStatusFilter("All Users") },
// //   ];

// //   const columns: TableColumnList = [
// //     {
// //       key: "checkbox",
// //       header: (
// //         <input
// //           type="checkbox"
// //           checked={selectAll}
// //           onChange={toggleSelectAll}
// //           className="w-4 h-4 cursor-pointer"
// //         />
// //       ),
// //       align: "center",
// //       width: "40px",
// //       render: (_: any, row: TableUserEntry) => (
// //         <input
// //           type="checkbox"
// //           checked={selectedRows.includes(row.id)}
// //           onChange={() => toggleRow(row.id)}
// //           className="w-4 h-4 cursor-pointer"
// //         />
// //       ),
// //     },
// //     { key: "display_id", header: "ID", align: "center", width: "50px" },
// //     {
// //       key: "first_name",
// //       header: "Name of User",
// //       align: "left",
// //       width: "minmax(150px, 2fr)",
// //       render: (_: any, row: TableUserEntry) =>
// //         `${row.first_name} ${row.last_name}`,
// //     },
// //     { key: "email", header: "Email", align: "left", width: "minmax(150px, 2fr)" },
// //     {
// //       key: "role_id",
// //       header: "Role",
// //       align: "center",
// //       width: "120px",
// //       render: (role_id: number) => rolesMap[role_id] || "N/A",
// //     },
// //     {
// //       key: "campus_id",
// //       header: "Campus",
// //       align: "center",
// //       width: "100px",
// //       render: (campus_id: number) => campusesMap[campus_id] || "N/A",
// //     },
// //     {
// //       key: "college_id",
// //       header: "College",
// //       align: "center",
// //       width: "100px",
// //       render: (college_id: number) => collegesMap[college_id] || "N/A",
// //     },
// //     {
// //       key: "status",
// //       header: "Status",
// //       align: "center",
// //       width: "120px",
// //       render: (value: TableUserEntry["status"]) => {
// //         const styleMap = {
// //           Approved: "bg-green-100 text-green-700",
// //           Pending: "bg-yellow-100 text-yellow-700",
// //           Suspended: "bg-red-100 text-red-700",
// //         };
// //         return (
// //           <span
// //             className={`px-3 py-1 rounded-full text-sm font-medium ${styleMap[value]}`}
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
// //       render: (_: any, row: TableUserEntry) => (
// //         <ActionDropdown
// //           onView={() => alert(`Viewing ${row.first_name}`)}
// //           onApprove={() => alert(`Editing ${row.first_name}`)}
// //           onRequest={() => alert(`Deleting ${row.first_name}`)}
// //         />
// //       ),
// //     },
// //   ];

// //   return (
// //     <div className="space-y-4 mt-[-10px] w-full">
// //       <div className="max-w-full flex justify-end mb-[-5px]">
// //         <div className="inline-flex flex-wrap justify-end gap-2 sm:gap-4 bg-white p-2 pr-5 rounded-full shadow">
// //           <button
// //             onClick={() => setModalOpen(true)}
// //             className="flex items-center justify-center px-4 py-2 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 order-1 md:order-none w-full sm:w-auto"
// //           >
// //             <span className="pr-1 text-lg"><BiSolidPlusCircle /></span>
// //             Add New User
// //           </button>

// //           <Dropdown buttonContent={`Status: ${statusFilter}`} items={statusItems} />
// //           <div className="flex items-center text-sm text-slate-500 font-medium cursor-pointer">
// //             <BiSolidFilterAlt className="mr-2 text-xl" />
// //             More Filters
// //           </div>
// //         </div>
// //       </div>

// //       <div className="overflow-x-auto">
// //         <Table columns={columns as any} data={data} />
// //       </div>
// //     </div>
// //   );
// // };

// // // ---------------------
// // // Parent Page Component
// // // ---------------------
// // const UserManagementPage = () => {
// //   const [users, setUsers] = useState<TableUserEntry[]>([]);
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const [fetchStatus, setFetchStatus] = useState<
// //     "idle" | "loading" | "success" | "error"
// //   >("idle");

// //   const [rolesMap, setRolesMap] = useState<LookupMap>({});
// //   const [campusesMap, setCampusesMap] = useState<LookupMap>({});
// //   const [collegesMap, setCollegesMap] = useState<LookupMap>({});

// //   const arrayToMap = (data: any[], idKey: string, nameKey: string): LookupMap => {
// //     if (!Array.isArray(data)) return {};
// //     return data.reduce((map, item) => {
// //       if (item && item[idKey] !== undefined && item[nameKey] !== undefined) {
// //         map[item[idKey]] = item[nameKey];
// //       }
// //       return map;
// //     }, {} as LookupMap);
// //   };

// //   const fetchLookups = async () => {
// //     try {
// //       const [rolesRes, campusesRes, collegesRes] = await Promise.all([
// //         getRoles(),
// //         getCampuses(),
// //         getColleges(),
// //       ]);

// //       setRolesMap(arrayToMap(rolesRes.data, "role_id", "role_name"));
// //       setCampusesMap(arrayToMap(campusesRes.data, "campus_id", "campus_name"));
// //       setCollegesMap(arrayToMap(collegesRes.data, "college_id", "college_name"));
// //     } catch (err) {
// //       console.error("Failed to fetch lookup data:", err);
// //     }
// //   };

// //   const fetchUsers = async () => {
// //     setFetchStatus("loading");

// //     await fetchLookups();

// //     try {
// //       const response: any = await getUsers();
// //       let usersArray = response.data.users || response.data || [];
// //       if (!Array.isArray(usersArray)) usersArray = [];

// //       const mappedUsers: TableUserEntry[] = usersArray.map(
// //         (user: UserEntry, index: number) => ({
// //           ...user,
// //           id: user.user_id,
// //           display_id: index + 1,
// //         })
// //       );

// //       setUsers(mappedUsers);
// //       setFetchStatus("success");
// //     } catch (err: any) {
// //       console.error("Failed to fetch users:", err);
// //       setError(err.message || "Failed to connect to the user API.");
// //       setFetchStatus("error");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);

// //   const handleAddUser = async (newUserData: NewUserPayload) => {
// //     setLoading(true);
// //     setError(null);

// //     try {
// //       const response: any = await createUser(newUserData);

// //       const newUserFromApi: TableUserEntry = {
// //         user_id: response.data.user_id,
// //         id: response.data.user_id,
// //         display_id: users.length + 1,
// //         first_name: response.data.first_name || newUserData.first_name,
// //         last_name: response.data.last_name || newUserData.last_name,
// //         email: response.data.email,
// //         phone_number: response.data.phone_number || null,
// //         role_id: response.data.role_id,
// //         campus_id: response.data.campus_id,
// //         college_id: response.data.college_id,
// //         status: response.data.status || "Approved",
// //       };

// //       setUsers((prev) => [...prev, newUserFromApi]);
// //       setModalOpen(false);
// //     } catch (err: any) {
// //       setError(err.message || "Failed to create user due to a server error.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (fetchStatus === "loading") {
// //     return (
// //       <div className="mt-[-10rem] text-center text-xl text-blue-600">
// //         <Spinner />
// //       </div>
// //     );
// //   }

// //   if (fetchStatus === "error") {
// //     return (
// //       <div className="p-8 text-center text-red-600 text-xl">
// //         Error loading users: {error || "Failed to connect to the user API."}
// //         <button
// //           onClick={fetchUsers}
// //           className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
// //         >
// //           Try Reloading Data
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="pt-4 sm:p-0 md:pt-4">
// //       <UserTable
// //         data={users}
// //         setModalOpen={setModalOpen}
// //         rolesMap={rolesMap}
// //         campusesMap={campusesMap}
// //         collegesMap={collegesMap}
// //       />

// //       <Modal
// //         opened={modalOpen}
// //         onClose={() => setModalOpen(false)}
// //         title="Add New User"
// //       >
// //         <AddUserForm
// //           close={() => setModalOpen(false)}
// //           onAdd={handleAddUser}
// //           loading={loading}
// //           error={error}
// //         />
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default UserManagementPage;











// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import { BiSearch, BiSolidPlusCircle } from "react-icons/bi";
// import { ChevronLeft, ChevronRight, ChevronDown, Filter, UserPlus } from "lucide-react";
// import { Spinner } from "@/component/base/Spinner";
// import Modal from "@/component/ui/Modal";
// import ActionDropdown from "../action/ActionDropdown";
// import {
//   getUsers,
//   createUser,
//   getRoles,
//   getCampuses,
//   getColleges,
// } from "@/utils/apiHelpers";

// // --- (Keep your Existing Interfaces and Types) ---
// interface UserEntry {
//   user_id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   status: "Approved" | "Pending" | "Suspended";
//   role_id: number;
//   campus_id: number;
//   college_id: number;
// }
// interface TableUserEntry extends UserEntry {
//   id: number;
//   display_id: number;
// }
// type LookupMap = Record<number, string>;

// const UserManagementPage = () => {
//   // State
//   const [users, setUsers] = useState<TableUserEntry[]>([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [roleFilter, setRoleFilter] = useState("All Roles");
//   const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

//   // Lookup States
//   const [rolesMap, setRolesMap] = useState<LookupMap>({});
//   const [campusesMap, setCampusesMap] = useState<LookupMap>({});
//   const [collegesMap, setCollegesMap] = useState<LookupMap>({});

//   // Fetch Logic
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [rolesRes, campusesRes, collegesRes, usersRes] = await Promise.all([
//         getRoles(), getCampuses(), getColleges(), getUsers()
//       ]);

//       const rMap = arrayToMap(rolesRes.data, "role_id", "role_name");
//       setRolesMap(rMap);
//       setCampusesMap(arrayToMap(campusesRes.data, "campus_id", "campus_name"));
//       setCollegesMap(arrayToMap(collegesRes.data, "college_id", "college_name"));

//       const usersArray = usersRes.data.users || usersRes.data || [];
//       setUsers(usersArray.map((u: UserEntry, i: number) => ({ ...u, id: u.user_id, display_id: i + 1 })));
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchData(); }, []);

//   const arrayToMap = (data: any[], idKey: string, nameKey: string): LookupMap => {
//     if (!Array.isArray(data)) return {};
//     return data.reduce((map, item) => {
//       map[item[idKey]] = item[nameKey];
//       return map;
//     }, {} as LookupMap);
//   };

//   // Dynamic Filtering Logic
//   const filteredUsers = useMemo(() => {
//     return users.filter((user) => {
//       const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
//       const matchesSearch = fullName.includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase());
//       const roleName = rolesMap[user.role_id] || "";
//       const matchesRole = roleFilter === "All Roles" || roleName === roleFilter;
//       return matchesSearch && matchesRole;
//     });
//   }, [users, search, roleFilter, rolesMap]);

//   return (
//     <div className="w-full bg-white rounded-sm shadow-sm border border-slate-200 overflow-hidden font-sans">
      
//       {/* 1. HEADER SECTION */}
//       <div className="px-6 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//         <div>
//           <h2 className="text-xl font-semibold text-slate-700 tracking-tight flex items-center gap-2">
//             User Management
//           </h2>
//           <p className="text-sm text-slate-400 mt-0.5">Manage system access and account permissions</p>
//         </div>

//         <div className="flex flex-wrap items-center gap-3">
//           {/* Search */}
//           <div className="relative flex-1 md:flex-none">
//             <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//             <input
//               type="text"
//               placeholder="Search users..."
//               className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all w-full md:w-56"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>

//           {/* Role Filter */}
//           <div className="relative">
//             <button 
//               onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
//               className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
//             >
//               <Filter size={16} className="text-slate-400" />
//               <span className="hidden md:inline">{roleFilter}</span>
//               <ChevronDown size={14} className="text-slate-400" />
//             </button>
//             {isRoleDropdownOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 shadow-xl rounded-lg z-50 py-1">
//                 <button onClick={() => { setRoleFilter("All Roles"); setIsRoleDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50">All Roles</button>
//                 {Object.values(rolesMap).map((name) => (
//                   <button key={name} onClick={() => { setRoleFilter(name); setIsRoleDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50">{name}</button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Add User Button */}
//           <button 
//             onClick={() => setModalOpen(true)}
//             className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm"
//           >
//             <UserPlus size={16} />
//             <span>Add User</span>
//           </button>
//         </div>
//       </div>

//       {/* 2. TABLE SECTION */}
//       <div className="overflow-x-auto min-h-[400px]">
//         {loading ? (
//           <div className="flex justify-center items-center h-64"><Spinner /></div>
//         ) : (
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-y border-slate-100 bg-slate-50/30 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
//                 <th className="px-6 py-4 w-12 text-center">#</th>
//                 <th className="px-6 py-4">Full Name</th>
//                 <th className="px-6 py-4">Role</th>
//                 <th className="px-6 py-4">Campus / College</th>
//                 <th className="px-6 py-4 text-center">Status</th>
//                 <th className="px-6 py-4 text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {filteredUsers.map((user) => (
//                 <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
//                   <td className="px-6 py-4 text-xs text-slate-400 text-center font-medium">
//                     {user.display_id}
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex flex-col">
//                       <span className="text-sm font-bold text-slate-700 leading-none">{user.first_name} {user.last_name}</span>
//                       <span className="text-xs text-slate-400 mt-1">{user.email}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded uppercase">
//                       {rolesMap[user.role_id] || "N/A"}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-xs text-slate-500">
//                       <p className="font-medium text-slate-600">{campusesMap[user.campus_id] || "N/A"}</p>
//                       <p className="opacity-70">{collegesMap[user.college_id] || "N/A"}</p>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-center">
//                     <span className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider
//                       ${user.status === 'Approved' ? 'bg-emerald-50 text-emerald-500 border border-emerald-100' : ''}
//                       ${user.status === 'Pending' ? 'bg-amber-50 text-amber-500 border border-amber-100' : ''}
//                       ${user.status === 'Suspended' ? 'bg-rose-50 text-rose-500 border border-rose-100' : ''}
//                     `}>
//                       {user.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-center">
//                     <ActionDropdown
//                       onView={() => {}}
//                       onApprove={() => {}}
//                       onRequest={() => {}}
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//         {!loading && filteredUsers.length === 0 && (
//           <div className="py-20 text-center text-slate-400 text-sm italic">No users found matching your criteria.</div>
//         )}
//       </div>

//       {/* 3. FOOTER */}
//       <div className="px-6 py-4 flex items-center justify-between border-t border-slate-100 bg-slate-50/20">
//         <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
//           <button className="p-1.5 rounded-md border border-slate-200 disabled:opacity-40" disabled><ChevronLeft size={16} /></button>
//           <span>Page 1 of 1</span>
//           <button className="p-1.5 rounded-md border border-slate-200 disabled:opacity-40" disabled><ChevronRight size={16} /></button>
//         </div>
//         <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-none">Management System Audit Trail Enabled</p>
//       </div>

//       <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title="Add New User">
//         {/* Your AddUserForm component goes here */}
//         <div className="p-4 text-slate-500 text-sm">Form logic preserved...</div>
//       </Modal>
//     </div>
//   );
// };

// export default UserManagementPage;




















"use client";

import React, { useState, useEffect, useMemo } from "react";
import { BiSearch, BiSolidPlusCircle } from "react-icons/bi";
import { ChevronDown, ChevronLeft, ChevronRight, Filter, UserPlus } from "lucide-react";
import { Spinner } from "@/component/base/Spinner";
import Modal from "@/component/ui/Modal";
import ActionDropdown from "../action/ActionDropdown";

import {
  getUsers,
  createUser,
  getRoles,
  getCampuses,
  getColleges,
} from "@/utils/apiHelpers";

// --- Type Definitions ---
interface UserEntry {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  status: "Approved" | "Pending" | "Suspended";
  role_id: number;
  campus_id: number;
  college_id: number;
}

interface TableUserEntry extends UserEntry {
  id: number;
  display_id: number;
}

type NewUserPayload = {
  first_name: string;
  last_name: string;
  middle_name: string;
  suffix_name: string;
  email: string;
  role: string;
  campus: string;
  college: string;
  password: string;
};

type LookupMap = Record<number, string>;

// ---------------------
// Add User Form (Original Logic Preserved)
// ---------------------
interface AddUserFormProps {
  close: () => void;
  onAdd: (newUserData: NewUserPayload) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AddUserForm = ({ close, onAdd, loading, error }: AddUserFormProps) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [suffix_name, setSuffix] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Administrator");
  const [password, setPassword] = useState("");
  const [campus, setCampus] = useState("Main");
  const [college, setCollege] = useState("IT");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAdd({
      first_name,
      last_name,
      middle_name,
      suffix_name,
      email,
      role,
      campus,
      college,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-black font-medium mb-1">First Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded text-gray-600 focus:ring-2 focus:ring-blue-100 outline-none"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm text-black font-medium mb-1">Last Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded text-gray-600 focus:ring-2 focus:ring-blue-100 outline-none"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-black font-medium mb-1">Middle Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded text-gray-600 focus:ring-2 focus:ring-blue-100 outline-none"
            value={middle_name}
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-black font-medium mb-1">Suffix Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded text-gray-600 focus:ring-2 focus:ring-blue-100 outline-none"
            value={suffix_name}
            onChange={(e) => setSuffix(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-black font-medium mb-1">Email Address</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded text-gray-600 focus:ring-2 focus:ring-blue-100 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm text-black font-medium mb-1">Role/Position</label>
          <select
            className="w-full border px-3 py-2 rounded text-gray-600 focus:ring-2 focus:ring-blue-100 outline-none"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
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
        <input
          type="password"
          className="w-full border px-3 py-2 rounded text-gray-600 focus:ring-2 focus:ring-blue-100 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={close}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-bold"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

// ---------------------
// Main Page Component
// ---------------------
const UserManagementPage = () => {
  const [users, setUsers] = useState<TableUserEntry[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchStatus, setFetchStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const [rolesMap, setRolesMap] = useState<LookupMap>({});
  const [campusesMap, setCampusesMap] = useState<LookupMap>({});
  const [collegesMap, setCollegesMap] = useState<LookupMap>({});

  const arrayToMap = (data: any[], idKey: string, nameKey: string): LookupMap => {
    if (!Array.isArray(data)) return {};
    return data.reduce((map, item) => {
      if (item && item[idKey] !== undefined && item[nameKey] !== undefined) {
        map[item[idKey]] = item[nameKey];
      }
      return map;
    }, {} as LookupMap);
  };

  const fetchLookups = async () => {
    try {
      const [rolesRes, campusesRes, collegesRes] = await Promise.all([
        getRoles(),
        getCampuses(),
        getColleges(),
      ]);
      setRolesMap(arrayToMap(rolesRes.data, "role_id", "role_name"));
      setCampusesMap(arrayToMap(campusesRes.data, "campus_id", "campus_name"));
      setCollegesMap(arrayToMap(collegesRes.data, "college_id", "college_name"));
    } catch (err) {
      console.error("Failed to fetch lookup data:", err);
    }
  };

  const fetchUsers = async () => {
    setFetchStatus("loading");
    await fetchLookups();
    try {
      const response: any = await getUsers();
      let usersArray = response.data.users || response.data || [];
      if (!Array.isArray(usersArray)) usersArray = [];

      const mappedUsers: TableUserEntry[] = usersArray.map(
        (user: UserEntry, index: number) => ({
          ...user,
          id: user.user_id,
          display_id: index + 1,
        })
      );
      setUsers(mappedUsers);
      setFetchStatus("success");
    } catch (err: any) {
      setError(err.message || "Failed to connect to the user API.");
      setFetchStatus("error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (newUserData: NewUserPayload) => {
    setLoading(true);
    setError(null);
    try {
      const response: any = await createUser(newUserData);
      const newUserFromApi: TableUserEntry = {
        user_id: response.data.user_id,
        id: response.data.user_id,
        display_id: users.length + 1,
        first_name: response.data.first_name || newUserData.first_name,
        last_name: response.data.last_name || newUserData.last_name,
        email: response.data.email,
        phone_number: response.data.phone_number || null,
        role_id: response.data.role_id,
        campus_id: response.data.campus_id,
        college_id: response.data.college_id,
        status: response.data.status || "Approved",
      };
      setUsers((prev) => [...prev, newUserFromApi]);
      setModalOpen(false);
    } catch (err: any) {
      setError(err.message || "Failed to create user due to a server error.");
    } finally {
      setLoading(false);
    }
  };

  // Filtered Data (Modern Addition)
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
      const matchesSearch = fullName.includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase());
      const roleName = rolesMap[user.role_id] || "";
      const matchesRole = roleFilter === "All Roles" || roleName === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter, rolesMap]);

  if (fetchStatus === "loading") {
    return (
      <div className="flex justify-center items-center h-screen w-full mt-[-10%]">
        <Spinner />
      </div>
    );
  }

  if (fetchStatus === "error") {
    return (
      <div className="p-8 text-center text-red-600">
        <p className="text-lg font-semibold">Error loading users</p>
        <p className="text-sm opacity-70 mb-4">{error}</p>
        <button onClick={fetchUsers} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          Try Reloading Data
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-sm shadow-sm border border-slate-200 overflow-hidden font-sans">
      
      {/* 1. TOP HEADER SECTION */}
      <div className="px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-700 tracking-tight">User Management</h2>
          <p className="text-sm text-slate-400 mt-0.5">Manage system access and roles</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 md:flex-none">
            <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all w-full md:w-56"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Role Filter Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Filter size={16} className="text-slate-400" />
              <span className="hidden md:inline">{roleFilter}</span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>
            
            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 shadow-xl rounded-lg z-50 py-1">
                <button 
                  onClick={() => { setRoleFilter("All Roles"); setIsRoleDropdownOpen(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                >
                  All Roles
                </button>
                {Object.values(rolesMap).map((name) => (
                  <button
                    key={name}
                    onClick={() => { setRoleFilter(name); setIsRoleDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm"
          >
            <UserPlus size={16} />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* 2. TABLE SECTION */}
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-y border-slate-100 bg-slate-50/30 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <th className="px-6 py-4 w-12 text-center">#</th>
              <th className="px-6 py-4">Name of User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Campus / College</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 text-xs text-slate-400 text-center font-medium">
                  {user.display_id}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700">{user.first_name} {user.last_name}</span>
                    <span className="text-xs text-slate-400">{user.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs font-semibold">
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 uppercase tracking-tight">
                    {rolesMap[user.role_id] || "N/A"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs">
                    <p className="font-semibold text-slate-600">{campusesMap[user.campus_id] || "N/A"}</p>
                    <p className="text-slate-400 italic">{collegesMap[user.college_id] || "N/A"}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider
                    ${user.status === 'Approved' ? 'bg-emerald-50 text-emerald-500 border border-emerald-100' : ''}
                    ${user.status === 'Pending' ? 'bg-amber-50 text-amber-500 border border-amber-100' : ''}
                    ${user.status === 'Suspended' ? 'bg-rose-50 text-rose-500 border border-rose-100' : ''}
                  `}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <ActionDropdown
                    onView={() => alert(`Viewing ${user.first_name}`)}
                    onApprove={() => alert(`Editing ${user.first_name}`)}
                    onRequest={() => alert(`Deleting ${user.first_name}`)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="py-20 text-center text-slate-400 text-sm italic">
            No users found matching your search.
          </div>
        )}
      </div>

      {/* 3. FOOTER SECTION */}
      <div className="px-6 py-4 flex items-center justify-between border-t border-slate-100 bg-slate-50/20">
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md border border-slate-200 text-slate-400 hover:bg-white disabled:opacity-40" disabled>
            <ChevronLeft size={16} />
          </button>
          <span className="text-xs font-medium text-slate-500">
            Page <span className="text-slate-800">1</span> of 1
          </span>
          <button className="p-1.5 rounded-md border border-slate-200 text-slate-400 hover:bg-white disabled:opacity-40" disabled>
            <ChevronRight size={16} />
          </button>
        </div>
        <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">
          End of User Records
        </p>
      </div>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New User"
      >
        <AddUserForm
          close={() => setModalOpen(false)}
          onAdd={handleAddUser}
          loading={loading}
          error={error}
        />
      </Modal>
    </div>
  );
};

export default UserManagementPage;