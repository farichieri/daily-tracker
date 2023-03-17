import PremiumLayout from '@/components/Layout/PremiumLayout';
import { ReactNode } from 'react';
import Labels from '../Labels/Labels';

const LabelsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <PremiumLayout withPadding={false}>
      <Labels />
      {children}
      <style jsx>{`
        .todo {
          max-width: var(--max-width-content);
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          align-items: center;
          padding-top: calc(var(--premium-nav-height) + 1rem);
          margin: 0 1rem;
        }
      `}</style>
    </PremiumLayout>
  );
};

export default LabelsLayout;
