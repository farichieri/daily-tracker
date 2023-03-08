import { db } from '@/utils/firebase.config';
import { User } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

export const getProjects = async (user: User) => {
  if (user) {
    let data: any[] = [];
    const docRef = collection(db, 'users', user.uid, 'projects');
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => data.push(doc.id));
    return data;
  } else {
    return [];
  }
};
