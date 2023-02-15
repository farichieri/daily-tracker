import React, { useState } from 'react';
import { auth } from '@/utils/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Button from '../Layout/Button/Button';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setIsDisabled(true);
    await signInWithEmailAndPassword(auth, input.email, input.password)
      .then((userCredential) => {
        userCredential.user;
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
    setIsLoading(false);
    setIsDisabled(false);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrorMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='inputs-container'>
        <input
          onChange={handleChange}
          name='email'
          value={input.email}
          placeholder='Email'
          type='text'
        />
        <input
          onChange={handleChange}
          name='password'
          value={input.password}
          placeholder='Contraseña'
          type='password'
        />
      </div>
      <Button
        onClick={handleSubmit}
        loadMessage={'Ingresando...'}
        content='Ingresar'
        isLoading={isLoading}
        isDisabled={isDisabled}
      />
      {errorMessage && <span>Email o contraseña inválidos</span>}
      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          max-width: 300px;
          width: 100%;
          margin: auto;
          position: relative;
        }
        .inputs-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          margin: 1rem 0;
        }
        input {
          border: none;
          border-bottom: 1px solid lightgray;
          background: none;
          outline: none;
          color: var(--text-color);
          padding: 0.3rem 1rem;
          margin: 0.5rem 0;
          transition: 0.3s;
        }
        input:focus {
          background: var(--box-shadow);
        }
        button {
          cursor: pointer;
        }
        span {
          color: red;
          position: absolute;
          bottom: -2rem;
          width: 100%;
          text-align: center;
        }
        input:autofill {
          color: red;
        }
      `}</style>
    </form>
  );
};

export default Login;
