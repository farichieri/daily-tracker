import PremiumLayout from '@/components/Layout/PremiumLayout';
import { db } from '@/utils/firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import { selectTodo, setTodoSelected, setTasks } from 'store/slices/todosSlice';
import TodoList from '@/components/TodoList/TodoList';
import { TaskGroup } from '@/global/types';

const TasksLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { listID, taskID } = router.query;
  const { user } = useSelector(selectUser);
  const { todos } = useSelector(selectTodo);

  const getTodoTasks = async () => {
    if (
      user &&
      listID &&
      Object.keys(listID).length > 0 &&
      Object.keys(todos).length > 0
    ) {
      if (!todos[String(listID)]) {
        router.push('/app');
      } else {
        console.log('Fetching Todo Data');
        let data: TaskGroup = {};
        const docRef = collection(
          db,
          'users',
          user.uid,
          'todos',
          String(listID),
          'tasks'
        );
        const querySnapshot = await getDocs(docRef);
        querySnapshot.forEach((todo: any) => {
          data[todo.id] = todo.data();
        });
        dispatch(setTasks(data));
      }
    }
  };

  useEffect(() => {
    if (user) {
      console.log('tasksLayoutUeffect');
      getTodoTasks();
      const todoSelected = todos[String(listID)];
      todoSelected && dispatch(setTodoSelected(todoSelected));
    }
  }, [listID, user, todos]);

  return (
    <PremiumLayout withPadding={false}>
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
