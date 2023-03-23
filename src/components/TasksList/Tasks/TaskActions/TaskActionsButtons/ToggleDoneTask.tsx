import { db } from '@/utils/firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import { selectUser } from 'store/slices/authSlice';
import { setUpdateTask } from 'store/slices/tasksSlice';
import { Task } from '@/global/types';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import IconButton from '@/components/Layout/Icon/IconButton';

const ToggleDoneTask = ({ task }: { task: Task }) => {
  const dispatch = useDispatch();
  const [taskState, setTaskState] = useState<Task>(task);
  const { user } = useSelector(selectUser);

  const handleToggleDone = (event: React.MouseEvent) => {
    event.preventDefault();
    const taskUpdated: Task = { ...taskState };
    taskUpdated.done = !taskState.done;
    taskUpdated.working_on = false;
    setTaskState({
      ...taskUpdated,
    });
    handleSave(taskUpdated);
  };

  const handleSave = async (task: Task) => {
    if (JSON.stringify(task) !== JSON.stringify(taskState)) {
      if (!user) return;
      console.log('Saving DayTask');
      const docRef = doc(db, 'users', user.uid, 'tasks', task.task_id);
      dispatch(setUpdateTask(task));
      await setDoc(docRef, task);
    }
  };

  return (
    <div className='container'>
      <IconButton
        onClick={handleToggleDone}
        props={{ id: task.task_id }}
        src={task.done ? '/icons/checkbox-done.png' : '/icons/checkbox.png'}
        alt={task.done ? 'Done-Icon' : 'Checkbox-Icon'}
        width={24}
        height={24}
      />
      <style jsx>{`
        .container {
          pointer-events: initial;
        }
      `}</style>
    </div>
  );
};

export default ToggleDoneTask;
