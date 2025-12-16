import { useState } from "react";
import ActionDropdown from "../action/ActionDropdown";
import Dropdown, { DropdownItem } from "@/component/ui/Dropdown";
import { BiSolidFilterAlt } from "react-icons/bi";
import Table from "@/component/ui/Table";

interface ResearchProject {
  id: number;
  title: string;
  researcher: string;
  campus: string;
  college: string;
  status: "Completed" | "Terminated" | "Pending" | "Ongoing";
  action?: React.ReactNode;
}

type ColumnKey = keyof ResearchProject | "action";

const RecentProjectPage = () => {
  const data: ResearchProject[] = [
    {
      id: 1,
      title: "Plant Growth Study",
      researcher: "Dr. Alice",
      campus: "Main",
      college: "Science",
      status: "Pending",
    },
    {
      id: 2,
      title: "Soil Analysis",
      researcher: "Dr. Bob",
      campus: "West",
      college: "Agriculture",
      status: "Pending",
    },
    {
      id: 3,
      title: "Genetic Research",
      researcher: "Dr. Carol",
      campus: "Main",
      college: "Biotech",
      status: "Pending",
    },
    {
      id: 4,
      title: "Water Quality Study",
      researcher: "Dr. Dave",
      campus: "East",
      college: "Environment",
      status: "Pending",
    },
  ];

  const [year, setYear] = useState(2025);
  const [status, setStatus] = useState("All Proposal");

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
    { key: "campus", header: "Campus", align: "center" },
    { key: "college", header: "College", align: "center" },
    {
      key: "status",
      header: "Status",
      align: "center",
      render: (value: ResearchProject["status"]) => {
        const styleMap = {
          Completed: "bg-green-100 text-green-700",
          Terminated: "bg-red-100 text-red-700",
          Pending: "bg-yellow-100 text-yellow-700",
          Ongoing: "bg-blue-100 text-blue-700",
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
          onView={() => alert(`Edit ${row.title}`)}
          onApprove={() => alert(`Delete ${row.title}`)}
          onRequest={() => alert(`View ${row.title}`)}
        />
      ),
    },
  ];

  // Dropdown items
  const yearItems: DropdownItem [] = [2023, 2024, 2025, 2026, 2027].map((y) => ({
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
    <div className="space-y-4 mt-[-10px] w-full bg-white rounded-lg shadow">
      <div>
        <p className="text-slate-500 text-[12px] font-black p-3 uppercase">Recent Proposals</p>
        <Table<ResearchProject> columns={columns} data={data} />
      </div>
    </div>
  );
};

export default RecentProjectPage;
