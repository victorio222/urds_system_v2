import React, { useState } from 'react';
import DefaultLayout from '@/component/layout/DefaultLayout';
import ResearchEvaluatorPage from './table/ResearchEvaluator';
import ProtectedRoute from '@/component/ProtectedRoute';

const ResearchEvaluator = () => {
  return (
    
    <ProtectedRoute allowedRoles={["Research Evaluator"]}>
      <div className="flex max-h-screen">
        <div className="bg-blue-50 h-auto w-full">
          {/* <DefaultLayout pageName='Evaluation History'> */}
            <div className='p-[-20px]'>
              <ResearchEvaluatorPage />
            </div>
          {/* </DefaultLayout> */}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ResearchEvaluator;

