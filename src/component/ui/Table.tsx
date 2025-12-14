'use client';
import React, { ReactNode, useState } from 'react';
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';

interface TableColumn<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
  width?: string; // optional width for column
  align?: 'left' | 'center' | 'right'; // optional alignment
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
}

const Table = <T extends { id: number | string }>({
  columns,
  data,
  rowsPerPageOptions = [5, 10, 20],
  defaultRowsPerPage = 5,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const currentData = data.slice(startIdx, endIdx);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-sm mt-2">
      <table className="min-w-full text-sm text-gray-500">
        <thead className="text-sm text-gray-700 uppercase bg-white border-b border-gray-300">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={col.key as string}
                className={`px-6 pb-2 ${
                  idx < 3 ? 'text-left' : 'text-center'
                }`}
                style={{ width: col.width }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm text-gray-600 font-medium">
          {currentData.map((row) => (
            <tr key={row.id} className="bg-white border-b border-gray-300 hover:bg-blue-50">
              {columns.map((col, idx) => (
                <td
                  key={col.key as string}
                  className={`px-6 py-1.5 ${
                    idx < 3 ? 'text-left' : 'text-center'
                  }`}
                  style={{ width: col.width }}
                >
                  {col.render ? col.render(row[col.key], row) : (row[col.key] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-2 px-4 py-2 bg-gray-50 rounded-b font-medium">
        <div className="flex items-center gap-2 text-xs">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="border rounded px-2 py-1 text-xs border-none"
          >
            {rowsPerPageOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded bg-gray-200 disabled:opacity-50 flex items-center"
          >
            <span className='text-lg pr-1'>
              <BiSkipPrevious />
            </span>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded bg-gray-200 disabled:opacity-50 flex items-center"
          >
            Next
            <span className='text-lg pl-1'>
              <BiSkipNext />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
