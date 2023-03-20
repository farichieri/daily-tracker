import IconButton from '@/components/Layout/Icon/IconButton';
import { Label, Task, TaskGroup } from '@/global/types';

const Task = ({
  taskID,
  task,
  handleToggleDone,
  getLabelsByTask,
  handleDelete,
}: {
  taskID: string;
  task: Task;
  handleToggleDone: any;
  getLabelsByTask: Function;
  handleDelete: any;
}) => {
  return (
    <div className={`task-container ${task.done ? 'done' : ''}`}>
      <div className='task' id={taskID}>
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
        <div className='name-labels'>
          <div className={`name ${task.done ? 'done' : ''}`}>
            {task.content}
          </div>
          <div className='labels'>
            {getLabelsByTask(taskID)?.map((label: Label) => (
              <div
                key={label.label_id}
                className='label'
                style={{ background: `${label.label_color}` }}
              ></div>
            ))}
          </div>
        </div>
        {task.done && (
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
        )}
      </div>
      <style jsx>{`
        .task-container {
          border: 1px solid gray;
          border-radius: 6px;
          width: 100%;
          padding: 0.5rem 1rem;
          align-items: center;
          gap: 0.5rem;
          justify-content: space-between;
          min-height: 2.5rem;
          cursor: pointer;
          transition: 0.3s;
          color: var(--text-color);
        }
        .task-container.done {
          background: #023902;
        }
        .task-container:hover {
          background: var(--cool);
        }
        .task-container.done:hover {
          background: #023902;
        }
        .task {
          width: 100%;
          display: flex;
          pointer-events: none;
          gap: 0.5rem;
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
