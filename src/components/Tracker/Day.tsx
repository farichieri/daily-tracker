import { types } from '@/utils/types';

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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks ? (
            tasks.map((task: any, i: number) => (
              <tr key={i} className='task-container'>
                <Task
                  value={task}
                  handleChange={(e: string) => handleChange(e, types.tasks)}
                  handleToggleDone={(e: string) =>
                    handleToggleDone(e, types.tasks)
                  }
                  id={i}
                  addTask={false}
                />
                <td>
                  <button onClick={(e) => handleRemove(e, types.tasks)}>
                    x
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Empty</td>
            </tr>
          )}
          {/* <form onSubmit={(e) => handleAdd(e, types.tasks)}> */}
          <tr>
            <Task
              handleChange={(e: string) => handleChange(e, types.tasks)}
              handleToggleDone={(e: string) => handleToggleDone(e, types.tasks)}
              value={task}
              id={null}
              addTask={true}
            />
            <td>
              <button onClick={(e) => handleAdd(e, types.tasks)}>+</button>
            </td>
          </tr>
          {/* </form> */}
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
          padding: 0.5rem 0;
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
        {addTask ? (
          '-'
        ) : (
          <input
            placeholder='done'
            disabled
            value={value.done ? 'done' : 'incompleted'}
            name='done'
            id={id}
          />
        )}
      </td>
      <td>
        {addTask ? (
          '-'
        ) : (
          <button onClick={handleToggleDone} id={id}>
            {value.done ? 'Not Done' : 'Done'}
          </button>
        )}
      </td>
      <style jsx>{`
        input {
          width: 100%;
          background: none;
          color: var(--text-color);
          border: none;
          border-bottom: 1px solid var(--box-shadow);
          outline: none;
          padding: 0.5rem 0.3rem 0 0.5rem;
          display: flex;
        }
      `}</style>
    </>
  );
};
