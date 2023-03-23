import { filterTasksDone, filterTasksPending } from '@/hooks/helpers';
import { selectLabels } from 'store/slices/labelsSlice';
import { selectTasks } from 'store/slices/tasksSlice';
import { TaskGroup, TasksArray } from '@/global/types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import TaskComponent from './Task/TaskComponent';

const Tasks = ({ tasksState }: { tasksState: TaskGroup }) => {
  const router = useRouter();
  const { listID } = router.query;
  const { tasks } = useSelector(selectTasks);
  const { labels } = useSelector(selectLabels);

  const getLabelsByTask = (taskID: string) => {
    const task = { ...tasks[String(taskID)] };
    const labelsSelected = task.labels;
    const labelsFiltered = labelsSelected?.map((label) => labels[label]);
    return labelsFiltered;
  };

  const [pendingTasks, setPendingTasks] = useState<TasksArray>([]);
  const [doneTasks, setDoneTasks] = useState<TasksArray>([]);
  const [showDoneTasks, setShowDoneTasks] = useState(true);

  useEffect(() => {
    const pendingTasks = filterTasksPending(tasksState);
    const doneTasks = filterTasksDone(tasksState);
    setPendingTasks(Object.values(pendingTasks));
    setDoneTasks(Object.values(doneTasks));
  }, [tasksState]);

  return (
    <div className='tasks-container'>
      <div className='filters'>
        <button onClick={() => setShowDoneTasks(!showDoneTasks)}>
          {showDoneTasks ? 'Hide Done Tasks' : 'Show Done Tasks'}
        </button>
      </div>
      {pendingTasks?.map((task) => (
        <Link
          href={`/app/lists/${listID}/task/${task.task_id}`}
          key={task.task_id}
        >
          <TaskComponent
            taskID={task.task_id}
            task={task}
            getLabelsByTask={getLabelsByTask}
          />
        </Link>
      ))}
      {showDoneTasks &&
        doneTasks?.map((task) => (
          <Link
            href={`/app/lists/${listID}/task/${task.task_id}`}
            key={task.task_id}
          >
            <TaskComponent
              taskID={task.task_id}
              task={task}
              getLabelsByTask={getLabelsByTask}
            />
          </Link>
        ))}

      <style jsx>{`
        .tasks-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        button {
          border-radius: 999px;
          background: transparent;
          color: var(--text-color);
          border: 1px solid var(--box-shadow);
          cursor: pointer;
          padding: 0.25rem 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default Tasks;
