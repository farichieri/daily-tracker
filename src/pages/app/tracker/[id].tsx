import Loader from '@/components/Layout/Loader/Loader';
import { db } from '@/utils/firebase.config';
import Login from '@/components/Auth/Login';
import Tracker from '@/components/Tracker/Tracker';
import { doc, getDoc } from 'firebase/firestore';
import PremiumLayout from '@/components/Layout/PremiumLayout';
import { selectUser } from 'store/slices/authSlice';
import {
  selectDaySelected,
  selectIsLoadingData,
  selectProjects,
  selectProjectSelected,
  selectWeekSelected,
  setDayData,
  setProjectSelected,
} from 'store/slices/trackerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const TrackerPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isVerifyingUser } = useSelector(selectUser);
  const weekSelected = useSelector(selectWeekSelected);
  const isLoadingData = useSelector(selectIsLoadingData);
  const { id } = router.query;
  const daySelected = useSelector(selectDaySelected);
  const projects = useSelector(selectProjects);
  const projectSelected = useSelector(selectProjectSelected);

  const getUserData = async (date: string) => {
    if (user && date && id && projects) {
      if (!projects.find((project) => project.project_id === id)) {
        router.push('/app');
      } else {
        console.log('Fetching Data');
        const docRef = doc(
          db,
          'users',
          user.uid,
          'projects',
          String(id),
          'dates',
          date
        );
        const querySnapshot = await getDoc(docRef);
        let data: any = querySnapshot.data();
        dispatch(setDayData(data));
      }
    }
  };

  useEffect(() => {
    const projectSelected = projects.find((p) => p.project_id === id);
    projectSelected && dispatch(setProjectSelected(projectSelected));
  }, [id, projects]);

  useEffect(() => {
    getUserData(daySelected);
  }, [daySelected, projectSelected]);

  return (
    <PremiumLayout withPadding={false}>
      {isVerifyingUser ? (
        <Loader fullScreen={true} text={'Verifying user...'} />
      ) : isLoadingData ? (
        <Loader fullScreen={false} text={'Loading data...'} />
      ) : (
        !user && (
          <div className='login-container'>
            <Login />
          </div>
        )
      )}
      {user && !isLoadingData && weekSelected.length > 0 && (
        <div className='dashboard-container'>
          <Tracker userID={user.uid} />
        </div>
      )}
      <style jsx>{`
        .dashboard-container {
          max-width: var(--max-width-content);
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          align-items: center;
          padding-top: calc(var(--premium-nav-height));
        }
        .login-container {
          display: flex;
          min-height: 100vh;
          align-items: center;
          margin: auto;
          width: 100%;
          justify-content: center;
        }
      `}</style>
    </PremiumLayout>
  );
};

export default TrackerPage;
