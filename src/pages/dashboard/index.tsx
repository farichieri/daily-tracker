import React, { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Logout from '@/components/Auth/Logout';
import Loader from '@/components/Layout/Loader/Loader';
import MainLayout from '@/components/Layout/MainLayout';
import { auth } from '@/utils/firebase.config';
import Login from '@/components/Auth/Login';
import Tracker from '@/components/Tracker';
import Objetives from '@/components/Objetives/Objetives';

const index = () => {
  const [user, setUser] = useState<any | string>('');
  const [isLoading, setIsLoading] = useState(true);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser('');
    }
    setIsLoading(false);
  });

  if (isLoading) {
    return (
      <MainLayout withPadding={true}>
        <div className='dashboard-container'>
          Verificando usuario...
          <Loader />
        </div>
        <style jsx>{`
          div {
            align-items: center;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            justify-content: center;
            margin: auto;
            min-height: 100vh;
          }
        `}</style>
      </MainLayout>
    );
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
              <Tracker />
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
