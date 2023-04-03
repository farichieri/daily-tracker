import { db } from "@/utils/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { filterListsNotArchived } from "@/hooks/helpers";
import { ListGroup, Task } from "@/global/types";
import { selectLists } from "store/slices/listsSlice";
import { selectUser } from "store/slices/authSlice";
import { setUpdateTask } from "store/slices/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import IconButton from "@/components/Layout/Icon/IconButton";
import Modal from "@/components/Modal/Modal";

const AssignList = ({
  closeModalOnClick,
  isNewTask,
  task,
  handleChangeList,
}: {
  closeModalOnClick: Function;
  isNewTask: boolean;
  task: Task;
  handleChangeList: Function;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { taskID } = router.query;
  const { user } = useSelector(selectUser);
  const lists = useSelector(selectLists);
  const listsNotArchived: ListGroup = filterListsNotArchived(lists);
  const [listSelected, setListSelected] = useState<string>(task.project_id);

  const handleToggleList = (event: React.MouseEvent) => {
    event.preventDefault();
    const id = (event.target as HTMLButtonElement).id;
    if (listSelected.includes(id)) {
      setListSelected("");
    } else {
      setListSelected(id);
    }
  };

  const handleSave = async () => {
    if (isNewTask) {
      handleChangeList(listSelected);
      closeModalOnClick();
    } else {
      if (!user) return;
      console.log("Saving Lists in taskID");
      task.project_id = listSelected;
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
          <span>Asign List</span>
        </div>
        <div className="flex w-full flex-col gap-2">
          {Object.keys(listsNotArchived).map((list: string) => (
            <span
              key={list}
              id={list}
              className="flex items-center justify-between "
              onClick={handleToggleList}
            >
              <span>{listsNotArchived[list].list_name}</span>
              <span>
                <IconButton
                  onClick={handleToggleList}
                  props={{ id: list }}
                  src={
                    listSelected.includes(list)
                      ? "/icons/checkbox-done.png"
                      : "/icons/checkbox.png"
                  }
                  alt={
                    listSelected.includes(list) ? "Done-Icon" : "Checkbox-Icon"
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
            className="flex rounded-md border border-gray-500 p-1 active:shadow active:shadow-gray-500"
            onClick={() => closeModalOnClick()}
          >
            Cancel
          </button>
          <button
            className="flex rounded-md border border-gray-500 p-1 active:shadow active:shadow-gray-500"
            onClick={handleSave}
          >
            Accept
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default AssignList;
