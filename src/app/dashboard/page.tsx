import AdminDashboard from './admin/AdminDashboard';
import DefaultLayout from '@/component/layout/DefaultLayout';
import PersonelDasboard from './main/PersonnelDashboard';

const DashboardPage = () => {
  return (
    <div>
      <DefaultLayout pageName='Dashboard'>
        <PersonelDasboard />
      </DefaultLayout>
    </div>
  );
};

export default DashboardPage;
