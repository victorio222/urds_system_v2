'use client';
import React, { useState } from 'react';
import DefaultLayout from '@/component/layout/DefaultLayout';
import EvaluationHistoryPage from './table/EvaluationHistory';

const EvaluationHistory = () => {
  return (
    <div className="flex max-h-screen">
      <div className="bg-blue-50 h-auto w-full">
        <DefaultLayout pageName='Evaluation History'>
          <div className='py-3 px-5'>
            <EvaluationHistoryPage />
          </div>
        </DefaultLayout>
      </div>
    </div>
  );
};

export default EvaluationHistory;
