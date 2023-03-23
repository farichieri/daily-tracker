import { filterSubtasks } from '@/hooks/helpers';
import { filterTasksDone } from '@/hooks/helpers';
import { selectLabels } from 'store/slices/labelsSlice';
import { selectTasks } from 'store/slices/tasksSlice';
import { TasksArray, TaskGroup, TasksGroup } from '@/global/types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import AddTask from '@/components/TasksList/Tasks/AddTask';
import Link from 'next/link';
import Progressbar from '@/components/Layout/Progressbar/Progressbar';
import TaskComponent from '@/components/TasksList/Tasks/Task/TaskComponent';

const DayTasks = ({ tasksFiltered }: { tasksFiltered: TaskGroup }) => {
  const router = useRouter();
  const { tasks } = useSelector(selectTasks);
  const { labels } = useSelector(selectLabels);
  const { date } = router.query;

  const getPrecentage = () => {
    const tasksAndSubtasks = { ...tasksFiltered };
    for (let task in tasksFiltered) {
      const subtasks: TasksGroup = filterSubtasks(tasks, task);
      for (let subtask in subtasks) {
        tasksAndSubtasks[subtask] = subtasks[subtask];
      }
    }
    const tasksCompleted = filterTasksDone(tasksAndSubtasks);
    let tasksCompletedL = Object.keys(tasksCompleted).length;
    let tasksL = Object.keys(tasksAndSubtasks).length;
    const percentageDone = Math.round((tasksCompletedL / tasksL) * 100);
    return percentageDone;
  };

  const percentageDone = getPrecentage();

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
    // Working_on on top
    const sortedTasksNoTime = Object.values(arrayNoTime)
      .sort(
        (a, b) => Number(b.working_on || false) - Number(a.working_on || false)
      )
      .sort((a, b) => Number(a.done || false) - Number(b.done || false));
    setArrayOfTasksWithTime(arrayWithTime);
    setArrayOfTasksNoTime(sortedTasksNoTime);
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
        <Progressbar
          bgcolor='#99ccff'
          progress={percentageDone || 0}
          height={10}
        />
        {arrayOfTasksWithTime?.map((task) => (
          <Link
            href={`/app/tracker/${date}/task/${task.task_id}`}
            key={task.task_id}
          >
            <TaskComponent
              taskID={task.task_id}
              task={task}
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
