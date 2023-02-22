import MainLayout from '@/components/Layout/MainLayout';
import { plans } from '@/utils/plans';

const Plan = ({ plan }: { plan: any }) => {
  console.log(plan);
  return (
    <MainLayout withPadding={true}>
      <div className='payment-container'>
        <h2>Subscribe today</h2>
        <div className='payment'>
          <form>
            <input placeholder='Your name' type={'text'} />
            <input placeholder='Your email' type={'email'} />
            <input placeholder='Card number' type={'text'} />
            <button>Join today</button>
          </form>
          <div className='detail'>
            <p>Plan detail</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .payment-container {
          display: flex;
          flex-direction: column;
          margin: auto;
          gap: 0.5rem;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .payment {
          display: flex;
          gap: 1rem;
        }
      `}</style>
    </MainLayout>
  );
};

export default Plan;

export const getStaticPaths = async () => {
  const paths = plans.map((plan) => {
    return {
      params: {
        plan: plan.plan,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const plan = plans.find((plan) => plan.plan === params.plan);
  return {
    props: {
      plan,
    },
  };
};
