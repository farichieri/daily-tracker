import { Task, TaskGroup } from '@/global/types';
import { db } from '@/utils/firebase.config';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import {
  selectDayData,
  setDeleteDayTask,
  setUpdateDayTask,
} from 'store/slices/trackerSlice';
import AddDayTask from './AddDayTask';
import DayTask from './DayTask';

const DayTasks = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { date } = router.query;
  const { day_tasks } = useSelector(selectDayData);
  const [tasksState, setTasksState] = useState<TaskGroup>(day_tasks);
  const { user } = useSelector(selectUser);

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
    if (!user) return;
    const id: string = (event.target as HTMLButtonElement).id;
    const newTasks: any = { ...tasksState };
    const taskDeleted = newTasks[id];
    delete newTasks[id];
    setTasksState({
      ...newTasks,
    });
    const docRef = doc(
      db,
      'users',
      user.uid,
      'tracker',
      String(date),
      'tasks',
      taskDeleted.task_id
    );
    await deleteDoc(docRef);
    dispatch(setDeleteDayTask(taskDeleted.task_id));
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
    if (JSON.stringify(task) !== JSON.stringify(day_tasks[task.task_id])) {
      if (!user) return;
      console.log('Saving DayTask');
      const docRef = doc(
        db,
        'users',
        user.uid,
        'tracker',
        String(date),
        'tasks',
        task.task_id
      );
      await setDoc(docRef, task);
      dispatch(setUpdateDayTask(task));
    }
  };

  useEffect(() => {
    setTasksState(day_tasks);
  }, [day_tasks]);

  return (
    <section className='table'>
      {Object.keys(tasksState) ? (
        Object.keys(tasksState).map((taskID: string) => (
          <div
            key={taskID}
            className={`task-container ${
              tasksState[taskID].done ? 'done' : ''
            }`}
          >
            <DayTask
              handleSave={handleSave}
              handleAdd={null}
              handleRemove={handleRemove}
              task={tasksState[taskID]}
              handleChange={handleChange}
              handleToggleDone={handleToggleDone}
              taskID={taskID}
              addTask={false}
            />
          </div>
        ))
      ) : (
        <div>Empty</div>
      )}
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
