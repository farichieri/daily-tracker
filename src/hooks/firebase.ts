import { Project, Todo, UserSettings } from '@/global/types';
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

export const getTodos = async (user: User) => {
  if (user) {
    console.log('Fetching Todos');
    let data: Array<Todo> = [];
    const docRef = collection(db, 'users', user.uid, 'todos');
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      data.push({
        is_archived: docData.is_archived,
        is_default: docData.is_default,
        is_favorite: docData.is_favorite,
        is_private: docData.is_private,
        labels: docData.labels,
        list_id: doc.id,
        list_name: docData.list_name,
        members: docData.members,
      });
    });
    return data.sort((a, b) => Number(b.is_default) - Number(a.is_default));
  } else {
    return [];
  }
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
