import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase.config";
import {
  add,
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
  endOfWeek,
  format,
  formatISO,
  getDay,
  parseISO,
  startOfWeek,
} from "date-fns";
import { Label, Recurring, Task } from "@/global/types";
import { NewTaskInitial } from "@/global/initialTypes";
import { selectLabels } from "store/slices/labelsSlice";
import { selectUser } from "store/slices/authSlice";
import { setAddNewTask } from "store/slices/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import AssignLabel from "./TaskActions/TaskActionsModals/AssignLabel";
import AssignList from "./TaskActions/TaskActionsModals/AssignList";
import DayPickerC from "@/components/DayPickerC/DayPickerC";
import IconButton from "@/components/Layout/Icon/IconButton";
import LabelsButton from "@/components/TasksList/Tasks/TaskActions/TaskActionsButtons/LabelsButton";
import ListButton from "./TaskActions/TaskActionsButtons/ListButton";
import MakeRecurrent from "./TaskActions/TaskActionsModals/MakeRecurrent";
import SelectEmoji from "./TaskActions/TaskActionsModals/SelectEmoji";
import TimeInput from "@/components/Layout/Input/TimeInput";
import TimeTrackingButton from "./TaskActions/TaskActionsButtons/TimeTrackingButton";
import { maxRecurringTasks } from "@/global/importantVars";

const AddTask = ({ date }: { date: string }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const { listID } = router.query;
  const { labels } = useSelector(selectLabels);
  const [input, setInput] = useState<Task>(NewTaskInitial);
  const [openAssignLabel, setOpenAssignLabel] = useState(false);
  const [openAssignList, setOpenAssignList] = useState(false);
  const [openAddTask, setOpenAddTask] = useState(false);
  const [openRecurrent, setOpenRecurrent] = useState(false);
  const [openEmojis, setOpenEmojis] = useState(false);
  const [inputFocus, setInputFocus] = useState("content");

  const addEmoji = (event: any) => {
    const value = input[inputFocus] + " " + event.native;
    setInput({
      ...input,
      [inputFocus]: value,
    });
  };

  const handleChange = (event: React.ChangeEvent) => {
    event.preventDefault();
    const name: string = (event.target as HTMLButtonElement).name;
    const value: string = (event.target as HTMLButtonElement).value;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleChangeLabels = (labelsSelected: []) => {
    setInput({
      ...input,
      labels: labelsSelected,
    });
  };

  const handleChangeList = (listSelected: string) => {
    setInput({
      ...input,
      project_id: listSelected,
    });
  };

  const getLabelsSelected = () => {
    return input.labels?.map((label) => labels[label]);
  };

  const closeModalOnClick = () => {
    setOpenAssignLabel(false);
    setOpenAssignList(false);
    setOpenEmojis(false);
    setOpenRecurrent(false);
  };

  const handleChangeDates = (event: React.ChangeEvent) => {
    event.preventDefault();
    const name: string = (event.target as HTMLButtonElement).name;
    const value: string = (event.target as HTMLButtonElement).value;
    const newDateSet = {
      ...input.date_set,
      [name]: value,
    };
    setInput({
      ...input,
      ["date_set"]: newDateSet,
    });
  };

  const removeDate = (event: React.MouseEvent) => {
    const name: string = (event.target as HTMLButtonElement).name;
    const newDateSet = {
      ...input.date_set,
      [name]: "",
    };
    setInput({
      ...input,
      ["date_set"]: newDateSet,
    });
  };

  // Date
  const [dateSelected, setDateSelected] = useState<Date>(new Date());
  const [openDateSelector, setOpenDateSelector] = useState(false);
  const [wantToAddDate, setWantToAddDate] = useState(false);
  const dateToShow = dateSelected && format(dateSelected, "MM-dd-yyyy"); // April 2023
  const todayDisplay = format(new Date(), "MM-dd-yyyy"); // US Format
  const dateDisplayed = dateToShow === todayDisplay ? "Today" : dateToShow;
  const isoToDisplay = (isoDate: string) => {
    return format(parseISO(isoDate), "MM-dd-yyyy");
  };

  const handleDateSelected = (day: Date | undefined) => {
    if (day) {
      setDateSelected(day);
      const newDateSet = {
        ...input.date_set,
        date_iso: formatISO(day),
      };
      setInput({
        ...input,
        ["date_set"]: newDateSet,
      });
    }
  };

  const handleSeconds = (name: string, seconds: number) => {
    setInput({
      ...input,
      [name]: seconds,
    });
  };

  useEffect(() => {
    listID &&
      setInput({
        ...input,
        project_id: String(listID),
      });
  }, [listID]);

  const handleRecurring = (recurringData: Recurring, is_recurring: boolean) => {
    setInput({
      ...input,
      is_recurring: is_recurring,
      recurring: recurringData,
    });
  };

  const handleAdd = async (e: any) => {
    console.log({ input });
    e.preventDefault();
    if (!user) return;
    if (input.content) {
      const createDocAndSave = async (date_iso: string) => {
        const project_id = input.project_id ? input.project_id : "tracker";
        const time_from = input.date_set.time_from;
        const time_to = input.date_set.time_to;

        const newDocRef = doc(collection(db, "users", user.uid, "tasks"));
        const newTaskDoc: Task = {
          ...input,
          added_at: formatISO(new Date()),
          added_by_uid: user.uid,
          task_id: newDocRef.id,
          content: input.content,
          project_id: project_id,
          date_set: {
            date_iso: date_iso,
            time_from: time_from || "",
            time_to: (time_from && time_to) || "",
            with_time: false,
          },
        };
        console.log({ newTaskDoc });
        setInput(NewTaskInitial);
        dispatch(setAddNewTask(newTaskDoc));
        await setDoc(newDocRef, newTaskDoc);
      };

      if (input.is_recurring) {
        const start = parseISO(input.recurring.recurring_start);
        const end = parseISO(input.recurring.recurring_end);

        const recurring_number = input.recurring.recurring_number;
        const recurring_option = input.recurring.recurring_option;
        const recurring_days = input.recurring.recurring_days;
        const dif =
          recurring_option === "days"
            ? differenceInDays(end, start)
            : recurring_option === "weeks"
            ? differenceInWeeks(end, start)
            : maxRecurringTasks;

        const verifyStartEnd = (start: Date, end: Date, current: Date) => {
          return current >= start && current <= end;
        };

        let current = start;
        console.log({ dif });
        for (
          let i = 0;
          i <= dif && i <= maxRecurringTasks;
          i += recurring_number
        ) {
          console.log({ i });
          if (recurring_option === "days") {
            if (verifyStartEnd(start, end, current)) {
              await createDocAndSave(formatISO(current));
            }
            current = add(current, { days: recurring_number });
          } else if (recurring_option === "weeks") {
            let endWeek = endOfWeek(current, { weekStartsOn: 0 });
            for (let j = getDay(current); j <= getDay(endWeek); j++) {
              if (recurring_days.includes(getDay(current))) {
                if (verifyStartEnd(start, end, current)) {
                  await createDocAndSave(formatISO(current));
                }
              }
              if (getDay(current) < getDay(endWeek)) {
                current = add(current, { days: 1 });
              }
            }
            current = startOfWeek(add(current, { weeks: recurring_number }), {
              weekStartsOn: 0,
            });
          }
        }
      } else {
        const date_iso = listID
          ? input.date_set.date_iso
          : formatISO(parseISO(String(date)));
        await createDocAndSave(date_iso);
      }
    }
  };

  return (
    <div className="flex w-full min-w-fit max-w-min justify-center text-xs">
      {openAssignLabel && (
        <AssignLabel
          closeModalOnClick={closeModalOnClick}
          isNewTask={true}
          task={input}
          handleChangeLabels={handleChangeLabels}
        />
      )}
      {openAssignList && (
        <AssignList
          closeModalOnClick={closeModalOnClick}
          isNewTask={true}
          task={input}
          handleChangeList={handleChangeList}
        />
      )}
      {openEmojis && (
        <SelectEmoji
          closeModalOnClick={closeModalOnClick}
          handleChange={addEmoji}
        />
      )}
      {openRecurrent && (
        <MakeRecurrent
          closeModalOnClick={closeModalOnClick}
          handleRecurring={handleRecurring}
        />
      )}
      {!openAddTask ? (
        <div>
          <IconButton
            props={{}}
            onClick={() => setOpenAddTask(true)}
            src={"/icons/add.png"}
            alt="Add-Icon"
            width={24}
            height={24}
          />
        </div>
      ) : (
        <form className="new-task" onSubmit={handleAdd}>
          <div className="absolute top-1 right-1 m-1 scale-90 rounded-full duration-300 hover:scale-100">
            <IconButton
              props={{ type: "button" }}
              onClick={(e) => {
                e.preventDefault();
                setOpenAddTask(false);
                setInput(NewTaskInitial);
              }}
              src={"/icons/delete.png"}
              alt="Delete-Icon"
              width={20}
              height={20}
            />
          </div>
          <div className="content-container">
            <div className="flex w-full">
              <div className="flex w-full flex-col">
                <div className="row">
                  <button
                    className="cursor-pointer"
                    onClick={(event) => {
                      event.preventDefault();
                      setOpenEmojis(true);
                    }}
                  >
                    😃
                  </button>
                  <input
                    type="text"
                    name="content"
                    placeholder="Add Task"
                    value={input.content}
                    onFocus={() => setInputFocus("content")}
                    onChange={handleChange}
                    spellCheck="false"
                    autoComplete="off"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAdd(e);
                      }
                    }}
                  />
                </div>
                <div className="row">
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    onFocus={() => setInputFocus("description")}
                    value={input.description}
                    onChange={handleChange}
                    spellCheck="false"
                    autoComplete="off"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAdd(e);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="flex w-fit min-w-fit flex-col pr-10">
                <TimeTrackingButton
                  handleSeconds={handleSeconds}
                  inTaskCompnent={false}
                  task={input}
                  sumOfPlanned={0}
                  sumOfSpent={0}
                />
              </div>
            </div>
            <div className="row">
              <div className="labels">
                {getLabelsSelected().map(
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
            </div>
            <div className="row max-w-fit flex-wrap ">
              {listID && (
                <div className="day-picker">
                  {!wantToAddDate ? (
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
                      addTask={true}
                      dateSelected={dateSelected}
                      dateToShow={dateDisplayed}
                      handleDateSelected={handleDateSelected}
                      open={openDateSelector}
                      removeDate={removeDate}
                      setOpen={setOpenDateSelector}
                      setWantToAddDate={setWantToAddDate}
                      withModal={true}
                    />
                  )}
                </div>
              )}
              {(input.date_set.date_iso || !listID) && (
                <>
                  <div className="time_from">
                    <TimeInput
                      onBlur={() => {}}
                      name="time_from"
                      value={input.date_set.time_from}
                      onChange={handleChangeDates}
                      removeTime={removeDate}
                    />
                  </div>
                  {input.date_set.time_from && (
                    <TimeInput
                      onBlur={() => {}}
                      name="time_to"
                      value={input.date_set.time_to}
                      onChange={handleChangeDates}
                      removeTime={removeDate}
                    />
                  )}
                </>
              )}
              <div className="labels">
                <LabelsButton
                  onClick={(event) => {
                    event.preventDefault();
                    setOpenAssignLabel(true);
                  }}
                />
              </div>
              <div className="labels">
                <ListButton
                  onClick={(event) => {
                    event.preventDefault();
                    setOpenAssignList(true);
                  }}
                  task={input}
                />
              </div>
              <div className="recurring">
                {!input.is_recurring ? (
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      setOpenRecurrent(true);
                    }}
                  >
                    Make it recurrent
                  </button>
                ) : (
                  <div
                    className="cursor-pointer rounded-md border border-red-400 p-1"
                    onClick={(event) => {
                      event.preventDefault();
                      setOpenRecurrent(true);
                    }}
                  >
                    Repeat every{" "}
                    <span className="text-red-400">
                      {input.recurring.recurring_number}
                    </span>{" "}
                    <span className="text-red-400">
                      {input.recurring.recurring_option}
                    </span>{" "}
                    will start{" "}
                    <span className="text-red-400">
                      {isoToDisplay(input.recurring.recurring_start)}
                    </span>{" "}
                    and end{" "}
                    <span className="text-red-400">
                      {isoToDisplay(input.recurring.recurring_end)}
                    </span>
                  </div>
                )}
              </div>
              <div className="w-full">
                <button
                  className="ml-auto flex w-16 justify-center"
                  onClick={handleAdd}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
      <style jsx>{`
        .new-task {
          border: 1px solid var(--box-shadow-light);
          border-radius: 1rem;
          width: 100%;
          display: flex;
          padding: 0.75rem;
          align-items: center;
          gap: 0.5rem;
          justify-content: space-between;
          min-height: 5rem;
          transition: 0.3s;
          background: var(--box-shadow-light);
          position: relative;
        }
        .new-task:hover,
        .new-task:focus-within {
          outline: white;
          border: 1px solid var(--box-shadow);
        }
        .content-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 0.25rem;
        }
        .row {
          width: 100%;
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        input {
          display: flex;
          border: none;
          padding: 0;
          width: 100%;
          outline: none;
          background: transparent;
          color: var(--text-color);
        }
        input[name="description"] {
          font-size: 80%;
        }
        .add-time_to {
          background: none;
          border-radius: 6px;
          color: var(--text-color);
          border: 1px solid var(--box-shadow);
        }
        button {
          cursor: pointer;
          background: none;
          border: 1px solid var(--box-shadow);
          color: var(--text-color);
          border-radius: 6px;
          padding: 0.25rem 0.5rem;
        }
        .labels {
          display: flex;
          gap: 0.2rem;
          align-items: center;
        }
        .label {
          width: 1rem;
          height: 0.2rem;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default AddTask;
