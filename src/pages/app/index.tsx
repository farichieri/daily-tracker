import { selectTrackerSlice } from 'store/slices/trackerSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const TrackerPage = () => {
  const router = useRouter();
  const { today } = useSelector(selectTrackerSlice);

  useEffect(() => {
    router.push(`/app/tracker/${today}`);
  }, []);

  return <></>;
};

export default TrackerPage;
