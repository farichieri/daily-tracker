import Selector from './Selector';
import Day from './Day';
import { useState } from 'react';
import Objetives from '../Objetives/Objetives';
import Button from '../Layout/Button/Button';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase.config';
import { v4 as uuidv4 } from 'uuid';

const index = ({ userID }: { userID: string }) => {
  const [daySelected, setDaySelected] = useState<any>({
    weekday: '',
    number: '',
    data: [],
    done: false,
    user: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [isEditing, setIsEditing] = useState();

  const week = [
    {
      id: 1,
      weekday: 'monday',
      number: '13/03',
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
      number: '14/03',
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
      number: '15/03',
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
      number: '16/03',
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
      number: '17/03',
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
      number: '18/03',
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
      number: '19/03',
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

  const handleSelectDay = (event: Event) => {
    event.preventDefault();
    const id = (event.target as HTMLButtonElement).id;
    const daySelected = week.find((day) => String(day.id) === String(id));
    if (daySelected) {
      setDaySelected(daySelected);
    }
  };

  // Objetives
  const [objetives, setObjetives] = useState<string[]>([]);
  const [objetive, setObjetive] = useState<string>('');

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
    e.preventDefault();
    const date = new Date().toLocaleDateString().replaceAll('/', '-');
    await setDoc(doc(db, userID, date), {
      objetives: objetives,
    });
  };

  return (
    <section>
      <div>{daySelected.number}</div>
      <Selector
        week={week}
        handleSelectDay={handleSelectDay}
        daySelected={daySelected}
      />
      <Day day={daySelected} />
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
