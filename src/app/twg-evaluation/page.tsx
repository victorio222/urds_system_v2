'use client';
import React, { useState } from 'react';
import DefaultLayout from '@/component/layout/DefaultLayout';
import TwgEvalPage from './table/TwgEvalPage';

const Announcements = () => {
  return (
    <div className="flex max-h-screen">
      <div className="bg-blue-50 h-auto w-full">
        <DefaultLayout pageName='TWG Evaluation'>
          <div className='py-3 px-5'>
            <TwgEvalPage />
          </div>
        </DefaultLayout>
      </div>
    </div>
  );
};

export default Announcements;
