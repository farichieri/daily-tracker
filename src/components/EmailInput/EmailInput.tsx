import Image from 'next/image';
import { useState } from 'react';

const EmailInput = ({ textButton }: { textButton: string }) => {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: any) => {
    setSending(true);
    e.preventDefault();
    fetch('/api/mailer', {
      method: 'post',
      body: JSON.stringify({ email }),
    }).then((response) => {
      if (response.ok) {
        console.log({ response });
      }
      setSending(false);
    });
    setEmail('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <Image
        alt='envelope-icon'
        src={'/icons/envelope.png'}
        height={20}
        width={20}
      />
      <input
        type={'email'}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Your email'
      />
      <button>
        {sending ? <span>{'Sending...'}</span> : <span>{textButton}</span>}
      </button>
      <style jsx>{`
        form {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 1rem;
          gap: 0.5rem;
          padding: 0.5rem;
          background: var(--box-shadow-light);
          border-radius: 5px;
          width: 100%;
          max-width: 600px;
        }
        input,
        button {
          outline: none;
          height: 3rem;
          border-radius: 5px;
          font-weight: bold;
        }
        input {
          width: 75%;
          padding: 0.5rem;
        }
        button {
          cursor: pointer;
          width: 25%;
        }
      `}</style>
    </form>
  );
};

export default EmailInput;
