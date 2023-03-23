import { db } from '@/utils/firebase.config';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { formatISO } from 'date-fns';
import { selectUser } from 'store/slices/authSlice';
import { setDeleteTask, setUpdateTask } from 'store/slices/tasksSlice';
import { Task } from '@/global/types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import IconButton from '@/components/Layout/Icon/IconButton';

const Subtask = ({
  subTask,
  inTaskCompnent,
  parentTask,
}: {
  parentTask: Task;
  subTask: Task;
  inTaskCompnent: boolean;
}) => {
  const [isSaveable, setIsSaveable] = useState(false);
  const [subTaskState, setSubTaskState] = useState<Task>(subTask);
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();

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
    if (parentTask.done) return;
    if (!taskID) return;
    setSubTaskState({
      ...subTaskState,
      done: !subTaskState.done,
      completed_at: subTaskState.completed_at ? '' : formatISO(new Date()),
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
    event.preventDefault();
    setIsSaveable(true);
  };

  useEffect(() => {
    if (isSaveable) {
      handleSave();
      setIsSaveable(false);
    }
  }, [isSaveable]);

  useEffect(() => {
    if (parentTask.done) {
      setSubTaskState({
        ...subTaskState,
        done: true,
        completed_at: subTaskState.completed_at ? '' : formatISO(new Date()),
      });
      setIsSaveable(true);
    }
  }, [parentTask]);

  return (
    <div className='container'>
      <IconButton
        onClick={handleDoneSubtask}
        props={{ name: 'done', id: subTaskState.task_id }}
        src={
          subTaskState.done ? '/icons/checkbox-done.png' : '/icons/checkbox.png'
        }
        alt={subTaskState.done ? 'Done-Icon' : 'Checkbox-Icon'}
        width={18}
        height={18}
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
      {subTaskState.done && !inTaskCompnent && (
        <div className='delete'>
          <IconButton
            props={{ id: subTaskState.task_id }}
            onClick={handleDelete}
            src={'/icons/delete.png'}
            alt='Delete-Icon'
            width={18}
            height={18}
          />
        </div>
      )}
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: ${inTaskCompnent ? '80%' : '100%'};
        }
        input {
          width: 100%;
          background: transparent;
          border: transparent;
          outline: none;
          color: var(--text-color);
          cursor: ${inTaskCompnent ? 'pointer' : 'text'};
          pointer-events: ${inTaskCompnent ? 'none' : 'auto'};
        }
        input:focus & form {
          border: 1px solid var(--text-shadow);
          background: red;
        }
        input.done {
          text-decoration: line-through;
          cursor: ${inTaskCompnent ? 'pointer' : 'text'};
        }
      `}</style>
    </div>
  );
};

export default Subtask;
