import Selector from './Selector';
import Day from './Day';
import { useState } from 'react';

const index = () => {
  const [daySelected, setDaySelected] = useState<any>({
    weekday: '',
    number: '',
    data: [],
    done: false,
    user: '',
  });

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

  return (
    <section>
      <div>{daySelected.number}</div>
      <Selector
        week={week}
        handleSelectDay={handleSelectDay}
        daySelected={daySelected}
      />
      <Day day={daySelected} />
      <style jsx>{`
        section {
          margin: 1rem 0;
          display: flex;
          flex-direction: column;
        }
        div {
          height: 2rem;
        }
      `}</style>
    </section>
  );
};

export default index;
