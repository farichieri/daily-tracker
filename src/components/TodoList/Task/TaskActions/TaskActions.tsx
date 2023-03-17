import { useState } from 'react';
import AssignLabel from './TaskActionsModals/AssignLabel';
import AssignReminder from './TaskActionsModals/AssignReminder';

const TaskActions = () => {
  const [openAssignLabel, setOpenAssignLabel] = useState(false);
  const [openAssignReminder, setOpenAssignReminder] = useState(false);

  const closeModalOnClick = () => {
    setOpenAssignLabel(false);
    setOpenAssignReminder(false);
  };

  return (
    <div className='task-actions'>
      {openAssignLabel && <AssignLabel closeModalOnClick={closeModalOnClick} />}
      {openAssignReminder && (
        <AssignReminder closeModalOnClick={closeModalOnClick} />
      )}
      <button onClick={() => setOpenAssignLabel(true)}>Label</button>
      <button onClick={() => setOpenAssignReminder(true)}>Reminder</button>
      <style jsx>{`
        .task-actions {
          border: 1px solid red;
          padding: 0.5rem 1rem;
          margin-top: 1rem;
          border-radius: 6px;
          width: 100%;
          display: flex;
          gap: 1rem;
        }
        button {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default TaskActions;
