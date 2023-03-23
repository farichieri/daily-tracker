import { filterObject } from '@/hooks/helpers';
import { selectTasks } from 'store/slices/tasksSlice';
import { TaskGroup } from '@/global/types';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AddTask from './Tasks/AddTask';
import Clock from '../Clock/Clock';
import Tasks from './Tasks/Tasks';

const TasksList = () => {
  const router = useRouter();
  const { listID } = router.query;
  const { tasks } = useSelector(selectTasks);
  const tasksByListID = filterObject(tasks, 'project_id', String(listID));
  const [tasksState, setTasksState] = useState<TaskGroup>(tasksByListID);

  useEffect(() => {
    setTasksState(tasksByListID);
  }, [tasks, listID]);

  return (
    <div className='list'>
      <div className='header'>
        <Clock />
      </div>
      <div className='tasks-container'>
        <Tasks tasksState={tasksState} />
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
