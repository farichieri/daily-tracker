import FilterSelect from './FilterSelect/FilterSelect';
import { useSelector } from 'react-redux';
import { selectDaySelected } from 'store/slices/trackerSlice';

const Tracker = ({
  week,
  handleSelectDay,
  today,
  handleDatesSelected,
  options,
  handleSelectFilterOption,
  optionSelected,
}: {
  week: any;
  handleSelectDay: any;
  today: string;
  handleDatesSelected: any;
  options: any;
  handleSelectFilterOption: Function;
  optionSelected: string;
}) => {
  const daySelected = useSelector(selectDaySelected);
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
          gap: 0.5rem;
          width: 100%;
        }
        .dates-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
          grid-gap: 10px;
          width: 100%;
        }
        .date-button {
          padding: 0.1rem 0.25rem;
          cursor: pointer;
          background: transparent;
          color: var(--text-color);
          transition: 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 5rem;
          line-height: 1.3;
          margin: auto;
          border-radius: 5px;
          border: 1px solid transparent;
        }
        .weekday {
          font-size: 1rem;
        }
        .selected {
          background: var(--bg-color-tertiary-light);
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
          border: 1px solid var(--box-shadow);
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
