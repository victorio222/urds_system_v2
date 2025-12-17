// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { apiAuth } from "@/utils/apiHelpers";

// interface Announcement {
//   announcement_id: number;
//   title: string;
//   start_date: string;
//   end_date: string;
// }

// const RecentAnnouncement: React.FC = () => {
//   const [announcements, setAnnouncements] = useState<Announcement[]>([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       try {
//         const res = await apiAuth.get("/announcement"); // Your API endpoint
//         const data: Announcement[] = res.data;

//         // Sort by start_date descending, take latest 3
//         const latest = data
//           .filter((a) => a.title && a.start_date) // filter invalid data
//           .sort(
//             (a, b) =>
//               new Date(b.start_date).getTime() -
//               new Date(a.start_date).getTime()
//           )
//           .slice(0, 3);

//         setAnnouncements(latest);
//       } catch (err) {
//         console.error("Failed to fetch announcements", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAnnouncements();
//   }, []);

//   const handleSeeAll = () => {
//     router.push("/announcements"); // Navigate to the announcements page
//   };

//   return (
//     <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col justify-between h-[230px]">
//       <div>
//         <div className="mb-3 flex items-center justify-between">
//           <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
//             Recent Announcement
//           </h2>
//           {announcements.length > 0 && (
//             <button
//               onClick={handleSeeAll}
//               className="text-[11px] font-medium text-indigo-600 hover:text-indigo-700"
//             >
//               Show all
//             </button>
//           )}
//         </div>

//         {loading ? (
//           <p className="text-xs text-slate-400">Loading announcements...</p>
//         ) : announcements.length === 0 ? (
//           <p className="text-xs text-slate-400">No recent announcements.</p>
//         ) : (
//           <div className="space-y-2">
//             {announcements.map((item) => (
//               <div
//                 key={item.announcement_id}
//                 className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 cursor-pointer"
//                 onClick={() =>
//                   router.push(`/announcements/${item.announcement_id}`)
//                 }
//               >
//                 <p className="line-clamp-1 font-medium">{item.title}</p>
//                 <p className="mt-1 text-[11px] text-slate-400">
//                   {new Date(item.start_date).toLocaleDateString("en-US", {
//                     year: "numeric",
//                     month: "short",
//                     day: "numeric",
//                   })}
//                   {" - "}
//                   {new Date(item.end_date).toLocaleDateString("en-US", {
//                     year: "numeric",
//                     month: "short",
//                     day: "numeric",
//                   })}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default RecentAnnouncement;





"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiAuth } from "@/utils/apiHelpers";
import { Megaphone, ArrowRight, Clock } from "lucide-react";

// 1. Interface (Kept strictly identical to your provided data)
interface Announcement {
  announcement_id: number;
  title: string;
  created_at: string;
}

const RecentAnnouncement: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 2. Logic (Kept identical to your provided code)
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await apiAuth.get("/announcement"); 
        const data: Announcement[] = res.data;

        const latest = data
          .filter((a) => a.title && a.created_at)
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
          .slice(0, 3); // Keeping top 3 to fit the profile card look

        setAnnouncements(latest);
      } catch (err) {
        console.error("Failed to fetch announcements", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleSeeAll = () => {
    router.push("/announcements");
  };

  const getRelativeTime = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diff = now.getTime() - past.getTime(); 

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return `${seconds} sec${seconds !== 1 ? "s" : ""} ago`;
    if (minutes < 60) return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  };

  return (
    // Main Card Container (White Theme)
    <section className="flex h-full w-full flex-col justify-between rounded-xl border border-slate-100 bg-white p-5 shadow-sm font-sans">
      
      <div>
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm lg:text-base font-medium text-slate-800">
            Announcements
          </h2>
          <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-500">
             {announcements.length} New
          </span>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col gap-3">
             {/* Simple Skeleton Loader */}
             <div className="h-12 w-full animate-pulse rounded-xl bg-slate-50"></div>
             <div className="h-12 w-full animate-pulse rounded-xl bg-slate-50"></div>
          </div>
        ) : announcements.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
             <p className="text-xs text-slate-400">No recent updates.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {announcements.map((item, index) => (
              <div
                key={item.announcement_id}
                onClick={() => router.push(`/announcements/${item.announcement_id}`)}
                className="group flex cursor-pointer items-start gap-3 rounded-xl border border-transparent p-2 transition-all hover:bg-slate-50 hover:border-slate-100"
              >
                {/* Icon Placeholder (Replaces Avatar from reference image) */}
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${index === 0 ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-500"}`}>
                  <Megaphone size={14} />
                </div>

                {/* Text Content */}
                <div className="flex flex-col">
                  <p className="line-clamp-2 text-xs font-bold text-slate-700 group-hover:text-indigo-700 transition-colors">
                    {item.title}
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-[10px] font-medium text-slate-400">
                    <Clock size={10} />
                    <span>{getRelativeTime(item.created_at)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Action (Clickable Text) */}
      <div className="mt-4 border-t border-slate-50 pt-3 flex justify-center">
        <button
          onClick={handleSeeAll}
          className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          View all announcements <ArrowRight size={12} />
        </button>
      </div>
    </section>
  );
};

export default RecentAnnouncement;