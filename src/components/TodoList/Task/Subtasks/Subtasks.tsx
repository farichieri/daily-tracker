import { formatISO } from 'date-fns';
import { useRouter } from 'next/dist/client/router';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import Subtask from './Subtask';

const Subtasks = ({
  setIsSaveable,
  setTaskState,
  taskState,
  setSubtaskState,
  subtaskState,
  handleChange,
  handleSave,
}: {
  handleSave: any;
  handleChange: any;
  setIsSaveable: any;
  setTaskState: any;
  taskState: any;
  subtaskState: any;
  setSubtaskState: any;
}) => {
  const router = useRouter();
  const { user } = useSelector(selectUser);
  const { taskID, listID } = router.query;

  const handleDoneSubtask = (event: React.MouseEvent) => {
    event.preventDefault();
    const name: string = (event.target as HTMLButtonElement).name;
    const index: number = Number((event.target as HTMLButtonElement).id);
    if (name === 'done') {
      const subtasks = [...taskState.subtasks];
      const subTask = { ...subtasks[index] };
      subTask.done = !subtasks[index].done;
      subTask.completed_at = subTask.done ? formatISO(new Date()) : '';
      subtasks[index] = subTask;
      setTaskState({
        ...taskState,
        subtasks,
      });
      setIsSaveable(true);
    }
  };

  const handleDelete = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (!user) return;
    const index: number = Number((event.target as HTMLButtonElement).id);
    const newSubtasks: any = taskState.subtasks.slice();
    newSubtasks.splice(index, 1);
    const newTasks = { ...taskState };
    newTasks.subtasks = newSubtasks;
    setTaskState(newTasks);
    setIsSaveable(true);
  };

  const handleAddSubtask = (event: React.MouseEvent) => {
    if (!user) return;
    event.preventDefault();
    setTaskState({
      ...taskState,
      subtasks: taskState.subtasks.concat(subtaskState),
    });
    setSubtaskState({
      added_at: formatISO(new Date()),
      added_by_uid: user.uid,
      assigned_to: [],
      comments: [],
      completed_at: '',
      content: '',
      date_set: '',
      description: '',
      done: false,
      is_archived: false,
      minutes_spent: 0,
      parent_id: String(taskID),
      priority: 0,
      project_id: String(listID),
      reminder_date: '',
      section_id: '',
      task_order: 0,
      updated_at: '',
    });
    setIsSaveable(true);
  };

  return (
    <div className='subtasks-container'>
      <span className='title'>Subtasks</span>
      <div className='subtasks'>
        {taskState.subtasks.map((subtask: any, index: number) => (
          <Subtask
            addSubtask={false}
            handleAddSubtask={null}
            handleChange={handleChange}
            handleDelete={handleDelete}
            handleDoneSubtask={handleDoneSubtask}
            index={index}
            key={index}
            subtaskState={subtask}
            handleSave={handleSave}
          />
        ))}
        <Subtask
          addSubtask={true}
          handleAddSubtask={handleAddSubtask}
          handleChange={handleChange}
          handleDelete={handleDelete}
          handleDoneSubtask={handleDoneSubtask}
          index={-1}
          subtaskState={subtaskState}
          handleSave={handleSave}
        />
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
