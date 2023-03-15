import PremiumLayout from '@/components/Layout/PremiumLayout';
import { useEffect } from 'react';

const Labels = () => {
  useEffect(() => {}, []);
  return (
    <PremiumLayout withPadding={false}>
      <div className='labels'>labels</div>
      <style jsx>{`
        .labels {
          padding-top: calc(var(--premium-nav-height) + 1rem);
        }
      `}</style>
    </PremiumLayout>
  );
};

export default Labels;
