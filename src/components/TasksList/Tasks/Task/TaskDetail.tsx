import { db } from "@/utils/firebase.config";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { format, formatISO, parseISO } from "date-fns";
import { selectUser } from "store/slices/authSlice";
import { setDeleteTask, setUpdateTask } from "store/slices/tasksSlice";
import { Task } from "@/global/types";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import AddSubtask from "../Subtasks/AddSubtask";
import DayPickerC from "@/components/DayPickerC/DayPickerC";
import Modal from "@/components/Modal/Modal";
import React, { useEffect, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import Subtasks from "@/components/TasksList/Tasks/Subtasks/Subtasks";
import TaskActions from "@/components/TasksList/Tasks/TaskActions/TaskActions";
import TimeInput from "@/components/Layout/Input/TimeInput";
import PlannedSpentButton from "../TaskActions/TaskActionsButtons/PlannedSpentButton";
import SpentAndPlanned from "@/components/Layout/Task/SpentAndPlanned";

const TaskID = ({
  task,
  redirectLink,
}: {
  task: Task;
  redirectLink: string;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { taskID, date, listID } = router.query;
  const { user } = useSelector(selectUser);
  const [taskState, setTaskState] = useState<Task>(task);
  const [isSaveable, setIsSaveable] = useState(false);
  const [openPlanned, setOpenPlanned] = useState(false);
  const [openSpent, setOpenSpent] = useState(false);

  useEffect(() => {
    setTaskState(task);
  }, [task, date, task]);

  useEffect(() => {
    if (isSaveable) {
      handleSave();
      setIsSaveable(false);
    }
  }, [isSaveable]);

  const handleChange = (event: React.ChangeEvent) => {
    event.preventDefault();
    const name: string = (event.target as HTMLButtonElement).name;
    const value: string = (event.target as HTMLButtonElement).value;
    const index: number = Number((event.target as HTMLButtonElement).id);
    if (name === "subtask") {
      const subtasks = [...taskState.subtasks];
      const subTask = { ...subtasks[index] };
      subTask.content = value;
      subtasks[index] = subTask;
      setTaskState({
        ...taskState,
        subtasks,
      });
    } else {
      setTaskState({
        ...taskState,
        [name]: value,
      });
    }
  };

  const handleChangeDates = (event: React.ChangeEvent) => {
    event.preventDefault();
    const name: string = (event.target as HTMLButtonElement).name;
    const value: string = (event.target as HTMLButtonElement).value;
    const newDateSet = {
      ...taskState.date_set,
      [name]: value,
    };
    setTaskState({
      ...taskState,
      ["date_set"]: newDateSet,
    });
    setIsSaveable(true);
  };

  const handleSave = async () => {
    if (JSON.stringify(task) !== JSON.stringify(taskState)) {
      if (!user) return;
      console.log("Saving taskID");
      const docRef = doc(db, "users", user.uid, "tasks", String(taskID));
      const time_from = taskState.date_set.time_from;
      const time_to = taskState.date_set.time_to;
      const taskUpdated = {
        ...taskState,
        date_set: {
          date_iso: taskState.date_set.date_iso,
          is_recurring: false,
          time_from: time_from || "",
          time_to: (time_from && time_to) || "",
          with_time: false,
        },
      };
      await setDoc(docRef, taskUpdated);
      dispatch(setUpdateTask(taskUpdated));
    }
  };

  const handleDelete = async (event: React.MouseEvent) => {
    event.preventDefault();
    router.push(redirectLink);
    if (!user) return;
    const task_id: string = (event.target as HTMLButtonElement).id;
    const docRef = doc(db, "users", user.uid, "tasks", task_id);
    dispatch(setDeleteTask(task_id));
    await deleteDoc(docRef);
  };

  const closeModalOnClick = () => {};

  const removeTime = (event: React.MouseEvent) => {
    const name: string = (event.target as HTMLButtonElement).name;
    const newDateSet = {
      ...taskState.date_set,
      [name]: "",
    };
    setTaskState({
      ...taskState,
      ["date_set"]: newDateSet,
    });
    setIsSaveable(true);
  };

  const removeDate = (event: React.MouseEvent) => {
    const name: string = (event.target as HTMLButtonElement).name;
    const newDateSet = {
      ...taskState.date_set,
      [name]: "",
    };
    setTaskState({
      ...taskState,
      ["date_set"]: newDateSet,
    });
    setIsSaveable(true);
  };

  // Date
  const dateParsed = taskState.date_set.date_iso
    ? parseISO(taskState.date_set.date_iso)
    : new Date();
  const [dateSelected, setDateSelected] = useState<Date>(dateParsed);
  const [openDateSelector, setOpenDateSelector] = useState(false);
  const [wantToAddDate, setWantToAddDate] = useState(false);

  const iso = task.date_set.date_iso;
  const isoDisplay = iso && format(parseISO(iso), "MM-dd-yyyy");
  const dateDisplayed =
    isoDisplay === format(new Date(), "MM-dd-yyyy") ? "Today" : isoDisplay;

  const handleDateSelected = (day: Date) => {
    if (day) {
      setDateSelected(day);
      const newDateSet = {
        ...taskState.date_set,
        date_iso: formatISO(day),
      };
      setTaskState({
        ...taskState,
        ["date_set"]: newDateSet,
      });
    }
    setIsSaveable(true);
  };

  const handleSeconds = (event: React.MouseEvent) => {
    const seconds = (event.target as HTMLButtonElement).value;
    const name = (event.target as HTMLButtonElement).name;
    setTaskState({
      ...taskState,
      [name]: seconds,
    });
    setIsSaveable(true);
    setOpenPlanned(false);
    setOpenSpent(false);
  };

  return (
    <Modal onCloseRedirect={redirectLink} closeModalOnClick={closeModalOnClick}>
      <div className="task-container">
        <button className="delete" onClick={handleDelete} id={String(taskID)}>
          Delete task
        </button>
        <TaskActions />
        <div className="times">
          {
            <div className="day-picker">
              {!wantToAddDate && !taskState.date_set.date_iso ? (
                <button
                  onClick={() => {
                    setWantToAddDate(true);
                    handleDateSelected(dateSelected);
                  }}
                >
                  Set Due Date
                </button>
              ) : (
                <DayPickerC
                  open={openDateSelector}
                  setOpen={setOpenDateSelector}
                  withModal={true}
                  dateSelected={dateSelected}
                  handleDateSelected={handleDateSelected}
                  dateToShow={dateDisplayed}
                  removeDate={removeDate}
                  setWantToAddDate={setWantToAddDate}
                />
              )}
            </div>
          }
          {(taskState.date_set.date_iso || !listID) && (
            <>
              <div className="time_from">
                <TimeInput
                  onBlur={() => {}}
                  name="time_from"
                  value={taskState.date_set.time_from}
                  onChange={handleChangeDates}
                  removeTime={removeDate}
                />
              </div>
              {taskState.date_set.time_from && (
                <TimeInput
                  onBlur={() => {}}
                  name="time_to"
                  value={taskState.date_set.time_to}
                  onChange={handleChangeDates}
                  removeTime={removeTime}
                />
              )}
            </>
          )}
          <div className="ml-auto flex">
            <PlannedSpentButton
              handleSeconds={handleSeconds}
              task={taskState}
            />
          </div>
        </div>
        <div className="task-content">
          <input
            type="text"
            name="content"
            value={taskState.content}
            onChange={handleChange}
            spellCheck="false"
            autoComplete="off"
            onBlur={handleSave}
          />
        </div>
        <div className="comments-container">
          <span className="title">Notes</span>
          <ReactTextareaAutosize
            minRows={2}
            name="description"
            value={taskState.description}
            placeholder="Add a description"
            onChange={handleChange}
            spellCheck="false"
            autoComplete="off"
            onBlur={handleSave}
            className="textarea"
            style={{
              boxSizing: "border-box",
              display: "flex",
              background: "transparent",
              color: "var(--text-color)",
              border: "none",
              width: "100%",
              resize: "none",
              userSelect: "all",
            }}
          />
        </div>
        <div className="subtasks">
          <span className="title">Subtasks</span>
          <Subtasks task={task} inTaskCompnent={false} />
          <AddSubtask />
        </div>
        <div className="attachments-container">
          <span className="title">Attachments</span>
          <div className="attachments"></div>
        </div>
      </div>
      <style jsx>
        {`
          .task-container {
            color: var(--text-secondary-color);
            display: flex;
            flex-direction: column;
            gap: 1rem;
            height: 85vh;
            max-height: 90vh;
            max-width: var(--max-width-task);
            overflow-y: auto;
            padding: 2rem 1.5rem;
            text-align: left;
            width: 95vw;
            pointer-events: ${task.done ? "none" : "initial"};
            opacity: ${task.done ? "0.4" : "1"};
          }
          div {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }
          input {
            background: transparent;
            border: none;
            color: var(--text-color);
            font-size: 1.5rem;
          }
          .attachments {
            width: 100%;
            border: 1px solid var(--box-shadow-light);
            padding: 0.25rem;
            height: 3rem;
            border-radius: 0.5rem;
          }
          .delete {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
          .times {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 100%;
          }
          button {
            cursor: pointer;
            background: none;
            border: 1px solid var(--box-shadow);
            color: var(--text-color);
            border-radius: 6px;
            padding: 0.25rem 0.5rem;
          }
        `}
      </style>
    </Modal>
  );
};

export default TaskID;
