import Login from '@/components/Auth/Login';
import Logout from '@/components/Auth/Logout';
import Loader from '@/components/Layout/Loader/Loader';
import MainLayout from '@/components/Layout/MainLayout';
import PremiumLayout from '@/components/Layout/PremiumLayout';
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
      <PremiumLayout withPadding={false}>
        {user ? (
          <>
            <PremiumNav />
            <div className='account'>
              <p>Welcome {user.email}</p>
            </div>
          </>
        ) : (
          <>
            <div className='header'>
              <p>Premium Login </p>
              <p>Sign in to your premium account</p>
            </div>
            <Login />
            <div className='description'>
              <p>This is only available to premium members</p>
              <p>
                If you want to become a member,{' '}
                <Link href={'/subscribe'}>do it now</Link>
              </p>
              <p>
                If you can not log in, please{' '}
                <Link href='mailto:frichieri.dev@gmail.com'>
                  send us an email
                </Link>
              </p>
            </div>
          </>
        )}
        <style jsx>
          {`
            .account {
              padding-top: 4rem;
            }
            .header {
              width: 100%;
              font-size: 3rem;
              line-height: 1.2;
              font-weight: bold;
              padding: 4rem 0 4rem 0;
              margin-bottom: 2rem;
              border-bottom: 1px solid gray;
            }
            .header p {
              max-width: 600px;
              margin: auto;
            }
            .description {
              padding: 4rem 0;
              display: flex;
              flex-direction: column;
              gap: 1rem;
            }
          `}
        </style>
      </PremiumLayout>
    );
  }
};

export default index;
