import { useSelector } from 'react-redux';
import { selectTrackerSlice } from 'store/slices/trackerSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const DaysSelector = ({
  week,
  handleDatesSelected,
}: {
  week: any;
  handleDatesSelected: any;
}) => {
  const { today } = useSelector(selectTrackerSlice);
  const router = useRouter();
  const { date } = router.query;

  return (
    <div className='selector-container'>
      <div className='dates-and-changes'>
        <button onClick={handleDatesSelected} id={'prev'} className='change'>
          <Image
            src={'/icons/back.png'}
            alt='back-icon'
            width={12}
            height={12}
            style={{ pointerEvents: 'none' }}
          />
        </button>
        <div className='dates-container'>
          {week.map((day: any) => (
            <Link href={`/app/tracker/${day.date}`} key={day.date}>
              <div
                className={`date-button ${
                  day.date === date ? 'selected' : ''
                } ${day.date === today ? 'today' : ''}`}
              >
                <span className='weekday'>{day.weekDay}</span>
                <span className='date'>{day.numberOfMonth}</span>
              </div>
            </Link>
          ))}
        </div>
        <button onClick={handleDatesSelected} id={'next'} className='change'>
          <Image
            src={'/icons/forward.png'}
            alt='forward-icon'
            width={12}
            height={12}
            style={{ pointerEvents: 'none' }}
          />
        </button>
      </div>
      <style jsx>{`
        .selector-container {
          display: flex;
          gap: 1rem;
          flex-direction: column;
          width: 100%;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .dates-and-changes {
          display: flex;
          gap: 0.5rem;
          width: 100%;
        }
        .dates-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(2rem, 1fr));
          width: 100%;
          gap: 5px;
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
          width: 100%;
          line-height: 1.3;
          margin: auto;
          border: 1px solid transparent;
          border-radius: 5px;
        }
        .date-button:active {
          box-shadow: 0 0 10px 1px var(--box-shadow);
        }
        .weekday {
          font-size: 0.7rem;
          color: gray;
        }
        .selected {
          background: var(--bg-color-tertiary-light);
        }
        span {
          pointer-events: none;
        }
        span.date {
          font-size: 1rem;
        }
        button:hover {
          background: var(--bg-color-tertiary);
        }
        .today {
          border: 1px solid var(--box-shadow);
        }
        .today .date {
          color: red;
        }
        .change {
          border-radius: 50%;
          height: 1.5rem;
          margin: auto;
          width: 1.5rem;
          min-width: 1.5rem;
          background: transparent;
          color: var(--text-color);
          border: 1px solid gray;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: none;
        }
        .change:active {
          box-shadow: 0 0 5px 1px var(--box-shadow);
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

export default DaysSelector;