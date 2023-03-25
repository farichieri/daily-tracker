import { Goal } from '@/global/types';
import { format, parseISO } from 'date-fns';
import ToggleDoneGoal from '../GoalActions/GoalActionsButtons/ToggleDoneGoal';

const Goal = ({ goal }: { goal: Goal }) => {
  const iso = goal.date_set.date_iso;
  const isoDisplay = iso && format(parseISO(iso), 'MM-dd-yyyy');
  const todayDisplay = format(new Date(), 'MM-dd-yyyy'); // US Format
  const dateDisplayed = isoDisplay === todayDisplay ? 'Today' : isoDisplay;
  return (
    <div className='flex w-full border-gray-500 border my-2 rounded-xl p-2 gap-2 items-start text-white'>
      <div className='flex-col gap-2'>
        {dateDisplayed && (
          <div className='border-gray-500 border p-1 rounded-xl'>
            {dateDisplayed}
          </div>
        )}
      </div>
      <div className='flex-col my-auto'>
        <div className='flex'>
          <span className=''>{goal.content}</span>
        </div>
        <div className='flex '>
          <span className='text-gray-400'>{goal.description}</span>
        </div>
      </div>
      <div className='flex ml-auto my-auto'>
        <ToggleDoneGoal goal={goal} />
      </div>
    </div>
  );
};

export default Goal;
