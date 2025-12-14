import React, { useState } from "react";

const NotificationsTable: React.FC = () => {
  return (
    <section className="flex h-full items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-[11px] text-slate-400">No notifications.</p>
    </section>
  );
};

export default NotificationsTable;
