'use client';
import React, { useState } from 'react';
import DefaultLayout from '@/component/layout/DefaultLayout';
import ResearchEvaluatorPage from './table/AssignedProjects';

const ResearchEvaluator = () => {
  return (
    <div className="flex max-h-screen">
      <div className="bg-blue-50 h-auto w-full">
        <DefaultLayout pageName='Evaluation History'>
          <div className='py-3 px-5'>
            <ResearchEvaluatorPage />
          </div>
        </DefaultLayout>
      </div>
    </div>
  );
};

export default ResearchEvaluator;
