import { db } from "@/utils/firebase.config";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { format, formatISO, parseISO } from "date-fns";
import { Goal } from "@/global/types";
import { selectTasks } from "store/slices/tasksSlice";
import { selectUser } from "store/slices/authSlice";
import { setDeleteGoal, setUpdateGoal } from "store/slices/goalsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import DayPickerC from "@/components/DayPickerC/DayPickerC";
import Modal from "@/components/Modal/Modal";
import React, { useEffect, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

const GoalDetail = ({
  goal,
  redirectLink,
}: {
  goal: Goal;
  redirectLink: string;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { goalID, date } = router.query;
  const { tasks } = useSelector(selectTasks);
  const { user } = useSelector(selectUser);
  const [goalState, setGoalState] = useState<Goal>(goal);
  const [isSaveable, setIsSaveable] = useState(false);

  useEffect(() => {
    setGoalState(goal);
  }, [goal, date, goal]);

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
    setGoalState({
      ...goalState,
      [name]: value,
    });
  };

  const handleSave = async () => {
    if (JSON.stringify(goal) !== JSON.stringify(goalState)) {
      if (!user) return;
      console.log("Saving taskID");
      const docRef = doc(db, "users", user.uid, "goals", String(goalID));
      const time_from = goalState.date_set.time_from;
      const time_to = goalState.date_set.time_to;
      const goalUpdated = {
        ...goalState,
        date_set: {
          date_iso: goalState.date_set.date_iso,
          is_recurring: false,
          time_from: time_from || "",
          time_to: (time_from && time_to) || "",
          with_time: false,
        },
      };
      await setDoc(docRef, goalUpdated);
      dispatch(setUpdateGoal(goalUpdated));
    }
  };

  const handleDelete = async (event: React.MouseEvent) => {
    event.preventDefault();
    router.push(redirectLink);
    if (!user) return;
    const id: string = (event.target as HTMLButtonElement).id;
    const docRef = doc(db, "users", user.uid, "goals", id);
    dispatch(setDeleteGoal(id));
    await deleteDoc(docRef);
  };

  const closeModalOnClick = () => {};

  const removeDate = (event: React.MouseEvent) => {
    const name: string = (event.target as HTMLButtonElement).name;
    const newDateSet = {
      ...goalState.date_set,
      [name]: "",
    };
    setGoalState({
      ...goalState,
      ["date_set"]: newDateSet,
    });
    setIsSaveable(true);
  };

  // Date
  const dateParsed = goalState.date_set.date_iso
    ? parseISO(goalState.date_set.date_iso)
    : new Date();
  const [dateSelected, setDateSelected] = useState<Date>(dateParsed);
  const [openDateSelector, setOpenDateSelector] = useState(false);
  const [wantToAddDate, setWantToAddDate] = useState(false);

  const iso = goal.date_set.date_iso;
  const isoDisplay = iso && format(parseISO(iso), "MM-dd-yyyy");
  const dateDisplayed =
    isoDisplay === format(new Date(), "MM-dd-yyyy") ? "Today" : isoDisplay;

  const handleDateSelected = (day: Date) => {
    if (day) {
      setDateSelected(day);
      const newDateSet = {
        ...goalState.date_set,
        date_iso: formatISO(day),
      };
      setGoalState({
        ...goalState,
        ["date_set"]: newDateSet,
      });
    }
    setIsSaveable(true);
  };

  return (
    <Modal onCloseRedirect={redirectLink} closeModalOnClick={closeModalOnClick}>
      <div className="flex h-screen w-screen max-w-screen-md flex-col justify-between gap-2 p-5 text-left md:max-h-75vh">
        <button
          className="flex w-max rounded-lg border py-1 px-2"
          onClick={handleDelete}
          id={String(goalID)}
        >
          Delete goal
        </button>
        {/* <TaskActions /> */}
        <div className="my-2 flex w-full items-center gap-2">
          <span className="flex items-center ">Due date</span>
          {
            <div className="flex">
              {!wantToAddDate && !goalState.date_set.date_iso ? (
                <button
                  onClick={() => {
                    setWantToAddDate(true);
                    handleDateSelected(dateSelected);
                  }}
                >
                  Set
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
        </div>
        <div className="goal-content">
          <input
            className="w-full bg-transparent py-1 text-3xl font-medium"
            type="text"
            name="content"
            value={goalState.content}
            onChange={handleChange}
            spellCheck="false"
            autoComplete="off"
            onBlur={handleSave}
          />
        </div>
        <div className="">
          <span className="title">Notes</span>
          <ReactTextareaAutosize
            name="description"
            value={goalState.description}
            placeholder="Add a description"
            onChange={handleChange}
            spellCheck="false"
            autoComplete="off"
            onBlur={handleSave}
            minRows={4}
            className="textarea"
            style={{
              boxSizing: "border-box",
              display: "flex",
              background: "transparent",
              color: "var(--text-color)",
              border: "1px solid var(--box-shadow)",
              padding: "0.25rem",
              borderRadius: "6px",
              width: "100%",
              resize: "none",
              userSelect: "all",
            }}
          />
        </div>
        <div className="h-full">
          <span className="h-full">Checklist</span>
          {/* <Subtasks goal={goal} inTaskCompnent={false} /> */}
        </div>
        <div className="attachments-container">
          <span className="title">Attachments</span>
          <div className="grid h-16 place-content-center rounded-lg border border-gray-500">
            +
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GoalDetail;
