import { TaskGroup, TasksArray } from '@/global/types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectLabels } from 'store/slices/labelsSlice';
import { selectTasks } from 'store/slices/tasksSlice';
import TaskComponent from './Task/TaskComponent';
import { useEffect, useState } from 'react';

const Tasks = ({
  tasksState,
  handleToggleDone,
}: {
  tasksState: TaskGroup;
  handleToggleDone: any;
}) => {
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
  const [sortedArrayOfTasks, setSortedArrayOfTasks] = useState<TasksArray>([]);

  useEffect(() => {
    const sortedArray = Object.values(tasksState).sort(
      (a, b) => Number(a.done) - Number(b.done)
    );
    setSortedArrayOfTasks(sortedArray);
  }, [tasksState]);

  return (
    <div className='tasks-container'>
      {sortedArrayOfTasks?.map((task) => (
        <Link
          href={`/app/lists/${listID}/task/${task.task_id}`}
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
      <style jsx>{`
        .tasks-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default Tasks;
