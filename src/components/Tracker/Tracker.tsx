import Selector from './Selector';
import Day from './Day';
import { useEffect, useState } from 'react';
import Objetives from '../Goals/Goals';
import Button from '../Layout/Button/Button';
import { doc, setDoc, collection, collectionGroup } from 'firebase/firestore';
import { db } from '@/utils/firebase.config';
import { types } from '@/utils/types';
import { dbFormatDate } from '@/utils/formatDate';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDaySelected,
  selectWeekSelected,
  setDaySelected,
} from 'store/slices/trackerSlice';
import Header from './Header';

const Tracker = ({
  userID,
  userData,
  getUserData,
}: {
  userID: string;
  userData: any;
  getUserData: Function;
}) => {
  const dispatch = useDispatch();
  const daySelected = useSelector(selectDaySelected);
  const weekSelected = useSelector(selectWeekSelected);
  const today = dbFormatDate(new Date());
  const [isSaving, setIsSaving] = useState(false);
  const [objetives, setObjetives] = useState<string[]>([]);
  const [objetive, setObjetive] = useState<string>('');
  const [tasks, setTasks] = useState<any[]>([]);
  const [task, setTask] = useState<any>({
    hour: '',
    task: '',
    comments: '',
    done: false,
  });
  const [showObjetives, setShowObjetives] = useState(false);
  const [isSaveable, setIsSaveable] = useState(false);
  const [filterSelectOptionsSelected, setFilterSelectOptionsSelected] =
    useState('week');
  const filterSelectOptions = ['today'];

  useEffect(() => {
    dispatch(setDaySelected(today));
  }, []);

  useEffect(() => {
    const setData = () => {
      const objetives = userData?.objetives || [];
      const tasks = userData?.tasks || [];
      setTasks(tasks);
      setObjetives(objetives);
    };
    setData();
  }, [userData, daySelected]);

  useEffect(() => {
    getUserData(daySelected);
  }, [daySelected]);

  const handleChange = (e: any, type: string) => {
    e.preventDefault();
    if (type === types.objetives) {
      if (objetives.indexOf(objetives[e.target.id]) > -1) {
        const newObjetives = [...objetives];
        newObjetives[e.target.id] = e.target.value;
        setObjetives(newObjetives);
      } else {
        setObjetive(e.target.value);
      }
    }
    if (type === types.tasks) {
      const name = e.target.name;

      if (tasks.indexOf(tasks[e.target.id]) > -1) {
        const newTasks = [...tasks];
        newTasks[e.target.id][name] = e.target.value;
        setTasks(newTasks);
      } else {
        setTask({ ...task, [e.target.name]: e.target.value });
      }
    }
    setIsSaveable(true);
  };

  const handleAdd = async (e: any, type: string) => {
    e.preventDefault();
    if (type === types.objetives) {
      if (objetive) {
        setObjetives([...objetives, objetive]);
        setObjetive('');
      }
    }
    if (type === types.tasks) {
      if (task.hour && task.task) {
        setTasks([...tasks, task]);
        setTask({
          hour: '',
          task: '',
          comments: '',
          done: false,
        });
      }
    }
    setIsSaveable(true);
  };

  const handleRemove = (e: any, type: string) => {
    e.preventDefault();
    if (type === types.objetives) {
      const newObjetives = objetives.slice();
      newObjetives.splice(e.target.value, 1);
      setObjetives(newObjetives);
    }
    if (type === types.tasks) {
      const newTasks = tasks.slice();
      newTasks.splice(e.target.value, 1);
      setTasks(newTasks);
    }
    setIsSaveable(true);
  };

  const handleToggleDone = (e: any, type: string) => {
    e.preventDefault();
    if (type === types.tasks) {
      const newTasks = [...tasks];
      newTasks[e.target.id].done = !newTasks[e.target.id].done;
      setTasks(newTasks);
    }
    setIsSaveable(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const date = daySelected;
    const project = 'own-project';
    const docRef = doc(db, 'users', userID, 'projects', project, 'dates', date);
    await setDoc(docRef, {
      objetives: objetives,
      tasks: tasks,
    });

    // await setDoc(doc(db, userID, date), {
    //   objetives: objetives,
    //   tasks: tasks,
    // });
    setIsSaving(false);
    setIsSaveable(!isSaveable);
  };

  const handleObjetives = (e: any) => {
    e.preventDefault();
    setShowObjetives(!showObjetives);
  };

  const handleSelectDay = (event: Event) => {
    event.preventDefault();
    const date = (event.target as HTMLButtonElement).id;
    dispatch(setDaySelected(date));
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
    // const date = new Date(weekSelected[0].date);
    // const newDate = modifyDateDays(date, action, 7);
    const newSelectedDay = dbFormatDate(
      modifyDateDays(new Date(daySelected), action, 7)
    );
    dispatch(setDaySelected(newSelectedDay));
    // dispatch(setWeekSelected(getDaysInAWeek(newDate)));
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
      <Selector
        week={weekSelected}
        handleSelectDay={handleSelectDay}
        today={today}
        handleDatesSelected={handleDatesSelected}
      />
      <Day
        handleChange={handleChange}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        handleToggleDone={handleToggleDone}
        tasks={tasks}
        task={task}
      />
      <div style={{ margin: '1rem', width: '100%' }}>
        <Button
          style={null}
          content={showObjetives ? 'Hide Goals' : 'Show Goals'}
          isLoading={false}
          isDisabled={false}
          loadMessage={''}
          onClick={handleObjetives}
        />
      </div>
      {showObjetives && (
        <Objetives
          handleChange={handleChange}
          handleAdd={handleAdd}
          handleRemove={handleRemove}
          objetives={objetives}
          objetive={objetive}
        />
      )}
      <style jsx>{`
        section {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          gap: 1rem;
        }
      `}</style>
    </section>
  );
};

export default Tracker;
