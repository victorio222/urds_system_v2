'use client';
import React, { useState } from 'react';
import DefaultLayout from '@/component/layout/DefaultLayout';
import NotificationContent from './content/NotificationContent';

const ResearchEvaluator = () => {
  return (
    <div className="flex max-h-screen">
      <div className="bg-blue-50 h-auto w-full">
        <DefaultLayout pageName='Notifications'>
          <div>
            <NotificationContent />
          </div>
        </DefaultLayout>
      </div>
    </div>
  );
};

export default ResearchEvaluator;

