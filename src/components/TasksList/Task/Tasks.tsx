import IconButton from '@/components/Layout/Icon/IconButton';
import { TaskGroup } from '@/global/types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectList } from 'store/slices/listsSlice';
import { selectLabels } from 'store/slices/labelsSlice';

const Tasks = ({
  tasksState,
  handleToggleDone,
  handleDelete,
}: {
  tasksState: TaskGroup;
  handleToggleDone: any;
  handleDelete: any;
}) => {
  const router = useRouter();
  const { listID } = router.query;
  const { tasks } = useSelector(selectList);
  const { labels } = useSelector(selectLabels);

  const getLabelsByTask = (taskID: string) => {
    const task = { ...tasks[String(taskID)] };
    const labelsSelected = task.labels;
    const labelsFiltered = labelsSelected.map((label) => labels[label]);
    return labelsFiltered;
  };

  const sortData = (tasks: TaskGroup) => {
    // const arrayForSort = [...tasks];
    // const sorted = arrayForSort.sort((a, b) => Number(a.done) - Number(b.done));
    // return sorted;
  };

  sortData(tasksState);

  return (
    <>
      {Object.keys(tasksState)?.length > 0 &&
        Object.keys(tasksState).map((task) => (
          <Link href={`/app/tasks/${listID}/task/${task}`} key={task}>
            <div className='task-container'>
              <div className='task' id={task}>
                <div className='checkbox'>
                  <IconButton
                    onClick={handleToggleDone}
                    props={{ id: task }}
                    src={
                      tasksState[task].done
                        ? '/icons/checkbox-done.png'
                        : '/icons/checkbox.png'
                    }
                    alt={tasksState[task].done ? 'Done-Icon' : 'Checkbox-Icon'}
                    width={24}
                    height={24}
                  />
                </div>
                <div className='name-labels'>
                  <div
                    className={`name ${tasksState[task].done ? 'done' : ''}`}
                  >
                    {tasksState[task].content}
                  </div>
                  <div className='labels'>
                    {getLabelsByTask(task)?.map((label) => (
                      <div
                        key={label.label_id}
                        className='label'
                        style={{ background: `${label.label_color}` }}
                      ></div>
                    ))}
                  </div>
                </div>
                {tasksState[task].done && (
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
        .name-labels {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .labels {
          display: flex;
          gap: 0.2rem;
          align-items: center;
        }
        .label {
          width: 1rem;
          height: 0.2rem;
          border-radius: 5px;
        }
      `}</style>
    </>
  );
};

export default Tasks;
