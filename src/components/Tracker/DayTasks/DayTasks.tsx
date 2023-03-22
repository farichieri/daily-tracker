import { db } from '@/utils/firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import { selectLabels } from 'store/slices/labelsSlice';
import { selectTasks, setUpdateTask } from 'store/slices/tasksSlice';
import { selectUser } from 'store/slices/authSlice';
import { TasksArray, TaskGroup, Task } from '@/global/types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AddTask from '@/components/TasksList/Tasks/AddTask';
import Link from 'next/link';
import TaskComponent from '@/components/TasksList/Tasks/Task/TaskComponent';

const DayTasks = ({ tasksFiltered }: { tasksFiltered: TaskGroup }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(selectUser);
  const [tasksState, setTasksState] = useState<TaskGroup>(tasksFiltered);
  const { tasks } = useSelector(selectTasks);
  const { labels } = useSelector(selectLabels);
  const { date } = router.query;

  const handleToggleDone = (event: React.MouseEvent) => {
    event.preventDefault();
    const id: string = (event.target as HTMLButtonElement).id;
    const newTasks = { ...tasksState };
    const taskSelected: Task = { ...tasksState[id] };
    taskSelected.done = !newTasks[id].done;
    taskSelected.working_on = false;
    setTasksState({
      ...tasksState,
      [id]: taskSelected,
    });
    handleSave(taskSelected);
  };

  const handleSave = async (task: Task) => {
    if (JSON.stringify(task) !== JSON.stringify(tasksFiltered[task.task_id])) {
      if (!user) return;
      console.log('Saving DayTask');
      const docRef = doc(db, 'users', user.uid, 'tasks', task.task_id);
      dispatch(setUpdateTask(task));
      await setDoc(docRef, task);
    }
  };

  const [arrayOfTasksNoTime, setArrayOfTasksNoTime] = useState<TasksArray>([]);
  const [arrayOfTasksWithTime, setArrayOfTasksWithTime] = useState<TasksArray>(
    []
  );

  useEffect(() => {
    const sortedArray = Object.values(tasksFiltered).sort((a, b) =>
      a.date_set.time_from?.localeCompare(b.date_set.time_from)
    );
    const arrayWithTime = sortedArray.filter((task) => task.date_set.time_from);
    const arrayNoTime = sortedArray.filter((task) => !task.date_set.time_from);
    setArrayOfTasksWithTime(arrayWithTime);
    setArrayOfTasksNoTime(arrayNoTime);
    setTasksState(tasksFiltered);
  }, [tasksFiltered]);

  const getLabelsByTask = (taskID: string) => {
    const task = { ...tasks[String(taskID)] };
    const labelsSelected = task.labels;
    const labelsFiltered = labelsSelected?.map((label) => labels[label]);
    return labelsFiltered;
  };

  return (
    <section className='table'>
      <div className='tasks'>
        {arrayOfTasksWithTime?.map((task) => (
          <Link
            href={`/app/tracker/${date}/task/${task.task_id}`}
            key={task.task_id}
          >
            <TaskComponent
              taskID={task.task_id}
              task={task}
              handleToggleDone={handleToggleDone}
              getLabelsByTask={getLabelsByTask}
            />
          </Link>
        ))}
        <div className='tasks-no-time'>
          {arrayOfTasksNoTime?.map((task) => (
            <Link
              href={`/app/tracker/${date}/task/${task.task_id}`}
              key={task.task_id}
            >
              <TaskComponent
                taskID={task.task_id}
                task={task}
                handleToggleDone={handleToggleDone}
                getLabelsByTask={getLabelsByTask}
              />
            </Link>
          ))}
        </div>
      </div>
      <AddTask />
      <style jsx>{`
        section {
          width: 100%;
          background: transparent;
        }
        .table {
          width: 100%;
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          border-collapse: collapse;
          gap: 1rem;
        }
        .tasks {
          gap: 0.5rem;
          display: flex;
          flex-direction: column;
        }
        .tasks-no-time {
          margin-top: 1rem;
          gap: 0.5rem;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </section>
  );
};

export default DayTasks;
