import PremiumLayout from '@/components/Layout/PremiumLayout';
import { ReactNode } from 'react';
import Tracker from '../Tracker/Tracker';
import { getDayData } from '@/hooks/firebase';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import {
  selectDayData,
  selectTrackerSlice,
  setCleanDayData,
  setDayData,
  setDaySelected,
} from 'store/slices/trackerSlice';

const TrackerLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useSelector(selectUser);
  const { daySelected } = useSelector(selectTrackerSlice);
  const { day_date } = useSelector(selectDayData);
  const router = useRouter();
  const dispatch = useDispatch();
  const { date } = router.query;

  useEffect(() => {
    if (date && date !== day_date) {
      dispatch(setCleanDayData());
      dispatch(setDaySelected(String(date)));
      const getData = async () => {
        if (!user) return;
        console.log('Fetching DayData');
        const data = await getDayData(user, String(date));
        dispatch(setDayData(data));
      };
      getData();
    }
  }, [date, user, daySelected]);

  return (
    <PremiumLayout withPadding={false}>
      <div className='container'>
        {user && <Tracker />}
        {children}
      </div>
      <style jsx>{`
        .container {
          max-width: var(--max-width);
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
