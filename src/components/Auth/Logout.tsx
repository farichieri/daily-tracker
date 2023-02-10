import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import Button from '../Layout/Button/Button';
import { auth } from '../../utils/firebase.config';

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setIsDisabled(true);
    await signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
    setIsDisabled(false);
    setIsLoading(false);
  };

  return (
    <div onClick={handleLogout}>
      <Button
        content='Logout'
        isLoading={isLoading}
        isDisabled={isDisabled}
        loadMessage={'Deslogeando...'}
      />
      <style jsx>{`
        div {
          display: flex;
          min-width: 200px;
        }
      `}</style>
    </div>
  );
};

export default Logout;
