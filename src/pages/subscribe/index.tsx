import MainLayout from '@/components/Layout/MainLayout';
import Link from 'next/link';

const index = () => {
  return (
    <MainLayout withPadding={true}>
      <Link href={'/checkout'}>checkout</Link>
    </MainLayout>
  );
};

export default index;
