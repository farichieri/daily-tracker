import { TasksGroup, Task, TasksArray } from '@/global/types';
import { filterSubtasks } from '@/hooks/helpers';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTasks } from 'store/slices/tasksSlice';
import AddSubtask from './AddSubtask';
import Subtask from './Subtask';

const Subtasks = ({ task }: { task: Task }) => {
  const { tasks } = useSelector(selectTasks);
  const subTasks: TasksGroup = filterSubtasks(tasks, task.task_id);
  const [subtasksState, setSubtasksState] = useState<TasksArray>([]);

  useEffect(() => {
    const sortedArray = Object.values(subTasks).sort((a, b) =>
      a.date_set.time_from.localeCompare(b.date_set.time_from)
    );
    setSubtasksState(sortedArray);
  }, [tasks]);

  return (
    <div className='subtasks-container'>
      <span className='title'>Subtasks</span>
      <div className='subtasks'>
        {subtasksState.map((subtask) => (
          <Subtask key={subtask.task_id} subTask={subtask} />
        ))}
        <AddSubtask />
        <style jsx>{`
          div {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }
          .subtasks {
            width: 100%;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Subtasks;
