import Link from 'next/link';
import React from 'react';
import EmailInput from '../EmailInput/EmailInput';

type Props = {};

const SubscribeInvitation = (props: Props) => {
  return (
    <div className='subscribe-invitation'>
      <h3 className='title'>You have reached your limit of free tips</h3>
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
          background-color: var(--bg-color-tertiary);
          display: flex;
          flex-direction: column;
          padding: 0 2rem;
          border-radius: 0.25rem;
          width: 100%;
          text-align: left;
          max-width: var(--max-width-content);
        }
      `}</style>
    </div>
  );
};

export default SubscribeInvitation;
