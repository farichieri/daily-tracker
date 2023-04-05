import { filterSubtasks, getParentTaskSeconds } from "@/hooks/helpers";
import { format, parseISO } from "date-fns";
import { Label, Task, TasksArray, TasksGroup } from "@/global/types";
import { selectLists } from "store/slices/listsSlice";
import { selectTasks } from "store/slices/tasksSlice";
import { selectToday, selectTrackerView } from "store/slices/trackerSlice";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import Subtasks from "../Subtasks/Subtasks";
import Timeline from "@/components/Layout/Task/Timeline";
import TimeTrackingButton from "../TaskActions/TaskActionsButtons/TimeTrackingButton";
import ToggleDoneTask from "../TaskActions/TaskActionsButtons/ToggleDoneTask";

const TaskComponent = ({
  taskID,
  task,
  getLabelsByTask,
  index,
  lastIndex,
}: {
  taskID: string;
  task: Task;
  getLabelsByTask: Function;
  index: number;
  lastIndex: number;
}) => {
  const router = useRouter();
  const projects = useSelector(selectLists);
  const { listID } = router.query;
  const today = useSelector(selectToday);

  const iso = task.date_set.date_iso;
  const isoDisplay = iso && format(parseISO(iso), "MM-dd-yyyy");
  const todayDisplay = format(new Date(), "MM-dd-yyyy"); // US Format
  const dateDisplayed = isoDisplay === todayDisplay ? "Today" : isoDisplay;
  const trackerView = useSelector(selectTrackerView);

  const { tasks } = useSelector(selectTasks);
  const subTasks: TasksGroup = useMemo(
    () => filterSubtasks(tasks, task.task_id),
    [tasks, task.task_id]
  );
  const sortedArray = Object.values(subTasks).sort((a, b) =>
    a.date_set.time_from.localeCompare(b.date_set.time_from)
  );
  const [subtasks, setSubtasks] = useState<TasksArray>(sortedArray);
  const dateFormatted = task.date_set.date_iso.slice(0, 10);
  const failedTask =
    dateFormatted < today && !task.done && task.date_set.date_iso;
  const oldDay = dateFormatted < today && task.date_set.date_iso;

  const secondsSpent = useMemo(
    () => getParentTaskSeconds(subTasks, task),
    [subTasks, task]
  );

  useEffect(() => {
    setSubtasks(sortedArray);
  }, [tasks]);

  return (
    <div
      className={`flex  ${
        trackerView === "week" && "min-w-[70vw] md:min-w-full"
      }`}
    >
      <Timeline index={index} lastIndex={lastIndex} task={task} />
      <div
        className={`my-0.5 w-full rounded-md border text-black shadow-sm transition-all duration-300 hover:opacity-100 hover:shadow-sm hover:shadow-zinc-800 dark:text-zinc-300 dark:hover:shadow-stone-400 ${
          task.done
            ? "border-[#5bff6eb7] bg-[#22c93559] hover:shadow-sm dark:bg-[#5bff6e34]"
            : task.working_on
            ? "border-[#c1c131f1] bg-[#f1f12b85] dark:bg-[#77772157]"
            : failedTask
            ? "border-[#ed2929e0] bg-[#ed292960]"
            : "border-shadow-color-l bg-stone-200 dark:bg-neutral-800"
        } ${oldDay && "opacity-70"}`}
      >
        <div
          className="pointer-events-auto flex w-full items-center gap-1 p-1"
          id={taskID}
        >
          <div className="flex h-full min-w-fit flex-col items-start gap-2">
            {!router.pathname.includes("tracker") && task.date_set.date_iso && (
              <div className="pointer-events-auto min-w-fit rounded-sm border-[var(--box-shadow)] text-xs ">
                <Link href={`/app/tracker/${dateFormatted}`}>
                  <span
                    className={`rounded-md border border-[var(--box-shadow)] py-0.5 px-1 opacity-70 transition-all duration-300 hover:opacity-100 ${
                      dateDisplayed === "Today" ? "text-red-500" : ""
                    }`}
                  >
                    {dateDisplayed}
                  </span>
                </Link>
              </div>
            )}
          </div>
          <div className="leading-2 flex w-full flex-col items-start justify-center overflow-hidden text-xs">
            <div className="font pointer-events-auto m-0 flex items-center p-0">
              {projects[task.project_id]?.list_name && !listID && (
                <Link href={`/app/lists/${task.project_id}`}>
                  <span>📄 List {projects[task.project_id]?.list_name}</span>
                </Link>
              )}
            </div>
            <div className="flex h-full w-full flex-col ">
              <div className="flex items-center">
                {task.is_recurring && (
                  <div className="mr-1 border-r border-gray-800 pr-1">
                    <Image
                      src={"/icons/repeat.png"}
                      alt="Repeat icon"
                      width={11}
                      height={11}
                    />
                  </div>
                )}
                <span
                  className={`my-auto flex font-medium ${
                    task.done ? "line-through opacity-50" : ""
                  }`}
                >
                  {task.content}
                </span>
                {task.working_on && (
                  <div className="translate ml-2 mr-2 flex items-center">
                    <Image
                      src={"/icons/working.png"}
                      alt="working icon"
                      width={18}
                      height={18}
                    />
                  </div>
                )}
                <div className="cursor-pointe ml-auto flex items-start ">
                  <TimeTrackingButton
                    inTaskCompnent={true}
                    sumOfSpent={secondsSpent.seconds_spent}
                    sumOfPlanned={secondsSpent.seconds_planned}
                    task={task}
                    handleSeconds={() => {}}
                  />
                </div>
              </div>
              {task.description && (
                <div className="w-full overflow-hidden text-ellipsis text-left opacity-70 ">
                  {task.description.slice(0, 300)}{" "}
                  {task.description.length > 300 && "..."}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 ">
              {getLabelsByTask(taskID)?.map(
                (label: Label) =>
                  label && (
                    <div
                      key={label.label_id}
                      className="mt-1 h-1 w-4 rounded-sm"
                      style={{ background: `${label.label_color}` }}
                    ></div>
                  )
              )}
            </div>
            <div className="pointer-events-auto flex w-full flex-col gap-0.5">
              <Subtasks subtasks={subtasks} task={task} inTaskCompnent={true} />
            </div>
          </div>
          <div className="pr-1">
            <ToggleDoneTask task={task} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskComponent;
