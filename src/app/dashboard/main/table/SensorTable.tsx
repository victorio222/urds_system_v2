'use client';
import Table from '@/component/ui/Table';
import React from 'react';

interface Sensor {
  id: number;
  name: string;
  location: string;
  status: 'Active' | 'Inactive';
}

const SensorTable = () => {
  const data: Sensor[] = [
    { id: 1, name: 'Soil Moisture', location: 'Greenhouse A', status: 'Active' },
    { id: 2, name: 'Temperature', location: 'Hydroponic Bay', status: 'Inactive' },
    { id: 3, name: 'pH Sensor', location: 'Tank A', status: 'Active' },
  ];

  // 👇 Tell TS explicitly this is TableColumn<Sensor>[]
  const columns: { key: keyof Sensor; header: string; render?: (value: any, row: Sensor) => React.ReactNode }[] = [
    {
      key: 'name',
      header: 'Sensor Name',
    },
    {
      key: 'location',
      header: 'Location',
    },
    {
      key: 'status',
      header: 'Status',
      render: (value: Sensor['status']) => (
        <span className={`font-semibold ${value === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
          {value}
        </span>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-700">Registered Sensors</h2>
      <Table<Sensor> columns={columns} data={data} />
    </div>
  );
};

export default SensorTable;