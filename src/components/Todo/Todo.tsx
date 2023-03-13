import { Task } from '@/global/types';
import { db } from '@/utils/firebase.config';
import { User } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import { selectTodo } from 'store/slices/todosSlice';
import Clock from '../Clock/Clock';
import Button from '../Layout/Button/Button';
import IconButton from '../Layout/Icon/IconButton';

const Todo = ({ id }: { id: string }) => {
  const { todoData } = useSelector(selectTodo);
  const [isSaveable, setIsSaveable] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [todos, setTodos] = useState<Task[]>(todoData);
  const { user } = useSelector(selectUser);
  const [taskInput, setTaskInput] = useState('');
  const todoID = id;

  const handleToggleDone = (e: any) => {
    e.preventDefault();
    const taskID = e.target.id;
    const task = todos.find((t) => t.id === taskID);
    if (!task) return;
    const newTodos = [...todos];
    const newTask = { ...task };
    newTask.done = !newTask.done;
    const taskIndex = todos.indexOf(task);
    console.log({ taskIndex });
    newTodos[taskIndex] = newTask;
    handleSave(taskID, newTask);
    setTodos(newTodos);
  };

  const handleSave = async (taskID: string, task: Task) => {
    setIsSaving(true);
    if (!user) return;
    const docRef = doc(db, 'users', user.uid, 'todos', todoID, 'tasks', taskID);
    await setDoc(docRef, task);
    setIsSaving(false);
    setIsSaveable(!isSaveable);
  };

  const handleAdd = async (e: any) => {
    e.preventDefault();
    if (!user) return;
    if (taskInput) {
      const newTask = {
        task: taskInput,
        done: false,
        labels: [],
        comments: '',
        hour: '',
        id: '',
      };
      const docRef = collection(
        db,
        'users',
        user.uid,
        'todos',
        todoID,
        'tasks'
      );
      await addDoc(docRef, newTask).then((res) => (newTask.id = res.id));
      setTodos([...todos, newTask]);
      setTaskInput('');
    }
  };

  useEffect(() => {
    setTodos(todoData);
  }, [todoData]);

  return (
    <div className='todo'>
      <div className='header'>
        <Clock />
      </div>
      {todos?.length > 0 &&
        todos?.map((todo) => (
          <div className='task' key={todo.id}>
            <div className={`name ${todo.done ? 'done' : ''}`}>{todo.task}</div>
            <div className='checkbox'>
              <IconButton
                onClick={handleToggleDone}
                props={{ id: todo.id }}
                src={
                  todo.done ? '/icons/checkbox-done.png' : '/icons/checkbox.png'
                }
                alt={todo.done ? 'Done-Icon' : 'Checkbox-Icon'}
                width={24}
                height={24}
              />
            </div>
          </div>
        ))}
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
        .task,
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
        }
        .new-todo {
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
        .name {
          width: 100%;
          text-align: left;
          text-decoration: initial;
        }
        .name.done {
          text-decoration: line-through;
          color: var(--box-shadow);
        }
      `}</style>
    </div>
  );
};

export default Todo;
