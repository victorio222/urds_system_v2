'use client';
import React, { useState } from 'react';
import DefaultLayout from '@/component/layout/DefaultLayout';
import ProposalWizard from './pages/ProposalWizard';

const SubmitForm = () => {
  return (
    <div className="flex max-h-screen">
      <div className="bg-blue-50 h-auto w-full">
        <DefaultLayout pageName='Submit Proposal'>
          <div className='py-3 px-5'>
            <ProposalWizard/>
          </div>
          
        </DefaultLayout>
      </div>
    </div>
  );
};

export default SubmitForm;
