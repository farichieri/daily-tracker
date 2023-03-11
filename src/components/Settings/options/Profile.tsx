import Avatar from '@/components/Avatar/Avatar';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';

const Profile = () => {
  const { user, userSettings } = useSelector(selectUser);
  return (
    <div className='profile'>
      <div className='input-container'>
        <span>Photo</span>
        <Avatar size={80} changeable={true} />
      </div>
      <div className='input-container'>
        <span>Name</span>
        <input type='text' value={String(user?.displayName)} />
      </div>
      <div className='input-container'>
        <span>Email</span>
        <input type='text' value={String(user?.email)} />
      </div>
      <div className='finish'>
        <button>Cancel</button>
        <button>Save</button>
      </div>
      <style jsx>
        {`
          .profile {
            display: flex;
            align-items: start;
            font-size: 0.9rem;
          }
          .input-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: start;
            gap: 0.2rem;
            width: 100%;
          }
          .profile {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1rem 0;
          }
          input {
            background: transparent;
            border: 1px solid var(--box-shadow);
            border-radius: 5px;
            padding: 0.25rem 0.5rem;
            color: var(--text-color);
            transition: 0.3s;
            width: 100%;
            max-width: 15rem;
          }
          .finish {
            width: 100%;
            margin-top: auto;
          }
          span {
            font-size: 1.2rem;
          }
        `}
      </style>
    </div>
  );
};

export default Profile;
