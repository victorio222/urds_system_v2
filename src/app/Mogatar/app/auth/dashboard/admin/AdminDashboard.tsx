'use client';

import ProtectedRoute from "@/component/ProtectedRoute";
import TotalUserCard from "./cards/TotalUser";
import TotalUserCard1 from "./cards/TotalUser copy 2";
import TotalUserCard2 from "./cards/TotalUser copy 3";
import TotalUserCard3 from "./cards/TotalUser copy 4";
import TotalUserCard4 from "./cards/TotalUser copy 5";
import TotalUserCard5 from "./cards/TotalUser copy";
import Breadcrumb from "@/component/ui/Breadcrumbs";

const AdminDashboard = () => {
  return (
    // <ProtectedRoute allowedRoles={['admin']}>
    <div className="bg-gray-200 h-32">
      <Breadcrumb pageName="Dashboard" />
      <div className="bg-gray-200 overflow-x-scroll scroll-hide p-5 pb-10" style={{ height: 'calc(100vh - 97px)'}}>
        {/* <h1 className="text-gray-700">Welcome to the Admin Dashboard</h1> */}
        <div className="grid lg:grid-cols-3 mx-2 gap-3 md:grid-cols-2 sm:grid-cols-1">
          <TotalUserCard />
          <TotalUserCard1 />
          <TotalUserCard2 />
          <TotalUserCard3 />
          <TotalUserCard4 />
          <TotalUserCard5 />
        </div>
      </div>
    </div>
    // {/* </ProtectedRoute> */}
  );
};

export default AdminDashboard;
