const Tracker = ({ day }: { day: any }) => {
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
          {day ? (
            day.data.map((task: any, index: number) => (
              <tr key={index} className='task-container'>
                <td>{task.hour}</td>
                <td>{task.task}</td>
                <td>{task.done ? 'done' : 'incompleted'}</td>
                <td>{task.done ? ':)' : ':('}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Empty</td>
            </tr>
          )}
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
