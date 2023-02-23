import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Loader from '@/components/Layout/Loader/Loader';
import MainLayout from '@/components/Layout/MainLayout';
import { auth, db } from '@/utils/firebase.config';
import Login from '@/components/Auth/Login';
import Tracker from '@/components/Tracker';
import { collection, getDocs } from 'firebase/firestore';
import PremiumNav from '@/components/Nav/PremiumNav';
import PremiumLayout from '@/components/Layout/PremiumLayout';

const index = () => {
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

  useEffect(() => {
    const getUserData = async () => {
      let data: any[] = [];
      // const date = new Date().toLocaleDateString().replaceAll('/', '-');
      const querySnapshot = await getDocs(collection(db, user.uid));
      querySnapshot.forEach((doc) => {
        data.push({ date: doc.id, data: doc.data() });
      });
      setData(data);
      setIsLoadingData(false);
    };
    if (user) {
      setIsLoadingData(true);
      getUserData();
    }
  }, [user]);

  if (isLoadingUser) {
    return <Loader text={'Verifying user...'} />;
  } else if (isLoadingData) {
    return <Loader text={'Loading data...'} />;
  } else
    return (
      <PremiumLayout withPadding={false}>
        <PremiumNav />
        <div className='dashboard-container'>
          {!user && <Login />}
          {user && <Tracker userID={user.uid} userData={data} />}
        </div>
        <style jsx>{`
          .dashboard-container {
            max-width: var(--max-width);
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 100%;
            padding-top: 4rem;
            align-items: center;
            min-height: calc(100vh - 4rem);
          }
        `}</style>
      </PremiumLayout>
    );
};

export default index;
