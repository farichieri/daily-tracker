import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase.config";
import { format, formatISO, parseISO } from "date-fns";
import { Label, Task } from "@/global/types";
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
import PlannedSpentButton from "./TaskActions/TaskActionsButtons/TimeTrackingButton";
import TimeInput from "@/components/Layout/Input/TimeInput";
import MakeRecurrent from "./TaskActions/TaskActionsButtons/MakeRecurrent";

const AddTask = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const { listID, date } = router.query;
  const { labels } = useSelector(selectLabels);
  const [newTaskState, setNewTaskState] = useState<Task>(NewTaskInitial);
  const [openAssignLabel, setOpenAssignLabel] = useState(false);
  const [openAssignList, setOpenAssignList] = useState(false);
  const [openAddTask, setOpenAddTask] = useState(false);

  const handleChange = (event: React.ChangeEvent) => {
    event.preventDefault();
    const name: string = (event.target as HTMLButtonElement).name;
    const value: string = (event.target as HTMLButtonElement).value;
    setNewTaskState({
      ...newTaskState,
      [name]: value,
    });
  };

  const handleChangeLabels = (labelsSelected: []) => {
    setNewTaskState({
      ...newTaskState,
      labels: labelsSelected,
    });
  };

  const handleChangeList = (listSelected: string) => {
    setNewTaskState({
      ...newTaskState,
      project_id: listSelected,
    });
  };

  const getLabelsSelected = () => {
    return newTaskState.labels?.map((label) => labels[label]);
  };

  const handleAdd = async (e: any) => {
    e.preventDefault();
    if (!user) return;
    if (newTaskState.content) {
      const project_id = newTaskState.project_id
        ? newTaskState.project_id
        : "tracker";
      const date_iso = listID
        ? newTaskState.date_set.date_iso
        : formatISO(parseISO(String(date)));
      const time_from = newTaskState.date_set.time_from;
      const time_to = newTaskState.date_set.time_to;

      const newDocRef = doc(collection(db, "users", user.uid, "tasks"));
      const newTask: Task = {
        ...newTaskState,
        added_at: formatISO(new Date()),
        added_by_uid: user.uid,
        task_id: newDocRef.id,
        content: newTaskState.content,
        project_id: project_id,
        date_set: {
          date_iso: date_iso,
          is_recurring: false,
          time_from: time_from || "",
          time_to: (time_from && time_to) || "",
          with_time: false,
        },
      };
      console.log({ newTask });
      setNewTaskState(NewTaskInitial);
      dispatch(setAddNewTask(newTask));
      // Verify if there is an error with firebase.
      await setDoc(newDocRef, newTask);
    }
  };

  const closeModalOnClick = () => {
    setOpenAssignLabel(false);
    setOpenAssignList(false);
  };

  const handleChangeDates = (event: React.ChangeEvent) => {
    event.preventDefault();
    const name: string = (event.target as HTMLButtonElement).name;
    const value: string = (event.target as HTMLButtonElement).value;
    const newDateSet = {
      ...newTaskState.date_set,
      [name]: value,
    };
    setNewTaskState({
      ...newTaskState,
      ["date_set"]: newDateSet,
    });
  };

  const removeDate = (event: React.MouseEvent) => {
    const name: string = (event.target as HTMLButtonElement).name;
    const newDateSet = {
      ...newTaskState.date_set,
      [name]: "",
    };
    setNewTaskState({
      ...newTaskState,
      ["date_set"]: newDateSet,
    });
  };

  // Date
  const [dateSelected, setDateSelected] = useState<Date>(new Date());
  const [openDateSelector, setOpenDateSelector] = useState(false);
  const dateToShow = dateSelected && format(dateSelected, "MM-dd-yyyy"); // April 2023
  const [wantToAddDate, setWantToAddDate] = useState(false);

  const handleDateSelected = (day: Date | undefined) => {
    if (day) {
      setDateSelected(day);
      const newDateSet = {
        ...newTaskState.date_set,
        date_iso: formatISO(day),
      };
      setNewTaskState({
        ...newTaskState,
        ["date_set"]: newDateSet,
      });
    }
  };

  const todayDisplay = format(new Date(), "MM-dd-yyyy"); // US Format
  const dateDisplayed = dateToShow === todayDisplay ? "Today" : dateToShow;

  const handleSeconds = (name: string, seconds: number) => {
    setNewTaskState({
      ...newTaskState,
      [name]: seconds,
    });
  };

  useEffect(() => {
    listID &&
      setNewTaskState({
        ...newTaskState,
        project_id: String(listID),
      });
  }, [listID]);

  return (
    <div className="container">
      {!openAddTask ? (
        <div>
          <button onClick={(e) => setOpenAddTask(true)}>Add Task</button>
        </div>
      ) : (
        <form className="new-task" onSubmit={handleAdd}>
          <div className="absolute top-1 right-1 m-1 scale-90 rounded-full duration-300 hover:scale-100">
            <IconButton
              props={{}}
              onClick={(e) => setOpenAddTask(false)}
              src={"/icons/delete.png"}
              alt="Delete-Icon"
              width={20}
              height={20}
            />
          </div>
          {openAssignLabel && (
            <AssignLabel
              closeModalOnClick={closeModalOnClick}
              isNewTask={true}
              task={newTaskState}
              handleChangeLabels={handleChangeLabels}
            />
          )}
          {openAssignList && (
            <AssignList
              closeModalOnClick={closeModalOnClick}
              isNewTask={true}
              task={newTaskState}
              handleChangeList={handleChangeList}
            />
          )}
          <div className="content-container">
            <div className="flex w-full">
              <div className="flex w-full flex-col">
                <div className="row">
                  <input
                    type="text"
                    name="content"
                    placeholder="Add Task"
                    value={newTaskState.content}
                    onChange={handleChange}
                    spellCheck="false"
                    autoComplete="off"
                  />
                </div>
                <div className="row">
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newTaskState.description}
                    onChange={handleChange}
                    spellCheck="false"
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="flex w-fit min-w-fit flex-col pr-10">
                <PlannedSpentButton
                  handleSeconds={handleSeconds}
                  inTaskCompnent={false}
                  task={newTaskState}
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
            <div className="row">
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
                      open={openDateSelector}
                      setOpen={setOpenDateSelector}
                      withModal={true}
                      dateSelected={dateSelected}
                      handleDateSelected={handleDateSelected}
                      dateToShow={dateDisplayed}
                      removeDate={removeDate}
                      setWantToAddDate={setWantToAddDate}
                      addTask={true}
                    />
                  )}
                </div>
              )}
              {(newTaskState.date_set.date_iso || !listID) && (
                <>
                  <div className="time_from">
                    <TimeInput
                      onBlur={() => {}}
                      name="time_from"
                      value={newTaskState.date_set.time_from}
                      onChange={handleChangeDates}
                      removeTime={removeDate}
                    />
                  </div>
                  {newTaskState.date_set.time_from && (
                    <TimeInput
                      onBlur={() => {}}
                      name="time_to"
                      value={newTaskState.date_set.time_to}
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
                  task={newTaskState}
                />
              </div>
              <div className="recurring">
                <MakeRecurrent />
              </div>
              <div className="add-button">
                <IconButton
                  props={null}
                  onClick={handleAdd}
                  src={"/icons/add.png"}
                  alt="Add-Icon"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </div>
        </form>
      )}

      <style jsx>{`
        .container {
          display: flex;
          width: 100%;
          min-width: 100%;
          justify-content: center;
          margin: auto;
        }
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
        .add-button {
          margin-left: auto;
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
