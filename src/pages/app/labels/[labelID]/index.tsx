import LabelsLayout from '@/components/Layout/LabelsLayout';
import Modal from '@/components/Modal/Modal';
import TaskComponent from '@/components/TasksList/Tasks/Task/TaskComponent';
import { TaskGroup, TasksArray } from '@/global/types';
import { filterObjectIncludes } from '@/hooks/helpers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLabels } from 'store/slices/labelsSlice';
import { selectTasks } from 'store/slices/tasksSlice';

const LabelID = () => {
  const router = useRouter();
  const taskIDLink = `/app/labels`;
  const { tasks } = useSelector(selectTasks);
  const { labelID } = router.query;
  const { labels } = useSelector(selectLabels);

  const tasksFiltered: TaskGroup = filterObjectIncludes(
    tasks,
    'labels',
    String(labelID)
  );

  const [sortedArrayOfTasks, setSortedArrayOfTasks] = useState<TasksArray>([]);

  useEffect(() => {
    const sortedArray = Object.values(tasksFiltered).sort((a, b) =>
      a.date_set.time_from?.localeCompare(b.date_set.time_from)
    );
    setSortedArrayOfTasks(sortedArray);
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

  const handleToggleDone = () => {};

  return (
    <LabelsLayout>
      {labelID && (
        <Modal
          onCloseRedirect={taskIDLink}
          closeModalOnClick={closeModalOnClick}
        >
          <div className='label-id'>
            {sortedArrayOfTasks.length > 0 &&
              sortedArrayOfTasks.map((task) => (
                <TaskComponent
                  key={task.task_id}
                  taskID={task.task_id}
                  task={task}
                  handleToggleDone={handleToggleDone}
                  getLabelsByTask={getLabelsByTask}
                />
              ))}
          </div>
        </Modal>
      )}
      <style jsx>{`
        .label-id {
          padding: 2rem 1.5rem;
          width: 95vw;
          height: 90vh;
          max-width: var(--max-width-task);
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          color: var(--text-secondary-color);
          overflow: auto;
          pointer-events: initial;
        }
      `}</style>
    </LabelsLayout>
  );
};

export default LabelID;
