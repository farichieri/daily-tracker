import { types } from '@/utils/types';

const Tracker = ({
  handleChange,
  handleAdd,
  handleRemove,
  task,
  tasks,
}: {
  handleChange: any;
  handleAdd: any;
  handleRemove: any;
  task: string;
  tasks: string[];
}) => {
  // {
  //   id: 1,
  //   weekday: 'monday',
  //   date: '2/19/2023',
  //   data: [
  //     { task: 'task1', hour: '05:00', done: false },
  //     { task: 'task2', hour: '05:00', done: false },
  //     { task: 'task3', hour: '05:00', done: false },
  //     { task: 'task4', hour: '05:00', done: false },
  //     { task: 'task5', hour: '05:00', done: false },
  //   ],
  //   done: false,
  //   user: 'frichieri.dev@gmail.com',
  // },
  return (
    <section>
      <p>Daily Tasks</p>
      <table>
        <thead>
          <tr>
            <th>hour</th>
            <th>task</th>
            <th>state</th>
            <th>done</th>
          </tr>
        </thead>
        <tbody>
          {tasks ? (
            tasks.map((task: any, i: number) => (
              <tr key={i} className='task-container'>
                <Task value={task} handleChange={handleChange} id={i} />
              </tr>
            ))
          ) : (
            <tr>
              <td>Empty</td>
            </tr>
          )}
          <form onSubmit={(e) => handleAdd(e, types.tasks)}>
            <tr>
              <Task
                handleChange={(e: string) => handleChange(e, types.tasks)}
                value={task}
                id={null}
              />
            </tr>
            <button>+</button>
          </form>
        </tbody>
      </table>
      <style jsx>{`
        section {
          border-radius: 20px;
          margin: 1rem 0;
          width: 100%;
          box-shadow: 0 0 10px 1px var(--box-shadow-light);
          overflow: auto;
        }
        p {
          padding: 0.5rem;
        }
        table {
          gap: 0.5rem;
          width: 100%;
          height: 100%;
          width: 100%;
          flex-direction: column;
          overflow: hidden;
          border-collapse: collapse;
        }
        table tr:last-child td:first-child {
          border-bottom-left-radius: 20px;
        }
        table tr:last-child td:last-child {
          border-bottom-right-radius: 20px;
        }
        thead {
          background: #363636;
        }
        td,
        th {
          padding: 1rem;
        }
        .task-container:hover {
          background: gray;
        }
      `}</style>
    </section>
  );
};

export default Tracker;

const Task = ({
  handleChange,
  value,
  id,
}: {
  handleChange: any;
  value: any;
  id: any;
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
        />
      </td>
      <td>
        <input
          placeholder='task'
          onChange={handleChange}
          value={value.task}
          name='task'
          id={id}
        />
      </td>
      <td>
        <input
          placeholder='done'
          disabled
          value={value.done ? 'done' : 'incompleted'}
          name='done'
          id={id}
        />
      </td>
      <td>
        <input
          placeholder='hour'
          onChange={handleChange}
          value={value.done ? ':)' : ':('}
          name='hour'
          id={id}
        />
      </td>
      <style jsx>{`
        input {
          width: 100%;
          background: none;
          color: var(--text-color);
          border: none;
          border-bottom: 1px solid var(--box-shadow);
          outline: none;
          padding: 0.5rem 0.3rem 0.3rem 0.5rem;
          display: flex;
        }
      `}</style>
    </>
  );
};
