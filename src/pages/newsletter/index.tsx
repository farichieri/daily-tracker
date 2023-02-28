import EmailInput from '@/components/EmailInput/EmailInput';
import MainLayout from '@/components/Layout/MainLayout';
import Image from 'next/image';

const index = () => {
  return (
    <MainLayout withPadding={false}>
      <section>
        <div className='newsletter-container'>
          <h1>Increase your productivity now!</h1>
          <p>Join us and get the best tips every week to achieve your goals</p>
          <EmailInput textButton={'Try now!'} />
        </div>
      </section>
      <style jsx>{`
        section {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem 0;
          margin: auto;
        }
        .newsletter-container {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          width: 100%;
          max-width: 900px;
        }
        .newsletter-container h1 {
          font-size: 3rem;
          line-height: 1.2;
          text-align: left;
        }
      `}</style>
    </MainLayout>
  );
};

export default index;
