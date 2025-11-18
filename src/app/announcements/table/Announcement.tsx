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

        <Modal
  opened={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Create Announcement" // Title ng Modal
>
  {/* Modal Content Here - Pinalitan ng content mula sa larawan */}
  <div className="space-y-6 p-4">

    {/* Title Input */}
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
        Title
      </label>
      <input
        id="title"
        type="text"
        placeholder="Announcement Title"
        className="mt-1 w-full border text-black border-gray-300 px-3 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    {/* Description Textarea */}
    <div>
      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
        Description
      </label>
      <textarea
        id="description"
        placeholder="Enter announcement details..."
        //rows="5"
        className="mt-1 w-full border text-black border-gray-300 px-3 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-y"
      ></textarea>
    </div>

    {/* Purpose and Deadline */}
    <div className="grid grid-cols-2 gap-4">
      {/* Purpose Dropdown */}
      <div>
        <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
          Purpose
        </label>
        <select
          id="purpose"
          className="mt-1 w-full border text-gray-500 border-gray-300 bg-white px-3 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option>Select here...</option>
          <option>Call for Research Proposal</option>
          <option>In-House Evaluation</option>
          {/* Iba pang options dito */}
        </select>
      </div>

      {/* Deadline of Submission Input (Date Picker) */}
      <div>
        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
          Deadline of Submission
        </label>
        <div className="relative mt-1 text-gray-500">
          <input
            id="deadline"
            type="date" // Gamitin ang 'date' kung available ang date picker
            defaultValue="01/01/2025" // Example date
            className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-10"
          />
        </div>
      </div>
    </div>

    {/* Audience Dropdowns */}
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Audience
      </label>
      <div className="grid grid-cols-3 gap-4">
        <select className="col-span-1 border text-gray-500 border-gray-300 bg-white px-3 py-2 rounded-md shadow-sm">
          <option>Select Campus</option>
          <option>UEP Main Campus</option>
          <option>UEP Laoang Campus</option>
          <option>PRM Campus</option>
          
        </select>
        <select className="col-span-1 border text-gray-500 border-gray-300 bg-white px-3 py-2 rounded-md shadow-sm">
          <option>Select College</option>
          <option>College of Agriculture, Fisheries and Natural Resources</option>
          <option>College of Arts and Communication</option>
          <option>College of Business Administration</option>
          <option>College of Engineering</option>
          <option>College of Nursing and Allied Health Sciences</option>
          <option>College of Science</option>
          <option>College of Veterinary Medicine</option>
          <option>College of Criminal Justice</option>
        </select>
        <select className="col-span-1 border text-gray-500 border-gray-300 bg-white px-3 py-2 rounded-md shadow-sm">
          <option>Select Audience</option>
        </select>
      </div>
    </div>

    {/* Upload Files Section */}
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Upload Files
      </label>
      <p className="text-xs text-gray-500 mb-2">
        Select and upload files of your choice
      </p>
      <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
        {/* Upload icon/link icon placeholder */}
        <div className="text-2xl text-gray-400 mb-2">📎</div>
        <p className="text-sm text-gray-500 mb-1">
          Choose a file or drag and drop it here
        </p>
        <p className="text-xs text-gray-400 mb-4">
          JPEG, PDF, and DOCS formats, up to 50MB
        </p>
        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-100">
          Browse Files
        </button>
      </div>
    </div>

    {/* Save Changes Button (nasa kanang baba ng larawan) */}
    <div className="pt-4 flex justify-end">
      <button
        onClick={() => setIsModalOpen(false)}
        className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-150"
      >
        Save Changes
      </button>
    </div>

  </div>
</Modal>

      {/* Modal
            <Modal
              opened={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Assign Project"
            >
              Modal Content Here
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
            </Modal> */}
    </div>
  );
};

export default AnnouncementPage;
