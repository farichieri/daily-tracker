import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase.config';
import { format, formatISO, parseISO } from 'date-fns';
import { Goal, Label } from '@/global/types';
import { NewGoalInitial } from '@/global/initialTypes';
import { selectLabels } from 'store/slices/labelsSlice';
import { selectUser } from 'store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import DayPickerC from '@/components/DayPickerC/DayPickerC';
import IconButton from '@/components/Layout/Icon/IconButton';
import { setAddnewGoal } from 'store/slices/goalsSlice';

const AddGoal = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const { listID, date } = router.query;
  const { labels } = useSelector(selectLabels);
  const [newGoalState, setNewGoalState] = useState<Goal>(NewGoalInitial);

  const handleChange = (event: React.ChangeEvent) => {
    event.preventDefault();
    const name: string = (event.target as HTMLButtonElement).name;
    const value: string = (event.target as HTMLButtonElement).value;
    setNewGoalState({
      ...newGoalState,
      [name]: value,
    });
  };

  // const getLabelsSelected = () => {
  //   return newGoalState.labels?.map((label) => labels[label]);
  // };

  const handleAdd = async (e: any) => {
    e.preventDefault();
    if (!user) return;
    if (newGoalState.content) {
      const project_id = newGoalState.project_id
        ? newGoalState.project_id
        : 'goals';
      const date_iso = listID ? newGoalState.date_set.date_iso : '';
      const time_from = newGoalState.date_set.time_from;
      const time_to = newGoalState.date_set.time_to;

      const newDocRef = doc(collection(db, 'users', user.uid, 'goals'));
      const newGoal: Goal = {
        ...newGoalState,
        added_at: formatISO(new Date()),
        added_by_uid: user.uid,
        goal_id: newDocRef.id,
        content: newGoalState.content,
        project_id: project_id,
        date_set: {
          date_iso: date_iso,
          is_recurring: false,
          time_from: time_from || '',
          time_to: (time_from && time_to) || '',
          with_time: false,
        },
      };
      console.log({ newGoal });
      setNewGoalState(NewGoalInitial);
      dispatch(setAddnewGoal(newGoal));
      // Verify if there is an error with firebase.
      await setDoc(newDocRef, newGoal);
    }
  };

  const removeDate = (event: React.MouseEvent) => {
    const name: string = (event.target as HTMLButtonElement).name;
    const newDateSet = {
      ...newGoalState.date_set,
      [name]: '',
    };
    setNewGoalState({
      ...newGoalState,
      ['date_set']: newDateSet,
    });
  };

  // Date
  const [dateSelected, setDateSelected] = useState<Date>(new Date());
  const [openDateSelector, setOpenDateSelector] = useState(false);
  const dateToShow = dateSelected && format(dateSelected, 'MM-dd-yyyy'); // April 2023
  const [wantToAddDate, setWantToAddDate] = useState(false);

  const handleDateSelected = (day: Date | undefined) => {
    if (day) {
      setDateSelected(day);
      const newDateSet = {
        ...newGoalState.date_set,
        date_iso: formatISO(day),
      };
      setNewGoalState({
        ...newGoalState,
        ['date_set']: newDateSet,
      });
    }
  };

  const todayDisplay = format(new Date(), 'MM-dd-yyyy'); // US Format
  const dateDisplayed = dateToShow === todayDisplay ? 'Today' : dateToShow;

  useEffect(() => {
    listID &&
      setNewGoalState({
        ...newGoalState,
        project_id: String(listID),
      });
  }, [listID]);

  return (
    <form className='new-goal' onSubmit={handleAdd}>
      <div className='content-container'>
        <div className='row'>
          <input
            type='text'
            name='content'
            placeholder='Add Goal'
            value={newGoalState.content}
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
            value={newGoalState.description}
            onChange={handleChange}
            spellCheck='false'
            autoComplete='off'
          />
        </div>
        {/* <div className='row'>
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
        </div> */}
        <div className='row'>
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
                dateToShow={dateDisplayed}
                removeDate={removeDate}
                setWantToAddDate={setWantToAddDate}
              />
            )}
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
        .new-goal {
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
        .new-goal:hover,
        .new-goal:focus-within {
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

export default AddGoal;
