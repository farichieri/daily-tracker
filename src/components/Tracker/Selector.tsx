const Tracker = ({
  week,
  handleSelectDay,
  daySelected,
}: {
  week: any;
  handleSelectDay: any;
  daySelected: any;
}) => {
  return (
    <div>
      {week.map((day: any) => (
        <button
          className={day.date === daySelected ? 'selected' : ''}
          key={day.date}
          onClick={handleSelectDay}
          id={day.date}
        >
          <span>{day.weekDay}</span>
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
          border-radius: 999px;
          padding: 0.1rem 1rem;
          cursor: pointer;
          background: transparent;
          color: var(--text-color);
          transition: 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .selected {
          background: gray;
        }
        span {
          pointer-events: none;
        }
        span.date {
          font-size: 65%;
        }
        button:hover {
          background: gray;
        }
      `}</style>
    </div>
  );
};

export default Tracker;
