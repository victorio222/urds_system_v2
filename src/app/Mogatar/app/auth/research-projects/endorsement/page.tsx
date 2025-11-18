'use client';
import React, { useState } from 'react';
import DefaultLayout from '@/component/layout/DefaultLayout';
import EndorsementPage from './table/Endorsement';

const Endorsement = () => {
  return (
    <div className="flex max-h-screen">
      <div className="bg-blue-50 h-auto w-full">
        <DefaultLayout pageName='Endorsement'>
          <div className='py-3 px-5'>
            <EndorsementPage />
          </div>
        </DefaultLayout>
      </div>
    </div>
  );
};

export default Endorsement;
