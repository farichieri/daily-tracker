import Selector from './Selector';
import Day from './Day';
import { useEffect, useState } from 'react';
import Objetives from '../Objetives/Objetives';
import Button from '../Layout/Button/Button';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase.config';
import { types } from '@/utils/types';

const Tracker = ({ userID, userData }: { userID: string; userData: any }) => {
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

  const [tasks, setTasks] = useState<any[]>([]);
  const [task, setTask] = useState<any>({
    hour: '',
    task: '',
    comments: '',
    done: false,
  });

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
    if (type === types.tasks) {
      console.log(e.target);
      const name = e.target.name;
      if (tasks.indexOf(tasks[e.target.id]) > -1) {
        const newTasks = [...tasks];
        newTasks[e.target.id][name] = e.target.value;
        setTasks(newTasks);
      } else {
        setTask({ ...task, [e.target.name]: e.target.value });
      }
    }
  };

  const handleAdd = (e: any, type: string) => {
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
  };

  const handleToggleDone = (e: any, type: string) => {
    e.preventDefault();
    if (type === types.tasks) {
      const newTasks = [...tasks];
      newTasks[e.target.id].done = !newTasks[e.target.id].done;
      setTasks(newTasks);
    }
  };

  const handleSave = async (e: any) => {
    setIsSaving(true);
    e.preventDefault();
    const date = daySelected.replaceAll('/', '-');
    await setDoc(doc(db, userID, date), {
      objetives: objetives,
      tasks: tasks,
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
        handleToggleDone={handleToggleDone}
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

export default Tracker;
