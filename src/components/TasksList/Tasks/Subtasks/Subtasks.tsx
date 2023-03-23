import { TasksGroup, Task, TasksArray } from '@/global/types';
import { filterSubtasks } from '@/hooks/helpers';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTasks } from 'store/slices/tasksSlice';
import Subtask from './Subtask';

const Subtasks = ({
  task,
  inTaskCompnent,
}: {
  task: Task;
  inTaskCompnent: boolean;
}) => {
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
      {subtasksState.map((subtask) => (
        <Subtask
          parentTask={task}
          key={subtask.task_id}
          subTask={subtask}
          inTaskCompnent={inTaskCompnent}
        />
      ))}
      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

export default Subtasks;
