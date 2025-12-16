// "use client";

// import React, { useEffect, useState } from "react";
// import { Doughnut } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   ChartOptions,
//   ChartData,
//   Plugin,
// } from "chart.js";
// import { apiAuth } from "@/utils/apiHelpers";

// ChartJS.register(ArcElement, Tooltip, Legend);

// export default function MonthlyResearchDoughnut() {
//   const [stats, setStats] = useState({
//     pending: 0,
//     ongoing: 0,
//     completed: 0,
//     rejected: 0,
//     total: 0,
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
//           pending,
//           ongoing,
//           completed,
//           rejected,
//           total: pending + ongoing + completed + rejected,
//         });
//       } catch (err) {
//         console.error("Failed to fetch data", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAnalytics();
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   // Chart data
//   const data: ChartData<"doughnut"> = {
//     labels: ["Pending", "Ongoing", "Completed", "Rejected"],
//     datasets: [
//       {
//         label: "Proposals",
//         data: [stats.pending, stats.ongoing, stats.completed, stats.rejected],
//         backgroundColor: ["#3b82f6", "#a78bfa", "#14b8a6", "#fb923c"],
//         hoverOffset: 10,
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Plugin to show total in center
//   const centerTextPlugin: Plugin<"doughnut"> = {
//     id: "centerText",
//     afterDraw: (chart) => {
//       const {
//         ctx,
//         chartArea: { width, height },
//       } = chart;
//       ctx.save();
//       ctx.font = "bold 18px sans-serif";
//       ctx.fillStyle = "#374151"; // slate-700
//       ctx.textAlign = "center";
//       ctx.textBaseline = "middle";
//       ctx.fillText(stats.total.toString(), width / 2, height / 2);
//     },
//   };

//   const options: ChartOptions<"doughnut"> = {
//     responsive: true,
//     cutout: "75%", // thinner ring
//     plugins: {
//       legend: {
//         position: "bottom",
//         labels: {
//           usePointStyle: true,
//           pointStyle: "circle",
//           padding: 9,
//           boxWidth: 8,
//           boxHeight: 7,
//         },
//       },
//       tooltip: {
//         callbacks: {
//           label: (context: any) => `${context.label}: ${context.raw}`,
//         },
//       },
//     },
//   };

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-full mx-auto">
//       <div className="w-full sm:w-auto text-center sm:text-left">
//         <p className="text-xs lg:text-sm font-medium text-slate-600 mb-1">
//           Monthly Research Analytics
//         </p>
//         <p className="text-[12px] mb-2 italic text-slate-500 mt-1 sm:ml-auto">
//           (Updated as of{" "}
//           {new Date().toLocaleString("default", {
//             month: "long",
//             year: "numeric",
//           })}
//           )
//         </p>
//       </div>
//       <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
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

// Separate Skeleton Component for better readability
const ChartSkeleton = () => (
  <div className="bg-white p-4 rounded-lg shadow-lg w-full animate-pulse">
    {/* Header Skeleton */}
    <div className="mb-4">
      <div className="h-4 w-40 bg-slate-200 rounded mb-2"></div>
      <div className="h-3 w-32 bg-slate-100 rounded"></div>
    </div>
    
    {/* Doughnut Circle Skeleton */}
    <div className="relative flex justify-center items-center py-4">
      <div className="w-48 h-48 rounded-full border-[16px] border-slate-100 flex items-center justify-center">
        <div className="h-6 w-8 bg-slate-200 rounded"></div>
      </div>
    </div>

    {/* Legend Skeleton */}
    <div className="flex justify-center gap-4 mt-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-slate-200"></div>
          <div className="h-2 w-12 bg-slate-100 rounded"></div>
        </div>
      ))}
    </div>
  </div>
);

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

  // Return the skeleton while loading
  if (loading) return <ChartSkeleton />;

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

  const centerTextPlugin: Plugin<"doughnut"> = {
    id: "centerText",
    afterDraw: (chart) => {
      const {
        ctx,
        chartArea: { width, height, top, left },
      } = chart;
      ctx.save();
      ctx.font = "bold 18px sans-serif";
      ctx.fillStyle = "#374151";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      // Using absolute center of the chart area
      ctx.fillText(stats.total.toString(), left + width / 2, top + height / 2);
      ctx.restore();
    },
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: "75%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 15,
          boxWidth: 8,
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
        <p className="text-[12px] mb-2 italic text-slate-500 mt-1">
          (Updated as of{" "}
          {new Date().toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
          )
        </p>
      </div>
      <div className="relative">
        <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
      </div>
    </div>
  );
}