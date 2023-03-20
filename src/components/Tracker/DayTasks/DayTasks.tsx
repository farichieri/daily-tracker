import AddTask from '@/components/TasksList/Tasks/AddTask';
import TaskComponent from '@/components/TasksList/Tasks/Task/TaskComponent';
import { TasksArray, TaskGroup, Task } from '@/global/types';
import { db } from '@/utils/firebase.config';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import { selectLabels } from 'store/slices/labelsSlice';
import {
  selectTasks,
  setDeleteTask,
  setUpdateTask,
} from 'store/slices/tasksSlice';
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

  const handleDelete = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (!user) return;
    const id: string = (event.target as HTMLButtonElement).id;
    const newTasks: any = { ...tasksState };
    const taskDeleted = newTasks[id];
    delete newTasks[id];
    setTasksState({
      ...newTasks,
    });
    const docRef = doc(db, 'users', user.uid, 'tasks', taskDeleted.task_id);
    dispatch(setDeleteTask(taskDeleted.task_id));
    await deleteDoc(docRef);
  };

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
      a.time_from.localeCompare(b.time_from)
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
      {sortedArrayOfTasks?.map((task) => (
        <Link
          href={`/app/tracker/${date}/task/${task.task_id}`}
          key={task.task_id}
        >
          <TaskComponent
            handleDelete={handleDelete}
            taskID={task.task_id}
            task={task}
            handleToggleDone={handleToggleDone}
            getLabelsByTask={getLabelsByTask}
          />
        </Link>
      ))}
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
          gap: 0.25rem;
        }
        .task-container {
          border-bottom: 1px solid var(--box-shadow-light);
          display: flex;
          background: var(--box-shadow-light);
          border-radius: 6px;
          overflow: auto;
        }
        .add-task {
          -webkit-box-shadow: 0 8px 16px 0 var(--box-shadow-light);
          box-shadow: 0 8px 16px 0 var(--box-shadow-light);
          border-bottom: 1px solid var(--box-shadow-light);
          display: flex;
          border-radius: 6px;
          overflow: auto;
        }
        .task-container.done {
          background: #073b0761;
        }

        .task-container:hover {
          box-shadow: inset 1px 0 0 rgb(255 255 255 / 1%),
            inset -1px 0 0 rgb(255 255 255 / 1%), 0 0 4px 0 rgb(95 99 104 / 25%),
            0 0 6px 2px rgb(95 99 104 / 25%);
        }
      `}</style>
    </section>
  );
};

export default DayTasks;
