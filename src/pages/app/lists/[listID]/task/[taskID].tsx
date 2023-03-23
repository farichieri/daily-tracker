import { selectTasks } from 'store/slices/tasksSlice';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Loader from '@/components/Layout/Loader/Loader';
import TasksLayout from '@/components/Layout/TasksLayout';
import TaskDetail from '@/components/TasksList/Tasks/Task/TaskDetail';

const TaskID = () => {
  const router = useRouter();
  const { tasks } = useSelector(selectTasks);
  const { taskID, listID } = router.query;
  const task = tasks[String(taskID)];
  const redirectLink = `/app/lists/${listID}`;

  return (
    <TasksLayout>
      {!task ? (
        <Loader fullScreen={true} text={''} />
      ) : (
        <TaskDetail task={task} redirectLink={redirectLink} />
      )}
    </TasksLayout>
  );
};

export default TaskID;