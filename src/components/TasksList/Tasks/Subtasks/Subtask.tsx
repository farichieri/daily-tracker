import IconButton from '@/components/Layout/Icon/IconButton';
import { Task } from '@/global/types';
import { db } from '@/utils/firebase.config';
import { formatISO } from 'date-fns';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { setDeleteTask, setUpdateTask } from 'store/slices/tasksSlice';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';

const Subtask = ({ subTask }: { subTask: Task }) => {
  const [subTaskState, setSubTaskState] = useState<Task>(subTask);
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isSaveable, setIsSaveable] = useState(false);

  const handleChange = (event: React.ChangeEvent) => {
    event.preventDefault();
    const name: string = (event.target as HTMLButtonElement).name;
    const value: string = (event.target as HTMLButtonElement).value;
    console.log({ name });
    setSubTaskState({
      ...subTaskState,
      [name]: value,
    });
  };

  const handleDelete = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (!user) return;
    const taskID: string = (event.target as HTMLButtonElement).id;
    const docRef = doc(db, 'users', user.uid, 'tasks', taskID);
    dispatch(setDeleteTask(taskID));
    await deleteDoc(docRef);
  };

  const handleDoneSubtask = (event: React.MouseEvent) => {
    event.preventDefault();
    const taskID: string = (event.target as HTMLButtonElement).id;
    if (!taskID) return;
    console.log({ subTaskState });
    setSubTaskState({
      ...subTaskState,
      done: !subTaskState.done,
      completed_at: subTaskState.completed_at ? '' : formatISO(new Date()),
      working_on: false,
    });
    setIsSaveable(true);
  };

  const handleSave = async () => {
    console.log('Saving Task');
    if (!user) return;
    const docRef = doc(db, 'users', user.uid, 'tasks', subTaskState.task_id);
    dispatch(setUpdateTask(subTaskState));
    await setDoc(docRef, subTaskState);
  };

  const handleBlur = (event: React.ChangeEvent) => {
    console.log('blur');
    event.preventDefault();
    setIsSaveable(true);
  };

  useEffect(() => {
    if (isSaveable) {
      handleSave();
      setIsSaveable(false);
    }
  }, [isSaveable]);

  return (
    <div className='container'>
      <IconButton
        onClick={handleDoneSubtask}
        props={{ name: 'done', id: subTaskState.task_id }}
        src={
          subTaskState.done ? '/icons/checkbox-done.png' : '/icons/checkbox.png'
        }
        alt={subTaskState.done ? 'Done-Icon' : 'Checkbox-Icon'}
        width={24}
        height={24}
      />
      <input
        type='text'
        placeholder='Add a subTaskState'
        value={subTaskState.content}
        name={'content'}
        onChange={handleChange}
        id={subTaskState.task_id}
        className={`${subTaskState.done ? 'done' : ''}`}
        readOnly={subTaskState.done}
        spellCheck='false'
        autoComplete='off'
        onBlur={handleBlur}
      />
      {subTaskState.done && (
        <div className='delete'>
          <IconButton
            props={{ id: subTaskState.task_id }}
            onClick={handleDelete}
            src={'/icons/delete.png'}
            alt='Delete-Icon'
            width={24}
            height={24}
          />
        </div>
      )}
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          border: 1px solid var(--box-shadow-light);
          border-radius: 0.5rem;
          padding: 0.5rem;
          gap: 0.5rem;
        }
        input {
          width: 100%;
          background: transparent;
          border: transparent;
          outline: none;
          color: var(--text-color);
        }
        input:focus & form {
          border: 1px solid var(--text-shadow);
          background: red;
        }
        input.done {
          text-decoration: line-through;
          cursor: initial;
        }
      `}</style>
    </div>
  );
};

export default Subtask;
