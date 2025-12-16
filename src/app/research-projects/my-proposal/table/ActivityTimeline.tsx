// import React from "react";
// import Table from "@/component/ui/Table";
// import { BiSolidFilterAlt, BiSolidPlusCircle } from "react-icons/bi";
// import ActionDropdown from "../action/ActionDropdown";
// import Dropdown, { DropdownItem } from "@/component/ui/Dropdown";



// type TimelineStatus =
//   | "Submitted"
//   | "Sent for College Review"
//   | "For Review"
//   | "Ready for Evaluation";

// interface TimelineEvent {
//   id: string;
//   status: TimelineStatus;
//   title: string;
//   description: string;
//   dateTime: string;
// }

// const timelineColorMap: Record<TimelineStatus, string> = {
//   Submitted: "bg-blue-500",
//   "Sent for College Review": "bg-sky-500",
//   "For Review": "bg-amber-500",
//   "Ready for Evaluation": "bg-emerald-500",
// };

// const mockTimeline: TimelineEvent[] = [
//   {
//     id: "1",
//     status: "Submitted",
//     title: "Proposal submitted by Dr. James Smith",
//     description:
//       "AI-Enabled Triage Support for UEP Health Services was submitted to the Research Office.",
//     dateTime: "Sept 23, 2026 · 9:05 AM",
//   },
//   {
//     id: "2",
//     status: "Sent for College Review",
//     title: "Forwarded to College Dean",
//     description:
//       "Research Office assigned the proposal for initial screening by the College Dean.",
//     dateTime: "Sept 24, 2026 · 10:30 AM",
//   },
//   {
//     id: "3",
//     status: "For Review",
//     title: "Under review by College Dean",
//     description: "Decision pending. Feedback will be added once review is done.",
//     dateTime: "Sept 24, 2026 · 2:15 PM",
//   },
//   {
//     id: "4",
//     status: "Ready for Evaluation",
//     title: "Marked ready for panel evaluation",
//     description: "Next step: Assign evaluators and schedule evaluation session.",
//     dateTime: "Sept 26, 2026 · 11:40 AM",
//   },
// ];

// export const ActivityTimeline: React.FC = () => {
//   return (
//     <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
//       <div className="mb-4 flex items-center justify-between">
//         <h2 className="text-sm font-semibold tracking-wide text-slate-600">
//           Activity &amp; Timeline
//         </h2>

//         {/* Example: action button using your icon style */}
//         <button className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-medium text-indigo-700 hover:bg-indigo-100">
//           <BiSolidPlusCircle className="h-3 w-3" />
//           Add note
//         </button>
//       </div>

//       <ol className="relative space-y-6 border-l border-slate-200 pl-4">
//         {mockTimeline.map((event, index) => (
//           <li key={event.id} className="relative">
//             <span
//               className={`absolute -left-2.5 flex h-3 w-3 items-center justify-center rounded-full ring-4 ring-white ${timelineColorMap[event.status]}`}
//             />

//             <div className="rounded-xl bg-slate-50 p-3">
//               <div className="flex items-center justify-between gap-2">
//                 <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   {event.status}
//                 </p>
//                 <span className="text-[11px] text-slate-400">
//                   {event.dateTime}
//                 </span>
//               </div>

//               <p className="mt-1 text-sm font-semibold text-slate-900">
//                 {event.title}
//               </p>
//               <p className="mt-1 text-xs text-slate-600">
//                 {event.description}
//               </p>

//               <div className="mt-2 text-xs">
//                 <ActionDropdown />
//               </div>
//             </div>

//             {index !== mockTimeline.length - 1 && (
//               <div className="absolute -left-px top-3 h-full w-px bg-slate-200" />
//             )}
//           </li>
//         ))}
//       </ol>
//     </section>
//   );
// };


// export default ActivityTimeline;

import React from "react";
import Table from "@/component/ui/Table";
import { BiSolidFilterAlt, BiSolidPlusCircle } from "react-icons/bi";
import ActionDropdown from "../action/ActionDropdown";
import Dropdown, { DropdownItem } from "@/component/ui/Dropdown";

type TimelineStatus =
  | "Submitted"
  | "Sent for College Review"
  | "For Review"
  | "Ready for Evaluation";

const timelineColorMap: Record<TimelineStatus, string> = {
  Submitted: "bg-blue-500",
  "Sent for College Review": "bg-sky-500",
  "For Review": "bg-amber-500",
  "Ready for Evaluation": "bg-emerald-500",
};

interface TimelineEvent {
  id: string;
  status: TimelineStatus;
  title: string;
  description: string;
  dateTime: string; // display
  date: string;     // ISO for sorting
}

const mockTimeline: TimelineEvent[] = [
  {
    id: "1",
    status: "Submitted",
    title: "Proposal submitted by Dr. James Smith",
    description:
      "AI-Enabled Triage Support for UEP Health Services was submitted to the Research Office.",
    dateTime: "Sept 23, 2026 · 9:05 AM",
    date: "2026-09-23T09:05:00",
  },
  {
    id: "2",
    status: "Sent for College Review",
    title: "Forwarded to College Dean",
    description:
      "Research Office assigned the proposal for initial screening by the College Dean.",
    dateTime: "Sept 24, 2026 · 10:30 AM",
    date: "2026-09-24T10:30:00",
  },
  {
    id: "3",
    status: "For Review",
    title: "Under review by College Dean",
    description: "Decision pending. Feedback will be added once review is done.",
    dateTime: "Sept 24, 2026 · 2:15 PM",
    date: "2026-09-24T14:15:00",
  },
  {
    id: "4",
    status: "Ready for Evaluation",
    title: "Marked ready for panel evaluation",
    description: "Next step: Assign evaluators and schedule evaluation session.",
    dateTime: "Sept 26, 2026 · 11:40 AM",
    date: "2026-09-26T11:40:00",
  },
];

// Helper to sort by ISO date, newest first
const getSortedTimeline = (events: TimelineEvent[]) =>
  [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

export const ActivityTimeline: React.FC = () => {
  const sortedTimeline = getSortedTimeline(mockTimeline);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-wide text-slate-600">
          Activity &amp; Timeline
        </h2>

        <button className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-medium text-indigo-700 hover:bg-indigo-100">
          <BiSolidPlusCircle className="h-3 w-3" />
          Add note
        </button>
      </div>

      {/* Fixed-height scrollable area so page itself does not grow */}
      <div className="max-h-80 overflow-y-auto pr-2">
        <ol className="relative border-l border-slate-200 pl-5">
          {sortedTimeline.map((event) => (
            <li key={event.id} className="relative pb-6 last:pb-0">
              {/* vertical connector */}
              <span className="absolute left-0 top-3 h-full w-px bg-slate-200 last:h-3" />

              {/* bullet */}
              <span
                className={`absolute -left-1 top-3 h-3 w-3 rounded-full ring-4 ring-white ${timelineColorMap[event.status]}`}
              />

              <div className="rounded-xl bg-slate-50 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {event.status}
                  </p>
                  <span className="text-[11px] text-slate-400">
                    {event.dateTime}
                  </span>
                </div>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {event.title}
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  {event.description}
                </p>

                <div className="mt-2 text-xs">
                  <ActionDropdown />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ActivityTimeline;
