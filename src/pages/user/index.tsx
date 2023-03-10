import Login from '@/components/Auth/Login';
import Logout from '@/components/Auth/Logout';
import MainLayout from '@/components/Layout/MainLayout';
import Link from 'next/link';
import { selectUser } from 'store/slices/authSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import { selectIsLoading } from 'store/slices/layoutSlice';
const User = () => {
  const router = useRouter();
  const { user, isVerifyingUser } = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);

  // useEffect(() => {
  //   if (!isVerifyingUser && user) {
  //     router.push('/app');
  //   }
  // }, [isVerifyingUser, user]);

  return (
    <MainLayout withPadding={true}>
      {user && !isLoading ? (
        <>
          <div className='account'>
            <p>You are logged in with the user {user.email}</p>
            <Logout />
          </div>
        </>
      ) : (
        <div className='user-container'>
          <div className='header'>
            <h1>Premium Login </h1>
            <h1>Sign in to your premium account</h1>
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
        </div>
      )}
      <style jsx>
        {`
          .account {
            padding-top: 4rem;
            align-items: center;
            display: flex;
            flex-direction: column;
          }
          .header {
            width: 100%;
            font-size: 2rem;
            line-height: 1.2;
            font-weight: bold;
            padding: 4rem 0 4rem 0;
            max-width: 600px;
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
          .description p {
            margin: 0;
          }
          .user-container {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}
      </style>
    </MainLayout>
  );
};

export default User;
