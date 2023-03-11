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
  selectIsLoadingData,
  selectProjects,
  selectProjectSelected,
  selectToday,
  selectWeekSelected,
  setDayData,
  setDaySelected,
  setIsLoadingData,
  setProjects,
} from 'store/slices/trackerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '@/hooks/firebase';

const TrackerPage = () => {
  const dispatch = useDispatch();
  const { user, isVerifyingUser } = useSelector(selectUser);
  const projectSelected = useSelector(selectProjectSelected);
  const projects = useSelector(selectProjects);
  const weekSelected = useSelector(selectWeekSelected);
  const today = useSelector(selectToday);
  const isLoadingData = useSelector(selectIsLoadingData);

  const getUserData = async (date: string) => {
    if (user && date && projectSelected?.id) {
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
      dispatch(setDayData(data));
    }
  };

  useEffect(() => {
    const getData = async () => {
      dispatch(setIsLoadingData(true));
      await getUserData(dbFormatDate(new Date()));
    };
    const getProjectsData = async () => {
      if (!user) return;
      dispatch(setIsLoadingData(true));
      const projects = await getProjects(user);
      dispatch(setProjects(projects));
    };
    if (user && projectSelected?.id) {
      getData();
    }
    if (projects.length < 1 && user) {
      getProjectsData();
    }
  }, [projectSelected, projects, user]);

  useEffect(() => {
    dispatch(setDaySelected(today));
  }, [today]);

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
