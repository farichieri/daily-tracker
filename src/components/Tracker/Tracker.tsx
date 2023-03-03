import Selector from './Selector';
import Day from './Day';
import { useEffect, useState } from 'react';
import Objetives from '../Objetives/Objetives';
import Button from '../Layout/Button/Button';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase.config';
import { types } from '@/utils/types';
import { dbFormatDate } from '@/utils/formatDate';
import Clock from '../Clock/Clock';

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

  useEffect(() => {
    const date = new Date();
    setDatesSelected(selectSelectorDates(date, 7));
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

  const selectSelectorDates = (date: Date, daysAmount: number) => {
    return Array(daysAmount)
      .fill(new Date(date))
      .map((el, idx) => {
        const day: Date = new Date(
          el.setDate(el.getDate() - el.getDay() + idx)
        );
        return {
          date: dbFormatDate(day.toLocaleDateString()),
          weekDay: day.toLocaleDateString('en-US', { weekday: 'long' }),
        };
      });
  };

  const handleSelectDay = (event: Event) => {
    event.preventDefault();
    const date = (event.target as HTMLButtonElement).id;
    setDaySelected(date);
    getUserData(date);
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
    const newWeek = selectSelectorDates(newDate, 7);
    setDatesSelected(newWeek);
    const newSelectedDay = dbFormatDate(
      modifyDateDays(new Date(daySelected), action, 7).toLocaleDateString()
    );
    setDaySelected(newSelectedDay);
    getUserData(newSelectedDay);
  };

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

  const filterSelectOptions = ['week', 'month'];

  const handleSelectFilterOption = (e: Event) => {
    e.preventDefault();
    const action = (e.target as HTMLButtonElement).value;
    const numberOfDays = action === 'week' ? 7 : action === 'month' ? 30 : 7;
    const date = new Date(datesSelected[0].date);
    setDatesSelected(selectSelectorDates(date, numberOfDays));
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
        div {
          height: 2rem;
        }
      `}</style>
    </section>
  );
};

export default Tracker;
