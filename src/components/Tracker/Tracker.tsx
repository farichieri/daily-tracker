import Selector from './Selector';
import Day from './Day';
import { useEffect, useState } from 'react';
import Objetives from '../Goals/Goals';
import Button from '../Layout/Button/Button';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase.config';
import { types } from '@/utils/types';
import { dbFormatDate } from '@/utils/formatDate';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDayData,
  selectDaySelected,
  selectProjectSelected,
  selectWeekSelected,
  setDaySelected,
} from 'store/slices/trackerSlice';
import Header from './Header';
import { parseISO } from 'date-fns';
import { Task } from '@/global/types';

const Tracker = ({
  userID,
  getUserData,
}: {
  userID: string;
  getUserData: Function;
}) => {
  const dispatch = useDispatch();
  const dayData = useSelector(selectDayData);
  const daySelected = useSelector(selectDaySelected);
  const weekSelected = useSelector(selectWeekSelected);
  const projectSelected = useSelector(selectProjectSelected);
  const today = dbFormatDate(new Date());
  const [isSaving, setIsSaving] = useState(false);
  const [objetives, setObjetives] = useState<string[]>([]);
  const [objetive, setObjetive] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>({
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
      const objetives = dayData?.objetives || [];
      const tasks = dayData?.tasks || [];
      setTasks(tasks);
      setObjetives(objetives);
    };
    setData();
  }, [dayData, daySelected]);

  useEffect(() => {
    getUserData(daySelected);
  }, [daySelected]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    e.preventDefault();
    const value = (e.target as HTMLButtonElement).value;
    const name: string = String((e.target as HTMLButtonElement).name);
    if (type === types.objetives) {
      const id: number = Number((e.target as HTMLButtonElement).id || -1);
      if (objetives.indexOf(objetives[id]) > -1) {
        const newObjetives = [...objetives];
        newObjetives[id] = value;
        setObjetives(newObjetives);
      } else {
        setObjetive(value);
      }
    }
    if (type === types.tasks) {
      const id: number = Number((e.target as HTMLButtonElement).id || -1);
      if (tasks.indexOf(tasks[id]) > -1) {
        const newTasks: Task[] = [...tasks];
        const newTask: any = { ...newTasks[id] };
        newTask[name] = value;
        newTasks[id] = newTask;
        setTasks(newTasks);
      } else {
        setTask({ ...task, [name]: value });
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
      if (task.task) {
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
      const newTask = { ...newTasks[e.target.id] };
      newTask.done = !newTasks[e.target.id].done;
      newTasks[e.target.id] = newTask;
      setTasks(newTasks);
    }
    setIsSaveable(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const date = daySelected;
    const project = projectSelected.id;
    const docRef = doc(db, 'users', userID, 'projects', project, 'dates', date);
    await setDoc(docRef, {
      date: date,
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
    console.log({ date });
    dispatch(setDaySelected(date));
  };

  const handleDatesSelected = (e: Event) => {
    e.preventDefault();
    const action = (e.target as HTMLButtonElement).id;
    const modifyDateDays = (date: Date, action: string, days: number) => {
      console.log({ date });
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
      <div style={{ margin: '1rem 0 0 0', width: '100%' }}>
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
          padding-bottom: 10rem;
        }
      `}</style>
    </section>
  );
};

export default Tracker;
