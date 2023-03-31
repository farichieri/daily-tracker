import { selectTasks } from "store/slices/tasksSlice";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import TaskDetail from "@/components/TasksList/Tasks/Task/TaskDetail";
import TasksLayout from "@/components/Layout/TasksLayout";

const TaskID = () => {
  const router = useRouter();
  const { tasks } = useSelector(selectTasks);
  const { taskID, listID } = router.query;
  const task = tasks[String(taskID)];
  const redirectLink = `/app/lists/${listID}`;

  return (
    <TasksLayout>
      {task && <TaskDetail task={task} redirectLink={redirectLink} />}
    </TasksLayout>
  );
};

export default TaskID;
