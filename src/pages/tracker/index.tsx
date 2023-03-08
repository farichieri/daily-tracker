import React, { useEffect, useState } from 'react';
import Loader from '@/components/Layout/Loader/Loader';
import { db } from '@/utils/firebase.config';
import Login from '@/components/Auth/Login';
import Tracker from '@/components/Tracker/Tracker';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import PremiumLayout from '@/components/Layout/PremiumLayout';
import { dbFormatDate } from '@/utils/formatDate';
import { selectUser } from 'store/slices/authSlice';
import {
  selectProjects,
  selectProjectSelected,
  setProjects,
} from 'store/slices/trackerSlice';
import { useDispatch, useSelector } from 'react-redux';

const TrackerPage = () => {
  const dispatch = useDispatch();
  const { user, isUserVerified } = useSelector(selectUser);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [data, setData] = useState<string[]>([]);
  const projectSelected = useSelector(selectProjectSelected);
  const projects = useSelector(selectProjects);

  const getUserData = async (date: string) => {
    if (user && date) {
      console.log('Fetching Data');
      const docRef = doc(
        db,
        'users',
        user.uid,
        'projects',
        projectSelected,
        'dates',
        date
      );
      const querySnapshot = await getDoc(docRef);
      let data: any = querySnapshot.data();
      setData(data);
    }
  };

  useEffect(() => {
    const getData = async () => {
      await getUserData(dbFormatDate(new Date()));
      setIsLoadingData(false);
    };
    if (user) {
      setIsLoadingData(true);
      getData();
    }
  }, [user, projectSelected, projects]);

  const getProjects = async () => {
    if (user) {
      console.log('Fetching Projects');
      let data: any[] = [];
      const docRef = collection(db, 'users', user.uid, 'projects');
      const querySnapshot = await getDocs(docRef);
      querySnapshot.forEach((doc) => data.push(doc.id));
      dispatch(setProjects(data));
    }
  };

  useEffect(() => {
    const getData = async () => {
      await getProjects();
    };
    getData();
  }, [user]);

  return (
    <PremiumLayout withPadding={false}>
      {isUserVerified ? (
        <Loader text={'Verifying user...'} />
      ) : isLoadingData ? (
        <Loader text={'Loading data...'} />
      ) : (
        !user && (
          <div className='login-container'>
            <Login />
          </div>
        )
      )}
      {user && !isLoadingData && (
        <div className='dashboard-container'>
          <Tracker
            projectSelected={projectSelected}
            userID={user.uid}
            userData={data}
            getUserData={getUserData}
          />
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
