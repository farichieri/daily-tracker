import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase.config";
import { formatISO } from "date-fns";
import { NewTaskInitial } from "@/global/initialTypes";
import { selectUser } from "store/slices/authSlice";
import { setAddNewTask } from "store/slices/tasksSlice";
import { Task } from "@/global/types";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import IconButton from "@/components/Layout/Icon/IconButton";

interface Props {
  parentTask: Task;
}
const AddSubtask: React.FC<Props> = ({ parentTask }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { taskID } = router.query;
  const { user } = useSelector(selectUser);
  const [newSubtaskState, setNewSbutaskState] = useState<Task>(NewTaskInitial);

  const handleAddSubtask = async (e: any) => {
    e.preventDefault();
    if (!user) return;
    if (newSubtaskState.content) {
      const project_id = newSubtaskState.project_id
        ? newSubtaskState.project_id
        : "tracker";

      const newDocRef = doc(collection(db, "users", user.uid, "tasks"));
      const newSubtask: Task = {
        ...newSubtaskState,
        added_at: formatISO(new Date()),
        added_by_uid: user.uid,
        task_id: newDocRef.id,
        content: newSubtaskState.content,
        project_id: project_id,
        parent_id: String(taskID),
        date_set: {
          ...newSubtaskState.date_set,
          date_only: parentTask.date_set.date_only,
        },
      };
      setNewSbutaskState(NewTaskInitial);
      dispatch(setAddNewTask(newSubtask));
      // Verify if there is an error with firebase.
      await setDoc(newDocRef, newSubtask);
    }
  };

  const handleChange = (event: React.ChangeEvent) => {
    const name: string = (event.target as HTMLButtonElement).name;
    const value: string = (event.target as HTMLButtonElement).value;
    setNewSbutaskState({
      ...newSubtaskState,
      [name]: value,
    });
  };

  return (
    <form
      onSubmit={handleAddSubtask}
      className="g-1 flex items-center rounded-md border border-[var(--box-shadow-light)] p-1 focus-within:border-[var(--text-color)]"
    >
      <input
        type="text"
        placeholder="Add a subtask"
        name="content"
        value={newSubtaskState.content}
        onChange={handleChange}
        readOnly={newSubtaskState.done}
        spellCheck="false"
        autoComplete="off"
        className="w-full border-transparent bg-transparent p-1 text-[var(--text-color)] outline-none  "
      />
      <IconButton
        props={{ type: "submit" }}
        onClick={handleAddSubtask}
        src={"/icons/add.png"}
        alt="Add-Icon"
        width={24}
        height={24}
      />
    </form>
  );
};

export default AddSubtask;
