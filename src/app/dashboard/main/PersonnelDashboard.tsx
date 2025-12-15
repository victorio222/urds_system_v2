// 'use client';

// import ProtectedRoute from "@/component/ProtectedRoute";
// import SensorChart from "./charts/Chart";
// import MonthlyHarvestChart from "./charts/HarvestChart";
// import { useEffect, useState } from "react";
// import CustomSkeleton from "@/component/skeleton/CardSkeleton";
// import NewProposal from "./cards/NewProposal";
// import OngoingProposal from "./cards/OngoingProposal";
// import TerminatedProposal from "./cards/TerminatedProposal";
// import CompletedProposal from "./cards/CompletedProposal";
// import RecentProjectPage from "./table/RecentProposal";

// const PersonnelDashboard = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false)
//     }, 3000)
//   })
//   return (
//     // <ProtectedRoute allowedRoles={['admin']}>
//     <div className="bg-blue-50 h-full">
//       {/* <Breadcrumb pageName="Dashboard" /> */}
//       <div className="bg-blue-50 overflow-x-scroll scroll-hide px-5 pt-2 pb-5" style={{ height: 'calc(100vh - 97px)' }}>
//         {loading ? (
//           <div>
//             <CustomSkeleton type="card" count={3} />
//             <CustomSkeleton type="chart" />
//           </div>
//         ) : (
//           <div className="grid gap-3 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
//             <NewProposal />
//             <OngoingProposal />
//             <CompletedProposal />
//             <TerminatedProposal />
//           </div>
//         )}
//         <div>
//           <SensorChart />
//           <MonthlyHarvestChart />
//         </div>
//         <div>
//           <RecentProjectPage/>
//         </div>
//       </div>
//     </div>
//     // {/* </ProtectedRoute> */}
//   );
// };

// export default PersonnelDashboard;


'use client';

import ProtectedRoute from "@/component/ProtectedRoute";
import RecentProposal from "./table/RecentProposal";
import MonthlyHarvestChart from "./charts/HarvestChart";
import { useEffect, useState } from "react";
import CustomSkeleton from "@/component/skeleton/CardSkeleton";
import NewProposal from "./cards/NewProposal";
import OngoingProposal from "./cards/OngoingProposal";
import TerminatedProposal from "./cards/TerminatedProposal";
import CompletedProposal from "./cards/CompletedProposal";
import RecentProjectPage from "./table/AnnualResearch";
import MonthlyAnalytics from "./table/MonthlyAnalytics";
import UpcomingReviewSchedule from "./table/UpcomingReviewSchedule";
import RecentAnnouncement from "./table/RecentAnnouncement";
import NotificationsTable from "./table/NotificationsTable";

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
      <div className="bg-blue-50 overflow-x-scroll scroll-hide px-5 pt-2 pb-5" style={{ height: 'calc(100vh - 97px)' }}>
        {loading ? (
          <div>
            <CustomSkeleton type="card" count={3} />
            <CustomSkeleton type="chart" />
          </div>
        ) : (
          <div className="grid gap-3 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            <NewProposal />
            <OngoingProposal />
            <CompletedProposal />
            <TerminatedProposal />
          </div>
        )}
        <div className="flex pt-3 pb-2 ">
          
         <MonthlyAnalytics />
        <div className='pr-4'></div>
          <RecentProjectPage/>
        </div>
         <RecentProposal/>
   <section className="mt-4">
    
      <div className="grid gap-4 lg:grid-cols-12">
        {/* 25% width */}
        <div className="lg:col-span-3">
          <RecentAnnouncement />
        </div>

        {/* 25% width */}
        <div className="lg:col-span-3">
          <NotificationsTable />
        </div>

        {/* 50% width */}
        <div className="lg:col-span-6">
          <UpcomingReviewSchedule />
        </div>
      </div>
    </section>
        
      </div>
    </div>
    // {/* </ProtectedRoute> */}
  );
};

export default FacultyDashboard;
