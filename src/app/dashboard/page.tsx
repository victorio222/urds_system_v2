import DefaultLayout from '@/component/layout/DefaultLayout';
import PersonelDasboard from './main/PersonnelDashboard';
import ProtectedRoute from '@/component/ProtectedRoute';

const DashboardPage = () => {
  return (
    <ProtectedRoute allowedRoles={["URDS Director", "URDS Staff", "College Dean", "College Coordinator", "Senior Faculty Researcher", "Faculty Researcher", "Research Evaluator"]}>
      <div>
        <DefaultLayout pageName='Dashboard'>
          <PersonelDasboard />
        </DefaultLayout>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
