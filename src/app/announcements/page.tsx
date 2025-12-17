// import DefaultLayout from "@/component/layout/DefaultLayout";
// import AnnouncementPage from "./table/Announcement";
// import ProtectedRoute from "@/component/ProtectedRoute";

// const Announcements = () => {
//   return (
//     <ProtectedRoute allowedRoles={["URDS Director", "URDS Staff", "College Dean", "College Coordinator", "Senior Faculty Researcher", "Faculty Researcher"]}>
//       <div className="flex max-h-screen">
//         <div className="bg-blue-50 h-auto w-full">
//           <DefaultLayout pageName="Announcement">
//             <div>
//               <AnnouncementPage />
//             </div>
//           </DefaultLayout>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// };

// export default Announcements;






"use client";

import DefaultLayout from "@/component/layout/DefaultLayout";
import AnnouncementPage from "./table/Scrollable"; // Your Table/Admin View
// Your Card/Reader View
import ProtectedRoute from "@/component/ProtectedRoute";
import { useAuth } from "@/context/AuthContext"; // Path to your AuthContext
import AnnouncementFeed from "../call-for-research/Scrollable";

const Announcements = () => {
  const { userRole } = useAuth();

  // Define logic for Administrative access
  const isManagementRole = userRole === "URDS Director" || userRole === "URDS Staff";

  return (
    <ProtectedRoute 
      allowedRoles={[
        "URDS Director", 
        "URDS Staff", 
        "College Dean", 
        "College Coordinator", 
        "Senior Faculty Researcher", 
        "Faculty Researcher"
      ]}
    >
      <div className="flex min-h-screen">
        <div className="bg-[#F8FAFC] h-auto w-full">
          <DefaultLayout pageName="Announcement">
            <div className="w-full">
              {isManagementRole ? (
                /* Admin/Staff see the Table for managing posts */
                <AnnouncementPage />
              ) : (
                /* Deans/Coordinators/Researchers see the clean Feed View */
                <AnnouncementFeed />
              )}
            </div>
          </DefaultLayout>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Announcements;