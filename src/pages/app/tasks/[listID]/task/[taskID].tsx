import TasksLayout from '@/components/Layout/TasksLayout';
import Modal from '@/components/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodo, setUpdateTask } from 'store/slices/todosSlice';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SubTask, Task } from '@/global/types';
import Loader from '@/components/Layout/Loader/Loader';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase.config';
import { selectUser } from 'store/slices/authSlice';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { formatISO } from 'date-fns';
import Subtasks from '@/components/TodoList/Task/Subtasks/Subtasks';
import TaskActions from '@/components/TodoList/Task/TaskActions/TaskActions';

const TaskID = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { tasks, todos } = useSelector(selectTodo);
  const { taskID, listID } = router.query;
  const { user } = useSelector(selectUser);
  const task = tasks[String(taskID)];
  const list = todos[String(listID)];
  const [taskState, setTaskState] = useState<Task>(task);
  const taskIDLink = `/app/tasks/${listID}`;
  const [isSaveable, setIsSaveable] = useState(false);
  const [subtaskState, setSubtaskState] = useState<SubTask>({
    added_at: formatISO(new Date()),
    added_by_uid: '',
    assigned_to: [],
    comments: [],
    completed_at: '',
    content: '',
    date_set: '',
    description: '',
    done: false,
    is_archived: false,
    minutes_spent: 0,
    parent_id: String(taskID),
    priority: 0,
    project_id: String(listID),
    reminder_date: '',
    section_id: '',
    task_order: 0,
    updated_at: '',
  });

  useEffect(() => {
    setTaskState(task);
  }, [task, listID, list, task]);

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

  const handleSave = async () => {
    if (JSON.stringify(task) !== JSON.stringify(taskState)) {
      if (!user) return;
      console.log('Saving taskID');
      const docRef = doc(db, 'users', user.uid, 'tasks', String(taskID));
      await setDoc(docRef, taskState);
      dispatch(setUpdateTask(taskState));
    }
  };

  const closeModalOnClick = () => {};

  return (
    <TasksLayout>
      {!taskState ? (
        <Loader fullScreen={true} text={''} />
      ) : (
        <Modal
          onCloseRedirect={taskIDLink}
          closeModalOnClick={closeModalOnClick}
        >
          <div className='task-container'>
            <TaskActions />
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
            width: 80vw;
            max-width: var(--max-width-task);
            height: 80vh;
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
        `}
      </style>
    </TasksLayout>
  );
};

export default TaskID;
