import { db } from "@/utils/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { selectUser } from "store/slices/authSlice";
import { setUpdateTask } from "store/slices/tasksSlice";
import { Task } from "@/global/types";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@/components/Layout/Icon/IconButton";

const ToggleDoneTask = ({ task }: { task: Task }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);

  const handleToggleDone = (event: React.MouseEvent) => {
    event.preventDefault();
    const taskUpdated: Task = { ...task };
    taskUpdated.done = !task.done;
    taskUpdated.working_on = false;
    handleSave(taskUpdated);
  };

  const handleSave = async (taskUpdated: Task) => {
    console.log({ taskUpdated });
    if (JSON.stringify(taskUpdated) !== JSON.stringify(task)) {
      if (!user) return;
      console.log("Saving DayTask");
      const docRef = doc(db, "users", user.uid, "tasks", taskUpdated.task_id);
      dispatch(setUpdateTask(taskUpdated));
      await setDoc(docRef, taskUpdated);
    }
  };

  return (
    <div className="pointer-events-auto m-auto">
      <IconButton
        onClick={handleToggleDone}
        props={{ id: task.task_id }}
        src={task.done ? "/icons/checkbox-done.png" : "/icons/checkbox.png"}
        alt={task.done ? "Done-Icon" : "Checkbox-Icon"}
        width={16}
        height={16}
      />
    </div>
  );
};

export default ToggleDoneTask;
