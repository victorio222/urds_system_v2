'use client';

import { useEffect, useState } from "react";
import CustomSkeleton from "@/component/skeleton/CardSkeleton";
import EvaluationHistory from "./EvaluationHistory";

const FacultyDashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  })
  return (
    // <ProtectedRoute allowedRoles={['admin']}>
    <div className="h-full">
      <div className="overflow-x-scroll scroll-hide mt-[-10px]" style={{ height: 'calc(100vh - 150px)' }}>
        <EvaluationHistory />
      </div>
    </div>
    // {/* </ProtectedRoute> */}
  );
};

export default FacultyDashboard;
