import TrackerLayout from '@/components/Layout/TrackerLayout';
import { getDayData } from '@/hooks/firebase';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';

const Date = () => {
  const router = useRouter();
  const { date } = router.query;
  const { user } = useSelector(selectUser);

  useEffect(() => {
    const getData = async () => {
      if (!user) return;
      const data = await getDayData(user, String(date));
      console.log({ data });
    };
    getData();
  }, [date]);

  return <TrackerLayout>{}</TrackerLayout>;
};

export default Date;
