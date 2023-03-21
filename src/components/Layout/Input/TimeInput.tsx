import { useState } from 'react';

type Props = {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler;
  onBlur: React.ChangeEventHandler;
  removeTime: React.MouseEventHandler;
};

const TimeInput = (props: Props) => {
  const [timeTo, setTimeTo] = useState(!!props.value);

  return (
    <div>
      {!timeTo && (
        <button className='open' onClick={() => setTimeTo(true)}>
          {props.name === 'time_from' ? 'from' : 'to'}
        </button>
      )}
      {timeTo && (
        <>
          <input
            type='time'
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            spellCheck='false'
            autoComplete='off'
            min={'18:00'}
          />
          <button
            className='close_time_to'
            name={props.name}
            onClick={(e) => {
              props.removeTime(e);
              setTimeTo(false);
            }}
          >
            x
          </button>
        </>
      )}
      <style jsx>{`
        div {
          border: 1px solid var(--box-shadow);
          display: flex;
          width: 6rem;
          width: fit-content;
          border-radius: 6px;
          padding: 0.25rem;
          position: relative;
          align-items: center;
          justify-content: center;
        }
        .open {
          background: transparent;
          color: var(--text-color);
          border: none;
          cursor: pointer;
        }
        input {
          display: flex;
          border: none;
          padding: 0;
          width: 100%;
          outline: none;
          background: transparent;
          color: var(--text-color);
        }
        input[type='time']::-webkit-calendar-picker-indicator {
          background-color: var(--box-shadow);
          cursor: pointer;
          border-radius: 50%;
          padding: 0;
        }
        .close_time_to {
          cursor: pointer;
          display: flex;
          color: var(--box-shadow);
          background: transparent;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default TimeInput;
