'use client';
import React, { useState } from 'react';
import DefaultLayout from '@/component/layout/DefaultLayout';
import AssignedProjectPage from './table/AssignedProjects';

const AssignedProject = () => {
  return (
    <div className="flex max-h-screen">
      <div className="bg-blue-50 h-auto w-full">
        <DefaultLayout pageName='Assigned Projects'>
          <div className='py-3 px-5'>
            <AssignedProjectPage />
          </div>
        </DefaultLayout>
      </div>
    </div>
  );
};

export default AssignedProject;
