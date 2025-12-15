import { NotificationsNone, NotificationsOff } from "@mui/icons-material";
import React, { useState } from "react";

const NotificationsTable: React.FC = () => {
  return (
    <section className="flex flex-col h-full items-center justify-center rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <NotificationsOff className="text-slate-400" />
      <p className="text-[11px] mt-2 text-slate-400">No notifications.</p>
    </section>
  );
};

export default NotificationsTable;
