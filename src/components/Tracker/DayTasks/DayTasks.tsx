import { filterSubtasks } from "@/hooks/helpers";
import { filterTasksDone } from "@/hooks/helpers";
import { selectLabels } from "store/slices/labelsSlice";
import { selectTasks } from "store/slices/tasksSlice";
import { TasksArray, TaskGroup, TasksGroup } from "@/global/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import AddTask from "@/components/TasksList/Tasks/AddTask";
import Link from "next/link";
import Progressbar from "@/components/Layout/Progressbar/Progressbar";
import TaskComponent from "@/components/TasksList/Tasks/Task/TaskComponent";

const DayTasks = ({ tasksFiltered }: { tasksFiltered: TaskGroup }) => {
  const router = useRouter();
  const { tasks } = useSelector(selectTasks);
  const { labels } = useSelector(selectLabels);
  const { date } = router.query;

  const getPrecentage = () => {
    const tasksAndSubtasks = { ...tasksFiltered };
    for (let task in tasksFiltered) {
      const subtasks: TasksGroup = filterSubtasks(tasks, task);
      for (let subtask in subtasks) {
        tasksAndSubtasks[subtask] = subtasks[subtask];
      }
    }
    const tasksCompleted = filterTasksDone(tasksAndSubtasks);
    let tasksCompletedL = Object.keys(tasksCompleted).length;
    let tasksL = Object.keys(tasksAndSubtasks).length;
    const percentageDone = Math.round((tasksCompletedL / tasksL) * 100);
    return percentageDone;
  };

  const percentageDone = getPrecentage();

  const sortedArray = Object.values(tasksFiltered).sort((a, b) =>
    a.date_set.time_from?.localeCompare(b.date_set.time_from)
  );
  const tasksWTime = sortedArray.filter((task) => task.date_set.time_from);
  const tasksNoTime = sortedArray.filter((task) => !task.date_set.time_from);
  // Working_on on top
  const sortedTasksNoTime = Object.values(tasksNoTime)
    .sort(
      (a, b) => Number(b.working_on || false) - Number(a.working_on || false)
    )
    .sort((a, b) => Number(a.done || false) - Number(b.done || false));

  const [tasksArrTimeState, setTasksArrTimeState] =
    useState<TasksArray>(tasksWTime);
  const [arrayOfTasksNoTime, setArrayOfTasksNoTime] =
    useState<TasksArray>(sortedTasksNoTime);

  useEffect(() => {
    setTasksArrTimeState(tasksWTime);
    setArrayOfTasksNoTime(sortedTasksNoTime);
  }, [tasksFiltered]);

  const getLabelsByTask = (taskID: string) => {
    const task = { ...tasks[String(taskID)] };
    const labelsSelected = task.labels;
    const labelsFiltered = labelsSelected?.map((label) => labels[label]);
    return labelsFiltered;
  };

  return (
    <section className="relative flex h-full w-full flex-col gap-2 overflow-auto">
      <Progressbar
        bgcolor="#99ccff"
        progress={percentageDone || 0}
        height={10}
      />
      <div className="h-full gap-2 overflow-hidden rounded-[0.5rem]">
        <div className="flex h-full flex-col gap-4 overflow-auto px-1">
          <div className="flex flex-col gap-1">
            {tasksArrTimeState?.map((task) => (
              <Link
                href={`/app/tracker/${date}/task/${task.task_id}`}
                key={task.task_id}
              >
                <TaskComponent
                  taskID={task.task_id}
                  task={task}
                  getLabelsByTask={getLabelsByTask}
                />
              </Link>
            ))}
          </div>
          <hr />
          <div className="flex flex-col gap-1">
            {arrayOfTasksNoTime?.map((task) => (
              <Link
                href={`/app/tracker/${date}/task/${task.task_id}`}
                key={task.task_id}
              >
                <TaskComponent
                  taskID={task.task_id}
                  task={task}
                  getLabelsByTask={getLabelsByTask}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <AddTask />
    </section>
  );
};

export default DayTasks;
