'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Divider } from '@mui/material';
import { usePathname } from 'next/navigation';
import { 
    AiOutlineDashboard, 
    AiOutlineExperiment, 
    AiOutlineSchedule, 
    AiOutlineNotification, 
    AiOutlineCalendar, 
    AiOutlineSetting 
} from 'react-icons/ai';
import logo from '@/assets/images/logo.png';
import Link from 'next/link';

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
    { title: 'Dashboard', link: '/dashboard', icon: <AiOutlineDashboard size={20} /> },
    {
        title: 'Research Projects',
        icon: <AiOutlineExperiment size={20} />,
        subItems: [
            { title: 'All Proposals', link: '/research-projects/all' },
            { title: 'New', link: '/research-projects/new' },
            { title: 'Ongoing', link: '/research-projects/ongoing' },
            { title: 'Completed', link: '/research-projects/completed' },
        ],
    },
    { title: 'In-House Schedule', link: '/in-house-schedule', icon: <AiOutlineSchedule size={20} /> },
    { title: 'Announcement', link: '/announcements', icon: <AiOutlineNotification size={20} /> },
    { title: 'Calendar', link: '/calendar', icon: <AiOutlineCalendar size={20} /> },
    { title: 'System Management', link: '/system-management/user-management', icon: <AiOutlineSetting size={20} /> },
];

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ isSidebarOpen, toggleSidebar }) => {
    const pathname = usePathname();
    const [expanded, setExpanded] = useState<string | null>(null);

    const handleToggle = (title: string) => {
        setExpanded(expanded === title ? null : title);
    };

    return (
        <aside
            className={`bg-white p-4 min-h-screen w-60 text-slate-800 ${
                isSidebarOpen ? 'ml-0' : 'ml-[-240px]'
            } transition-all duration-300`}
        >
            {/* Logo */}
            <div className="flex justify-center items-center cursor-pointer ml-[-15px]">
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
                <h1 className='font-extrabold text-blue-700 text-4xl ml-[-7px]'>URDS</h1>
            </div>

            <Divider className="bg-slate-100" />

            <div className="flex flex-col gap-1 mt-7">
                {sidebar.map((item, index) => (
                    <div key={index}>
                        {item.subItems ? (
                            <>
                                {/* Collapsible parent */}
                                <button
                                    onClick={() => handleToggle(item.title)}
                                    className={`flex items-center gap-5 w-full cursor-pointer text-[13px] font-medium py-2 px-4 rounded-md transition-colors ${
                                        expanded === item.title || item.subItems.some(sub => sub.link === pathname)
                                            ? 'bg-blue-600 text-white'
                                            : 'text-slate-500 hover:bg-blue-600 hover:text-white'
                                    }`}
                                >
                                    {item.icon}
                                    {item.title}
                                </button>

                                {/* Sub-items */}
                                {(expanded === item.title || item.subItems.some(sub => sub.link === pathname)) && (
                                    <div className="pl-11 flex flex-col gap-1 mt-1">
                                        {item.subItems.map((subItem, subIndex) => (
                                            <Link
                                                key={subIndex}
                                                href={subItem.link}
                                                className={`text-[12px] py-1 px-3 rounded-md transition-colors ${
                                                    pathname === subItem.link
                                                        ? 'bg-blue-600 text-white'
                                                        : 'text-slate-500 hover:bg-blue-600 hover:text-white'
                                                }`}
                                            >
                                                {subItem.title}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link
                                href={item.link!}
                                className={`flex items-center gap-5 text-[13px] font-medium py-2 px-4 rounded-md transition-colors ${
                                    pathname === item.link
                                        ? 'bg-blue-600 text-white'
                                        : 'text-slate-400 hover:bg-blue-600 hover:text-white'
                                }`}
                            >
                                {item.icon}
                                {item.title}
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default SidebarLayout;
