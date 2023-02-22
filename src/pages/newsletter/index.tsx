import EmailInput from '@/components/EmailInput/EmailInput';
import MainLayout from '@/components/Layout/MainLayout';

const index = () => {
  return (
    <MainLayout withPadding={false}>
      <section>
        <div className='newsletter-container'>
          <h1>Receive the best tips to improve your productivity</h1>
          <EmailInput />
        </div>
      </section>
      <style jsx>{`
        section {
          border-bottom: 1px solid var(--box-shadow-light);
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .newsletter-container {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          width: 100%;
          max-width: 700px;
        }
        .newsletter h1 {
          font-size: 3rem;
          max-width: 700px;
          line-height: 1.2;
          text-align: left;
          font-weight: bold;
        }
      `}</style>
    </MainLayout>
  );
};

export default index;
