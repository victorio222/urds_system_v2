'use client';
import React, { useState } from 'react';
import DefaultLayout from '@/component/layout/DefaultLayout';
import OnGoingResearchPage from './table/OnGoingResearch';

const AllResearch = () => {
  return (
    <div className="flex max-h-screen">
      <div className="bg-blue-50 h-auto w-full">
        <DefaultLayout pageName='Research Projects'>
          <div className='py-3 px-5'>
            <OnGoingResearchPage/>
          </div>
        </DefaultLayout>
      </div>
    </div>
  );
};

export default AllResearch;
