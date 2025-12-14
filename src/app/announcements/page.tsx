'use client';
import React, { useState } from 'react';
import DefaultLayout from '@/component/layout/DefaultLayout';
import AnnouncementPage from './table/Announcement';

const Announcements = () => {
  return (
    <div className="flex max-h-screen">
      <div className="bg-blue-50 h-auto w-full">
        <DefaultLayout pageName='Announcement'>
          <div className='py-3 px-7'>
            <AnnouncementPage />
          </div>
        </DefaultLayout>
      </div>
    </div>
  );
};

export default Announcements;
