import { filterSubtasks } from "@/hooks/helpers";
import { filterTasksDone } from "@/hooks/helpers";
import { selectLabels } from "store/slices/labelsSlice";
import {
  selectDaySelected,
  selectShowNoTimeTasks,
  selectTrackerView,
  selectWeekSelected,
} from "store/slices/trackerSlice";
import { selectTasks } from "store/slices/tasksSlice";
import { TasksArray, TaskGroup, TasksGroup } from "@/global/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddTask from "@/components/TasksList/Tasks/AddTask";
import Link from "next/link";
import Progressbar from "@/components/Layout/Progressbar/Progressbar";
import TaskComponent from "@/components/TasksList/Tasks/Task/TaskComponent";
import DaysSelector from "../DaysSelector";
import { useRouter } from "next/router";
import Image from "next/image";
import { dbFormatDate } from "@/utils/formatDate";
import { parseISO } from "date-fns";

const DayTasks = ({
  tasksFiltered,
  date,
  index,
  lastIndex,
}: {
  tasksFiltered: TaskGroup;
  date: string;
  index: number;
  lastIndex: number;
}) => {
  const router = useRouter();
  const { tasks } = useSelector(selectTasks);
  const { labels } = useSelector(selectLabels);
  const showNoTimeTasks = useSelector(selectShowNoTimeTasks);
  const trackerView = useSelector(selectTrackerView);
  const weekView = trackerView === "week";
  const weekSelected = useSelector(selectWeekSelected);

  console.log("asd");

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

  const daysToDispaly = weekView
    ? weekSelected.filter((day) => day.date === date)
    : weekSelected;

  const daySelected = useSelector(selectDaySelected);

  const handleDatesSelected = (e: React.MouseEvent) => {
    e.preventDefault();
    const action = (e.target as HTMLButtonElement).id;
    const days = weekView ? 7 : 1;
    const modifyDateDays = (date: Date, action: string) => {
      if (action === "prev") {
        date.setDate(date.getDate() - days);
      } else if (action === "next") {
        date.setDate(date.getDate() + days);
      }
      return date;
    };
    const newSelectedDay = dbFormatDate(
      modifyDateDays(parseISO(daySelected), action)
    );
    router.push(newSelectedDay);
  };

  return (
    <section className="relative m-auto flex h-full w-full min-w-fit max-w-[var(--max-width-content)] flex-col gap-2 overflow-y-auto overflow-x-hidden">
      <div className="flex">
        {index === 0 && (
          <button
            onClick={handleDatesSelected}
            id={"prev"}
            className="mr-1 flex h-full w-8 items-center justify-center rounded-md border-gray-600 duration-300 hover:bg-gray-500 active:bg-[var(--bg-color-tertiary-light)]"
          >
            <Image
              src={"/icons/back.png"}
              alt="back-icon"
              width={12}
              height={12}
              style={{ pointerEvents: "none" }}
            />
          </button>
        )}
        <DaysSelector daysToDisplay={daysToDispaly} />
        {index === lastIndex && (
          <button
            onClick={handleDatesSelected}
            id={"next"}
            className="ml-1 flex h-full w-8 items-center justify-center rounded-md border-gray-600 duration-300 hover:bg-gray-500 active:bg-[var(--bg-color-tertiary-light)]"
          >
            <Image
              src={"/icons/forward.png"}
              alt="forward-icon"
              width={12}
              height={12}
              style={{ pointerEvents: "none" }}
            />
          </button>
        )}
      </div>
      <div className="m-x-auto flex px-1">
        <Progressbar
          bgcolor="#99ccff"
          progress={percentageDone || 0}
          height={10}
        />
      </div>
      <div className="flex h-full w-full gap-2 overflow-hidden rounded-[1rem] ">
        <div className="flex h-full w-full flex-col items-center gap-4 overflow-y-auto overflow-x-hidden px-1 ">
          <div className={`flex w-full min-w-full ${weekView && "max-w-min"}`}>
            <div className="flex h-full w-full flex-col ">
              {tasksArrTimeState?.map((task, index) => (
                <Link
                  href={`/app/tracker/${date}/task/${task.task_id}`}
                  key={task.task_id}
                >
                  <TaskComponent
                    getLabelsByTask={getLabelsByTask}
                    index={index}
                    lastIndex={tasksArrTimeState.length - 1}
                    task={task}
                    taskID={task.task_id}
                  />
                </Link>
              ))}
            </div>
          </div>
          {showNoTimeTasks && (
            <div
              className={`flex w-full min-w-full flex-col ${
                weekView && "max-w-min"
              }`}
            >
              {arrayOfTasksNoTime?.map((task, index) => (
                <Link
                  href={`/app/tracker/${date}/task/${task.task_id}`}
                  key={task.task_id}
                >
                  <TaskComponent
                    getLabelsByTask={getLabelsByTask}
                    index={index}
                    lastIndex={arrayOfTasksNoTime.length - 1}
                    task={task}
                    taskID={task.task_id}
                  />
                </Link>
              ))}
            </div>
          )}
          <AddTask date={date} />
        </div>
      </div>
    </section>
  );
};

export default DayTasks;
