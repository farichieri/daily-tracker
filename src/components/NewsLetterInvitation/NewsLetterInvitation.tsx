import React from 'react';
import EmailInput from '../EmailInput/EmailInput';

const NewsLetterInvitation = () => {
  return (
    <div className='newsletter-invitation'>
      <h1>The maximum achievement newsletter</h1>
      <p>Get the best tips to increase your productivity weekly</p>
      <EmailInput textButton='Join Free' />
      <style jsx>{`
        .newsletter-invitation {
          width: 100%;
          margin: 1rem;
          background: var(--box-shadow-light);
          padding: 2rem;
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: left;
          max-width: 600px;
        }
      `}</style>
    </div>
  );
};

export default NewsLetterInvitation;
