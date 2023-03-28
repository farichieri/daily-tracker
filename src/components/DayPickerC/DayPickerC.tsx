import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";
import Image from "next/image";
import Modal from "../Modal/Modal";

const DayPickerC = ({
  dateSelected,
  handleDateSelected,
  dateToShow,
  withModal,
  open,
  setOpen,
  removeDate,
  setWantToAddDate,
  addTask,
}: {
  dateSelected: Date;
  handleDateSelected: Function;
  dateToShow: string;
  withModal: boolean;
  open: boolean;
  setOpen: Function;
  removeDate: Function;
  setWantToAddDate: Function;
  addTask: boolean;
}) => {
  const closeModalOnClick = () => {};

  return (
    <div className="container">
      <div className="content" onClick={() => setOpen(!open)}>
        <span>{dateToShow}</span>
        <div className="icon-container">
          {open ? (
            <Image
              src={"/icons/collapse.png"}
              alt="collapse-icon"
              width={12}
              height={12}
              style={{ pointerEvents: "none" }}
            />
          ) : (
            <Image
              src={"/icons/expand.png"}
              alt="expand-icon"
              width={12}
              height={12}
              style={{ pointerEvents: "none" }}
            />
          )}
        </div>
        {addTask && (
          <button
            className="close_time_to"
            name="date_iso"
            onClick={(e) => {
              e.stopPropagation();
              removeDate(e);
              setWantToAddDate(false);
            }}
          >
            x
          </button>
        )}
      </div>
      {withModal && open ? (
        <Modal onCloseRedirect="" closeModalOnClick={closeModalOnClick}>
          <div className="calendar-modal" onClick={(e) => e.stopPropagation()}>
            <DayPicker
              mode="single"
              selected={dateSelected || new Date()}
              onSelect={(day) => {
                setOpen(!open);
                handleDateSelected(day);
              }}
              modifiersClassNames={{
                selected: "my-selected",
                today: "my-today",
              }}
            />
          </div>
          <div className="modal" onClick={() => setOpen(!open)}></div>
        </Modal>
      ) : (
        open &&
        !withModal && (
          <>
            <div className="calendar" onClick={(e) => e.stopPropagation()}>
              <DayPicker
                mode="single"
                selected={dateSelected || new Date()}
                onSelect={(day) => {
                  setOpen(!open);
                  handleDateSelected(day);
                }}
                modifiersClassNames={{
                  selected: "my-selected",
                  today: "my-today",
                }}
              />
            </div>
            <div className="modal" onClick={() => setOpen(!open)}></div>
          </>
        )
      )}
      <style>{css}</style>
      <style jsx>{`
        .container {
          border: 1px solid var(--box-shadow-light);
          padding: 0.125rem 0.25rem;
          border-radius: 5px;
          position: relative;
          transition: 0.3s;
        }
        .container:hover {
          background: var(--bg-color-tertiary-light);
        }
        .content {
          -moz-user-select: none;
          -ms-user-select: none;
          -webkit-user-select: none;
          align-items: center;
          cursor: pointer;
          display: flex;
          gap: 0.3rem;
          justify-content: center;
          user-select: none;
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
          box-shadow: 0 0 3px 1px var(--box-shadow-light);
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
        .close_time_to {
          align-items: center;
          background: transparent;
          border-radius: 6px;
          border: none;
          color: var(--box-shadow);
          cursor: pointer;
          display: flex;
          justify-content: center;
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
