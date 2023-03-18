import { Label, List, Project, Tracker, UserDoc } from '@/global/types';
import { db } from '@/utils/firebase.config';
import { User } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

export const setNewUserData = async (user: User) => {
  try {
    const newUserRef = doc(db, 'users', user.uid);
    const newUser: UserDoc = {
      display_name: user.displayName || '',
      email: user.email || '',
      is_premium: false,
      photo: '',
      plan_name: 'free',
      user_id: newUserRef.id,
    };
    await setDoc(newUserRef, newUser);

    const newTrackerRef = doc(collection(db, 'users', user.uid, 'tracker'));
    const newTracker: Tracker = {
      user_id: newTrackerRef.id,
      tracker_name: 'Tracker',
      is_private: true,
      is_archived: false,
      is_favorite: false,
      tracker_id: newTrackerRef.id,
      members: [],
    };
    await setDoc(newTrackerRef, newTracker);

    const newListRef = doc(collection(db, 'users', user.uid, 'lists'));
    const newList: List = {
      is_archived: false,
      is_default: false,
      is_favorite: false,
      is_private: true,
      list_id: newListRef.id,
      list_name: 'Shopping List',
      members: [],
      labels: [],
    };
    await setDoc(newListRef, newList);

    const newLabelRef = doc(collection(db, 'users', user.uid, 'labels'));
    const newLabel: Label = {
      is_favorite: false,
      label_color: '#006877',
      label_id: newLabelRef.id,
      label_name: 'Work',
      label_order: 0,
    };
    await setDoc(newLabelRef, newLabel);

    const newProjectRef = doc(collection(db, 'users', user.uid, 'projects'));
    const newProject: Project = {
      is_archived: false,
      is_default: false,
      is_favorite: false,
      is_private: false,
      labels: [],
      project_id: newProjectRef.id,
      project_name: 'Team',
      members: [],
    };
    await setDoc(newProjectRef, newProject);
  } catch (error) {
    console.log({ error });
  }
};
