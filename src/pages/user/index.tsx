import Login from '@/components/Auth/Login';
import PremiumLayout from '@/components/Layout/PremiumLayout';
import PremiumNav from '@/components/Nav/PremiumNav';
import Link from 'next/link';

const User = ({ user }: { user: any }) => {
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
};

export default User;
