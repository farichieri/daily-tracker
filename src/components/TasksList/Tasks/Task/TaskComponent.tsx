import { format, parseISO } from "date-fns";
import { Label, Task } from "@/global/types";
import { selectLists } from "store/slices/listsSlice";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import IconButton from "@/components/Layout/Icon/IconButton";
import Link from "next/link";
import Image from "next/image";
import Subtasks from "../Subtasks/Subtasks";
import ToggleDoneTask from "../TaskActions/TaskActionsButtons/ToggleDoneTask";

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
      <div className="task" id={taskID}>
        {!router.pathname.includes("tracker") && task.date_set.date_iso && (
          <div className="date_iso">
            <Link href={`/app/tracker/${task.date_set.date_iso.slice(0, 10)}`}>
              <span className={`${dateDisplayed === "Today" ? "today" : ""}`}>
                {dateDisplayed}
              </span>
            </Link>
          </div>
        )}
        <div className="times">
          {task.date_set.time_from && (
            <div className="time_from">{task.date_set.time_from}</div>
          )}
          {task.date_set.time_to && (
            <>
              -<div className="time_to">{task.date_set.time_to}</div>
            </>
          )}
        </div>
        <div className="column">
          <div className="project">
            {projects[task.project_id]?.list_name && !listID && (
              <Link href={`/app/lists/${task.project_id}`}>
                <span>📄 List {projects[task.project_id]?.list_name}</span>
              </Link>
            )}
          </div>

          <div className="content-description ">
            <div className={`name ${task.done ? "done" : ""}`}>
              {task.content}
            </div>
            {task.description && (
              <div className="description">
                {task.description.slice(0, 300)}{" "}
                {task.description.length > 300 && "..."}
              </div>
            )}
          </div>
          <div className="labels">
            {getLabelsByTask(taskID)?.map(
              (label: Label) =>
                label && (
                  <div
                    key={label.label_id}
                    className="label"
                    style={{ background: `${label.label_color}` }}
                  ></div>
                )
            )}
          </div>
          <div className="subtasks">
            <Subtasks task={task} inTaskCompnent={true} />
          </div>
        </div>
        <div className="working-on">
          {task.working_on && (
            <Image
              src={"/icons/working.png"}
              alt="working icon"
              width={25}
              height={25}
            />
          )}
        </div>
        <ToggleDoneTask task={task} />
      </div>
      <style jsx>{`
        .task-container {
          border: 1px solid var(--box-shadow);
          border-radius: 10px;
          width: 100%;
          padding: 0.5rem;
          align-items: center;
          gap: 0.5rem;
          justify-content: space-between;
          min-height: 2.5rem;
          cursor: pointer;
          transition: 0.3s;
          color: var(--text-color);
          background: var(--box-shadow-light);
          margin: 0.25rem 0;
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
        .project {
          font-size: 80%;
          display: flex;
          margin: 0;
          padding: 0;
          line-height: 1;
          pointer-events: initial;
          align-items: center;
        }

        .subtasks {
          pointer-events: initial;
        }
        .date_iso {
          min-width: fit-content;
          font-size: 70%;
          border: 1px solid var(--box-shadow);
          padding: 0.25rem;
          border-radius: 6px;
          pointer-events: initial;
        }
        .task {
          width: 100%;
          display: flex;
          pointer-events: none;
          gap: 0.35rem;
          align-items: flex-start;
        }
        .name {
          width: 100%;
          text-align: left;
          text-decoration: initial;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: normal;
          height: auto;
        }
        .name.done {
          text-decoration: line-through;
          color: var(--box-shadow);
        }
        .checkbox,
        .delete {
          pointer-events: initial;
        }
        .column {
          width: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .labels {
          display: flex;
          gap: 0.2rem;
          align-items: center;
        }
        .times {
          display: flex;
          align-items: center;
          gap: 0.2rem;
          height: 100%;
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
        .label {
          width: 1rem;
          height: 0.2rem;
          border-radius: 5px;
          margin-top: 0.25rem;
        }
        .content-description {
        }
        .description {
          white-space: wrap;
          font-size: 80%;
          text-align: left;
          opacity: 0.7;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 100%;
        }
        .working-on {
          margin: auto;
          transform: translate(-50%);
          display: flex;
          align-items: center;
        }
        .today {
          color: red;
          opacity: 0.7;
          transition: 0.3s;
        }
        .today:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default TaskComponent;
