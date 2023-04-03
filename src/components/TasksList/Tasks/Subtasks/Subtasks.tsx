import { Task, TasksArray } from "@/global/types";
import Subtask from "./Subtask";

const Subtasks = ({
  task,
  inTaskCompnent,
  subtasks,
}: {
  task: Task;
  inTaskCompnent: boolean;
  subtasks: TasksArray;
}) => {
  return (
    <>
      {subtasks.map((subtask) => (
        <Subtask
          key={subtask.task_id}
          parentTask={task}
          subTask={subtask}
          inTaskCompnent={inTaskCompnent}
        />
      ))}
    </>
  );
};

export default Subtasks;
