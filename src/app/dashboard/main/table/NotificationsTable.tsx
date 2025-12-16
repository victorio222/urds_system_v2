// import { NotificationsNone, NotificationsOff } from "@mui/icons-material";
// import React, { useState } from "react";

// const NotificationsTable: React.FC = () => {
//   return (
//     <section className="flex flex-col h-full items-center justify-center rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
//       <NotificationsOff className="text-slate-400" />
//       <p className="text-[11px] mt-2 text-slate-400">No notifications.</p>
//     </section>
//   );
// };

// export default NotificationsTable;

import React from "react";
import { Bell, CheckCircle, AlertCircle, Info, Clock, BellOff } from "lucide-react";

// 1. Interface
interface Notification {
  id: number;
  title: string;
  type: "success" | "warning" | "info" | "system";
  time: string;
}

// 2. Mock Data (Updated as requested)
const mockNotifications: Notification[] = [
  { id: 1, title: "Submission is now open.", type: "success", time: "Just now" },
  { id: 2, title: "System maintenance scheduled for 10 PM.", type: "warning", time: "2 hours ago" },
  { id: 3, title: "New in-house review guidelines available.", type: "info", time: "5 hours ago" },
];

// Helper for Icon Styles
const getIconStyle = (type: string) => {
  switch (type) {
    case "success": return { icon: <CheckCircle size={16} />, bg: "bg-emerald-50", text: "text-emerald-600" };
    case "warning": return { icon: <AlertCircle size={16} />, bg: "bg-amber-50", text: "text-amber-600" };
    case "info": return { icon: <Info size={16} />, bg: "bg-blue-50", text: "text-blue-600" };
    default: return { icon: <Bell size={16} />, bg: "bg-slate-100", text: "text-slate-500" };
  }
};

const NotificationsTable: React.FC = () => {
  const hasNotifications = mockNotifications.length > 0;

  return (
    <section className="flex h-full w-full flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm font-sans min-h-[230px]">
      
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm lg:text-base font-bold text-slate-800">
          Notifications
        </h2>
        {hasNotifications && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {mockNotifications.length}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pr-1">
        {hasNotifications ? (
          <div className="flex flex-col gap-3">
            {mockNotifications.map((note) => {
              const style = getIconStyle(note.type);
              return (
                <div 
                  key={note.id} 
                  className="flex items-start gap-3 rounded-xl border border-transparent p-1 transition-colors hover:bg-slate-50"
                >
                  {/* Notification Logo/Icon */}
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${style.bg} ${style.text}`}>
                    {style.icon}
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col gap-0.5">
                    <p className="text-xs font-bold text-slate-700 leading-tight">
                      {note.title}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
                      <Clock size={10} />
                      <span>{note.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50">
                <BellOff size={20} />
            </div>
            <p className="text-xs font-medium text-slate-400">No notifications yet.</p>
          </div>
        )}
      </div>

    </section>
  );
};

export default NotificationsTable;