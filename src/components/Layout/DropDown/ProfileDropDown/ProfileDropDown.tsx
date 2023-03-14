import Avatar from '@/components/Avatar/Avatar';
import { auth } from '@/utils/firebase.config';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import { toggleIsProfileOpen } from 'store/slices/layoutSlice';
import DropDown from '../DropDown';

const ProfileDropDown = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const router = useRouter();
  const [closeDrop, setCloseDrop] = useState(false);

  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault();
    router.push('/');
    await signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  };

  const handleOpenProfile = () => {
    dispatch(toggleIsProfileOpen());
    setCloseDrop(true);
  };

  return (
    <DropDown
      closeDrop={closeDrop}
      setCloseDrop={setCloseDrop}
      btnText={<Avatar size={24} changeable={false} />}
    >
      <span>Account</span>
      <div className='section' onClick={handleOpenProfile}>
        <button>Profile</button>
      </div>
      <button onClick={handleLogout}>Logout </button>
      <style jsx>{`
        .section {
          border-top: 1px solid var(--box-shadow-light);
          border-bottom: 1px solid var(--box-shadow-light);
        }
        button {
          background: transparent;
          width: 100%;
          display: flex;
          align-items: center;
          cursor: pointer;
          border: none;
          color: var(--text-color);
          font-weight: 500;
          padding: 0.25rem 1rem;
        }
        button:hover {
          background: var(--box-shadow-light);
        }
      `}</style>
    </DropDown>
  );
};

export default ProfileDropDown;
