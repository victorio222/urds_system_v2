// import React, { useState, useMemo } from "react";
// import { Clock, ChevronDown, Calendar, ArrowUpDown } from "lucide-react";

// // 1. Interface
// interface ReviewItem {
//   id: string;
//   date: string;
//   proposal: string;
//   researcher: string;
//   venue: string;
//   time: string;
// }

// // 2. Mock Data
// const initialSchedule: ReviewItem[] = [
//   { id: "1", date: "Sept 22", proposal: "Agricultural Drone Study", researcher: "Dr. A. Santos", venue: "URDS Hall", time: "08:00 AM - 12:00 PM" },
//   { id: "2", date: "Sept 23", proposal: "Soil Analysis Automation", researcher: "Engr. J. Reyes", venue: "URDS Hall", time: "09:00 AM - 11:00 AM" },
//   { id: "3", date: "Sept 22", proposal: "Sustainable Fisheries", researcher: "Ms. L. Dizon", venue: "AVR Center", time: "01:00 PM - 04:00 PM" },
//   { id: "4", date: "Sept 23", proposal: "Crop Yield Prediction", researcher: "Mr. R. Alcantara", venue: "URDS Hall", time: "01:00 PM - 03:00 PM" },
//   { id: "5", date: "Sept 22", proposal: "Renewable Energy Farm", researcher: "Dr. B. Cruz", venue: "Science Lab", time: "04:00 PM - 06:00 PM" },
// ];

// // Helper for randomizing colors
// const getColorStyles = (index: number) => {
//   const styles = [
//     { bg: "bg-purple-50", text: "text-purple-600", dot: "bg-purple-600", border: "border-purple-100" },
//     { bg: "bg-orange-50", text: "text-orange-500", dot: "bg-orange-500", border: "border-orange-100" },
//     { bg: "bg-green-50", text: "text-emerald-600", dot: "bg-emerald-600", border: "border-emerald-100" },
//     { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-600", border: "border-blue-100" },
//   ];
//   return styles[index % styles.length];
// };

// type SortOption = "date" | "time";

// const UpcomingReviewSchedule: React.FC = () => {
//   const [sortType, setSortType] = useState<SortOption>("date");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   // Sorting Logic
//   const sortedSchedule = useMemo(() => {
//     return [...initialSchedule].sort((a, b) => {
//       if (sortType === "date") {
//         // Simple string compare for Month/Day (For real apps, use Date objects)
//         return a.date.localeCompare(b.date) || a.time.localeCompare(b.time);
//       } else {
//         // Sort by Time (AM/PM logic)
//         const parseTime = (t: string) => {
//           const parts = t.split(" - ")[0]; // Get start time "08:00 AM"
//           return new Date(`2000/01/01 ${parts}`).getTime();
//         };
//         return parseTime(a.time) - parseTime(b.time);
//       }
//     });
//   }, [sortType]);

//   return (
//     <div className="w-full max-w-2xl ">
//       {/* Main Card */}
//       <section className="rounded-[.8rem] border border-slate-100 bg-white p-5 shadow-lg ">
        
//         {/* Header Section */}
//         <div className="mb-6 flex items-center justify-between">
//           <div>
//             <h2 className="text-lg font-bold text-slate-800">
//               Review Schedule
//             </h2>
//             <p className="text-xs font-medium text-slate-400">In-House Proposals</p>
//           </div>
          
//           {/* Functional Sort Dropdown */}
//           <div className="relative">
//             <button 
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//               className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
//             >
//               {sortType === "date" ? "Sorted by Date" : "Sorted by Time"}
//               <ChevronDown size={14} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
//             </button>

//             {/* Dropdown Menu */}
//             {isDropdownOpen && (
//               <div className="absolute right-0 top-full mt-2 w-32 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-lg z-10">
//                 <button 
//                   onClick={() => { setSortType("date"); setIsDropdownOpen(false); }}
//                   className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-slate-600 hover:bg-slate-50"
//                 >
//                   <Calendar size={12} /> Date
//                 </button>
//                 <button 
//                   onClick={() => { setSortType("time"); setIsDropdownOpen(false); }}
//                   className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-slate-600 hover:bg-slate-50"
//                 >
//                   <Clock size={12} /> Time
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* List Container */}
//         <div className="flex flex-col gap-4">
//           {sortedSchedule.map((item, index) => {
//             const style = getColorStyles(index);
//             const [month, day] = item.date.split(" "); 

//             return (
//               <div 
//                 key={item.id} 
//                 className="group flex items-center gap-4 rounded-2xl p-2 transition-all hover:bg-slate-50/80"
//               >
                
//                 {/* 1. Slim Date Badge (Left) */}
//                 <div
//                   className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl border ${style.bg} ${style.border}`}
//                 >
//                   <span className={`text-[10px] font-bold uppercase tracking-wider ${style.text} opacity-80`}>
//                     {month}
//                   </span>
//                   <span className={`text-lg font-bold ${style.text}`}>
//                     {day}
//                   </span>
//                 </div>

//                 {/* 2. Middle Content: Proposal & Researcher */}
//                 <div className="flex flex-1 flex-col justify-center gap-0.5">
//                   <h3 className="line-clamp-1 text-sm font-bold text-slate-800">
//                     {item.proposal}
//                   </h3>
//                   <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
//                      <span className="truncate">by {item.researcher}</span>
//                   </div>
//                 </div>

//                 {/* 3. Right Side: Venue & Time */}
//                 <div className="flex shrink-0 flex-col items-end justify-center gap-1">
                  
//                   {/* Venue Tag */}
//                   <div className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 ${style.bg}`}>
//                     <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`}></span>
//                     <span className={`text-[10px] font-bold ${style.text}`}>
//                       {item.venue}
//                     </span>
//                   </div>

//                   {/* Time */}
//                   <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
//                     <Clock size={12} />
//                     <span>{item.time}</span>
//                   </div>
//                 </div>

//               </div>
//             );
//           })}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default UpcomingReviewSchedule;

import React, { useState, useMemo } from "react";
import { Clock, ChevronDown, Calendar } from "lucide-react";

// 1. Interface
interface ReviewItem {
  id: string;
  date: string;
  proposal: string;
  researcher: string;
  venue: string;
  time: string;
}

// 2. Mock Data
const initialSchedule: ReviewItem[] = [
  { id: "1", date: "Sept 22", proposal: "Agricultural Drone Study", researcher: "Dr. A. Santos", venue: "URDS Hall", time: "08:00 AM - 12:00 PM" },
  { id: "2", date: "Sept 23", proposal: "Soil Analysis Automation", researcher: "Engr. J. Reyes", venue: "URDS Hall", time: "09:00 AM - 11:00 AM" },
  { id: "3", date: "Sept 22", proposal: "Sustainable Fisheries", researcher: "Ms. L. Dizon", venue: "AVR Center", time: "01:00 PM - 04:00 PM" },
  { id: "4", date: "Sept 23", proposal: "Crop Yield Prediction", researcher: "Mr. R. Alcantara", venue: "URDS Hall", time: "01:00 PM - 03:00 PM" },
  { id: "5", date: "Sept 22", proposal: "Renewable Energy Farm", researcher: "Dr. B. Cruz", venue: "Science Lab", time: "04:00 PM - 06:00 PM" },
];

// Helper for randomizing colors
const getColorStyles = (index: number) => {
  const styles = [
    { bg: "bg-purple-50", text: "text-purple-600", dot: "bg-purple-600", border: "border-purple-100" },
    { bg: "bg-orange-50", text: "text-orange-500", dot: "bg-orange-500", border: "border-orange-100" },
    { bg: "bg-green-50", text: "text-emerald-600", dot: "bg-emerald-600", border: "border-emerald-100" },
    { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-600", border: "border-blue-100" },
  ];
  return styles[index % styles.length];
};

type SortOption = "date" | "time";

const UpcomingReviewSchedule: React.FC = () => {
  const [sortType, setSortType] = useState<SortOption>("date");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sorting Logic
  const sortedSchedule = useMemo(() => {
    return [...initialSchedule].sort((a, b) => {
      if (sortType === "date") {
        return a.date.localeCompare(b.date) || a.time.localeCompare(b.time);
      } else {
        const parseTime = (t: string) => {
          const parts = t.split(" - ")[0];
          return new Date(`2000/01/01 ${parts}`).getTime();
        };
        return parseTime(a.time) - parseTime(b.time);
      }
    });
  }, [sortType]);

  return (
    <div className="w-full max-w-2xl ">
      {/* Main Card */}
      <section className="rounded-xl border border-slate-100 bg-white p-4 shadow-lg">
        
        {/* Header Section */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-meduim text-slate-800">
              Review Schedule
            </h2>
            <p className="text-[11px]  text-slate-400">In-House Proposals</p>
          </div>
          
          {/* Functional Sort Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              {sortType === "date" ? "Sorted by Date" : "Sorted by Time"}
              <ChevronDown size={12} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-28 overflow-hidden rounded-lg border border-slate-100 bg-white shadow-lg z-10">
                <button 
                  onClick={() => { setSortType("date"); setIsDropdownOpen(false); }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-[11px] font-medium text-slate-600 hover:bg-slate-50"
                >
                  <Calendar size={12} /> Date
                </button>
                <button 
                  onClick={() => { setSortType("time"); setIsDropdownOpen(false); }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-[11px] font-medium text-slate-600 hover:bg-slate-50"
                >
                  <Clock size={12} /> Time
                </button>
              </div>
            )}
          </div>
        </div>

        {/* List Container - Reduced Gap to gap-2 for compression */}
        <div className="flex flex-col gap-2">
          {sortedSchedule.map((item, index) => {
            const style = getColorStyles(index);
            const [month, day] = item.date.split(" "); 

            return (
              <div 
                key={item.id} 
                className="group flex items-center gap-3 rounded-xl p-1.5 transition-all hover:bg-slate-50"
              >
                
                {/* 1. COMPACT Date Badge (Left) - Reduced size */}
                <div
                  className={`flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl border ${style.bg} ${style.border}`}
                >
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${style.text} opacity-80`}>
                    {month}
                  </span>
                  <span className={`text-base font-bold leading-none ${style.text}`}>
                    {day}
                  </span>
                </div>

                {/* 2. Middle Content: Proposal & Researcher */}
                <div className="flex flex-1 flex-col justify-center">
                  <h3 className="line-clamp-1 text-sm font-medium text-slate-800">
                    {item.proposal}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                     <span className="truncate">by {item.researcher}</span>
                  </div>
                </div>

                {/* 3. Right Side: Venue & Time - Tighter spacing */}
                <div className="flex shrink-0 flex-col items-end justify-center gap-0.5">
                  
                  {/* Venue Tag */}
                  <div className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 ${style.bg}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`}></span>
                    <span className={`text-[10px] font-bold ${style.text}`}>
                      {item.venue}
                    </span>
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
                    <Clock size={10} />
                    <span>{item.time}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default UpcomingReviewSchedule;