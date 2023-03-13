import PremiumLayout from '@/components/Layout/PremiumLayout';
import { db } from '@/utils/firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import {
  selectTodo,
  setTodoData,
  setTodoSelected,
} from 'store/slices/todosSlice';
import Todo from '@/components/Todo/Todo';

const TodoPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { user } = useSelector(selectUser);
  const { todos } = useSelector(selectTodo);

  const getTodoData = async (id: string) => {
    if (user && id) {
      console.log('Fetching Todo Data');
      let data: any[] = [];
      const docRef = collection(db, 'users', user.uid, 'todos', id, 'todo');
      const querySnapshot = await getDocs(docRef);
      querySnapshot.forEach((todo) => {
        const todoData = todo.data();
        data.push({
          id: todo.id,
          ...todoData,
        });
      });
      dispatch(setTodoData(data));
    }
  };

  useEffect(() => {
    getTodoData(String(id));
    const todoSelected = todos.find((todo) => todo.id === id);
    todoSelected && setTodoSelected(todoSelected);
  }, [id, user]);

  return (
    <PremiumLayout withPadding={false}>
      <div className='todo'>
        <Todo />
      </div>
      <style jsx>{`
        .todo {
          max-width: var(--max-width-content);
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          align-items: center;
          padding-top: calc(var(--premium-nav-height) + 1rem);
        }
      `}</style>
    </PremiumLayout>
  );
};

export default TodoPage;
