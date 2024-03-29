import {
  Project,
  ListGroup,
  LabelGroup,
  TaskGroup,
  GoalGroup,
  ProjectsGroup,
  Task,
} from "@/global/types";
import { db } from "@/utils/firebase.config";
import { formatISO } from "date-fns";
import { User } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const getProjects = async (user: User) => {
  if (user) {
    console.log("Fetching Projects");
    let data: ProjectsGroup = [];
    const docRef = collection(db, "users", user.uid, "projects");
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      data.push({
        is_archived: docData.is_archived,
        is_default: docData.is_default,
        is_favorite: docData.is_favorite,
        is_private: docData.is_private,
        labels: docData.labels,
        project_id: doc.id,
        project_name: docData.project_name,
        members: docData.members,
      });
    });
    return data.sort((a, b) => Number(b.is_default) - Number(a.is_default));
  } else {
    return [];
  }
};

export const getLists = async (user: User) => {
  console.log("Fetching lists");
  let data: ListGroup = {};
  const docRef = collection(db, "users", user.uid, "lists");
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((list: any) => {
    data[list.id] = list.data();
  });
  return data;
};

export const getUserSettings = async (user: User) => {
  const docRef = doc(db, "users", user.uid);
  const querySnapshot = await getDoc(docRef);
  const userData = querySnapshot.data();
  if (userData) {
    return {
      display_name: userData.display_name,
      email: userData.email,
      is_premium: userData.is_premium,
      photo: userData.photo,
      plan_name: userData.plan_name,
    };
  }
};

export const getLabels = async (user: User) => {
  console.log("Fetching Labels");
  let data: LabelGroup = {};
  const labelsDocRef = collection(db, "users", user.uid, "labels");
  const querySnapshot = await getDocs(labelsDocRef);
  querySnapshot.forEach((label: any) => {
    data[label.id] = label.data();
  });
  return data;
};

export const getTasks = async (user: User, date: string) => {
  console.log("Fetching Tasks");
  let data: TaskGroup = {};
  const tasksDocRef = query(
    collection(db, "users", user.uid, "tasks"),
    where("date_set.date_only", "==", date)
  );
  const querySnapshot = await getDocs(tasksDocRef);
  querySnapshot.forEach((task: any) => {
    data[task.id] = task.data();
  });
  return data;
};

export const getGoals = async (user: User) => {
  console.log("Fetching Goals");
  let data: GoalGroup = {};
  const goalsDocRef = query(
    collection(db, "users", user.uid, "goals"),
    orderBy("added_at", "asc")
  );
  const querySnapshot = await getDocs(goalsDocRef);
  querySnapshot.forEach((list: any) => {
    data[list.id] = list.data();
  });
  return data;
};

export const getDayData = async (user: User, date: string) => {
  const dayRef = doc(db, "users", user.uid, "tracker", date);
  const docSnap = await getDoc(dayRef);
  if (docSnap.exists()) {
    const docData = docSnap.data();

    let day_tasks: TaskGroup = {};
    const tasksRef = collection(
      db,
      "users",
      user.uid,
      "tracker",
      date,
      "tasks"
    );
    const querySnapshot = await getDocs(tasksRef);
    querySnapshot.forEach((list: any) => {
      day_tasks[list.id] = list.data();
    });
    return {
      day_date: docData?.day_date || date,
      day_goals: docData?.day_goals || [],
      day_tasks: day_tasks,
    };
  } else {
    await setDoc(dayRef, {
      day_date: date,
      day_goals: [],
    });
    return {
      day_date: date,
      day_goals: [],
      day_tasks: {},
    };
  }
};

export const postTask = async ({
  user,
  task,
}: {
  user: User;
  task: Task;
}): Promise<Task> => {
  const newDocRef = doc(collection(db, "users", user.uid, "tasks"));
  const newTask = {
    ...task,
    task_id: newDocRef.id,
    added_at: formatISO(new Date()),
  };
  await setDoc(newDocRef, newTask);
  return newTask;
};

export const deleteTask = async ({
  task_id,
  user,
}: {
  task_id: string;
  user: User;
}) => {
  const docRef = doc(db, "users", user.uid, "tasks", task_id);
  await deleteDoc(docRef);
};
