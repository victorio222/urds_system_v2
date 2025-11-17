import CalendarComp from '@/component/ui/Calendar'
import DefaultLayout from '@/component/layout/DefaultLayout';

const Calendar = () => {
  return (
    // <Grid container spacing={2.5}>
    //   <Grid item xs={12} md={12} lg={100}>
    //     <CalendarComp />
    //   </Grid>
    // </Grid>
    <DefaultLayout pageName='Calendar'>
        <CalendarComp />
    </DefaultLayout>
  );
};

export default Calendar;
