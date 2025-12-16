import DefaultLayout from "@/component/layout/DefaultLayout";
import UserTable from "./table/UserTable";
import TotalUser from "./cards/TotalUser";
import ActiveAccounts from "./cards/ActiveAccount";
import PendingAccount from "./cards/PendingAccount";
import InactiveAccounts from "./cards/InactiveAccount";
import FacultyResearcher from "./cards/FacultyResearcher";
import TwgEvaluator from "./cards/TwgEvaluator";
import StaffandDirector from "./cards/StaffandDirector";
import RecentlyActive from "./cards/RecentlyActive";
import ProtectedRoute from "@/component/ProtectedRoute";

const UserManagement = () => {
  return (
    <div className="flex max-h-screen">
      <div className="bg-blue-50 w-full" style={{ minHeight: "calc(100vh - 97px)" }}>
        <div className="px-8 py-4 space-y-2">
          {/* ⭐ Responsive Grid for 8 TotalUser Cards (NO ARRAY MAP) */}
          <div
            className="
                  grid 
                  grid-cols-1 
                  sm:grid-cols-2 
                  md:grid-cols-2 
                  lg:grid-cols-4 
                  gap-4
                  w-full
                "
          >
            <TotalUser />
            <ActiveAccounts />
            <PendingAccount />
            <InactiveAccounts />
            <FacultyResearcher />
            <TwgEvaluator />
            <StaffandDirector />
            <RecentlyActive />
          </div>

          {/* Table */}
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
