import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDaySelected, setDaySelected } from 'store/slices/trackerSlice';
import { dbFormatDate } from '@/utils/formatDate';
import Image from 'next/image';
import { useRouter } from 'next/router';

const DayPickerC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const daySelected = useSelector(selectDaySelected);
  const monthSelected = daySelected
    ? format(new Date(daySelected), 'LLLL u')
    : '';
  const [selected, setSelected] = useState<Date>();
  const [open, setOpen] = useState(false);

  const handleSelect = (day: Date | undefined) => {
    if (day) {
      setSelected(day);
      setOpen(!open);
      router.push(`/app/tracker/${dbFormatDate(day)}`);
      // dispatch(setDaySelected(dbFormatDate(day)));
    }
  };

  return (
    <div className='container'>
      <div className='content' onClick={() => setOpen(!open)}>
        <span>{monthSelected}</span>
        <div className='icon-container'>
          {open ? (
            <Image
              src={'/icons/collapse.png'}
              alt='collapse-icon'
              width={12}
              height={12}
              style={{ pointerEvents: 'none' }}
            />
          ) : (
            <Image
              src={'/icons/expand.png'}
              alt='expand-icon'
              width={12}
              height={12}
              style={{ pointerEvents: 'none' }}
            />
          )}
        </div>
      </div>
      {open && (
        <>
          <div className='calendar' onClick={(e) => e.stopPropagation()}>
            <DayPicker
              mode='single'
              selected={selected}
              onSelect={handleSelect}
              modifiersClassNames={{
                selected: 'my-selected',
                today: 'my-today',
              }}
            />
          </div>
          <div className='modal' onClick={() => setOpen(!open)}></div>
        </>
      )}
      <style>{css}</style>
      <style jsx>{`
        .container {
          border: 1px solid var(--box-shadow-light);
          padding: 0.25rem 0.5rem;
          border-radius: 5px;
          position: relative;
        }
        .content {
          display: flex;
          cursor: pointer;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          gap: 0.3rem;
          justify-content: center;
          align-items: center;
        }
        .icon-container {
          display: flex;
          pointer-events: none;
          margin-bottom: 4px;
        }
        .modal {
          position: fixed;
          background: transparent;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 10;
        }
        .calendar {
          position: absolute;
          background: var(--bg-color);
          box-shadow: 0 0 10px 1px var(--box-shadow-light);
          border-radius: 6px;
          top: 2.5rem;
          z-index: 998;
          font-size: 80%;
        }
        .rdp-row {
        }
      `}</style>
    </div>
  );
};

const css = `
.rpd-day:hover {
  background: var(--bg-color-tertiary);
}
.my-selected {
  background: var(--bg-color-tertiary);
  border-color: var(--bg-color-tertiary);
}
.my-selected:not([disabled]) { 
  font-weight: bold; 
}
.my-selected:hover:not([disabled]) { 
}
.my-today { 
  font-weight: bold;
  font-size: 120%; 
  color: red;
}
`;

export default DayPickerC;
