'use client';
import React, { ReactNode } from 'react';

interface TableColumn<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
}

const Table = <T extends { id: number | string }>({ columns, data }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-sm mt-4">
      <table className="min-w-full text-sm text-left text-gray-500">
        <thead className="text-[11px] text-gray-700 uppercase bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col.key as string} className="px-6 py-3">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='text-xs text-gray-600'>
          {data.map((row) => (
            <tr key={row.id} className="bg-white border-b border-gray-300 hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key as string} className="px-6 py-2">
                  {col.render
                    ? col.render(row[col.key], row)
                    : (row[col.key] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
