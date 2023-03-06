import Selector from './Selector';
import Day from './Day';
import { useEffect, useState } from 'react';
import Objetives from '../Goals/Goals';
import Button from '../Layout/Button/Button';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase.config';
import { types } from '@/utils/types';
import { dbFormatDate } from '@/utils/formatDate';
import Clock from '../Clock/Clock';
import {
  getArrayOfDates,
  getDaysInAMonth,
  getDaysInAWeek,
} from '@/hooks/dates';

const Tracker = ({
  userID,
  userData,
  getUserData,
}: {
  userID: string;
  userData: any;
  getUserData: Function;
}) => {
  const today = dbFormatDate(new Date().toLocaleDateString());
  const [daySelected, setDaySelected] = useState<any>(today);
  const [isSaving, setIsSaving] = useState(false);
  const [datesSelected, setDatesSelected] = useState<any[]>([]);
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
    const date = new Date();
    setDatesSelected(getDaysInAWeek(date));
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
    const date = dbFormatDate(daySelected);
    console.log('saving');
    await setDoc(doc(db, userID, date), {
      objetives: objetives,
      tasks: tasks,
    });
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
    setDaySelected(date);
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
    const date = new Date(datesSelected[0].date);
    const newDate = modifyDateDays(date, action, 7);
    const newWeek = getDaysInAWeek(newDate);
    const newSelectedDay = dbFormatDate(
      modifyDateDays(new Date(daySelected), action, 7).toLocaleDateString()
    );
    setDaySelected(newSelectedDay);
    setDatesSelected(newWeek);
  };

  const handleSelectFilterOption = (e: Event) => {
    e.preventDefault();
    const option = (e.target as HTMLButtonElement).value;
    setFilterSelectOptionsSelected(option);
    if (option === 'today') {
      console.log({ today });
      setDaySelected(today);
      setFilterSelectOptionsSelected('week');
    }
  };

  return (
    <section>
      <div className='header'>
        <Button
          content='Save'
          isLoading={isSaving}
          isDisabled={!isSaveable}
          loadMessage={'Saving...'}
          onClick={handleSave}
        />
        <Clock />
      </div>
      <Selector
        week={datesSelected}
        handleSelectDay={handleSelectDay}
        daySelected={daySelected}
        today={today}
        handleDatesSelected={handleDatesSelected}
        options={filterSelectOptions}
        optionSelected={filterSelectOptionsSelected}
        handleSelectFilterOption={handleSelectFilterOption}
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
        .header {
          display: flex;
          width: 100%;
          align-items: center;
        }
      `}</style>
    </section>
  );
};

export default Tracker;
