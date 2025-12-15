"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Divider } from "@mui/material";
import {
  AiOutlineDashboard,
  AiOutlineExperiment,
  AiOutlineSchedule,
  AiOutlineNotification,
  AiOutlineCalendar,
  AiOutlineSetting,
} from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import logo from "@/assets/images/logo.png";

interface SidebarLayoutProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

interface SidebarItem {
  title: string;
  link?: string;
  icon?: React.ReactNode;
  subItems?: { title: string; link: string }[];
}

const sidebar: SidebarItem[] = [
  {
    title: "Dashboard",
    link: "/dashboard",
    icon: <AiOutlineDashboard size={20} />,
  },
  {
    title: "Research Projects",
    icon: <AiOutlineExperiment size={20} />,
    subItems: [
      { title: "All Proposals", link: "/research-projects/all" },
      { title: "New", link: "/research-projects/new" },
      { title: "Ongoing", link: "/research-projects/on-going" },
      { title: "Completed", link: "/research-projects/completed" },
    ],
  },
  {
    title: "In-House Schedule",
    link: "/in-house-schedule",
    icon: <AiOutlineSchedule size={20} />,
  },
  {
    title: "Announcement",
    link: "/announcements",
    icon: <AiOutlineNotification size={20} />,
  },
  {
    title: "Calendar",
    link: "/calendar",
    icon: <AiOutlineCalendar size={20} />,
  },
  {
    title: "System Management",
    icon: <AiOutlineSetting size={20} />,
    subItems: [
      { title: "User Management", link: "/system-management/user-management" },
      { title: "System Settings", link: "/system-management/settings" },
      { title: "Activity Logs", link: "/system-management/logs" },
    ],
  },
];

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  isSidebarOpen,
  toggleSidebar,
}) => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>(null);
  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    sidebar.forEach((item) => {
      if (item.subItems?.some((sub) => sub.link === pathname)) {
        setExpanded(item.title);
      }
    });
  }, [pathname]);

  const handleToggle = (title: string) => {
    setExpanded((prev) => (prev === title ? null : title));
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-30 transition-opacity duration-300 md:hidden ${
          isSidebarOpen
            ? "opacity-100 visible backdrop-blur-sm"
            : "opacity-0 invisible"
        }`}
        onClick={toggleSidebar}
      />
      <aside
        className={`fixed top-0 left-0 bg-white p-4 h-full w-64 text-slate-800 z-40 transform transition-transform duration-300 overflow-y-auto
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:w-64 md:shrink-0`}
      >
        <div className="flex justify-center items-center cursor-pointer mb-5">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden">
            <Image
              src={logo}
              alt="logo"
              width={70}
              height={70}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="font-extrabold text-blue-700 text-4xl ml-[-7px]">
            URDS
          </h1>
        </div>

        <Divider className="bg-slate-100" />

        <div className="flex flex-col gap-1 mt-7">
          {sidebar.map((item, index) => (
            <div key={index}>
              {item.subItems ? (
                <>
                  <button
                    onClick={() => handleToggle(item.title)}
                    className={`flex items-center justify-between w-full cursor-pointer text-[13px] font-medium py-2 px-4 rounded-md transition-colors
                      ${
                        expanded === item.title
                          ? "bg-blue-600 text-white"
                          : "text-slate-500 hover:bg-blue-100 hover:text-blue-600"
                      }`}
                  >
                    <span className="flex items-center gap-5">
                      {item.icon}
                      {item.title}
                    </span>
                    <BiChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        expanded === item.title ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  <div
                    ref={(el) => {
                      refs.current[item.title] = el;
                    }}
                    style={{
                      height:
                        expanded === item.title && refs.current[item.title]
                          ? `${refs.current[item.title]?.scrollHeight ?? 0}px`
                          : "0px",
                    }}
                    className="overflow-hidden transition-[height] duration-300"
                  >
                    <div className="pl-10 flex flex-col gap-1 mt-1 py-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.link}
                          className={`flex items-center gap-3 text-[13px] font-medium py-2 px-4 rounded-md transition-colors
                            ${
                              pathname === subItem.link
                                ? "bg-blue-500 text-white"
                                : "text-slate-500 hover:bg-blue-100 hover:text-blue-600"
                            }`}
                          onClick={toggleSidebar} // Close on mobile link click
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.link!}
                  className={`flex items-center gap-5 text-[13px] font-medium py-2 px-4 rounded-md transition-colors ${
                    pathname === item.link
                      ? "bg-blue-600 text-white"
                      : "text-slate-500 hover:bg-blue-100 hover:text-blue-600"
                  }`}
                  onClick={toggleSidebar} // Close on mobile link click
                >
                  {item.icon}
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default SidebarLayout;
