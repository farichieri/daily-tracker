const Tracker = ({
  week,
  handleSelectDay,
  daySelected,
  today,
  handleDatesSelected,
}: {
  week: any;
  handleSelectDay: any;
  daySelected: any;
  today: string;
  handleDatesSelected: any;
}) => {
  return (
    <div>
      <button onClick={handleDatesSelected} id={'prev'}>{`<`}</button>
      <button onClick={handleDatesSelected} id={'next'}>{`>`}</button>
      {week.map((day: any) => (
        <button
          className={`${day.date === daySelected ? 'selected' : ''} ${
            day.date === today ? 'today' : ''
          }`}
          key={day.date}
          onClick={handleSelectDay}
          id={day.date}
        >
          <span className='weekday'>{day.weekDay}</span>
          <span className='date'>{day.date}</span>
        </button>
      ))}
      <style jsx>{`
        div {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: auto;
          justify-content: center;
        }
        button {
          border: 1px solid gray;
          border-radius: 1rem;
          padding: 0.1rem 1rem;
          cursor: pointer;
          background: transparent;
          color: var(--text-color);
          transition: 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 7rem;
          line-height: 1.3;
        }
        .weekday {
          font-size: 1rem;
        }
        .selected {
          background: var(--bg-color-tertiary);
        }
        span {
          pointer-events: none;
        }
        span.date {
          font-size: 0.6rem;
        }
        button:hover {
          background: var(--bg-color-tertiary);
        }
        .today {
        }
      `}</style>
    </div>
  );
};

export default Tracker;
