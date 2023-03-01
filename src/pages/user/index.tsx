import Login from '@/components/Auth/Login';
import Logout from '@/components/Auth/Logout';
import PremiumLayout from '@/components/Layout/PremiumLayout';
import PremiumNav from '@/components/Nav/PremiumNav';
import Link from 'next/link';

const User = ({ user }: { user: any }) => {
  return (
    <PremiumLayout withPadding={true}>
      {user ? (
        <>
          <div className='account'>
            <p>You are logged in with the user {user.email}</p>
            <Logout />
          </div>
        </>
      ) : (
        <>
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
        </>
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
        `}
      </style>
    </PremiumLayout>
  );
};

export default User;
