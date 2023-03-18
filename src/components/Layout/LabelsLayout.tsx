import PremiumLayout from '@/components/Layout/PremiumLayout';
import { ReactNode } from 'react';
import Labels from '../Labels/Labels';

const LabelsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <PremiumLayout withPadding={false}>
      <Labels />
      {children}
    </PremiumLayout>
  );
};

export default LabelsLayout;
