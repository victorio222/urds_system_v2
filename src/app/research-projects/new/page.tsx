'use client';
import React, { useState } from 'react';
import DefaultLayout from '@/component/layout/DefaultLayout';
import NewResearchPage from './table/Scrollable';

const AllResearch = () => {
  return (
    <div className="flex max-h-screen">
      <div className="bg-blue-50 h-auto w-full">
        <DefaultLayout pageName='Research Projects'>
          <div>
            <NewResearchPage/>
          </div>
        </DefaultLayout>
      </div>
    </div>
  );
};

export default AllResearch;
