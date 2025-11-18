'use client';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

interface GeneralAverageData {
  time: string;
  temperatureMin: number;
  temperatureMax: number;
  temperatureAvg: number;
  humidityMin: number;
  humidityMax: number;
  humidityAvg: number;
  phMin: number;
  phMax: number;
  phAvg: number;
}

const data: GeneralAverageData[] = [
  {
    time: '08:00',
    temperatureMin: 22,
    temperatureMax: 28,
    temperatureAvg: 25,
    humidityMin: 55,
    humidityMax: 65,
    humidityAvg: 60,
    phMin: 6.1,
    phMax: 6.4,
    phAvg: 6.25,
  },
  {
    time: '12:00',
    temperatureMin: 24,
    temperatureMax: 30,
    temperatureAvg: 27,
    humidityMin: 52,
    humidityMax: 63,
    humidityAvg: 58,
    phMin: 6.2,
    phMax: 6.5,
    phAvg: 6.35,
  },
  {
    time: '16:00',
    temperatureMin: 23,
    temperatureMax: 29,
    temperatureAvg: 26,
    humidityMin: 54,
    humidityMax: 62,
    humidityAvg: 58,
    phMin: 6.0,
    phMax: 6.3,
    phAvg: 6.2,
  },
];

const GeneralAverageChart = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-gray-600 text-sm mb-4">General Daily Averages</h2>
      <ResponsiveContainer width="100%" height={340}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: 10 }} />

          {/* Temperature bars */}
          <Bar dataKey="temperatureMin" fill="#fde68a" name="Temp Min (°C)" />
          <Bar dataKey="temperatureAvg" fill="#f97316" name="Temp Avg (°C)" />
          <Bar dataKey="temperatureMax" fill="#c2410c" name="Temp Max (°C)" />

          {/* Humidity bars */}
          <Bar dataKey="humidityMin" fill="#bfdbfe" name="Humidity Min (%)" />
          <Bar dataKey="humidityAvg" fill="#60a5fa" name="Humidity Avg (%)" />
          <Bar dataKey="humidityMax" fill="#1d4ed8" name="Humidity Max (%)" />

          {/* pH bars */}
          <Bar dataKey="phMin" fill="#bbf7d0" name="pH Min" />
          <Bar dataKey="phAvg" fill="#34d399" name="pH Avg" />
          <Bar dataKey="phMax" fill="#065f46" name="pH Max" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GeneralAverageChart;