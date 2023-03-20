import PremiumLayout from '@/components/Layout/PremiumLayout';
import { ReactNode } from 'react';
import Tracker from '../Tracker/Tracker';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';

const TrackerLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useSelector(selectUser);
  // const { day_date } = useSelector(selectDayData);
  // const router = useRouter();
  // const dispatch = useDispatch();
  // const { date } = router.query;

  // useEffect(() => {
  //   if (date && date !== day_date) {
  //     dispatch(setCleanDayData());
  //     dispatch(setDaySelected(String(date)));
  //     const getData = async () => {
  //       if (!user) return;
  //       console.log('Fetching DayData');
  //       const data = await getDayData(user, String(date));
  //       dispatch(setDayData(data));
  //     };
  //     getData();
  //   }
  // }, [date, user]);

  return (
    <PremiumLayout withPadding={false}>
      <div className='container'>
        {user && <Tracker />}
        {children}
      </div>
      <style jsx>{`
        .container {
          max-width: var(--max-width-content);
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          align-items: center;
          padding-top: calc(var(--premium-nav-height));
        }
      `}</style>
    </PremiumLayout>
  );
};

export default TrackerLayout;
