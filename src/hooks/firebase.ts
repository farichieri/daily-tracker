import {
  Project,
  ListGroup,
  UserSettings,
  LabelGroup,
  TaskGroup,
} from '@/global/types';
import { db } from '@/utils/firebase.config';
import { User } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export const getProjects = async (user: User) => {
  if (user) {
    console.log('Fetching Projects');
    let data: Array<Project> = [];
    const docRef = collection(db, 'users', user.uid, 'projects');
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
  console.log('Fetching lists');
  let data: ListGroup = {};
  const docRef = collection(db, 'users', user.uid, 'lists');
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((list: any) => {
    data[list.id] = list.data();
  });
  return data;
};

export const getUserSettings = async (user: User) => {
  const docRef = doc(db, 'users', user.uid);
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
  let data: LabelGroup = {};
  const labelsDocRef = collection(db, 'users', user.uid, 'labels');
  const querySnapshot = await getDocs(labelsDocRef);
  querySnapshot.forEach((label: any) => {
    data[label.id] = label.data();
  });
  return data;
};

export const getTasks = async (user: User) => {
  let data: TaskGroup = {};
  const tasksDocRef = collection(db, 'users', user.uid, 'tasks');
  const querySnapshot = await getDocs(tasksDocRef);
  querySnapshot.forEach((list: any) => {
    data[list.id] = list.data();
  });
  return data;
};

export const getDayData = async (user: User, date: string) => {
  let data: TaskGroup = {};
  const tasksDocRef = collection(db, 'users', user.uid, 'tracker');
  const docData = await getDoc(doc(tasksDocRef));
  console.log(docData.data());
  const querySnapshot = await getDocs(tasksDocRef);
  querySnapshot.forEach((list: any) => {
    data[list.id] = list.data();
  });
  return data;
};
