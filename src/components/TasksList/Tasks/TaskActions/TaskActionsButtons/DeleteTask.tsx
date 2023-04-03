import { db } from "@/utils/firebase.config";
import { deleteDoc, doc } from "firebase/firestore";
import { selectUser } from "store/slices/authSlice";
import { setDeleteTask } from "store/slices/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import IconButton from "@/components/Layout/Icon/IconButton";

const DeleteTask = ({
  task_id,
  redirectLink,
}: {
  task_id: string;
  redirectLink: string;
}) => {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDelete = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (window.confirm("Delete permanently")) {
      router.push(redirectLink);
      if (!user) return;
      const task_id: string = (event.target as HTMLButtonElement).id;
      const docRef = doc(db, "users", user.uid, "tasks", task_id);
      dispatch(setDeleteTask(task_id));
      await deleteDoc(docRef);
    }
  };

  return (
    <IconButton
      props={{ type: "button", id: task_id }}
      onClick={(e) => {
        e.preventDefault();
        handleDelete(e);
      }}
      src={"/icons/trash.png"}
      alt="Delete-Icon"
      width={20}
      height={20}
    />
  );
};

export default DeleteTask;
