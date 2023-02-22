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
            Increase your productivity tracking your daily and life goals.
          </h1>
          <p>Use our daily tracker and receive the best tips.</p>
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
            padding: 4rem 0;
            border-bottom: 1px solid var(--box-shadow-light);
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
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
