import React, { useState } from "react";
import Table from "@/component/ui/Table";
import { BiSolidFilterAlt, BiSolidPlusCircle } from "react-icons/bi";
import Dropdown, { DropdownItem } from "@/component/ui/Dropdown";

type UpdateStatus = "Submitted" | "For Review" | "Ready for Evaluation";

interface UpdateItem {
  id: string;
  title: string;
  researcher: string;
  status: UpdateStatus;
  dateTime: string;
}

const statusColorMap: Record<UpdateStatus, string> = {
  Submitted: "bg-blue-100 text-blue-700",
  "For Review": "bg-amber-100 text-amber-700",
  "Ready for Evaluation": "bg-emerald-100 text-emerald-700",
};

const mockUpdates: UpdateItem[] = [
  {
    id: "1",
    title: "AI-Enabled Triage Support for UEP Health Services",
    researcher: "Dr. James Smith",
    status: "Submitted",
    dateTime: "Sept 23, 2026 · 9:05 AM",
  },
  {
    id: "2",
    title: "AI-Enabled Triage Support for UEP Health Services",
    researcher: "Dr. James Smith",
    status: "For Review",
    dateTime: "Sept 24, 2026 · 2:15 PM",
  },
  {
    id: "3",
    title: "AI-Enabled Triage Support for UEP Health Services",
    researcher: "Dr. James Smith",
    status: "Ready for Evaluation",
    dateTime: "Sept 26, 2026 · 11:40 AM",
  },
];

export const UpdateList: React.FC = () => {
  const [filter, setFilter] = useState<string>("All");

  const dropdownItems: DropdownItem[] = [
    { label: "All", onClick: () => setFilter("All") },
    { label: "Submitted", onClick: () => setFilter("Submitted") },
    { label: "For Review", onClick: () => setFilter("For Review") },
    { label: "Ready for Evaluation", onClick: () => setFilter("Ready for Evaluation") },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-wide text-slate-600">
          Updates
        </h2>

        {/* Example: filter dropdown using your imports */}
        <Dropdown
          items={dropdownItems}
          buttonContent={
            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
              <BiSolidFilterAlt className="h-3 w-3" />
              Filter
            </span>
          }
        />
      </div>

      <div className="space-y-3">
        {mockUpdates
          .filter((item) => filter === "All" || item.status === filter)
          .map((item) => (
          <button
            key={item.id}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-left transition hover:border-indigo-200 hover:bg-indigo-50"
          >
            <p className="line-clamp-2 text-sm font-semibold text-slate-900">
              {item.title}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Researcher: <span className="font-medium">{item.researcher}</span>
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColorMap[item.status]}`}
              >
                {item.status}
              </span>
              <span className="text-[11px] text-slate-400">
                {item.dateTime}
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default UpdateList;