import IconButton from '@/components/Layout/Icon/IconButton';
import { NewTaskInitial } from '@/global/initialTypes';
import { Task } from '@/global/types';
import { db } from '@/utils/firebase.config';
import { formatISO } from 'date-fns';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import { setAddNewTask } from 'store/slices/tasksSlice';

const AddSubtask = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { taskID } = router.query;
  const { user } = useSelector(selectUser);
  const [newSubtaskState, setNewSbutaskState] = useState<Task>(NewTaskInitial);

  const handleAddSubtask = async (e: any) => {
    e.preventDefault();
    if (!user) return;
    if (newSubtaskState.content) {
      const project_id = newSubtaskState.project_id
        ? newSubtaskState.project_id
        : 'tracker';

      const newDocRef = doc(collection(db, 'users', user.uid, 'tasks'));
      const newSubtask: Task = {
        ...newSubtaskState,
        added_at: formatISO(new Date()),
        added_by_uid: user.uid,
        task_id: newDocRef.id,
        content: newSubtaskState.content,
        project_id: project_id,
        parent_id: String(taskID),
      };
      console.log({ newSubtask });
      setNewSbutaskState(NewTaskInitial);
      dispatch(setAddNewTask(newSubtask));
      // Verify if there is an error with firebase.
      await setDoc(newDocRef, newSubtask);
    }
  };

  const handleChange = (event: React.ChangeEvent) => {
    const name: string = (event.target as HTMLButtonElement).name;
    const value: string = (event.target as HTMLButtonElement).value;
    setNewSbutaskState({
      ...newSubtaskState,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleAddSubtask}>
      <input
        type='text'
        placeholder='Add a subtask'
        name='content'
        value={newSubtaskState.content}
        onChange={handleChange}
        readOnly={newSubtaskState.done}
        spellCheck='false'
        autoComplete='off'
      />
      <IconButton
        props={{ type: 'submit' }}
        onClick={handleAddSubtask}
        src={'/icons/add.png'}
        alt='Add-Icon'
        width={24}
        height={24}
      />
      <style jsx>{`
        form {
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
    </form>
  );
};

export default AddSubtask;
