// 'use client';

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
//         <div className="flex pt-3 pb-2 ">

//          <MonthlyAnalytics />
//         <div className='pr-4'></div>
//           <RecentProjectPage/>
//         </div>
//          <RecentProposal/>
//    <section className="mt-4">

//       <div className="grid gap-4 lg:grid-cols-12">
//         {/* 25% width */}
//         <div className="lg:col-span-3">
//           <RecentAnnouncement />
//         </div>

//         {/* 25% width */}
//         <div className="lg:col-span-3">
//           <NotificationsTable />
//         </div>

//         {/* 50% width */}
//         <div className="lg:col-span-6">
//           <UpcomingReviewSchedule />
//         </div>
//       </div>
//     </section>

//       </div>
//     </div>
//     // {/* </ProtectedRoute> */}
//   );
// };

// export default FacultyDashboard;

// 'use client';

// import ProtectedRoute from "@/component/ProtectedRoute";
// import RecentProposal from "./table/RecentProposal";
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
//     const timer = setTimeout(() => setLoading(false), 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="bg-blue-50 min-h-screen flex flex-col">
//       <div className="px-4 sm:px-5 pt-2 pb-5 flex-1 overflow-y-auto">
//         {/* CARD SUMMARY */}
//         {loading ? (
//           <div>
//             <CustomSkeleton type="card" count={4} />
//             <CustomSkeleton type="chart" />
//           </div>
//         ) : (
//           <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
//         <div className="mt-3">
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
//   );
// };

// export default FacultyDashboard;

// 'use client';

// import ProtectedRoute from "@/component/ProtectedRoute";
// import RecentProposal from "./table/RecentProposal";
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
//     const timer = setTimeout(() => setLoading(false), 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="bg-blue-50 h-full min-h-screen flex flex-col">
//       <div
//         className="bg-blue-50 overflow-y-auto overflow-x-hidden scroll-hide px-5 pt-2 pb-5 flex-1"
//         style={{ height: 'calc(100vh - 97px)' }}
//       >
//         {/* CARD SUMMARY */}
//         {loading ? (
//           <div>
//             <CustomSkeleton type="card" count={4} />
//             <CustomSkeleton type="chart" />
//           </div>
//         ) : (
//           <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
//         <div className="mt-3">
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
//   );
// };

// export default FacultyDashboard;

"use client";

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
      setLoading(false);
    }, 3000);
  });
  return (
    // <ProtectedRoute allowedRoles={['admin']}>
    <div className="bg-blue-50 h-full">
      {/* <Breadcrumb pageName="Dashboard" /> */}
      <div
        className="bg-blue-50 overflow-x-scroll scroll-hide px-5 pt-2 pb-5"
        style={{ height: "calc(100vh - 97px)" }}
      >
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
        {/* ANALYTICS / TABLES */}
        <div className="mt-3 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Monthly Analytics */}
          <div className="sm:col-span-1 lg:col-span-1">
            <MonthlyAnalytics />
          </div>

          {/* Annual Research */}
          <div className="sm:col-span-1 lg:col-span-3">
            <RecentProjectPage />
          </div>
        </div>

        {/* Recent Proposal */}
        <div className="mt-5.5">
          <RecentProposal />
        </div>

        {/* ANNOUNCEMENTS & SCHEDULE */}
        <section className="mt-3">
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12">
            {/* Recent Announcement */}
            <div className="lg:col-span-3">
              <RecentAnnouncement />
            </div>

            {/* Notifications */}
            <div className="lg:col-span-3">
              <NotificationsTable />
            </div>

            {/* Upcoming Review Schedule */}
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
