import React from "react";

// Sample data
const stats = {
  total: 100,
  pending: 25,
  ongoing: 25,
  completed: 40,
  rejected: 10,
};

function ProgressRing() {
  const { pending, ongoing, completed, rejected, total } = stats;
  const data = [
    { value: pending, color: "#3b82f6" },
    { value: ongoing, color: "#a78bfa" },
    { value: completed, color: "#14b8a6" },
    { value: rejected, color: "#fb923c" },
  ];
  const radius =  70;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  // Ring Segments
  return (
    <svg width="180" height="180" className="block mx-auto " >
      {data.map((d, idx) => {
        const percent = d.value / total;
        const arcLength = percent * circumference;
        const dashArray = `${arcLength},${circumference - arcLength}`;
        const segment = (
          <circle
            key={idx}
            r={radius}
            cx="90"
            cy="90"
            fill="none"
            stroke={d.color}
            strokeWidth="12"
            strokeDasharray={dashArray}
            strokeDashoffset={-offset}
             style={{ transition: "stroke-dashoffset 1s" }}
          />
        );
        offset += arcLength;
        return segment;
      })}
      <text
        x="90"
        y="100"
        textAnchor="middle"
        fontSize="28"
        fontWeight="bold"
        fill="#22223b"
      >
        {total}
      </text>
    </svg>
  );
}

function MonthlyResearchAnalytics() {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 w-85 flex flex-col items-center">
      <div className="text-lg font-semibold text-black mb-5">
        Monthly Research Analytics
      </div>
      <div className="flex flex-row items-center gap-3"> 
      
        <ProgressRing />
       
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
            <span className="text-blue-500 font-medium">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-400 inline-block"></span>
            <span className="text-purple-500 font-medium">On-going</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-teal-400 inline-block"></span>
            <span className="text-teal-400 font-medium">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-400 inline-block"></span>
            <span className="text-orange-400 font-medium">Rejected</span>
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-400 mt-5 text-center">
        (Updated as of October 2025)
      </div>
    </div>
  );
}


export default MonthlyResearchAnalytics;
