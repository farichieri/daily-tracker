import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase.config';
import { formatISO } from 'date-fns';
import { NewTaskInitial } from '@/global/initialTypes';
import { selectUser } from 'store/slices/authSlice';
import { setAddNewTask } from 'store/slices/tasksSlice';
import { Task } from '@/global/types';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import IconButton from '@/components/Layout/Icon/IconButton';

const AddTask = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const { listID, date } = router.query;
  const [newTaskState, setNewTaskState] = useState<Task>(NewTaskInitial);

  const handleChange = (event: React.ChangeEvent) => {
    event.preventDefault();
    const name: string = (event.target as HTMLButtonElement).name;
    const value: string = (event.target as HTMLButtonElement).value;
    setNewTaskState({
      ...newTaskState,
      [name]: value,
    });
  };

  const handleAdd = async (e: any) => {
    e.preventDefault();
    if (!user) return;
    if (newTaskState.content) {
      const project_id = listID ? String(listID) : 'tracker';
      const date_iso =
        listID && newTaskState.date_iso ? newTaskState.date_iso : date;

      const newDocRef = doc(collection(db, 'users', user.uid, 'tasks'));
      const newTask: Task = {
        ...NewTaskInitial,
        added_at: formatISO(new Date()),
        added_by_uid: user.uid,
        task_id: newDocRef.id,
        content: newTaskState.content,
        project_id: project_id,
        date_set: {
          date_iso: date_iso,
          is_recurring: false,
          time_from: newTaskState.time_from || '',
          time_to: '',
          with_time: false,
        },
      };
      setNewTaskState(NewTaskInitial);
      dispatch(setAddNewTask(newTask));
      // Verify if there is an error with firebase.
      await setDoc(newDocRef, newTask);
    }
  };

  return (
    <form className='new-task' onSubmit={handleAdd}>
      <div className='content-container'>
        <div className='row'>
          <input
            type='text'
            name='content'
            placeholder='Add Task'
            value={newTaskState.content}
            onChange={handleChange}
            spellCheck='false'
            autoComplete='off'
          />
        </div>
        <div className='row'>
          <input
            type='text'
            name='description'
            placeholder='Description'
            value={newTaskState.description}
            onChange={handleChange}
            spellCheck='false'
            autoComplete='off'
          />
        </div>
        <div className='row'>
          <div className='time_from'>
            <input
              type='time'
              name='time_from'
              value={newTaskState.time_from}
              onChange={handleChange}
              spellCheck='false'
              autoComplete='off'
            />
          </div>
          <div className='labels'>
            <button>Labels</button>
          </div>
          <div className='time'>
            <button>Time Estimated</button>
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
        </div>
      </div>
      <style jsx>{`
        .new-task {
          border: 1px solid var(--box-shadow-light);
          border-radius: 1rem;
          width: 100%;
          display: flex;
          padding: 0.75rem;
          align-items: center;
          gap: 0.5rem;
          justify-content: space-between;
          min-height: 5rem;
          transition: 0.3s;
        }
        .new-task:hover,
        .new-task:focus-within {
          box-shadow: inset 1px 0 0 rgb(255 255 255 / 1%),
            inset -1px 0 0 rgb(255 255 255 / 1%), 0 0 4px 0 rgb(95 99 104 / 25%),
            0 0 6px 2px rgb(95 99 104 / 25%);
        }
         {
        }
        .content-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 0.25rem;
        }
        .row {
          width: 100%;
          display: flex;
          gap: 0.5rem;
          align-items: center;
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
        input[name='description'] {
          font-size: 80%;
        }
        .time_from {
          border: 1px solid var(--box-shadow);
          display: flex;
          max-width: 5rem;
          border-radius: 6px;
        }
        .add-button {
          margin-left: auto;
        }
        button {
          cursor: pointer;
        }
      `}</style>
    </form>
  );
};

export default AddTask;
