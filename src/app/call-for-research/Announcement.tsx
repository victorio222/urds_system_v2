// "use client";

// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   FormEvent,
//   ChangeEvent,
// } from "react";
// import Modal from "@/component/ui/Modal";
// import StatusFilter from "../announcements/table/StatusFilter";
// import {
//   BiSolidPlusCircle,
//   BiLoaderAlt,
//   BiCalendar,
//   BiDownload,
//   BiShow,
// } from "react-icons/bi";
// import { LuMegaphoneOff } from "react-icons/lu";

// import {
//   getAnnouncements,
//   createAnnouncement,
//   getCampuses,
//   getColleges,
// } from "@/utils/apiHelpers";
// import { useAuth } from "@/context/AuthContext";
// import type {
//   Announcement,
//   TableAnnouncementEntry,
// } from "@/types/announcements";

// import EditAnnouncementModal from "../modal/EditAnnouncementModal";
// import ViewAnnouncementModal from "../modal/ViewAnnouncementModal";

// /* =========================
//    TYPES
// ========================= */
// interface NewAnnouncementData {
//   title: string;
//   content: string;
//   type: string;
//   posted_by: number;
//   start_date: string;
//   end_date: string;
//   campusId: string;
//   collegeId: string;
//   attachment: string;
//   status: "Draft" | "Active";
//   audience: string;
// }

// interface Campus {
//   id: string;
//   name: string;
// }

// interface College {
//   id: string;
//   name: string;
// }

// /* =========================
//    STATUS STYLES
// ========================= */
// const statusStyles: Record<string, string> = {
//   Active: "bg-blue-100 text-blue-700",
//   Draft: "bg-yellow-100 text-yellow-700",
//   Expired: "bg-red-100 text-red-700",
// };

// /* =========================
//    COMPONENT
// ========================= */
// const AnnouncementPage = () => {
//   const { userId, isAuthenticated } = useAuth();
//   const postedById = userId || 0;

//   const [announcements, setAnnouncements] = useState<TableAnnouncementEntry[]>([]);
//   const [filteredAnnouncements, setFilteredAnnouncements] = useState<TableAnnouncementEntry[]>([]);
//   const [statusFilter, setStatusFilter] = useState("");

//   const [campuses, setCampuses] = useState<Campus[]>([]);
//   const [colleges, setColleges] = useState<College[]>([]);

//   const [loading, setLoading] = useState(true);
//   const [dropdownLoading, setDropdownLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [selectedAnnouncement, setSelectedAnnouncement] =
//     useState<TableAnnouncementEntry | null>(null);

//   const [formData, setFormData] = useState<NewAnnouncementData>({
//     title: "",
//     content: "",
//     type: "",
//     posted_by: postedById,
//     start_date: "",
//     end_date: "",
//     campusId: "",
//     collegeId: "",
//     attachment: "",
//     status: "Draft",
//     audience: "",
//   });

//   /* =========================
//      HELPERS
//   ========================= */
//   const formatDate = (date: string) =>
//     new Date(date).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });

//   /* =========================
//      DATA FETCHING
//   ========================= */
//   const fetchAnnouncements = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await getAnnouncements();
//       const data: Announcement[] = res.data || [];

//       const mapped = data
//         .sort(
//           (a, b) =>
//             new Date(b.created_at).getTime() -
//             new Date(a.created_at).getTime()
//         )
//         .map((a, index) => ({
//           ...a,
//           id: a.announcement_id,
//           sequential_id: index + 1,
//         }));

//       setAnnouncements(mapped);
//       setFilteredAnnouncements(mapped);
//     } catch {
//       setError("Failed to load announcements.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const fetchDropdowns = useCallback(async () => {
//     try {
//       setDropdownLoading(true);
//       const [campusRes, collegeRes] = await Promise.all([
//         getCampuses(),
//         getColleges(),
//       ]);

//       setCampuses(
//         campusRes.data.map((c: any) => ({
//           id: c.campus_id.toString(),
//           name: c.campus_name,
//         }))
//       );

//       setColleges(
//         collegeRes.data.map((c: any) => ({
//           id: c.college_id.toString(),
//           name: c.college_name,
//         }))
//       );
//     } finally {
//       setDropdownLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchAnnouncements();
//       fetchDropdowns();
//     }
//   }, [isAuthenticated, fetchAnnouncements, fetchDropdowns]);

//   useEffect(() => {
//     if (!statusFilter) {
//       setFilteredAnnouncements(announcements);
//     } else {
//       setFilteredAnnouncements(
//         announcements.filter((a) => a.status === statusFilter)
//       );
//     }
//   }, [statusFilter, announcements]);

//   /* =========================
//      CREATE ANNOUNCEMENT
//   ========================= */
//   const handleCreateAnnouncement = async (e: FormEvent) => {
//     e.preventDefault();

//     const payload: any = {
//       ...formData,
//       posted_by: postedById,
//     };

//     if (formData.campusId || formData.collegeId || formData.audience) {
//       payload.target = {
//         campus_id: formData.campusId || null,
//         college_id: formData.collegeId || null,
//         audience: formData.audience || null,
//       };
//     }

//     await createAnnouncement(payload);
//     setIsModalOpen(false);
//     fetchAnnouncements();
//   };

//   /* =========================
//      UI STATES
//   ========================= */
//   if (!isAuthenticated) {
//     return (
//       <div className="p-4 text-orange-700 bg-orange-50 border rounded-md">
//         Authentication required.
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64 text-blue-600">
//         <BiLoaderAlt size={48} className="animate-spin" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 text-red-700 bg-red-50 border rounded-md">
//         {error}
//       </div>
//     );
//   }

//   /* =========================
//      RENDER
//   ========================= */
//   return (
//     <div className="space-y-4">
//       {/* HEADER ACTIONS */}
//       <div className="flex justify-end gap-3">
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//         >
//           <BiSolidPlusCircle />
//           Create Announcement
//         </button>
//         <StatusFilter onFilterChange={setStatusFilter} />
//       </div>

//       {/* ANNOUNCEMENT CARDS */}
//       {filteredAnnouncements.length === 0 ? (
//         <div className="text-center bg-gray-50 border rounded-md py-20">
//           <LuMegaphoneOff size={48} className="mx-auto text-gray-400 mb-3" />
//           <p className="text-gray-600">No announcements available.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           {filteredAnnouncements.map((a) => (
//             <div
//               key={a.announcement_id}
//               className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
//             >
//               {/* HEADER */}
//               <div className="flex justify-between items-center mb-3">
//                 <div className="flex gap-2 items-center">
//                   <span
//                     className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[a.status]}`}
//                   >
//                     {a.status.toUpperCase()}
//                   </span>
//                   {a.type && (
//                     <span className="text-xs text-gray-500 border px-2 py-0.5 rounded-md">
//                       {a.type}
//                     </span>
//                   )}
//                 </div>

//                 <div className="flex items-center text-sm text-gray-500 gap-1">
//                   <BiCalendar />
//                   {formatDate(a.end_date)}
//                 </div>
//               </div>

//               {/* CONTENT */}
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                 {a.title}
//               </h3>
//               <p className="text-sm text-gray-600 line-clamp-2 mb-4">
//                 {a.content}
//               </p>

//               {/* ACTIONS */}
//               <div className="flex justify-between items-center">
//                 <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
//                   <BiDownload />
//                   Guidelines
//                 </button>

//                 <button
//                   onClick={() => {
//                     setSelectedAnnouncement(a);
//                     setIsViewModalOpen(true);
//                   }}
//                   className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700"
//                 >
//                   View Announcement →
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* MODALS */}
//       <Modal
//         opened={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title="Create New Announcement"
//       >
//         <form onSubmit={handleCreateAnnouncement}>
//           <div className="space-y-3">
//             <div>
//               <label
//                 htmlFor="title"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Title
//               </label>
//               <input
//                 id="title"
//                 type="text"
//                 placeholder="Announcement Title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="description"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Description
//               </label>
//               <textarea
//                 id="description"
//                 placeholder="Enter announcement details..."
//                 rows={4}
//                 value={formData.content}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
//               ></textarea>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//               <div>
//                 <label
//                   htmlFor="validFrom"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Valid From
//                 </label>
//                 <input
//                   id="validFrom"
//                   type="date"
//                   value={formData.start_date}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="validUntil"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Valid Until / Deadline
//                 </label>
//                 <input
//                   id="validUntil"
//                   type="date"
//                   value={formData.end_date}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="statusSelect"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Status
//                 </label>
//                 <select
//                   id="statusSelect"
//                   value={formData.status}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
//                 >
//                   <option value="Draft">Draft</option>
//                   <option value="Active">Active</option>
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="purpose"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Purpose
//               </label>
//               <select
//                 id="purpose"
//                 value={formData.type}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
//               >
//                 <option value="">Select Announcement Type</option>
//                 <option value="Research">Call for Research Proposal</option>
//                 <option value="Evaluation">In-House Evaluation</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Audience (Optional)
//               </label>
//               <div className="text-sm grid grid-cols-1 sm:grid-cols-3 gap-3">
//                 <select
//                   id="campusId"
//                   value={formData.campusId}
//                   onChange={handleChange}
//                   disabled={dropdownLoading}
//                   className="col-span-1 disabled:bg-gray-100 w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
//                 >
//                   <option value="">Select Campus</option>
//                   {dropdownLoading ? (
//                     <option disabled>Loading...</option>
//                   ) : (
//                     campuses.map((campus) => (
//                       <option key={campus.id} value={campus.id}>
//                         {campus.name}
//                       </option>
//                     ))
//                   )}
//                 </select>

//                 <select
//                   id="collegeId"
//                   value={formData.collegeId}
//                   onChange={handleChange}
//                   disabled={dropdownLoading}
//                   className="col-span-1 disabled:bg-gray-100 w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
//                 >
//                   <option value="">Select College</option>
//                   {dropdownLoading ? (
//                     <option disabled>Loading...</option>
//                   ) : (
//                     colleges.map((college) => (
//                       <option key={college.id} value={college.id}>
//                         {college.name}
//                       </option>
//                     ))
//                   )}
//                 </select>

//                 <input
//                   id="audience"
//                   type="text"
//                   placeholder="Specific Audience (e.g., 'All Faculty')"
//                   value={formData.audience}
//                   onChange={handleChange}
//                   className="col-span-1 w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
//                 />
//               </div>
//             </div>

//             <div className="pt-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Upload Files
//               </label>
//               <p className="text-xs text-gray-500 mb-2">
//                 Select and upload files of your choice
//               </p>
//               <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
//                 <div className="text-2xl text-gray-400 mb-2">📎</div>
//                 <p className="text-sm text-gray-500 mb-1">
//                   Choose a file or drag and drop it here
//                 </p>
//                 <p className="text-xs text-gray-400 mb-4">
//                   JPEG, PDF, and DOCS formats, up to 50MB
//                 </p>
//                 <button
//                   type="button"
//                   className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition duration-150"
//                 >
//                   Browse Files
//                 </button>
//               </div>
//             </div>

//             <div className="pt-2">
//               <button
//                 type="submit"
//                 className="text-sm bg-blue-600 text-white font-normal px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-150 cursor-pointer"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </form>
//       </Modal>

//       {selectedAnnouncement && (
//         <>
//           <EditAnnouncementModal
//             opened={isEditModalOpen}
//             onClose={() => setIsEditModalOpen(false)}
//             announcement={selectedAnnouncement}
//             onUpdateSuccess={fetchAnnouncements}
//           />
//           <ViewAnnouncementModal
//             opened={isViewModalOpen}
//             onClose={() => setIsViewModalOpen(false)}
//             announcement={selectedAnnouncement}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default AnnouncementPage;

