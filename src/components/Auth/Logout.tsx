import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import Button from '../Layout/Button/Button';
import { auth } from '../../utils/firebase.config';
import { useRouter } from 'next/router';

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();

  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setIsDisabled(true);
    await signOut(auth)
      .then(() => {
        router.push('/user');
      })
      .catch((error) => {
        console.error(error);
      });
    setIsDisabled(false);
    setIsLoading(false);
  };

  return (
    <div>
      <Button
        style={null}
        onClick={handleLogout}
        content='Logout'
        isLoading={isLoading}
        isDisabled={isDisabled}
        loadMessage={'Loading...'}
      />
      <style jsx>{`
        div {
          display: flex;
          min-width: 100px;
        }
      `}</style>
    </div>
  );
};

export default Logout;
