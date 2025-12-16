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
import UserPage from './UserPage'

const UserManagement = () => {
  return (
    <ProtectedRoute allowedRoles={["URDS Director"]}>
      <div className="flex max-h-screen">
        <div className="bg-blue-50 h-full w-full">
          <DefaultLayout pageName="System Management">
            <UserPage />
          </DefaultLayout>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default UserManagement;
