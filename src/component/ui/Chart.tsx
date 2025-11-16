'use client';
import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from 'recharts';

type ChartType = 'line' | 'bar';

interface ChartProps<T extends object> {
  data: T[];
  dataKeys: { key: keyof T; color?: string; name?: string }[];
  xKey: keyof T;
  title?: string;
  chartType?: ChartType;
  height?: number;
}

const Chart = <T extends object>({
  data,
  dataKeys,
  xKey,
  title,
  chartType = 'line',
  height = 240,
}: ChartProps<T>) => {
  return (
    <div className="bg-white p-0 rounded-lg shadow-sm w-full">
      {title && (
        <div className="px-4 pt-4 pb-2">
          <h2 className="text-sm text-gray-600">{title}</h2>
        </div>
      )}

      <ResponsiveContainer width="100%" height={height}>
        {chartType === 'line' ? (
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, bottom: 10, left: -22 }}
          >
            <CartesianGrid strokeDasharray="2 3" vertical={false} />
            <XAxis
              dataKey={xKey as string}
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]} // <-- Force full height from 0 to 100
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{ fontSize: 12 }}
              labelStyle={{ fontSize: 12 }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ fontSize: 9 }}
              content={({ payload }) => (
                <ul className="flex gap-4 justify-center text-xs mt-2 ml-17">
                  {payload?.map((entry, index) => (
                    <li key={`item-${index}`} className="flex items-center gap-1">
                      <span
                        style={{
                          display: 'inline-block',
                          width: 10,
                          height: 10,
                          backgroundColor: entry.color,
                          borderRadius: '50%',
                        }}
                      ></span>
                      <span style={{ color: entry.color }}>{entry.value}</span>
                    </li>
                  ))}
                </ul>
              )}
            />

            {dataKeys.map(({ key, color, name }) => (
              <Line
                key={String(key)}
                type="monotone"
                dataKey={key as string}
                stroke={color || '#10b981'}
                name={name || String(key)}
                strokeWidth={1}
                dot={false} // <-- Remove circle dots
                activeDot={false} // <-- Remove hover dots
              />
            ))}
          </LineChart>
        ) : (
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, bottom: 10, left: -29 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey={xKey as string}
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{ fontSize: 12 }}
              labelStyle={{ fontSize: 12 }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ fontSize: 12 }}
            />
            {dataKeys.map(({ key, color, name }) => (
              <Bar
                key={String(key)}
                dataKey={key as string}
                fill={color || '#10b981'}
                name={name || String(key)}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
