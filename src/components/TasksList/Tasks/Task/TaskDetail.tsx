import { db } from '@/utils/firebase.config';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { formatISO } from 'date-fns';
import { NewSubtaskIinitial } from '@/global/initialTypes';
import { selectUser } from 'store/slices/authSlice';
import { SubTask, Task } from '@/global/types';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Modal from '@/components/Modal/Modal';
import React, { useEffect, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import Subtasks from '@/components/TasksList/Tasks/Subtasks/Subtasks';
import TaskActions from '@/components/TasksList/Tasks/TaskActions/TaskActions';
import {
  selectTasks,
  setDeleteTask,
  setUpdateTask,
} from 'store/slices/tasksSlice';
import TimeInput from '@/components/Layout/Input/TimeInput';

const TaskID = ({
  task,
  redirectLink,
}: {
  task: Task;
  redirectLink: string;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { taskID, date } = router.query;
  const { tasks } = useSelector(selectTasks);
  const { user } = useSelector(selectUser);
  const [taskState, setTaskState] = useState<Task>(task);
  const [isSaveable, setIsSaveable] = useState(false);
  const [subtaskState, setSubtaskState] = useState<SubTask>({
    ...NewSubtaskIinitial,
    added_at: formatISO(new Date()),
    parent_id: String(taskID),
    project_id: '',
  });

  useEffect(() => {
    setTaskState(task);
  }, [task, date, task]);

  useEffect(() => {
    if (isSaveable) {
      handleSave();
      setIsSaveable(false);
    }
  }, [isSaveable]);

  const handleChange = (event: React.ChangeEvent) => {
    event.preventDefault();
    const name: string = (event.target as HTMLButtonElement).name;
    const value: string = (event.target as HTMLButtonElement).value;
    const index: number = Number((event.target as HTMLButtonElement).id);
    if (name === 'new-subtask') {
      setSubtaskState({
        ...subtaskState,
        content: value,
      });
    } else if (name === 'subtask') {
      const subtasks = [...taskState.subtasks];
      const subTask = { ...subtasks[index] };
      subTask.content = value;
      subtasks[index] = subTask;
      setTaskState({
        ...taskState,
        subtasks,
      });
    } else {
      setTaskState({
        ...taskState,
        [name]: value,
      });
    }
  };

  const handleChangeDates = (event: React.ChangeEvent) => {
    event.preventDefault();
    const name: string = (event.target as HTMLButtonElement).name;
    const value: string = (event.target as HTMLButtonElement).value;
    const newDateSet = {
      ...taskState.date_set,
      [name]: value,
    };
    setTaskState({
      ...taskState,
      ['date_set']: newDateSet,
    });
  };

  const handleSave = async () => {
    console.log({ task });
    console.log({ taskState });
    console.log(JSON.stringify(task) !== JSON.stringify(taskState));
    if (JSON.stringify(task) !== JSON.stringify(taskState)) {
      if (!user) return;
      console.log('Saving taskID');
      const docRef = doc(db, 'users', user.uid, 'tasks', String(taskID));
      const time_from = taskState.date_set.time_from;
      const time_to = taskState.date_set.time_to;
      const taskUpdated = {
        ...taskState,
        date_set: {
          date_iso: taskState.date_set.date_iso,
          is_recurring: false,
          time_from: time_from || '',
          time_to: (time_from && time_to) || '',
          with_time: false,
        },
      };
      await setDoc(docRef, taskUpdated);
      dispatch(setUpdateTask(taskUpdated));
    }
  };

  const handleDelete = async (event: React.MouseEvent) => {
    event.preventDefault();
    router.push(redirectLink);

    if (!user) return;
    const id: string = (event.target as HTMLButtonElement).id;
    const newTasks: any = { ...tasks };
    const taskDeleted = newTasks[id];
    delete newTasks[id];
    const docRef = doc(db, 'users', user.uid, 'tasks', taskDeleted.task_id);
    dispatch(setDeleteTask(taskDeleted.task_id));
    await deleteDoc(docRef);
  };

  const closeModalOnClick = () => {};

  const removeTime = (event: React.MouseEvent) => {
    const name: string = (event.target as HTMLButtonElement).name;
    const newDateSet = {
      ...taskState.date_set,
      [name]: '',
    };
    setTaskState({
      ...taskState,
      ['date_set']: newDateSet,
    });
    setIsSaveable(true);
  };

  return (
    <Modal onCloseRedirect={redirectLink} closeModalOnClick={closeModalOnClick}>
      <div className='task-container'>
        <button className='delete' onClick={handleDelete} id={String(taskID)}>
          Delete task
        </button>
        <TaskActions />
        <div className='times'>
          <TimeInput
            name='time_from'
            onBlur={handleSave}
            onChange={handleChangeDates}
            value={taskState.date_set.time_from}
            removeTime={removeTime}
          />
          {taskState.date_set.time_from && (
            <>
              -
              <TimeInput
                name='time_to'
                onBlur={handleSave}
                onChange={handleChangeDates}
                value={taskState.date_set.time_to}
                removeTime={removeTime}
              />
            </>
          )}
        </div>
        <div className='task-content'>
          <input
            type='text'
            name='content'
            value={taskState.content}
            onChange={handleChange}
            spellCheck='false'
            autoComplete='off'
            onBlur={handleSave}
          />
        </div>
        <div className='comments-container'>
          <span className='title'>Description</span>
          <ReactTextareaAutosize
            name='description'
            value={taskState.description}
            placeholder='Add a description'
            onChange={handleChange}
            spellCheck='false'
            autoComplete='off'
            onBlur={handleSave}
            className='textarea'
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              background: 'transparent',
              color: 'var(--text-color)',
              border: 'none',
              width: '100%',
              resize: 'none',
              userSelect: 'all',
            }}
          />
        </div>
        <Subtasks
          setIsSaveable={setIsSaveable}
          handleSave={handleSave}
          handleChange={handleChange}
          setTaskState={setTaskState}
          taskState={taskState}
          subtaskState={subtaskState}
          setSubtaskState={setSubtaskState}
        />
        <div className='attachments-container'>
          <span className='title'>Attachments</span>
          <div className='attachments'></div>
        </div>
      </div>
      <style jsx>
        {`
          .task-container {
            padding: 2rem 1.5rem;
            width: 95vw;
            max-width: var(--max-width-task);
            max-height: 90vh;
            height: 100vh;
            text-align: left;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            color: var(--text-secondary-color);
            overflow: auto;
            pointer-events: initial;
          }
          div {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }
          input {
            background: transparent;
            border: none;
            color: var(--text-color);
            font-size: 1.5rem;
          }
          .attachments {
            width: 100%;
            border: 1px solid var(--box-shadow-light);
            padding: 0.25rem;
            height: 3rem;
            border-radius: 0.5rem;
          }
          .delete {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
          .times {
            display: flex;
            flex-direction: row;
            align-items: center;
          }
          .time_from,
          .time_to {
            border: 1px solid var(--box-shadow-light);
            display: flex;
            padding: 0.25rem 0.5rem;
            border-radius: 6px;
            justify-content: center;
            align-items: center;
            max-width: 6rem;
            font-size: 1rem;
          }
        `}
      </style>
    </Modal>
  );
};

export default TaskID;
