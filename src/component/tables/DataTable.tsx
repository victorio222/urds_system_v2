'use client';
import React from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

export interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  title?: string;
  columns?: Column<T>[];
  data: T[];
  keyField?: keyof T;
}

function DataTable<T extends Record<string, any>>({
  title = 'Data Table',
  columns,
  data,
  keyField,
}: DataTableProps<T>) {
  const headers: Column<T>[] =
    columns ??
    (data.length > 0
      ? (Object.keys(data[0]).map((key) => ({
          header: key,
          accessor: key as keyof T,
        })) as Column<T>[])
      : []);

  return (
    <div className="w-full space-y-5">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-blue-700">{title}</h2>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              {headers.map((col) => (
                <th
                  key={String(col.accessor)}
                  className="px-4 py-2 font-medium capitalize"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={keyField ? String(row[keyField]) : index}
                className="border-b hover:bg-gray-50 odd:bg-white even:bg-gray-50"
              >
                {headers.map((col) => (
                  <td key={String(col.accessor)} className="px-4 py-2">
                    {col.render
                      ? col.render(row[col.accessor], row)
                      : String(row[col.accessor])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Static Pagination */}
      <div className="flex justify-center items-center space-x-2">
        <button
          aria-label="Previous page"
          className="p-2 border rounded hover:bg-gray-100"
        >
          <LuChevronLeft />
        </button>

        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className="px-3 py-1 border rounded hover:bg-blue-50 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {page}
          </button>
        ))}

        <button
          aria-label="Next page"
          className="p-2 border rounded hover:bg-gray-100"
        >
          <LuChevronRight />
        </button>
      </div>
    </div>
  );
}

export default DataTable;
