// 'use client';

// import React, { useState } from 'react';
// import DefaultLayout from '@/component/layout/DefaultLayout';
// import UserTable from './table/UserTable';
// import TotalUser from './cards/TotalUser';
// import { Stack } from '@mui/material';

// const UserManagement = () => {
//   return (
//     <div className="flex max-h-screen">
//       <div className="bg-blue-50 h-auto w-full">
//         <DefaultLayout pageName='System Management'>
//           <div className='py-3 px-7'>
//             <Stack>
//               <TotalUser />
//             </Stack>
//             <UserTable />
//           </div>
//         </DefaultLayout>
//       </div>
//     </div>
//   );
// };

// export default UserManagement;




"use client";

import React from "react";
import DefaultLayout from "@/component/layout/DefaultLayout";
import UserTable from "./table/UserTable";
import TotalUser from "./cards/TotalUser";
import ActiveAccounts from "./cards/ActiveAccount";
import PendingAccount from "./cards/PendingAccount";
import InactiveAccount from "./cards/ActiveAccount";
import InactiveAccounts from "./cards/InactiveAccount";

const UserManagement = () => {
  return (
    <div className="flex max-h-screen">
      <div className="bg-blue-50 h-auto w-full">
        <DefaultLayout pageName="System Management">
          <div className="py-3 px-7 space-y-6">

            {/* ⭐ Responsive Grid for 8 TotalUser Cards (NO ARRAY MAP) */}
            <div
              className="
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-4 
                gap-4
                w-full
              "
            >
              <TotalUser />
              <ActiveAccounts />
              <PendingAccount />
              <InactiveAccounts />
              <TotalUser />
              <TotalUser />
              <TotalUser />
              <TotalUser />
            </div>

            {/* Table */}
            <UserTable />
          </div>
        </DefaultLayout>
      </div>
    </div>
  );
};

export default UserManagement;
