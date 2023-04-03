import { db } from "@/utils/firebase.config";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { formatISO } from "date-fns";
import { selectUser } from "store/slices/authSlice";
import {
  setAddNewTask,
  setDeleteTask,
  setUpdateTask,
} from "store/slices/tasksSlice";
import { Task } from "@/global/types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import IconButton from "@/components/Layout/Icon/IconButton";
import TimeTrackingButton from "../TaskActions/TaskActionsButtons/TimeTrackingButton";

const Subtask = ({
  subTask,
  inTaskCompnent,
  parentTask,
}: {
  parentTask: Task;
  subTask: Task;
  inTaskCompnent: boolean;
}) => {
  const [isSaveable, setIsSaveable] = useState(false);
  const [subtask, setSubtask] = useState<Task>(subTask);
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    setSubtask(subTask);
  }, [subTask]);

  const handleChange = (event: React.ChangeEvent) => {
    event.preventDefault();
    const name: string = (event.target as HTMLButtonElement).name;
    const value: string = (event.target as HTMLButtonElement).value;
    setSubtask({
      ...subtask,
      [name]: value,
    });
  };

  const handleDelete = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (!user) return;
    const taskID: string = (event.target as HTMLButtonElement).id;
    const docRef = doc(db, "users", user.uid, "tasks", taskID);
    dispatch(setDeleteTask(taskID));
    await deleteDoc(docRef);
  };

  const handleClone = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (!user) return;
    const taskID: string = (event.target as HTMLButtonElement).id;
    const newDocRef = doc(collection(db, "users", user.uid, "tasks"));
    const newSubtask: Task = {
      ...subtask,
      added_at: formatISO(new Date()),
      added_by_uid: user.uid,
      task_id: newDocRef.id,
      parent_id: subtask.parent_id,
    };
    console.log({ newSubtask });
    dispatch(setAddNewTask(newSubtask));
    // Verify if there is an error with firebase.
    await setDoc(newDocRef, newSubtask);
  };

  const handleDoneSubtask = (event: React.MouseEvent) => {
    event.preventDefault();
    const taskID: string = (event.target as HTMLButtonElement).id;
    if (parentTask.done) return;
    if (!taskID) return;
    setSubtask({
      ...subtask,
      done: !subtask.done,
      completed_at: subtask.completed_at ? "" : formatISO(new Date()),
    });
    setIsSaveable(true);
  };

  const handleSave = async () => {
    if (JSON.stringify(subTask) !== JSON.stringify(subtask)) {
      console.log("Saving Subtask");
      if (!user) return;
      const updatedSubtask = {
        ...subtask,
        completed_at: subtask.completed_at ? "" : formatISO(new Date()),
      };
      const docRef = doc(
        db,
        "users",
        user.uid,
        "tasks",
        updatedSubtask.task_id
      );
      dispatch(setUpdateTask(updatedSubtask));
      await setDoc(docRef, updatedSubtask);
    }
  };

  const handleBlur = (event: React.ChangeEvent) => {
    console.log("Blur activated");
    event.preventDefault();
    setIsSaveable(true);
  };

  useEffect(() => {
    if (isSaveable) {
      handleSave();
      setIsSaveable(false);
    }
  }, [isSaveable, subTask]);

  useEffect(() => {
    if (parentTask.done) {
      setSubtask({
        ...subtask,
        done: true,
      });
      setIsSaveable(true);
    }
  }, [parentTask]);

  const handleSeconds = (name: string, seconds: number) => {
    setSubtask({
      ...subtask,
      [name]: seconds,
    });
    setIsSaveable(true);
  };

  return (
    <div
      className={`flex items-center justify-center gap-0.5 border-b border-b-transparent  ${
        inTaskCompnent ? "text-[10px]" : "pb-0.5 text-sm "
      } `}
    >
      <IconButton
        onClick={handleDoneSubtask}
        props={{ name: "done", id: subtask.task_id }}
        src={subtask.done ? "/icons/checkbox-done.png" : "/icons/checkbox.png"}
        alt={subtask.done ? "Done-Icon" : "Checkbox-Icon"}
        width={14}
        height={14}
      />
      <input
        type="text"
        placeholder="Add a subTaskState"
        value={subtask.content}
        name={"content"}
        onChange={handleChange}
        id={subtask.task_id}
        className={`flex w-full border-transparent bg-transparent pb-0.5 text-[var(--text-color)] outline-none ${
          inTaskCompnent
            ? "pointer-events-none cursor-pointer"
            : "pointer-events-auto"
        } ${
          subtask.done
            ? "cursor-default text-[var(--box-shadow)] line-through"
            : "cursor-text"
        }`}
        readOnly={subtask.done}
        spellCheck="false"
        autoComplete="off"
        onBlur={handleBlur}
      />
      <div className="ml-auto flex items-center">
        <TimeTrackingButton
          sumOfSpent={0}
          sumOfPlanned={0}
          inTaskCompnent={inTaskCompnent}
          handleSeconds={handleSeconds}
          task={subtask}
        />
      </div>
      {subtask.done && !inTaskCompnent && (
        <div className="delete">
          <IconButton
            props={{ id: subtask.task_id }}
            onClick={handleDelete}
            src={"/icons/delete.png"}
            alt="Delete-Icon"
            width={16}
            height={16}
          />
        </div>
      )}
      {!inTaskCompnent && (
        <div className="delete">
          <IconButton
            props={{ id: subtask.task_id }}
            onClick={handleClone}
            src={"/icons/clone.png"}
            alt="Delete-Icon"
            width={16}
            height={16}
          />
        </div>
      )}
    </div>
  );
};

export default Subtask;
