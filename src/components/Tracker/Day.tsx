import { types } from '@/utils/types';
import { SyntheticEvent, useRef } from 'react';
import IconButton from '../Layout/Icon/IconButton';

const Tracker = ({
  handleChange,
  handleAdd,
  handleRemove,
  handleToggleDone,
  task,
  tasks,
}: {
  handleChange: any;
  handleAdd: any;
  handleRemove: any;
  handleToggleDone: any;
  task: object;
  tasks: object[];
}) => {
  return (
    <section className='table'>
      {tasks ? (
        tasks.map((task: any, i: number) => (
          <div key={i} className={`task-container ${task.done ? 'done' : ''}`}>
            <Task
              handleAdd={null}
              handleRemove={(e: string) => handleRemove(e, types.tasks)}
              value={task}
              handleChange={(e: string) => handleChange(e, types.tasks)}
              handleToggleDone={(e: string) => handleToggleDone(e, types.tasks)}
              id={i}
              addTask={false}
            />
          </div>
        ))
      ) : (
        <div>Empty</div>
      )}
      <div className='add-task'>
        <Task
          handleAdd={(e: any) => handleAdd(e, types.tasks)}
          handleRemove={(e: string) => handleRemove(e, types.tasks)}
          handleChange={(e: string) => handleChange(e, types.tasks)}
          handleToggleDone={(e: string) => handleToggleDone(e, types.tasks)}
          value={task}
          id={null}
          addTask={true}
        />
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

export default Tracker;

const Task = ({
  handleChange,
  handleToggleDone,
  value,
  id,
  addTask,
  handleRemove,
  handleAdd,
}: {
  handleChange: any;
  handleToggleDone: any;
  value: any;
  id: any;
  addTask: boolean;
  handleRemove: any;
  handleAdd: any;
}) => {
  return (
    <div className={`container ${value.done ? 'done' : ''}`}>
      <div className='column hour'>
        <input
          placeholder='Hour'
          onChange={handleChange}
          value={value.hour}
          name='hour'
          id={id}
          spellCheck='false'
          autoComplete='off'
        />
      </div>
      <div className='column task-description'>
        <input
          placeholder='Task'
          onChange={handleChange}
          value={value.task}
          name='task'
          id={id}
          spellCheck='false'
          autoComplete='off'
        />
        <input
          placeholder={addTask ? 'Description' : ''}
          onChange={handleChange}
          value={value.comments}
          name='comments'
          id={id}
          spellCheck='false'
          autoComplete='off'
          className='description'
        />
      </div>
      <div className='column action'>
        {addTask ? (
          <td style={{ paddingRight: '.5rem' }}>
            <IconButton
              props={null}
              onClick={handleAdd}
              src={'/icons/add.png'}
              alt='Add-Icon'
              width={24}
              height={24}
            />
          </td>
        ) : (
          <IconButton
            onClick={handleToggleDone}
            props={{ id: id }}
            src={
              value.done ? '/icons/checkbox-done.png' : '/icons/checkbox.png'
            }
            alt={value.done ? 'Done-Icon' : 'Checkbox-Icon'}
            width={24}
            height={24}
          />
        )}
      </div>
      {!addTask && (
        <div className='column action'>
          <div style={{ paddingRight: '.5rem' }}>
            <IconButton
              props={{ value: id }}
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
        .task-description {
        }
        .action {
          width: 2.5rem;
        }
        .description {
          font-size: 80%;
          color: lightgray;
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
