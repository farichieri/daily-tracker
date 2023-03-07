import { types } from '@/utils/types';
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
    <section>
      <p>Daily Tasks</p>
      <table>
        <thead>
          <tr>
            <th>hour</th>
            <th>task</th>
            <th>comments</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks ? (
            tasks.map((task: any, i: number) => (
              <tr
                key={i}
                className={`task-container ${task.done ? 'done' : ''}`}
              >
                <Task
                  value={task}
                  handleChange={(e: string) => handleChange(e, types.tasks)}
                  handleToggleDone={(e: string) =>
                    handleToggleDone(e, types.tasks)
                  }
                  id={i}
                  addTask={false}
                />
                <td style={{ paddingRight: '.5rem' }}>
                  <IconButton
                    props={{ value: i }}
                    onClick={(e) => handleRemove(e, types.tasks)}
                    src={'/icons/delete.png'}
                    alt='Delete-Icon'
                    width={24}
                    height={24}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Empty</td>
            </tr>
          )}
          <tr>
            <Task
              handleChange={(e: string) => handleChange(e, types.tasks)}
              handleToggleDone={(e: string) => handleToggleDone(e, types.tasks)}
              value={task}
              id={null}
              addTask={true}
            />
            <td style={{ paddingRight: '.5rem' }}>
              <IconButton
                props={null}
                onClick={(e) => handleAdd(e, types.tasks)}
                src={'/icons/add.png'}
                alt='Add-Icon'
                width={24}
                height={24}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <style jsx>{`
        section {
          border-radius: 6px;
          width: 100%;
          -webkit-box-shadow: 0 8px 16px 0 var(--box-shadow-light);
          box-shadow: 0 8px 16px 0 var(--box-shadow-light);
          overflow: auto;
        }
        p {
          margin: 0;
          padding: 0.25rem;
          background: var(--bg-color-secondary);
          font-size: 1rem;
          font-weight: bold;
        }
        table {
          gap: 0.5rem;
          width: 100%;
          height: 100%;
          width: 100%;
          flex-direction: column;
          overflow: hidden;
          border-collapse: collapse;
          background: var(--bg-color-secondary);
        }
        thead {
          background: var(--bg-color-tertiary);
        }
        td,
        th {
          padding: 0.5rem 0;
        }
        .task-container {
          border-bottom: 1px solid var(--box-shadow-light);
        }
        .task-container.done {
          background: #02c3026b;
        }
        .task-container:hover {
          box-shadow: inset 1px 0 0 rgb(255 255 255 / 20%),
            inset -1px 0 0 rgb(255 255 255 / 20%),
            0 0 4px 0 rgb(95 99 104 / 60%), 0 0 6px 2px rgb(95 99 104 / 60%);
        }
        tr th {
          width: 25%;
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
}: {
  handleChange: any;
  handleToggleDone: any;
  value: any;
  id: any;
  addTask: boolean;
}) => {
  return (
    <>
      <td>
        <input
          placeholder='hour'
          onChange={handleChange}
          value={value.hour}
          name='hour'
          id={id}
          spellCheck='false'
          autoComplete='off'
        />
      </td>
      <td>
        <input
          placeholder='task'
          onChange={handleChange}
          value={value.task}
          name='task'
          id={id}
          spellCheck='false'
          autoComplete='off'
        />
      </td>
      <td>
        {addTask ? (
          '-'
        ) : (
          <input
            placeholder='comments'
            onChange={handleChange}
            value={value.comments}
            name='comments'
            id={id}
            spellCheck='false'
            autoComplete='off'
          />
        )}
      </td>
      <td>
        {addTask ? (
          '-'
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
      </td>
      <style jsx>{`
        input {
          width: 100%;
          background: none;
          color: var(--text-color);
          border: none;
          outline: none;
          padding: 0.5rem 0.3rem 0 0.5rem;
          display: flex;
        }
        input.done {
        }
        td {
        }
      `}</style>
    </>
  );
};
