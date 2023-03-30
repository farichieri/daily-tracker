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
import { selectShowNoTimeTasks } from "store/slices/trackerSlice";

const DayTasks = ({ tasksFiltered }: { tasksFiltered: TaskGroup }) => {
  const router = useRouter();
  const { tasks } = useSelector(selectTasks);
  const { labels } = useSelector(selectLabels);
  const { date } = router.query;
  const showNoTimeTasks = useSelector(selectShowNoTimeTasks);

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
    <section className="relative m-auto flex h-full w-full min-w-min max-w-[var(--max-width-content)] flex-col gap-2 overflow-y-auto overflow-x-hidden">
      <div className="m-x-auto flex px-1">
        <Progressbar
          bgcolor="#99ccff"
          progress={percentageDone || 0}
          height={10}
        />
      </div>
      <div className="flex h-full w-full gap-2 overflow-hidden rounded-[1rem] ">
        <div className="flex h-full w-full flex-col gap-4 overflow-y-auto px-1 ">
          <div className="flex w-full">
            <div className="flex h-full w-full flex-col">
              {tasksArrTimeState?.map((task, index) => (
                <Link
                  href={`/app/tracker/${date}/task/${task.task_id}`}
                  key={task.task_id}
                >
                  <TaskComponent
                    index={index}
                    taskID={task.task_id}
                    task={task}
                    getLabelsByTask={getLabelsByTask}
                    lastIndex={tasksArrTimeState.length - 1}
                  />
                </Link>
              ))}
            </div>
          </div>
          {showNoTimeTasks && (
            <div className="flex w-full flex-col">
              {arrayOfTasksNoTime?.map((task, index) => (
                <Link
                  href={`/app/tracker/${date}/task/${task.task_id}`}
                  key={task.task_id}
                >
                  <TaskComponent
                    index={index}
                    taskID={task.task_id}
                    task={task}
                    getLabelsByTask={getLabelsByTask}
                    lastIndex={arrayOfTasksNoTime.length - 1}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* <AddTask /> */}
    </section>
  );
};

export default DayTasks;
