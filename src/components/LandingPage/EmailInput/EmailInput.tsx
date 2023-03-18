import Image from 'next/image';
import { useState } from 'react';

const EmailInput = ({ textButton }: { textButton: string }) => {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [added, setAdded] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (email) {
      setSending(true);
      fetch('/api/mailer', {
        method: 'post',
        body: JSON.stringify({ email }),
      }).then((response) => {
        if (response.ok) {
          setAdded(true);
        }
        setSending(false);
      });
      setEmail('');
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Image
          alt='envelope-icon'
          src={'/icons/email.png'}
          height={20}
          width={20}
        />
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Your email'
          required
        />
        <button>
          {sending ? <span>{'Sending...'}</span> : <span>{textButton}</span>}
        </button>
      </form>
      {added && <div className='added'>Thank you for joining us!</div>}

      <style jsx>{`
        div {
          width: 100%;
          margin: auto;
          justify-content: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        form {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.5rem;
          border-radius: ;
          width: 100%;
          max-width: 600px;
        }
        input,
        button {
          outline: none;
          height: 3rem;
          border-radius: 5px;
          font-weight: bold;
          border: 1px solid black;
        }
        input {
          width: 75%;
          padding: 0.5rem;
        }
        input:focus {
          background: whitesmoke;
        }
        button {
          cursor: pointer;
          width: 25%;
        }
        button:hover {
        }
        .added {
          background: #3cda3c;
          max-width: 600px;
          margin: 0 1rem;
          padding: 0.5rem;
          border-radius: 5px;
          border: 2px solid green;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default EmailInput;
