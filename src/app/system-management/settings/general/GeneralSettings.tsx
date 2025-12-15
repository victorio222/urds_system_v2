// "use client";

// import React from "react";
// import DefaultLayout from "@/component/layout/DefaultLayout";
// import { Switch } from "@mui/material";
// import { FiUser, FiShield, FiBell, FiSettings, FiSun, FiArchive } from "react-icons/fi";

// const SystemSettings = () => {
//   return (
//           <div className="space-y-8">

//             {/* SETTINGS GRID */}
//             <div className="
//                 grid 
//                 grid-cols-1 
//                 md:grid-cols-2 
//                 lg:grid-cols-3 
//                 gap-3
//             ">
//               {/* PROFILE SETTINGS */}
//               <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
//                 <div className="flex items-center gap-3 mb-3 text-blue-600 font-semibold">
//                   <FiUser className="text-xl" />
//                   Profile Settings
//                 </div>
//                 <p className="text-sm text-gray-600 mb-4">
//                   Manage your display name, profile photo, and account info.
//                 </p>
//                 <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg">
//                   Edit Profile
//                 </button>
//               </div>

//               {/* ACCOUNT SECURITY */}
//               <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
//                 <div className="flex items-center gap-3 mb-3 text-red-600 font-semibold">
//                   <FiShield className="text-xl" />
//                   Account Security
//                 </div>
//                 <p className="text-sm text-gray-600 mb-4">
//                   Update password, enable 2FA, and manage login sessions.
//                 </p>
//                 <button className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg">
//                   Security Settings
//                 </button>
//               </div>

//               {/* NOTIFICATIONS */}
//               <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
//                 <div className="flex items-center gap-3 mb-3 text-yellow-600 font-semibold">
//                   <FiBell className="text-xl" />
//                   Notifications
//                 </div>
//                 <p className="text-sm text-gray-600 mb-4">
//                   Configure email and in-app notifications.
//                 </p>

//                 <div className="flex justify-between items-center text-sm py-1">
//                   Email Alerts <Switch size="small" />
//                 </div>
//                 <div className="flex justify-between items-center text-sm py-1">
//                   System Updates <Switch size="small" />
//                 </div>
//                 <div className="flex justify-between items-center text-sm py-1">
//                   Activity Logs <Switch size="small" />
//                 </div>
//               </div>

//               {/* THEME SETTINGS */}
//               <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
//                 <div className="flex items-center gap-3 mb-3 text-purple-600 font-semibold">
//                   <FiSun className="text-xl" />
//                   Appearance & Theme
//                 </div>
//                 <p className="text-sm text-gray-600 mb-4">
//                   Switch between light and dark modes.
//                 </p>

//                 <div className="flex items-center justify-between">
//                   Dark Mode
//                   <Switch size="small" />
//                 </div>
//               </div>

//               {/* SYSTEM CONFIGURATION */}
//               <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
//                 <div className="flex items-center gap-3 mb-3 text-green-600 font-semibold">
//                   <FiSettings className="text-xl" />
//                   System Configuration
//                 </div>
//                 <p className="text-sm text-gray-600 mb-4">
//                   Manage system default settings and application behavior.
//                 </p>
//                 <button className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg">
//                   Configure System
//                 </button>
//               </div>

//               {/* SYSTEM LOGS */}
//               <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
//                 <div className="flex items-center gap-3 mb-3 text-gray-600 font-semibold">
//                   <FiArchive className="text-xl" />
//                   System Logs
//                 </div>
//                 <p className="text-sm text-gray-600 mb-4">
//                   View activity logs and audit records.
//                 </p>
//                 <button className="px-4 py-2 text-sm bg-gray-600 text-white rounded-lg">
//                   View Logs
//                 </button>
//               </div>
//             </div>

//           </div>
//   );
// };

// export default SystemSettings;











"use client";

import React, { useState } from "react";
import SettingModal from "./SettingModal"; // modal component
import { FiUser, FiShield, FiBell, FiSettings, FiSun, FiArchive } from "react-icons/fi";

type SettingType = "profile" | "security" | "notifications" | "theme" | "system" | "logs";

const SystemSettings = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedType, setSelectedType] = useState<SettingType>("profile");

  const handleOpen = (type: SettingType) => {
    setSelectedType(type);
    setOpenModal(true);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

        {/* PROFILE SETTINGS */}
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-3 text-blue-600 font-semibold">
            <FiUser className="text-xl" />
            Profile Settings
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Manage your display name, profile photo, and account info.
          </p>
          <button
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
            onClick={() => handleOpen("profile")}
          >
            Edit Profile
          </button>
        </div>

        {/* ACCOUNT SECURITY */}
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-3 text-red-600 font-semibold">
            <FiShield className="text-xl" />
            Account Security
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Update password, enable 2FA, and manage login sessions.
          </p>
          <button
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg"
            onClick={() => handleOpen("security")}
          >
            Security Settings
          </button>
        </div>

        {/* NOTIFICATIONS */}
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-3 text-yellow-600 font-semibold">
            <FiBell className="text-xl" />
            Notifications
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Configure email and in-app notifications.
          </p>
          <button
            className="px-4 py-2 text-sm bg-yellow-600 text-white rounded-lg"
            onClick={() => handleOpen("notifications")}
          >
            Notification Settings
          </button>
        </div>

        {/* THEME SETTINGS */}
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-3 text-purple-600 font-semibold">
            <FiSun className="text-xl" />
            Appearance & Theme
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Switch between light and dark modes.
          </p>
          <button
            className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg"
            onClick={() => handleOpen("theme")}
          >
            Theme Settings
          </button>
        </div>

        {/* SYSTEM CONFIGURATION */}
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-3 text-green-600 font-semibold">
            <FiSettings className="text-xl" />
            System Configuration
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Manage system default settings and application behavior.
          </p>
          <button
            className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg"
            onClick={() => handleOpen("system")}
          >
            Configure System
          </button>
        </div>

        {/* SYSTEM LOGS */}
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-3 text-gray-600 font-semibold">
            <FiArchive className="text-xl" />
            System Logs
          </div>
          <p className="text-sm text-gray-600 mb-4">
            View activity logs and audit records.
          </p>
          <button
            className="px-4 py-2 text-sm bg-gray-600 text-white rounded-lg"
            onClick={() => handleOpen("logs")}
          >
            View Logs
          </button>
        </div>
      </div>

      {/* Modal */}
      <SettingModal open={openModal} onClose={() => setOpenModal(false)} type={selectedType} />
    </div>
  );
};

export default SystemSettings;
