// 'use client';

// import React, { useEffect, useState } from 'react';
// import DefaultLayout from '@/component/layout/DefaultLayout';
// import Table from '@/component/ui/Table';
// import Dropdown, { DropdownItem } from '@/component/ui/Dropdown';
// import { BiSolidFilterAlt, BiSearch } from 'react-icons/bi';
// import { Spinner } from '@/component/base/Spinner';

// interface SystemLog {
//   id: number;
//   action: string;
//   user: string;
//   description: string;
//   datetime: string; // e.g., "2025-02-01 10:12 AM"
//   status: 'Success' | 'Warning' | 'Failed';
// }

// const SystemLogs = () => {
//   const [year, setYear] = useState(2025);
//   const [status, setStatus] = useState<'All' | 'Success' | 'Warning' | 'Failed'>('All');
//   const [search, setSearch] = useState('');

//     const [loading, setLoading] = useState(true);
  
//     // Simulate data loading on mount
//     useEffect(() => {
//       const timer = setTimeout(() => {
//         setLoading(false);
//       }, 1000); // 1 second delay to simulate an API call
  
//       return () => clearTimeout(timer);
//     }, []);
  
//     if (loading) {
//       return (
//         <div className="flex flex-col justify-center items-center h-screen bg-[#F4F7FE]">
//           <Spinner />
//         </div>
//       );
//     }
    
//   const data: SystemLog[] = [
//     {
//       id: 1,
//       action: 'User Login',
//       user: 'Admin',
//       description: 'Logged into the system',
//       datetime: '2025-02-01 10:12 AM',
//       status: 'Success',
//     },
//     {
//       id: 2,
//       action: 'Update Settings',
//       user: 'System Manager',
//       description: 'Updated system appearance settings',
//       datetime: '2025-02-02 08:33 AM',
//       status: 'Warning',
//     },
//     {
//       id: 3,
//       action: 'Delete Account',
//       user: 'Admin',
//       description: 'Deleted user account: John Doe',
//       datetime: '2025-02-03 01:15 PM',
//       status: 'Failed',
//     },
//   ];

//   const filteredData = data.filter((log) => {
//     const searchMatch = [log.action, log.user, log.description, log.datetime]
//       .join(' ')
//       .toLowerCase()
//       .includes(search.toLowerCase());
//     const statusMatch = status === 'All' || log.status === status;
//     return searchMatch && statusMatch;
//   });

//   const statusStyle = {
//     Success: 'bg-green-500',
//     Warning: 'bg-yellow-500',
//     Failed: 'bg-red-500',
//   };

//   const yearItems: DropdownItem[] = [2023, 2024, 2025, 2026].map((y) => ({
//     label: y.toString(),
//     onClick: () => setYear(y),
//   }));

//   const statusItems: DropdownItem[] = ['All', 'Success', 'Warning', 'Failed'].map((s) => ({
//     label: s,
//     onClick: () => setStatus(s as any),
//   }));

//   // If no logs, create a dummy row to display "No logs found"
//   const tableData = filteredData.length > 0 ? filteredData : [
//     {
//       id: 0,
//       action: '',
//       user: '',
//       description: '',
//       datetime: '',
//       status: 'Success' as const, // type-safe
//     },
//   ];

//   const columns = [
//     {
//       key: 'timestamp',
//       header: 'Timestamp',
//       align: 'center',
//       render: (_: any, row: SystemLog) => row.id === 0 ? '' : row.datetime,
//     },
//     { key: 'action', header: 'Action', align: 'left', render: (_: any, row: SystemLog) => row.id === 0 ? '' : row.action },
//     { key: 'user', header: 'User', align: 'left', render: (_: any, row: SystemLog) => row.id === 0 ? '' : row.user },
//     { key: 'description', header: 'Description', align: 'left', render: (_: any, row: SystemLog) => row.id === 0 ? '' : row.description },
//     {
//       key: 'status',
//       header: 'Status',
//       align: 'center',
//       render: (_: any, row: SystemLog) =>
//         row.id === 0 ? (
//           ''
//         ) : (
//           <div className="flex items-center justify-center space-x-2">
//             <span className={`w-3 h-3 rounded-full ${statusStyle[row.status]}`}></span>
//             <span className="text-sm font-medium">{row.status}</span>
//           </div>
//         ),
//     },
//   ];

//   return (
//     <div className="flex max-h-screen">
//       <div className="bg-blue-50 h-auto w-full">
//         <DefaultLayout pageName="System Logs">
//           <div className="py-4 px-7 space-y-6">
//             {/* Search + Filters */}
//             <div className="max-w-full flex justify-between items-center flex-wrap gap-4">
//               {/* Search Bar */}
//               <div className="relative flex items-center w-full md:w-64">
//                 <BiSearch className="absolute left-3 text-gray-500 text-lg" />
//                 <input
//                   type="text"
//                   placeholder="Search logs..."
//                   className="
//                     pl-10 pr-4 py-2 w-full
//                     rounded-full text-sm bg-white shadow
//                     outline-none border border-transparent
//                     focus:border-blue-500 focus:ring-2 focus:ring-blue-300
//                     transition-all duration-300
//                   "
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//               </div>

//               {/* Filter Bubble */}
//               <div className="inline-flex bg-white p-2 pr-5 rounded-full shadow space-x-4">
//                 <div className="flex items-center space-x-3">
//                   <Dropdown buttonContent={`Year: ${year}`} items={yearItems} />
//                   <Dropdown buttonContent={`Status: ${status}`} items={statusItems} />
//                 </div>
//                 <div className="flex items-center text-sm text-slate-500 font-medium cursor-pointer select-none">
//                   <BiSolidFilterAlt className="mr-2 text-xl" />
//                   More Filters
//                 </div>
//               </div>
//             </div>

//             {/* Table */}
//             <Table<SystemLog>
//               columns={columns as any}
//               data={tableData}
//             />

//             {/* Render "No logs found" overlay if tableData is empty row */}
//             {tableData[0].id === 0 && (
//               <div className="bg-white shadow rounded-md border border-gray-200 p-10 text-center text-gray-500 font-medium -mt-16">
//                 No logs found.
//               </div>
//             )}
//           </div>
//         </DefaultLayout>
//       </div>
//     </div>
//   );
// };

// export default SystemLogs;










'use client';

import React, { useEffect, useState } from 'react';
import DefaultLayout from '@/component/layout/DefaultLayout';
import Table from '@/component/ui/Table';
import Dropdown, { DropdownItem } from '@/component/ui/Dropdown';
import { BiSolidFilterAlt, BiSearch } from 'react-icons/bi';
import { Spinner } from '@/component/base/Spinner';

interface SystemLog {
  id: number;
  action: string;
  user: string;
  description: string;
  datetime: string;
  status: 'Success' | 'Warning' | 'Failed';
}

const SystemLogs = () => {
  const [year, setYear] = useState(2025);
  const [status, setStatus] = useState<'All' | 'Success' | 'Warning' | 'Failed'>('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  /* =====================
     SIMULATE API LOADING
  ====================== */
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  /* =====================
     ACTIVITY LOG DATA
  ====================== */
  const data: SystemLog[] = [
    {
      id: 1,
      action: 'User Login',
      user: 'URDS Director',
      description: 'Logged into the research management system',
      datetime: '2025-02-01 08:12 AM',
      status: 'Success',
    },
    {
      id: 2,
      action: 'Proposal Submitted',
      user: 'Researcher: Maria Santos',
      description: 'Submitted research proposal titled "Smart Irrigation System Using IoT"',
      datetime: '2025-02-01 09:45 AM',
      status: 'Success',
    },
    {
      id: 3,
      action: 'Proposal Assigned for Review',
      user: 'URDS Staff',
      description: 'Assigned proposal "Smart Irrigation System Using IoT" to internal reviewers',
      datetime: '2025-02-01 11:02 AM',
      status: 'Success',
    },
    {
      id: 4,
      action: 'In-House Review Scheduled',
      user: 'URDS Staff',
      description: 'Scheduled in-house review for proposal "AI-Based Crop Yield Prediction"',
      datetime: '2025-02-02 10:30 AM',
      status: 'Success',
    },
    {
      id: 5,
      action: 'Review Comments Added',
      user: 'Reviewer: Dr. Juan Dela Cruz',
      description: 'Added evaluation comments to proposal "AI-Based Crop Yield Prediction"',
      datetime: '2025-02-02 02:14 PM',
      status: 'Success',
    },
    {
      id: 6,
      action: 'Proposal Returned for Revision',
      user: 'URDS Director',
      description: 'Returned proposal "Smart Hydroponic Farming System" for revisions',
      datetime: '2025-02-03 09:20 AM',
      status: 'Warning',
    },
    {
      id: 7,
      action: 'Revised Proposal Submitted',
      user: 'Researcher: John Reyes',
      description: 'Resubmitted revised proposal "Smart Hydroponic Farming System"',
      datetime: '2025-02-03 11:47 AM',
      status: 'Success',
    },
    {
      id: 8,
      action: 'Proposal Approved',
      user: 'URDS Director',
      description: 'Approved proposal "Smart Hydroponic Farming System"',
      datetime: '2025-02-04 03:05 PM',
      status: 'Success',
    },
    {
      id: 9,
      action: 'Ethics Clearance Requested',
      user: 'Researcher: Ana Lopez',
      description: 'Requested ethics clearance for "Student Data Privacy Analysis"',
      datetime: '2025-02-05 09:10 AM',
      status: 'Success',
    },
    {
      id: 10,
      action: 'Ethics Clearance Approved',
      user: 'Ethics Committee',
      description: 'Approved ethics clearance for "Student Data Privacy Analysis"',
      datetime: '2025-02-06 01:40 PM',
      status: 'Success',
    },
    {
      id: 11,
      action: 'Proposal Rejected',
      user: 'URDS Director',
      description: 'Rejected proposal "Blockchain Attendance System"',
      datetime: '2025-02-06 04:18 PM',
      status: 'Failed',
    },
    {
      id: 12,
      action: 'Review Deadline Missed',
      user: 'Reviewer: Prof. Elena Cruz',
      description: 'Failed to submit review before deadline',
      datetime: '2025-02-07 08:00 AM',
      status: 'Warning',
    },
    {
      id: 13,
      action: 'Proposal Archived',
      user: 'System',
      description: 'Archived rejected proposal "Blockchain Attendance System"',
      datetime: '2025-02-07 10:22 AM',
      status: 'Success',
    },
    {
      id: 14,
      action: 'Research Timeline Updated',
      user: 'Researcher: Mark Villanueva',
      description: 'Updated project timeline for approved research',
      datetime: '2025-02-08 02:55 PM',
      status: 'Success',
    },
    {
      id: 15,
      action: 'Final Report Submitted',
      user: 'Researcher: Maria Santos',
      description: 'Submitted final research report',
      datetime: '2025-02-10 04:30 PM',
      status: 'Success',
    },
  ];

  /* =====================
     FILTER LOGIC
  ====================== */
  const filteredData = data.filter((log) => {
    const matchesSearch = [log.action, log.user, log.description, log.datetime]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus = status === 'All' || log.status === status;
    return matchesSearch && matchesStatus;
  });

  const tableData =
    filteredData.length > 0
      ? filteredData
      : [
          {
            id: 0,
            action: '',
            user: '',
            description: '',
            datetime: '',
            status: 'Success' as const,
          },
        ];

  /* =====================
     STATUS STYLES
  ====================== */
  const statusStyle = {
    Success: 'bg-green-500',
    Warning: 'bg-yellow-500',
    Failed: 'bg-red-500',
  };

  /* =====================
     DROPDOWN ITEMS
  ====================== */
  const yearItems: DropdownItem[] = [2023, 2024, 2025, 2026].map((y) => ({
    label: y.toString(),
    onClick: () => setYear(y),
  }));

  const statusItems: DropdownItem[] = ['All', 'Success', 'Warning', 'Failed'].map((s) => ({
    label: s,
    onClick: () => setStatus(s as any),
  }));

  /* =====================
     TABLE COLUMNS
  ====================== */
  const columns = [
    {
      key: 'datetime',
      header: 'Timestamp',
      align: 'center',
      render: (_: any, row: SystemLog) => (row.id === 0 ? '' : row.datetime),
    },
    {
      key: 'action',
      header: 'Action',
      align: 'left',
      render: (_: any, row: SystemLog) => (row.id === 0 ? '' : row.action),
    },
    {
      key: 'user',
      header: 'User',
      align: 'left',
      render: (_: any, row: SystemLog) => (row.id === 0 ? '' : row.user),
    },
    {
      key: 'description',
      header: 'Description',
      align: 'left',
      render: (_: any, row: SystemLog) => (row.id === 0 ? '' : row.description),
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (_: any, row: SystemLog) =>
        row.id === 0 ? (
          ''
        ) : (
          <div className="flex items-center justify-center gap-2">
            <span className={`w-3 h-3 rounded-full ${statusStyle[row.status]}`} />
            <span className="text-sm font-medium">{row.status}</span>
          </div>
        ),
    },
  ];

  /* =====================
     RENDER
  ====================== */
  return (
    <DefaultLayout pageName="System Logs">
      <div className="py-4 px-7 space-y-6">

        {loading ? (
          <div className="flex justify-center bg-blue-50 items-center w-full h-screen">
            <Spinner />
          </div>
        ) : (
          <>
            {/* SEARCH & FILTERS */}
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="relative w-full md:w-64">
                <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                <input
                  type="text"
                  placeholder="Search activity logs..."
                  className="pl-10 pr-4 py-2 w-full rounded-full text-sm bg-white shadow outline-none focus:ring-2 focus:ring-blue-300"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="inline-flex bg-white p-2 pr-5 rounded-full shadow gap-4">
                <Dropdown buttonContent={`Year: ${year}`} items={yearItems} />
                <Dropdown buttonContent={`Status: ${status}`} items={statusItems} />
                <div className="flex items-center text-sm text-slate-500 font-medium cursor-pointer">
                  <BiSolidFilterAlt className="mr-2 text-xl" />
                  More Filters
                </div>
              </div>
            </div>

            {/* TABLE */}
            <Table<SystemLog> columns={columns as any} data={tableData} />

            {/* EMPTY STATE */}
            {tableData[0].id === 0 && (
              <div className="bg-white shadow rounded-md border p-10 text-center text-gray-500 font-medium -mt-16">
                No activity logs found.
              </div>
            )}
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default SystemLogs;
