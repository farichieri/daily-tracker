import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useState } from 'react';
import Image from 'next/image';
import Modal from '../Modal/Modal';

const DayPickerC = ({
  dateSelected,
  handleDateSelected,
  dateToShow,
  withModal,
  open,
  setOpen,
}: {
  dateSelected: Date;
  handleDateSelected: Function;
  dateToShow: string | null;
  withModal: boolean;
  open: boolean;
  setOpen: Function;
}) => {
  const closeModalOnClick = () => {};

  console.log({ open });

  return (
    <div className='container'>
      <div className='content' onClick={() => setOpen(!open)}>
        <span>{dateToShow}</span>
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
      {withModal && open ? (
        <Modal onCloseRedirect='' closeModalOnClick={closeModalOnClick}>
          <div className='calendar-modal' onClick={(e) => e.stopPropagation()}>
            <DayPicker
              mode='single'
              selected={dateSelected || new Date()}
              onSelect={(day) => {
                setOpen(!open);
                handleDateSelected(day);
              }}
              modifiersClassNames={{
                selected: 'my-selected',
                today: 'my-today',
              }}
            />
          </div>
          <div className='modal' onClick={() => setOpen(!open)}></div>
        </Modal>
      ) : (
        open &&
        !withModal && (
          <>
            <div className='calendar' onClick={(e) => e.stopPropagation()}>
              <DayPicker
                mode='single'
                selected={dateSelected || new Date()}
                onSelect={(day) => {
                  setOpen(!open);
                  handleDateSelected(day);
                }}
                modifiersClassNames={{
                  selected: 'my-selected',
                  today: 'my-today',
                }}
              />
            </div>
            <div className='modal' onClick={() => setOpen(!open)}></div>
          </>
        )
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
        .calendar-modal {
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
