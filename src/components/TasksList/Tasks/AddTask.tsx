import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase.config';
import { format, formatISO, parseISO } from 'date-fns';
import { NewTaskInitial } from '@/global/initialTypes';
import { selectUser } from 'store/slices/authSlice';
import { setAddNewTask } from 'store/slices/tasksSlice';
import { Label, Task } from '@/global/types';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import IconButton from '@/components/Layout/Icon/IconButton';
import AssignLabel from './TaskActions/TaskActionsModals/AssignLabel';
import { selectLabels } from 'store/slices/labelsSlice';
import LabelsButton from '@/components/Layout/Button/LabelsButton';
import TimeInput from '@/components/Layout/Input/TimeInput';
import DayPickerC from '@/components/DayPickerC/DayPickerC';

const AddTask = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const { listID, date } = router.query;
  const { labels } = useSelector(selectLabels);
  const [newTaskState, setNewTaskState] = useState<Task>(NewTaskInitial);
  const [openAssignLabel, setOpenAssignLabel] = useState(false);

  const handleChange = (event: React.ChangeEvent) => {
    event.preventDefault();
    const name: string = (event.target as HTMLButtonElement).name;
    const value: string = (event.target as HTMLButtonElement).value;
    setNewTaskState({
      ...newTaskState,
      [name]: value,
    });
  };

  const handleChangeDates = (event: React.ChangeEvent) => {
    event.preventDefault();
    const name: string = (event.target as HTMLButtonElement).name;
    const value: string = (event.target as HTMLButtonElement).value;
    const newDateSet = {
      ...newTaskState.date_set,
      [name]: value,
    };
    setNewTaskState({
      ...newTaskState,
      ['date_set']: newDateSet,
    });
  };

  const handleOpenLabels = (event: React.MouseEvent) => {
    event.preventDefault();
    setOpenAssignLabel(true);
  };

  const handleChangeLabels = (labelsSelected: []) => {
    setNewTaskState({
      ...newTaskState,
      labels: labelsSelected,
    });
  };

  const getLabelsSelected = () => {
    return newTaskState.labels?.map((label) => labels[label]);
  };

  const handleAdd = async (e: any) => {
    e.preventDefault();
    if (!user) return;
    if (newTaskState.content) {
      const project_id = listID ? String(listID) : 'tracker';
      const date_iso = listID
        ? newTaskState.date_set.date_iso
        : formatISO(parseISO(String(date)));
      const time_from = newTaskState.date_set.time_from;
      const time_to = newTaskState.date_set.time_to;

      const newDocRef = doc(collection(db, 'users', user.uid, 'tasks'));
      const newTask: Task = {
        ...newTaskState,
        added_at: formatISO(new Date()),
        added_by_uid: user.uid,
        task_id: newDocRef.id,
        content: newTaskState.content,
        project_id: project_id,
        date_set: {
          date_iso: date_iso,
          is_recurring: false,
          time_from: time_from || '',
          time_to: (time_from && time_to) || '',
          with_time: false,
        },
      };
      console.log({ newTask });
      setNewTaskState(NewTaskInitial);
      dispatch(setAddNewTask(newTask));
      // Verify if there is an error with firebase.
      await setDoc(newDocRef, newTask);
    }
  };

  const closeModalOnClick = () => {
    setOpenAssignLabel(false);
  };

  const removeDate = (event: React.MouseEvent) => {
    const name: string = (event.target as HTMLButtonElement).name;
    const newDateSet = {
      ...newTaskState.date_set,
      [name]: '',
    };
    setNewTaskState({
      ...newTaskState,
      ['date_set']: newDateSet,
    });
  };

  // Date
  const [dateSelected, setDateSelected] = useState<Date>(new Date());
  const [openDateSelector, setOpenDateSelector] = useState(false);
  const dateToShow = dateSelected && format(dateSelected, 'yyyy-dd-MM'); // April 2023
  const [wantToAddDate, setWantToAddDate] = useState(false);

  const handleDateSelected = (day: Date | undefined) => {
    if (day) {
      setDateSelected(day);
      const newDateSet = {
        ...newTaskState.date_set,
        date_iso: formatISO(day),
      };
      setNewTaskState({
        ...newTaskState,
        ['date_set']: newDateSet,
      });
    }
  };

  return (
    <form className='new-task' onSubmit={handleAdd}>
      {openAssignLabel && (
        <AssignLabel
          closeModalOnClick={closeModalOnClick}
          isNewTask={true}
          task={newTaskState}
          handleChangeLabels={handleChangeLabels}
        />
      )}
      <div className='content-container'>
        <div className='row'>
          <input
            type='text'
            name='content'
            placeholder='Add Task'
            value={newTaskState.content}
            onChange={handleChange}
            spellCheck='false'
            autoComplete='off'
          />
        </div>
        <div className='row'>
          <input
            type='text'
            name='description'
            placeholder='Description'
            value={newTaskState.description}
            onChange={handleChange}
            spellCheck='false'
            autoComplete='off'
          />
        </div>
        <div className='row'>
          <div className='labels'>
            {getLabelsSelected().map(
              (label: Label) =>
                label && (
                  <div
                    key={label.label_id}
                    className='label'
                    style={{ background: `${label.label_color}` }}
                  ></div>
                )
            )}
          </div>
        </div>
        <div className='row'>
          {listID && (
            <div className='day-picker'>
              {!wantToAddDate ? (
                <button
                  onClick={() => {
                    setWantToAddDate(true);
                    handleDateSelected(dateSelected);
                  }}
                >
                  Set Due Date
                </button>
              ) : (
                <DayPickerC
                  open={openDateSelector}
                  setOpen={setOpenDateSelector}
                  withModal={true}
                  dateSelected={dateSelected}
                  handleDateSelected={handleDateSelected}
                  dateToShow={dateToShow}
                  removeDate={removeDate}
                  setWantToAddDate={setWantToAddDate}
                />
              )}
            </div>
          )}
          {(newTaskState.date_set.date_iso || !listID) && (
            <>
              <div className='time_from'>
                <TimeInput
                  onBlur={() => {}}
                  name='time_from'
                  value={newTaskState.date_set.time_from}
                  onChange={handleChangeDates}
                  removeTime={removeDate}
                />
              </div>
              {newTaskState.date_set.time_from && (
                <TimeInput
                  onBlur={() => {}}
                  name='time_to'
                  value={newTaskState.date_set.time_to}
                  onChange={handleChangeDates}
                  removeTime={removeDate}
                />
              )}
            </>
          )}

          <div className='labels'>
            <LabelsButton onClick={handleOpenLabels} />
          </div>
          <div className='add-button'>
            <IconButton
              props={null}
              onClick={handleAdd}
              src={'/icons/add.png'}
              alt='Add-Icon'
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .new-task {
          border: 1px solid var(--box-shadow-light);
          border-radius: 1rem;
          width: 100%;
          display: flex;
          padding: 0.75rem;
          align-items: center;
          gap: 0.5rem;
          justify-content: space-between;
          min-height: 5rem;
          transition: 0.3s;
          background: var(--box-shadow-light);
        }
        .new-task:hover,
        .new-task:focus-within {
          box-shadow: inset 1px 0 0 rgb(255 255 255 / 1%),
            inset -1px 0 0 rgb(255 255 255 / 1%), 0 0 4px 0 rgb(95 99 104 / 25%),
            0 0 6px 2px rgb(95 99 104 / 25%);
        }
        .content-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 0.25rem;
        }
        .row {
          width: 100%;
          display: flex;
          gap: 0.5rem;
          align-items: center;
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
        input[name='description'] {
          font-size: 80%;
        }
        .add-time_to {
          background: none;
          border-radius: 6px;
          color: var(--text-color);
          border: 1px solid var(--box-shadow);
        }
        .add-button {
          margin-left: auto;
        }
        button {
          cursor: pointer;
          background: none;
          border: 1px solid var(--box-shadow);
          color: var(--text-color);
          border-radius: 6px;
          padding: 0.25rem 0.5rem;
        }
        .labels {
          display: flex;
          gap: 0.2rem;
          align-items: center;
        }
        .label {
          width: 1rem;
          height: 0.2rem;
          border-radius: 5px;
        }
      `}</style>
    </form>
  );
};

export default AddTask;
