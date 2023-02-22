import MainLayout from '@/components/Layout/MainLayout';
import { plans } from '@/utils/plans';
import Image from 'next/image';
import Link from 'next/link';

const Plans = () => {
  return (
    <div className='plans-container'>
      {plans.map((plan) => (
        <Link href={`/checkout/${plan.plan}`}>
          <div className='plan'>
            <h1>{plan.name}</h1>
            <p>{plan.description}</p>
            <p>{plan.price}</p>
            <div className='checks'>
              {plan.checks.map((check) => (
                <div className='check'>
                  <Image
                    src={'/icons/check.png'}
                    alt='check'
                    width={20}
                    height={20}
                  />
                  {check}
                </div>
              ))}
            </div>
            <button>Get {plan.name}</button>
          </div>
        </Link>
      ))}
      <style jsx>{`
        .plans-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          border-radius: 3px;
          overflow: auto;
          margin: 1rem;
          border-radius: 5px;
        }
        .plan {
          text-align: left;
          padding: 1.5rem;
          border: 3px solid gray;
          width: 280px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          cursor: pointer;
          height: 100%;
        }
        .check {
          gap: 0.25rem;
          align-items: center;
          display: flex;
        }
        button {
          cursor: pointer;
          border-radius: 3px;
          margin-top: auto;
        }
      `}</style>
    </div>
  );
};

const index = () => {
  return (
    <MainLayout withPadding={true}>
      <div className='checkout-container'>
        <h1 className='title'>Find the right plan</h1>
        <div className='plans'>
          <Plans />
        </div>
      </div>
      <style jsx>{`
        .checkout-container {
          margin: auto;
        }
      `}</style>
    </MainLayout>
  );
};

export default index;
