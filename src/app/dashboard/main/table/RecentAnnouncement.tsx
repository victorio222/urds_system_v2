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

interface Announcement {
  announcement_id: number;
  title: string;
  created_at: string; // Use created_at for relative time
}

const RecentAnnouncement: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await apiAuth.get("/announcement"); // Your API endpoint
        const data: Announcement[] = res.data;

        // Sort by created_at descending, take latest 3
        const latest = data
          .filter((a) => a.title && a.created_at) // filter invalid data
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
          .slice(0, 3);

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
    router.push("/announcements"); // Navigate to the announcements page
  };

  // Helper to format relative time
  const getRelativeTime = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diff = now.getTime() - past.getTime(); // milliseconds

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
    <section className="rounded-lg border min-h-lg border-slate-200 bg-white p-4 shadow-sm flex flex-col justify-between h-[230px]">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Recent Announcements
          </h2>
          {announcements.length > 0 && (
            <button
              onClick={handleSeeAll}
              className="text-[11px] font-medium text-indigo-600 hover:text-indigo-700"
            >
              Show all
            </button>
          )}
        </div>

        {loading ? (
          <p className="text-xs text-slate-400">Loading announcements...</p>
        ) : announcements.length === 0 ? (
          <p className="text-xs text-slate-400">No recent announcements.</p>
        ) : (
          <div className="space-y-2">
            {announcements.map((item) => (
              <div
                key={item.announcement_id}
                className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 cursor-pointer"
                onClick={() =>
                  router.push(`/announcements/${item.announcement_id}`)
                }
              >
                <p className="line-clamp-1 font-medium">{item.title}</p>
                <p className="mt-1 text-[11px] text-slate-400">
                  {getRelativeTime(item.created_at)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentAnnouncement;
