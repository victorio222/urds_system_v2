import React, { useState } from 'react';
import DefaultLayout from '@/component/layout/DefaultLayout';
import InHousePage from './table/InHouseTable';
import ProtectedRoute from '@/component/ProtectedRoute';

const Announcements = () => {
  return (
    <ProtectedRoute allowedRoles={["URDS Director", "URDS Staff"]}>
      <div className="flex max-h-screen">
        <div className="bg-blue-50 h-auto w-full">
          <DefaultLayout pageName='In-House Schedule'>
            <div className='py-3 px-5'>
              <InHousePage />
            </div>
          </DefaultLayout>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Announcements;
