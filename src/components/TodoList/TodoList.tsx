import { Task as TaskType } from '@/global/types';
import { db } from '@/utils/firebase.config';
import { formatISO } from 'date-fns';
import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import { selectTodo } from 'store/slices/todosSlice';
import Clock from '../Clock/Clock';
import IconButton from '../Layout/Icon/IconButton';
import Task from './Task/Task';
import { useRouter } from 'next/router';

const TodoList = () => {
  const router = useRouter();
  const { todoTasks } = useSelector(selectTodo);
  const [todos, setTodos] = useState<TaskType[]>(todoTasks);
  const { user } = useSelector(selectUser);
  const [taskInput, setTaskInput] = useState('');
  const { listID } = router.query;

  const handleToggleDone = (e: any) => {
    e.preventDefault();
    const taskID = e.target.id;
    const task = todos.find((t) => t.task_id === taskID);
    if (!task) return;
    const newTodos = [...todos];
    const newTask = { ...task };
    newTask.done = !newTask.done;
    newTask.completed_at = newTask.completed_at ? '' : formatISO(new Date());
    const taskIndex = todos.indexOf(task);
    newTodos[taskIndex] = newTask;
    handleSave(taskID, newTask);
    setTodos(newTodos);
  };

  const handleSave = async (taskID: string, task: TaskType) => {
    if (!user) return;
    const docRef = doc(
      db,
      'users',
      user.uid,
      'todos',
      String(listID),
      'tasks',
      taskID
    );
    await setDoc(docRef, task);
  };

  const handleAdd = async (e: any) => {
    e.preventDefault();
    if (!user) return;
    if (taskInput) {
      const newTask = {
        activity: [],
        added_at: formatISO(new Date()),
        added_by_uid: user.uid,
        assigned_to: [],
        attachments: [],
        comments: [],
        completed_at: '',
        content: taskInput,
        date_set: '',
        description: '',
        done: false,
        is_archived: false,
        labels: [],
        minutes_spent: 0,
        priority: 0,
        project_id: String(listID),
        reminder_date: '',
        section_id: '',
        subtasks: [],
        task_id: '',
        task_order: 0,
        updated_at: '',
      };
      const docRef = collection(
        db,
        'users',
        user.uid,
        'todos',
        String(listID),
        'tasks'
      );
      const taskID = await addDoc(docRef, newTask).then((res) => res.id);
      newTask.task_id = taskID;
      const addedDocRef = doc(
        db,
        'users',
        user.uid,
        'todos',
        String(listID),
        'tasks',
        taskID
      );
      await setDoc(addedDocRef, newTask);
      setTodos([...todos, newTask]);
      setTaskInput('');
    }
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    if (!user) return;
    const index = e.target.value;
    const newTodos: any = todos.slice();
    const taskToRemove = newTodos.splice(index, 1)[0].task_id;
    const docRef = doc(
      db,
      'users',
      user.uid,
      'todos',
      String(listID),
      'tasks',
      taskToRemove
    );
    await deleteDoc(docRef);
    setTodos(newTodos);
  };

  useEffect(() => {
    setTodos(todoTasks);
  }, [todoTasks]);

  return (
    <div className='todo'>
      <div className='header'>
        <Clock />
      </div>
      <Task
        todos={todos}
        handleToggleDone={handleToggleDone}
        handleDelete={handleDelete}
      />
      <form className='new-todo' onSubmit={handleAdd}>
        <div className='name'>
          <input
            type='text'
            placeholder='Add Task'
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
        </div>
        <div className='add-button'>
          <IconButton
            props={null}
            onClick={handleAdd}
            src={'/icons/add.png'}
            alt='Add-Icon'
            width={24}
            height={24}
          />
        </div>
      </form>
      <style jsx>{`
        .todo {
          width: 100%;
          display: flex;
          max-width: 600px;
          flex-direction: column;
          gap: 0.5rem;
          height: calc(100vh - var(--premium-nav-height) - 2rem);
        }
        .header {
          display: flex;
          margin-left: auto;
        }
        .new-todo {
          border: 1px solid gray;
          border-radius: 6px;
          width: 100%;
          display: flex;
          padding: 0.5rem 1rem;
          align-items: center;
          gap: 0.5rem;
          justify-content: space-between;
          min-height: 2.5rem;
          margin-top: auto;
        }
        input {
          display: flex;
          border: none;
          padding: 0;
          width: 100%;
          outline: none;
          background: transparent;
          color: var(--text-color);
        }
      `}</style>
    </div>
  );
};

export default TodoList;
