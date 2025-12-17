'use client';

import { useEffect, useState } from "react";
import CustomSkeleton from "@/component/skeleton/CardSkeleton";
import AllResearchPage from "./AllResearch";

const FacultyDashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  })
  return (
    // <ProtectedRoute allowedRoles={['admin']}>
    <div className="bg-blue-50 h-full">
      {/* <Breadcrumb pageName="Dashboard" /> */}
      <div className="bg-blue-50 overflow-x-scroll scroll-hide mt-[-10px]" style={{ height: 'calc(100vh - 97px)' }}>
        <AllResearchPage />
      </div>
    </div>
    // {/* </ProtectedRoute> */}
  );
};

export default FacultyDashboard;
