// // import React from "react";

// // // Sample data
// // const stats = {
// //   total: 100,
// //   pending: 25,
// //   ongoing: 25,
// //   completed: 40,
// //   rejected: 10,
// // };

// // function ProgressRing() {
// //   const { pending, ongoing, completed, rejected, total } = stats;
// //   const data = [
// //     { value: pending, color: "#3b82f6" },
// //     { value: ongoing, color: "#a78bfa" },
// //     { value: completed, color: "#14b8a6" },
// //     { value: rejected, color: "#fb923c" },
// //   ];
// //   const radius =  70;
// //   const circumference = 2 * Math.PI * radius;
// //   let offset = 0;

// //   // Ring Segments
// //   return (
// //     <svg width="180" height="180" className="block mx-auto " >
// //       {data.map((d, idx) => {
// //         const percent = d.value / total;
// //         const arcLength = percent * circumference;
// //         const dashArray = `${arcLength},${circumference - arcLength}`;
// //         const segment = (
// //           <circle
// //             key={idx}
// //             r={radius}
// //             cx="90"
// //             cy="90"
// //             fill="none"
// //             stroke={d.color}
// //             strokeWidth="12"
// //             strokeDasharray={dashArray}
// //             strokeDashoffset={-offset}
// //              style={{ transition: "stroke-dashoffset 1s" }}
// //           />
// //         );
// //         offset += arcLength;
// //         return segment;
// //       })}
// //       <text
// //         x="90"
// //         y="100"
// //         textAnchor="middle"
// //         fontSize="28"
// //         fontWeight="bold"
// //         fill="#22223b"
// //       >
// //         {total}
// //       </text>
// //     </svg>
// //   );
// // }

// // function MonthlyResearchAnalytics() {
// //   return (
// //     <div className="bg-white rounded-xl shadow-md p-8 w-85 flex flex-col items-center">
// //       <div className="text-lg font-semibold text-black mb-5">
// //         Monthly Research Analytics
// //       </div>
// //       <div className="flex flex-row items-center gap-3"> 
      
// //         <ProgressRing />
       
// //         <div className="flex flex-col gap-2">
// //           <div className="flex items-center gap-2">
// //             <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
// //             <span className="text-blue-500 font-medium">Pending</span>
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <span className="w-3 h-3 rounded-full bg-purple-400 inline-block"></span>
// //             <span className="text-purple-500 font-medium">On-going</span>
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <span className="w-3 h-3 rounded-full bg-teal-400 inline-block"></span>
// //             <span className="text-teal-400 font-medium">Completed</span>
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <span className="w-3 h-3 rounded-full bg-orange-400 inline-block"></span>
// //             <span className="text-orange-400 font-medium">Rejected</span>
// //           </div>
// //         </div>
// //       </div>
// //       <div className="text-xs text-gray-400 mt-5 text-center">
// //         (Updated as of October 2025)
// //       </div>
// //     </div>
// //   );
// // }


// // export default MonthlyResearchAnalytics;



// 'use client';

// import React, { useEffect, useState } from 'react';
// import { apiAuth } from '@/utils/apiHelpers';

// /* ---------------- Progress Ring ---------------- */

// function ProgressRing({ stats }: { stats: any }) {
//   const { pending, ongoing, completed, rejected, total } = stats;

//   const data = [
//     { value: pending, color: '#3b82f6' },
//     { value: ongoing, color: '#a78bfa' },
//     { value: completed, color: '#14b8a6' },
//     { value: rejected, color: '#fb923c' },
//   ];

//   const radius = 70;
//   const circumference = 2 * Math.PI * radius;
//   let offset = 0;

//   return (
//     <svg width="180" height="180">
//       {data.map((d, i) => {
//         const percent = total ? d.value / total : 0;
//         const arc = percent * circumference;

//         const circle = (
//           <circle
//             key={i}
//             r={radius}
//             cx="90"
//             cy="90"
//             fill="none"
//             stroke={d.color}
//             strokeWidth="12"
//             strokeDasharray={`${arc},${circumference - arc}`}
//             strokeDashoffset={-offset}
//           />
//         );

//         offset += arc;
//         return circle;
//       })}

//       <text
//         x="90"
//         y="100"
//         textAnchor="middle"
//         fontSize="28"
//         fontWeight="bold"
//       >
//         {total}
//       </text>
//     </svg>
//   );
// }

// /* ---------------- Main Component ---------------- */

// export default function MonthlyResearchAnalytics() {
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     ongoing: 0,
//     completed: 0,
//     rejected: 0,
//   });

//   const [month, setMonth] = useState(new Date().getMonth());
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAnalytics();
//   }, [month, year]);

//   const fetchAnalytics = async () => {
//     try {
//       const res = await apiAuth.get('/proposals');
//       const proposals = res.data;

//       const filtered = proposals.filter((p: any) => {
//         const date = new Date(p.createdAt || p.submissionDate);
//         return (
//           date.getMonth() === month &&
//           date.getFullYear() === year
//         );
//       });

//       const pending = filtered.filter(
//         (p: any) => p.status === 'Pending' || p.status === 'New'
//       ).length;

//       const ongoing = filtered.filter(
//         (p: any) => p.status === 'Ongoing'
//       ).length;

//       const completed = filtered.filter(
//         (p: any) => p.status === 'Completed'
//       ).length;

//       const rejected = filtered.filter(
//         (p: any) =>
//           p.status === 'Rejected' || p.status === 'Terminated'
//       ).length;

//       setStats({
//         total: pending + ongoing + completed + rejected,
//         pending,
//         ongoing,
//         completed,
//         rejected,
//       });
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-md p-8 w-85 flex flex-col items-center">
//       <div className="flex justify-between w-full mb-4">
//         <h2 className="font-semibold">Monthly Research Analytics</h2>

//         {/* Month Selector */}
//         <input
//           type="month"
//           value={`${year}-${String(month + 1).padStart(2, '0')}`}
//           onChange={(e) => {
//             const [y, m] = e.target.value.split('-');
//             setYear(Number(y));
//             setMonth(Number(m) - 1);
//           }}
//           className="border px-2 py-1 rounded text-sm"
//         />
//       </div>

//       {loading ? (
//         <p className="text-sm text-gray-400">Loading...</p>
//       ) : (
//         <div className="flex gap-4">
//           <ProgressRing stats={stats} />

//           <div className="flex flex-col gap-2 text-sm">
//             <Legend color="bg-blue-500" label="New / Pending" />
//             <Legend color="bg-purple-400" label="On-going" />
//             <Legend color="bg-teal-400" label="Completed" />
//             <Legend color="bg-orange-400" label="Rejected" />
//           </div>
//         </div>
//       )}

//       <p className="text-xs text-gray-400 mt-4">
//         Data updates automatically by month
//       </p>
//     </div>
//   );
// }

// /* ---------------- Legend ---------------- */

// const Legend = ({ color, label }: any) => (
//   <div className="flex items-center gap-2">
//     <span className={`w-3 h-3 rounded-full ${color}`} />
//     <span>{label}</span>
//   </div>
// );









'use client';

import React, { useEffect, useState } from 'react';
import { apiAuth } from '@/utils/apiHelpers';

/* ---------------- Progress Ring ---------------- */

function ProgressRing({ stats }: { stats: any }) {
  const { pending, ongoing, completed, rejected, total } = stats;

  const data = [
    { value: pending, color: "#3b82f6" },
    { value: ongoing, color: '#a78bfa' },
    { value: completed, color: '#14b8a6' },
    { value: rejected, color: '#fb923c' },
  ];

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <svg width="180" height="180">
      {data.map((d, i) => {
        const percent = total ? d.value / total : 0;
        const arc = percent * circumference;

        const segment = (
          <circle
            key={i}
            r={radius}
            cx="90"
            cy="90"
            fill="none"
            stroke={d.color}
            strokeWidth="12"
            strokeDasharray={`${arc},${circumference - arc}`}
            strokeDashoffset={-offset}
            style={{ transition: 'stroke-dashoffset 1s' }}
          />
        );

        offset += arc;
        return segment;
      })}

      <text
        x="90"
        y="100"
        textAnchor="middle"
        fontSize="28"
        fontWeight="bold"
      >
        {total}
      </text>
    </svg>
  );
}

/* ---------------- Main Component ---------------- */

export default function MonthlyResearchAnalytics() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    ongoing: 0,
    completed: 0,
    rejected: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await apiAuth.get('/proposals');
        const proposals = res.data;

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const thisMonth = proposals.filter((p: any) => {
          const date = new Date(p.createdAt || p.submissionDate);
          return (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
          );
        });

        const pending = thisMonth.filter(
          (p: any) => p.status === 'Pending' || p.status === 'New'
        ).length;

        const ongoing = thisMonth.filter(
          (p: any) => p.status === 'Ongoing'
        ).length;

        const completed = thisMonth.filter(
          (p: any) => p.status === 'Completed'
        ).length;

        const rejected = thisMonth.filter(
          (p: any) =>
            p.status === 'Rejected' || p.status === 'Terminated'
        ).length;

        setStats({
          total: pending + ongoing + completed + rejected,
          pending,
          ongoing,
          completed,
          rejected,
        });
      } catch (err) {
        console.error('Failed to load analytics', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-8 w-85 flex flex-col items-center">
      <div className="text-lg font-semibold mb-4">
        Monthly Research Analytics
      </div>

      {loading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : (
        <div className="flex items-center gap-4">
          <ProgressRing stats={stats} />

          <div className="flex flex-col gap-2 text-sm">
            <Legend color="bg-blue-500" label="Pending" />
            <Legend color="bg-purple-400" label="On-going" />
            <Legend color="bg-teal-400" label="Completed" />
            <Legend color="bg-orange-400" label="Rejected" />
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400 mt-4">
        Updated as of {new Date().toLocaleString('default', {
          month: 'long',
          year: 'numeric',
        })}
      </p>
    </div>
  );
}

/* ---------------- Legend ---------------- */

const Legend = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-2">
    <span className={`w-3 h-3 rounded-full ${color}`} />
    <span>{label}</span>
  </div>
);
