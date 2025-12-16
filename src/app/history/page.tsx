import React, { useState } from 'react';
import DefaultLayout from '@/component/layout/DefaultLayout';
import InHousePage from './table/EvaluationHistory';
import EvaluationHistory from './table/EvaluationHistory';
import ProtectedRoute from '@/component/ProtectedRoute';

const Announcements = () => {
  return (
    <ProtectedRoute allowedRoles={["Research Evaluator"]}>
      <div className="flex max-h-screen">
        <div className="bg-blue-50 h-auto w-full">
          <DefaultLayout pageName='Evaluation History'>
            <div className='py-3 px-5'>
              <EvaluationHistory />
            </div>
          </DefaultLayout>
        </div>
      </div>
    </ProtectedRoute>
    
  );
};


export default Announcements;