import React, { useState } from "react";

interface ReviewItem {
  id: string;
  date: string;
  proposal: string;
  researcher: string;
  venue: string;
}

const mockSchedule: ReviewItem[] = [
  { id: "1", date: "Sept 22", proposal: "Title 1", researcher: "Author 1", venue: "URDS Hall" },
  { id: "2", date: "Sept 22", proposal: "Title 2", researcher: "Author 2", venue: "URDS Hall" },
  { id: "3", date: "Sept 22", proposal: "Title 3", researcher: "Author 3", venue: "URDS Hall" },
  { id: "4", date: "Sept 23", proposal: "Title 4", researcher: "Author 4", venue: "URDS Hall" },
  { id: "5", date: "Sept 23", proposal: "Title 5", researcher: "Author 5", venue: "URDS Hall" },
];

const UpcomingReviewSchedule: React.FC = () => {
  return (
    <section className="rounded-2xl h-full border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Upcoming In-House Review Schedule
        </h2>
        <button className="text-[11px] font-medium text-indigo-600 hover:text-indigo-700">
          Show all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-[11px] text-slate-600">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400">
              <th className="pb-2 pr-4">Date</th>
              <th className="pb-2 pr-4">Proposal</th>
              <th className="pb-2 pr-4">Researcher</th>
              <th className="pb-2">Venue</th>
            </tr>
          </thead>
          <tbody>
            {mockSchedule.map((item) => (
              <tr key={item.id} className="border-b border-slate-50 last:border-0">
                <td className="py-1.5 pr-4">{item.date}</td>
                <td className="py-1.5 pr-4">{item.proposal}</td>
                <td className="py-1.5 pr-4 font-semibold text-slate-800">
                  {item.researcher}
                </td>
                <td className="py-1.5">{item.venue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UpcomingReviewSchedule;
