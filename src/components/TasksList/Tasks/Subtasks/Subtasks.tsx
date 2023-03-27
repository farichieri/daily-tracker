import { TasksGroup, Task, TasksArray } from "@/global/types";
import { filterSubtasks } from "@/hooks/helpers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectTasks } from "store/slices/tasksSlice";
import Subtask from "./Subtask";

const Subtasks = ({
  task,
  inTaskCompnent,
}: {
  task: Task;
  inTaskCompnent: boolean;
}) => {
  const { tasks } = useSelector(selectTasks);
  const subTasks: TasksGroup = filterSubtasks(tasks, task.task_id);
  const sortedArray = Object.values(subTasks).sort((a, b) =>
    a.date_set.time_from.localeCompare(b.date_set.time_from)
  );
  const [subtasksState, setSubtasksState] = useState<TasksArray>(sortedArray);

  useEffect(() => {
    setSubtasksState(sortedArray);
  }, [tasks]);

  return (
    <>
      {subtasksState.map((subtask) => (
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
