"use client";

import React, { useState } from "react";
import Table from "@/component/ui/Table";
import { BiSolidFilterAlt } from "react-icons/bi";
import Dropdown, { DropdownItem } from "@/component/ui/Dropdown";
import EvaluationHistory from "../page";

interface BatchEntry {
  id: number;
  batchId: string;
  title: string;
  researcher: string;
  commodity: string;
  dateEvaluated: string;
  status: "Continuation" | "Terminated";
}

type ColumnKey = keyof BatchEntry | "checkbox" | "action";

const EvaluationHistoryPage = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // 🚀 NEW DATA
  const data: BatchEntry[] = [
    {
      id: 1,
      batchId: "EV-001",
      title: "Rice",
      researcher: "Dr. Kim",
      commodity: "Natural Sciences",
      dateEvaluated: "01-01-2025",
      status: "Terminated",
    },
    {
      id: 2,
      batchId: "EV-002",
      title: "Corn",
      researcher: "Dr. Smith",
      commodity: "Education",
      dateEvaluated: "01-03-2025",
      status: "Continuation",
    },
    {
      id: 3,
      batchId: "EV-003",
      title: "Vegetables",
      researcher: "Prof. John Lee Indino, PhD",
      commodity: "Science",
      dateEvaluated: "01-06-2025",
      status: "Terminated",
    },
  ];

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const [year, setYear] = useState(2025);
  const [status, setStatus] = useState("All Proposal");

  const columns = [
    {
      key: "checkbox" as ColumnKey,
      header: (
        <input
          type="checkbox"
          checked={selectAll}
          onChange={toggleSelectAll}
          className="w-4 h-4 cursor-pointer"
        />
      ),
      align: "center",
      width: "40px",
      render: (_: any, row: BatchEntry) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(row.id)}
          onChange={() => toggleRow(row.id)}
          className="w-4 h-4 cursor-pointer"
        />
      ),
    },
    { key: "batchId", header: "Batch ID", align: "left" },
    { key: "title", header: "Title", align: "left" },
    { key: "researcher", header: "Researcher", align: "center" },
    { key: "commodity", header: "Commodity/Unit", align: "center" },
    { key: "dateEvaluated", header: "Date Evaluated", align: "center" },
    {
      key: "status",
      header: "Status",
      align: "center",
      render: (value: BatchEntry["status"]) => {
        const styleMap = {
          Terminated: "bg-red-100 text-red-700",
          Continuation: "bg-blue-100 text-blue-700",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${styleMap[value]}`}
          >
            {value}
          </span>
        );
      },
    },
  ];

  const yearItems: DropdownItem[] = [2023, 2024, 2025, 2026, 2027].map((y) => ({
    label: y.toString(),
    onClick: () => setYear(y),
  }));

  const statusItems: DropdownItem[] = [
    "All Proposal",
    "Completed",
    "Pending",
    "Ongoing",
    "Terminated",
  ].map((s) => ({
    label: s,
    onClick: () => setStatus(s),
  }));

  return (
    <div className="space-y-4 mt-[-10px] w-full">
      {/* Top Navigation */}
      <div className="max-w-full flex justify-end mb-[-5px]">
        <div className="inline-flex justify-end bg-white p-2 pr-5 rounded-full shadow space-x-4">
          <div className="flex items-center space-x-3">
            <Dropdown buttonContent={`Year: ${year}`} items={yearItems} />
            <Dropdown buttonContent={`Status: ${status}`} items={statusItems} />
          </div>

          <div className="flex items-center text-sm text-slate-500 font-medium cursor-pointer select-none">
            <BiSolidFilterAlt className="mr-2 text-xl" />
            More Filters
          </div>
        </div>
      </div>

      <Table columns={columns as any} data={data} />
    </div>
  );
};

export default EvaluationHistoryPage;
