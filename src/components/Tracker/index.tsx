import Selector from './Selector';
import Day from './Day';
import { useEffect, useState } from 'react';
import Objetives from '../Objetives/Objetives';
import Button from '../Layout/Button/Button';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase.config';
import { types } from '@/utils/types';

const index = ({ userID, userData }: { userID: string; userData: any }) => {
  const today = new Date().toLocaleDateString();
  const [daySelected, setDaySelected] = useState<any>(today);
  const [dailyData, setDailyData] = useState<any>({
    weekday: '',
    number: '',
    data: [],
    done: false,
    user: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isEditing, setIsEditing] = useState();
  const [thisWeek, setThisWeek] = useState<object[]>([]);

  const [objetives, setObjetives] = useState<string[]>([]);
  const [objetive, setObjetive] = useState<string>('');

  const [tasks, setTasks] = useState<string[]>([]);
  const [task, setTask] = useState<string>('');

  console.log({ tasks });

  useEffect(() => {
    const selectWeek = (date: Date) => {
      return Array(7)
        .fill(new Date(date))
        .map((el, idx) => {
          const day = new Date(el.setDate(el.getDate() - el.getDay() + idx));
          return {
            date: day.toLocaleDateString(),
            weekDay: day.toLocaleDateString('en-US', { weekday: 'long' }),
          };
        });
    };
    const date = new Date();
    setThisWeek(selectWeek(date));
  }, [userData]);

  useEffect(() => {
    const setUserDataByDate = () => {
      const userDataByDate = userData.find(
        (data: any) => data.date === daySelected.replaceAll('/', '-')
      );
      const objetives = userDataByDate?.data.objetives || [];
      const tasks = userDataByDate?.data.tasks || [];
      setTasks(tasks);
      setObjetives(objetives);
    };
    setUserDataByDate();
  }, [userData, daySelected]);

  const handleSelectDay = (event: Event) => {
    event.preventDefault();
    const id = (event.target as HTMLButtonElement).id;
    setDaySelected(id);
    setDailyData(dailyData);
  };

  // Objetives
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
  };

  const handleAdd = (e: any, type: string) => {
    if (type === types.objetives) {
      e.preventDefault();
      if (objetive) {
        setObjetives([...objetives, objetive]);
        setObjetive('');
      }
    }
  };

  const handleRemove = (e: any, type: string) => {
    if (type === types.objetives) {
      e.preventDefault();
      const newObjetives = objetives.slice();
      newObjetives.splice(e.target.value, 1);
      setObjetives(newObjetives);
    }
  };

  const handleSave = async (e: any) => {
    setIsSaving(true);
    e.preventDefault();
    const date = new Date().toLocaleDateString().replaceAll('/', '-');
    await setDoc(doc(db, userID, date), {
      objetives: objetives,
      tasks: 'see',
    });
    setIsSaving(false);
  };

  return (
    <section>
      <div>{daySelected}</div>
      <Selector
        week={thisWeek}
        handleSelectDay={handleSelectDay}
        daySelected={daySelected}
      />
      <Day
        handleChange={handleChange}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        tasks={tasks}
        task={task}
      />
      <Objetives
        handleChange={handleChange}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        objetives={objetives}
        objetive={objetive}
      />
      <Button
        content='Save'
        isLoading={isSaving}
        isDisabled={isDisabled}
        loadMessage={'Saving...'}
        onClick={handleSave}
      />
      <style jsx>{`
        section {
          margin: 1rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        div {
          height: 2rem;
        }
      `}</style>
    </section>
  );
};

export default index;
