import PremiumLayout from '@/components/Layout/PremiumLayout';
import { db } from '@/utils/firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import {
  selectTodo,
  setTodoTasks,
  setTodoSelected,
} from 'store/slices/todosSlice';
import TodoList from '@/components/TodoList/TodoList';
import Loader from '@/components/Layout/Loader/Loader';

const TasksLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { listID, taskID } = router.query;
  const { user } = useSelector(selectUser);
  const { todos } = useSelector(selectTodo);
  const [isLoading, setIsLoading] = useState(true);

  const getTodoTasks = async () => {
    if (user && listID && todos.length > 0) {
      if (!todos.find((todo) => todo.list_id === listID)) {
        router.push('/app');
      } else {
        console.log('Fetching Todo Data');
        let data: any[] = [];
        const docRef = collection(
          db,
          'users',
          user.uid,
          'todos',
          String(listID),
          'tasks'
        );
        const querySnapshot = await getDocs(docRef);
        querySnapshot.forEach((todo) => {
          data.push(todo.data());
        });
        dispatch(setTodoTasks(data));
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getTodoTasks();
    const todoSelected = todos.find((todo) => todo.list_id === listID);
    todoSelected && dispatch(setTodoSelected(todoSelected));
  }, [listID, user, todos]);

  return (
    <PremiumLayout withPadding={false}>
      {isLoading && <Loader fullScreen={false} text={''} />}
      <div className='todo'>{user && <TodoList />}</div>
      {children}
      <style jsx>{`
        .todo {
          max-width: var(--max-width-content);
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          align-items: center;
          padding-top: calc(var(--premium-nav-height) + 1rem);
          margin: 0 1rem;
        }
      `}</style>
    </PremiumLayout>
  );
};

export default TasksLayout;
