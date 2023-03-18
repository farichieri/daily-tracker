import PremiumLayout from '@/components/Layout/PremiumLayout';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import TodoList from '@/components/TodoList/TodoList';

const TasksLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user } = useSelector(selectUser);

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
