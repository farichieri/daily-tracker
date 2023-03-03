import FilterSelect from './FilterSelect/FilterSelect';

const Tracker = ({
  week,
  handleSelectDay,
  daySelected,
  today,
  handleDatesSelected,
  options,
  handleSelectFilterOption,
  optionSelected,
}: {
  week: any;
  handleSelectDay: any;
  daySelected: any;
  today: string;
  handleDatesSelected: any;
  options: any;
  handleSelectFilterOption: Function;
  optionSelected: string;
}) => {
  return (
    <div className='selector-container'>
      <FilterSelect
        options={options}
        handleSelectFilterOption={handleSelectFilterOption}
        optionSelected={optionSelected}
      />
      <div className='dates-and-changes'>
        <button
          onClick={handleDatesSelected}
          id={'prev'}
          className='change'
        >{`<`}</button>
        <div className='dates-container'>
          {week.map((day: any) => (
            <button
              className={`date-button ${
                day.date === daySelected ? 'selected' : ''
              } ${day.date === today ? 'today' : ''}`}
              key={day.date}
              onClick={handleSelectDay}
              id={day.date}
            >
              <span className='weekday'>{day.weekDay}</span>
              <span className='date'>{day.date}</span>
            </button>
          ))}
        </div>
        <button
          onClick={handleDatesSelected}
          id={'next'}
          className='change'
        >{`>`}</button>
      </div>
      <style jsx>{`
        .selector-container {
          display: flex;
          gap: 1rem;
          flex-direction: column;
          width: 100%;
        }
        .dates-and-changes {
          display: flex;
          gap: 1rem;
          width: 100%;
        }
        .dates-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          grid-gap: 10px;
          width: 100%;
          grid-column-gap: 1rem;
        }
        .date-button {
          border: 1px solid gray;
          border-radius: 9999px;
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
          margin: auto;
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
          box-shadow: 0 0 10px 5px var(--bg-color-tertiary);
        }
        .change {
          border-radius: 50%;
          height: 2rem;
          margin: auto;
          width: 2rem;
          min-width: 2rem;
          background: transparent;
          color: var(--text-color);
          border: 1px solid gray;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        @media screen and (min-width: 1000px) {
          .dates-container {
            grid-template-columns: repeat(7, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default Tracker;
