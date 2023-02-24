import EmailInput from '@/components/EmailInput/EmailInput';
import Button from '@/components/Layout/Button/Button';
import MainLayout from '@/components/Layout/MainLayout';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const handleStart = (e: any) => {
    e.preventDefault();
    router.push('/subscribe');
  };
  return (
    <MainLayout withPadding={false}>
      <div className='home'>
        <div className='header'>
          <h1>
            Increase your productivity with the best achievement tips in the
            world.
          </h1>
          <p>Receive the best information to achieve your goals weekly</p>
          <EmailInput textButton={'Join Free'} />
        </div>
        Home content
      </div>
      <style jsx>
        {`
          .home {
            width: 100%;
          }
          .header {
            width: 100%;
            border-bottom: 1px solid var(--box-shadow-light);
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
            padding: 2rem 0;
          }
          .header h1 {
            font-size: 2.5rem;
            font-weight: bold;
            line-height: 1.2;
            max-width: 600px;
          }
        `}
      </style>
    </MainLayout>
  );
}
