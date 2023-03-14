import { useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';

const Plan = () => {
  const { user, userSettings } = useSelector(selectUser);
  const { is_premium, plan_name } = userSettings;

  console.log({ is_premium });

  return (
    <div className='plan'>
      <span className='title'>Your plan</span>
      <div className='actual-plan'>
        <span className='plan_name'>Actual plan: {plan_name && plan_name}</span>
        {!is_premium && <button>Upgrade</button>}
      </div>
      <style jsx>{`
        .plan {
          width: 100%;
          height: 100%;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: start;
        }
        .title {
          font-size: 1.2rem;
        }
        .plan_name {
          text-transform: capitalize;
        }
        .actual-plan {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        button {
          cursor: pointer;
          display: flex;
          border-radius: 999px;
          border: 1px solid var(--box-shadow);
          padding: 0.25rem 0.5rem;
          background: transparent;
          color: var(--text-color);
          transition: 0.3s;
        }
        button:hover {
          background: var(--bg-color-tertiary);
        }
        button:active {
          box-shadow: 0 0 10px 1px var(--box-shadow);
        }
      `}</style>
    </div>
  );
};

export default Plan;
