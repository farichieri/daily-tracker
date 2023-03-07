import { DayPicker } from 'react-day-picker';
import { format, getMonth } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDaySelected, setDaySelected } from 'store/slices/trackerSlice';
import { dbFormatDate } from '@/utils/formatDate';

const DayPickerC = () => {
  const dispatch = useDispatch();
  const daySelected = useSelector(selectDaySelected);
  const monthSelected = daySelected
    ? format(new Date(daySelected), 'LLLL')
    : '';
  console.log({ monthSelected });
  const [selected, setSelected] = useState<Date>();
  const [open, setOpen] = useState(false);

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, 'PP')}.</p>;
  }
  const handleSelect = (day: Date | undefined) => {
    if (day) {
      setSelected(day);
      setOpen(!open);
      dispatch(setDaySelected(dbFormatDate(day.toLocaleDateString())));
    }
  };

  return (
    <div className='container'>
      <span onClick={() => setOpen(!open)}>{monthSelected}</span>
      <div className='calendar'>
        {open && (
          <DayPicker
            mode='single'
            selected={selected}
            onSelect={handleSelect}
            footer={footer}
          />
        )}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          border: 1px solid var(--box-shadow-light);
          padding: 0.25rem 0.5rem;
          border-radius: 5px;
          cursor: pointer;
          position: relative;
        }
        .calendar {
          position: absolute;
          background: var(--bg-color);
          box-shadow: 0 0 10px 1px var(--box-shadow-light);
          border-radius: 6px;
          top: 0;
          left: -100px;
        }
      `}</style>
    </div>
  );
};

export default DayPickerC;
