// "use client";

// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   FormEvent,
//   ChangeEvent,
// } from "react";
// import Modal from "@/component/ui/Modal";
// import Table from "@/component/ui/Table";
// import StatusFilter from "./StatusFilter";

// import {
//   BiSolidPlusCircle,
//   BiEdit,
//   BiTrash,
//   BiLoaderAlt,
//   BiShow,
// } from "react-icons/bi";

// import {
//   getAnnouncements,
//   createAnnouncement,
//   getCampuses,
//   getColleges,
// } from "@/utils/apiHelpers";

// import { useAuth } from "@/context/AuthContext";
// import type { Announcement, TableAnnouncementEntry } from "@/types/announcements";

// // --- MODALS ---
// import EditAnnouncementModal from "../modal/EditAnnouncement";
// import ViewAnnouncementModal from "../modal/ViewAnnouncement";

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

// const AnnouncementPage = () => {
//   const { userId, isAuthenticated } = useAuth();
//   const postedById = userId || 0;
//   const isUserValid = postedById > 0;

//   const [statusFilter, setStatusFilter] = useState<string>("");
//   const [filteredAnnouncements, setFilteredAnnouncements] = useState<
//     TableAnnouncementEntry[]
//   >([]);
//   const [announcements, setAnnouncements] = useState<TableAnnouncementEntry[]>(
//     []
//   );

//   const [campuses, setCampuses] = useState<Campus[]>([]);
//   const [colleges, setColleges] = useState<College[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [dropdownLoading, setDropdownLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Edit/View Modals
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [selectedAnnouncement, setSelectedAnnouncement] = useState<
//     TableAnnouncementEntry | null
//   >(null);

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

//   // --- EFFECTS ---
//   useEffect(() => {
//     if (!statusFilter) {
//       setFilteredAnnouncements(announcements);
//     } else {
//       setFilteredAnnouncements(
//         announcements.filter((a) => a.status === statusFilter)
//       );
//     }
//   }, [announcements, statusFilter]);

//   useEffect(() => {
//     if (postedById !== formData.posted_by) {
//       setFormData((prev) => ({ ...prev, posted_by: postedById }));
//     }
//   }, [postedById]);

//   // --- UTILITIES ---
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return "N/A";
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   // --- API FETCH ---
//   const fetchAnnouncements = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await getAnnouncements();
//       const fetchedAnnouncements: Announcement[] = res.data || [];
//       fetchedAnnouncements.sort(
//         (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//       );

//       const mapped: TableAnnouncementEntry[] = fetchedAnnouncements.map(
//         (announcement, index) => ({
//           ...announcement,
//           id: announcement.announcement_id,
//           sequential_id: index + 1,
//         })
//       );
//       setAnnouncements(mapped);
//     } catch (err) {
//       console.error("Failed to fetch announcements:", err);
//       setError("Failed to load announcements. Check API connection.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const fetchDropdownData = useCallback(async () => {
//     setDropdownLoading(true);
//     try {
//       const [campusRes, collegeRes] = await Promise.all([getCampuses(), getColleges()]);

//       setCampuses(
//         (campusRes.data || []).map((c: any) => ({
//           id: c.campus_id.toString(),
//           name: c.campus_name,
//         }))
//       );

//       setColleges(
//         (collegeRes.data || []).map((c: any) => ({
//           id: c.college_id.toString(),
//           name: c.college_name,
//         }))
//       );
//     } catch (err) {
//       console.error("Failed to load dropdown data:", err);
//     } finally {
//       setDropdownLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (isAuthenticated && isUserValid) {
//       fetchAnnouncements();
//       fetchDropdownData();
//     }
//   }, [isAuthenticated, isUserValid, fetchAnnouncements, fetchDropdownData]);

//   // --- FORM HANDLERS ---
//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { id, value } = e.target;
//     let key: keyof NewAnnouncementData = id as keyof NewAnnouncementData;
//     if (id === "description") key = "content";
//     if (id === "purpose") key = "type";
//     if (id === "validFrom") key = "start_date";
//     if (id === "validUntil") key = "end_date";
//     if (id === "statusSelect") key = "status";
//     setFormData((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleCreateAnnouncement = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!isUserValid) {
//       alert("Authentication error: User ID missing.");
//       return;
//     }
//     if (!formData.title || !formData.content || !formData.start_date || !formData.end_date) {
//       alert("Please fill in Title, Description, Valid From, and Valid Until.");
//       return;
//     }

//     const baseAnnouncement = {
//       title: formData.title,
//       content: formData.content,
//       type: formData.type,
//       posted_by: postedById,
//       start_date: formData.start_date,
//       end_date: formData.end_date,
//       attachment: formData.attachment,
//       status: formData.status,
//       audience: formData.audience,
//     };

//     const target =
//       formData.campusId || formData.collegeId || formData.audience
//         ? {
//             campus_id: formData.campusId ? parseInt(formData.campusId, 10) : null,
//             college_id: formData.collegeId ? parseInt(formData.collegeId, 10) : null,
//             audience: formData.audience || null,
//           }
//         : null;

//     const finalPayload = { ...baseAnnouncement, ...(target && { target }) };

//     try {
//       await createAnnouncement(finalPayload);
//       setIsModalOpen(false);
//       setFormData({
//         title: "",
//         content: "",
//         type: "",
//         posted_by: postedById,
//         start_date: "",
//         end_date: "",
//         campusId: "",
//         collegeId: "",
//         attachment: "",
//         status: "Draft",
//         audience: "",
//       });
//       alert("Announcement created successfully!");
//       fetchAnnouncements();
//     } catch (err) {
//       console.error("Error creating announcement:", err);
//       alert("Failed to create announcement.");
//     }
//   };

//   // --- TABLE COLUMNS ---
//   const columns = [
//     { key: "sequential_id", header: "#", width: "50px", align: "center" },
//     { key: "title", header: "Title", width: "220px", align: "left" },
//     { key: "content", header: "Description", width: "350px", align: "left" },
//     { key: "created_at", header: "Date Created", align: "center", render: (value: string) => formatDate(value) },
//     { key: "end_date", header: "Valid Until", align: "center", render: (value: string) => formatDate(value) },
//     {
//       key: "status",
//       header: "Status",
//       align: "center",
//       render: (value: Announcement["status"]) => {
//         let color = "";
//         switch (value) {
//           case "Active": color = "bg-green-500"; break;
//           case "Expired": color = "bg-red-500"; break;
//           case "Draft": color = "bg-yellow-500"; break;
//           default: color = "bg-gray-400";
//         }
//         return (
//           <div className="flex items-center justify-center gap-2">
//             <span className={`w-3 h-3 rounded-full ${color}`}></span>
//             <span>{value}</span>
//           </div>
//         );
//       },
//     },
//     {
//       key: "action",
//       header: "Action",
//       align: "center",
//       render: (_: any, row: TableAnnouncementEntry) => (
//         <div className="flex gap-2 justify-center">
//           <button
//             className="bg-yellow-500 hover:bg-yellow-600 text-white p-1 rounded"
//             onClick={() => { setSelectedAnnouncement(row); setIsEditModalOpen(true); }}
//           >
//             <BiEdit size={16} />
//           </button>
//           <button
//             className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded"
//             onClick={() => { setSelectedAnnouncement(row); setIsViewModalOpen(true); }}
//           >
//             <BiShow size={16} />
//           </button>
//           <button
//             className="hidden bg-red-500 hover:bg-red-600 text-white p-1 rounded"
//             onClick={() => console.log("Deleting:", row.announcement_id)}
//           >
//             <BiTrash size={16} />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   // --- RENDER ---
//   if (!isAuthenticated || !isUserValid) {
//     return (
//       <div className="text-center text-orange-600 p-4 border border-orange-300 bg-orange-50 rounded-md">
//         Authentication Required: You must be logged in to create or view announcements.
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64 text-blue-600">
//         <BiLoaderAlt size={50} className="animate-spin mr-2" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-600 p-4 border border-red-300 bg-red-50 rounded-md">
//         Error: {error}
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {/* Top Nav */}
//       <nav className="flex justify-end items-center space-x-3">
//         <div className="bg-white p-2 rounded-full shadow-md inline-flex space-x-2 sm:space-x-4 flex-wrap justify-end">
//           <button
//             onClick={() => setIsModalOpen(true)}
//             type="button"
//             className="text-sm flex items-center px-2 py-1.5 sm:px-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
//           >
//             <span className="pr-1 text-xl"><BiSolidPlusCircle /></span>
//             <span className="hidden sm:inline">Create Announcement</span>
//             <span className="sm:hidden">Create</span>
//           </button>

//           {/* Status Filter */}
//           <StatusFilter onFilterChange={setStatusFilter} />
//         </div>
//       </nav>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//         <Table<TableAnnouncementEntry>
//           columns={columns as any}
//           data={filteredAnnouncements}
//         />
//       </div>

//       {/* Create Announcement Modal */}
//  <Modal
//         opened={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title="Create New Announcement"
//       >
//         <form onSubmit={handleCreateAnnouncement}>
//           <div className="space-y-3">
//             {/* Title Input */}
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
//                 className="
//                         w-full
//                         px-3
//                         py-2.5
//                         border
//                         text-sm
//                         border-gray-300
//                         rounded-lg
//                         text-gray-500
//                         placeholder-gray-400
//                         focus:outline-none
//                         focus:ring-2
//                         focus:ring-blue-300
//                         focus:border-blue-400
//                         transition
//                         duration-150
//                         ease-in-out
//                       "
//               />
//             </div>

//             {/* Description Textarea (maps to 'content' API field) */}
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
//                 className="
//                         w-full
//                         px-3
//                         py-2.5
//                         border
//                         text-sm
//                         border-gray-300
//                         rounded-lg
//                         text-gray-500
//                         placeholder-gray-400
//                         focus:outline-none
//                         focus:ring-2
//                         focus:ring-blue-300
//                         focus:border-blue-400
//                         transition
//                         duration-150
//                         ease-in-out
//                       "
//               ></textarea>
//             </div>

//             {/* Dates and Status (Responsive Grid - 3 columns) */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//               {/* Start Date Input (New Field) */}
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
//                   className="
//                         w-full
//                         px-3
//                         py-2.5
//                         border
//                         text-sm
//                         border-gray-300
//                         rounded-lg
//                         text-gray-500
//                         placeholder-gray-400
//                         focus:outline-none
//                         focus:ring-2
//                         focus:ring-blue-300
//                         focus:border-blue-400
//                         transition
//                         duration-150
//                         ease-in-out
//                       "
//                 />
//               </div>

//               {/* End Date Input (maps to 'end_date' API field) */}
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
//                   className="
//                         w-full
//                         px-3
//                         py-2.5
//                         border
//                         text-sm
//                         border-gray-300
//                         rounded-lg
//                         text-gray-500
//                         placeholder-gray-400
//                         focus:outline-none
//                         focus:ring-2
//                         focus:ring-blue-300
//                         focus:border-blue-400
//                         transition
//                         duration-150
//                         ease-in-out
//                       "
//                 />
//               </div>

//               {/* Status Dropdown (New Field) */}
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
//                   className="
//                         w-full
//                         px-3
//                         py-2.5
//                         border
//                         text-sm
//                         border-gray-300
//                         rounded-lg
//                         text-gray-500
//                         placeholder-gray-400
//                         focus:outline-none
//                         focus:ring-2
//                         focus:ring-blue-300
//                         focus:border-blue-400
//                         transition
//                         duration-150
//                         ease-in-out
//                       "
//                 >
//                   <option value="Draft">Draft</option>
//                   <option value="Active">Active</option>
//                 </select>
//               </div>
//             </div>

//             {/* Purpose Dropdown (maps to 'type' API field) */}
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
//                 className="
//                         w-full
//                         px-3
//                         py-2.5
//                         border
//                         text-sm
//                         border-gray-300
//                         rounded-lg
//                         text-gray-500
//                         placeholder-gray-400
//                         focus:outline-none
//                         focus:ring-2
//                         focus:ring-blue-300
//                         focus:border-blue-400
//                         transition
//                         duration-150
//                         ease-in-out
//                       "
//               >
//                 <option value="">Select Announcement Type</option>
//                 <option value="Research">Call for Research Proposal</option>
//                 <option value="Evaluation">In-House Evaluation</option>
//               </select>
//             </div>

//             {/* Audience Dropdowns (Responsive Grid) */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Audience (Optional)
//               </label>
//               <div className="text-sm grid grid-cols-1 sm:grid-cols-3 gap-3">
//                 {/* Campus Dropdown */}
//                 <select
//                   id="campusId"
//                   value={formData.campusId}
//                   onChange={handleChange}
//                   disabled={dropdownLoading}
//                   className="
//                                         col-span-1
//                                         disabled:bg-gray-100
//                                         w-full
//                                         px-3
//                                         py-2.5
//                                         border
//                                         text-sm
//                                         border-gray-300
//                                         rounded-lg
//                                         text-gray-500
//                                         placeholder-gray-400
//                                         focus:outline-none
//                                         focus:ring-2
//                                         focus:ring-blue-300
//                                         focus:border-blue-400
//                                         transition
//                                         duration-150
//                                         ease-in-out
//                                       "
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

//                 {/* College Dropdown */}
//                 <select
//                   id="collegeId"
//                   value={formData.collegeId}
//                   onChange={handleChange}
//                   disabled={dropdownLoading}
//                   className="
//                                         col-span-1
//                                         disabled:bg-gray-100
//                                         w-full
//                                         px-3
//                                         py-2.5
//                                         border
//                                         text-sm
//                                         border-gray-300
//                                         rounded-lg
//                                         text-gray-500
//                                         placeholder-gray-400
//                                         focus:outline-none
//                                         focus:ring-2
//                                         focus:ring-blue-300
//                                         focus:border-blue-400
//                                         transition
//                                         duration-150
//                                         ease-in-out
//                                       "
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

//                 {/* Audience Text Input (New Field) */}
//                 <input
//                   id="audience"
//                   type="text"
//                   placeholder="Specific Audience (e.g., 'All Faculty')"
//                   value={formData.audience}
//                   onChange={handleChange}
//                   className="
//                                         col-span-1
//                                         w-full
//                                         px-3
//                                         py-2.5
//                                         border
//                                         text-sm
//                                         border-gray-300
//                                         rounded-lg
//                                         text-gray-500
//                                         placeholder-gray-400
//                                         focus:outline-none
//                                         focus:ring-2
//                                         focus:ring-blue-300
//                                         focus:border-blue-400
//                                         transition
//                                         duration-150
//                                         ease-in-out
//                                     "
//                 />
//               </div>
//             </div>

//             {/* Upload Files Section (Static for now) */}
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

//             {/* Save Changes Button */}
//             <div className="pt-4 flex justify-end">
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

//       {/* Edit & View Modals */}
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

"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  FormEvent,
  ChangeEvent,
} from "react";
import Modal from "@/component/ui/Modal";
import Table from "@/component/ui/Table";
import StatusFilter from "./StatusFilter";
import {
  BiSolidPlusCircle,
  BiEdit,
  BiTrash,
  BiLoaderAlt,
  BiShow,
  BiPhoneOff,
} from "react-icons/bi";
import {
  getAnnouncements,
  createAnnouncement,
  getCampuses,
  getColleges,
} from "@/utils/apiHelpers";
import { useAuth } from "@/context/AuthContext";
import type {
  Announcement,
  TableAnnouncementEntry,
} from "@/types/announcements";
import EditAnnouncementModal from "../modal/EditAnnouncement";
import ViewAnnouncementModal from "../modal/ViewAnnouncement";
import { LuMegaphoneOff } from "react-icons/lu";

interface NewAnnouncementData {
  title: string;
  content: string;
  type: string;
  posted_by: number;
  start_date: string;
  end_date: string;
  campusId: string;
  collegeId: string;
  attachment: string;
  status: "Draft" | "Active";
  audience: string;
}

interface Campus {
  id: string;
  name: string;
}

interface College {
  id: string;
  name: string;
}

const AnnouncementPage = () => {
  const { userId, isAuthenticated } = useAuth();
  const postedById = userId || 0;
  const isUserValid = postedById > 0;

  const [statusFilter, setStatusFilter] = useState<string>("");
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<
    TableAnnouncementEntry[]
  >([]);
  const [announcements, setAnnouncements] = useState<TableAnnouncementEntry[]>(
    []
  );
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [dropdownLoading, setDropdownLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<TableAnnouncementEntry | null>(null);

  const [formData, setFormData] = useState<NewAnnouncementData>({
    title: "",
    content: "",
    type: "",
    posted_by: postedById,
    start_date: "",
    end_date: "",
    campusId: "",
    collegeId: "",
    attachment: "",
    status: "Draft",
    audience: "",
  });

  useEffect(() => {
    if (!statusFilter) {
      setFilteredAnnouncements(announcements);
    } else {
      setFilteredAnnouncements(
        announcements.filter((a) => a.status === statusFilter)
      );
    }
  }, [announcements, statusFilter]);

  useEffect(() => {
    if (postedById !== formData.posted_by) {
      setFormData((prev) => ({ ...prev, posted_by: postedById }));
    }
  }, [postedById]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const fetchAnnouncements = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAnnouncements();
      const fetchedAnnouncements: Announcement[] = res.data || [];
      fetchedAnnouncements.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      const mapped: TableAnnouncementEntry[] = fetchedAnnouncements.map(
        (announcement, index) => ({
          ...announcement,
          id: announcement.announcement_id,
          sequential_id: index + 1,
        })
      );
      setAnnouncements(mapped);
    } catch (err) {
      console.error("Failed to fetch announcements:", err);
      setError("Failed to load announcements. Check API connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDropdownData = useCallback(async () => {
    setDropdownLoading(true);
    try {
      const [campusRes, collegeRes] = await Promise.all([
        getCampuses(),
        getColleges(),
      ]);

      setCampuses(
        (campusRes.data || []).map((c: any) => ({
          id: c.campus_id.toString(),
          name: c.campus_name,
        }))
      );

      setColleges(
        (collegeRes.data || []).map((c: any) => ({
          id: c.college_id.toString(),
          name: c.college_name,
        }))
      );
    } catch (err) {
      console.error("Failed to load dropdown data:", err);
    } finally {
      setDropdownLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && isUserValid) {
      fetchAnnouncements();
      fetchDropdownData();
    }
  }, [isAuthenticated, isUserValid, fetchAnnouncements, fetchDropdownData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    let key: keyof NewAnnouncementData = id as keyof NewAnnouncementData;
    if (id === "description") key = "content";
    if (id === "purpose") key = "type";
    if (id === "validFrom") key = "start_date";
    if (id === "validUntil") key = "end_date";
    if (id === "statusSelect") key = "status";
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreateAnnouncement = async (e: FormEvent) => {
    e.preventDefault();
    if (!isUserValid) {
      alert("Authentication error: User ID missing.");
      return;
    }
    if (
      !formData.title ||
      !formData.content ||
      !formData.start_date ||
      !formData.end_date
    ) {
      alert("Please fill in Title, Description, Valid From, and Valid Until.");
      return;
    }

    const baseAnnouncement = {
      title: formData.title,
      content: formData.content,
      type: formData.type,
      posted_by: postedById,
      start_date: formData.start_date,
      end_date: formData.end_date,
      attachment: formData.attachment,
      status: formData.status,
      audience: formData.audience,
    };

    const target =
      formData.campusId || formData.collegeId || formData.audience
        ? {
            campus_id: formData.campusId
              ? parseInt(formData.campusId, 10)
              : null,
            college_id: formData.collegeId
              ? parseInt(formData.collegeId, 10)
              : null,
            audience: formData.audience || null,
          }
        : null;

    const finalPayload = { ...baseAnnouncement, ...(target && { target }) };

    try {
      await createAnnouncement(finalPayload);
      setIsModalOpen(false);
      setFormData({
        title: "",
        content: "",
        type: "",
        posted_by: postedById,
        start_date: "",
        end_date: "",
        campusId: "",
        collegeId: "",
        attachment: "",
        status: "Draft",
        audience: "",
      });
      alert("Announcement created successfully!");
      fetchAnnouncements();
    } catch (err) {
      console.error("Error creating announcement:", err);
      alert("Failed to create announcement.");
    }
  };

  const columns = [
    { key: "sequential_id", header: "#", width: "50px", align: "center" },
    { key: "title", header: "Title", width: "220px", align: "left" },
    { key: "content", header: "Description", width: "350px", align: "left" },
    {
      key: "created_at",
      header: "Date Created",
      align: "center",
      render: (value: string) => formatDate(value),
    },
    {
      key: "end_date",
      header: "Valid Until",
      align: "center",
      render: (value: string) => formatDate(value),
    },
    {
      key: "status",
      header: "Status",
      align: "center",
      render: (value: Announcement["status"]) => {
        let color = "";
        switch (value) {
          case "Active":
            color = "bg-green-500";
            break;
          case "Expired":
            color = "bg-red-500";
            break;
          case "Draft":
            color = "bg-yellow-500";
            break;
          default:
            color = "bg-gray-400";
        }
        return (
          <div className="flex items-center justify-center gap-2">
            <span className={`w-3 h-3 rounded-full ${color}`}></span>
            <span>{value}</span>
          </div>
        );
      },
    },
    {
      key: "action",
      header: "Action",
      align: "center",
      render: (_: any, row: TableAnnouncementEntry) => (
        <div className="flex gap-2 justify-center">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-1 rounded"
            onClick={() => {
              setSelectedAnnouncement(row);
              setIsEditModalOpen(true);
            }}
          >
            <BiEdit size={16} />
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded"
            onClick={() => {
              setSelectedAnnouncement(row);
              setIsViewModalOpen(true);
            }}
          >
            <BiShow size={16} />
          </button>
          <button
            className="hidden bg-red-500 hover:bg-red-600 text-white p-1 rounded"
            onClick={() => console.log("Deleting:", row.announcement_id)}
          >
            <BiTrash size={16} />
          </button>
        </div>
      ),
    },
  ];

  if (!isAuthenticated || !isUserValid) {
    return (
      <div className="text-center text-orange-600 p-4 border border-orange-300 bg-orange-50 rounded-md">
        Authentication Required: You must be logged in to create or view
        announcements.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-blue-600">
        <BiLoaderAlt size={50} className="animate-spin mr-2" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4 border border-red-300 bg-red-50 rounded-md">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <nav className="flex justify-end items-center space-x-3">
        <div className="bg-white p-2 rounded-full shadow-md inline-flex space-x-2 sm:space-x-4 flex-wrap justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="text-sm flex items-center px-2 py-1.5 sm:px-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
          >
            <span className="pr-1 text-xl">
              <BiSolidPlusCircle />
            </span>
            <span className="hidden sm:inline">Create Announcement</span>
            <span className="sm:hidden">Create</span>
          </button>

          <StatusFilter onFilterChange={setStatusFilter} />
        </div>
      </nav>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        {filteredAnnouncements.length === 0 ? (
          <div className="text-center text-gray-600 p-4 py-30 border border-gray-300 bg-gray-50 rounded-md">
            <div className="mb-3 flex justify-center items-center">
              <div className="bg-gray-300 text-white rounded-full p-3">
                <LuMegaphoneOff size={50} />
              </div>
            </div>
            <p>No announcements available.</p>
          </div>
        ) : (
          <Table<TableAnnouncementEntry>
            columns={columns as any}
            data={filteredAnnouncements}
          />
        )}
      </div>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Announcement"
      >
        <form onSubmit={handleCreateAnnouncement}>
          <div className="space-y-3">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Announcement Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Enter announcement details..."
                rows={4}
                value={formData.content}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label
                  htmlFor="validFrom"
                  className="block text-sm font-medium text-gray-700"
                >
                  Valid From
                </label>
                <input
                  id="validFrom"
                  type="date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
                />
              </div>

              <div>
                <label
                  htmlFor="validUntil"
                  className="block text-sm font-medium text-gray-700"
                >
                  Valid Until / Deadline
                </label>
                <input
                  id="validUntil"
                  type="date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
                />
              </div>

              <div>
                <label
                  htmlFor="statusSelect"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="statusSelect"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
                >
                  <option value="Draft">Draft</option>
                  <option value="Active">Active</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="purpose"
                className="block text-sm font-medium text-gray-700"
              >
                Purpose
              </label>
              <select
                id="purpose"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
              >
                <option value="">Select Announcement Type</option>
                <option value="Research">Call for Research Proposal</option>
                <option value="Evaluation">In-House Evaluation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Audience (Optional)
              </label>
              <div className="text-sm grid grid-cols-1 sm:grid-cols-3 gap-3">
                <select
                  id="campusId"
                  value={formData.campusId}
                  onChange={handleChange}
                  disabled={dropdownLoading}
                  className="col-span-1 disabled:bg-gray-100 w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
                >
                  <option value="">Select Campus</option>
                  {dropdownLoading ? (
                    <option disabled>Loading...</option>
                  ) : (
                    campuses.map((campus) => (
                      <option key={campus.id} value={campus.id}>
                        {campus.name}
                      </option>
                    ))
                  )}
                </select>

                <select
                  id="collegeId"
                  value={formData.collegeId}
                  onChange={handleChange}
                  disabled={dropdownLoading}
                  className="col-span-1 disabled:bg-gray-100 w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
                >
                  <option value="">Select College</option>
                  {dropdownLoading ? (
                    <option disabled>Loading...</option>
                  ) : (
                    colleges.map((college) => (
                      <option key={college.id} value={college.id}>
                        {college.name}
                      </option>
                    ))
                  )}
                </select>

                <input
                  id="audience"
                  type="text"
                  placeholder="Specific Audience (e.g., 'All Faculty')"
                  value={formData.audience}
                  onChange={handleChange}
                  className="col-span-1 w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-sm font-medium text-gray-700">
                Upload Files
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Select and upload files of your choice
              </p>
              <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                <div className="text-2xl text-gray-400 mb-2">📎</div>
                <p className="text-sm text-gray-500 mb-1">
                  Choose a file or drag and drop it here
                </p>
                <p className="text-xs text-gray-400 mb-4">
                  JPEG, PDF, and DOCS formats, up to 50MB
                </p>
                <button
                  type="button"
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition duration-150"
                >
                  Browse Files
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="text-sm bg-blue-600 text-white font-normal px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-150 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </Modal>

      {selectedAnnouncement && (
        <>
          <EditAnnouncementModal
            opened={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            announcement={selectedAnnouncement}
            onUpdateSuccess={fetchAnnouncements}
          />
          <ViewAnnouncementModal
            opened={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            announcement={selectedAnnouncement}
          />
        </>
      )}
    </div>
  );
};

export default AnnouncementPage;
