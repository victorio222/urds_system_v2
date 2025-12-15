// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import { apiAuth } from "@/utils/apiHelpers";

// /* ---------------- Progress Ring ---------------- */
// function ProgressRing({ stats }: { stats: any }) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [size, setSize] = useState(180);
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

//   // Update size based on container width
//   useEffect(() => {
//     const updateSize = () => {
//       if (containerRef.current) {
//         const width = containerRef.current.offsetWidth;
//         setSize(Math.min(width, 180));
//       }
//     };
//     updateSize();
//     window.addEventListener("resize", updateSize);
//     return () => window.removeEventListener("resize", updateSize);
//   }, []);

//   const { pending, ongoing, completed, rejected, total } = stats;

//   const data = [
//     { value: pending, color: "#3b82f6", label: "Pending" },
//     { value: ongoing, color: "#a78bfa", label: "Ongoing" },
//     { value: completed, color: "#14b8a6", label: "Completed" },
//     { value: rejected, color: "#fb923c", label: "Rejected" },
//   ];

//   const radius = size / 2 - 12;
//   const circumference = 2 * Math.PI * radius;
//   let offset = 0;

//   return (
//     <div ref={containerRef} className="w-full flex justify-center relative">
//       <svg width={size} height={size} className="flex-shrink-0">
//         {data.map((d, i) => {
//           const percent = total ? d.value / total : 0;
//           const arc = percent * circumference;

//           const segment = (
//             <g
//               key={i}
//               onMouseEnter={() => setHoveredIndex(i)}
//               onMouseLeave={() => setHoveredIndex(null)}
//               style={{ cursor: "pointer" }}
//             >
//               <circle
//                 r={radius}
//                 cx={size / 2}
//                 cy={size / 2}
//                 fill="none"
//                 stroke={d.color}
//                 strokeWidth="12"
//                 strokeDasharray={`${arc},${circumference - arc}`}
//                 strokeDashoffset={-offset}
//                 style={{ transition: "stroke-dashoffset 0.8s" }}
//               />
//             </g>
//           );

//           offset += arc;
//           return segment;
//         })}

//         {/* Hovered segment tooltip */}
//         {hoveredIndex !== null && (
//           <text
//             x={size / 2}
//             y={size / 2}
//             textAnchor="middle"
//             fontSize={size / 8}
//             fontWeight="medium"
//             className="fill-slate-500"
//           >
//             {data[hoveredIndex].value}
//           </text>
//         )}
//       </svg>
//     </div>
//   );
// }

// /* ---------------- Legend ---------------- */
// const Legend = ({ color, label }: { color: string; label: string }) => (
//   <div className="flex items-center gap-2 text-xs">
//     <span className={`w-3 h-3 rounded-full ${color}`} />
//     <span className="text-slate-700">{label}</span>
//   </div>
// );

// /* ---------------- Main Component ---------------- */
// export default function MonthlyResearchAnalytics() {
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     ongoing: 0,
//     completed: 0,
//     rejected: 0,
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const res = await apiAuth.get("/proposals");
//         const proposals = res.data;

//         const now = new Date();
//         const currentMonth = now.getMonth();
//         const currentYear = now.getFullYear();

//         const thisMonth = proposals.filter((p: any) => {
//           const date = new Date(p.createdAt || p.submissionDate);
//           return (
//             date.getMonth() === currentMonth &&
//             date.getFullYear() === currentYear
//           );
//         });

//         const pending = thisMonth.filter(
//           (p: any) => p.status === "Pending" || p.status === "New"
//         ).length;

//         const ongoing = thisMonth.filter(
//           (p: any) => p.status === "Ongoing"
//         ).length;
//         const completed = thisMonth.filter(
//           (p: any) => p.status === "Completed"
//         ).length;
//         const rejected = thisMonth.filter(
//           (p: any) => p.status === "Rejected" || p.status === "Terminated"
//         ).length;

//         setStats({
//           total: pending + ongoing + completed + rejected,
//           pending,
//           ongoing,
//           completed,
//           rejected,
//         });
//       } catch (err) {
//         console.error("Failed to load analytics", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAnalytics();
//   }, []);

//   return (
//     <div className="bg-white p-3 rounded-lg shadow-lg w-full h-full sm:flex-row items-center sm:items-start gap-4">
//       {/* Title */}
//       <div className="w-full sm:w-auto text-center sm:text-left">
//         <p className="text-xs lg:text-sm font-medium text-slate-600 mb-1">
//           Monthly Research Analytics
//         </p>
//         <p className="text-[12px] italic text-slate-500 mt-1 sm:ml-auto">
//           (Updated as of{" "}
//           {new Date().toLocaleString("default", {
//             month: "long",
//             year: "numeric",
//           })}
//           )
//         </p>
//       </div>

//       <div className="mt-2 w-full">
//         {loading ? (
//           <p className="text-xs text-slate-500">Loading...</p>
//         ) : (
//           <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 w-full">
//             <ProgressRing stats={stats} />

//             <div className="flex flex-wrap justify-center sm:flex-col gap-2 text-xs mt-0 lg:mt-0 sm:mt-0 sm:ml-[-10px]">
//               <Legend color="bg-blue-500" label={`Pending`} />
//               <Legend color="bg-purple-400" label={`On-going`} />
//               <Legend color="bg-teal-400" label={`Completed`} />
//               <Legend color="bg-orange-400" label={`Rejected`} />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Total value below from stats */}
//       <p className="text-sm italic text-left text-slate-500 mt-1.5 sm:ml-auto">
//         Total: {stats.total}
//       </p>
//     </div>
//   );
// }







"use client";

import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  Plugin,
} from "chart.js";
import { apiAuth } from "@/utils/apiHelpers";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MonthlyResearchDoughnut() {
  const [stats, setStats] = useState({
    pending: 0,
    ongoing: 0,
    completed: 0,
    rejected: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await apiAuth.get("/proposals");
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
          (p: any) => p.status === "Pending" || p.status === "New"
        ).length;
        const ongoing = thisMonth.filter(
          (p: any) => p.status === "Ongoing"
        ).length;
        const completed = thisMonth.filter(
          (p: any) => p.status === "Completed"
        ).length;
        const rejected = thisMonth.filter(
          (p: any) => p.status === "Rejected" || p.status === "Terminated"
        ).length;

        setStats({
          pending,
          ongoing,
          completed,
          rejected,
          total: pending + ongoing + completed + rejected,
        });
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <p>Loading...</p>;

  // Chart data
  const data: ChartData<"doughnut"> = {
    labels: ["Pending", "Ongoing", "Completed", "Rejected"],
    datasets: [
      {
        label: "Proposals",
        data: [stats.pending, stats.ongoing, stats.completed, stats.rejected],
        backgroundColor: ["#3b82f6", "#a78bfa", "#14b8a6", "#fb923c"],
        hoverOffset: 10,
        borderWidth: 1,
      },
    ],
  };

  // Plugin to show total in center
  const centerTextPlugin: Plugin<"doughnut"> = {
    id: "centerText",
    afterDraw: (chart) => {
      const {
        ctx,
        chartArea: { width, height },
      } = chart;
      ctx.save();
      ctx.font = "bold 18px sans-serif";
      ctx.fillStyle = "#374151"; // slate-700
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(stats.total.toString(), width / 2, height / 2);
    },
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    cutout: "75%", // thinner ring
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 9,
          boxWidth: 8,
          boxHeight: 7,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.label}: ${context.raw}`,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-full mx-auto">
      <div className="w-full sm:w-auto text-center sm:text-left">
        <p className="text-xs lg:text-sm font-medium text-slate-600 mb-1">
          Monthly Research Analytics
        </p>
        <p className="text-[12px] mb-2 italic text-slate-500 mt-1 sm:ml-auto">
          (Updated as of{" "}
          {new Date().toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
          )
        </p>
      </div>
      <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
    </div>
  );
}