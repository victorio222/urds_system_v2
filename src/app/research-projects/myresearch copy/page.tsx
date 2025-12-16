'use client';
import React, { useState } from 'react';
import DefaultLayout from '@/component/layout/DefaultLayout';
import AllResearchPage from './table/AllResearch';
import ActivityTimeline from './table/ActivityTimeline';
import UpdatesList from './table/UpdateList';

const AllResearch = () => {
  return (
    <div className="flex max-h-screen">
      <div className="bg-blue-50 h-auto w-full">
        <DefaultLayout pageName='My Research Projects'>
          <div className='py-3 px-5'>
            <AllResearchPage />
            </div>
            <div className='flex justify-between py-3 px-5  gap-4'>
              <ActivityTimeline  />
             
              <UpdatesList />
            
          </div>
        </DefaultLayout>
      </div>
    </div>
  );
};

export default AllResearch;
