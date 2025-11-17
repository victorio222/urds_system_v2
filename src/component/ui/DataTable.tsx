"use client";

import React from "react";

interface Column<T> {
  field?: keyof T; // optional field
  headerName: string;
  width?: string | number;
  render?: (row: T) => React.ReactNode; // optional custom render
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  pageSize?: number;
  checkboxSelection?: boolean;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  rows,
  pageSize = 5,
  checkboxSelection = false,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto border rounded-lg shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {checkboxSelection && (
              <th className="p-2">
                <input type="checkbox" />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={String(col.field ?? col.headerName)}
                style={{ width: col.width }}
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (checkboxSelection ? 1 : 0)}
                className="px-4 py-2 text-center text-sm text-gray-500"
              >
                No Data
              </td>
            </tr>
          )}
          {rows.slice(0, pageSize).map((row) => (
            <tr key={row.id}>
              {checkboxSelection && (
                <td className="p-2 text-center">
                  <input type="checkbox" />
                </td>
              )}
              {columns.map((col) => (
                <td
                  key={String(col.field ?? col.headerName)}
                  className="px-4 py-2 whitespace-nowrap text-sm text-gray-700"
                >
                  {col.render
                    ? col.render(row)
                    : col.field !== undefined && row[col.field] != null
                    ? String(row[col.field])
                    : "No Data"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
