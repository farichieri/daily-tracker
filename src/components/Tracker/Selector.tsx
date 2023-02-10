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
          className={day.id === daySelected.id ? 'selected' : ''}
          key={day.number}
          onClick={handleSelectDay}
          id={day.id}
        >
          <>
            <span>{day.weekday}</span>
            <span className='number'>{day.number}</span>
          </>
        </button>
      ))}
      <style jsx>{`
        div {
          display: flex;
          gap: 0.5rem;
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
          display: content;
        }
        span.number {
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
