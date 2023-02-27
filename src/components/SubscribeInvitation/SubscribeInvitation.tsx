import Link from 'next/link';
import React from 'react';
import EmailInput from '../EmailInput/EmailInput';

type Props = {};

const SubscribeInvitation = (props: Props) => {
  return (
    <div className='subscribe-invitation'>
      <h4>You have reached your limit of free tips</h4>
      <p>
        Want unlimited access? Join us today and see the best tips in the world
        to maximize your productivity and achieve your goals
      </p>
      <EmailInput textButton='Get discount' />
      <p>
        Already a premium member? <Link href={'/user'}>Sign in</Link>
      </p>
      <style jsx>{`
        .subscribe-invitation {
          background: var(--box-shadow-light);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 600px;
          padding: 2rem;
          border-radius: 1rem;
        }
      `}</style>
    </div>
  );
};

export default SubscribeInvitation;
