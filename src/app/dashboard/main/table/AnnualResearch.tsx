// import React from "react";

// // Define the data type for better type safety
// interface YearlyData {
//   year: number;
//   submitted: number;
//   approved: number;
//   completed: number;
//   rejected: number;
// }

// // Sample data with type annotation
// const yearlyTrend: YearlyData[] = [
//   { year: 2021, submitted: 20, approved: 15, completed: 9, rejected: 5 },
//   { year: 2022, submitted: 22, approved: 20, completed: 17, rejected: 6 },
//   { year: 2023, submitted: 20, approved: 17, completed: 17, rejected: 4 },
//   { year: 2024, submitted: 26, approved: 21, completed: 21, rejected: 7 },
//   { year: 2025, submitted: 24, approved: 23, completed: 21, rejected: 5 },
// ];

// // Chart configuration
// const chartWidth = 900;
// const chartHeight = 200;
// const padding = 30;
// const maxValue = 30;
// const minValue = 0;

// // Define line types excluding 'year'
// type LineKey = keyof Omit<YearlyData, 'year'>;

// const lines: { key: LineKey; color: string; label: string }[] = [
//   { key: "submitted", color: "#a78bfa", label: "Submitted" },
//   { key: "approved", color: "#fb7185", label: "Approved" },
//   { key: "completed", color: "#14b8a6", label: "Completed" },
//   { key: "rejected", color: "#fb923c", label: "Rejected" },
// ];

// function AnnualResearchActivityTrend() {
//   // Responsive scaling
//   const aspect = chartWidth / chartHeight;
//   const xStep = (chartWidth - padding * 2) / (yearlyTrend.length - 1);
//   const yScale = (chartHeight - padding * 2) / (maxValue - minValue);

//   const getX = (index: number) => padding + index * xStep;
//   const getY = (value: number) =>
//     chartHeight - padding - (value - minValue) * yScale;

//   // Line path function
//   const generatePath = (key: LineKey) =>
//     yearlyTrend
//       .map((d, i) => {
//         const x = getX(i);
//         const y = getY(d[key]);
//         return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
//       })
//       .join(" ");

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 w-full max-h-xs">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold text-gray-800">
//           Annual Research Activity Trend
//         </h2>
//         <div className="flex gap-8 text-sm">
//           {lines.map((line) => (
//             <div key={line.key} className="flex items-center gap-2">
//               <svg width="20" height="8" className="inline-block">
//                 <circle cx="4" cy="4" r="3" fill={line.color} />
//                 <line
//                   x1="8"
//                   y1="4"
//                   x2="20"
//                   y2="4"
//                   stroke={line.color}
//                   strokeWidth="2"
//                 />
//               </svg>
//               <span style={{ color: line.color }} className="font-medium">
//                 {line.label}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//       <svg
//         width="100%"
//         height="250"
//         viewBox={`0 0 ${chartWidth} ${chartHeight}`}
//         preserveAspectRatio="xMidYMid meet"
//         className="w-full"
//       >
//         {/* Horizontal Grid lines */}
//         {[0, 5, 10, 15, 20, 25, 30].map((value) => (
//           <g key={value}>
//             <line
//               x1={padding}
//               y1={getY(value)}
//               x2={chartWidth - padding}
//               y2={getY(value)}
//               stroke="#e5e7eb"
//               strokeWidth="1.5"
//               strokeDasharray="3,3"
//             />
//             <text
//               x={padding - 10}
//               y={getY(value) + 4}
//               textAnchor="end"
//               fontSize="12"
//               fill="#9ca3af"
//             >
//               {value}
//             </text>
//           </g>
//         ))}

//         {/* Vertical year column dividers */}
//         {yearlyTrend.map((d, i) => {
//           const x = getX(i);
//           return (
//             <line
//               key={d.year}
//               x1={x}
//               y1={padding - 10}
//               x2={x}
//               y2={chartHeight - padding + 10}
//               stroke="#ede9fe"
//               strokeWidth="1.5"
//               strokeDasharray="3,3"
//             />
//           );
//         })}

//         {/* Lines */}
//         {lines.map((line) => (
//           <path
//             key={line.key}
//             d={generatePath(line.key)}
//             fill="none"
//             stroke={line.color}
//             strokeWidth="2.5"
//             opacity="0.8"
//           />
//         ))}

//         {/* Data points and labels */}
//         {yearlyTrend.map((data, index) => {
//           const x = getX(index);
//           return (
//             <g key={data.year}>
//               {/* Year label */}
//               <text
//                 x={x}
//                 y={chartHeight - padding + 30}
//                 textAnchor="middle"
//                 fontSize="14"
//                 fill="#6b7280"
//                 fontWeight="500"
//               >
//                 {data.year}
//               </text>
//               {/* Data points */}
//               {lines.map((line) => {
//                 const value = data[line.key];
//                 const y = getY(value);
//                 return (
//                   <g key={`${data.year}-${line.key}`}>
//                     <circle
//                       cx={x}
//                       cy={y}
//                       r="4"
//                       fill="white"
//                       stroke={line.color}
//                       strokeWidth="2"
//                     />
//                     <text
//                       x={x}
//                       y={y - 12}
//                       textAnchor="middle"
//                       fontSize="12"
//                       fill={line.color}
//                       fontWeight="600"
//                     >
//                       {value}
//                     </text>
//                   </g>
//                 );
//               })}
//             </g>
//           );
//         })}
//       </svg>
//     </div>
//   );
// }

// export default AnnualResearchActivityTrend;









// 'use client';

// import React, { useEffect, useState } from 'react';
// import { apiAuth } from '@/utils/apiHelpers';

// interface YearlyData {
//   year: number;
//   submitted: number;
//   approved: number;
//   completed: number;
//   rejected: number;
// }

// const chartWidth = 900;
// const chartHeight = 250;
// const padding = 30;

// type LineKey = keyof Omit<YearlyData, 'year'>;

// const lines: { key: LineKey; color: string; label: string }[] = [
//   { key: "submitted", color: "#a78bfa", label: "Submitted" },
//   { key: "approved", color: "#fb7185", label: "Approved" },
//   { key: "completed", color: "#14b8a6", label: "Completed" },
//   { key: "rejected", color: "#fb923c", label: "Rejected" },
// ];

// function AnnualResearchActivityTrend() {
//   const [yearlyTrend, setYearlyTrend] = useState<YearlyData[]>([]);
//   const [loading, setLoading] = useState(true);

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
//             submitted: proposalsThisYear.filter((p: any) => p.status === 'Draft' || p.status === 'Pending').length,
//             approved: proposalsThisYear.filter((p: any) => p.status === 'Submitted' || p.status === 'Approved').length,
//             completed: proposalsThisYear.filter((p: any) => p.status === 'Completed').length,
//             rejected: proposalsThisYear.filter((p: any) => p.status === 'Rejected' || p.status === 'Terminated').length,
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
//       <div className="bg-white rounded-xl shadow-md p-6 w-full max-h-xs text-center">
//         Loading annual research analytics...
//       </div>
//     );
//   }

//   // Compute scales
//   const allValues = yearlyTrend.flatMap(d => lines.map(l => d[l.key]));
//   const maxValue = Math.max(...allValues, 10); // fallback to 10
//   const minValue = 0;

//   const xStep = yearlyTrend.length > 1 ? (chartWidth - padding * 2) / (yearlyTrend.length - 1) : chartWidth - padding * 2;
//   const yScale = (chartHeight - padding * 2) / (maxValue - minValue);

//   const getX = (index: number) => padding + index * xStep;
//   const getY = (value: number) => chartHeight - padding - (value - minValue) * yScale;

//   const generatePath = (key: LineKey) =>
//     yearlyTrend.map((d, i) => {
//       const x = getX(i);
//       const y = getY(d[key]);
//       return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
//     }).join(' ');

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 w-full">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold text-gray-800">
//           Annual Research Activity Trend
//         </h2>
//         <div className="flex gap-8 text-sm">
//           {lines.map(line => (
//             <div key={line.key} className="flex items-center gap-2">
//               <svg width="20" height="8" className="inline-block">
//                 <circle cx="4" cy="4" r="3" fill={line.color} />
//                 <line x1="8" y1="4" x2="20" y2="4" stroke={line.color} strokeWidth="2" />
//               </svg>
//               <span style={{ color: line.color }} className="font-medium">
//                 {line.label}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <svg
//         width="100%"
//         height={chartHeight}
//         viewBox={`0 0 ${chartWidth} ${chartHeight}`}
//         preserveAspectRatio="xMidYMid meet"
//       >
//         {/* Horizontal grid lines */}
//         {[0, 5, 10, 15, 20, 25, 30].map(value => (
//           <g key={value}>
//             <line
//               x1={padding}
//               y1={getY(value)}
//               x2={chartWidth - padding}
//               y2={getY(value)}
//               stroke="#e5e7eb"
//               strokeWidth="1.5"
//               strokeDasharray="3,3"
//             />
//             <text
//               x={padding - 10}
//               y={getY(value) + 4}
//               textAnchor="end"
//               fontSize="12"
//               fill="#9ca3af"
//             >
//               {!isNaN(value) ? value : 0}
//             </text>
//           </g>
//         ))}

//         {/* Vertical year dividers */}
//         {yearlyTrend.map((d, i) => {
//           const x = getX(i);
//           return (
//             <line
//               key={d.year}
//               x1={x}
//               y1={padding - 10}
//               x2={x}
//               y2={chartHeight - padding + 10}
//               stroke="#ede9fe"
//               strokeWidth="1.5"
//               strokeDasharray="3,3"
//             />
//           );
//         })}

//         {/* Lines */}
//         {lines.map(line => (
//           <path
//             key={line.key}
//             d={generatePath(line.key)}
//             fill="none"
//             stroke={line.color}
//             strokeWidth="2.5"
//             opacity="0.8"
//           />
//         ))}

//         {/* Data points */}
//         {yearlyTrend.map((data, index) => {
//           const x = getX(index);
//           return (
//             <g key={data.year}>
//               <text
//                 x={x}
//                 y={chartHeight - padding + 25}
//                 textAnchor="middle"
//                 fontSize="14"
//                 fill="#6b7280"
//                 fontWeight="500"
//               >
//                 {data.year}
//               </text>
//               {lines.map(line => {
//                 const value = data[line.key];
//                 const y = getY(value);
//                 return (
//                   <g key={`${data.year}-${line.key}`}>
//                     <circle cx={x} cy={y} r="4" fill="white" stroke={line.color} strokeWidth="2" />
//                     <text
//                       x={x}
//                       y={y - 12}
//                       textAnchor="middle"
//                       fontSize="12"
//                       fill={line.color}
//                       fontWeight="600"
//                     >
//                       {!isNaN(value) ? value : 0}
//                     </text>
//                   </g>
//                 );
//               })}
//             </g>
//           );
//         })}
//       </svg>
//     </div>
//   );
// }

// export default AnnualResearchActivityTrend;









'use client';

import React, { useEffect, useState } from 'react';
import { apiAuth } from '@/utils/apiHelpers';

interface YearlyData {
  year: number;
  submitted: number;
  approved: number;
  completed: number;
  rejected: number;
}

const chartWidth = 900;
const chartHeight = 250;
const padding = 30;

type LineKey = keyof Omit<YearlyData, 'year'>;

const lines: { key: LineKey; color: string; label: string }[] = [
  { key: "submitted", color: "#a78bfa", label: "Submitted" },
  { key: "approved", color: "#fb7185", label: "Approved" },
  { key: "completed", color: "#14b8a6", label: "Completed" },
  { key: "rejected", color: "#fb923c", label: "Rejected" },
];

function AnnualResearchActivityTrend() {
  const [yearlyTrend, setYearlyTrend] = useState<YearlyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const res = await apiAuth.get('/proposals');
        const proposals = res.data;

        const currentYear = new Date().getFullYear();
        const last5Years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);

        const trendData: YearlyData[] = last5Years.map(year => {
          const proposalsThisYear = proposals.filter((p: any) => {
            const proposalYear = new Date(p.submissionDate).getFullYear();
            return proposalYear === year;
          });

          return {
            year,
            submitted: proposalsThisYear.filter((p: any) => p.status === 'Draft' || p.status === 'Pending').length,
            approved: proposalsThisYear.filter((p: any) => p.status === 'Submitted' || p.status === 'Approved').length,
            completed: proposalsThisYear.filter((p: any) => p.status === 'Completed').length,
            rejected: proposalsThisYear.filter((p: any) => p.status === 'Rejected' || p.status === 'Terminated').length,
          };
        });

        setYearlyTrend(trendData);
      } catch (err) {
        console.error('Failed to fetch proposals', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-h-xs text-center">
        Loading annual research analytics...
      </div>
    );
  }

  // Compute scales
  const allValues = yearlyTrend.flatMap(d => lines.map(l => d[l.key]));
  const maxValue = Math.max(...allValues, 10); // fallback to 10
  const minValue = 0;

  const xStep = yearlyTrend.length > 1 ? (chartWidth - padding * 2) / (yearlyTrend.length - 1) : chartWidth - padding * 2;
  const yScale = (chartHeight - padding * 2) / (maxValue - minValue);

  const getX = (index: number) => padding + index * xStep;
  const getY = (value: number) => chartHeight - padding - (value - minValue) * yScale;

  const generatePath = (key: LineKey) =>
    yearlyTrend.map((d, i) => {
      const x = getX(i);
      const y = getY(d[key]);
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(' ');

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Annual Research Activity Trend
        </h2>
        <div className="flex gap-8 text-sm">
          {lines.map(line => (
            <div key={line.key} className="flex items-center gap-2">
              <svg width="20" height="8" className="inline-block">
                <circle cx="4" cy="4" r="3" fill={line.color} />
                <line x1="8" y1="4" x2="20" y2="4" stroke={line.color} strokeWidth="2" />
              </svg>
              <span style={{ color: line.color }} className="font-medium">
                {line.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <svg
        width="100%"
        height={chartHeight}
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Horizontal grid lines */}
        {[0, 5, 10, 15, 20, 25, 30].map(value => (
          <g key={value}>
            <line
              x1={padding}
              y1={getY(value)}
              x2={chartWidth - padding}
              y2={getY(value)}
              stroke="#e5e7eb"
              strokeWidth="1.5"
              strokeDasharray="3,3"
            />
            <text
              x={padding - 10}
              y={getY(value) + 4}
              textAnchor="end"
              fontSize="12"
              fill="#9ca3af"
            >
              {!isNaN(value) ? value : 0}
            </text>
          </g>
        ))}

        {/* Vertical year dividers */}
        {yearlyTrend.map((d, i) => {
          const x = getX(i);
          return (
            <line
              key={d.year}
              x1={x}
              y1={padding - 10}
              x2={x}
              y2={chartHeight - padding + 10}
              stroke="#ede9fe"
              strokeWidth="1.5"
              strokeDasharray="3,3"
            />
          );
        })}

        {/* Lines */}
        {lines.map(line => (
          <path
            key={line.key}
            d={generatePath(line.key)}
            fill="none"
            stroke={line.color}
            strokeWidth="2.5"
            opacity="0.8"
          />
        ))}

        {/* Data points */}
        {yearlyTrend.map((data, index) => {
          const x = getX(index);
          return (
            <g key={data.year}>
              <text
                x={x}
                y={chartHeight - padding + 25}
                textAnchor="middle"
                fontSize="14"
                fill="#6b7280"
                fontWeight="500"
              >
                {data.year}
              </text>
              {lines.map(line => {
                const value = data[line.key];
                const y = getY(value);
                return (
                  <g key={`${data.year}-${line.key}`}>
                    <circle cx={x} cy={y} r="4" fill="white" stroke={line.color} strokeWidth="2" />
                    <text
                      x={x}
                      y={y - 12}
                      textAnchor="middle"
                      fontSize="12"
                      fill={line.color}
                      fontWeight="600"
                    >
                      {!isNaN(value) ? value : 0}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default AnnualResearchActivityTrend;
