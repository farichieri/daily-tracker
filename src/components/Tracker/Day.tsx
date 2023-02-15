const Tracker = ({ day }: { day: any }) => {
  return (
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
        {day.data.map((task: any, index: number) => (
          <tr key={index} className='task-container'>
            <td>{task.hour}</td>
            <td>{task.task}</td>
            <td>{task.done ? 'done' : 'incompleted'}</td>
            <td>{task.done ? ':)' : ':('}</td>
          </tr>
        ))}
      </tbody>
      <style jsx>{`
        table tr:last-child td:first-child {
          border-bottom-left-radius: 20px;
        }

        table tr:last-child td:last-child {
          border-bottom-right-radius: 20px;
        }

        table {
          gap: 0.5rem;
          margin: 1rem 0;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          border: 1px solid gray;
          width: 100%;
          flex-direction: column;
        }
        td,
        th {
          padding: 1rem;
        }
        .task-container:hover {
          background: gray;
        }
      `}</style>
    </table>
  );
};

export default Tracker;
