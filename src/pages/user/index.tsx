import Login from '@/components/Auth/Login';
import Logout from '@/components/Auth/Logout';
import Loader from '@/components/Layout/Loader/Loader';
import MainLayout from '@/components/Layout/MainLayout';
import Nav from '@/components/Nav/Nav';
import PremiumNav from '@/components/Nav/PremiumNav';
import { auth } from '@/utils/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { useState } from 'react';

const index = () => {
  const [user, setUser] = useState<any | string>('');
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      setIsLoadingUser(false);
    } else {
      setUser('');
      setIsLoadingUser(false);
    }
  });

  if (isLoadingUser) {
    return <Loader text={'Verifying user...'} />;
  } else {
    return (
      <MainLayout withPadding={false}>
        {user ? (
          <>
            <PremiumNav />
          </>
        ) : (
          <>
            <div>
              <p>Premium Login </p>
              <p>Sign in to your premium account</p>
            </div>
            <Login />
          </>
        )}
        <style jsx>
          {`
            div {
              width: 100%;
              font-size: 3rem;
              line-height: 1.2;
              font-weight: bold;
              padding: 4rem 0 4rem 0;
              margin-bottom: 2rem;
              border-bottom: 1px solid gray;
            }
            div p {
              max-width: 600px;
              margin: auto;
            }
          `}
        </style>
      </MainLayout>
    );
  }
};

export default index;
