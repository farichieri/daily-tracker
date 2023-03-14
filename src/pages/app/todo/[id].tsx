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

  const getTodoData = async () => {
    if (user && id) {
      console.log('Fetching Todo Data');
      let data: any[] = [];
      const docRef = collection(
        db,
        'users',
        user.uid,
        'todos',
        String(id),
        'tasks'
      );
      const querySnapshot = await getDocs(docRef);
      querySnapshot.forEach((todo) => {
        data.push(todo.data());
      });
      dispatch(setTodoData(data));
    }
  };

  useEffect(() => {
    getTodoData();
    const todoSelected = todos.find((todo) => todo.id === id);
    todoSelected && dispatch(setTodoSelected(todoSelected));
  }, [id, user]);

  return (
    <PremiumLayout withPadding={false}>
      <div className='todo'>{user && <Todo id={String(id)} />}</div>
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

export default TodoPage;
