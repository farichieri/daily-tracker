import { db } from "@/utils/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { filterSubtasks, getParentTaskSeconds } from "@/hooks/helpers";
import { format, formatISO, parseISO } from "date-fns";
import { selectTasks, setUpdateTask } from "store/slices/tasksSlice";
import { selectUser } from "store/slices/authSlice";
import { Task, TasksArray, TasksGroup } from "@/global/types";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import AddSubtask from "../Subtasks/AddSubtask";
import DayPickerC from "@/components/DayPickerC/DayPickerC";
import Image from "next/image";
import Modal from "@/components/Modal/Modal";
import React, { useEffect, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import SelectEmoji from "../TaskActions/TaskActionsModals/SelectEmoji";
import Subtasks from "@/components/TasksList/Tasks/Subtasks/Subtasks";
import TaskActions from "@/components/TasksList/Tasks/TaskActions/TaskActions";
import TaskBehaviors from "../TaskActions/TaskBehaviors";
import TimeInput from "@/components/Layout/Input/TimeInput";
import TimeTrackingButton from "../TaskActions/TaskActionsButtons/TimeTrackingButton";

const TaskDetail = ({
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
  const { tasks } = useSelector(selectTasks);
  const subTasks: TasksGroup = filterSubtasks(tasks, task.task_id);
  const sortedArray = Object.values(subTasks).sort((a, b) =>
    a.date_set.time_from.localeCompare(b.date_set.time_from)
  );
  const [subtasksState, setSubtasksState] = useState<TasksArray>(sortedArray);
  const secondsSpent = getParentTaskSeconds(subTasks, task);
  const [openEmojis, setOpenEmojis] = useState(false);
  const [inputFocus, setInputFocus] = useState("content");

  useEffect(() => {
    setSubtasksState(sortedArray);
  }, [tasks]);
  useEffect(() => {
    setTaskState(task);
  }, [task, date]);

  useEffect(() => {
    if (isSaveable) {
      handleSave();
      setIsSaveable(false);
    }
  }, [isSaveable]);

  const addEmoji = (event: any) => {
    const value = taskState[inputFocus] + " " + event.native;
    setTaskState({
      ...taskState,
      [inputFocus]: value,
    });
  };

  const handleChange = (event: React.ChangeEvent) => {
    event.preventDefault();
    const name: string = (event.target as HTMLButtonElement).name;
    const value: string = (event.target as HTMLButtonElement).value;
    setTaskState({
      ...taskState,
      [name]: value,
    });
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
          time_from: time_from || "",
          time_to: (time_from && time_to) || "",
          with_time: false,
        },
      };
      await setDoc(docRef, taskUpdated);
      console.log({ taskUpdated });
      dispatch(setUpdateTask(taskUpdated));
    }
  };

  const closeModalOnClick = () => {
    setOpenEmojis(false);
    handleSave();
  };

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

  const handleSeconds = (name: string, seconds: number) => {
    setTaskState({
      ...taskState,
      [name]: seconds,
    });
    setIsSaveable(true);
  };

  return (
    <Modal onCloseRedirect={redirectLink} closeModalOnClick={closeModalOnClick}>
      <div
        className={`flex h-[85vh] max-h-[90vh] w-[95vw] max-w-[var(--max-width-task)] flex-col gap-4 overflow-y-auto rounded-3xl border px-6 py-4 text-left ${
          task.done
            ? "pointer-events-none border-[var(--b-done)] opacity-40"
            : task.working_on
            ? "pointer-events-auto border-[var(--b-working-on)] opacity-100"
            : "pointer-events-auto border-transparent opacity-100"
        } `}
      >
        <TaskBehaviors redirectLink={redirectLink} task={task} />
        <TaskActions />
        <div className="flex  items-center gap-2">
          <div className="day-picker">
            {!wantToAddDate && !taskState.date_set.date_iso ? (
              <button
                className="rounded-lg border border-[var(--box-shadow-light)] p-1"
                onClick={() => {
                  setWantToAddDate(true);
                  handleDateSelected(dateSelected);
                }}
              >
                Set Due Date
              </button>
            ) : (
              <div className="rounded-md border border-[var(--box-shadow)] p-1">
                <DayPickerC
                  open={openDateSelector}
                  setOpen={setOpenDateSelector}
                  withModal={false}
                  dateSelected={dateSelected}
                  handleDateSelected={handleDateSelected}
                  dateToShow={dateDisplayed}
                  removeDate={removeDate}
                  setWantToAddDate={setWantToAddDate}
                  addTask={true}
                />
              </div>
            )}
          </div>

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
            <TimeTrackingButton
              sumOfSpent={secondsSpent.seconds_spent}
              sumOfPlanned={secondsSpent.seconds_planned}
              inTaskCompnent={false}
              handleSeconds={handleSeconds}
              task={taskState}
            />
          </div>
        </div>
        {openEmojis && (
          <SelectEmoji
            closeModalOnClick={closeModalOnClick}
            handleChange={addEmoji}
          />
        )}
        <div className="flex items-center gap-2">
          <button
            className="flex cursor-pointer items-center justify-center rounded-md border border-shadow-color-l p-1"
            onClick={(event) => {
              event.preventDefault();
              setOpenEmojis(true);
            }}
          >
            😃
          </button>
          <ReactTextareaAutosize
            minRows={1}
            name="content"
            value={taskState.content}
            onFocus={() => setInputFocus("description")}
            placeholder="Add a note"
            onChange={handleChange}
            spellCheck="false"
            autoComplete="off"
            onBlur={handleSave}
            className="w-full resize-none overflow-hidden rounded-md border border-shadow-color-l bg-transparent p-1 text-2xl font-semibold"
          />
          {task.is_recurring && (
            <div className="border-gray-800">
              <Image
                src={"/icons/repeat.png"}
                alt="Repeat icon"
                width={14}
                height={14}
              />
            </div>
          )}
        </div>
        <div className="comments-container">
          <span className="title">Notes</span>
          <ReactTextareaAutosize
            minRows={2}
            name="description"
            value={taskState.description}
            onFocus={() => setInputFocus("description")}
            placeholder="Add a note"
            onChange={handleChange}
            spellCheck="false"
            autoComplete="off"
            onBlur={handleSave}
            className="text-md w-full resize-none overflow-hidden rounded-md border border-shadow-color-l bg-transparent p-1"
          />
        </div>
        <div className="subtasks">
          <span className="title">Subtasks</span>
          <div className="flex w-full flex-col justify-between gap-1 py-2">
            <Subtasks
              task={task}
              inTaskCompnent={false}
              subtasks={subtasksState}
            />
          </div>
          <AddSubtask />
        </div>
        <div className="sessions">
          <span>Split in sessions</span>
        </div>
        <div className="flex flex-col">
          <span className="title">Attachments</span>
          <div className="flex h-14 w-full rounded-md border border-shadow-color-l"></div>
        </div>
      </div>
    </Modal>
  );
};

export default TaskDetail;
