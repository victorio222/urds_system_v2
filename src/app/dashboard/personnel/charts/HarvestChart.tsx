'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

// Sample harvest data
const sampleData = [
  { month: 'Jan', harvestKg: 120 },
  { month: 'Feb', harvestKg: 145 },
  { month: 'Mar', harvestKg: 160 },
  { month: 'Apr', harvestKg: 180 },
  { month: 'May', harvestKg: 155 },
  { month: 'Jun', harvestKg: 170 },
  { month: 'Jul', harvestKg: 165 },
  { month: 'Aug', harvestKg: 175 },
  { month: 'Sep', harvestKg: 190 },
  { month: 'Oct', harvestKg: 185 },
  { month: 'Nov', harvestKg: 200 },
  { month: 'Dec', harvestKg: 195 },
];

const MONTH_ORDER = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MonthlyHarvestChart = () => {
  const year = new Date().getFullYear();

  // Ensure data is complete from Jan to Dec
  const completeData = MONTH_ORDER.map(month => {
    const found = sampleData.find(d => d.month === month);
    return found || { month, harvestKg: 0 };
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm w-full">
      <h2 className="text-sm text-gray-600 mb-4">Harvest by Month — {year}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={completeData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value: number) => [`${value} kg`, 'Harvest']} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar
            dataKey="harvestKg"
            fill="#34d399"
            name="Harvest (kg)"
            radius={[4, 4, 0, 0]}
            barSize={24}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyHarvestChart;