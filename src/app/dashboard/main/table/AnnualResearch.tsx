// 'use client';

// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { apiAuth } from '@/utils/apiHelpers';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend
// );

// interface YearlyData {
//   year: number;
//   submitted: number;
//   approved: number;
//   completed: number;
//   rejected: number;
// }

// export default function AnnualResearchActivityTrend() {
//   const [yearlyTrend, setYearlyTrend] = useState<YearlyData[]>([]);
//   const [loading, setLoading] = useState(true);

//   /* ---------------- Fetch Data ---------------- */
//   useEffect(() => {
//     const fetchProposals = async () => {
//       try {
//         const res = await apiAuth.get('/proposals');
//         const proposals = res.data;

//         const currentYear = new Date().getFullYear();
//         const last5Years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);

//         const trendData: YearlyData[] = last5Years.map(year => {
//           const proposalsThisYear = proposals.filter((p: any) => {
//             const proposalYear = new Date(p.submissionDate).getFullYear();
//             return proposalYear === year;
//           });

//           return {
//             year,
//             submitted: proposalsThisYear.filter(
//               (p: any) => p.status === 'Draft' || p.status === 'Pending'
//             ).length,
//             approved: proposalsThisYear.filter(
//               (p: any) => p.status === 'Submitted' || p.status === 'Approved'
//             ).length,
//             completed: proposalsThisYear.filter(
//               (p: any) => p.status === 'Completed'
//             ).length,
//             rejected: proposalsThisYear.filter(
//               (p: any) => p.status === 'Rejected' || p.status === 'Terminated'
//             ).length,
//           };
//         });

//         setYearlyTrend(trendData);
//       } catch (err) {
//         console.error('Failed to fetch proposals', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProposals();
//   }, []);

//   if (loading) {
//     return (
//       <div className="bg-white rounded-lg shadow-md p-6 text-center text-xs text-slate-500">
//         Loading annual research analytics...
//       </div>
//     );
//   }

//   /* ---------------- Chart.js Data ---------------- */
//   const data = {
//     labels: yearlyTrend.map(d => d.year.toString()),
//     datasets: [
//       {
//         label: 'Submitted',
//         data: yearlyTrend.map(d => d.submitted),
//         borderColor: '#a78bfa',
//         backgroundColor: '#a78bfa',
//         tension: 0.3,
//       },
//       {
//         label: 'Approved',
//         data: yearlyTrend.map(d => d.approved),
//         borderColor: '#fb7185',
//         backgroundColor: '#fb7185',
//         tension: 0.3,
//       },
//       {
//         label: 'Completed',
//         data: yearlyTrend.map(d => d.completed),
//         borderColor: '#14b8a6',
//         backgroundColor: '#14b8a6',
//         tension: 0.3,
//       },
//       {
//         label: 'Rejected',
//         data: yearlyTrend.map(d => d.rejected),
//         borderColor: '#fb923c',
//         backgroundColor: '#fb923c',
//         tension: 0.3,
//       },
//     ],
//   };

//   /* ---------------- Chart.js Options ---------------- */
//   const options = {
//     responsive: true,
//     maintainAspectRatio: false, // ✅ avoids "image-like" scaling
//     plugins: {
//       legend: {
//         position: 'top' as const,
//         labels: {
//           boxWidth: 12,
//           font: { size: 11 },
//         },
//       },
//       tooltip: {
//         mode: 'index' as const,
//         intersect: false,
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           color: '#ede9fe',
//           borderDash: [3, 3],
//         },
//         ticks: {
//           font: { size: 11 },
//         },
//       },
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: '#e5e7eb',
//           borderDash: [3, 3],
//         },
//         ticks: {
//           stepSize: 5,
//           font: { size: 11 },
//         },
//       },
//     },
//   };

//   return (
//     <div className="bg-white rounded-lg h-full shadow-md p-3 w-full">
//       <h2 className="text-sm font-medium text-slate-600 mb-2">
//         Annual Research Activity Trend
//       </h2>

//       {/* Chart container controls height */}
//       <div className="relative w-full h-[260px]">
//         <Line data={data} options={options} />
//       </div>
//     </div>
//   );
// }



"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { apiAuth } from "@/utils/apiHelpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface YearlyData {
  year: number;
  submitted: number;
  approved: number;
  completed: number;
  rejected: number;
}

// Skeleton Loader Component
const LineChartSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-3 w-full h-full animate-pulse">
    {/* Title Skeleton */}
    <div className="h-4 w-48 bg-slate-200 rounded mb-4"></div>

    {/* Legend Skeleton */}
    <div className="flex justify-center gap-4 mb-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-slate-200"></div>
          <div className="h-2 w-16 bg-slate-100 rounded"></div>
        </div>
      ))}
    </div>

    {/* Chart Area Skeleton */}
    <div className="relative w-full h-[260px] border-l border-b border-slate-100 flex items-end justify-between px-4 pb-2">
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 flex flex-col justify-between py-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-full border-t border-slate-50"></div>
        ))}
      </div>
      
      {/* Mimic 5-year data points/bars */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex flex-col items-center gap-2">
           <div className="h-3 w-8 bg-slate-100 rounded"></div>
        </div>
      ))}
    </div>
  </div>
);

export default function AnnualResearchActivityTrend() {
  const [yearlyTrend, setYearlyTrend] = useState<YearlyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const res = await apiAuth.get("/proposals");
        const proposals = res.data;

        const currentYear = new Date().getFullYear();
        const last5Years = Array.from(
          { length: 5 },
          (_, i) => currentYear - 4 + i
        );

        const trendData: YearlyData[] = last5Years.map((year) => {
          const proposalsThisYear = proposals.filter((p: any) => {
            const proposalYear = new Date(
              p.submissionDate || p.createdAt
            ).getFullYear();
            return proposalYear === year;
          });

          return {
            year,
            submitted: proposalsThisYear.filter(
              (p: any) => p.status === "Draft" || p.status === "Pending"
            ).length,
            approved: proposalsThisYear.filter(
              (p: any) => p.status === "Submitted" || p.status === "Approved"
            ).length,
            completed: proposalsThisYear.filter(
              (p: any) => p.status === "Completed"
            ).length,
            rejected: proposalsThisYear.filter(
              (p: any) => p.status === "Rejected" || p.status === "Terminated"
            ).length,
          };
        });

        setYearlyTrend(trendData);
      } catch (err) {
        console.error("Failed to fetch proposals", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  if (loading) return <LineChartSkeleton />;

  const data = {
    labels: yearlyTrend.map((d) => d.year.toString()),
    datasets: [
      {
        label: "Submitted",
        data: yearlyTrend.map((d) => d.submitted),
        borderColor: "#a78bfa",
        backgroundColor: "#a78bfa",
        tension: 0.3,
      },
      {
        label: "Approved",
        data: yearlyTrend.map((d) => d.approved),
        borderColor: "#fb7185",
        backgroundColor: "#fb7185",
        tension: 0.3,
      },
      {
        label: "Completed",
        data: yearlyTrend.map((d) => d.completed),
        borderColor: "#14b8a6",
        backgroundColor: "#14b8a6",
        tension: 0.3,
      },
      {
        label: "Rejected",
        data: yearlyTrend.map((d) => d.rejected),
        borderColor: "#fb923c",
        backgroundColor: "#fb923c",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          boxWidth: 12,
          font: { size: 11 },
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "#ede9fe",
          borderDash: [3, 3],
        },
        ticks: { font: { size: 11 } },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#e5e7eb",
          borderDash: [3, 3],
        },
        ticks: {
          stepSize: 5,
          font: { size: 11 },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg h-full shadow-md p-3 w-full">
      <h2 className="text-sm font-medium text-slate-600 mb-2">
        Annual Research Activity Trend
      </h2>

      <div className="relative w-full h-[260px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}