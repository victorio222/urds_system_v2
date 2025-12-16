import DefaultLayout from '@/component/layout/DefaultLayout';
import NotificationContent from './content/NotificationContent';
import ProtectedRoute from '@/component/ProtectedRoute';

const ResearchEvaluator = () => {
  return (
    <ProtectedRoute allowedRoles={["URDS Director", "URDS Staff", "College Dean", "College Coordinator", "Senior Faculty Researcher", "Faculty Researcher","Research Evaluator"]}>
      <div className="flex max-h-screen">
        <div className="bg-blue-50 h-auto w-full">
          <DefaultLayout pageName='Notifications'>
            <div>
              <NotificationContent />
            </div>
          </DefaultLayout>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ResearchEvaluator;

