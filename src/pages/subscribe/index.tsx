import MainLayout from '@/components/Layout/MainLayout';
import SubscribeInvitation from '@/components/LandingPage/SubscribeInvitation/SubscribeInvitation';
import Link from 'next/link';

const index = () => {
  return (
    <MainLayout withPadding={true}>
      <div className='subscribe'>
        <h2>Why us?</h2>
        <p>
          Our goal is to help you maximize your productivity, develop the habits
          that will allow you to live the life you want, and eliminate the bad
          habits that limit your potential.
        </p>
        <p>
          We strive to give each of our readers the purest information on
          forming habits and achieving goals.
        </p>
        <p>
          Every day, you&lsquo;ll find new, interesting tips on how to achieve
          your goals in different topics: health, work, business, studies and
          more.
        </p>
        <p>Get Started</p>
        <Link href={'/pricing'}>
          <button className='become'>Become a member now</button>
        </Link>
      </div>
      <style jsx>{`
        .subscribe {
          padding: 1rem 0;
          max-width: var(--max-width-content);
          text-align: left;
        }
        button {
          cursor: pointer;
          font-weight: bold;
          padding: 0.3rem 0.5rem;
          border-radius: 4px;
          background: #6aec6a;
          border: 1px solid black;
          transition: 0.3s;
        }
      `}</style>
    </MainLayout>
  );
};

export default index;
