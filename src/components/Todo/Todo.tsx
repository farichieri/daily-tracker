import { Task } from '@/global/types';
import { db } from '@/utils/firebase.config';
import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import { selectTodo } from 'store/slices/todosSlice';
import Clock from '../Clock/Clock';
import IconButton from '../Layout/Icon/IconButton';

const Todo = ({ id }: { id: string }) => {
  const { todoData } = useSelector(selectTodo);
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
    if (!user) return;
    const docRef = doc(db, 'users', user.uid, 'todos', todoID, 'tasks', taskID);
    await setDoc(docRef, task);
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
      const taskID = await addDoc(docRef, newTask).then((res) => res.id);
      newTask.id = taskID;
      const addedDocRef = doc(
        db,
        'users',
        user.uid,
        'todos',
        todoID,
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
    const taskToRemove = newTodos.splice(index, 1)[0].id;
    const docRef = doc(
      db,
      'users',
      user.uid,
      'todos',
      todoID,
      'tasks',
      taskToRemove
    );
    await deleteDoc(docRef);
    setTodos(newTodos);
  };

  useEffect(() => {
    setTodos(todoData);
  }, [todoData]);

  const sortData = (data: Task[]) => {
    const arrayForSort = [...data];
    const sorted = arrayForSort.sort((a, b) => Number(a.done) - Number(b.done));
    return sorted;
  };
  return (
    <div className='todo'>
      <div className='header'>
        <Clock />
      </div>
      {todos?.length > 0 &&
        sortData(todos)?.map((todo, index) => (
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
            <div className='delete'>
              <IconButton
                props={{ value: index }}
                onClick={handleDelete}
                src={'/icons/delete.png'}
                alt='Delete-Icon'
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
