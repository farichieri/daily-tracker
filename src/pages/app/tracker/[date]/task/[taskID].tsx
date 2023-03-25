import { selectTasks } from "store/slices/tasksSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Loader from "@/components/Layout/Loader/Loader";
import TaskDetail from "@/components/TasksList/Tasks/Task/TaskDetail";
import TrackerLayout from "@/components/Layout/TrackerLayout";

const TaskID = () => {
  const router = useRouter();
  const { tasks } = useSelector(selectTasks);
  const { taskID, date } = router.query;
  const task = tasks[String(taskID)];
  const redirectLink = `/app/tracker/${date}`;

  return (
    <TrackerLayout>
      {!task ? (
        <Loader fullScreen={true} text={""} />
      ) : (
        <TaskDetail task={task} redirectLink={redirectLink} />
      )}
    </TrackerLayout>
  );
};

export default TaskID;
