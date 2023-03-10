import MainLayout from '@/components/Layout/MainLayout';
import Link from 'next/link';

const index = () => {
  return (
    <MainLayout withPadding={true}>
      <div className='FAQ'>
        <h1 className='title'>FAQ</h1>
        <div className='section'>
          <h1>PREMIUM MEMBERSHIP</h1>
          <h2>Do you offer a free trial?</h2>
          <p>At this time, we do not offer free trials.</p>
          <h2>How do I become a premium member?</h2>
          <p>To become a premium member, follow these steps:</p>
          <p>
            (1) Choose your plan <Link href={'/pricing'}>here</Link>
          </p>
          <p>(2) Input your name, email and card number.</p>
          <p>
            (3) Check your email for your activiation link to login and access
            all premium features!&ldquo;
          </p>
          <h2>Do you offer a monthly membership?</h2>
          <p>
            We do not offer monthly memberships. Our plans are billed annually.
          </p>
        </div>

        <div className='section'>
          <h1>MANAGE YOUR ACCOUNT</h1>
          <h2>Can I upgrade my membership?</h2>
          <p>
            Please contact us{' '}
            <Link href={'mailto:frichieri.dev@gmail.com'}>here</Link> to make
            this change.
          </p>
          <h2>How do I change my email address associated with my account?</h2>
          <p>
            If you&apos;d like to change your email address, please submit a
            support request{' '}
            <Link href={'mailto:frichieri.dev@gmail.com'}>here</Link>
          </p>
          <h2>How do I cancel my membership?</h2>
          <p>To cancel your membership, follow these steps:</p>
          <p>
            (1) Head over to <Link href={'/dashboard'}>your dashboard</Link>
            (make sure you&apos;re logged into your account)
          </p>
          <p>(2) Click &ldquo;Subscription&ldquo;</p>
          <h2>
            If I cancel my subscription, will I still have access until the end
            of my billing cycle?
          </h2>
          <p>
            Yes, if you cancel your subscription you will have access to all
            premium features until the end of your billing cycle. To view the
            date of your billing cycle, head to{' '}
            <Link href={'/dashboard'}>this link</Link>
          </p>
          <h2>I&apos;m having trouble logging in to my account</h2>
          <p>
            If you are having trouble receiving your activation email to login,{' '}
            <strong>
              first check to see if the email landed in your spam.
            </strong>
          </p>
          <p>
            If that&apos;s not the case, try plugging in your email one more
            time and wait a few minutes.
          </p>
          <p>
            If you still can&apos;t access your account, please contact us{' '}
            <Link href={'mailto:frichieri.dev@gmail.com'}>here</Link>
          </p>
          <h2>Can I get an invoice for my purchase?</h2>
          <p>
            Yes, you can download an invoice from your{' '}
            <Link href={'/dashboard'}>your dashboard</Link>, under the
            &lsquo;Subscription&lsquo; tab. Just make sure you&apos;re logged
            in.
          </p>
        </div>
        <style jsx>
          {`
            .FAQ {
              padding: 1rem 0;
              text-align: left;
              max-width: var(--max-width-content);
              display: flex;
              flex-direction: column;
            }
            .title {
              font-size: 3rem;
              margin-bottom: 1rem;
            }
            .section {
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
              margin-bottom: 2rem;
            }
            p {
              margin: 0;
            }
            h2 {
              margin: 0.5rem 0 0.1rem 0;
            }
          `}
        </style>
      </div>
    </MainLayout>
  );
};

export default index;
