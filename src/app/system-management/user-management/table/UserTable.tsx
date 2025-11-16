'use client';

import React from 'react';
import DataTable, { Column } from '@/component/tables/DataTable';

interface User {
  id: number;
  name: string;
  position: string;
  status: 'active' | 'inactive';
}

const users: User[] = [
  { id: 1, name: 'Alice Johnson', position: 'Manager', status: 'active' },
  { id: 2, name: 'Bob Smith', position: 'Developer', status: 'inactive' },
  { id: 3, name: 'Carol White', position: 'Designer', status: 'active' },
];

const UserTable = () => {
  const columns: Column<User>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Position', accessor: 'position' },
    {
      header: 'Status',
      accessor: 'status',
      render: (value) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${
            value === 'active'
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-red-100 text-red-700 border border-red-200'
          } capitalize`}
        >
          {value}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: 'actions' as keyof User, // 👈 unique accessor
      render: (_, row: User) => (
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition">
            Edit
          </button>
          <button className="px-3 py-1.5 text-xs font-medium text-red-500 border border-red-300 rounded-md hover:bg-red-50 focus:ring-2 focus:ring-red-200 transition">
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">
        👥 User Management
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Manage your team members and update their roles or status easily.
      </p>

      <DataTable<User> title="" columns={columns} data={users} keyField="id" />
    </div>
  );
};

export default UserTable;