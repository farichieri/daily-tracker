import React from 'react';
import EmailInput from '../EmailInput/EmailInput';

const NewsLetterInvitation = () => {
  return (
    <div className='newsletter-invitation'>
      <h3>The maximum achievement newsletter</h3>
      <p>Get the best tips to increase your productivity weekly</p>
      <EmailInput textButton='Join Free' />
      <style jsx>{`
        .newsletter-invitation {
          width: 100%;
          margin: 1rem;
          background-color: var(--bg-color-tertiary);
          padding: 0.5rem 2rem 1rem 2rem;
          border-radius: 0.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
          text-align: left;
          max-width: var(--max-width-content);
        }
      `}</style>
    </div>
  );
};

export default NewsLetterInvitation;
