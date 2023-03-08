import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Loader from '@/components/Layout/Loader/Loader';
import { auth, db } from '@/utils/firebase.config';
import Login from '@/components/Auth/Login';
import Tracker from '@/components/Tracker/Tracker';
import { doc, getDoc } from 'firebase/firestore';
import PremiumLayout from '@/components/Layout/PremiumLayout';
import { dbFormatDate } from '@/utils/formatDate';
import { selectUser } from 'store/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';

const TrackerPage = () => {
  const { user, isUserVerified } = useSelector(selectUser);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [data, setData] = useState<string[]>([]);

  const getUserData = async (date: string) => {
    if (user && date) {
      const querySnapshot = await getDoc(doc(db, user.uid, date));
      let data: any = querySnapshot.data();
      setData(data);
    }
  };

  useEffect(() => {
    const getData = async () => {
      await getUserData(dbFormatDate(new Date().toLocaleDateString()));
      setIsLoadingData(false);
    };
    if (user) {
      setIsLoadingData(true);
      getData();
    }
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
