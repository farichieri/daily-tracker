import { db } from '@/utils/firebase.config';
import { User } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

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
