import IconButton from '@/components/Layout/Icon/IconButton';
import { Label, Task, TaskGroup } from '@/global/types';
import { formatTime } from '@/utils/formatDate';

const Task = ({
  taskID,
  task,
  handleToggleDone,
  getLabelsByTask,
}: {
  taskID: string;
  task: Task;
  handleToggleDone: any;
  getLabelsByTask: Function;
}) => {
  return (
    <div className={`task-container ${task.done ? 'done' : ''}`}>
      <div className='task' id={taskID}>
        <div className='times'>
          {task.date_set.time_from && (
            <div className='time_from'>{task.date_set.time_from}</div>
          )}
          {task.date_set.time_to && (
            <>
              -<div className='time_to'>{task.date_set.time_to}</div>
            </>
          )}
        </div>
        <div className='name-labels'>
          <div className={`name ${task.done ? 'done' : ''}`}>
            {task.content}
          </div>
          <div className='labels'>
            {getLabelsByTask(taskID)?.map(
              (label: Label) =>
                label && (
                  <div
                    key={label.label_id}
                    className='label'
                    style={{ background: `${label.label_color}` }}
                  ></div>
                )
            )}
          </div>
        </div>
        <div className='checkbox'>
          <IconButton
            onClick={handleToggleDone}
            props={{ id: taskID }}
            src={task.done ? '/icons/checkbox-done.png' : '/icons/checkbox.png'}
            alt={task.done ? 'Done-Icon' : 'Checkbox-Icon'}
            width={24}
            height={24}
          />
        </div>
        {/* {task.done && (
          <div className='delete'>
            <IconButton
              props={{ id: taskID }}
              onClick={handleDelete}
              src={'/icons/delete.png'}
              alt='Delete-Icon'
              width={24}
              height={24}
            />
          </div>
        )} */}
      </div>
      <style jsx>{`
        .task-container {
          border: 1px solid var(--box-shadow-light);
          border-radius: 10px;
          width: 100%;
          padding: 0.5rem;
          align-items: center;
          gap: 0.5rem;
          justify-content: space-between;
          min-height: 2.5rem;
          cursor: pointer;
          transition: 0.3s;
          color: var(--text-color);
        }
        .task-container.done {
          background: var(--done);
        }
        .task-container:hover {
          box-shadow: inset 1px 0 0 rgb(255 255 255 / 1%),
            inset -1px 0 0 rgb(255 255 255 / 1%), 0 0 4px 0 rgb(95 99 104 / 25%),
            0 0 6px 2px rgb(95 99 104 / 25%);
          background: var(--cool);
        }
        .task-container.done:hover {
          background: var(--done);
        }
        .task {
          width: 100%;
          display: flex;
          pointer-events: none;
          gap: 0.5rem;
          align-items: center;
        }
        .name {
          width: 100%;
          text-align: left;
          text-decoration: initial;
        }
        .name.done {
          text-decoration: line-through;
          color: var(--box-shadow);
        }
        .checkbox,
        .delete {
          pointer-events: initial;
        }
        .name-labels {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .labels {
          display: flex;
          gap: 0.2rem;
          align-items: center;
        }
        .times {
          display: flex;
          align-items: center;
          gap: 0.2rem;
        }
        .time_from,
        .time_to {
          border: 1px solid var(--box-shadow-light);
          display: flex;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          font-size: 80%;
          opacity: 0.6;
        }
        .label {
          width: 1rem;
          height: 0.2rem;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default Task;
