import DefaultLayout from '@/component/layout/DefaultLayout';
import EvaluationHistory from './table/Scrollable';
import ProtectedRoute from '@/component/ProtectedRoute';

const Announcements = () => {
  return (
    <ProtectedRoute allowedRoles={["Research Evaluator"]}>
      <div className="flex max-h-screen">
        <div className="bg-blue-50 h-auto w-full">
          <DefaultLayout pageName='Evaluation History'>
            <div className='m-7'>
              <EvaluationHistory />
            </div>
          </DefaultLayout>
        </div>
      </div>
    </ProtectedRoute>
    
  );
};


export default Announcements;