import IconButton from '@/components/Layout/Icon/IconButton';
import { Task } from '@/global/types';

const DayTask = ({
  handleChange,
  handleToggleDone,
  task,
  taskID,
  addTask,
  handleRemove,
  handleAdd,
  handleSave,
}: {
  handleChange: any;
  handleToggleDone: any;
  task: Task;
  taskID: any;
  addTask: boolean;
  handleRemove: any;
  handleAdd: any;
  handleSave: any;
}) => {
  return (
    <div className={`container ${task.done ? 'done' : ''}`}>
      <div className='column hour'>
        <input
          placeholder='Hour'
          onChange={handleChange}
          value={task.date_set}
          name='date_set'
          id={taskID}
          spellCheck='false'
          autoComplete='off'
          onBlur={() => handleSave(task)}
        />
      </div>
      <div className='column task-description'>
        <input
          placeholder='Task'
          onChange={handleChange}
          value={task.content}
          name='content'
          id={taskID}
          spellCheck='false'
          autoComplete='off'
          onBlur={() => handleSave(task)}
        />
        {!addTask && (
          <input
            placeholder={addTask ? 'Description' : ''}
            onChange={handleChange}
            value={task.description}
            name='description'
            id={taskID}
            spellCheck='false'
            autoComplete='off'
            className='description'
            onBlur={() => handleSave(task)}
          />
        )}
      </div>
      <div className='column action'>
        {addTask ? (
          <div style={{ paddingRight: '.5rem' }}>
            <IconButton
              props={null}
              onClick={handleAdd}
              src={'/icons/add.png'}
              alt='Add-Icon'
              width={24}
              height={24}
            />
          </div>
        ) : (
          <IconButton
            onClick={handleToggleDone}
            props={{ id: taskID }}
            src={task.done ? '/icons/checkbox-done.png' : '/icons/checkbox.png'}
            alt={task.done ? 'Done-Icon' : 'Checkbox-Icon'}
            width={24}
            height={24}
          />
        )}
      </div>
      {!addTask && (
        <div className='column action'>
          <div style={{ paddingRight: '.5rem' }}>
            <IconButton
              props={{ id: taskID }}
              onClick={handleRemove}
              src={'/icons/delete.png'}
              alt='Delete-Icon'
              width={24}
              height={24}
            />
          </div>
        </div>
      )}
      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          border-radius: 5px;
          padding: 0.25rem 0.25 0.25rem 0.25rem;
        }
        div {
          width: 100%;
        }
        input,
        textarea {
          background: none;
          color: var(--text-color);
          border: none;
          outline: none;
          padding: 0.25rem 0.3rem 0.25rem 0.5rem;
        }
        textarea {
          width: 100%;
          resize: none;
          overflow: hidden;
        }
        .column {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
        }
        .hour {
          width: fit-content;
          word-break: break-all;
          font-size: 80%;
          border-right: 3px solid var(--box-shadow);
          margin: 0.5rem 0;
          max-width: 7rem;
        }
        .action {
          width: 2.5rem;
        }
        .description {
          font-size: 80%;
          color: var(--text-secondary-color);
        }
        .container.done .hour {
          border-right: 3px solid #02c3026b;
        }
        @media screen and (max-width: 500px) {
          .hour {
            max-width: 5.5rem;
          }
        }
        @media screen and (max-width: 300px) {
          .hour {
            max-width: 4.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default DayTask;
