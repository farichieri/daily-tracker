import MainLayout from '@/components/Layout/MainLayout';
import Link from 'next/link';

const index = () => {
  return (
    <MainLayout withPadding={true}>
      <div className='subscribe-container'>
        <Link href={'/checkout'}>
          <button className='become'>Become a member now</button>
        </Link>
      </div>
      <style jsx>{`
        button {
          cursor: pointer;
          font-weight: bold;
          padding: 0.3rem 0.5rem;
          border-radius: 4px;
        }
      `}</style>
    </MainLayout>
  );
};

export default index;
