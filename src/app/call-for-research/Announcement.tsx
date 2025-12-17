// // "use client";

// // import React, { useState, useEffect, useMemo, useCallback } from "react";
// // import {
// //   BiSearch,
// //   BiCalendar,
// //   BiUser,
// //   BiChevronRight,
// //   BiPin,
// //   BiInfoCircle,
// // } from "react-icons/bi";
// // import { getAnnouncements } from "@/utils/apiHelpers";
// // import { Spinner } from "@/component/base/Spinner";
// // import ViewAnnouncementModal from "@/app/announcements/modal/ViewAnnouncement";

// // interface Announcement {
// //   announcement_id: number;
// //   title: string;
// //   content: string;
// //   type: string;
// //   posted_by: number;
// //   start_date: string;
// //   end_date: string;
// //   campusId?: string;
// //   collegeId?: string;
// //   audience?: string;
// //   status: "Draft" | "Active" | "Expired";
// //   created_at: string;
// //   updatedAt: string;
// //   attachment?: string;
// // }

// // const AnnouncementFeed = () => {
// //   const [data, setData] = useState<Announcement[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [viewingItem, setViewingItem] = useState<Announcement | null>(null);

// //   const fetchAnnouncements = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const res = await getAnnouncements();
// //       // Only show Active announcements for a "Viewing" page
// //       const fetched: Announcement[] = (res.data || []).filter(
// //         (a: Announcement) => a.status === "Active"
// //       );
// //       fetched.sort(
// //         (a, b) =>
// //           new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
// //       );
// //       setData(fetched);
// //     } catch (err) {
// //       console.error("Failed to fetch:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchAnnouncements();
// //   }, [fetchAnnouncements]);

// //   const filteredData = useMemo(() => {
// //     return data.filter((item) =>
// //       item.title.toLowerCase().includes(searchQuery.toLowerCase())
// //     );
// //   }, [data, searchQuery]);

// //   const pinnedAnnouncement = filteredData[0];
// //   const recentAnnouncements = filteredData.slice(1);

// //   const formatDate = (date: string) =>
// //     new Date(date).toLocaleDateString("en-US", {
// //       month: "short",
// //       day: "numeric",
// //       year: "numeric",
// //     });

// //   if (loading) {
// //     return (
// //       <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
// //         <Spinner />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans text-slate-800">
// //       <div className="max-w-6xl mx-auto">
// //         {/* Header & Search */}
// //         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
// //           <div>
// //             <h1 className="text-3xl font-black text-slate-900 tracking-tight">
// //               Announcements
// //             </h1>
// //             <p className="text-slate-500 font-medium">
// //               Stay updated with the latest research and campus news
// //             </p>
// //           </div>
// //           <div className="relative group">
// //             <BiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
// //             <input
// //               type="text"
// //               placeholder="Search announcements..."
// //               className="pl-11 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-blue-50 w-full md:w-80 transition-all shadow-sm outline-none"
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //             />
// //           </div>
// //         </div>

// //         {filteredData.length > 0 ? (
// //           <div className="space-y-10">
// //             {/* PINNED SECTION (The Latest One) */}
// //             {pinnedAnnouncement && (
// //               <section>
// //                 <div className="flex items-center gap-2 mb-4 text-blue-600 font-bold text-xs uppercase tracking-widest">
// //                   <BiPin size={18} />
// //                   <span>Latest Update</span>
// //                 </div>
// //                 <div
// //                   onClick={() => setViewingItem(pinnedAnnouncement)}
// //                   className="group relative bg-white border border-blue-100 rounded-3xl p-6 md:p-10 shadow-xl shadow-blue-900/5 cursor-pointer transition-all hover:border-blue-300"
// //                 >
// //                   <div className="flex flex-col md:flex-row gap-8 items-start">
// //                     <div className="flex-1 space-y-4">
// //                       <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase">
// //                         {pinnedAnnouncement.type || "General"}
// //                       </span>
// //                       <h2 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
// //                         {pinnedAnnouncement.title}
// //                       </h2>
// //                       <p className="text-slate-600 leading-relaxed line-clamp-3 md:text-lg">
// //                         {pinnedAnnouncement.content}
// //                       </p>
// //                       <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 pt-4">
// //                         <div className="flex items-center gap-2">
// //                           <BiCalendar className="text-slate-300" size={20} />
// //                           <span>
// //                             {formatDate(pinnedAnnouncement.start_date)}
// //                           </span>
// //                         </div>
// //                         <div className="flex items-center gap-2">
// //                           <BiUser className="text-slate-300" size={20} />
// //                           <span>Admin</span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                     <div className="hidden md:flex h-full items-center">
// //                       <div className="p-4 rounded-full bg-slate-50 group-hover:bg-blue-600 group-hover:text-white transition-all">
// //                         <BiChevronRight size={32} />
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </section>
// //             )}

// //             {/* RECENT GRID */}
// //             <section>
// //               <h3 className="text-xl font-bold text-slate-900 mb-6">
// //                 Previous Announcements
// //               </h3>
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                 {recentAnnouncements.map((item) => (
// //                   <div
// //                     key={item.announcement_id}
// //                     onClick={() => setViewingItem(item)}
// //                     className="group bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
// //                   >
// //                     <div>
// //                       <div className="flex justify-between items-start mb-4">
// //                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
// //                           {item.type || "Update"}
// //                         </span>
// //                         <span className="text-xs text-slate-400 font-medium">
// //                           {formatDate(item.start_date)}
// //                         </span>
// //                       </div>
// //                       <h4 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
// //                         {item.title}
// //                       </h4>
// //                       <p className="text-sm text-slate-500 line-clamp-3 mb-6">
// //                         {item.content}
// //                       </p>
// //                     </div>
// //                     <div className="flex items-center text-blue-600 text-xs font-bold gap-1 group-hover:gap-2 transition-all">
// //                       Read Full Detail <BiChevronRight size={16} />
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </section>
// //           </div>
// //         ) : (
// //           <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
// //             <BiInfoCircle size={48} className="mx-auto text-slate-300 mb-4" />
// //             <h3 className="text-lg font-bold text-slate-800">
// //               No announcements found
// //             </h3>
// //             <p className="text-slate-500">Check back later for new updates.</p>
// //           </div>
// //         )}
// //       </div>

// //       {/* VIEW MODAL */}
// //       {viewingItem && (
// //         <ViewAnnouncementModal
// //           opened={!!viewingItem}
// //           onClose={() => setViewingItem(null)}
// //           announcement={viewingItem}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default AnnouncementFeed;





// "use client";

// import React, { useState } from "react";
// import {
//   BiSearch,
//   BiCalendar,
//   BiUser,
//   BiChevronRight,
//   BiPin,
//   BiInfoCircle,
//   BiFile,
//   BiTimeFive,
// } from "react-icons/bi";
// import ViewAnnouncementModal from "@/app/announcements/modal/ViewAnnouncement";

// // Hardcoded Mock Data
// const MOCK_ANNOUNCEMENTS = [
//   {
//     announcement_id: 1,
//     title: "FY 2025 Call for Research Proposals: Sustainable Innovation",
//     content: "The Office of Research and Development is now accepting research proposals for the 2025 fiscal year. We are prioritizing projects focused on Climate Resilience, Digital Transformation in Education, and Sustainable Agricultural Practices. Interested faculty and staff must submit their initial concept papers through the portal. Please ensure all budgetary requirements follow the updated COA guidelines for research grants.",
//     type: "Research Proposal",
//     posted_by: "Dr. Elena Rodriguez",
//     start_date: "2024-05-20",
//     end_date: "2024-06-30",
//     status: "Active" as const,
//     created_at: "2024-05-15",
//     updatedAt: "2024-05-15",
//     audience: "All Faculty & Researchers",
//     attachment: "proposal_guidelines_2025.pdf"
//   },
//   {
//     announcement_id: 2,
//     title: "Mid-Year In-House Research Evaluation Schedule",
//     content: "Attention all project leaders: The Mid-Year In-House Evaluation of ongoing research projects is scheduled for next month. Each lead researcher is allotted 20 minutes for presentation followed by a 10-minute Q&A with the external panel. Please upload your progress reports and slide decks to the management system at least three days before your assigned slot.",
//     type: "In-House Evaluation",
//     posted_by: "Admin Office",
//     start_date: "2024-07-10",
//     end_date: "2024-07-15",
//     status: "Active" as const,
//     created_at: "2024-05-10",
//     updatedAt: "2024-05-10",
//     audience: "Project Leaders",
//   },
//   {
//     announcement_id: 3,
//     title: "Updated Research Ethics Committee Guidelines",
//     content: "New protocols for human participant research have been approved. All new applications must include the revised Informed Consent Form templates. These changes are in compliance with the National Health Research Ethics Council standards.",
//     type: "Policy Update",
//     posted_by: "Ethics Board",
//     start_date: "2024-05-01",
//     end_date: "2024-12-31",
//     status: "Active" as const,
//     created_at: "2024-04-28",
//     updatedAt: "2024-04-28",
//     audience: "All Researchers",
//   }
// ];

// const AnnouncementFeed = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [viewingItem, setViewingItem] = useState<any | null>(null);

//   const filteredData = MOCK_ANNOUNCEMENTS.filter((item) =>
//     item.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const pinnedAnnouncement = filteredData[0];
//   const recentAnnouncements = filteredData.slice(1);

//   const formatDate = (date: string) =>
//     new Date(date).toLocaleDateString("en-US", {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     });

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans text-slate-800">
//       <div className="max-w-6xl mx-auto">
        
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
//           <div>
//             <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
//               Bulletin Board
//             </h1>
//             <p className="text-slate-500 text-lg font-medium">
//               Research updates and evaluation schedules
//             </p>
//           </div>
//           <div className="relative group w-full md:w-96">
//             <BiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
//             <input
//               type="text"
//               placeholder="Search by title..."
//               className="w-full pl-12 pr-6 py-4 bg-white border-none rounded-2xl text-sm focus:ring-4 focus:ring-blue-100 transition-all shadow-sm outline-none"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </div>

//         {filteredData.length > 0 ? (
//           <div className="space-y-12">
            
//             {/* PINNED: Call for Research Proposal */}
//             {pinnedAnnouncement && (
//               <section>
//                 <div className="flex items-center gap-2 mb-5 text-blue-600 font-bold text-xs uppercase tracking-[0.2em]">
//                   <BiPin size={18} className="animate-bounce" />
//                   <span>Featured Announcement</span>
//                 </div>
//                 <div 
//                   onClick={() => setViewingItem(pinnedAnnouncement)}
//                   className="group relative bg-white border border-blue-50 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-blue-900/10 cursor-pointer transition-all hover:scale-[1.01]"
//                 >
//                   <div className="flex flex-col lg:flex-row gap-10 items-start">
//                     <div className="flex-1 space-y-6">
//                       <div className="flex items-center gap-3">
//                         <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
//                           {pinnedAnnouncement.type}
//                         </span>
//                         <span className="text-sm font-bold text-slate-400 flex items-center gap-1">
//                           <BiTimeFive size={16}/> {formatDate(pinnedAnnouncement.start_date)}
//                         </span>
//                       </div>
                      
//                       <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1] group-hover:text-blue-600 transition-colors">
//                         {pinnedAnnouncement.title}
//                       </h2>
                      
//                       <p className="text-slate-500 text-lg leading-relaxed line-clamp-3">
//                         {pinnedAnnouncement.content}
//                       </p>

//                       <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-slate-50">
//                         <div className="flex items-center gap-2">
//                           <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold uppercase">
//                             {pinnedAnnouncement.posted_by.charAt(0)}
//                           </div>
//                           <div>
//                             <p className="text-[10px] uppercase font-bold text-slate-400 leading-none">Posted By</p>
//                             <p className="text-sm font-bold text-slate-700">{pinnedAnnouncement.posted_by}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-2">
//                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
//                             <BiCalendar size={20} />
//                           </div>
//                           <div>
//                             <p className="text-[10px] uppercase font-bold text-slate-400 leading-none">Deadline</p>
//                             <p className="text-sm font-bold text-slate-700">{formatDate(pinnedAnnouncement.end_date)}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* RECENT GRID: In-House Evaluation etc */}
//             <section>
//               <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
//                 Recent Updates 
//                 <span className="h-[2px] w-20 bg-slate-200 inline-block"></span>
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {recentAnnouncements.map((item) => (
//                   <div
//                     key={item.announcement_id}
//                     onClick={() => setViewingItem(item)}
//                     className="group bg-white p-8 rounded-[2rem] shadow-sm border border-slate-50 hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-pointer flex flex-col justify-between"
//                   >
//                     <div>
//                       <div className="flex justify-between items-center mb-6">
//                         <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
//                           item.type.includes('Evaluation') ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
//                         }`}>
//                           {item.type}
//                         </span>
//                         <BiFile className="text-slate-200 group-hover:text-blue-500 transition-colors" size={24}/>
//                       </div>
//                       <h4 className="text-xl font-black text-slate-800 mb-4 group-hover:text-blue-600 transition-colors leading-snug">
//                         {item.title}
//                       </h4>
//                       <p className="text-slate-500 text-sm leading-relaxed line-clamp-4 mb-8">
//                         {item.content}
//                       </p>
//                     </div>
                    
//                     <div className="flex items-center justify-between pt-6 border-t border-slate-50">
//                       <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
//                         Target: {item.audience}
//                       </div>
//                       <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
//                         <BiChevronRight size={20} />
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           </div>
//         ) : (
//           <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
//             <BiInfoCircle size={60} className="mx-auto text-slate-200 mb-6" />
//             <h3 className="text-xl font-bold text-slate-800">No matching announcements</h3>
//             <p className="text-slate-400">Try adjusting your search terms.</p>
//           </div>
//         )}
//       </div>

//       {/* VIEW MODAL */}
//       {viewingItem && (
//         <ViewAnnouncementModal
//           opened={!!viewingItem}
//           onClose={() => setViewingItem(null)}
//           announcement={viewingItem}
//         />
//       )}
//     </div>
//   );
// };

// export default AnnouncementFeed;





// "use client";

// import React, { useState } from "react";
// import {
//   BiSearch,
//   BiCalendar,
//   BiUser,
//   BiChevronRight,
//   BiPin,
//   BiInfoCircle,
//   BiFile,
//   BiTimeFive,
// } from "react-icons/bi";
// import ViewAnnouncementModal from "@/app/announcements/modal/ViewAnnouncement";

// // Hardcoded Mock Data
// const MOCK_ANNOUNCEMENTS = [
//   {
//     announcement_id: 1,
//     title: "FY 2025 Call for Research Proposals: Sustainable Innovation",
//     content: "The Office of Research and Development is now accepting research proposals for the 2025 fiscal year. We are prioritizing projects focused on Climate Resilience, Digital Transformation in Education, and Sustainable Agricultural Practices. Interested faculty and staff must submit their initial concept papers through the portal. Please ensure all budgetary requirements follow the updated COA guidelines for research grants.",
//     type: "Research Proposal",
//     posted_by: "Dr. Elena Rodriguez",
//     start_date: "2024-05-20",
//     end_date: "2024-06-30",
//     status: "Active" as const,
//     created_at: "2024-05-15",
//     updatedAt: "2024-05-15",
//     audience: "All Faculty & Researchers",
//     attachment: "proposal_guidelines_2025.pdf"
//   },
//   {
//     announcement_id: 2,
//     title: "Mid-Year In-House Research Evaluation Schedule",
//     content: "Attention all project leaders: The Mid-Year In-House Evaluation of ongoing research projects is scheduled for next month. Each lead researcher is allotted 20 minutes for presentation followed by a 10-minute Q&A with the external panel. Please upload your progress reports and slide decks to the management system at least three days before your assigned slot.",
//     type: "In-House Evaluation",
//     posted_by: "Admin Office",
//     start_date: "2024-07-10",
//     end_date: "2024-07-15",
//     status: "Active" as const,
//     created_at: "2024-05-10",
//     updatedAt: "2024-05-10",
//     audience: "Project Leaders",
//   },
//   {
//     announcement_id: 3,
//     title: "Updated Research Ethics Committee Guidelines",
//     content: "New protocols for human participant research have been approved. All new applications must include the revised Informed Consent Form templates. These changes are in compliance with the National Health Research Ethics Council standards.",
//     type: "Policy Update",
//     posted_by: "Ethics Board",
//     start_date: "2024-05-01",
//     end_date: "2024-12-31",
//     status: "Active" as const,
//     created_at: "2024-04-28",
//     updatedAt: "2024-04-28",
//     audience: "All Researchers",
//   }
// ];

// const AnnouncementFeed = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [viewingItem, setViewingItem] = useState<any | null>(null);

//   const filteredData = MOCK_ANNOUNCEMENTS.filter((item) =>
//     item.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const pinnedAnnouncement = filteredData[0];
//   const recentAnnouncements = filteredData.slice(1);

//   const formatDate = (date: string) =>
//     new Date(date).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-4 font-sans text-slate-800">
//       <div className="max-w-full mx-auto px-3">
        
//         {/* Header Section - Adjusted Position & Sizes */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
//           <div className="space-y-1">
//             <h1 className="text-md sm:text-lg font-black text-slate-900 tracking-tight">
//               Bulletin Board
//             </h1>
//             <p className="text-slate-500 text-xs sm:text-sm font-medium">
//               Updates and evaluation schedules
//             </p>
//           </div>
          
//           {/* Refined Search Input Position */}
//           <div className="relative group w-full sm:w-72">
//             <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 transition-all shadow-sm outline-none"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </div>

//         {filteredData.length > 0 ? (
//           <div className="space-y-5">
            
//             {/* PINNED CARD - Responsive Layout & Balanced Text */}
//             {pinnedAnnouncement && (
//               <section>
//                 <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold text-[10px] uppercase tracking-widest">
//                   <BiPin size={14} className="animate-pulse" />
//                   <span>Featured Update</span>
//                 </div>
//                 <div 
//                   onClick={() => setViewingItem(pinnedAnnouncement)}
//                   className="group relative bg-white border border-blue-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xl shadow-blue-900/5 cursor-pointer transition-all hover:border-blue-200"
//                 >
//                   <div className="flex flex-col gap-4">
//                     <div className="flex items-center gap-3">
//                       <span className="px-3 py-1 bg-blue-600 text-white rounded-md text-[9px] font-black uppercase tracking-wider">
//                         {pinnedAnnouncement.type}
//                       </span>
//                       <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
//                         <BiTimeFive size={14}/> {formatDate(pinnedAnnouncement.start_date)}
//                       </span>
//                     </div>
                    
//                     <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
//                       {pinnedAnnouncement.title}
//                     </h2>
                    
//                     <p className="text-slate-500 text-sm sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-3 max-w-4xl">
//                       {pinnedAnnouncement.content}
//                     </p>

//                     <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-5 mt-2 border-t border-slate-50">
//                       <div className="flex items-center gap-2">
//                         <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold uppercase">
//                           {pinnedAnnouncement.posted_by.charAt(0)}
//                         </div>
//                         <div>
//                           <p className="text-[9px] uppercase font-bold text-slate-400 leading-none">Author</p>
//                           <p className="text-xs font-bold text-slate-700">{pinnedAnnouncement.posted_by}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
//                           <BiCalendar size={16} />
//                         </div>
//                         <div>
//                           <p className="text-[9px] uppercase font-bold text-slate-400 leading-none">Deadline</p>
//                           <p className="text-xs font-bold text-slate-700">{formatDate(pinnedAnnouncement.end_date)}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* GRID SECTION - Balanced sizing */}
//             <section>
//               <h3 className="text-md font-black text-slate-900 mb-5 flex items-center gap-3">
//                 Recent Updates 
//                 <span className="h-[1px] w-12 bg-slate-200"></span>
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//                 {recentAnnouncements.map((item) => (
//                   <div
//                     key={item.announcement_id}
//                     onClick={() => setViewingItem(item)}
//                     className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all cursor-pointer flex flex-col"
//                   >
//                     <div className="flex justify-between items-start mb-4">
//                       <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
//                         item.type.includes('Evaluation') ? 'bg-amber-50 text-amber-700' : 'bg-slate-50 text-slate-600'
//                       }`}>
//                         {item.type}
//                       </span>
//                       <span className="text-[10px] text-slate-400 font-medium">{formatDate(item.start_date)}</span>
//                     </div>
                    
//                     <h4 className="text-base font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors leading-tight">
//                       {item.title}
//                     </h4>
                    
//                     <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-6 flex-grow">
//                       {item.content}
//                     </p>
                    
//                     <div className="flex items-center justify-between pt-4 border-t border-slate-50">
//                       <span className="text-[10px] font-bold text-slate-400 uppercase">
//                         {item.audience}
//                       </span>
//                       <BiChevronRight className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" size={18} />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           </div>
//         ) : (
//           <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-100 mt-4">
//             <BiInfoCircle size={40} className="mx-auto text-slate-200 mb-4" />
//             <h3 className="text-base font-bold text-slate-800">No matching results</h3>
//             <p className="text-xs text-slate-400">Try a different search query.</p>
//           </div>
//         )}
//       </div>

//       {/* VIEW MODAL */}
//       {viewingItem && (
//         <ViewAnnouncementModal
//           opened={!!viewingItem}
//           onClose={() => setViewingItem(null)}
//           announcement={viewingItem}
//         />
//       )}
//     </div>
//   );
// };

// export default AnnouncementFeed;








"use client";

import React, { useState } from "react";
import {
  BiSearch,
  BiCalendar,
  BiChevronRight,
  BiPin,
  BiInfoCircle,
  BiTimeFive,
  BiSend, // New icon for submission
} from "react-icons/bi";
import ViewAnnouncementModal from "@/app/announcements/modal/ViewAnnouncement";
import { useAuth } from "@/context/AuthContext"; // Import your auth hook
import { useRouter } from "next/navigation"; // To redirect to submission page

// Hardcoded Mock Data (same as before)
const MOCK_ANNOUNCEMENTS = [
  {
    announcement_id: 1,
    title: "FY 2025 Call for Research Proposals: Sustainable Innovation",
    content: "The Office of Research and Development is now accepting research proposals for the 2025 fiscal year. We are prioritizing projects focused on Climate Resilience, Digital Transformation in Education, and Sustainable Agricultural Practices. Interested faculty and staff must submit their initial concept papers through the portal.",
    type: "Research Proposal",
    posted_by: "Dr. Elena Rodriguez",
    start_date: "2024-05-20",
    end_date: "2024-06-30",
    status: "Active" as const,
    audience: "All Faculty & Researchers",
  },
  // ... other items
];

const AnnouncementFeed = () => {
  const { userRole } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewingItem, setViewingItem] = useState<any | null>(null);

  // Check if user is a researcher
  const isResearcher = userRole === "Faculty Researcher" || userRole === "Senior Faculty Researcher";

  const filteredData = MOCK_ANNOUNCEMENTS.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedAnnouncement = filteredData[0];
  const recentAnnouncements = filteredData.slice(1);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const handleApply = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // Prevent opening the modal when clicking the button
    // router.push(`/proposals/submit?announcement_id=${id}`); // Adjust path to your submission page
    router.push(`/research-projects/submit`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-4 font-sans text-slate-800">
      <div className="max-w-full mx-auto px-3">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="space-y-1">
            <h1 className="text-md sm:text-lg font-black text-slate-900 tracking-tight">Bulletin Board</h1>
            <p className="text-slate-500 text-xs sm:text-sm font-medium">Updates and evaluation schedules</p>
          </div>
          <div className="relative group w-full sm:w-72">
            <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {filteredData.length > 0 ? (
          <div className="space-y-5">
            {/* PINNED CARD */}
            {pinnedAnnouncement && (
              <section>
                <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold text-[10px] uppercase tracking-widest">
                  <BiPin size={14} className="animate-pulse" />
                  <span>Featured Update</span>
                </div>
                <div 
                  onClick={() => setViewingItem(pinnedAnnouncement)}
                  className="group relative bg-white border border-blue-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xl shadow-blue-900/5 cursor-pointer transition-all hover:border-blue-200"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap items-start sm:items-center gap-3">
                        <span className="px-3 hidden sm:block py-1 bg-blue-600 text-white rounded-md text-[9px] font-black uppercase">
                          {pinnedAnnouncement.type}
                        </span>
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                          <BiTimeFive size={14}/> {formatDate(pinnedAnnouncement.start_date)}
                        </span>
                      </div>
                      
                      {/* ACTION BUTTON: Only for Researchers and only for Proposal types */}
                      {isResearcher && pinnedAnnouncement.type === "Research Proposal" && (
                        <button 
                          onClick={(e) => handleApply(e, pinnedAnnouncement.announcement_id)}
                          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-transform active:scale-95 shadow-lg shadow-blue-200"
                        >
                          <BiSend size={16} />
                          <span className="hidden sm:block">Submit Proposal</span>
                        </button>
                      )}
                    </div>
                    
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                      {pinnedAnnouncement.title}
                    </h2>
                    
                    <p className="text-slate-500 text-sm sm:text-base leading-relaxed line-clamp-2 max-w-4xl">
                      {pinnedAnnouncement.content}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-5 mt-2 border-t border-slate-50">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold">
                          {pinnedAnnouncement.posted_by.charAt(0)}
                        </div>
                        <div>
                          <p className="text-[9px] uppercase font-bold text-slate-400 leading-none">Author</p>
                          <p className="text-xs font-bold text-slate-700">{pinnedAnnouncement.posted_by}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                          <BiCalendar size={16} />
                        </div>
                        <div>
                          <p className="text-[9px] uppercase font-bold text-slate-400 leading-none">Deadline</p>
                          <p className="text-xs font-bold text-slate-700">{formatDate(pinnedAnnouncement.end_date)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* RECENT GRID */}
            <section>
              <h3 className="text-md font-black text-slate-900 mb-5 flex items-center gap-3">
                Recent Updates <span className="h-[1px] w-12 bg-slate-200"></span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {recentAnnouncements.map((item) => (
                  <div
                    key={item.announcement_id}
                    onClick={() => setViewingItem(item)}
                    className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all cursor-pointer flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        item.type.includes('Evaluation') ? 'bg-amber-50 text-amber-700' : 'bg-slate-50 text-slate-600'
                      }`}>
                        {item.type}
                      </span>
                      {isResearcher && item.type === "Research Proposal" && (
                        <button 
                           onClick={(e) => handleApply(e, item.announcement_id)}
                           className="text-blue-600 hover:text-blue-800"
                        >
                          <BiSend size={18} />
                        </button>
                      )}
                    </div>
                    
                    <h4 className="text-base font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h4>
                    
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-6 flex-grow">
                      {item.content}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{item.audience}</span>
                      <div className="flex items-center text-blue-600 text-[10px] font-bold gap-1">
                        View Detail <BiChevronRight size={14} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-100 mt-4">
            <BiInfoCircle size={40} className="mx-auto text-slate-200 mb-4" />
            <h3 className="text-base font-bold text-slate-800">No matching results</h3>
          </div>
        )}
      </div>

      {viewingItem && (
        <ViewAnnouncementModal
          opened={!!viewingItem}
          onClose={() => setViewingItem(null)}
          announcement={viewingItem}
          // Note: You might want to pass isResearcher/handleApply 
          // to the modal as well if you want the button there.
        />
      )}
    </div>
  );
};

export default AnnouncementFeed;