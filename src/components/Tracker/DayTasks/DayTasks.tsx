import { TasksArray, Task, TaskGroup } from '@/global/types';
import { db } from '@/utils/firebase.config';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import { setDeleteTask, setUpdateTask } from 'store/slices/tasksSlice';
import AddDayTask from './AddDayTask';
import DayTask from './DayTask';

const DayTasks = ({ tasksFiltered }: { tasksFiltered: TaskGroup }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const [tasksState, setTasksState] = useState<TaskGroup>(tasksFiltered);

  const handleChange = (event: React.ChangeEvent) => {
    event.preventDefault();
    const value: string = (event.target as HTMLButtonElement).value;
    const name: string = (event.target as HTMLButtonElement).name;
    const id: string = (event.target as HTMLButtonElement).id;
    const taskSelected: Task = { ...tasksState[id] };
    taskSelected[name] = value;
    setTasksState({
      ...tasksState,
      [id]: taskSelected,
    });
  };

  const handleRemove = async (event: React.MouseEvent) => {
    event.preventDefault();
    console.log(event.target);
    if (!user) return;
    const id: string = (event.target as HTMLButtonElement).id;
    const newTasks: any = { ...tasksState };
    const taskDeleted = newTasks[id];
    delete newTasks[id];
    setTasksState({
      ...newTasks,
    });
    const docRef = doc(db, 'users', user.uid, 'tasks', taskDeleted.task_id);
    await deleteDoc(docRef);
    dispatch(setDeleteTask(taskDeleted.task_id));
  };

  const handleToggleDone = (event: React.MouseEvent) => {
    event.preventDefault();
    const id: string = (event.target as HTMLButtonElement).id;
    const newTasks = { ...tasksState };
    const taskSelected: Task = { ...tasksState[id] };
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
      await setDoc(docRef, task);
      dispatch(setUpdateTask(task));
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

  return (
    <section className='table'>
      {sortedArrayOfTasks?.map((task) => (
        <div
          key={task.task_id}
          className={`task-container ${task.done ? 'done' : ''}`}
        >
          <DayTask
            handleSave={handleSave}
            handleRemove={handleRemove}
            task={task}
            handleChange={handleChange}
            handleToggleDone={handleToggleDone}
            taskID={task.task_id}
            addTask={false}
          />
        </div>
      ))}
      <div className='add-task'>
        <AddDayTask />
      </div>
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
