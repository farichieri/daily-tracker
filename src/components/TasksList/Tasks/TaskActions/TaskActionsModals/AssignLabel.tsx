import { db } from "@/utils/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { selectLabels } from "store/slices/labelsSlice";
import { selectUser } from "store/slices/authSlice";
import { setUpdateTask } from "store/slices/tasksSlice";
import { Task } from "@/global/types";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import IconButton from "@/components/Layout/Icon/IconButton";
import Modal from "@/components/Modal/Modal";

const AssignLabel = ({
  closeModalOnClick,
  isNewTask,
  task,
  handleChangeLabels,
}: {
  closeModalOnClick: Function;
  isNewTask: boolean;
  task: Task;
  handleChangeLabels: Function;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { taskID } = router.query;
  const { labels } = useSelector(selectLabels);
  const { user } = useSelector(selectUser);
  const [labelsSelected, setLabelsSelected] = useState<string[]>(task.labels);

  const handleToggleLabel = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log({ event });
    const id = (event.target as HTMLButtonElement).id;
    const labelExists = labelsSelected.indexOf(id) !== -1;
    const newLabelsSelected = [...labelsSelected];
    labelExists
      ? newLabelsSelected.splice(labelsSelected.indexOf(id), 1)
      : newLabelsSelected.push(id);
    setLabelsSelected(newLabelsSelected);
  };

  const handleSave = async () => {
    if (isNewTask) {
      handleChangeLabels(labelsSelected);
      closeModalOnClick();
    } else {
      if (!user) return;
      console.log("Saving Labels in taskID");
      task.labels = labelsSelected;
      const docRef = doc(db, "users", user.uid, "tasks", String(taskID));
      await setDoc(docRef, task);
      dispatch(setUpdateTask(task));
      closeModalOnClick();
    }
  };

  return (
    <Modal onCloseRedirect="" closeModalOnClick={closeModalOnClick}>
      <div className="flex min-h-[150px] w-[280px] flex-col items-center justify-between gap-2 p-2">
        <div className="w-full border-b text-center text-lg font-medium">
          <span>Asign Label</span>
        </div>
        <div className="flex w-full flex-col gap-2">
          {Object.keys(labels).map((label) => (
            <span
              key={label}
              id={label}
              className="flex items-center justify-between rounded-xl p-2"
              style={{ background: `${labels[label].label_color}` }}
              onClick={handleToggleLabel}
            >
              <span>{labels[label].label_name}</span>
              <span>
                <IconButton
                  onClick={handleToggleLabel}
                  props={{ id: label }}
                  src={
                    labelsSelected.includes(label)
                      ? "/icons/checkbox-done.png"
                      : "/icons/checkbox.png"
                  }
                  alt={
                    labelsSelected.includes(label)
                      ? "Done-Icon"
                      : "Checkbox-Icon"
                  }
                  width={24}
                  height={24}
                />
              </span>
            </span>
          ))}
        </div>
        <div className="flex w-full items-center justify-center gap-2 border-t pt-2">
          <button
            onClick={() => closeModalOnClick()}
            className="flex rounded-md border border-gray-500 p-1 active:shadow active:shadow-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex rounded-md border border-gray-500 p-1 active:shadow active:shadow-gray-500"
          >
            Accept
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default AssignLabel;
