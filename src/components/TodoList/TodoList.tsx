import { Task as TaskType, TaskGroup } from '@/global/types';
import { db } from '@/utils/firebase.config';
import { formatISO } from 'date-fns';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import {
  selectTodo,
  setDeleteTask,
  setUpdateTask,
} from 'store/slices/todosSlice';
import Clock from '../Clock/Clock';
import { useRouter } from 'next/router';
import Tasks from './Task/Tasks';
import AddTask from './Task/AddTask';

const TodoList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tasks } = useSelector(selectTodo);
  const [tasksState, setTasksState] = useState<TaskGroup>(tasks);
  const { user } = useSelector(selectUser);
  const { listID } = router.query;

  const handleToggleDone = (event: React.MouseEvent) => {
    event.preventDefault();
    const taskID: string = (event.target as HTMLButtonElement).id;
    const task = tasksState[taskID];
    if (!task) return;
    const newTodos = { ...tasksState };
    const newTask = { ...task };
    newTask.done = !newTask.done;
    newTask.completed_at = newTask.completed_at ? '' : formatISO(new Date());
    newTodos[taskID] = newTask;
    handleSave(taskID, newTask);
  };

  const handleSave = async (taskID: string, task: TaskType) => {
    console.log('Saving Task');
    if (!user) return;
    const docRef = doc(
      db,
      'users',
      user.uid,
      'todos',
      String(listID),
      'tasks',
      taskID
    );
    await setDoc(docRef, task);
    dispatch(setUpdateTask(task));
  };
  const handleDelete = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (!user) return;
    const taskID: string = (event.target as HTMLButtonElement).id;
    const docRef = doc(
      db,
      'users',
      user.uid,
      'todos',
      String(listID),
      'tasks',
      String(taskID)
    );
    await deleteDoc(docRef);
    dispatch(setDeleteTask(taskID));
  };

  useEffect(() => {
    setTasksState(tasks);
  }, [tasks]);

  return (
    <div className='todo'>
      <div className='header'>
        <Clock />
      </div>
      <Tasks
        tasks={tasksState}
        handleToggleDone={handleToggleDone}
        handleDelete={handleDelete}
      />
      <AddTask />
      <style jsx>{`
        .todo {
          width: 100%;
          display: flex;
          max-width: 600px;
          flex-direction: column;
          gap: 0.5rem;
          height: calc(100vh - var(--premium-nav-height) - 2rem);
        }
        .header {
          display: flex;
          margin-left: auto;
        }
      `}</style>
    </div>
  );
};

export default TodoList;
