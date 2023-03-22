import { filterObjectIncludes } from '@/hooks/helpers';
import { selectLabels } from 'store/slices/labelsSlice';
import { selectTasks, setUpdateTask } from 'store/slices/tasksSlice';
import { Task, TaskGroup, TasksArray } from '@/global/types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import LabelsLayout from '@/components/Layout/LabelsLayout';
import Modal from '@/components/Modal/Modal';
import TaskComponent from '@/components/TasksList/Tasks/Task/TaskComponent';
import Link from 'next/link';
import { selectUser } from 'store/slices/authSlice';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase.config';

const LabelID = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const linkID = `/app/labels`;
  const { tasks } = useSelector(selectTasks);
  const { user } = useSelector(selectUser);
  const { labelID } = router.query;
  const { labels } = useSelector(selectLabels);
  const tasksFiltered: TaskGroup = filterObjectIncludes(
    tasks,
    'labels',
    String(labelID)
  );
  const [tasksState, setTasksState] = useState<TaskGroup>(tasksFiltered);

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
      a.date_set.date_iso?.localeCompare(b.date_set.date_iso)
    );
    const arrayWithTime = sortedArray.filter((task) => task.date_set.time_from);
    const arrayNoTime = sortedArray.filter((task) => !task.date_set.time_from);
    setArrayOfTasksWithTime(arrayWithTime);
    setArrayOfTasksNoTime(arrayNoTime);
    setTasksState(tasksFiltered);
  }, [tasks]);

  const closeModalOnClick = () => {
    router.push('/app/labels');
  };

  const getLabelsByTask = (taskID: string) => {
    const task = { ...tasks[String(taskID)] };
    const labelsSelected = task.labels;
    const labelsFiltered = labelsSelected?.map((label) => labels[label]);
    return labelsFiltered;
  };

  return (
    <LabelsLayout>
      <Modal closeModalOnClick={closeModalOnClick} onCloseRedirect={linkID}>
        <div className='tasks'>
          {arrayOfTasksWithTime?.map((task) => (
            <Link
              href={`/app/labels/${labelID}/task/${task.task_id}`}
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
                href={`/app/labels/${labelID}/task/${task.task_id}`}
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
      </Modal>
      <style jsx>{`
        .tasks {
          padding: 2rem 1.5rem;
          width: 95vw;
          height: 90vh;
          max-width: var(--max-width-task);
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          color: var(--text-secondary-color);
          overflow: auto;
          pointer-events: initial;
        }
        .tasks-no-time {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 1rem;
        }
      `}</style>
    </LabelsLayout>
  );
};

export default LabelID;
