"use client";

import React, { useState } from "react";
import Table from "@/component/ui/Table";
import { BiSolidFilterAlt, BiSolidPlusCircle } from "react-icons/bi";
import ActionDropdown from "../action/ActionDropdown";
import Dropdown, { DropdownItem } from "@/component/ui/Dropdown"; // Adjust path

interface ResearchProject {
  id: number;
  title: string;
  researcher: string;
  commodity: string;
  dateSubmitted: string;
  status: "Endorsed" | "Pending";
  action?: React.ReactNode;
}

type ColumnKey = keyof ResearchProject | "action";

const EndorsementPage = () => {
  const data: ResearchProject[] = [
    {
      id: 1,
      title: "Plant Growth Study",
      researcher: "Dr. Alice",
      commodity: "Main",
      dateSubmitted: "Science",
      status: "Endorsed",
    },
    {
      id: 2,
      title: "Soil Analysis",
      researcher: "Dr. Bob",
      commodity: "West",
      dateSubmitted: "Agriculture",
      status: "Endorsed",
    },
    {
      id: 3,
      title: "Genetic Research",
      researcher: "Dr. Carol",
      commodity: "Main",
      dateSubmitted: "Biotech",
      status: "Pending",
    },
    {
      id: 4,
      title: "Water Quality Study",
      researcher: "Dr. Dave",
      commodity: "East",
      dateSubmitted: "Environment",
      status: "Pending",
    },
  ];

  const [year, setYear] = useState(2025);
  const [status, setStatus] = useState("All");

  const columns: Array<{
    key: ColumnKey;
    header: string;
    render?: (value: any, row: ResearchProject) => React.ReactNode;
    align?: "left" | "center";
    width?: string;
  }> = [
    { key: "id", header: "#", align: "center", width: "60px" },
    { key: "title", header: "Title", align: "left" },
    { key: "researcher", header: "Researcher", align: "left" },
    { key: "commodity", header: "Commodity", align: "center" },
    { key: "dateSubmitted", header: "Date Submitted", align: "center" },
    {
      key: "status",
      header: "Status",
      align: "center",
      render: (value: ResearchProject["status"]) => {
        const styleMap = {
          Endorsed: "bg-blue-100 text-blue-700",
          Pending: "bg-yellow-100 text-yellow-700",
        };
        return (
          <span
            className={`inline-block px-3 py-1 rounded-full font-medium select-none ${styleMap[value]}`}
          >
            {value}
          </span>
        );
      },
    },
    {
      key: "action",
      header: "Action",
      align: "center",
      width: "60px",
      render: (_, row) => (
        <ActionDropdown
          onView={() => alert(`View ${row.title}`)}
          onApprove={() => alert(`Endorsed ${row.title}`)}
          onRequest={() => alert(`Return for Revision ${row.title}`)}
        />
      ),
    },
  ];

  // Dropdown items
  const yearItems: DropdownItem[] = [2023, 2024, 2025, 2026, 2027].map((y) => ({
    label: y.toString(),
    onClick: () => setYear(y),
  }));

  const statusItems: DropdownItem[] = [
    "All",
    "Endorsed",
    "Pending",
  ].map((s) => ({
    label: s,
    onClick: () => setStatus(s),
  }));

  return (
    <div className="space-y-4 mt-[-10px] w-full">
      {/* Top Navigation */}
      <div className="max-w-full flex justify-end mb-[-5px]">
        <div className="inline-flex justify-end bg-white p-2 pr-5 rounded-full shadow space-x-4">
          <div className="flex items-center">
            <Dropdown buttonContent={`Year: ${year}`} items={yearItems} />
            <Dropdown buttonContent={`Status: ${status}`} items={statusItems} />
          </div>

          <div className="flex items-center text-sm text-slate-500 font-medium cursor-pointer select-none">
            <BiSolidFilterAlt className="mr-2 text-xl" />
            More Filters
          </div>
        </div>
      </div>

      {/* Table */}
      <Table<ResearchProject> columns={columns} data={data} />
    </div>
  );
};

export default EndorsementPage;
