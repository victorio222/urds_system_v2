"use client";
import Button from "@/component/ui/Button";
import Modal from "@/component/ui/Modal";
import Table from "@/component/ui/Table";
import React, { useState } from "react";
import { BiSolidFilterAlt, BiSolidPlusCircle, BiEdit, BiTrash } from "react-icons/bi";

interface Announcement {
  id: number;
  title: string;
  description: string;
  dateCreated: string;
  validUntil: string;
  status: "Active" | "Expired" | "Draft";
  action?: React.ReactNode; // virtual field for Action column
}

const AnnouncementPage = () => {
  const data: Announcement[] = [
    {
      id: 1,
      title: "Call for Research Proposals",
      description:
        "We invite researchers to submit proposals for upcoming internal studies in plant sciences.",
      dateCreated: "2025-11-01",
      validUntil: "2025-12-15",
      status: "Active",
    },
    {
      id: 2,
      title: "In-House Review Started",
      description:
        "The in-house review of the greenhouse management protocols has officially started.",
      dateCreated: "2025-11-10",
      validUntil: "2025-11-30",
      status: "Active",
    },
    {
      id: 3,
      title: "System Maintenance Notification",
      description:
        "Scheduled maintenance of the plant tracking system next week.",
      dateCreated: "2025-10-28",
      validUntil: "2025-11-20",
      status: "Expired",
    },
  ];

  const columns: Array<{
    key: keyof Announcement;
    header: string;
    render?: (value: any, row: Announcement) => React.ReactNode;
    width?: string;
    align?: "left" | "center";
  }> = [
    { key: "id", header: "#", width: "50px", align: "center" },
    { key: "title", header: "Title", align: "left", width: "220px" },
    { key: "description", header: "Description", width: "350px", align: "left" },
    { key: "dateCreated", header: "Date Created", align: "center" },
    { key: "validUntil", header: "Valid Until", align: "center" },
    {
      key: "status",
      header: "Status",
      align: "center",
      render: (value: Announcement["status"]) => {
        let color = "";
        switch (value) {
          case "Active":
            color = "bg-green-500";
            break;
          case "Expired":
            color = "bg-red-500";
            break;
          case "Draft":
            color = "bg-yellow-500";
            break;
        }
        return (
          <div className="flex items-center justify-center gap-2">
            <span className={`w-3 h-3 rounded-full ${color}`}></span>
            <span>{value}</span>
          </div>
        );
      },
    },
    {
      key: "action",
      header: "Action",
      align: "center",
      render: (_, row) => (
        <div className="flex gap-2 justify-center">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-1 rounded">
            <BiEdit size={16} />
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white p-1 rounded">
            <BiTrash size={16} />
          </button>
        </div>
      ),
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-4 mt-[-10px]">
      {/* Top Navigation */}
      <nav className="flex justify-end">
        <div className="bg-white p-2 rounded-4xl shadow-xs inline-flex space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            type="submit"
            className="text-sm flex items-center px-2 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
          >
            <span className="pr-1 text-xl">
              <BiSolidPlusCircle />
            </span>
            Create Announcement
          </button>

          <div className="text-sm text-slate-500 flex items-center font-medium">
            <span className="pr-2 text-xl">
              <BiSolidFilterAlt color="gray" />
            </span>
            <p>More Filters</p>
          </div>
        </div>
      </nav>

      {/* Table */}
      <Table<Announcement> columns={columns} data={data} />

      {/* Modal */}
            <Modal
              opened={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Assign Project"
            >
              {/* Modal Content Here */}
              <div className="space-y-3">
                <p className="text-gray-700">
                  Add your modal content here, like inputs or forms.
                </p>

                <input
                  type="text"
                  placeholder="Project title"
                  className="w-full border px-3 py-2 rounded"
                />

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </Modal>
    </div>
  );
};

export default AnnouncementPage;
