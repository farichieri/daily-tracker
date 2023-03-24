import { ReactNode } from 'react';
import { selectUser } from 'store/slices/authSlice';
import { useSelector } from 'react-redux';
import PremiumLayout from '@/components/Layout/PremiumLayout';
import Goals from '../Goals/Goals';
import AddGoal from '../Goals/AddGoal/AddGoal';

const GoalsLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useSelector(selectUser);
  return (
    <PremiumLayout withPadding={false}>
      <div className='container'>
        {user && (
          <>
            <Goals />
            <AddGoal />
          </>
        )}
        {children}
      </div>
      <style jsx>{`
        .container {
          max-width: var(--max-width-content);
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          align-items: center;
          padding: calc(var(--premium-nav-height)) 0.5rem 1rem 0.5rem;
        }
      `}</style>
    </PremiumLayout>
  );
};

export default GoalsLayout;
