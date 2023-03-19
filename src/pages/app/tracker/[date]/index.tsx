import TrackerLayout from '@/components/Layout/TrackerLayout';
import { getDayData } from '@/hooks/firebase';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import { setCleanDayData, setDayData } from 'store/slices/trackerSlice';

const Date = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { date } = router.query;
  const { user } = useSelector(selectUser);

  useEffect(() => {
    dispatch(setCleanDayData());
    const getData = async () => {
      if (!user) return;
      console.log('Fetching DayData');
      const data = await getDayData(user, String(date));
      dispatch(setDayData(data));
    };
    getData();
  }, [date, user]);

  return <TrackerLayout>{}</TrackerLayout>;
};

export default Date;
