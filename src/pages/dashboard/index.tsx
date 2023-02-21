import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Logout from '@/components/Auth/Logout';
import Loader from '@/components/Layout/Loader/Loader';
import MainLayout from '@/components/Layout/MainLayout';
import { auth, db } from '@/utils/firebase.config';
import Login from '@/components/Auth/Login';
import Tracker from '@/components/Tracker';
import { collection, getDocs } from 'firebase/firestore';

const index = () => {
  const [user, setUser] = useState<any | string>('');
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [data, setData] = useState<string[]>([]);
  console.log({ isLoadingData });

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
      const date = new Date().toLocaleDateString().replaceAll('/', '-');
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
      <MainLayout withPadding={true}>
        <div className='dashboard-container'>
          {!user && <Login />}
          {user && (
            <>
              <div className='admin-nav'>
                <Logout />
              </div>
              <Tracker userID={user.uid} userData={data} />
            </>
          )}
        </div>
        <style jsx>{`
          .dashboard-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 100%;
          }
          .tours-container {
            margin: auto;
            width: 100%;
          }
          .admin-nav {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
          }
        `}</style>
      </MainLayout>
    );
};

export default index;
