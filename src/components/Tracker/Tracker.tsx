import DaysSelector from './DaysSelector';
import DayTasks from './DayTasks/DayTasks';
import { useState } from 'react';
import Goals from '../Goals/Goals';
import Button from '../Layout/Button/Button';
import { dbFormatDate } from '@/utils/formatDate';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDaySelected,
  selectToday,
  selectTrackerSlice,
  selectWeekSelected,
  setDaySelected,
} from 'store/slices/trackerSlice';
import Header from './Header';
import { parseISO } from 'date-fns';
import Tooltip from '../Layout/Tooltip/Tooltip';
import LoaderData from '../Layout/Loader/LoaderData';

const Tracker = () => {
  const dispatch = useDispatch();
  const daySelected = useSelector(selectDaySelected);
  const weekSelected = useSelector(selectWeekSelected);
  const today = useSelector(selectToday);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaveable, setIsSaveable] = useState(false);
  const [filterSelectOptionsSelected, setFilterSelectOptionsSelected] =
    useState('week');
  const filterSelectOptions = ['today'];
  const { isLoadingData } = useSelector(selectTrackerSlice);

  const handleSave = async () => {
    // setIsSaving(true);
    // const date = daySelected;
    // const project = projectSelected.project_id;
    // const docRef = doc(db, 'users', userID, 'projects', project, 'dates', date);
    // await setDoc(docRef, {
    //   date: date,
    //   objetives: goals,
    //   tasks: tasks,
    // });
    // setIsSaving(false);
    // setIsSaveable(!isSaveable);
  };

  const handleDatesSelected = (e: Event) => {
    e.preventDefault();
    const action = (e.target as HTMLButtonElement).id;
    const modifyDateDays = (date: Date, action: string, days: number) => {
      if (action === 'prev') {
        date.setDate(date.getDate() - days);
      } else if (action === 'next') {
        date.setDate(date.getDate() + days);
      }
      return date;
    };
    const newSelectedDay = dbFormatDate(
      modifyDateDays(parseISO(daySelected), action, 7)
    );
    dispatch(setDaySelected(newSelectedDay));
  };

  const handleSelectFilterOption = (e: Event) => {
    e.preventDefault();
    const option = (e.target as HTMLButtonElement).value;
    setFilterSelectOptionsSelected(option);
    if (option === 'today') {
      dispatch(setDaySelected(today));
      setFilterSelectOptionsSelected('week');
    }
  };

  return (
    <section>
      <Header
        isSaving={isSaving}
        isSaveable={isSaveable}
        handleSave={handleSave}
        options={filterSelectOptions}
        optionSelected={filterSelectOptionsSelected}
        handleSelectFilterOption={handleSelectFilterOption}
      />
      <DaysSelector
        week={weekSelected}
        handleDatesSelected={handleDatesSelected}
      />
      <div className='tasks-goals-container'>
        {isLoadingData ? (
          <LoaderData />
        ) : (
          <>
            <DayTasks />
            <Goals />
          </>
        )}
      </div>

      <style jsx>{`
        section {
          padding: 1rem 0.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          gap: 1rem;
          height: calc(100vh - var(--premium-nav-height));
        }
        .tasks-goals-container {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: start;
        }
      `}</style>
    </section>
  );
};

export default Tracker;
