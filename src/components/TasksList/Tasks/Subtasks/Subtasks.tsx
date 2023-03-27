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
        <div className="my-1 flex flex-col gap-0.5" key={subtask.task_id}>
          <Subtask
            parentTask={task}
            subTask={subtask}
            inTaskCompnent={inTaskCompnent}
          />
        </div>
      ))}
    </>
  );
};

export default Subtasks;
