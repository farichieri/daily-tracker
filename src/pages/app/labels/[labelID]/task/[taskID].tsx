import { selectTasks } from "store/slices/tasksSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import TaskDetail from "@/components/TasksList/Tasks/Task/TaskDetail";
import LabelsLayout from "@/components/Layout/LabelsLayout";

const TaskID = () => {
  const router = useRouter();
  const { tasks } = useSelector(selectTasks);
  const { taskID, labelID } = router.query;
  const task = tasks[String(taskID)];
  const redirectLink = `/app/labels/${labelID}`;

  return (
    <LabelsLayout>
      {task && <TaskDetail task={task} redirectLink={redirectLink} />}
    </LabelsLayout>
  );
};

export default TaskID;
