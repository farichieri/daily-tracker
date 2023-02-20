import Selector from './Selector';
import Day from './Day';
import { useEffect, useState } from 'react';
import Objetives from '../Objetives/Objetives';
import Button from '../Layout/Button/Button';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase.config';

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

  console.log({ dailyData });

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
    setDailyData(getDailyData(today));
  }, [userData]);

  useEffect(() => {
    const getObjetives = () => {
      const userDataByDate = userData.find(
        (data: any) => data.date === daySelected.replaceAll('/', '-')
      );
      const objetives = userDataByDate?.data.objetives || [];
      setObjetives(objetives);
    };
    getObjetives();
  }, [userData, daySelected]);

  const week = [
    {
      id: 1,
      weekday: 'monday',
      date: '2/19/2023',
      data: [
        { task: 'task1', hour: '05:00', done: false },
        { task: 'task2', hour: '05:00', done: false },
        { task: 'task3', hour: '05:00', done: false },
        { task: 'task4', hour: '05:00', done: false },
        { task: 'task5', hour: '05:00', done: false },
      ],
      done: false,
      user: 'frichieri.dev@gmail.com',
    },
    {
      id: 2,
      weekday: 'tuesday',
      date: '14/03',
      data: [
        { task: 'task1', hour: '05:00', done: false },
        { task: 'task2', hour: '05:00', done: false },
        { task: 'task3', hour: '05:00', done: false },
        { task: 'task4', hour: '05:00', done: false },
        { task: 'task5', hour: '05:00', done: false },
      ],
      done: false,
      user: 'frichieri.dev@gmail.com',
    },
    {
      id: 3,
      weekday: 'wednesday',
      date: '15/03',
      data: [
        { task: 'task1', hour: '05:00', done: false },
        { task: 'task2', hour: '05:00', done: false },
        { task: 'task3', hour: '05:00', done: false },
        { task: 'task4', hour: '05:00', done: false },
        { task: 'task5', hour: '05:00', done: false },
      ],
      done: false,
      user: 'frichieri.dev@gmail.com',
    },
    {
      id: 4,
      weekday: 'thursday',
      date: '16/03',
      data: [
        { task: 'task1', hour: '05:00', done: false },
        { task: 'task2', hour: '05:00', done: false },
        { task: 'task3', hour: '05:00', done: false },
        { task: 'task4', hour: '05:00', done: false },
        { task: 'task5', hour: '05:00', done: false },
      ],
      done: false,
      user: 'frichieri.dev@gmail.com',
    },
    {
      id: 5,
      weekday: 'friday',
      date: '17/03',
      data: [
        { task: 'task1', hour: '05:00', done: false },
        { task: 'task2', hour: '05:00', done: false },
        { task: 'task3', hour: '05:00', done: false },
        { task: 'task4', hour: '05:00', done: false },
        { task: 'task5', hour: '05:00', done: false },
      ],
      done: false,
      user: 'frichieri.dev@gmail.com',
    },
    {
      id: 6,
      weekday: 'saturday',
      date: '18/03',
      data: [
        { task: 'task1', hour: '05:00', done: false },
        { task: 'task2', hour: '05:00', done: false },
        { task: 'task3', hour: '05:00', done: false },
        { task: 'task4', hour: '05:00', done: false },
        { task: 'task5', hour: '05:00', done: false },
      ],
      done: false,
      user: 'frichieri.dev@gmail.com',
    },
    {
      id: 7,
      weekday: 'sunday',
      date: '19/03',
      data: [
        { task: 'task1', hour: '05:00', done: false },
        { task: 'task2', hour: '05:00', done: false },
        { task: 'task3', hour: '05:00', done: false },
        { task: 'task4', hour: '05:00', done: false },
        { task: 'task5', hour: '05:00', done: false },
      ],
      done: false,
      user: 'frichieri.dev@gmail.com',
    },
  ];

  const getDailyData = (id: string) => {
    return week.find((day) => String(day.date) === String(id));
  };

  const handleSelectDay = (event: Event) => {
    event.preventDefault();
    const id = (event.target as HTMLButtonElement).id;
    const dailyData = getDailyData(id);
    setDaySelected(id);
    setDailyData(dailyData);
  };

  // Objetives
  const handleChange = (e: any) => {
    e.preventDefault();
    if (objetives.indexOf(objetives[e.target.id]) > -1) {
      const newObjetives = [...objetives];
      newObjetives[e.target.id] = e.target.value;
      setObjetives(newObjetives);
    } else {
      setObjetive(e.target.value);
    }
  };

  const handleAdd = (e: any) => {
    e.preventDefault();
    if (objetive) {
      setObjetives([...objetives, objetive]);
      setObjetive('');
    }
  };

  const handleRemove = (e: any) => {
    e.preventDefault();
    const newObjetives = objetives.slice();
    newObjetives.splice(e.target.value, 1);
    setObjetives(newObjetives);
  };

  const handleSave = async (e: any) => {
    setIsSaving(true);
    e.preventDefault();
    const date = new Date().toLocaleDateString().replaceAll('/', '-');
    await setDoc(doc(db, userID, date), {
      objetives: objetives,
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
      <Day day={dailyData} />
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
