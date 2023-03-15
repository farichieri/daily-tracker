import IconButton from '@/components/Layout/Icon/IconButton';
import { Task, Todo } from '@/global/types';
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Task = ({
  todos,
  handleToggleDone,
  handleDelete,
}: {
  todos: Task[];
  handleToggleDone: any;
  handleDelete: any;
}) => {
  const router = useRouter();
  const { listID } = router.query;
  const sortData = (data: Task[]) => {
    const arrayForSort = [...data];
    const sorted = arrayForSort.sort((a, b) => Number(a.done) - Number(b.done));
    return sorted;
  };

  return (
    <>
      {todos?.length > 0 &&
        sortData(todos)?.map((todo, index) => (
          <Link
            href={`/app/tasks/${listID}/task/${todo.task_id}`}
            key={todo.task_id}
          >
            <div className='task-container'>
              <div className='task' id={todo.task_id}>
                <div className={`name ${todo.done ? 'done' : ''}`}>
                  {todo.content}
                </div>
                <div className='checkbox'>
                  <IconButton
                    onClick={handleToggleDone}
                    props={{ id: todo.task_id }}
                    src={
                      todo.done
                        ? '/icons/checkbox-done.png'
                        : '/icons/checkbox.png'
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
            </div>
          </Link>
        ))}
      <style jsx>{`
        .task-container {
          border: 1px solid gray;
          border-radius: 6px;
          width: 100%;
          padding: 0.5rem 1rem;
          align-items: center;
          gap: 0.5rem;
          justify-content: space-between;
          min-height: 2.5rem;
          cursor: pointer;
          transition: 0.3s;
          color: var(--text-color);
        }
        .task-container:hover {
          background: var(--cool);
        }
        .task {
          width: 100%;
          display: flex;
          pointer-events: none;
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
        .checkbox,
        .delete {
          pointer-events: initial;
        }
      `}</style>
    </>
  );
};

export default Task;
