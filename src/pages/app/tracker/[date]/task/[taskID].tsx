import Modal from '@/components/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SubTask, Task } from '@/global/types';
import Loader from '@/components/Layout/Loader/Loader';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase.config';
import { selectUser } from 'store/slices/authSlice';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { formatISO } from 'date-fns';
import Subtasks from '@/components/TasksList/Tasks/Subtasks/Subtasks';
import TaskActions from '@/components/TasksList/Tasks/TaskActions/TaskActions';
import TrackerLayout from '@/components/Layout/TrackerLayout';
import { NewSubtaskIinitial } from '@/global/initialTypes';
import {
  selectTasks,
  setDeleteTask,
  setUpdateTask,
} from 'store/slices/tasksSlice';

const TaskID = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { taskID, date } = router.query;
  const { tasks } = useSelector(selectTasks);
  const { user } = useSelector(selectUser);
  const task = tasks[String(taskID)];
  const [taskState, setTaskState] = useState<Task>(task);
  const taskIDLink = `/app/tracker/${date}`;
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
    if (JSON.stringify(task) !== JSON.stringify(taskState)) {
      if (!user) return;
      console.log('Saving taskID');
      const docRef = doc(db, 'users', user.uid, 'tasks', String(taskID));
      await setDoc(docRef, taskState);
      dispatch(setUpdateTask(taskState));
    }
  };

  const handleDelete = async (event: React.MouseEvent) => {
    event.preventDefault();
    router.push(taskIDLink);

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

  return (
    <TrackerLayout>
      {!taskState ? (
        <Loader fullScreen={true} text={''} />
      ) : (
        <Modal
          onCloseRedirect={taskIDLink}
          closeModalOnClick={closeModalOnClick}
        >
          <div className='task-container'>
            <button
              className='delete'
              onClick={handleDelete}
              id={String(taskID)}
            >
              Delete task
            </button>
            <TaskActions />
            <div className='times'>
              <input
                className='time_from'
                name='time_from'
                onBlur={handleSave}
                onChange={handleChangeDates}
                type='time'
                value={taskState.date_set.time_from}
              />
              -
              <input
                className='time_to'
                name='time_to'
                onBlur={handleSave}
                onChange={handleChangeDates}
                type='time'
                value={taskState.date_set.time_to}
              />
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
        </Modal>
      )}
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
    </TrackerLayout>
  );
};

export default TaskID;
