import IconButton from '@/components/Layout/Icon/IconButton';
import { db } from '@/utils/firebase.config';
import { formatISO } from 'date-fns';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import { setAddNewTask } from 'store/slices/todosSlice';

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
      const newTask = {
        activity: [],
        added_at: formatISO(new Date()),
        added_by_uid: user.uid,
        assigned_to: [],
        attachments: [],
        comments: [],
        completed_at: '',
        content: taskInput,
        date_set: '',
        description: '',
        done: false,
        is_archived: false,
        labels: [],
        minutes_spent: 0,
        priority: 0,
        project_id: String(listID),
        reminder_date: '',
        section_id: '',
        subtasks: [],
        task_id: '',
        task_order: 0,
        updated_at: '',
      };
      const newDocRef = doc(
        collection(db, 'users', user.uid, 'todos', String(listID), 'tasks')
      );
      newTask.task_id = newDocRef.id;
      await setDoc(newDocRef, newTask);
      dispatch(setAddNewTask(newTask));
      setTaskInput('');
    }
  };

  return (
    <form className='new-todo' onSubmit={handleAdd}>
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
        .new-todo {
          border: 1px solid gray;
          border-radius: 6px;
          width: 100%;
          display: flex;
          padding: 0.5rem 1rem;
          align-items: center;
          gap: 0.5rem;
          justify-content: space-between;
          min-height: 2.5rem;
          margin-top: auto;
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
