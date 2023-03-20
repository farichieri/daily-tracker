import IconButton from '@/components/Layout/Icon/IconButton';
import { NewTaskInitial } from '@/global/initialTypes';
import { Task } from '@/global/types';
import { db } from '@/utils/firebase.config';
import { formatISO } from 'date-fns';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import { setAddNewTask } from 'store/slices/tasksSlice';

const AddTask = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [taskInput, setTaskInput] = useState('');
  const { user } = useSelector(selectUser);
  const { listID } = router.query;

  const handleAdd = async (e: any) => {
    e.preventDefault();
    if (!user) return;
    if (taskInput) {
      const newTask: Task = {
        ...NewTaskInitial,
        added_at: formatISO(new Date()),
        added_by_uid: user.uid,
        content: taskInput,
        project_id: String(listID),
        date_set: {
          date_iso: '',
          is_recurring: false,
          time_from: '',
          time_to: '',
          with_time: false,
        },
      };
      const newDocRef = doc(collection(db, 'users', user.uid, 'tasks'));
      newTask.task_id = newDocRef.id;
      await setDoc(newDocRef, newTask);
      dispatch(setAddNewTask(newTask));
      setTaskInput('');
    }
  };

  return (
    <form className='new-task' onSubmit={handleAdd}>
      <div className='name'>
        <input
          type='text'
          placeholder='Add Task'
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
      </div>
      <div className='add-button'>
        <IconButton
          props={null}
          onClick={handleAdd}
          src={'/icons/add.png'}
          alt='Add-Icon'
          width={24}
          height={24}
        />
      </div>
      <style jsx>{`
        .new-task {
          border: 1px solid gray;
          border-radius: 6px;
          width: 100%;
          display: flex;
          padding: 0.5rem 1rem;
          align-items: center;
          gap: 0.5rem;
          justify-content: space-between;
          min-height: 2.5rem;
        }
        .name {
          width: 100%;
        }
        input {
          display: flex;
          border: none;
          padding: 0;
          width: 100%;
          outline: none;
          background: transparent;
          color: var(--text-color);
        }
      `}</style>
    </form>
  );
};

export default AddTask;
