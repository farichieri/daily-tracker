import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Loader from '@/components/Layout/Loader/Loader';
import GoalsLayout from '@/components/Layout/GoalsLayout';
import GoalDetail from '@/components/Goals/Goal/GoalDetail';
import { selectGoals } from 'store/slices/goalsSlice';

const GoalID = () => {
  const router = useRouter();
  const { goals } = useSelector(selectGoals);
  const { goalID } = router.query;
  const goal = goals[String(goalID)];
  const redirectLink = `/app/goals`;

  return (
    <GoalsLayout>
      {!goal ? (
        <Loader fullScreen={true} text={''} />
      ) : (
        <GoalDetail goal={goal} redirectLink={redirectLink} />
      )}
    </GoalsLayout>
  );
};

export default GoalID;
