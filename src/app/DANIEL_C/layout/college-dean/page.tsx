'use client';

import DefaultLayout from '@/component/layout/DefaultLayout';
import PersonnelDashboard from '@/app/dashboard/personnel/PersonnelDashboard';

const CollegeDeanPage = () => {
  return (
    <div className="flex max-h-screen">
      <DefaultLayout pageName="College Dean">
        <PersonnelDashboard />
      </DefaultLayout>
    </div>
  );
};

export default CollegeDeanPage;

