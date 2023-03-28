import { filterSubtasks, getParentTaskSeconds } from "@/hooks/helpers";
import { format, parseISO } from "date-fns";
import { Label, Task, TasksArray, TasksGroup } from "@/global/types";
import { selectLists } from "store/slices/listsSlice";
import { selectTasks } from "store/slices/tasksSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import SpentAndPlanned from "@/components/Layout/Task/SpentAndPlanned";
import Subtasks from "../Subtasks/Subtasks";
import ToggleDoneTask from "../TaskActions/TaskActionsButtons/ToggleDoneTask";
import Timeline from "@/components/Layout/Task/Timeline";

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

  const iso = task.date_set.date_iso;
  const isoDisplay = iso && format(parseISO(iso), "MM-dd-yyyy");
  const todayDisplay = format(new Date(), "MM-dd-yyyy"); // US Format
  const dateDisplayed = isoDisplay === todayDisplay ? "Today" : isoDisplay;

  const { tasks } = useSelector(selectTasks);
  const subTasks: TasksGroup = filterSubtasks(tasks, task.task_id);
  const sortedArray = Object.values(subTasks).sort((a, b) =>
    a.date_set.time_from.localeCompare(b.date_set.time_from)
  );
  const [subtasks, setSubtasks] = useState<TasksArray>(sortedArray);

  const secondsSpent = getParentTaskSeconds(subTasks, task);

  useEffect(() => {
    setSubtasks(sortedArray);
  }, [tasks]);

  return (
    <div className="flex">
      <Timeline index={index} lastIndex={lastIndex} task={task} />
      <div
        className={`my-0.5 w-full rounded-md border border-[var(--box-shadow-light)] hover:shadow hover:shadow-zinc-800 ${
          task.done && "bg-[var(--done)]"
        } ${task.working_on && "bg-[#57571f] hover:border-[#a0a027]"}`}
      >
        <div
          className="pointer-events-auto flex w-full items-center gap-1 p-1"
          id={taskID}
        >
          <div className="flex h-full min-w-fit flex-col items-start gap-2">
            {!router.pathname.includes("tracker") && task.date_set.date_iso && (
              <div className="pointer-events-auto min-w-fit rounded-sm border-[var(--box-shadow)] text-xs ">
                <Link
                  href={`/app/tracker/${task.date_set.date_iso.slice(0, 10)}`}
                >
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

            <div className="flex h-full w-full flex-col">
              <div className="flex">
                <span
                  className={`my-auto flex font-medium  ${
                    task.done ? " text-[var(--box-shadow)] line-through" : ""
                  }`}
                >
                  {task.content}
                </span>
                <div className="translate ml-2 mr-2 flex items-center">
                  {task.working_on && (
                    <Image
                      src={"/icons/working.png"}
                      alt="working icon"
                      width={18}
                      height={18}
                    />
                  )}
                </div>
                <div className="ml-auto flex cursor-pointer">
                  <SpentAndPlanned
                    secondsSpent={secondsSpent.seconds_spent}
                    secondsPlanned={secondsSpent.seconds_planned}
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
            <div className="flex items-center gap-2">
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
            <div className="pointer-events-auto w-full">
              <Subtasks subtasks={subtasks} task={task} inTaskCompnent={true} />
            </div>
          </div>
          <div className="pr-1">
            <ToggleDoneTask task={task} />
          </div>
        </div>
        <style jsx>{`
          .time_from,
          .time_to {
            border: 1px solid var(--box-shadow-light);
            display: flex;
            padding: 0.1rem 0.25rem;
            border-radius: 6px;
            font-size: 0.6rem;
            opacity: 0.6;
          }
        `}</style>
      </div>
    </div>
  );
};

export default TaskComponent;
