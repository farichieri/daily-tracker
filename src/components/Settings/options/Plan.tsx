import { useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';

const Plan = () => {
  const { user, userSettings } = useSelector(selectUser);
  const { is_premium, plan_name } = userSettings;

  return (
    <div className='plan'>
      <span className='title'>Your plan</span>
      <span className='plan_name'>{plan_name && plan_name}</span>
      <button>Upgrade</button>
      <style jsx>{`
        .plan {
          width: 100%;
          height: 100%;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .title {
          font-size: 1.2rem;
        }
        .plan_name {
          text-transform: capitalize;
        }
      `}</style>
    </div>
  );
};

export default Plan;
