import IconButton from '@/components/Layout/Icon/IconButton';
import { Task } from '@/global/types';
import { db } from '@/utils/firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import { setUpdateTask } from 'store/slices/tasksSlice';

const WorkingOnButton = ({ task }: { task: Task }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);

  const handleToggleWorkOn = async (task: Task) => {
    if (!user) return;
    let taskUpdated: Task = task;
    if (!task.working_on) {
      taskUpdated = {
        ...task,
        working_on: true,
      };
    } else {
      taskUpdated = {
        ...task,
        working_on: !task.working_on,
      };
    }
    dispatch(setUpdateTask(taskUpdated));
    const docRef = doc(db, 'users', user.uid, 'tasks', task.task_id);
    await setDoc(docRef, taskUpdated);
  };

  return (
    <div className='container'>
      Working on:
      <IconButton
        onClick={() => handleToggleWorkOn(task)}
        props={{ name: 'working_on' }}
        src={task.working_on ? '/icons/toggle-on.png' : '/icons/toggle-off.png'}
        alt={task.working_on ? 'On-Icon' : 'Off-Icon'}
        width={24}
        height={24}
      />
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default WorkingOnButton;
