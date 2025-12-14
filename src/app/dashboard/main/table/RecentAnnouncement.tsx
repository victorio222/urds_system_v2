import React, { useState } from "react";
interface Announcement {
  id: string;
  title: string;
  date: string;
}

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "In-House Evaluation Announcement",
    date: "06-20-2025",
  },
  {
    id: "2",
    title: "Call for Research Announcement",
    date: "06-20-2025",
  },
];

const RecentAnnouncement: React.FC = () => {
  return (
    <section className="rounded-2xl h-full border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Recent Announcement
      </h2>

      <div className="space-y-2">
        {mockAnnouncements.map((item) => (
          <div
            key={item.id}
            className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-700"
          >
            <p className="line-clamp-1 font-medium">{item.title}</p>
            <p className="mt-1 text-[11px] text-slate-400">{item.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentAnnouncement;
