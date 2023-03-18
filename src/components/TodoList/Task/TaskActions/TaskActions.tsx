import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLabels } from 'store/slices/labelsSlice';
import { selectTodo } from 'store/slices/todosSlice';
import AssignLabel from './TaskActionsModals/AssignLabel';
import AssignReminder from './TaskActionsModals/AssignReminder';
import { Label } from '@/global/types';

const TaskActions = () => {
  const router = useRouter();
  const [openAssignLabel, setOpenAssignLabel] = useState(false);
  const [openAssignReminder, setOpenAssignReminder] = useState(false);
  const { tasks } = useSelector(selectTodo);
  const { taskID } = router.query;
  const task = { ...tasks[String(taskID)] };
  const labelsSelected = task.labels;
  const { labels } = useSelector(selectLabels);
  const [labelsInTask, setLabelsInTask] = useState<Label[]>([]);

  useEffect(() => {
    const labelsFiltered = labelsSelected.map((label) => labels[label]);
    setLabelsInTask(labelsFiltered);
  }, [labelsSelected]);

  const closeModalOnClick = () => {
    setOpenAssignLabel(false);
    setOpenAssignReminder(false);
  };

  return (
    <div className='container'>
      <div className='task-actions'>
        {openAssignLabel && (
          <AssignLabel closeModalOnClick={closeModalOnClick} />
        )}
        {openAssignReminder && (
          <AssignReminder closeModalOnClick={closeModalOnClick} />
        )}
        <button onClick={() => setOpenAssignLabel(true)}>Label</button>
        <button onClick={() => setOpenAssignReminder(true)}>Reminder</button>
      </div>
      <div className='task-actions-show'>
        {labelsInTask.map((label) => (
          <span
            className='label'
            key={label.label_id}
            style={{ background: `${label.label_color}` }}
            onClick={() => setOpenAssignLabel(true)}
          >
            {label.label_name}
          </span>
        ))}
      </div>
      <style jsx>{`
        .container {
          border: 1px solid var(--box-shadow-light);
          padding: 0.5rem 1rem;
          margin-top: 1rem;
          border-radius: 6px;
          width: 100%;
          display: flex;
          gap: 1rem;
          flex-direction: column;
        }
        .task-actions {
          display: flex;
          gap: 1rem;
        }
        .task-actions-show {
          display: flex;
          gap: 1rem;
        }
        .label {
          border-radius: 6px;
          padding: 0.25rem 0.5rem;
          cursor: pointer;
        }
        button {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default TaskActions;
