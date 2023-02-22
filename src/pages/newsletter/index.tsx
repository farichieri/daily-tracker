import EmailInput from '@/components/EmailInput/EmailInput';
import MainLayout from '@/components/Layout/MainLayout';

const index = () => {
  return (
    <MainLayout withPadding={true}>
      <div className='newsletter'>
        Receive the best tips to improve your productivity
        <EmailInput />
      </div>
      <style jsx>{`
        .newsletter {
          padding: 2rem;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </MainLayout>
  );
};

export default index;
