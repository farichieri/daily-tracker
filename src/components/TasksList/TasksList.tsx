import { Task as TaskType, TaskGroup } from '@/global/types';
import { db } from '@/utils/firebase.config';
import { formatISO } from 'date-fns';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import { selectTasks, setUpdateTask } from 'store/slices/tasksSlice';
import Clock from '../Clock/Clock';
import { useRouter } from 'next/router';
import Tasks from './Tasks/Tasks';
import AddTask from './Tasks/AddTask';
import { filterObject } from '@/hooks/helpers';

const TasksList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tasks } = useSelector(selectTasks);
  const { listID } = router.query;
  const tasksByListID = filterObject(tasks, 'project_id', String(listID));
  const [tasksState, setTasksState] = useState<TaskGroup>(tasksByListID);
  const { user } = useSelector(selectUser);

  const handleToggleDone = (event: React.MouseEvent) => {
    event.preventDefault();
    const taskID: string = (event.target as HTMLButtonElement).id;
    const task = tasksState[taskID];
    if (!task) return;
    const newList = { ...tasksState };
    const newTask = { ...task };
    newTask.done = !newTask.done;
    newTask.completed_at = newTask.completed_at ? '' : formatISO(new Date());
    newList[taskID] = newTask;
    handleSave(taskID, newTask);
  };

  const handleSave = async (taskID: string, task: TaskType) => {
    console.log('Saving Task');
    if (!user) return;
    const docRef = doc(db, 'users', user.uid, 'tasks', taskID);
    dispatch(setUpdateTask(task));
    await setDoc(docRef, task);
  };

  useEffect(() => {
    setTasksState(tasksByListID);
  }, [tasks, listID]);

  return (
    <div className='list'>
      <div className='header'>
        <Clock />
      </div>
      <div className='tasks-container'>
        <Tasks tasksState={tasksState} handleToggleDone={handleToggleDone} />
        <AddTask />
      </div>
      <style jsx>{`
        .list {
          width: 100%;
          display: flex;
          max-width: 600px;
          flex-direction: column;
          gap: 0.5rem;
          height: 100%;
        }
        .tasks-container {
          justify-content: space-between;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 10rem;
        }
        .header {
          display: flex;
          margin-left: auto;
        }
      `}</style>
    </div>
  );
};

export default TasksList;
