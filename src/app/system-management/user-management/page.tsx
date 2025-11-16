'use client';

import React, { useState } from 'react';
import DefaultLayout from '@/component/layout/DefaultLayout';
import UserTable from './table/UserTable';

const UserManagement = () => {
  return (
    <div className="flex max-h-screen">
      <div className="bg-blue-50 h-auto w-full">
        <DefaultLayout>
          <div className='py-3 px-7'>
            <UserTable />
          </div>
        </DefaultLayout>
      </div>
    </div>
  );
};

export default UserManagement;
