import { format, parseISO } from "date-fns";
import { formatTime } from "@/utils/formatDate";
import { Label, Task } from "@/global/types";
import { selectLists } from "store/slices/listsSlice";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import Subtasks from "../Subtasks/Subtasks";
import ToggleDoneTask from "../TaskActions/TaskActionsButtons/ToggleDoneTask";
import SpentAndPlanned from "@/components/Layout/Task/SpentAndPlanned";

const TaskComponent = ({
  taskID,
  task,
  getLabelsByTask,
}: {
  taskID: string;
  task: Task;
  getLabelsByTask: Function;
}) => {
  const router = useRouter();
  const projects = useSelector(selectLists);
  const { listID } = router.query;

  const iso = task.date_set.date_iso;
  const isoDisplay = iso && format(parseISO(iso), "MM-dd-yyyy");
  const todayDisplay = format(new Date(), "MM-dd-yyyy"); // US Format
  const dateDisplayed = isoDisplay === todayDisplay ? "Today" : isoDisplay;

  return (
    <div
      className={`task-container ${task.done ? "done" : ""} ${
        task.working_on ? "working_on" : ""
      }`}
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
          {(task.date_set.time_from || task.date_set.time_to) && (
            <>
              <div className="flex w-full items-center gap-1">
                {task.date_set.time_from && (
                  <div className="time_from">{task.date_set.time_from}</div>
                )}
                {task.date_set.time_to && (
                  <>
                    -<div className="time_to">{task.date_set.time_to}</div>
                  </>
                )}
              </div>
            </>
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
            <div
              className={`my-auto flex font-medium  ${
                task.done ? " text-[var(--box-shadow)] line-through" : ""
              }`}
            >
              {task.content}
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
            <Subtasks task={task} inTaskCompnent={true} />
          </div>
        </div>
        <SpentAndPlanned
          secondsPlanned={task.seconds_planned}
          secondsSpent={task.seconds_spent}
        />
        <div className="translate m-auto mr-2 flex items-center">
          {task.working_on && (
            <Image
              src={"/icons/working.png"}
              alt="working icon"
              width={25}
              height={25}
            />
          )}
        </div>
        <div className="pr-1">
          <ToggleDoneTask task={task} />
        </div>
      </div>
      <style jsx>{`
        .task-container {
          border: 1px solid var(--box-shadow-light);
          border-radius: 10px;
          width: 100%;
          align-items: center;
          gap: 0.5rem;
          justify-content: space-between;
          cursor: pointer;
          transition: 0.3s;
          color: var(--text-color);
          background: var(--box-shadow-light);
          z-index: 7;
        }
        .task-container.done {
          background: var(--done);
        }
        .task-container.working_on {
          border: 1px solid #a0a027;
          background: #57571f;
        }
        .task-container:hover {
          box-shadow: inset 1px 0 0 rgb(255 255 255 / 1%),
            inset -1px 0 0 rgb(255 255 255 / 1%), 0 0 4px 0 rgb(95 99 104 / 25%),
            0 0 6px 2px rgb(95 99 104 / 25%);
          background: var(--cool);
        }
        .task-container.done:hover {
          background: var(--done);
        }
        .time_from,
        .time_to {
          border: 1px solid var(--box-shadow-light);
          display: flex;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          font-size: 80%;
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
};

export default TaskComponent;
