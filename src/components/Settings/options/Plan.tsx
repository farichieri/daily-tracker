import { useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';

const Plan = () => {
  const { user, userSettings } = useSelector(selectUser);
  console.log({ user });

  return (
    <div className='plan'>
      <span>Your plan</span>
      <style jsx>{`
        .plan {
          width: 100%;
          height: 100%;
          text-align: left;
        }
      `}</style>
    </div>
  );
};

export default Plan;
