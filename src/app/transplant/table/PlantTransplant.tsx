'use client';
import Button from '@/component/ui/Button';
import Table from '@/component/ui/Table';
import React from 'react';

interface TransplantProps {
  id: number;
  name: string;
  family: string;
  soil: string;
  days: string;
  type: string;
}

const PlantTransplant = () => {
  const data: TransplantProps[] = [
    { id: 1, name: 'Lettuce', family: 'Asteraceae', soil: 'Coco Peat', days: '30 - 45 days', type: 'Leafy plants' },
    { id: 2, name: 'Lettuce', family: 'Asteraceae', soil: 'Coco Peat', days: '30 - 45 days', type: 'Leafy plants' },
  ];

  // 👇 Tell TS explicitly this is TableColumn<Sensor>[]
  const columns: { key: keyof TransplantProps; header: string; render?: (value: any, row: TransplantProps) => React.ReactNode }[] = [
    {
      key: 'id',
      header: 'No',
    },
    {
      key: 'name',
      header: 'Sensor Name',
    },
    {
      key: 'family',
      header: 'Family',
    },
    {
      key: 'soil',
      header: 'Soil Type'
    },
    {
      key: 'days',
      header: 'Days Until Harvest',
    },
    {
      key: 'type',
      header: 'Plant Type',
    },
  ];

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center'>
        <h2 className="text-lg font-bold text-gray-700">Transplant Records</h2>
        <Button
          type='submit'
          className="text-xs px-2 py-2 bg-green-400 text-white rounded-sm hover:bg-green-500 transition"
        >
          Add New Transplant
        </Button>
      </div>
      <Table<TransplantProps> columns={columns} data={data} />
    </div>
  );
};

export default PlantTransplant;