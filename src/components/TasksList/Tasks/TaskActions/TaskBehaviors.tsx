import { Task } from "@/global/types";
import DeleteTask from "./TaskActionsButtons/DeleteTask";
import ToggleDoneTask from "./TaskActionsButtons/ToggleDoneTask";
import WorkingOnButton from "./TaskActionsButtons/WorkingOnButton";

const TaskBehaviors = ({
  task,
  redirectLink,
}: {
  task: Task;
  redirectLink: string;
}) => {
  return (
    <div className="flex w-fit items-center gap-2">
      <DeleteTask task_id={task.task_id} redirectLink={redirectLink} />
      <WorkingOnButton task={task} />
      <ToggleDoneTask task={task} />
    </div>
  );
};

export default TaskBehaviors;
