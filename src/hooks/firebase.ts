import { db } from '@/utils/firebase.config';
import { User } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export const getProjects = async (user: User) => {
  if (user) {
    console.log('Fetching Projects');
    let data: any[] = [];
    const docRef = collection(db, 'users', user.uid, 'projects');
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      data.push({
        id: doc.id,
        projectName: docData.projectName,
        isDefault: docData.isDefault,
        isFavorite: docData.isFavorite,
      });
    });
    return data.sort((a, b) => b.isDefault - a.isDefault);
  } else {
    return [];
  }
};

export const getTodos = async (user: User) => {
  if (user) {
    console.log('Fetching Todos');
    let data: any[] = [];
    const docRef = collection(db, 'users', user.uid, 'todos');
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      data.push({
        id: doc.id,
        todoName: docData.todoName,
        isDefault: docData.isDefault,
        isFavorite: docData.isFavorite,
      });
    });
    return data.sort((a, b) => b.isDefault - a.isDefault);
  } else {
    return [];
  }
};

export const getUserSettings = async (user: User) => {
  const docRef = doc(db, 'users', user.uid);
  const querySnapshot = await getDoc(docRef);
  const userData = querySnapshot.data();
  return userData;
};
