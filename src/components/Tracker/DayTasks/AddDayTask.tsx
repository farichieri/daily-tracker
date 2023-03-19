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
import { setAddNewDayTask } from 'store/slices/trackerSlice';

const AddDayTask = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const { date } = router.query;
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
      const newTaskRef = doc(
        collection(db, 'users', user.uid, 'tracker', String(date), 'tasks')
      );
      const newTask = {
        ...newTaskState,
        added_at: formatISO(new Date()),
        project_id: 'tracker',
        task_id: newTaskRef.id,
      };

      await setDoc(newTaskRef, newTask);
      dispatch(setAddNewDayTask(newTask));
      setNewTaskState(NewTaskInitial);
    }
  };

  return (
    <div className={`container `}>
      <div className='column hour'>
        <input
          placeholder='Hour'
          onChange={handleChange}
          value={newTaskState.date_set}
          name='date_set'
          spellCheck='false'
          autoComplete='off'
        />
      </div>
      <div className='column task-description'>
        <input
          placeholder='New Task'
          onChange={handleChange}
          value={newTaskState.content}
          name='content'
          spellCheck='false'
          autoComplete='off'
        />
      </div>
      <div className='column action'>
        <div style={{ paddingRight: '.5rem' }}>
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
      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          border-radius: 5px;
          padding: 0.25rem 0.25 0.25rem 0.25rem;
        }

        input {
          background: none;
          color: var(--text-color);
          border: none;
          outline: none;
          padding: 0.25rem 0.3rem 0.25rem 0.5rem;
        }
        .column {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
        }
        .hour {
          width: fit-content;
          word-break: break-all;
          font-size: 80%;
          border-right: 3px solid var(--box-shadow);
          margin: 0.5rem 0;
          max-width: 7rem;
        }
        .action {
          width: 2.5rem;
        }
        .container.done .hour {
          border-right: 3px solid #02c3026b;
        }
        @media screen and (max-width: 500px) {
          .hour {
            max-width: 5.5rem;
          }
        }
        @media screen and (max-width: 300px) {
          .hour {
            max-width: 4.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AddDayTask;
