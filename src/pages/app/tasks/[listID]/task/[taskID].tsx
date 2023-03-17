import TasksLayout from '@/components/Layout/TasksLayout';
import Modal from '@/components/Modal/Modal';
import { useSelector } from 'react-redux';
import { selectTodo } from 'store/slices/todosSlice';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SubTask, Task } from '@/global/types';
import Loader from '@/components/Layout/Loader/Loader';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase.config';
import { selectUser } from 'store/slices/authSlice';
import Subtask from '@/components/TodoList/Task/Subtask/Subtask';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { formatISO } from 'date-fns';

const TaskID = ({ closeModalOnClick }: { closeModalOnClick: Function }) => {
  const router = useRouter();
  const { todoTasks, todos } = useSelector(selectTodo);
  const { taskID, listID } = router.query;
  const { user } = useSelector(selectUser);
  const task = todoTasks.find((task) => task.task_id === taskID);
  const list = todos.find((list) => list.list_id === listID);
  const [taskState, setTaskState] = useState<Task>(task);
  const taskIDLink = `/app/tasks/${listID}`;
  const [isSaving, setIsSaving] = useState(false);
  const [isSaveable, setIsSaveable] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
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
    // Improve
    // if (todoTasks && listID && taskID && !task) {
    //   router.push(taskIDLink);
    // }
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

  const handleDoneSubtask = (event: React.MouseEvent) => {
    event.preventDefault();
    const name: string = (event.target as HTMLButtonElement).name;
    const index: number = Number((event.target as HTMLButtonElement).id);
    if (name === 'done') {
      const subtasks = [...taskState.subtasks];
      const subTask = { ...subtasks[index] };
      subTask.done = !subtasks[index].done;
      subTask.completed_at = subTask.done ? formatISO(new Date()) : '';
      subtasks[index] = subTask;
      setTaskState({
        ...taskState,
        subtasks,
      });
      setIsSaveable(true);
    }
  };

  const handleDelete = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (!user) return;
    const index: number = Number((event.target as HTMLButtonElement).id);
    const newSubtasks: any = taskState.subtasks.slice();
    newSubtasks.splice(index, 1);
    const newTasks = { ...taskState };
    newTasks.subtasks = newSubtasks;
    setTaskState(newTasks);
    setIsSaveable(true);
  };

  const handleAddSubtask = (event: React.MouseEvent) => {
    if (!user) return;
    event.preventDefault();
    setTaskState({
      ...taskState,
      subtasks: taskState.subtasks.concat(subtaskState),
    });
    setSubtaskState({
      added_at: formatISO(new Date()),
      added_by_uid: user.uid,
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
    setIsSaveable(true);
  };

  const handleSave = async () => {
    if (JSON.stringify(task) !== JSON.stringify(taskState)) {
      if (!user) return;
      setIsSaving(true);
      setIsDisabled(true);
      console.log('Saving taskID');
      const docRef = doc(
        db,
        'users',
        user.uid,
        'todos',
        String(listID),
        'tasks',
        String(taskID)
      );
      await setDoc(docRef, taskState);
      setIsSaving(false);
      setIsDisabled(false);
    }
  };

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
            <div className='subtasks-container'>
              <span className='title'>Subtasks</span>
              <div className='subtasks'>
                {taskState.subtasks.map((subtask, index: number) => (
                  <Subtask
                    addSubtask={false}
                    handleAddSubtask={null}
                    handleChange={handleChange}
                    handleDelete={handleDelete}
                    handleDoneSubtask={handleDoneSubtask}
                    index={index}
                    key={index}
                    subtaskState={subtask}
                    handleSave={handleSave}
                  />
                ))}
                <Subtask
                  addSubtask={true}
                  handleAddSubtask={handleAddSubtask}
                  handleChange={handleChange}
                  handleDelete={handleDelete}
                  handleDoneSubtask={handleDoneSubtask}
                  index={-1}
                  subtaskState={subtaskState}
                  handleSave={handleSave}
                />
              </div>
            </div>
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
          .subtasks {
            width: 100%;
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
