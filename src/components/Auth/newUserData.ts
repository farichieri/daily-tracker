import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase.config";
import { dbFormatDate } from "@/utils/formatDate";
import { formatISO } from "date-fns";
import { Label, List, Project, Task, UserDoc } from "@/global/types";
import { NewTaskInitial } from "@/global/initialTypes";
import { User } from "firebase/auth";

export const setNewUserData = async (user: User) => {
  try {
    const newUserRef = doc(db, "users", user.uid);
    const newUser: UserDoc = {
      display_name: user.displayName || "",
      email: user.email || "",
      is_premium: false,
      photo: "",
      plan_name: "free",
      user_id: newUserRef.id,
    };
    await setDoc(newUserRef, newUser);

    const today = dbFormatDate(new Date());
    const newTrackerRef = doc(db, "users", user.uid, "tracker", today);
    const newDayData = {
      day_date: today,
      day_goals: [],
    };
    await setDoc(newTrackerRef, newDayData);

    const newDayRef = doc(db, "users", user.uid, "tracker", today);
    const newDay = {
      day_date: today,
      day_goals: [],
    };
    await setDoc(newDayRef, newDay);

    const newTaskRef = doc(collection(db, "users", user.uid, "tasks"));
    const newTask: Task = {
      ...NewTaskInitial,
      added_at: formatISO(new Date()),
      added_by_uid: user.uid,
      date_set: {
        date_iso: formatISO(new Date()),
        time_from: "",
        time_to: "",
        with_time: false,
      },
      content: "Plan my week",
      project_id: "tracker",
      task_id: newTaskRef.id,
    };
    await setDoc(newTaskRef, newTask);

    const newListRef = doc(collection(db, "users", user.uid, "lists"));
    const newList: List = {
      is_archived: false,
      is_default: false,
      is_favorite: false,
      is_private: true,
      list_id: newListRef.id,
      list_name: "Shopping List",
      members: [],
      labels: [],
    };
    await setDoc(newListRef, newList);

    const newLabelRef = doc(collection(db, "users", user.uid, "labels"));
    const newLabel: Label = {
      is_favorite: false,
      label_color: "#006877",
      label_id: newLabelRef.id,
      label_name: "Work",
      label_order: 0,
    };
    await setDoc(newLabelRef, newLabel);

    const newProjectRef = doc(collection(db, "users", user.uid, "projects"));
    const newProject: Project = {
      is_archived: false,
      is_default: false,
      is_favorite: false,
      is_private: false,
      labels: [],
      project_id: newProjectRef.id,
      project_name: "Team",
      members: [],
    };
    await setDoc(newProjectRef, newProject);
  } catch (error) {
    console.log({ error });
  }
};
