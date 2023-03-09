import React, { useEffect, useState } from 'react';
import Loader from '@/components/Layout/Loader/Loader';
import { db } from '@/utils/firebase.config';
import Login from '@/components/Auth/Login';
import Tracker from '@/components/Tracker/Tracker';
import { doc, getDoc } from 'firebase/firestore';
import PremiumLayout from '@/components/Layout/PremiumLayout';
import { dbFormatDate } from '@/utils/formatDate';
import { selectUser } from 'store/slices/authSlice';
import {
  selectDayData,
  selectProjects,
  selectProjectSelected,
  setDayData,
  setProjects,
} from 'store/slices/trackerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '@/hooks/firebase';
import ProjectCreate from '@/components/ProjectCreate/ProjectCreate';
import { useRouter } from 'next/dist/client/router';

const TrackerPage = () => {
  const dispatch = useDispatch();
  const { user, isVerifyingUser } = useSelector(selectUser);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isLoadingProjects, setIsloadingProjects] = useState(true);
  const projectSelected = useSelector(selectProjectSelected);
  const projects = useSelector(selectProjects);
  const router = useRouter();

  const getUserData = async (date: string) => {
    if (user && date && projectSelected.id) {
      console.log('Fetching Data');
      const docRef = doc(
        db,
        'users',
        user.uid,
        'projects',
        projectSelected.id,
        'dates',
        date
      );
      const querySnapshot = await getDoc(docRef);
      let data: any = querySnapshot.data();
      console.log(data);
      dispatch(setDayData(data));
    }
  };

  useEffect(() => {
    const getData = async () => {
      await getUserData(dbFormatDate(new Date()));
      setIsLoadingData(false);
    };
    if (user && projectSelected.id) {
      setIsLoadingData(true);
      getData();
    }
  }, [user, projectSelected, projects]);

  useEffect(() => {
    const getData = async () => {
      if (user) {
        const projects = await getProjects(user);
        dispatch(setProjects(projects));
        setIsloadingProjects(false);
      }
    };
    getData();
  }, [user]);

  useEffect(() => {
    if (!isVerifyingUser && !user) {
      router.push('/user');
    }
  }, [isVerifyingUser, user]);

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
      {user && !isLoadingProjects && projects.length < 1 && <ProjectCreate />}
      {user && !isLoadingData && (
        <div className='dashboard-container'>
          <Tracker userID={user.uid} getUserData={getUserData} />
        </div>
      )}
      <style jsx>{`
        .dashboard-container {
          max-width: var(--max-width);
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          align-items: center;
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
