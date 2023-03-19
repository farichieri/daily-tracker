import PremiumLayout from '@/components/Layout/PremiumLayout';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import Tracker from '../Tracker/Tracker';

const TrackerLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useSelector(selectUser);

  return (
    <PremiumLayout withPadding={false}>
      <div className='container'>
        {user && <Tracker userID={user.uid} />}
        {children}
      </div>
      <style jsx>{`
        .container {
          max-width: var(--max-width);
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          align-items: center;
          padding-top: calc(var(--premium-nav-height));
        }
      `}</style>
    </PremiumLayout>
  );
};

export default TrackerLayout;
