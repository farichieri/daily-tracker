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
    console.log({ value });
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
        <div className='labels'>
          <span className='from'>From</span>
          <span className='to'>To</span>
        </div>
        <div className='hour-inputs'>
          <div className='from-container'>
            <input
              type='time'
              placeholder='Hour'
              onChange={handleChange}
              value={newTaskState.time_from}
              name='time_from'
              spellCheck='false'
              autoComplete='off'
              min='9:00'
              max='15:00'
              step='60'
            />
          </div>
          <div className='to-container'>
            <input
              type='time'
              onChange={handleChange}
              value={newTaskState.time_to}
              name='time_to'
              spellCheck='false'
              autoComplete='off'
            />
          </div>
        </div>
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
        <input
          placeholder={'Description'}
          onChange={handleChange}
          value={newTaskState.description}
          name='description'
          spellCheck='false'
          autoComplete='off'
          className='description'
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
          max-width: 6rem;
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        .description {
          font-size: 80%;
          color: var(--text-secondary-color);
        }
        input[type='time']::-webkit-calendar-picker-indicator {
          display: none;
        }
        input[type='time'] {
          cursor: text;
        }
        .action {
          width: 2.5rem;
        }
        .container.done .hour {
          border-right: 3px solid #02c3026b;
        }
        .from-container,
        .to-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          align-items: center;
        }
        .labels {
          width: 100%;
          display: flex;
        }
        .from,
        .to {
          font-size: 80%;
          color: var(--text-secondary-color);
          width: 100%;
          text-align: left;
          padding: 0 0.5rem;
        }
        .to {
          padding-left: 0.85rem;
        }
        .hour-inputs {
          display: flex;
          align-items: center;
        }
        .hour-inputs input {
          opacity: 0.6;

          display: flex;
          padding: 0;
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
