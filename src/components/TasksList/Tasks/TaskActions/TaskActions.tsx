import { Label } from '@/global/types';
import { selectLabels } from 'store/slices/labelsSlice';
import { selectTasks } from 'store/slices/tasksSlice';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import AssignLabel from './TaskActionsModals/AssignLabel';
import AssignList from './TaskActionsModals/AssignList';
import AssignReminder from './TaskActionsModals/AssignReminder';
import LabelsButton from '@/components/TasksList/Tasks/TaskActions/TaskActionsButtons/LabelsButton';
import ListButton from './TaskActionsButtons/ListButton';
import ReminderButton from '@/components/TasksList/Tasks/TaskActions/TaskActionsButtons/ReminderButton';
import ToggleDoneTask from './TaskActionsButtons/ToggleDoneTask';
import WorkingOnButton from './TaskActionsButtons/WorkingOnButton';

const TaskActions = () => {
  const router = useRouter();
  const [openAssignLabel, setOpenAssignLabel] = useState(false);
  const [openAssignReminder, setOpenAssignReminder] = useState(false);
  const [openAssignList, setOpenAssignList] = useState(false);
  const { tasks } = useSelector(selectTasks);
  const { taskID } = router.query;
  const task = { ...tasks[String(taskID)] };
  const labelsSelected = task?.labels;
  const { labels } = useSelector(selectLabels);
  const [labelsInTask, setLabelsInTask] = useState<Label[]>([]);

  useEffect(() => {
    const labelsFiltered = labelsSelected?.map((label) => labels[label]);
    setLabelsInTask(labelsFiltered);
  }, [labelsSelected]);

  const closeModalOnClick = () => {
    setOpenAssignLabel(false);
    setOpenAssignReminder(false);
    setOpenAssignList(false);
  };

  return (
    <div className='container'>
      <div className='task-actions'>
        {openAssignLabel && (
          <AssignLabel
            closeModalOnClick={closeModalOnClick}
            isNewTask={false}
            task={task}
            handleChangeLabels={() => null}
          />
        )}
        {openAssignList && (
          <AssignList
            closeModalOnClick={closeModalOnClick}
            isNewTask={false}
            task={task}
            handleChangeList={() => null}
          />
        )}
        {openAssignReminder && (
          <AssignReminder closeModalOnClick={closeModalOnClick} />
        )}
        <div className='labels'>
          <LabelsButton onClick={() => setOpenAssignLabel(true)} />
        </div>
        <div className='reminder'>
          <ReminderButton onClick={() => setOpenAssignReminder(true)} />
        </div>
        <div className='lists'>
          <ListButton onClick={() => setOpenAssignList(true)} task={task} />
        </div>
        {!task.done && (
          <div className='working-on'>
            <WorkingOnButton task={task} />
          </div>
        )}
        <ToggleDoneTask task={task} />
      </div>
      <div className='task-actions-show'>
        {labelsInTask.map(
          (label) =>
            label && (
              <span
                className='label'
                key={label.label_id}
                style={{ background: `${label.label_color}` }}
                onClick={() => setOpenAssignLabel(true)}
              >
                {label.label_name}
              </span>
            )
        )}
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
          align-items: center;
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
