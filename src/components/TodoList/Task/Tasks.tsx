import IconButton from '@/components/Layout/Icon/IconButton';
import { Task, TaskGroup, Todo } from '@/global/types';
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Tasks = ({
  tasks,
  handleToggleDone,
  handleDelete,
}: {
  tasks: TaskGroup;
  handleToggleDone: any;
  handleDelete: any;
}) => {
  const router = useRouter();
  const { listID } = router.query;
  const sortData = (tasks: TaskGroup) => {
    // const arrayForSort = [...tasks];
    // const sorted = arrayForSort.sort((a, b) => Number(a.done) - Number(b.done));
    // return sorted;
  };

  sortData(tasks);

  return (
    <>
      {Object.keys(tasks)?.length > 0 &&
        Object.keys(tasks).map((task) => (
          <Link href={`/app/tasks/${listID}/task/${task}`} key={task}>
            <div className='task-container'>
              <div className='task' id={task}>
                <div className='checkbox'>
                  <IconButton
                    onClick={handleToggleDone}
                    props={{ id: task }}
                    src={
                      tasks[task].done
                        ? '/icons/checkbox-done.png'
                        : '/icons/checkbox.png'
                    }
                    alt={tasks[task].done ? 'Done-Icon' : 'Checkbox-Icon'}
                    width={24}
                    height={24}
                  />
                </div>
                <div className={`name ${tasks[task].done ? 'done' : ''}`}>
                  {tasks[task].content}
                </div>
                {tasks[task].done && (
                  <div className='delete'>
                    <IconButton
                      props={{ id: task }}
                      onClick={handleDelete}
                      src={'/icons/delete.png'}
                      alt='Delete-Icon'
                      width={24}
                      height={24}
                    />
                  </div>
                )}
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
          gap: 0.5rem;
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

export default Tasks;
