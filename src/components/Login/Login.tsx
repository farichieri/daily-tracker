import { useState } from 'react';

const Login = () => {
  const [input, setFormInput] = useState({
    username: '',
    password: '',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setFormInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div>
      Login component
      <form>
        <input
          name='username'
          placeholder='username'
          value={input.username}
          onChange={handleChange}
        />
        <input
          name='password'
          placeholder='password'
          value={input.password}
          onChange={handleChange}
        />
        <button type='submit'>Login</button>
      </form>
      <style jsx>
        {`
          div {
            margin: auto;
          }
          form {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
