// // "use client";

// // import React, {
// //   useState,
// //   useEffect,
// //   useCallback,
// //   FormEvent,
// //   ChangeEvent,
// // } from "react";
// // import Modal from "@/component/ui/Modal";
// // import Table from "@/component/ui/Table";
// // import StatusFilter from "./StatusFilter";
// // import {
// //   BiSolidPlusCircle,
// //   BiEdit,
// //   BiTrash,
// //   BiLoaderAlt,
// //   BiShow,
// //   BiPhoneOff,
// // } from "react-icons/bi";
// // import {
// //   getAnnouncements,
// //   createAnnouncement,
// //   getCampuses,
// //   getColleges,
// // } from "@/utils/apiHelpers";
// // import { useAuth } from "@/context/AuthContext";
// // import type {
// //   Announcement,
// //   TableAnnouncementEntry,
// // } from "@/types/announcements";
// // import EditAnnouncementModal from "../modal/EditAnnouncement";
// // import ViewAnnouncementModal from "../modal/ViewAnnouncement";
// // import { LuMegaphoneOff } from "react-icons/lu";

// // interface NewAnnouncementData {
// //   title: string;
// //   content: string;
// //   type: string;
// //   posted_by: number;
// //   start_date: string;
// //   end_date: string;
// //   campusId: string;
// //   collegeId: string;
// //   attachment: string;
// //   status: "Draft" | "Active";
// //   audience: string;
// // }

// // interface Campus {
// //   id: string;
// //   name: string;
// // }

// // interface College {
// //   id: string;
// //   name: string;
// // }

// // const AnnouncementPage = () => {
// //   const { userId, isAuthenticated } = useAuth();
// //   const postedById = userId || 0;
// //   const isUserValid = postedById > 0;

// //   const [statusFilter, setStatusFilter] = useState<string>("");
// //   const [filteredAnnouncements, setFilteredAnnouncements] = useState<
// //     TableAnnouncementEntry[]
// //   >([]);
// //   const [announcements, setAnnouncements] = useState<TableAnnouncementEntry[]>(
// //     []
// //   );
// //   const [campuses, setCampuses] = useState<Campus[]>([]);
// //   const [colleges, setColleges] = useState<College[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [dropdownLoading, setDropdownLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [isModalOpen, setIsModalOpen] = useState(false);

// //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// //   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
// //   const [selectedAnnouncement, setSelectedAnnouncement] =
// //     useState<TableAnnouncementEntry | null>(null);

// //   const [formData, setFormData] = useState<NewAnnouncementData>({
// //     title: "",
// //     content: "",
// //     type: "",
// //     posted_by: postedById,
// //     start_date: "",
// //     end_date: "",
// //     campusId: "",
// //     collegeId: "",
// //     attachment: "",
// //     status: "Draft",
// //     audience: "",
// //   });

// //   useEffect(() => {
// //     if (!statusFilter) {
// //       setFilteredAnnouncements(announcements);
// //     } else {
// //       setFilteredAnnouncements(
// //         announcements.filter((a) => a.status === statusFilter)
// //       );
// //     }
// //   }, [announcements, statusFilter]);

// //   useEffect(() => {
// //     if (postedById !== formData.posted_by) {
// //       setFormData((prev) => ({ ...prev, posted_by: postedById }));
// //     }
// //   }, [postedById]);

// //   const formatDate = (dateString: string) => {
// //     const date = new Date(dateString);
// //     if (isNaN(date.getTime())) return "N/A";
// //     return date.toLocaleDateString("en-US", {
// //       year: "numeric",
// //       month: "short",
// //       day: "numeric",
// //     });
// //   };

// //   const fetchAnnouncements = useCallback(async () => {
// //     setLoading(true);
// //     setError(null);
// //     try {
// //       const res = await getAnnouncements();
// //       const fetchedAnnouncements: Announcement[] = res.data || [];
// //       fetchedAnnouncements.sort(
// //         (a, b) =>
// //           new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
// //       );

// //       const mapped: TableAnnouncementEntry[] = fetchedAnnouncements.map(
// //         (announcement, index) => ({
// //           ...announcement,
// //           id: announcement.announcement_id,
// //           sequential_id: index + 1,
// //         })
// //       );
// //       setAnnouncements(mapped);
// //     } catch (err) {
// //       console.error("Failed to fetch announcements:", err);
// //       setError("Failed to load announcements. Check API connection.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   const fetchDropdownData = useCallback(async () => {
// //     setDropdownLoading(true);
// //     try {
// //       const [campusRes, collegeRes] = await Promise.all([
// //         getCampuses(),
// //         getColleges(),
// //       ]);

// //       setCampuses(
// //         (campusRes.data || []).map((c: any) => ({
// //           id: c.campus_id.toString(),
// //           name: c.campus_name,
// //         }))
// //       );

// //       setColleges(
// //         (collegeRes.data || []).map((c: any) => ({
// //           id: c.college_id.toString(),
// //           name: c.college_name,
// //         }))
// //       );
// //     } catch (err) {
// //       console.error("Failed to load dropdown data:", err);
// //     } finally {
// //       setDropdownLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if (isAuthenticated && isUserValid) {
// //       fetchAnnouncements();
// //       fetchDropdownData();
// //     }
// //   }, [isAuthenticated, isUserValid, fetchAnnouncements, fetchDropdownData]);

// //   const handleChange = (
// //     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
// //   ) => {
// //     const { id, value } = e.target;
// //     let key: keyof NewAnnouncementData = id as keyof NewAnnouncementData;
// //     if (id === "description") key = "content";
// //     if (id === "purpose") key = "type";
// //     if (id === "validFrom") key = "start_date";
// //     if (id === "validUntil") key = "end_date";
// //     if (id === "statusSelect") key = "status";
// //     setFormData((prev) => ({ ...prev, [key]: value }));
// //   };

// //   const handleCreateAnnouncement = async (e: FormEvent) => {
// //     e.preventDefault();
// //     if (!isUserValid) {
// //       alert("Authentication error: User ID missing.");
// //       return;
// //     }
// //     if (
// //       !formData.title ||
// //       !formData.content ||
// //       !formData.start_date ||
// //       !formData.end_date
// //     ) {
// //       alert("Please fill in Title, Description, Valid From, and Valid Until.");
// //       return;
// //     }

// //     const baseAnnouncement = {
// //       title: formData.title,
// //       content: formData.content,
// //       type: formData.type,
// //       posted_by: postedById,
// //       start_date: formData.start_date,
// //       end_date: formData.end_date,
// //       attachment: formData.attachment,
// //       status: formData.status,
// //       audience: formData.audience,
// //     };

// //     const target =
// //       formData.campusId || formData.collegeId || formData.audience
// //         ? {
// //             campus_id: formData.campusId
// //               ? parseInt(formData.campusId, 10)
// //               : null,
// //             college_id: formData.collegeId
// //               ? parseInt(formData.collegeId, 10)
// //               : null,
// //             audience: formData.audience || null,
// //           }
// //         : null;

// //     const finalPayload = { ...baseAnnouncement, ...(target && { target }) };

// //     try {
// //       await createAnnouncement(finalPayload);
// //       setIsModalOpen(false);
// //       setFormData({
// //         title: "",
// //         content: "",
// //         type: "",
// //         posted_by: postedById,
// //         start_date: "",
// //         end_date: "",
// //         campusId: "",
// //         collegeId: "",
// //         attachment: "",
// //         status: "Draft",
// //         audience: "",
// //       });
// //       alert("Announcement created successfully!");
// //       fetchAnnouncements();
// //     } catch (err) {
// //       console.error("Error creating announcement:", err);
// //       alert("Failed to create announcement.");
// //     }
// //   };

// //   const columns = [
// //     { key: "sequential_id", header: "#", width: "50px", align: "center" },
// //     { key: "title", header: "Title", width: "220px", align: "left" },
// //     { key: "content", header: "Description", width: "350px", align: "left" },
// //     {
// //       key: "created_at",
// //       header: "Date Created",
// //       align: "center",
// //       render: (value: string) => formatDate(value),
// //     },
// //     {
// //       key: "end_date",
// //       header: "Valid Until",
// //       align: "center",
// //       render: (value: string) => formatDate(value),
// //     },
// //     {
// //       key: "status",
// //       header: "Status",
// //       align: "center",
// //       render: (value: Announcement["status"]) => {
// //         let color = "";
// //         switch (value) {
// //           case "Active":
// //             color = "bg-green-500";
// //             break;
// //           case "Expired":
// //             color = "bg-red-500";
// //             break;
// //           case "Draft":
// //             color = "bg-yellow-500";
// //             break;
// //           default:
// //             color = "bg-gray-400";
// //         }
// //         return (
// //           <div className="flex items-center justify-center gap-2">
// //             <span className={`w-3 h-3 rounded-full ${color}`}></span>
// //             <span>{value}</span>
// //           </div>
// //         );
// //       },
// //     },
// //     {
// //       key: "action",
// //       header: "Action",
// //       align: "center",
// //       render: (_: any, row: TableAnnouncementEntry) => (
// //         <div className="flex gap-2 justify-center">
// //           <button
// //             className="bg-yellow-500 hover:bg-yellow-600 text-white p-1 rounded"
// //             onClick={() => {
// //               setSelectedAnnouncement(row);
// //               setIsEditModalOpen(true);
// //             }}
// //           >
// //             <BiEdit size={16} />
// //           </button>
// //           <button
// //             className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded"
// //             onClick={() => {
// //               setSelectedAnnouncement(row);
// //               setIsViewModalOpen(true);
// //             }}
// //           >
// //             <BiShow size={16} />
// //           </button>
// //           <button
// //             className="hidden bg-red-500 hover:bg-red-600 text-white p-1 rounded"
// //             onClick={() => console.log("Deleting:", row.announcement_id)}
// //           >
// //             <BiTrash size={16} />
// //           </button>
// //         </div>
// //       ),
// //     },
// //   ];

// //   if (!isAuthenticated || !isUserValid) {
// //     return (
// //       <div className="text-center text-orange-600 p-4 border border-orange-300 bg-orange-50 rounded-md">
// //         Authentication Required: You must be logged in to create or view
// //         announcements.
// //       </div>
// //     );
// //   }

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64 text-blue-600">
// //         <BiLoaderAlt size={50} className="animate-spin mr-2" />
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="text-center text-red-600 p-4 border border-red-300 bg-red-50 rounded-md">
// //         Error: {error}
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-4">
// //       <nav className="flex justify-end items-center space-x-3">
// //         <div className="bg-white p-2 rounded-full shadow-md inline-flex space-x-2 sm:space-x-4 flex-wrap justify-end">
// //           <button
// //             onClick={() => setIsModalOpen(true)}
// //             type="button"
// //             className="text-sm flex items-center px-2 py-1.5 sm:px-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
// //           >
// //             <span className="pr-1 text-xl">
// //               <BiSolidPlusCircle />
// //             </span>
// //             <span className="hidden sm:inline">Create Announcement</span>
// //             <span className="sm:hidden">Create</span>
// //           </button>

// //           <StatusFilter onFilterChange={setStatusFilter} />
// //         </div>
// //       </nav>

// //       <div className="overflow-x-auto bg-white shadow-md rounded-lg">
// //         {filteredAnnouncements.length === 0 ? (
// //           <div className="text-center text-gray-600 p-4 py-30 border border-gray-300 bg-gray-50 rounded-md">
// //             <div className="mb-3 flex justify-center items-center">
// //               <div className="bg-gray-300 text-white rounded-full p-3">
// //                 <LuMegaphoneOff size={50} />
// //               </div>
// //             </div>
// //             <p>No announcements available.</p>
// //           </div>
// //         ) : (
// //           <Table<TableAnnouncementEntry>
// //             columns={columns as any}
// //             data={filteredAnnouncements}
// //           />
// //         )}
// //       </div>

// //       <Modal
// //         opened={isModalOpen}
// //         onClose={() => setIsModalOpen(false)}
// //         title="Create New Announcement"
// //       >
// //         <form onSubmit={handleCreateAnnouncement}>
// //           <div className="space-y-3">
// //             <div>
// //               <label
// //                 htmlFor="title"
// //                 className="block text-sm font-medium text-gray-700"
// //               >
// //                 Title
// //               </label>
// //               <input
// //                 id="title"
// //                 type="text"
// //                 placeholder="Announcement Title"
// //                 value={formData.title}
// //                 onChange={handleChange}
// //                 className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
// //               />
// //             </div>

// //             <div>
// //               <label
// //                 htmlFor="description"
// //                 className="block text-sm font-medium text-gray-700"
// //               >
// //                 Description
// //               </label>
// //               <textarea
// //                 id="description"
// //                 placeholder="Enter announcement details..."
// //                 rows={4}
// //                 value={formData.content}
// //                 onChange={handleChange}
// //                 className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
// //               ></textarea>
// //             </div>

// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
// //               <div>
// //                 <label
// //                   htmlFor="validFrom"
// //                   className="block text-sm font-medium text-gray-700"
// //                 >
// //                   Valid From
// //                 </label>
// //                 <input
// //                   id="validFrom"
// //                   type="date"
// //                   value={formData.start_date}
// //                   onChange={handleChange}
// //                   className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
// //                 />
// //               </div>

// //               <div>
// //                 <label
// //                   htmlFor="validUntil"
// //                   className="block text-sm font-medium text-gray-700"
// //                 >
// //                   Valid Until / Deadline
// //                 </label>
// //                 <input
// //                   id="validUntil"
// //                   type="date"
// //                   value={formData.end_date}
// //                   onChange={handleChange}
// //                   className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
// //                 />
// //               </div>

// //               <div>
// //                 <label
// //                   htmlFor="statusSelect"
// //                   className="block text-sm font-medium text-gray-700"
// //                 >
// //                   Status
// //                 </label>
// //                 <select
// //                   id="statusSelect"
// //                   value={formData.status}
// //                   onChange={handleChange}
// //                   className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
// //                 >
// //                   <option value="Draft">Draft</option>
// //                   <option value="Active">Active</option>
// //                 </select>
// //               </div>
// //             </div>

// //             <div>
// //               <label
// //                 htmlFor="purpose"
// //                 className="block text-sm font-medium text-gray-700"
// //               >
// //                 Purpose
// //               </label>
// //               <select
// //                 id="purpose"
// //                 value={formData.type}
// //                 onChange={handleChange}
// //                 className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
// //               >
// //                 <option value="">Select Announcement Type</option>
// //                 <option value="Research">Call for Research Proposal</option>
// //                 <option value="Evaluation">In-House Evaluation</option>
// //               </select>
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Audience (Optional)
// //               </label>
// //               <div className="text-sm grid grid-cols-1 sm:grid-cols-3 gap-3">
// //                 <select
// //                   id="campusId"
// //                   value={formData.campusId}
// //                   onChange={handleChange}
// //                   disabled={dropdownLoading}
// //                   className="col-span-1 disabled:bg-gray-100 w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
// //                 >
// //                   <option value="">Select Campus</option>
// //                   {dropdownLoading ? (
// //                     <option disabled>Loading...</option>
// //                   ) : (
// //                     campuses.map((campus) => (
// //                       <option key={campus.id} value={campus.id}>
// //                         {campus.name}
// //                       </option>
// //                     ))
// //                   )}
// //                 </select>

// //                 <select
// //                   id="collegeId"
// //                   value={formData.collegeId}
// //                   onChange={handleChange}
// //                   disabled={dropdownLoading}
// //                   className="col-span-1 disabled:bg-gray-100 w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
// //                 >
// //                   <option value="">Select College</option>
// //                   {dropdownLoading ? (
// //                     <option disabled>Loading...</option>
// //                   ) : (
// //                     colleges.map((college) => (
// //                       <option key={college.id} value={college.id}>
// //                         {college.name}
// //                       </option>
// //                     ))
// //                   )}
// //                 </select>

// //                 <input
// //                   id="audience"
// //                   type="text"
// //                   placeholder="Specific Audience (e.g., 'All Faculty')"
// //                   value={formData.audience}
// //                   onChange={handleChange}
// //                   className="col-span-1 w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
// //                 />
// //               </div>
// //             </div>

// //             <div className="pt-2">
// //               <label className="block text-sm font-medium text-gray-700">
// //                 Upload Files
// //               </label>
// //               <p className="text-xs text-gray-500 mb-2">
// //                 Select and upload files of your choice
// //               </p>
// //               <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
// //                 <div className="text-2xl text-gray-400 mb-2">📎</div>
// //                 <p className="text-sm text-gray-500 mb-1">
// //                   Choose a file or drag and drop it here
// //                 </p>
// //                 <p className="text-xs text-gray-400 mb-4">
// //                   JPEG, PDF, and DOCS formats, up to 50MB
// //                 </p>
// //                 <button
// //                   type="button"
// //                   className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition duration-150"
// //                 >
// //                   Browse Files
// //                 </button>
// //               </div>
// //             </div>

// //             <div className="pt-2">
// //               <button
// //                 type="submit"
// //                 className="text-sm bg-blue-600 text-white font-normal px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-150 cursor-pointer"
// //               >
// //                 Save Changes
// //               </button>
// //             </div>
// //           </div>
// //         </form>
// //       </Modal>

// //       {selectedAnnouncement && (
// //         <>
// //           <EditAnnouncementModal
// //             opened={isEditModalOpen}
// //             onClose={() => setIsEditModalOpen(false)}
// //             announcement={selectedAnnouncement}
// //             onUpdateSuccess={fetchAnnouncements}
// //           />
// //           <ViewAnnouncementModal
// //             opened={isViewModalOpen}
// //             onClose={() => setIsViewModalOpen(false)}
// //             announcement={selectedAnnouncement}
// //           />
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default AnnouncementPage;

// "use client";

// import React, { useState, useEffect, useMemo, useRef, FormEvent, ChangeEvent, useCallback } from "react";
// import {
//   BiSearch,
//   BiFilterAlt,
//   BiDotsVerticalRounded,
//   BiX,
//   BiPlus,
//   BiShow,
//   BiEditAlt,
//   BiTrash,
//   BiBell,
//   BiChevronLeft,
//   BiChevronRight,
// } from "react-icons/bi";
// import {
//   getAnnouncements,
//   createAnnouncement,
//   updateAnnouncement,
//   deleteAnnouncement,
//   getCampuses,
//   getColleges,
// } from "@/utils/apiHelpers";

// interface Announcement {
//   id: number;
//   title: string;
//   content: string;
//   type: string; // Research / Evaluation / Notice
//   posted_by: string;
//   start_date: string;
//   end_date: string;
//   audience?: string;
//   status: "Active" | "Draft" | "Expired";
//   campusId?: string;
//   collegeId?: string;
//   attachment?: string;
// }

// const AnnouncementPage = () => {
//   // States
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingItem, setEditingItem] = useState<Announcement | null>(null);
//   const [data, setData] = useState<Announcement[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [campuses, setCampuses] = useState<{id:string,name:string}[]>([]);
//   const [colleges, setColleges] = useState<{id:string,name:string}[]>([]);
//   const filterRef = useRef<HTMLDivElement>(null);

//   // Form data
//   const [formData, setFormData] = useState<Partial<Announcement>>({});

//   // Fetch announcements
//   const fetchAnnouncements = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await getAnnouncements();
//       const fetched: Announcement[] = (res.data || []).map((a: any) => ({
//         id: a.announcement_id,
//         title: a.title,
//         content: a.content,
//         type: a.type,
//         posted_by: a.posted_by_name || "Admin",
//         start_date: a.start_date,
//         end_date: a.end_date,
//         audience: a.audience,
//         status: a.status,
//         campusId: a.campus_id?.toString(),
//         collegeId: a.college_id?.toString(),
//         attachment: a.attachment,
//       }));
//       setData(fetched);
//     } catch (err) {
//       console.error("Failed to fetch announcements:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Fetch campuses & colleges
//   const fetchDropdowns = useCallback(async () => {
//     try {
//       const [campusRes, collegeRes] = await Promise.all([getCampuses(), getColleges()]);
//       setCampuses((campusRes.data || []).map((c:any)=>({id:c.campus_id.toString(), name:c.campus_name})));
//       setColleges((collegeRes.data || []).map((c:any)=>({id:c.college_id.toString(), name:c.college_name})));
//     } catch (err) {
//       console.error("Failed to fetch dropdowns:", err);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAnnouncements();
//     fetchDropdowns();
//   }, [fetchAnnouncements, fetchDropdowns]);

//   // Filtering logic
//   const filteredData = useMemo(() => {
//     return data.filter((item) => {
//       const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesStatus = filterStatus === "All" || item.status === filterStatus;
//       return matchesSearch && matchesStatus;
//     });
//   }, [data, searchQuery, filterStatus]);

//   const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);

//   useEffect(() => {
//     const handleClick = (e: MouseEvent) => {
//       if (filterRef.current && !filterRef.current.contains(e.target as Node)) setOpenDropdownId(null);
//     };
//     document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, []);

//   const formatDate = (date: string) => new Date(date).toLocaleDateString("en-US");

//   // Form handlers
//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { id, value } = e.target;
//     setFormData(prev => ({ ...prev, [id]: value }));
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       if (editingItem) {
//         await updateAnnouncement(editingItem.id, formData);
//         alert("Announcement updated successfully!");
//       } else {
//         await createAnnouncement(formData);
//         alert("Announcement created successfully!");
//       }
//       setIsModalOpen(false);
//       setFormData({});
//       fetchAnnouncements();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save announcement.");
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this announcement?")) return;
//     try {
//       await deleteAnnouncement(id);
//       alert("Announcement deleted successfully!");
//       fetchAnnouncements();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete announcement.");
//     }
//   };

//   return (
//     <div className="bg-[#F4F7FE] min-h-screen p-4 md:p-7 font-sans text-slate-700">
//       <div className="max-w-7xl mx-auto space-y-1">
//         {/* Header */}
//         <div className="flex justify-between items-center bg-white p-4 shadow-sm border border-gray-100">
//           <div>
//             <h1 className="text-xl font-black text-slate-800 tracking-tight">System Announcements</h1>
//             <p className="text-xs text-slate-400 font-medium">Manage research and evaluation updates</p>
//           </div>
//           <button
//             onClick={() => { setEditingItem(null); setFormData({}); setIsModalOpen(true); }}
//             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-100 transition-all active:scale-95"
//           >
//             <BiPlus size={20} />
//             Post New
//           </button>
//         </div>

//         <div className="bg-white shadow-sm">
//           {/* Filters & Search */}
//           <div className="flex justify-between items-center gap-4 p-4 shadow-sm border border-gray-100">
//             <div className="flex gap-6">
//               {["All", "Active", "Draft", "Expired"].map(tab => (
//                 <button
//                   key={tab}
//                   onClick={() => setFilterStatus(tab)}
//                   className={`pb-2 text-sm font-bold transition-all border-b-2 ${
//                     filterStatus === tab ? "text-indigo-600 border-blue-600" : "text-slate-400 border-transparent"
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>

//             <div className="flex items-center gap-2">
//               <div className="relative hidden sm:block">
//                 <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                 <input
//                   type="text"
//                   placeholder="Search title..."
//                   className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-full text-xs focus:ring-2 focus:ring-blue-500 w-48 transition-all"
//                   value={searchQuery}
//                   onChange={e => setSearchQuery(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto border border-gray-100 px-2">
//             <table className="w-full min-w-[800px]">
//               <thead>
//                 <tr className="text-[10px] uppercase font-black text-slate-400 border-b border-gray-50">
//                   <th className="py-4 px-2 text-left">Title</th>
//                   <th className="py-4 px-2 text-left">Type</th>
//                   <th className="py-4 px-2 text-left">Posted By</th>
//                   <th className="py-4 px-2 text-left">Start</th>
//                   <th className="py-4 px-2 text-left">End</th>
//                   <th className="py-4 px-2 text-left">Audience</th>
//                   <th className="py-4 px-2 text-center">Status</th>
//                   <th className="py-4 px-2 text-center w-16">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-50">
//                 {paginatedData.map(item => (
//                   <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
//                     <td className="py-4 px-2 font-bold text-slate-700 text-sm">{item.title}</td>
//                     <td className="py-4 px-2 text-sm">{item.type}</td>
//                     <td className="py-4 px-2 text-sm">{item.posted_by}</td>
//                     <td className="py-4 px-2 text-xs">{formatDate(item.start_date)}</td>
//                     <td className="py-4 px-2 text-xs">{formatDate(item.end_date)}</td>
//                     <td className="py-4 px-2 text-xs">{item.audience}</td>
//                     <td className="py-4 px-2 text-center">
//                       <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
//                         item.status === 'Active' ? 'bg-green-100 text-green-600' :
//                         item.status === 'Draft' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'
//                       }`}>
//                         {item.status}
//                       </span>
//                     </td>
//                     <td className="py-4 px-2 text-center relative">
//                       <button
//                         onClick={() => setOpenDropdownId(openDropdownId === item.id ? null : item.id)}
//                         className={`p-1.5 rounded-lg border transition-all ${openDropdownId === item.id ? "bg-blue-50 border-blue-200 text-blue-600" : "border-transparent text-slate-500 hover:bg-white"}`}
//                       >
//                         <BiDotsVerticalRounded size={20} />
//                       </button>

//                       {openDropdownId === item.id && (
//                         <>
//                           <div className="fixed inset-0 z-[40]" onClick={() => setOpenDropdownId(null)} />
//                           <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 z-[50] py-2">
//                             <button
//                               onClick={() => { setEditingItem(item); setFormData(item); setIsModalOpen(true); setOpenDropdownId(null); }}
//                               className="w-full px-4 py-2 text-left text-xs font-bold text-slate-600 hover:bg-blue-50 flex items-center gap-2"
//                             >
//                               <BiShow className="text-indigo-500" size={16} /> View / Edit
//                             </button>
//                             <div className="border-t border-gray-50 mt-1 pt-1">
//                               <button onClick={() => handleDelete(item.id)} className="w-full px-4 py-2 text-left text-xs font-bold text-red-500 hover:bg-red-50 flex items-center gap-2">
//                                 <BiTrash size={16} /> Delete
//                               </button>
//                             </div>
//                           </div>
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-between items-center p-4">
//             <span className="text-xs font-bold text-slate-400">Total {filteredData.length} records</span>
//             <div className="flex items-center gap-1">
//               <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-2 text-slate-400 disabled:opacity-20"><BiChevronLeft size={20}/></button>
//               {[...Array(totalPages)].map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentPage(i+1)}
//                   className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${currentPage === i+1 ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:bg-slate-50"}`}
//                 >
//                   {i+1}
//                 </button>
//               ))}
//               <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-2 text-slate-400 disabled:opacity-20"><BiChevronRight size={20}/></button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
//           <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
//                 <BiBell className="text-blue-500" /> {editingItem ? 'Edit Announcement' : 'Post Announcement'}
//               </h3>
//               <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><BiX size={24} /></button>
//             </div>

//             {/* Form */}
//             <form className="space-y-3" onSubmit={handleSubmit}>
//               <div>
//                 <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
//                 <input id="title" type="text" value={formData.title || ""} onChange={handleChange} className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg" />
//               </div>
//               <div>
//                 <label htmlFor="content" className="block text-sm font-medium text-gray-700">Description</label>
//                 <textarea id="content" rows={4} value={formData.content || ""} onChange={handleChange} className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg"></textarea>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                 <div>
//                   <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Valid From</label>
//                   <input id="start_date" type="date" value={formData.start_date || ""} onChange={handleChange} className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg" />
//                 </div>
//                 <div>
//                   <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">Valid Until</label>
//                   <input id="end_date" type="date" value={formData.end_date || ""} onChange={handleChange} className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg" />
//                 </div>
//                 <div>
//                   <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
//                   <select id="status" value={formData.status || "Draft"} onChange={handleChange} className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg">
//                     <option value="Draft">Draft</option>
//                     <option value="Active">Active</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="pt-2 flex justify-end">
//                 <button type="submit" className="text-sm bg-blue-600 text-white font-normal px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-150 cursor-pointer">
//                   Save
//                 </button>
//               </div>
//             </form>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AnnouncementPage;

// "use client";

// import React, {
//   useState,
//   useEffect,
//   useMemo,
//   useRef,
//   FormEvent,
//   ChangeEvent,
//   useCallback,
// } from "react";
// import {
//   BiSearch,
//   BiFilterAlt,
//   BiDotsVerticalRounded,
//   BiX,
//   BiPlus,
//   BiShow,
//   BiEditAlt,
//   BiTrash,
//   BiBell,
//   BiChevronLeft,
//   BiChevronRight,
// } from "react-icons/bi";
// import { LuMegaphoneOff } from "react-icons/lu";

// import Modal from "@/component/ui/Modal";
// import EditAnnouncementModal from "../modal/EditAnnouncement";
// import ViewAnnouncementModal from "../modal/ViewAnnouncement";

// import { getAnnouncements, createAnnouncement } from "@/utils/apiHelpers";

// interface Announcement {
//   announcement_id: number;
//   title: string;
//   content: string;
//   type: string;
//   posted_by: number;
//   start_date: string;
//   end_date: string;
//   campusId?: string;
//   collegeId?: string;
//   audience?: string;
//   status: "Draft" | "Active" | "Expired";
//   created_at: string;
//   updatedAt: string;
//   attachment?: string;
// }

// const AnnouncementPage = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

//   const [data, setData] = useState<Announcement[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [editingItem, setEditingItem] = useState<Announcement | null>(null);
//   const [viewingItem, setViewingItem] = useState<Announcement | null>(null);

//   const filterRef = useRef<HTMLDivElement>(null);

//   // Fetch announcements from API
//   const fetchAnnouncements = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await getAnnouncements();
//       const fetched: Announcement[] = res.data || [];
//       // Sort by newest
//       fetched.sort(
//         (a, b) =>
//           new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
//       );
//       setData(fetched);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch announcements.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAnnouncements();
//   }, [fetchAnnouncements]);

//   // Filter & search
//   const filteredData = useMemo(() => {
//     return data.filter((item) => {
//       const matchesSearch = item.title
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase());
//       const matchesStatus =
//         filterStatus === "All" || item.status === filterStatus;
//       return matchesSearch && matchesStatus;
//     });
//   }, [data, searchQuery, filterStatus]);

//   const paginatedData = filteredData.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );
//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);

//   useEffect(() => {
//     const handleClick = (e: MouseEvent) => {
//       if (filterRef.current && !filterRef.current.contains(e.target as Node))
//         setOpenDropdownId(null);
//     };
//     document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, []);

//   const formatDate = (date: string) =>
//     new Date(date).toLocaleDateString("en-US");

//   // Create Announcement Form
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     type: "",
//     start_date: "",
//     end_date: "",
//     audience: "",
//     status: "Draft" as "Draft" | "Active",
//   });

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { id, value } = e.target;
//     let key: keyof typeof formData = id as keyof typeof formData;
//     if (id === "description") key = "content";
//     if (id === "purpose") key = "type";
//     if (id === "validFrom") key = "start_date";
//     if (id === "validUntil") key = "end_date";
//     if (id === "statusSelect") key = "status";
//     setFormData((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleCreateAnnouncement = async (e: FormEvent) => {
//     e.preventDefault();
//     if (
//       !formData.title ||
//       !formData.content ||
//       !formData.start_date ||
//       !formData.end_date
//     ) {
//       alert("Please fill in Title, Description, Start and End dates.");
//       return;
//     }
//     try {
//       await createAnnouncement(formData);
//       setIsCreateModalOpen(false);
//       setFormData({
//         title: "",
//         content: "",
//         type: "",
//         start_date: "",
//         end_date: "",
//         audience: "",
//         status: "Draft",
//       });
//       fetchAnnouncements();
//       alert("Announcement created successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to create announcement.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64 text-blue-600">
//         <BiBell size={50} className="animate-spin mr-2" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-600 p-4 border border-red-300 bg-red-50 rounded-md">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#F4F7FE] min-h-screen p-4 md:p-7 font-sans text-slate-700">
//       <div className="max-w-7xl mx-auto space-y-1">
//         {/* Header */}
//         <div className="flex justify-between items-center bg-white p-4 shadow-sm border border-gray-100">
//           <div>
//             <h1 className="text-xl font-black text-slate-800 tracking-tight">
//               System Announcements
//             </h1>
//             <p className="text-xs text-slate-400 font-medium">
//               Manage research and evaluation updates
//             </p>
//           </div>
//           <button
//             onClick={() => {
//               setEditingItem(null);
//               setIsCreateModalOpen(true);
//             }}
//             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-100 transition-all active:scale-95"
//           >
//             <BiPlus size={20} /> Post New
//           </button>
//         </div>

//         <div className="bg-white shadow-sm">
//           {/* Filters & Search */}
//           <div className="flex justify-between items-center gap-4 p-4 shadow-sm border border-gray-100">
//             <div className="flex gap-6">
//               {["All", "Active", "Draft", "Expired"].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setFilterStatus(tab)}
//                   className={`pb-2 text-sm font-bold transition-all border-b-2 ${
//                     filterStatus === tab
//                       ? "text-indigo-600 border-blue-600"
//                       : "text-slate-400 border-transparent"
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>

//             <div className="flex items-center gap-2">
//               <div className="relative hidden sm:block">
//                 <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                 <input
//                   type="text"
//                   placeholder="Search title..."
//                   className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-full text-xs focus:ring-2 focus:ring-blue-500 w-48 transition-all"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto border border-gray-100 px-2">
//             <table className="w-full min-w-[800px]">
//               <thead>
//                 <tr className="text-[10px] uppercase font-black text-slate-400 border-b border-gray-50">
//                   <th className="py-4 px-2 text-left">Title</th>
//                   <th className="py-4 px-2 text-left">Type</th>
//                   <th className="py-4 px-2 text-left">Posted By</th>
//                   <th className="py-4 px-2 text-left">Start</th>
//                   <th className="py-4 px-2 text-left">End</th>
//                   <th className="py-4 px-2 text-left">Audience</th>
//                   <th className="py-4 px-2 text-center">Status</th>
//                   <th className="py-4 px-2 text-center w-16">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-50">
//                 {paginatedData.map((item) => (
//                   <tr
//                     key={item.announcement_id}
//                     className="group hover:bg-slate-50/50 transition-colors"
//                   >
//                     <td className="py-4 px-2 font-bold text-slate-700 text-sm">
//                       {item.title}
//                     </td>
//                     <td className="py-4 px-2 text-sm">{item.type}</td>
//                     <td className="py-4 px-2 text-sm">{item.posted_by}</td>
//                     <td className="py-4 px-2 text-xs">
//                       {formatDate(item.start_date)}
//                     </td>
//                     <td className="py-4 px-2 text-xs">
//                       {formatDate(item.end_date)}
//                     </td>
//                     <td className="py-4 px-2 text-xs">{item.audience}</td>
//                     <td className="py-4 px-2 text-center">
//                       <span
//                         className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
//                           item.status === "Active"
//                             ? "bg-green-100 text-green-600"
//                             : item.status === "Draft"
//                             ? "bg-amber-100 text-amber-600"
//                             : "bg-red-100 text-red-600"
//                         }`}
//                       >
//                         {item.status}
//                       </span>
//                     </td>
//                     <td className="py-4 px-2 text-center relative">
//                       <button
//                         onClick={() =>
//                           setOpenDropdownId(
//                             openDropdownId === item.announcement_id
//                               ? null
//                               : item.announcement_id
//                           )
//                         }
//                         className={`p-1.5 rounded-lg border transition-all ${
//                           openDropdownId === item.announcement_id
//                             ? "bg-blue-50 border-blue-200 text-blue-600"
//                             : "border-transparent text-slate-500 hover:bg-white"
//                         }`}
//                       >
//                         <BiDotsVerticalRounded size={20} />
//                       </button>

//                       {openDropdownId === item.announcement_id && (
//                         <>
//                           <div
//                             className="fixed inset-0 z-[40]"
//                             onClick={() => setOpenDropdownId(null)}
//                           />
//                           <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 z-[50] py-2">
//                             <button
//                               onClick={() => {
//                                 setViewingItem(item);
//                                 setOpenDropdownId(null);
//                               }}
//                               className="w-full px-4 py-2 text-left text-xs font-bold text-slate-600 hover:bg-blue-50 flex items-center gap-2"
//                             >
//                               <BiShow className="text-indigo-500" size={16} />{" "}
//                               View
//                             </button>
//                             <button
//                               onClick={() => {
//                                 setEditingItem(item);
//                                 setIsCreateModalOpen(true);
//                                 setOpenDropdownId(null);
//                               }}
//                               className="w-full px-4 py-2 text-left text-xs font-bold text-slate-600 hover:bg-blue-50 flex items-center gap-2"
//                             >
//                               <BiEditAlt className="text-amber-500" size={16} />{" "}
//                               Edit
//                             </button>
//                             <div className="border-t border-gray-50 mt-1 pt-1">
//                               <button className="w-full px-4 py-2 text-left text-xs font-bold text-red-500 hover:bg-red-50 flex items-center gap-2">
//                                 <BiTrash size={16} /> Delete
//                               </button>
//                             </div>
//                           </div>
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-between items-center p-4">
//             <span className="text-xs font-bold text-slate-400">
//               Total {filteredData.length} records
//             </span>
//             <div className="flex items-center gap-1">
//               <button
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage((p) => p - 1)}
//                 className="p-2 text-slate-400 disabled:opacity-20"
//               >
//                 <BiChevronLeft size={20} />
//               </button>
//               {[...Array(totalPages)].map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${
//                     currentPage === i + 1
//                       ? "bg-blue-600 text-white shadow-lg"
//                       : "text-slate-400 hover:bg-slate-50"
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//               <button
//                 disabled={currentPage === totalPages}
//                 onClick={() => setCurrentPage((p) => p + 1)}
//                 className="p-2 text-slate-400 disabled:opacity-20"
//               >
//                 <BiChevronRight size={20} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Create/Edit Modal */}
//       {isCreateModalOpen && (
//         <Modal
//           opened={isCreateModalOpen}
//           onClose={() => setIsCreateModalOpen(false)}
//           title={editingItem ? "Edit Announcement" : "Create New Announcement"}
//         >
//           <form onSubmit={handleCreateAnnouncement}>
//             <div className="space-y-3">
//               {/* Title */}
//               <div>
//                 <label
//                   htmlFor="title"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Title
//                 </label>
//                 <input
//                   id="title"
//                   type="text"
//                   placeholder="Announcement Title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
//                 />
//               </div>

//               {/* Description */}
//               <div>
//                 <label
//                   htmlFor="description"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Description
//                 </label>
//                 <textarea
//                   id="description"
//                   placeholder="Enter announcement details..."
//                   rows={4}
//                   value={formData.content}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
//                 ></textarea>
//               </div>

//               {/* Dates & Status */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                 <div>
//                   <label
//                     htmlFor="validFrom"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Valid From
//                   </label>
//                   <input
//                     id="validFrom"
//                     type="date"
//                     value={formData.start_date}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="validUntil"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Valid Until / Deadline
//                   </label>
//                   <input
//                     id="validUntil"
//                     type="date"
//                     value={formData.end_date}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="statusSelect"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Status
//                   </label>
//                   <select
//                     id="statusSelect"
//                     value={formData.status}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
//                   >
//                     <option value="Draft">Draft</option>
//                     <option value="Active">Active</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Purpose */}
//               <div>
//                 <label
//                   htmlFor="purpose"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Purpose
//                 </label>
//                 <select
//                   id="purpose"
//                   value={formData.type}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
//                 >
//                   <option value="">Select Announcement Type</option>
//                   <option value="Research">Call for Research Proposal</option>
//                   <option value="Evaluation">In-House Evaluation</option>
//                 </select>
//               </div>

//               {/* Audience */}
//               <div>
//                 <label
//                   htmlFor="audience"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Audience (Optional)
//                 </label>
//                 <input
//                   id="audience"
//                   type="text"
//                   placeholder="Specific Audience (e.g., 'All Faculty')"
//                   value={formData.audience}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
//                 />
//               </div>

//               {/* Submit Button */}
//               <div className="flex justify-end mt-4">
//                 <button
//                   type="submit"
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-100 transition-all active:scale-95"
//                 >
//                   {editingItem ? "Update Announcement" : "Post Announcement"}
//                 </button>
//               </div>
//             </div>
//           </form>
//         </Modal>
//       )}

//       {/* View Announcement Modal */}
//       {/* View Announcement Modal */}
//       {viewingItem && (
//         <ViewAnnouncementModal
//           opened={viewingItem !== null}
//           onClose={() => setViewingItem(null)}
//           announcement={viewingItem}
//         />
//       )}

//       {/* Edit Announcement Modal */}
//       {editingItem && (
//         <EditAnnouncementModal
//           opened={editingItem !== null}
//           onClose={() => setEditingItem(null)}
//           announcement={editingItem}
//           onUpdateSuccess={fetchAnnouncements}
//         />
//       )}
//     </div>
//   );
// };

// export default AnnouncementPage;

"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  FormEvent,
  ChangeEvent,
  useCallback,
} from "react";
import {
  BiSearch,
  BiDotsVerticalRounded,
  BiPlus,
  BiShow,
  BiEditAlt,
  BiTrash,
  BiBell,
  BiChevronLeft,
  BiChevronRight,
  BiSolidPlusCircle,
} from "react-icons/bi";

import Modal from "@/component/ui/Modal";
import EditAnnouncementModal from "../modal/EditAnnouncement";
import ViewAnnouncementModal from "../modal/ViewAnnouncement";

import { getAnnouncements, createAnnouncement } from "@/utils/apiHelpers";
import { Spinner } from "@/component/base/Spinner";

interface Announcement {
  announcement_id: number;
  title: string;
  content: string;
  type: string;
  posted_by: number;
  start_date: string;
  end_date: string;
  campusId?: string;
  collegeId?: string;
  audience?: string;
  status: "Draft" | "Active" | "Expired";
  created_at: string;
  updatedAt: string;
  attachment?: string;
}

const AnnouncementPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const [data, setData] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Separate states for different modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Announcement | null>(null);
  const [viewingItem, setViewingItem] = useState<Announcement | null>(null);

  const filterRef = useRef<HTMLDivElement>(null);

  const fetchAnnouncements = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAnnouncements();
      const fetched: Announcement[] = res.data || [];
      fetched.sort(
        (a, b) =>
          new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
      );
      setData(fetched);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch announcements.");
    } finally {
      // Small timeout ensures the spinner is visible and smooth
      setTimeout(() => setLoading(false), 500);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "All" || item.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchQuery, filterStatus]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node))
        setOpenDropdownId(null);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "",
    start_date: "",
    end_date: "",
    audience: "",
    status: "Draft" as "Draft" | "Active",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    let key: keyof typeof formData = id as keyof typeof formData;
    if (id === "description") key = "content";
    if (id === "purpose") key = "type";
    if (id === "validFrom") key = "start_date";
    if (id === "validUntil") key = "end_date";
    if (id === "statusSelect") key = "status";
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreateAnnouncement = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.content ||
      !formData.start_date ||
      !formData.end_date
    ) {
      alert("Please fill in Title, Description, Start and End dates.");
      return;
    }
    try {
      await createAnnouncement(formData);
      setIsCreateModalOpen(false);
      setFormData({
        title: "",
        content: "",
        type: "",
        start_date: "",
        end_date: "",
        audience: "",
        status: "Draft",
      });
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
      alert("Failed to create announcement.");
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#F4F7FE]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4 border border-red-300 bg-red-50 rounded-md m-10">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-[#F4F7FE] min-h-screen p-4 md:p-7 font-sans text-slate-700">
      <div className="max-w-7xl mx-auto space-y-1">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-4 shadow-sm border border-gray-100 gap-2">
          <div className="min-w-0">
            {" "}
            {/* min-w-0 prevents text overflow in flex containers */}
            <h1 className="text-lg md:text-xl font-black text-slate-800 tracking-tight truncate">
              System Announcements
            </h1>
            <p className="text-[10px] md:text-xs text-slate-400 font-medium truncate">
              Manage research and evaluation updates
            </p>
          </div>

          <button
            onClick={() => {
              setEditingItem(null);
              setIsCreateModalOpen(true);
            }}
            className="flex items-center justify-center gap-1 md:gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl font-bold text-sm shadow-lg shadow-blue-100 transition-all active:scale-95 shrink-0"
          >
            <BiSolidPlusCircle size={20} />
            {/* On mobile, show only "Post". On larger screens, show "Post New" */}
            <span>
              Post<span className="hidden sm:inline"> New</span>
            </span>
          </button>
        </div>

        <div className="bg-white shadow-sm">
          {/* Filters & Search */}
          <div className="flex justify-between items-center gap-4 p-4 shadow-sm border border-gray-100">
            <div className="flex gap-6">
              {["All", "Active", "Draft", "Expired"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterStatus(tab)}
                  className={`pb-2 text-sm font-bold transition-all border-b-2 ${
                    filterStatus === tab
                      ? "text-indigo-600 border-blue-600"
                      : "text-slate-400 border-transparent"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative hidden sm:block">
                <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search title..."
                  className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-full text-xs focus:ring-2 focus:ring-blue-500 w-48 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-gray-100 px-2">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="text-[10px] uppercase font-black text-slate-400 border-b border-gray-50">
                  <th className="py-4 px-2 text-left">Title</th>
                  <th className="py-4 px-2 text-left">Type</th>
                  <th className="py-4 px-2 text-left">Posted By</th>
                  <th className="py-4 px-2 text-left">Start</th>
                  <th className="py-4 px-2 text-left">End</th>
                  <th className="py-4 px-2 text-left">Audience</th>
                  <th className="py-4 px-2 text-center">Status</th>
                  <th className="py-4 px-2 text-center w-16">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedData.map((item) => (
                  <tr
                    key={item.announcement_id}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-2 font-bold text-slate-700 text-sm">
                      {item.title}
                    </td>
                    <td className="py-4 px-2 text-sm">{item.type}</td>
                    <td className="py-4 px-2 text-sm">{item.posted_by}</td>
                    <td className="py-4 px-2 text-xs">
                      {formatDate(item.start_date)}
                    </td>
                    <td className="py-4 px-2 text-xs">
                      {formatDate(item.end_date)}
                    </td>
                    <td className="py-4 px-2 text-xs">{item.audience}</td>
                    <td className="py-4 px-2 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                          item.status === "Active"
                            ? "bg-green-100 text-green-600"
                            : item.status === "Draft"
                            ? "bg-amber-100 text-amber-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-center relative">
                      <button
                        onClick={() =>
                          setOpenDropdownId(
                            openDropdownId === item.announcement_id
                              ? null
                              : item.announcement_id
                          )
                        }
                        className={`p-1.5 rounded-lg border transition-all ${
                          openDropdownId === item.announcement_id
                            ? "bg-blue-50 border-blue-200 text-blue-600"
                            : "border-transparent text-slate-500 hover:bg-white"
                        }`}
                      >
                        <BiDotsVerticalRounded size={20} />
                      </button>

                      {openDropdownId === item.announcement_id && (
                        <>
                          <div
                            className="fixed inset-0 z-[40]"
                            onClick={() => setOpenDropdownId(null)}
                          />
                          <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 z-[50] py-2">
                            <button
                              onClick={() => {
                                setViewingItem(item);
                                setOpenDropdownId(null);
                              }}
                              className="w-full px-4 py-2 text-left text-xs font-bold text-slate-600 hover:bg-blue-50 flex items-center gap-2"
                            >
                              <BiShow className="text-indigo-500" size={16} />{" "}
                              View
                            </button>
                            <button
                              onClick={() => {
                                setEditingItem(item);
                                setIsCreateModalOpen(false); // Ensure Create modal is closed
                                setOpenDropdownId(null);
                              }}
                              className="w-full px-4 py-2 text-left text-xs font-bold text-slate-600 hover:bg-blue-50 flex items-center gap-2"
                            >
                              <BiEditAlt className="text-amber-500" size={16} />{" "}
                              Edit
                            </button>
                            <div className="border-t border-gray-50 mt-1 pt-1">
                              <button className="w-full px-4 py-2 text-left text-xs font-bold text-red-500 hover:bg-red-50 flex items-center gap-2">
                                <BiTrash size={16} /> Delete
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center p-4">
            <span className="text-xs font-bold text-slate-400">
              Total {filteredData.length} records
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="p-2 text-slate-400 disabled:opacity-20"
              >
                <BiChevronLeft size={20} />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-400 hover:bg-slate-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="p-2 text-slate-400 disabled:opacity-20"
              >
                <BiChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CREATE MODAL ONLY */}
      {isCreateModalOpen && !editingItem && (
        <Modal
          opened={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create New Announcement"
        >
          <form onSubmit={handleCreateAnnouncement}>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
                  placeholder="Announcement Title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
                  placeholder="Enter announcement details..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Valid From
                  </label>
                  <input
                    id="validFrom"
                    type="date"
                    value={formData.start_date}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg outline-none"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Valid Until
                  </label>
                  <input
                    id="validUntil"
                    type="date"
                    value={formData.end_date}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg outline-none"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    id="statusSelect"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg outline-none"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Active">Active</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Purpose
                </label>
                <select
                  id="purpose"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg outline-none"
                >
                  <option value="">Select Announcement Type</option>
                  <option value="Research">Call for Research Proposal</option>
                  <option value="Evaluation">In-House Evaluation</option>
                </select>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-blue-700 active:scale-95 transition-all"
                >
                  Post Announcement
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}

      {/* VIEW MODAL */}
      {viewingItem && (
        <ViewAnnouncementModal
          opened={!!viewingItem}
          onClose={() => setViewingItem(null)}
          announcement={viewingItem}
        />
      )}

      {/* EDIT MODAL */}
      {editingItem && (
        <EditAnnouncementModal
          opened={!!editingItem}
          onClose={() => setEditingItem(null)}
          announcement={editingItem}
          onUpdateSuccess={() => {
            setEditingItem(null);
            fetchAnnouncements();
          }}
        />
      )}
    </div>
  );
};

export default AnnouncementPage;
