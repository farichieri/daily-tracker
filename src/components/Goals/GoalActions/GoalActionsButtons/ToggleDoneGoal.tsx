import { db } from '@/utils/firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import { selectUser } from 'store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@/components/Layout/Icon/IconButton';
import { Goal } from '@/global/types';
import { setUpdateGoal } from 'store/slices/goalsSlice';

const ToggleDoneGoal = ({ goal }: { goal: Goal }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);

  const handleToggleDone = (event: React.MouseEvent) => {
    event.preventDefault();
    const goalUpdated: Goal = { ...goal };
    goalUpdated.done = !goal.done;
    goalUpdated.working_on = false;
    handleSave(goalUpdated);
  };

  const handleSave = async (goalUpdated: Goal) => {
    if (JSON.stringify(goalUpdated) !== JSON.stringify(goal)) {
      if (!user) return;
      console.log('Saving Goal');
      const docRef = doc(db, 'users', user.uid, 'goals', goalUpdated.goal_id);
      dispatch(setUpdateGoal(goalUpdated));
      await setDoc(docRef, goalUpdated);
    }
  };

  return (
    <div className='pointer-events-auto m-auto'>
      <IconButton
        onClick={handleToggleDone}
        props={{ id: goal.goal_id }}
        src={goal.done ? '/icons/checkbox-done.png' : '/icons/checkbox.png'}
        alt={goal.done ? 'Done-Icon' : 'Checkbox-Icon'}
        width={24}
        height={24}
      />
    </div>
  );
};

export default ToggleDoneGoal;
