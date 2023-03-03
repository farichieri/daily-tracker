import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Loader from '@/components/Layout/Loader/Loader';
import { auth, db } from '@/utils/firebase.config';
import Login from '@/components/Auth/Login';
import Tracker from '@/components/Tracker/Tracker';
import { doc, getDoc } from 'firebase/firestore';
import PremiumLayout from '@/components/Layout/PremiumLayout';
import { dbFormatDate } from '@/utils/formatDate';

const TrackerPage = () => {
  const [user, setUser] = useState<any | string>('');
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [data, setData] = useState<string[]>([]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      setIsLoadingUser(false);
    } else {
      setUser('');
      setIsLoadingData(false);
      setIsLoadingUser(false);
    }
  });

  const getUserData = async (date: string) => {
    console.log('getDoc');
    const querySnapshot = await getDoc(doc(db, user.uid, date));
    let data: any = querySnapshot.data();
    setData(data);
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

  if (isLoadingUser) {
    return <Loader text={'Verifying user...'} />;
  } else if (isLoadingData) {
    return <Loader text={'Loading data...'} />;
  } else
    return (
      <PremiumLayout withPadding={false}>
        {!user && (
          <div className='login-container'>
            <Login />
          </div>
        )}
        <div className='dashboard-container'>
          {user && (
            <Tracker
              userID={user.uid}
              userData={data}
              getUserData={getUserData}
            />
          )}
        </div>
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
            margin: auto;
          }
        `}</style>
      </PremiumLayout>
    );
};

export default TrackerPage;
