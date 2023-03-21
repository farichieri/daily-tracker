import AddTask from '@/components/TasksList/Tasks/AddTask';
import TaskComponent from '@/components/TasksList/Tasks/Task/TaskComponent';
import { TasksArray, TaskGroup, Task } from '@/global/types';
import { db } from '@/utils/firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import { selectLabels } from 'store/slices/labelsSlice';
import { selectTasks, setUpdateTask } from 'store/slices/tasksSlice';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
    console.log({ taskSelected });
    taskSelected.done = !newTasks[id].done;
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

  const [sortedArrayOfTasks, setSortedArrayOfTasks] = useState<TasksArray>([]);

  useEffect(() => {
    const sortedArray = Object.values(tasksFiltered).sort((a, b) =>
      a.date_set.time_from?.localeCompare(b.date_set.time_from)
    );
    setSortedArrayOfTasks(sortedArray);
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
        {sortedArrayOfTasks?.map((task) => (
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
          gap: 0.25rem;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </section>
  );
};

export default DayTasks;
