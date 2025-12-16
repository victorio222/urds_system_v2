'use client';

import DefaultLayout from '@/component/layout/DefaultLayout';
import PersonnelDashboard from '@/app/dashboard/personnel/PersonnelDashboard';

const FacultyResearcherPage = () => {
  return (
    <div className="flex max-h-screen">
      <DefaultLayout pageName="Faculty Researcher">
        <PersonnelDashboard />
      </DefaultLayout>
    </div>
  );
};

export default FacultyResearcherPage;

