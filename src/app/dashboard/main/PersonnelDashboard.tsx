// "use client";

// import ProtectedRoute from "@/component/ProtectedRoute";
// import RecentProposal from "./table/RecentProposal";
// import MonthlyHarvestChart from "./charts/HarvestChart";
// import { useEffect, useState } from "react";
// import CustomSkeleton from "@/component/skeleton/CardSkeleton";
// import NewProposal from "./cards/NewProposal";
// import OngoingProposal from "./cards/OngoingProposal";
// import TerminatedProposal from "./cards/TerminatedProposal";
// import CompletedProposal from "./cards/CompletedProposal";
// import RecentProjectPage from "./table/AnnualResearch";
// import MonthlyAnalytics from "./table/MonthlyAnalytics";
// import UpcomingReviewSchedule from "./table/UpcomingReviewSchedule";
// import RecentAnnouncement from "./table/RecentAnnouncement";
// import NotificationsTable from "./table/NotificationsTable";

// const FacultyDashboard = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 3000);
//   });
//   return (
//     // <ProtectedRoute allowedRoles={['admin']}>
//     <div className="bg-blue-50 h-full">
//       {/* <Breadcrumb pageName="Dashboard" /> */}
//       <div
//         className="bg-blue-50 overflow-x-scroll scroll-hide px-5 pt-2 pb-5"
//         style={{ height: "calc(100vh - 97px)" }}
//       >
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
//         {/* ANALYTICS / TABLES */}
//         <div className="mt-3 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
//           {/* Monthly Analytics */}
//           <div className="sm:col-span-1 lg:col-span-1">
//             <MonthlyAnalytics />
//           </div>

//           {/* Annual Research */}
//           <div className="sm:col-span-1 lg:col-span-3">
//             <RecentProjectPage />
//           </div>
//         </div>

//         {/* Recent Proposal */}
//         <div className="mt-5.5">
//           <RecentProposal />
//         </div>

//         {/* ANNOUNCEMENTS & SCHEDULE */}
//         <section className="mt-3">
//           <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12">
//             {/* Recent Announcement */}
//             <div className="lg:col-span-3">
//               <RecentAnnouncement />
//             </div>

//             {/* Notifications */}
//             <div className="lg:col-span-3">
//               <NotificationsTable />
//             </div>

//             {/* Upcoming Review Schedule */}
//             <div className="lg:col-span-6">
//               <UpcomingReviewSchedule />
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//     // {/* </ProtectedRoute> */}
//   );
// };

// export default FacultyDashboard;




"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

import CustomSkeleton from "@/component/skeleton/CardSkeleton";
import NewProposal from "./cards/NewProposal";
import OngoingProposal from "./cards/OngoingProposal";
import CompletedProposal from "./cards/CompletedProposal";
import TerminatedProposal from "./cards/TerminatedProposal";
import RecentProposal from "./table/RecentProposal";
import RecentProjectPage from "./table/AnnualResearch";
import MonthlyAnalytics from "./table/MonthlyAnalytics";
import UpcomingReviewSchedule from "./table/UpcomingReviewSchedule";
import RecentAnnouncement from "./table/RecentAnnouncement";
import NotificationsTable from "./table/NotificationsTable";
import { canViewAnalytics, canViewEvaluationIncoming } from "@/utils/roleAccess"

const FacultyDashboard = () => {
  const { userRole, isAuthenticatedChecked } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticatedChecked) return;

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isAuthenticatedChecked]);

  const showAnalytics = canViewAnalytics(userRole);
  const showEvaluationIncoming = canViewEvaluationIncoming(userRole);

  if (!isAuthenticatedChecked) return null;

  return (
    <div className="bg-blue-50 h-full">
      <div
        className="bg-blue-50 overflow-x-scroll scroll-hide px-5 pt-2 pb-5"
        style={{ height: "calc(100vh - 97px)" }}
      >
        {/* SUMMARY CARDS (ALL ROLES) */}
        {loading ? (
          <CustomSkeleton type="card" count={4} />
        ) : (
          <div className="grid gap-3 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            <NewProposal />
            <OngoingProposal />
            <CompletedProposal />
            <TerminatedProposal />
          </div>
        )}

        {/* ANALYTICS (HIDDEN FOR FACULTY RESEARCHERS) */}
        {showAnalytics && (
          <div className="mt-3 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <MonthlyAnalytics />
            </div>

            <div className="lg:col-span-3">
              <RecentProjectPage />
            </div>
          </div>
        )}

        {/* RECENT PROPOSALS (ALL ROLES) */}
        <div className="mt-5.5">
          <RecentProposal />
        </div>

        {/* ANNOUNCEMENTS / NOTIFICATIONS / SCHEDULE */}
        <section className="mt-3">
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <RecentAnnouncement />
            </div>

            <div className="lg:col-span-3">
              <NotificationsTable />
            </div>

            <div className="lg:col-span-6">
              <UpcomingReviewSchedule />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FacultyDashboard;
