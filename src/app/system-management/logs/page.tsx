// // 'use client';

// // import React, { useState } from 'react';
// // import DefaultLayout from '@/component/layout/DefaultLayout';
// // import Table from '@/component/ui/Table';
// // import Dropdown, { DropdownItem } from '@/component/ui/Dropdown';
// // import { BiSolidFilterAlt, BiSearch } from 'react-icons/bi';

// // interface SystemLog {
// //   id: number;
// //   action: string;
// //   user: string;
// //   description: string;
// //   datetime: string; // full datetime string e.g., "2025-02-01 10:12 AM"
// //   status: 'Success' | 'Warning' | 'Failed';
// // }

// // const SystemLogs = () => {
// //   const [year, setYear] = useState(2025);
// //   const [status, setStatus] = useState('All');
// //   const [search, setSearch] = useState('');

// //   const data: SystemLog[] = [
// //     {
// //       id: 1,
// //       action: 'User Login',
// //       user: 'Admin',
// //       description: 'Logged into the system',
// //       datetime: '2025-02-01 10:12 AM',
// //       status: 'Success',
// //     },
// //     {
// //       id: 2,
// //       action: 'Update Settings',
// //       user: 'System Manager',
// //       description: 'Updated system appearance settings',
// //       datetime: '2025-02-02 08:33 AM',
// //       status: 'Warning',
// //     },
// //     {
// //       id: 3,
// //       action: 'Delete Account',
// //       user: 'Admin',
// //       description: 'Deleted user account: John Doe',
// //       datetime: '2025-02-03 01:15 PM',
// //       status: 'Failed',
// //     },
// //   ];

// //   const filteredData = data.filter((log) => {
// //     const searchMatch = [log.action, log.user, log.description, log.datetime]
// //       .join(' ')
// //       .toLowerCase()
// //       .includes(search.toLowerCase());
// //     const statusMatch = status === 'All' || log.status === status;
// //     return searchMatch && statusMatch;
// //   });

// //   const statusStyle = {
// //     Success: 'bg-green-100 text-green-700',
// //     Warning: 'bg-yellow-100 text-yellow-700',
// //     Failed: 'bg-red-100 text-red-700',
// //   };

// //   const yearItems: DropdownItem[] = [2023, 2024, 2025, 2026].map((y) => ({
// //     label: y.toString(),
// //     onClick: () => setYear(y),
// //   }));

// //   const statusItems: DropdownItem[] = ['All', 'Success', 'Warning', 'Failed'].map((s) => ({
// //     label: s,
// //     onClick: () => setStatus(s),
// //   }));

// //   const columns = [
// //     {
// //       key: 'timestamp',
// //       header: 'Timestamp',
// //       align: 'center',
// //       render: (_: any, row: SystemLog) => row.datetime,
// //     },
// //     { key: 'action', header: 'Action', align: 'left' },
// //     { key: 'user', header: 'User', align: 'left' },
// //     { key: 'description', header: 'Description', align: 'left' },
// //     {
// //       key: 'status',
// //       header: 'Status',
// //       align: 'center',
// //       render: (value: SystemLog['status']) => (
// //         <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyle[value]}`}>
// //           {value}
// //         </span>
// //       ),
// //     },
// //   ];

// //   // If no logs, insert a single row with empty values to show "No logs found"
// //   const tableData = filteredData.length > 0 ? filteredData : [{ id: 0, action: '', user: '', description: '', datetime: '', status: 'Success' }];

// //   return (
// //     <div className="flex max-h-screen">
// //       <div className="bg-blue-50 h-auto w-full">
// //         <DefaultLayout pageName="System Logs">
// //           <div className="py-4 px-7 space-y-6">
// //             {/* Search + Filters */}
// //             <div className="max-w-full flex justify-between items-center flex-wrap gap-4">
// //               {/* Search Bar */}
// //               <div className="relative flex items-center w-full md:w-64">
// //                 <BiSearch className="absolute left-3 text-gray-500 text-lg" />
// //                 <input
// //                   type="text"
// //                   placeholder="Search logs..."
// //                   className="
// //                     pl-10 pr-4 py-2 w-full
// //                     rounded-full text-sm bg-white shadow
// //                     outline-none border border-transparent
// //                     focus:border-blue-500 focus:ring-2 focus:ring-blue-300
// //                     transition-all duration-300
// //                   "
// //                   value={search}
// //                   onChange={(e) => setSearch(e.target.value)}
// //                 />
// //               </div>

// //               {/* Filter Bubble */}
// //               <div className="inline-flex bg-white p-2 pr-5 rounded-full shadow space-x-4">
// //                 <div className="flex items-center space-x-3">
// //                   <Dropdown buttonContent={`Year: ${year}`} items={yearItems} />
// //                   <Dropdown buttonContent={`Status: ${status}`} items={statusItems} />
// //                 </div>
// //                 <div className="flex items-center text-sm text-slate-500 font-medium cursor-pointer select-none">
// //                   <BiSolidFilterAlt className="mr-2 text-xl" />
// //                   More Filters
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Table */}
// //             <Table<SystemLog>
// //               columns={columns as any}
// //               data={tableData}
// //               emptyState={
// //                 <tr>
// //                   <td colSpan={columns.length} className="text-center text-gray-500 py-4 font-medium">
// //                     No logs found.
// //                   </td>
// //                 </tr>
// //               }
// //             />
// //           </div>
// //         </DefaultLayout>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SystemLogs;




// 'use client';

// import React, { useState } from 'react';
// import DefaultLayout from '@/component/layout/DefaultLayout';
// import Table from '@/component/ui/Table';
// import Dropdown, { DropdownItem } from '@/component/ui/Dropdown';
// import { BiSolidFilterAlt, BiSearch } from 'react-icons/bi';

// interface SystemLog {
//   id: number;
//   action: string;
//   user: string;
//   description: string;
//   datetime: string; // full datetime string e.g., "2025-02-01 10:12 AM"
//   status: 'Success' | 'Warning' | 'Failed';
// }

// const SystemLogs = () => {
//   const [year, setYear] = useState(2025);
//   const [status, setStatus] = useState<'All' | 'Success' | 'Warning' | 'Failed'>('All');
//   const [search, setSearch] = useState('');

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

//   const columns = [
//     {
//       key: 'timestamp',
//       header: 'Timestamp',
//       align: 'center',
//       render: (_: any, row: SystemLog) => row.datetime,
//     },
//     { key: 'action', header: 'Action', align: 'left' },
//     { key: 'user', header: 'User', align: 'left' },
//     { key: 'description', header: 'Description', align: 'left' },
//     {
//       key: 'status',
//       header: 'Status',
//       align: 'center',
//       render: (_: any, row: SystemLog) => (
//         <div className="flex items-center justify-center space-x-2">
//           <span
//             className={`w-3 h-3 rounded-full ${statusStyle[row.status]}`}
//           ></span>
//           <span className="text-sm font-medium">{row.status}</span>
//         </div>
//       ),
//     },
//   ];

//   // Use type-safe empty row
//   const emptyRow: SystemLog = {
//     id: 0,
//     action: '',
//     user: '',
//     description: '',
//     datetime: '',
//     status: 'Success', // safe default
//   };

//   const tableData = filteredData.length > 0 ? filteredData : [emptyRow];

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
//               renderRow={(row: SystemLog) => {
//                 if (row.id === 0) {
//                   return (
//                     <tr key="empty">
//                       <td colSpan={columns.length} className="text-center text-gray-500 py-4 font-medium">
//                         No logs found.
//                       </td>
//                     </tr>
//                   );
//                 }

//                 return (
//                   <tr key={row.id}>
//                     {columns.map((col) => (
//                       <td key={col.key} className="px-4 py-2 text-sm text-gray-700">
//                         {'render' in col ? col.render(null, row) : (row as any)[col.key]}
//                       </td>
//                     ))}
//                   </tr>
//                 );
//               }}
//             />
//           </div>
//         </DefaultLayout>
//       </div>
//     </div>
//   );
// };

// export default SystemLogs;









'use client';

import React, { useState } from 'react';
import DefaultLayout from '@/component/layout/DefaultLayout';
import Table from '@/component/ui/Table';
import Dropdown, { DropdownItem } from '@/component/ui/Dropdown';
import { BiSolidFilterAlt, BiSearch } from 'react-icons/bi';

interface SystemLog {
  id: number;
  action: string;
  user: string;
  description: string;
  datetime: string; // e.g., "2025-02-01 10:12 AM"
  status: 'Success' | 'Warning' | 'Failed';
}

const SystemLogs = () => {
  const [year, setYear] = useState(2025);
  const [status, setStatus] = useState<'All' | 'Success' | 'Warning' | 'Failed'>('All');
  const [search, setSearch] = useState('');

  const data: SystemLog[] = [
    {
      id: 1,
      action: 'User Login',
      user: 'Admin',
      description: 'Logged into the system',
      datetime: '2025-02-01 10:12 AM',
      status: 'Success',
    },
    {
      id: 2,
      action: 'Update Settings',
      user: 'System Manager',
      description: 'Updated system appearance settings',
      datetime: '2025-02-02 08:33 AM',
      status: 'Warning',
    },
    {
      id: 3,
      action: 'Delete Account',
      user: 'Admin',
      description: 'Deleted user account: John Doe',
      datetime: '2025-02-03 01:15 PM',
      status: 'Failed',
    },
  ];

  const filteredData = data.filter((log) => {
    const searchMatch = [log.action, log.user, log.description, log.datetime]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase());
    const statusMatch = status === 'All' || log.status === status;
    return searchMatch && statusMatch;
  });

  const statusStyle = {
    Success: 'bg-green-500',
    Warning: 'bg-yellow-500',
    Failed: 'bg-red-500',
  };

  const yearItems: DropdownItem[] = [2023, 2024, 2025, 2026].map((y) => ({
    label: y.toString(),
    onClick: () => setYear(y),
  }));

  const statusItems: DropdownItem[] = ['All', 'Success', 'Warning', 'Failed'].map((s) => ({
    label: s,
    onClick: () => setStatus(s as any),
  }));

  // If no logs, create a dummy row to display "No logs found"
  const tableData = filteredData.length > 0 ? filteredData : [
    {
      id: 0,
      action: '',
      user: '',
      description: '',
      datetime: '',
      status: 'Success' as const, // type-safe
    },
  ];

  const columns = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      align: 'center',
      render: (_: any, row: SystemLog) => row.id === 0 ? '' : row.datetime,
    },
    { key: 'action', header: 'Action', align: 'left', render: (_: any, row: SystemLog) => row.id === 0 ? '' : row.action },
    { key: 'user', header: 'User', align: 'left', render: (_: any, row: SystemLog) => row.id === 0 ? '' : row.user },
    { key: 'description', header: 'Description', align: 'left', render: (_: any, row: SystemLog) => row.id === 0 ? '' : row.description },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (_: any, row: SystemLog) =>
        row.id === 0 ? (
          ''
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <span className={`w-3 h-3 rounded-full ${statusStyle[row.status]}`}></span>
            <span className="text-sm font-medium">{row.status}</span>
          </div>
        ),
    },
  ];

  return (
    <div className="flex max-h-screen">
      <div className="bg-blue-50 h-auto w-full">
        <DefaultLayout pageName="System Logs">
          <div className="py-4 px-7 space-y-6">
            {/* Search + Filters */}
            <div className="max-w-full flex justify-between items-center flex-wrap gap-4">
              {/* Search Bar */}
              <div className="relative flex items-center w-full md:w-64">
                <BiSearch className="absolute left-3 text-gray-500 text-lg" />
                <input
                  type="text"
                  placeholder="Search logs..."
                  className="
                    pl-10 pr-4 py-2 w-full
                    rounded-full text-sm bg-white shadow
                    outline-none border border-transparent
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-300
                    transition-all duration-300
                  "
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Filter Bubble */}
              <div className="inline-flex bg-white p-2 pr-5 rounded-full shadow space-x-4">
                <div className="flex items-center space-x-3">
                  <Dropdown buttonContent={`Year: ${year}`} items={yearItems} />
                  <Dropdown buttonContent={`Status: ${status}`} items={statusItems} />
                </div>
                <div className="flex items-center text-sm text-slate-500 font-medium cursor-pointer select-none">
                  <BiSolidFilterAlt className="mr-2 text-xl" />
                  More Filters
                </div>
              </div>
            </div>

            {/* Table */}
            <Table<SystemLog>
              columns={columns as any}
              data={tableData}
            />

            {/* Render "No logs found" overlay if tableData is empty row */}
            {tableData[0].id === 0 && (
              <div className="bg-white shadow rounded-md border border-gray-200 p-10 text-center text-gray-500 font-medium -mt-16">
                No logs found.
              </div>
            )}
          </div>
        </DefaultLayout>
      </div>
    </div>
  );
};

export default SystemLogs;
