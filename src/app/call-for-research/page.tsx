import CalendarComp from '@/component/ui/Calendar'
import DefaultLayout from '@/component/layout/DefaultLayout';
import ProtectedRoute from '@/component/ProtectedRoute';
import AnnouncementPage from './content/Announcement';
import AnnouncementFeed from './Announcement';

const Calendar = () => {
  return (
    <ProtectedRoute allowedRoles={["URDS Director", "URDS Staff", "College Dean", "College Coordinator", "Senior Faculty Researcher", "Faculty Researcher"]}>
      <div className="flex max-h-screen">
        <div className="bg-blue-50 h-auto w-full">
            <DefaultLayout pageName='Announcement'>
              <AnnouncementFeed />
            </DefaultLayout>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Calendar;
