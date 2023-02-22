import Image from 'next/image';
import { useState } from 'react';

const EmailInput = () => {
  const [email, setEmail] = useState('');
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log({ email });
    fetch('/api/mailer', {
      method: 'post',
      body: JSON.stringify({ email }),
    }).then((response) => {
      if (response.ok) {
        console.log({ response });
      }
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
      <button>Try</button>
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
        }
        input,
        button {
          outline: none;
          height: 3rem;
          border-radius: 5px;
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
