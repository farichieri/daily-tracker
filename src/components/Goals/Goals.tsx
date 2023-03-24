import { GoalGroup, GoalsArray } from '@/global/types';
import { filterTasksDone, filterTasksPending } from '@/hooks/helpers';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectGoals } from 'store/slices/goalsSlice';
import Link from 'next/link';
import Goal from './Goal/Goal';

const Goals = () => {
  const { goals } = useSelector(selectGoals);

  const [pendingGoals, setPendingGoals] = useState<GoalsArray>([]);
  const [doneGoals, setDoneGoals] = useState<GoalsArray>([]);
  const [showDoneGoals, setShowDoneGoals] = useState(true);

  useEffect(() => {
    const pendingGoals: GoalGroup = filterTasksPending(goals);
    const doneTasks: GoalGroup = filterTasksDone(goals);
    // Working_on on top
    const sortedPendingTasks = Object.values(pendingGoals)
      .sort(
        (a, b) => Number(b.working_on || false) - Number(a.working_on || false)
      )
      .sort((a, b) => b.date_set.date_iso?.localeCompare(a.date_set.date_iso));
    const sortedDoneTasks = Object.values(doneTasks).sort((a, b) =>
      b.date_set.date_iso?.localeCompare(a.date_set.date_iso)
    );
    setPendingGoals(sortedPendingTasks);
    setDoneGoals(sortedDoneTasks);
  }, [goals]);

  return (
    <div className='container'>
      {pendingGoals?.map((goal) => (
        <Link href={`/app/goals/${goal.goal_id}`} key={goal.goal_id}>
          <Goal goal={goal} />
        </Link>
      ))}
      {showDoneGoals &&
        doneGoals?.map((goal) => (
          <Link href={`/app/goals/${goal.goal_id}`} key={goal.goal_id}>
            <Goal goal={goal} />
          </Link>
        ))}
    </div>
  );
};

export default Goals;
