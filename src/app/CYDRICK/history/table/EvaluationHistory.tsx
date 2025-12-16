"use client";

import React from "react";
import Table from "@/component/ui/Table";
import ActionDropdown from "../action/ActionDropdown";

interface BatchEntry {
  id: number;
  title: string;
  researcher: string;
  commodity: string;
  dateevaluated: string;
  status: "Completed" | "Terminated" | "Pending" | "Ongoing";
}

const EvaluationHistory = () => {
  // DATA ONLY
  const data: BatchEntry[] = [
    {
      id: 1,
      title: "Title 1",
      researcher: "Author 1",
      commodity: "Technological",
      dateevaluated: "01-01-2025",
      status: "Pending",
    },
    {
      id: 2,
      title: "Title 2",
      researcher: "Author 2",
      commodity: "Technological",
      dateevaluated: "02-01-2025",
      status: "Completed",
    },
    {
      id: 3,
      title: "Title 3",
      researcher: "Author 3",
      commodity: "Agricultural",
      dateevaluated: "03-01-2025",
      status: "Pending",
    },
    {
      id: 4,
      title: "Title 4",
      researcher: "Author 4",
      commodity: "Fisheries",
      dateevaluated: "04-01-2025",
      status: "Ongoing",
    },
    {
      id: 5,
      title: "Title 5",
      researcher: "Author 5",
      commodity: "Hospitality",
      dateevaluated: "05-01-2025",
      status: "Completed",
    },
    {
      id: 6,
      title: "Title 6",
      researcher: "Author 6",
      commodity: "Manufacturing",
      dateevaluated: "06-01-2025",
      status: "Terminated",
    },
    {
      id: 7,
      title: "Title 7",
      researcher: "Author 7",
      commodity: "Event Management",
      dateevaluated: "07-01-2025",
      status: "Pending",
    },
    {
      id: 8,
      title: "Title 8",
      researcher: "Author 8",
      commodity: "Community Development",
      dateevaluated: "08-01-2025",
      status: "Ongoing",
    },
    {
      id: 9,
      title: "Title 9",
      researcher: "Author 9",
      commodity: "Technological",
      dateevaluated: "09-01-2025",
      status: "Completed",
    },
    {
      id: 10,
      title: "Title 10",
      researcher: "Author 10",
      commodity: "Agricultural",
      dateevaluated: "10-01-2025",
      status: "Pending",
    },
    {
      id: 11,
      title: "Title 11",
      researcher: "Author 11",
      commodity: "Fisheries",
      dateevaluated: "11-01-2025",
      status: "Ongoing",
    },
    {
      id: 12,
      title: "Title 12",
      researcher: "Author 12",
      commodity: "Hospitality",
      dateevaluated: "12-01-2025",
      status: "Completed",
    },
    {
      id: 13,
      title: "Title 13",
      researcher: "Author 13",
      commodity: "Manufacturing",
      dateevaluated: "13-01-2025",
      status: "Terminated",
    },
    {
      id: 14,
      title: "Title 14",
      researcher: "Author 14",
      commodity: "Event Management",
      dateevaluated: "14-01-2025",
      status: "Pending",
    },
    {
      id: 15,
      title: "Title 15",
      researcher: "Author 15",
      commodity: "Community Development",
      dateevaluated: "15-01-2025",
      status: "Ongoing",
    },
  ];

  const columns = [
    { key: "id", header: "ID", align: "left" },
    { key: "title", header: "Title", align: "left" },
    { key: "researcher", header: "Researcher", align: "center" },
    { key: "commodity", header: "Commodity/Unit", align: "center" },
    { key: "dateevaluated", header: "Date Evaluated", align: "center" },
    {
      key: "status",
      header: "Status",
      align: "center",
      render: (value: BatchEntry["status"]) => {
        const styleMap = {
          Completed: "bg-green-100 text-green-700",
          Terminated: "bg-red-100 text-red-700",
          Pending: "bg-yellow-100 text-yellow-700",
          Ongoing: "bg-blue-100 text-blue-700",
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
    {
      key: "action",
      header: "Action",
      align: "center",
      width: "60px",
      render: (_: any, row: BatchEntry) => (
        <ActionDropdown
          onView={() => alert(`Viewing ${row.id}`)}
          onApprove={() => alert(`Approving ${row.id}`)}
          onRequest={() => alert(`Request for ${row.id}`)}
        />
      ),
    },
  ];

  return (
    <div className="space-y-4 w-full">
      <Table columns={columns as any} data={data} />
    </div>
  );
};

export default EvaluationHistory;
